import type { MetadataRoute } from "next";
import { cityPages } from "@/data/content/cities";
import { industries } from "@/data/content/industries";
import { legalDocs } from "@/data/content/legal";
import { services } from "@/data/content/services";
import { routing } from "@/i18n/routing";
import { activeProducts as products, categories } from "@/lib/catalog";
import { caseStudies as studies } from "@/data/content/work";
import { localizedUrl } from "@/lib/seo";

type Entry = { path: string; priority: number; changeFrequency: MetadataRoute.Sitemap[number]["changeFrequency"]; lastModified?: string };

/** Every public page in both languages, each listing its en/hi alternates. Utility pages (cart, checkout, track) are left out. */
export const dynamic = "force-static";

export default function sitemap(): MetadataRoute.Sitemap {
  const entries: Entry[] = [
    { path: "/", priority: 1, changeFrequency: "weekly" },
    { path: "/catalog", priority: 0.9, changeFrequency: "weekly" },
    { path: "/quote", priority: 0.8, changeFrequency: "monthly" },
    { path: "/services", priority: 0.8, changeFrequency: "monthly" },
    { path: "/work", priority: 0.7, changeFrequency: "monthly" },
    { path: "/industries", priority: 0.7, changeFrequency: "monthly" },
    { path: "/paper-guide", priority: 0.6, changeFrequency: "yearly" },
    { path: "/about", priority: 0.6, changeFrequency: "yearly" },
    { path: "/contact", priority: 0.7, changeFrequency: "yearly" },
    { path: "/faq", priority: 0.6, changeFrequency: "monthly" },
    ...categories.map((c) => ({ path: `/catalog/${c.slug}`, priority: 0.8, changeFrequency: "weekly" as const })),
    ...products.map((p) => ({ path: `/product/${p.slug}`, priority: p.bestseller ? 0.8 : 0.7, changeFrequency: "weekly" as const })),
    ...services.map((s) => ({ path: `/services/${s.slug}`, priority: 0.7, changeFrequency: "monthly" as const })),
    ...industries.map((i) => ({ path: `/industries/${i.slug}`, priority: 0.6, changeFrequency: "monthly" as const })),
    ...studies.map((s) => ({ path: `/work/${s.slug}`, priority: 0.5, changeFrequency: "yearly" as const })),
    ...cityPages.map((c) => ({ path: `/printing-in/${c.slug}`, priority: 0.7, changeFrequency: "monthly" as const })),
    ...Object.values(legalDocs).map((d) => ({ path: `/legal/${d.slug}`, priority: 0.2, changeFrequency: "yearly" as const, lastModified: d.updated })),
  ];

  return entries.flatMap((entry) =>
    routing.locales.map((locale) => ({
      url: localizedUrl(locale, entry.path),
      lastModified: entry.lastModified,
      changeFrequency: entry.changeFrequency,
      priority: entry.priority,
      alternates: {
        languages: { "en-IN": localizedUrl("en", entry.path), "hi-IN": localizedUrl("hi", entry.path), "x-default": localizedUrl("en", entry.path) },
      },
    })),
  );
}
