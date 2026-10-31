import { getLocale, getTranslations } from "next-intl/server";
import { AccordionIsland } from "@/components/ui/AccordionIsland";
import { TransitionLink } from "@/components/motion/TransitionLink";
import { SectionHeader } from "@/components/shared/SectionHeader";
import { JsonLd } from "@/components/seo/JsonLd";
import { faqJsonLd } from "@/lib/seo";
import { tx } from "@/types/i18n";
import type { Faq } from "@/data/content/faqs";

/** S13 — eight counter questions in an accordion, with FAQPage JSON-LD. */
export async function HomeFaq({ faqs }: { faqs: Faq[] }) {
  const t = await getTranslations("home.faq");
  const locale = await getLocale();
  const items = faqs.slice(0, 8).map((f) => ({ id: f.id, question: tx(f.question, locale), answer: tx(f.answer, locale) }));
  return (
    <section aria-labelledby="faq-title" className="section-y">
      <div className="container-x grid gap-12 lg:grid-cols-12">
        <div className="lg:col-span-4">
          <SectionHeader id="faq-title" slug={t("slug")} title={t("title")} accent={t("titleAccent")} after={t("titleAfter")} />
          <TransitionLink href="/faq" className="mt-8 inline-flex min-h-11 items-center font-medium underline underline-offset-4">
            {t("more")} →
          </TransitionLink>
        </div>
        <div className="lg:col-span-8">
          <AccordionIsland items={items} />
        </div>
      </div>
      <JsonLd data={faqJsonLd(items)} />
    </section>
  );
}
