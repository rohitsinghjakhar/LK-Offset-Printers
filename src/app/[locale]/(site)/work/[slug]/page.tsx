import type { Metadata } from "next";
import Image from "next/image";
import { notFound } from "next/navigation";
import { getTranslations } from "next-intl/server";
import { ArrowRight } from "lucide-react";
import { ProductCard } from "@/components/catalog/ProductCard";
import { Mockup } from "@/components/mockups";
import { CropMarks, SlugLine } from "@/components/marks";
import { SplitReveal } from "@/components/motion/SplitReveal";
import { TransitionLink } from "@/components/motion/TransitionLink";
import { FinalCta } from "@/components/sections/home/FinalCta";
import { Breadcrumbs } from "@/components/shared/Breadcrumbs";
import { caseStudies as studies } from "@/data/content/work";
import { getIndustry } from "@/data/content/industries";
import { routing } from "@/i18n/routing";
import { resolveLocale } from "@/i18n/params";
import { inkCss } from "@/lib/ink";
import { activeProducts as products, categories } from "@/lib/catalog";

import { pageMetadata } from "@/lib/seo";
import { tx } from "@/types/i18n";

type Props = { params: Promise<{ locale: string; slug: string }> };

// Every case study is prerendered at build time.
export function generateStaticParams() {
  return routing.locales.flatMap((locale) => studies.map((s) => ({ locale, slug: s.slug })));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const locale = await resolveLocale(params);
  const study = studies.find((s) => s.slug === slug);
  if (!study) return {};
  return pageMetadata({
    locale,
    path: `/work/${slug}`,
    title: `${tx(study.title, locale)} — ${tx(study.client, locale)}`,
    description: tx(study.brief, locale),
    type: "article",
  });
}

export default async function CaseStudyPage({ params }: Props) {
  const { slug } = await params;
  const locale = await resolveLocale(params);
  const index = studies.findIndex((s) => s.slug === slug);
  if (index < 0) notFound();
  const study = studies[index];
  const next = studies[(index + 1) % studies.length];

  const t = await getTranslations("work");
  const th = await getTranslations("home.work");
  const tc = await getTranslations("common");
  const tn = await getTranslations("nav");
  const used = study.products.map((s) => products.find((p) => p.slug === s)).filter((p) => p !== undefined);
  const colourOf = (cat: string) => categories.find((c) => c.slug === cat)?.colour ?? "ink";
  const industry = getIndustry(study.industry);
  const title = tx(study.title, locale);

  const sheet = [
    { label: t("client"), value: tx(study.clientType, locale) },
    { label: th("printed"), value: tx(study.printed, locale) },
    { label: th("quantity"), value: tx(study.quantity, locale) },
    { label: th("turnaround"), value: tx(study.turnaround, locale) },
    ...study.specs.map((s) => ({ label: tx(s.label, locale), value: tx(s.value, locale) })),
  ];

  return (
    <>
      <section className="relative border-b border-line pt-[calc(var(--header-h)+40px)] pb-14 md:pb-20">
        <CropMarks inset={14} className="text-ink/30" />
        <div className="container-x">
          <Breadcrumbs
            locale={locale}
            label={tc("breadcrumbHome")}
            items={[
              { name: tc("breadcrumbHome"), path: "/" },
              { name: tn("work"), path: "/work" },
              { name: title, path: `/work/${study.slug}` },
            ]}
          />
          <div className="mt-10 grid gap-10 lg:grid-cols-12 lg:items-end">
            <div className="lg:col-span-7">
              <SlugLine className="text-ink/70">
                {tx(study.client, locale)}
                {industry ? ` · ${tx(industry.name, locale)}` : ""}
              </SlugLine>
              <SplitReveal as="h1" className="mt-5 max-w-[20ch] text-h1 font-semibold" segments={[{ text: title }]} />
            </div>
            <div className="relative aspect-[5/4] overflow-hidden rounded-card lg:col-span-5">
              <div className="absolute inset-0" style={{ background: inkCss[study.colour] }} />
              <div className="halftone-field absolute inset-0 text-ink opacity-10" />
              <div className="absolute inset-[10%] grid place-items-center">
                <Mockup kind={study.mockup} title={title} />
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="container-x grid gap-12 py-14 md:py-20 lg:grid-cols-12">
        <div className="flex flex-col gap-10 lg:col-span-7">
          {(
            [
              ["challenge", study.brief],
              ["solution", study.solution],
              ["result", study.result],
            ] as const
          ).map(([key, text]) => (
            <div key={key}>
              <h2 className="label-mono text-magenta-deep">{t(key)}</h2>
              <p className="mt-3 text-lead">{tx(text, locale)}</p>
            </div>
          ))}
        </div>
        <aside className="lg:col-span-5">
          <div className="rounded-card border border-line bg-paper p-6 lg:sticky lg:top-[calc(var(--header-h)+24px)]">
            <h2 className="label-mono text-ink-muted">{t("specs")}</h2>
            <dl className="mt-4 divide-y divide-line">
              {sheet.map((row) => (
                <div key={row.label} className="flex justify-between gap-4 py-3 text-small">
                  <dt className="text-ink-muted">{row.label}</dt>
                  <dd className="text-right font-medium">{row.value}</dd>
                </div>
              ))}
            </dl>
          </div>
        </aside>
      </section>

      {study.images?.length ? (
        <section aria-labelledby="photos-title" className="container-x pb-14 md:pb-20">
          <h2 id="photos-title" className="label-mono text-ink-muted">
            {t("photos")}
          </h2>
          <ul className="mt-6 grid gap-4 sm:grid-cols-2">
            {study.images.map((src, i) => (
              <li key={src} className="relative aspect-[4/3] overflow-hidden rounded-card bg-paper-2">
                <Image src={src} alt={`${title} ${i + 1}`} fill sizes="(min-width: 640px) 50vw, 100vw" className="object-cover" />
              </li>
            ))}
          </ul>
        </section>
      ) : null}

      {used.length ? (
        <section aria-labelledby="used-title" className="border-t border-line bg-paper-2 py-14 md:py-20">
          <div className="container-x">
            <h2 id="used-title" className="font-display text-h2 font-semibold">
              {t("products")}
            </h2>
            <ul className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {used.map((p) => (
                <li key={p.slug}>
                  <ProductCard product={p} colour={colourOf(p.category)} />
                </li>
              ))}
            </ul>
          </div>
        </section>
      ) : null}

      {next && next.slug !== study.slug ? (
        <section className="container-x py-14">
          <TransitionLink href={`/work/${next.slug}`} className="group flex items-center justify-between gap-6 border-y border-ink py-8">
            <span>
              <span className="block label-mono text-ink-muted">{t("next")}</span>
              <span className="mt-2 block font-display text-h3 font-semibold">{tx(next.title, locale)}</span>
            </span>
            <ArrowRight className="size-8 shrink-0 transition-transform duration-300 group-hover:translate-x-1" aria-hidden />
          </TransitionLink>
          <TransitionLink href="/work" className="mt-6 inline-flex min-h-11 items-center text-small font-medium underline underline-offset-4">
            {t("all")}
          </TransitionLink>
        </section>
      ) : null}

      <FinalCta />
    </>
  );
}
