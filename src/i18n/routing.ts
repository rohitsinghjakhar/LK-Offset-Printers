import { defineRouting } from "next-intl/routing";
import { locales } from "@/types/i18n";

export const routing = defineRouting({
  locales,
  defaultLocale: "en",
  localePrefix: "always",
  localeCookie: { maxAge: 60 * 60 * 24 * 365 },
});
