import { hasLocale } from "next-intl";
import { setRequestLocale } from "next-intl/server";
import type { Locale } from "@/types/i18n";
import { routing } from "./routing";

export type LocaleParams = { params: Promise<{ locale: string }> };

/** Narrow the route param to a supported locale and enable static rendering for it. */
export async function resolveLocale(params: Promise<{ locale: string }>): Promise<Locale> {
  const { locale } = await params;
  const resolved = hasLocale(routing.locales, locale) ? locale : routing.defaultLocale;
  setRequestLocale(resolved);
  return resolved;
}
