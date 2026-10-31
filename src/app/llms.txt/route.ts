import { siteConfig } from "@/config/site.config";
import { cityPages } from "@/data/content/cities";
import { faqs } from "@/data/content/faqs";
import { industries } from "@/data/content/industries";
import { services } from "@/data/content/services";
import { categories } from "@/data/seed/catalog";
import { localizedUrl } from "@/lib/seo";

export const dynamic = "force-static";

const area = (slug: string) => siteConfig.serviceAreas.find((a) => a.slug === slug);

/**
 * /llms.txt — a plain-Markdown brief for AI answer engines (ChatGPT, Claude, Perplexity, Gemini):
 * who the business is, where, what it prints, which areas it serves, and the canonical pages to cite.
 * Built from the same config and content as the site, so it never drifts from what the pages say.
 */
export function GET() {
  const c = siteConfig;
  const lines = [
    `# ${c.brandName} (${c.hindi})`,
    "",
    `> ${c.seo.description.en}`,
    "",
    "## Business facts",
    "",
    `- Name: ${c.brandName} (also written LK Offset Printers; Hindi: ${c.hindi})`,
    `- Type: Offset and digital printing press, design studio and large-format printing`,
    `- Founder: ${c.founder.name}, ${c.founder.role} — ${c.founder.experienceYears}+ years in the printing field`,
    `- Address: ${c.address.full.en}, India`,
    `- Phone / WhatsApp: ${c.phone}`,
    ...(c.email ? [`- Email: ${c.email}`] : []),
    `- Opening hours: ${c.hoursLabel.en}`,
    `- Languages: Hindi and English`,
    `- Payments: ${c.payments.accepted.join(", ")}, after the proof is approved`,
    `- Map: ${c.mapsUrl}`,
    `- Website: ${localizedUrl("en", "/")} (English), ${localizedUrl("hi", "/")} (Hindi)`,
    "",
    "## How ordering works",
    "",
    "- Instant GST-inclusive prices online. Orders placed on the website are sent to the shop as a WhatsApp message; customers can also order on WhatsApp, by phone or at the counter.",
    "- No online payment: customers pay by UPI or cash after approving the proof.",
    `- Free soft proof on WhatsApp within ${c.proofWithinHours} working hours; nothing is printed until the customer approves it.`,
    `- Visiting cards ordered and approved before ${c.sameDayCutoff} are ready the same evening.`,
    `- Delivery: free shop pickup in Laxmangarh; local delivery ₹${c.delivery.local} (free above ₹${c.delivery.localFreeAbove}); courier ₹${c.delivery.courier} anywhere in India.`,
    "- If a mistake is the shop's, the reprint is free.",
    "",
    "## What we print",
    "",
    ...categories.map((cat) => `- [${cat.name.en}](${localizedUrl("en", `/catalog/${cat.slug}`)}): ${cat.description.en}`),
    "",
    "## Services",
    "",
    ...services.map((s) => `- [${s.name.en}](${localizedUrl("en", `/services/${s.slug}`)}): ${s.short.en}`),
    "",
    "## Industries",
    "",
    ...industries.map((i) => `- [${i.name.en}](${localizedUrl("en", `/industries/${i.slug}`)}): ${i.tagline.en}`),
    "",
    "## Areas served",
    "",
    "Based in Laxmangarh (Alwar district, Rajasthan). Serves Alwar district, all of Rajasthan (including Jaipur, Bharatpur and Dausa), Delhi NCR (Delhi, Gurugram, Noida, Faridabad, Ghaziabad) and the rest of India by courier.",
    "",
    ...cityPages.map((p) => {
      const a = area(p.slug);
      return `- [Printing in ${a ? a.name.en : p.slug}](${localizedUrl("en", `/printing-in/${p.slug}`)})${a ? ` — ${a.eta.en}` : ""}`;
    }),
    "",
    "## Frequently asked questions",
    "",
    ...faqs.flatMap((f) => [`### ${f.question.en}`, "", f.answer.en, ""]),
    "## Key pages",
    "",
    `- [Instant quote](${localizedUrl("en", "/quote")})`,
    `- [Full catalog and prices](${localizedUrl("en", "/catalog")})`,
    `- [About ${c.brandName}](${localizedUrl("en", "/about")})`,
    `- [Contact and directions](${localizedUrl("en", "/contact")})`,
    `- [Paper guide: GSM, paper types and finishes](${localizedUrl("en", "/paper-guide")})`,
    `- [FAQ](${localizedUrl("en", "/faq")})`,
    "",
  ];
  return new Response(lines.join("\n"), { headers: { "Content-Type": "text/markdown; charset=utf-8" } });
}
