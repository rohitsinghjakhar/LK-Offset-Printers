import { describe, expect, it } from "vitest";
import { getSeedProduct, products } from "@/data/seed/catalog";
import type { Product } from "@/types/catalog";
import {
  DEFAULT_DELIVERY,
  DEFAULT_RULES,
  computeQuote,
  deliveryCharge,
  normalizeSelection,
  priceCart,
  selectionFromParams,
  selectionToParams,
  type QuoteSelection,
} from "./pricing";

const must = (slug: string): Product => {
  const product = getSeedProduct(slug);
  if (!product) throw new Error(`missing ${slug}`);
  return product;
};

const sel = (product: Product, patch: Partial<QuoteSelection> = {}): QuoteSelection => normalizeSelection(product, patch);

const withGst = (taxable: number, rate = 18) => Math.round(taxable * (1 + rate / 100));

describe("tiered model", () => {
  const cards = must("visiting-cards");

  it("uses the exact tier price", () => {
    const q = computeQuote(cards, sel(cards, { qty: 500 }));
    expect(q.base).toBe(379);
    expect(q.printSubtotal).toBe(379);
    expect(q.total).toBe(withGst(379));
    expect(q.ok).toBe(true);
  });

  it("flags quantities that are not a tier", () => {
    const q = computeQuote(cards, { ...sel(cards), qty: 300 });
    expect(q.ok).toBe(false);
    expect(q.errors[0].code).toBe("invalid_qty");
  });

  it("normalises an invalid tier quantity to the first tier", () => {
    expect(sel(cards, { qty: 333 }).qty).toBe(100);
  });
});

describe("area model", () => {
  const flex = must("flex-banners");

  it("prices width × height × rate × qty in feet", () => {
    const q = computeQuote(flex, sel(flex, { qty: 2, size: { w: 6, h: 3, unit: "ft" } }));
    expect(q.areaSqFt).toBe(18);
    expect(q.base).toBe(18 * 14 * 2);
    expect(q.total).toBe(withGst(504));
  });

  it("accepts inches", () => {
    const q = computeQuote(flex, sel(flex, { qty: 1, size: { w: 72, h: 36, unit: "in" } }));
    expect(q.areaSqFt).toBeCloseTo(18, 10);
    expect(q.base).toBeCloseTo(252, 10);
  });

  it("applies the ₹150 minimum job charge", () => {
    const q = computeQuote(flex, sel(flex, { qty: 1, size: { w: 2, h: 2, unit: "ft" } }));
    expect(q.base).toBe(56);
    expect(q.minChargeTopUp).toBe(94);
    expect(q.printSubtotal).toBe(150);
    expect(q.total).toBe(withGst(150));
  });

  it("rejects missing or oversized dimensions", () => {
    expect(computeQuote(flex, { ...sel(flex), size: { w: 0, h: 3, unit: "ft" } }).errors[0].code).toBe("invalid_size");
    expect(computeQuote(flex, { ...sel(flex), size: { w: 150, h: 3, unit: "ft" } }).errors[0].code).toBe("size_too_large");
  });
});

describe("perPiece model", () => {
  const mug = must("photo-mug");
  const brochure = must("brochures");

  it("multiplies unit price by quantity below discount thresholds", () => {
    const q = computeQuote(mug, sel(mug, { qty: 10 }));
    expect(q.base).toBe(2490);
    expect(q.discountPct).toBe(0);
    expect(q.total).toBe(withGst(2490));
  });

  it("applies bulk discounts at 100 / 500 / 1000", () => {
    expect(computeQuote(mug, sel(mug, { qty: 100 })).discountPct).toBe(5);
    expect(computeQuote(brochure, sel(brochure, { qty: 500 })).discountPct).toBe(10);
    const q = computeQuote(brochure, sel(brochure, { qty: 1000 }));
    expect(q.discountPct).toBe(15);
    expect(q.printSubtotal).toBeCloseTo(12 * 1000 * 0.85, 10);
  });

  it("skips bulk discount when the product opts out", () => {
    const labels = must("labels-stickers");
    const q = computeQuote(labels, sel(labels, { qty: 5000 }));
    expect(q.discountPct).toBe(0);
    expect(q.base).toBe(7500);
  });

  it("enforces minQty", () => {
    const q = computeQuote(brochure, { ...sel(brochure), qty: 100 });
    expect(q.ok).toBe(false);
    expect(q.errors.some((e) => e.code === "min_qty")).toBe(true);
    expect(sel(brochure, { qty: 100 }).qty).toBe(500);
  });
});

describe("option price modes", () => {
  const cards = must("visiting-cards");

  it("multiplier: double side ×1.6 and 350 GSM ×1.15 compound", () => {
    const q = computeQuote(cards, sel(cards, { qty: 1000, options: { sides: ["double"], paper: ["350gsm"] } }));
    expect(q.printSubtotal).toBeCloseTo(499 * 1.6 * 1.15, 10);
    expect(q.lines.map((l) => l.key)).toEqual(["double", "350gsm"]);
  });

  it("per1000: velvet, spot UV, gold foil, rounded corners prorated by quantity", () => {
    const q = computeQuote(cards, sel(cards, { qty: 250, options: { lamination: ["velvet"], finishes: ["spot-uv", "gold-foil", "rounded"] } }));
    const extras = (350 + 600 + 1200 + 150) * 0.25;
    expect(q.optionsTotal).toBeCloseTo(extras, 10);
    expect(q.printSubtotal).toBeCloseTo(299 + extras, 10);
  });

  it("perUnit: adds value × qty", () => {
    const wedding = must("wedding-cards");
    const q = computeQuote(wedding, sel(wedding, { qty: 200, options: { finishes: ["foil"] } }));
    expect(q.lines.find((l) => l.key === "foil")?.amount).toBe(1200);
  });

  it("flat: adds once per job", () => {
    const flex = must("flex-banners");
    const q = computeQuote(flex, sel(flex, { qty: 3, size: { w: 6, h: 3, unit: "ft" }, options: { finishing: ["pocket"] } }));
    expect(q.lines.find((l) => l.key === "pocket")?.amount).toBe(60);
    expect(q.printSubtotal).toBe(18 * 14 * 3 + 60);
  });

  it("drops unknown option ids during normalisation", () => {
    const s = sel(cards, { options: { paper: ["unobtanium"], finishes: ["gold-foil", "nope"] } });
    expect(s.options.paper).toEqual(["300gsm"]);
    expect(s.options.finishes).toEqual(["gold-foil"]);
  });
});

describe("add-ons and tax", () => {
  const cards = must("visiting-cards");

  it("express adds 25% of the print subtotal", () => {
    const q = computeQuote(cards, sel(cards, { qty: 500, express: true }));
    expect(q.express).toBeCloseTo(379 * 0.25, 10);
  });

  it("express is ignored for products without express", () => {
    const cartons = must("mono-cartons");
    const q = computeQuote(cartons, { ...sel(cartons), express: true });
    expect(q.express).toBe(0);
  });

  it("design fee is added before GST", () => {
    const q = computeQuote(cards, sel(cards, { qty: 100, design: "premium" }));
    expect(q.design).toBe(999);
    expect(q.taxable).toBe(199 + 999);
    expect(q.total).toBe(withGst(1198));
  });

  it("uses the per-product GST rate and rounds only at the end", () => {
    const custom: Product = { ...cards, gstRate: 5 };
    const q = computeQuote(custom, sel(custom, { qty: 250, options: { lamination: ["velvet"] } }));
    const taxable = 299 + 87.5;
    expect(q.gst).toBeCloseTo(taxable * 0.05, 10);
    expect(q.total).toBe(Math.round(taxable * 1.05));
  });

  it("delivery: pickup free, local ₹49 free above ₹999, courier ₹99", () => {
    expect(deliveryCharge("pickup", 500)).toBe(0);
    expect(deliveryCharge("local", 500)).toBe(49);
    expect(deliveryCharge("local", 999)).toBe(0);
    expect(deliveryCharge("courier", 5000)).toBe(99);
  });
});

describe("share links", () => {
  it("round-trips a selection through URL params", () => {
    const flex = must("flex-banners");
    const original = sel(flex, { qty: 4, size: { w: 8, h: 4, unit: "ft", presetId: "8x4" }, options: { material: ["star"] }, express: true, design: "basic" });
    const restored = normalizeSelection(flex, selectionFromParams(selectionToParams(original)));
    expect(restored).toEqual(original);
  });
});

/** Deterministic PRNG so failures are reproducible. */
function mulberry32(seed: number) {
  let a = seed;
  return () => {
    a |= 0;
    a = (a + 0x6d2b79f5) | 0;
    let t = Math.imul(a ^ (a >>> 15), 1 | a);
    t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t;
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
}

describe("client and server prices match", () => {
  it("for 20 random configurations", () => {
    const rand = mulberry32(20260925);
    const pick = <T>(items: T[]): T => items[Math.floor(rand() * items.length)];

    for (let i = 0; i < 20; i++) {
      const product = pick(products);
      const options: Record<string, string[]> = {};
      for (const group of product.options) {
        options[group.id] = group.kind === "single" ? [pick(group.choices).id] : group.choices.filter(() => rand() > 0.5).map((c) => c.id);
      }
      const p = product.pricing;
      const qty = p.kind === "tiered" ? pick(p.tiers).qty : p.kind === "perPiece" ? pick(p.qtyPresets) : 1 + Math.floor(rand() * 5);
      const size = p.kind === "area" ? { w: 1 + Math.round(rand() * 190) / 10, h: 1 + Math.round(rand() * 90) / 10, unit: "ft" as const } : undefined;
      const selection = normalizeSelection(product, {
        qty,
        options,
        size,
        express: rand() > 0.6,
        design: pick(["own", "basic", "premium"] as const),
      });

      // Client: live price in the configurator.
      const client = computeQuote(product, selection, DEFAULT_RULES);

      // Server: selection travels as JSON, is re-normalised and re-priced from catalog data.
      const wire = JSON.parse(JSON.stringify({ productSlug: product.slug, selection }));
      const server = priceCart([wire], (slug) => getSeedProduct(slug), "pickup", DEFAULT_RULES, DEFAULT_DELIVERY);

      expect(server.ok, `${product.slug} config ${i}`).toBe(true);
      expect(server.lines[0].quote.total).toBe(client.total);
      expect(server.itemsTotal).toBe(client.total);
    }
  });

  it("server ignores a tampered client price", () => {
    const cards = must("visiting-cards");
    const tampered = { productSlug: "visiting-cards", selection: { ...sel(cards, { qty: 2000 }), total: 1 } };
    const server = priceCart([tampered], getSeedProduct, "courier");
    expect(server.grandTotal).toBe(withGst(899) + 99);
  });
});

describe("seed catalog integrity", () => {
  it("every product has bilingual copy and valid defaults", () => {
    const slugs = new Set<string>();
    for (const product of products) {
      expect(slugs.has(product.slug), product.slug).toBe(false);
      slugs.add(product.slug);
      for (const text of [product.name, product.short, product.description]) {
        expect(text.en.length).toBeGreaterThan(0);
        expect(text.hi.length).toBeGreaterThan(0);
      }
      for (const group of product.options) {
        for (const id of group.defaults)
          expect(
            group.choices.some((c) => c.id === id),
            `${product.slug}.${group.id}`,
          ).toBe(true);
      }
      const q = computeQuote(product, normalizeSelection(product));
      expect(q.ok, product.slug).toBe(true);
      expect(q.total).toBeGreaterThan(0);
    }
  });
});
