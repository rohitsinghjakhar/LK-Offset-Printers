import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { getTranslations } from "next-intl/server";
import { DeletionForm } from "@/components/forms/DeletionForm";
import { TransitionLink } from "@/components/motion/TransitionLink";
import { Breadcrumbs } from "@/components/shared/Breadcrumbs";
import { PageHero } from "@/components/shared/PageHero";
import { legalDocs, type LegalSlug } from "@/data/content/legal";
import { routing } from "@/i18n/routing";
import { resolveLocale } from "@/i18n/params";
import { formatDate } from "@/lib/format";
import { pageMetadata } from "@/lib/seo";
import { tx } from "@/types/i18n";

type Props = { params: Promise<{ locale: string; doc: string }> };

const SLUGS = Object.keys(legalDocs) as LegalSlug[];
const isLegalSlug = (s: string): s is LegalSlug => (SLUGS as string[]).includes(s);

const LABEL = { privacy: "privacy", terms: "terms", "refund-cancellation": "refund", "shipping-delivery": "shipping" } as const;
const META = {
  privacy: "legalPrivacyTitle",
  terms: "legalTermsTitle",
  "refund-cancellation": "legalRefundTitle",
  "shipping-delivery": "legalShippingTitle",
} as const;

export function generateStaticParams() {
  return routing.locales.flatMap((locale) => SLUGS.map((doc) => ({ locale, doc })));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { doc } = await params;
  const locale = await resolveLocale(params);
  if (!isLegalSlug(doc)) return {};
  const t = await getTranslations({ locale, namespace: "meta" });
  return pageMetadata({ locale, path: `/legal/${doc}`, title: t(META[doc]), description: t("legalDescription") });
}

export default async function LegalPage({ params }: Props) {
  const { doc: slug } = await params;
  const locale = await resolveLocale(params);
  if (!isLegalSlug(slug)) notFound();
  const doc = legalDocs[slug];
  const t = await getTranslations("legal");
  const tf = await getTranslations("footer");
  const tc = await getTranslations("common");
  const title = tf(LABEL[slug]);
  const sections = slug === "privacy" ? [...doc.sections, { id: "delete", title: { en: t("deletionTitle"), hi: t("deletionTitle") }, body: [] }] : doc.sections;

  return (
    <>
      <PageHero slug={`${tf("legal").toUpperCase()} · ${t("updated", { date: formatDate(doc.updated, locale) })}`} title={title} sub={tx(doc.intro, locale)}>
        <Breadcrumbs
          className="mt-8"
          locale={locale}
          label={tc("breadcrumbHome")}
          items={[
            { name: tc("breadcrumbHome"), path: "/" },
            { name: title, path: `/legal/${slug}` },
          ]}
        />
      </PageHero>

      <div className="container-x grid gap-12 py-14 md:py-20 lg:grid-cols-12">
        <nav aria-labelledby="toc-title" className="lg:col-span-3">
          <div className="lg:sticky lg:top-[calc(var(--header-h)+24px)]">
            <h2 id="toc-title" className="label-mono text-ink-muted">
              {t("contents")}
            </h2>
            <ol className="mt-3 flex flex-col border-l border-line">
              {sections.map((s) => (
                <li key={s.id}>
                  <a
                    href={`#${s.id}`}
                    className="-ml-px inline-flex min-h-10 items-center border-l border-transparent pl-4 text-small text-ink-muted hover:border-ink hover:text-ink"
                  >
                    {tx(s.title, locale)}
                  </a>
                </li>
              ))}
            </ol>
            <h2 className="mt-10 label-mono text-ink-muted">{t("otherPolicies")}</h2>
            <ul className="mt-3 flex flex-col gap-1">
              {SLUGS.filter((s) => s !== slug).map((s) => (
                <li key={s}>
                  <TransitionLink href={`/legal/${s}`} className="inline-flex min-h-10 items-center text-small font-medium underline-offset-4 hover:underline">
                    {tf(LABEL[s])}
                  </TransitionLink>
                </li>
              ))}
            </ul>
          </div>
        </nav>

        <article className="flex max-w-[70ch] flex-col gap-12 lg:col-span-8 lg:col-start-5">
          {doc.sections.map((section) => (
            <section key={section.id} id={section.id} aria-labelledby={`${section.id}-title`} className="scroll-mt-[calc(var(--header-h)+24px)]">
              <h2 id={`${section.id}-title`} className="font-display text-h3 font-semibold">
                {tx(section.title, locale)}
              </h2>
              {section.body.map((p, i) => (
                <p key={i} className="mt-4 text-body">
                  {tx(p, locale)}
                </p>
              ))}
              {section.list ? (
                <ul className="mt-4 flex list-disc flex-col gap-2 pl-5 text-body marker:text-magenta">
                  {section.list.map((item) => (
                    <li key={item.en}>{tx(item, locale)}</li>
                  ))}
                </ul>
              ) : null}
            </section>
          ))}

          {slug === "privacy" ? (
            <section
              id="delete"
              aria-labelledby="delete-title"
              className="scroll-mt-[calc(var(--header-h)+24px)] rounded-card border border-line bg-paper p-6 md:p-8"
            >
              <h2 id="delete-title" className="font-display text-h3 font-semibold">
                {t("deletionTitle")}
              </h2>
              <p className="mt-3 mb-6 text-body text-ink-muted">{t("deletionSub")}</p>
              <DeletionForm />
            </section>
          ) : null}
        </article>
      </div>
    </>
  );
}
