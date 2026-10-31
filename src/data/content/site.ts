import type { L } from "@/types/i18n";

export type OfferBanner = {
  active: boolean;
  text: L;
  colour: "magenta" | "cyan" | "yellow" | "ink";
  /** "/catalog/wedding" (internal) or a full https:// URL. */
  href?: string;
  /** ISO dates. The site is static, so these are checked when it is built. */
  startsAt?: string;
  endsAt?: string;
};

export type FestivalMode = "off" | "diwali" | "holi" | "wedding";

/**
 * Site-wide strip and seasonal accent. To run an offer, set `active: true`, write the text,
 * then rebuild and upload the site.
 */
export const siteContent: { banner: OfferBanner; festival: FestivalMode } = {
  banner: {
    active: false,
    text: {
      en: "Wedding season offer: free design on every wedding card order",
      hi: "शादी सीज़न ऑफ़र: हर शादी कार्ड ऑर्डर पर डिज़ाइन फ़्री",
    },
    colour: "magenta",
    href: "/catalog/wedding-events",
  },
  festival: "off",
};

export function bannerIsLive(banner: OfferBanner | null, now = new Date()): banner is OfferBanner {
  if (!banner?.active) return false;
  if (banner.startsAt && new Date(banner.startsAt) > now) return false;
  if (banner.endsAt && new Date(banner.endsAt) < now) return false;
  return true;
}
