import type { Metadata } from "next";
import { getTranslations } from "next-intl/server";
import { WhatsAppIcon } from "@/components/icons";
import { InkButton } from "@/components/motion/InkButton";
import { JsonLd } from "@/components/seo/JsonLd";
import { Breadcrumbs } from "@/components/shared/Breadcrumbs";
import { PageHero } from "@/components/shared/PageHero";
import { AccordionIsland } from "@/components/ui/AccordionIsland";
import type { Faq } from "@/data/content/faqs";
import { resolveLocale, type LocaleParams } from "@/i18n/params";
import { faqs } from "@/data/content/faqs";
import { faqJsonLd, pageMetadata } from "@/lib/seo";
import { waGreeting, waLink } from "@/lib/whatsapp";
import { tx } from "@/types/i18n";

const TOPICS: Faq["topic"][] = ["ordering", "files", "proof", "payment", "delivery"];

export async function generateMetadata({ params }: LocaleParams): Promise<Metadata> {
  const locale = await resolveLocale(params);
  const t = await getTranslations({ locale, namespace: "meta" });
  return pageMetadata({ locale, path: "/faq", title: t("faqTitle"), description: t("faqDescription") });
}

export default async function FaqPage({ params }: LocaleParams) {
  const locale = await resolveLocale(params);
  const t = await getTranslations("faqPage");
  const tc = await getTranslations("common");
  const tn = await getTranslations("nav");
  const groups = TOPICS.map((topic) => ({
    topic,
    items: faqs.filter((f) => f.topic === topic).map((f) => ({ id: f.id, question: tx(f.question, locale), answer: tx(f.answer, locale) })),
  })).filter((g) => g.items.length);

  return (
    <>
      <PageHero slug={t("slug")} title={t("title")} accent={t("titleAccent")} sub={t("sub")}>
        <Breadcrumbs
          className="mt-8"
          locale={locale}
          label={tc("breadcrumbHome")}
          items={[
            { name: tc("breadcrumbHome"), path: "/" },
            { name: tn("faq"), path: "/faq" },
          ]}
        />
      </PageHero>

      <section className="container-x grid gap-12 py-14 md:py-20 lg:grid-cols-12">
        <nav aria-label={t("slug")} className="lg:col-span-3">
          <ul className="flex flex-wrap gap-2 lg:sticky lg:top-[calc(var(--header-h)+24px)] lg:flex-col lg:gap-1">
            {groups.map((g) => (
              <li key={g.topic}>
                <a
                  href={`#faq-${g.topic}`}
                  className="inline-flex min-h-11 items-center rounded-chip border border-ink/20 px-4 text-small font-medium hover:border-ink lg:w-full lg:rounded-card lg:border-0 lg:px-3 lg:hover:bg-paper-2"
                >
                  {t(`topics.${g.topic}`)} <span className="ml-2 font-mono text-[0.75rem] text-ink-muted">{g.items.length}</span>
                </a>
              </li>
            ))}
          </ul>
        </nav>
        <div className="flex flex-col gap-14 lg:col-span-9">
          {groups.map((g) => (
            <section key={g.topic} id={`faq-${g.topic}`} aria-labelledby={`faq-${g.topic}-title`}>
              <h2 id={`faq-${g.topic}-title`} className="font-display text-h3 font-semibold">
                {t(`topics.${g.topic}`)}
              </h2>
              <AccordionIsland className="mt-4" items={g.items} />
            </section>
          ))}

          <div className="flex flex-col items-start gap-4 rounded-card bg-ink p-8 text-paper md:flex-row md:items-center md:justify-between">
            <p className="font-display text-h3 font-semibold">{t("askTitle")}</p>
            <InkButton href={waLink(waGreeting(locale))} variant="paper" size="lg" icon={<WhatsAppIcon className="size-5" />}>
              {tc("whatsappUs")}
            </InkButton>
          </div>
        </div>
      </section>
      <JsonLd data={faqJsonLd(groups.flatMap((g) => g.items))} />
    </>
  );
}
