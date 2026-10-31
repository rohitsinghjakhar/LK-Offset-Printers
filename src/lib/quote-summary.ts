import type { Product } from "@/types/catalog";
import type { L } from "@/types/i18n";
import { tx } from "@/types/i18n";
import { formatNumber } from "./format";
import { toFeet, type QuoteSelection } from "./pricing";

const trim = (n: number) => String(Math.round(n * 100) / 100);

/** Human-readable configuration lines in both languages, e.g. ["500 cards", "Both sides", "Gold foil"]. */
export function summarizeSelection(product: Product, selection: QuoteSelection): L[] {
  const lines: L[] = [];
  const unit = product.unit;
  lines.push({ en: `${formatNumber(selection.qty)} ${unit.en}`, hi: `${formatNumber(selection.qty)} ${unit.hi}` });

  if (product.pricing.kind === "area" && selection.size) {
    const preset = product.pricing.sizePresets.find((s) => s.id === selection.size?.presetId);
    if (preset) lines.push(preset.label);
    else {
      const u = selection.size.unit === "in" ? { en: "in", hi: "इंच" } : { en: "ft", hi: "फ़ुट" };
      lines.push({
        en: `${trim(selection.size.w)} × ${trim(selection.size.h)} ${u.en}`,
        hi: `${trim(selection.size.w)} × ${trim(selection.size.h)} ${u.hi}`,
      });
    }
  }

  for (const group of product.options) {
    const ids = selection.options[group.id] ?? group.defaults;
    for (const id of ids) {
      const choice = group.choices.find((c) => c.id === id);
      if (choice) lines.push(choice.label);
    }
  }

  if (selection.express) lines.push({ en: "Express", hi: "एक्सप्रेस" });
  if (selection.design === "basic") lines.push({ en: "Basic design", hi: "बेसिक डिज़ाइन" });
  if (selection.design === "premium") lines.push({ en: "Premium design", hi: "प्रीमियम डिज़ाइन" });
  return lines;
}

export function areaLabel(selection: QuoteSelection): number | null {
  if (!selection.size) return null;
  return toFeet(selection.size.w, selection.size.unit) * toFeet(selection.size.h, selection.size.unit);
}

/** Pre-filled WhatsApp order text with the full configuration and the quoted total. */
export function quoteWhatsappMessage(
  product: Product,
  selection: QuoteSelection,
  locale: string,
  labels: { intro: string; totalLine: string },
  shareUrl?: string,
): string {
  const lines = summarizeSelection(product, selection).map((l) => `• ${tx(l, locale)}`);
  return [labels.intro, "", `*${tx(product.name, locale)}*`, ...lines, "", labels.totalLine, shareUrl ?? ""]
    .filter((line, i, arr) => !(line === "" && arr[i - 1] === ""))
    .join("\n")
    .trim();
}
