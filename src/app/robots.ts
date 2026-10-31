import type { MetadataRoute } from "next";
import { absoluteUrl } from "@/lib/seo";
import { siteConfig } from "@/config/site.config";

// Per-visitor pages (cart and order form) have nothing worth indexing.
const disallow = ["/*/cart/", "/*/checkout/"];

/**
 * Search engines and AI answer engines (ChatGPT, Claude, Perplexity, Gemini, Copilot) are named
 * explicitly so the public pages can be cited in AI answers; everyone gets the same private paths.
 */
const crawlers = [
  "Googlebot",
  "Bingbot",
  "Google-Extended",
  "GPTBot",
  "OAI-SearchBot",
  "ChatGPT-User",
  "ClaudeBot",
  "Claude-SearchBot",
  "Claude-User",
  "PerplexityBot",
  "Perplexity-User",
  "Applebot",
  "Applebot-Extended",
  "DuckDuckBot",
  "YandexBot",
  "meta-externalagent",
  "CCBot",
];

export const dynamic = "force-static";

export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      { userAgent: crawlers, allow: ["/", "/llms.txt"], disallow },
      { userAgent: "*", allow: "/", disallow },
    ],
    sitemap: absoluteUrl("/sitemap.xml"),
    host: siteConfig.url,
  };
}
