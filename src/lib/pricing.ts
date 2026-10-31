/**
 * Instant quote engine. One pure function used by the live price, the cart and the WhatsApp
 * order summary. Amounts stay unrounded until the final total.
 */
import { siteConfig } from "@/config/site.config";
import type { L } from "@/types/i18n";
import type { OptionChoice, Product } from "@/types/catalog";

export type DesignChoice = "own" | "basic" | "premium";
export type DeliveryChoice = "pickup" | "local" | "courier";
export type SizeUnit = "ft" | "in";

export type QuoteSelection = {
  qty: number;
  /** groupId → selected choice ids (single groups hold exactly one id). */
  options: Record<string, string[]>;
  size?: { w: number; h: number; unit: SizeUnit; presetId?: string };
  express: boolean;
  design: DesignChoice;
};

export type PricingRules = {
  expressPct: number;
  areaMinCharge: number;
  designFees: Record<DesignChoice, number>;
  bulkDiscounts: ReadonlyArray<{ minQty: number; pct: number }>;
};

export type DeliveryRules = {
  pickup: number;
  local: number;
  localFreeAbove: number;
  courier: number;
};

export type QuoteErrorCode = "invalid_qty" | "min_qty" | "invalid_size" | "size_too_large" | "invalid_option";

export type QuoteError = { code: QuoteErrorCode; detail?: string };

export type QuoteLine = { key: string; label: L; amount: number };

export type QuoteResult = {
  ok: boolean;
  errors: QuoteError[];
  qty: number;
  areaSqFt?: number;
  base: number;
  lines: QuoteLine[];
  optionsTotal: number;
  discountPct: number;
  discount: number;
  minChargeTopUp: number;
  printSubtotal: number;
  express: number;
  design: number;
  taxable: number;
  gstRate: number;
  gst: number;
  /** Final payable amount in whole rupees, GST included. */
  total: number;
  unitPrice: number;
};

/** Both come from src/config/site.config.ts so prices are edited in one place. */
export const DEFAULT_RULES: PricingRules = {
  expressPct: siteConfig.pricing.expressPct,
  areaMinCharge: siteConfig.pricing.areaMinCharge,
  designFees: siteConfig.pricing.designFees,
  bulkDiscounts: siteConfig.pricing.bulkDiscounts,
};

export const DEFAULT_DELIVERY: DeliveryRules = {
  pickup: siteConfig.delivery.pickup,
  local: siteConfig.delivery.local,
  localFreeAbove: siteConfig.delivery.localFreeAbove,
  courier: siteConfig.delivery.courier,
};

const MAX_SIDE_FT = 100;
const MAX_QTY = 1_000_000;

export function toFeet(value: number, unit: SizeUnit): number {
  return unit === "in" ? value / 12 : value;
}

/** Quantity choices shown in the configurator. */
export function qtyChoices(product: Product): number[] {
  const p = product.pricing;
  if (p.kind === "tiered") return p.tiers.map((t) => t.qty);
  if (p.kind === "perPiece") return p.qtyPresets.filter((q) => q >= p.minQty);
  return [1, 2, 5, 10, 25];
}

export function minQty(product: Product): number {
  const p = product.pricing;
  if (p.kind === "tiered") return p.tiers[0]?.qty ?? 1;
  if (p.kind === "perPiece") return p.minQty;
  return 1;
}

/** Fill defaults and drop unknown ids so any selection is safe to price. */
export function normalizeSelection(product: Product, input?: Partial<QuoteSelection>): QuoteSelection {
  const options: Record<string, string[]> = {};
  for (const group of product.options) {
    const valid = new Set(group.choices.map((c) => c.id));
    const requested = input?.options?.[group.id]?.filter((id) => valid.has(id)) ?? group.defaults;
    const unique = Array.from(new Set(requested));
    options[group.id] = group.kind === "single" ? [unique[0] ?? group.defaults[0] ?? group.choices[0].id] : unique;
  }

  const p = product.pricing;
  let qty = Math.floor(Number(input?.qty ?? 0));
  if (p.kind === "tiered") {
    if (!p.tiers.some((t) => t.qty === qty)) qty = p.tiers[0].qty;
  } else if (!Number.isFinite(qty) || qty < minQty(product)) {
    qty = p.kind === "perPiece" ? Math.max(p.minQty, p.qtyPresets[0] ?? p.minQty) : 1;
  }
  qty = Math.min(qty, MAX_QTY);

  let size: QuoteSelection["size"];
  if (p.kind === "area") {
    const preset = p.sizePresets.find((s) => s.id === input?.size?.presetId);
    if (input?.size && Number(input.size.w) > 0 && Number(input.size.h) > 0) {
      size = {
        w: Number(input.size.w),
        h: Number(input.size.h),
        unit: input.size.unit === "in" ? "in" : "ft",
        presetId: preset?.id,
      };
    } else {
      const first = preset ?? p.sizePresets[0];
      size = { w: first.widthFt, h: first.heightFt, unit: "ft", presetId: first.id };
    }
  }

  const design: DesignChoice = input?.design === "basic" || input?.design === "premium" ? input.design : "own";
  return { qty, options, size, express: Boolean(input?.express) && product.turnaround.express, design };
}

function selectedChoices(product: Product, selection: QuoteSelection): { choice: OptionChoice; groupLabel: L }[] {
  const out: { choice: OptionChoice; groupLabel: L }[] = [];
  for (const group of product.options) {
    const ids = selection.options[group.id] ?? group.defaults;
    for (const id of ids) {
      const choice = group.choices.find((c) => c.id === id);
      if (choice) out.push({ choice, groupLabel: group.label });
    }
  }
  return out;
}

export function bulkDiscountPct(qty: number, rules: PricingRules): number {
  const hit = [...rules.bulkDiscounts].sort((a, b) => b.minQty - a.minQty).find((d) => qty >= d.minQty);
  return hit?.pct ?? 0;
}

export function computeQuote(product: Product, rawSelection: QuoteSelection, rules: PricingRules = DEFAULT_RULES): QuoteResult {
  const errors: QuoteError[] = [];
  const selection = rawSelection;
  const qty = selection.qty;
  const p = product.pricing;
  let base = 0;
  let areaSqFt: number | undefined;

  if (!Number.isFinite(qty) || qty <= 0 || !Number.isInteger(qty) || qty > MAX_QTY) {
    errors.push({ code: "invalid_qty" });
  }

  switch (p.kind) {
    case "tiered": {
      const tier = p.tiers.find((t) => t.qty === qty);
      if (!tier) {
        errors.push({ code: "invalid_qty", detail: `Choose one of ${p.tiers.map((t) => t.qty).join(", ")}` });
        const fallback = [...p.tiers].reverse().find((t) => t.qty <= qty) ?? p.tiers[0];
        base = fallback.price;
      } else {
        base = tier.price;
      }
      break;
    }
    case "area": {
      const size = selection.size;
      if (!size || !(size.w > 0) || !(size.h > 0)) {
        errors.push({ code: "invalid_size" });
        break;
      }
      const w = toFeet(size.w, size.unit);
      const h = toFeet(size.h, size.unit);
      if (w > MAX_SIDE_FT || h > MAX_SIDE_FT) errors.push({ code: "size_too_large" });
      areaSqFt = w * h;
      base = areaSqFt * p.ratePerSqFt * Math.max(qty, 0);
      break;
    }
    case "perPiece": {
      if (qty < p.minQty) errors.push({ code: "min_qty", detail: String(p.minQty) });
      base = p.unitPrice * Math.max(qty, 0);
      break;
    }
  }

  const chosen = selectedChoices(product, selection);
  const lines: QuoteLine[] = [];

  // 1. Multipliers compound on the base, each shown as its incremental amount.
  let running = base;
  for (const { choice } of chosen) {
    if (choice.price?.mode === "multiplier") {
      const next = running * choice.price.value;
      lines.push({ key: choice.id, label: choice.label, amount: next - running });
      running = next;
    }
  }

  // 2. Bulk discount (per-piece products only).
  const discountPct = p.kind === "perPiece" && p.bulkDiscount !== false ? bulkDiscountPct(qty, rules) : 0;
  const discount = running * (discountPct / 100);
  running -= discount;

  // 3. Minimum job charge (area products).
  let minChargeTopUp = 0;
  if (p.kind === "area" && running > 0 && running < rules.areaMinCharge) {
    minChargeTopUp = rules.areaMinCharge - running;
    running = rules.areaMinCharge;
  }

  // 4. Additive options.
  for (const { choice } of chosen) {
    const price = choice.price;
    if (!price || price.mode === "multiplier") continue;
    let amount = 0;
    if (price.mode === "per1000") amount = price.value * (qty / 1000);
    else if (price.mode === "perUnit") amount = price.value * qty;
    else amount = price.value;
    if (amount !== 0) lines.push({ key: choice.id, label: choice.label, amount });
  }

  const optionsTotal = lines.reduce((sum, l) => sum + l.amount, 0);
  const printSubtotal = base + optionsTotal - discount + minChargeTopUp;
  const express = selection.express && product.turnaround.express ? printSubtotal * (rules.expressPct / 100) : 0;
  const design = rules.designFees[selection.design] ?? 0;
  const taxable = printSubtotal + express + design;
  const gstRate = product.gstRate;
  const gst = taxable * (gstRate / 100);
  const total = Math.round(taxable + gst);

  return {
    ok: errors.length === 0,
    errors,
    qty,
    areaSqFt,
    base,
    lines,
    optionsTotal,
    discountPct,
    discount,
    minChargeTopUp,
    printSubtotal,
    express,
    design,
    taxable,
    gstRate,
    gst,
    total,
    unitPrice: qty > 0 ? total / qty : 0,
  };
}

export function deliveryCharge(mode: DeliveryChoice, itemsTotal: number, rules: DeliveryRules = DEFAULT_DELIVERY): number {
  if (mode === "pickup") return rules.pickup;
  if (mode === "local") return itemsTotal >= rules.localFreeAbove ? 0 : rules.local;
  return rules.courier;
}

export type CartLineInput = { productSlug: string; selection: QuoteSelection };

export type PricedCart = {
  lines: { productSlug: string; selection: QuoteSelection; quote: QuoteResult }[];
  itemsTotal: number;
  delivery: number;
  grandTotal: number;
  ok: boolean;
  missing: string[];
};

/** Prices a whole cart for checkout. `getProduct` resolves from the static catalog. */
export function priceCart(
  items: CartLineInput[],
  getProduct: (slug: string) => Product | undefined,
  deliveryMode: DeliveryChoice,
  rules: PricingRules = DEFAULT_RULES,
  deliveryRules: DeliveryRules = DEFAULT_DELIVERY,
): PricedCart {
  const missing: string[] = [];
  const lines: PricedCart["lines"] = [];
  for (const item of items) {
    const product = getProduct(item.productSlug);
    if (!product || !product.active) {
      missing.push(item.productSlug);
      continue;
    }
    const selection = normalizeSelection(product, item.selection);
    lines.push({ productSlug: item.productSlug, selection, quote: computeQuote(product, selection, rules) });
  }
  const itemsTotal = lines.reduce((sum, l) => sum + l.quote.total, 0);
  const delivery = lines.length ? deliveryCharge(deliveryMode, itemsTotal, deliveryRules) : 0;
  return {
    lines,
    itemsTotal,
    delivery,
    grandTotal: itemsTotal + delivery,
    ok: missing.length === 0 && lines.every((l) => l.quote.ok),
    missing,
  };
}

/** "From" price for cards and menus: the cheapest valid configuration before GST. */
export function fromPrice(product: Product): { amount: number; per: "job" | "sqft" | "unit"; qty: number } {
  const p = product.pricing;
  if (p.kind === "tiered") return { amount: p.tiers[0].price, per: "job", qty: p.tiers[0].qty };
  if (p.kind === "area") return { amount: p.ratePerSqFt, per: "sqft", qty: 1 };
  return { amount: p.unitPrice, per: "unit", qty: p.minQty };
}

/** Serialise a selection to URL search params ("Share this quote"). */
export function selectionToParams(selection: QuoteSelection): URLSearchParams {
  const params = new URLSearchParams();
  params.set("qty", String(selection.qty));
  for (const [group, ids] of Object.entries(selection.options)) params.set(`o.${group}`, ids.join(","));
  if (selection.size) {
    params.set("w", String(selection.size.w));
    params.set("h", String(selection.size.h));
    params.set("u", selection.size.unit);
    if (selection.size.presetId) params.set("sz", selection.size.presetId);
  }
  if (selection.express) params.set("x", "1");
  if (selection.design !== "own") params.set("d", selection.design);
  return params;
}

export function selectionFromParams(params: URLSearchParams | Record<string, string | string[] | undefined>): Partial<QuoteSelection> {
  const get = (key: string): string | undefined => {
    if (params instanceof URLSearchParams) return params.get(key) ?? undefined;
    const v = params[key];
    return Array.isArray(v) ? v[0] : v;
  };
  const keys = params instanceof URLSearchParams ? Array.from(params.keys()) : Object.keys(params);
  const options: Record<string, string[]> = {};
  for (const key of keys) {
    if (key.startsWith("o.")) options[key.slice(2)] = (get(key) ?? "").split(",").filter(Boolean);
  }
  const w = Number(get("w"));
  const h = Number(get("h"));
  const design = get("d");
  return {
    qty: get("qty") ? Number(get("qty")) : undefined,
    options,
    size: w > 0 && h > 0 ? { w, h, unit: get("u") === "in" ? "in" : "ft", presetId: get("sz") } : undefined,
    express: get("x") === "1",
    design: design === "basic" || design === "premium" ? design : "own",
  };
}
