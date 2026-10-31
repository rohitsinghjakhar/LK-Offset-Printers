import type { Metadata } from "next";
import { siteConfig } from "@/config/site.config";
import type { Locale } from "@/types/i18n";
import { tx } from "@/types/i18n";

export function absoluteUrl(path: string): string {
  return `${siteConfig.url.replace(/\/$/, "")}${path.startsWith("/") ? path : `/${path}`}`;
}

/** Page URLs end in "/" to match the static export (trailingSlash: true), so canonicals never redirect. */
export function localizedUrl(locale: Locale | string, path: string): string {
  const clean = path === "/" ? "" : path.replace(/\/$/, "");
  return absoluteUrl(`/${locale}${clean}/`);
}

type PageMetaInput = {
  locale: Locale | string;
  path: string;
  title: string;
  description?: string;
  noIndex?: boolean;
  type?: "website" | "article";
};

/** Title ≤ 60, description ≤ 155, canonical + en-IN / hi-IN alternates, OG + Twitter. */
export function pageMetadata({ locale, path, title, description, noIndex, type = "website" }: PageMetaInput): Metadata {
  const url = localizedUrl(locale, path);
  const clippedTitle = title.length > 60 ? `${title.slice(0, 59).trimEnd()}…` : title;
  const clippedDescription = description && description.length > 155 ? `${description.slice(0, 154).trimEnd()}…` : description;
  return {
    title: clippedTitle,
    description: clippedDescription,
    alternates: {
      canonical: url,
      languages: {
        "en-IN": localizedUrl("en", path),
        "hi-IN": localizedUrl("hi", path),
        "x-default": localizedUrl("en", path),
      },
    },
    openGraph: {
      title: clippedTitle,
      description: clippedDescription,
      url,
      siteName: siteConfig.brandName,
      locale: locale === "hi" ? "hi_IN" : "en_IN",
      alternateLocale: locale === "hi" ? "en_IN" : "hi_IN",
      type,
      // Built by app/[locale]/og.png/route.tsx.
      images: [{ url: `/${locale}/og.png`, width: 1200, height: 630, alt: siteConfig.brandName }],
    },
    twitter: { card: "summary_large_image", title: clippedTitle, description: clippedDescription, images: [`/${locale}/og.png`] },
    robots: noIndex ? { index: false, follow: true } : undefined,
  };
}

const DAY_CODES: Record<string, string> = {
  Monday: "Mo",
  Tuesday: "Tu",
  Wednesday: "We",
  Thursday: "Th",
  Friday: "Fr",
  Saturday: "Sa",
  Sunday: "Su",
};

/** schema.org place for a service area: India is a Country, Rajasthan a State, Delhi NCR a region, the rest cities. */
export function areaJsonLd(slug: string, name: string) {
  if (slug === "india") return { "@type": "Country", name: "India" };
  if (slug === "rajasthan") return { "@type": "State", name: "Rajasthan", containedInPlace: { "@type": "Country", name: "India" } };
  if (slug === "delhi-ncr") return { "@type": "AdministrativeArea", name: "Delhi NCR (National Capital Region)" };
  return { "@type": "City", name };
}

function founderJsonLd() {
  return {
    "@type": "Person",
    "@id": absoluteUrl("/#founder"),
    name: siteConfig.founder.name,
    alternateName: siteConfig.founder.nameHi,
    jobTitle: siteConfig.founder.role,
    description: `Founder of ${siteConfig.brandName}, with more than ${siteConfig.founder.experienceYears} years of experience in the printing field.`,
    worksFor: { "@id": absoluteUrl("/#business") },
  };
}

export function localBusinessJsonLd(locale: Locale | string) {
  const sameAs = Object.values(siteConfig.social).filter(Boolean);
  return {
    "@context": "https://schema.org",
    "@type": "LocalBusiness",
    "@id": absoluteUrl("/#business"),
    name: siteConfig.brandName,
    alternateName: [siteConfig.hindi, "LK Offset Printers", "L.K. Offset Printers Laxmangarh"],
    description: tx(siteConfig.seo.description, locale),
    slogan: locale === "hi" ? siteConfig.taglineHi : siteConfig.taglineEn,
    url: localizedUrl(locale, "/"),
    telephone: siteConfig.phoneE164,
    ...(siteConfig.email ? { email: siteConfig.email } : {}),
    priceRange: "₹₹",
    foundingDate: String(siteConfig.established),
    founder: founderJsonLd(),
    image: [absoluteUrl("/images/stock/printing-workshop.webp"), absoluteUrl(`/${locale}/og.png`)],
    logo: absoluteUrl("/icon.svg"),
    address: {
      "@type": "PostalAddress",
      streetAddress: tx(siteConfig.address.street, "en"),
      addressLocality: siteConfig.address.locality,
      addressRegion: siteConfig.address.region,
      postalCode: siteConfig.address.postalCode,
      addressCountry: siteConfig.address.country,
    },
    geo: { "@type": "GeoCoordinates", latitude: siteConfig.geo.lat, longitude: siteConfig.geo.lng },
    hasMap: siteConfig.mapsUrl,
    openingHoursSpecification: siteConfig.hours.map((h) => ({
      "@type": "OpeningHoursSpecification",
      dayOfWeek: h.schema.map((d) => `https://schema.org/${d}`),
      opens: h.open,
      closes: h.close,
    })),
    openingHours: siteConfig.hours.map((h) => `${h.schema.map((d) => DAY_CODES[d]).join(",")} ${h.open}-${h.close}`),
    areaServed: siteConfig.serviceAreas.map((a) => areaJsonLd(a.slug, tx(a.name, "en"))),
    knowsAbout: siteConfig.seo.knowsAbout,
    knowsLanguage: ["en-IN", "hi-IN"],
    paymentAccepted: siteConfig.payments.accepted.join(", "),
    currenciesAccepted: "INR",
    ...(siteConfig.seo.publishRatings
      ? { aggregateRating: { "@type": "AggregateRating", ratingValue: siteConfig.stats.rating, bestRating: 5, ratingCount: siteConfig.stats.reviewCount } }
      : {}),
    ...(sameAs.length ? { sameAs } : {}),
  };
}

export function organizationJsonLd() {
  const sameAs = Object.values(siteConfig.social).filter(Boolean);
  return {
    "@context": "https://schema.org",
    "@type": "Organization",
    "@id": absoluteUrl("/#org"),
    name: siteConfig.brandName,
    alternateName: siteConfig.hindi,
    url: siteConfig.url,
    logo: absoluteUrl("/icon.svg"),
    description: siteConfig.seo.description.en,
    foundingDate: String(siteConfig.established),
    founder: { "@id": absoluteUrl("/#founder") },
    address: {
      "@type": "PostalAddress",
      addressLocality: siteConfig.address.locality,
      addressRegion: siteConfig.address.region,
      postalCode: siteConfig.address.postalCode,
      addressCountry: siteConfig.address.country,
    },
    contactPoint: [
      {
        "@type": "ContactPoint",
        telephone: siteConfig.phoneE164,
        contactType: "customer service",
        areaServed: ["IN-RJ", "IN-DL", "IN-HR", "IN-UP", "IN"],
        availableLanguage: ["en", "hi"],
      },
    ],
    ...(sameAs.length ? { sameAs } : {}),
  };
}

export function websiteJsonLd(locale: Locale | string) {
  return {
    "@context": "https://schema.org",
    "@type": "WebSite",
    "@id": absoluteUrl("/#website"),
    name: siteConfig.brandName,
    alternateName: siteConfig.hindi,
    url: localizedUrl(locale, "/"),
    inLanguage: locale === "hi" ? "hi-IN" : "en-IN",
    publisher: { "@id": absoluteUrl("/#org") },
  };
}

export function breadcrumbJsonLd(locale: Locale | string, items: { name: string; path: string }[]) {
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: items.map((item, i) => ({ "@type": "ListItem", position: i + 1, name: item.name, item: localizedUrl(locale, item.path) })),
  };
}

export function faqJsonLd(items: { question: string; answer: string }[]) {
  return {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: items.map((item) => ({ "@type": "Question", name: item.question, acceptedAnswer: { "@type": "Answer", text: item.answer } })),
  };
}
