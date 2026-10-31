const inr = new Intl.NumberFormat("en-IN", {
  style: "currency",
  currency: "INR",
  maximumFractionDigits: 0,
});

const inrPrecise = new Intl.NumberFormat("en-IN", {
  style: "currency",
  currency: "INR",
  minimumFractionDigits: 0,
  maximumFractionDigits: 2,
});

const num = new Intl.NumberFormat("en-IN");

/** ₹1,24,999 — Indian grouping, no decimals. */
export function formatINR(value: number): string {
  return inr.format(Math.round(value));
}

/** For unit prices under ₹10 that need paise, e.g. ₹1.5 / pc. */
export function formatINRPrecise(value: number): string {
  return value < 10 && !Number.isInteger(value) ? inrPrecise.format(value) : inr.format(Math.round(value));
}

export function formatNumber(value: number): string {
  return num.format(value);
}

export function formatDate(iso: string | number | Date, locale: string = "en"): string {
  return new Intl.DateTimeFormat(locale === "hi" ? "hi-IN" : "en-IN", {
    day: "numeric",
    month: "short",
    year: "numeric",
    timeZone: "Asia/Kolkata",
  }).format(new Date(iso));
}

type Tag = { amount: number; per: "job" | "sqft" | "unit"; qty: number; unit: { en: string; hi: string } };

/** "₹199 / 100 cards", "₹14 / sq ft", "₹45 / card" — and the Hindi equivalents. */
export function formatPriceTag(tag: Tag, locale: string): string {
  const price = formatINRPrecise(tag.amount);
  const unit = locale === "hi" ? tag.unit.hi : tag.unit.en;
  if (tag.per === "sqft") return `${price} / ${locale === "hi" ? "वर्ग फ़ुट" : "sq ft"}`;
  if (tag.per === "job") return `${price} / ${formatNumber(tag.qty)} ${unit}`;
  return `${price} / ${unit}`;
}
