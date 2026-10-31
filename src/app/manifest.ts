import type { MetadataRoute } from "next";
import { siteConfig } from "@/config/site.config";

export const dynamic = "force-static";

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: `${siteConfig.brandName} — ${siteConfig.city.en}`,
    short_name: siteConfig.short === "L.K." ? "L.K." : siteConfig.short,
    description: `${siteConfig.taglineEn} Visiting cards, flex, wedding cards and more from ${siteConfig.city.en}.`,
    start_url: "/en/",
    scope: "/",
    display: "standalone",
    background_color: "#F6F3EC",
    theme_color: "#F6F3EC",
    lang: "en-IN",
    categories: ["business", "shopping"],
    icons: [
      { src: "/icon.svg", sizes: "any", type: "image/svg+xml", purpose: "any" },
      { src: "/apple-icon.png", sizes: "180x180", type: "image/png" },
    ],
  };
}
