export const locales = ["en", "hi"] as const;
export type Locale = (typeof locales)[number];

/** Bilingual copy used by catalog, content and config data. */
export type L = { en: string; hi: string };

export function tx(text: L, locale: Locale | string): string {
  return locale === "hi" ? text.hi || text.en : text.en;
}
