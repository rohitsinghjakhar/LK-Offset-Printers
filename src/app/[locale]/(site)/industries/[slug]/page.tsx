import type { Metadata } from "next";
import Image from "next/image";
import { notFound } from "next/navigation";
import { getTranslations } from "next-intl/server";
import { ArrowRight, Check } from "lucide-react";
import { ProductCard } from "@/components/catalog/ProductCard";
import { IndustryIcon, WhatsAppIcon } from "@/components/icons";
import { InkButton } from "@/components/motion/InkButton";
import { Reveal } from "@/components/motion/Reveal";
import { TransitionLink } from "@/components/motion/TransitionLink";
import { FinalCta } from "@/components/sections/home/FinalCta";
import { WorkCard } from "@/components/sections/home/SelectedWork";
import { JsonLd } from "@/components/seo/JsonLd";
import { Breadcrumbs } from "@/components/shared/Breadcrumbs";
import { PageHero } from "@/components/shared/PageHero";
import { AccordionIsland } from "@/components/ui/AccordionIsland";
import { siteConfig } from "@/config/site.config";
import { getIndustry, industries, industryPhotos } from "@/data/content/industries";
import { routing } from "@/i18n/routing";
import { resolveLocale } from "@/i18n/params";
import { inkBg } from "@/lib/ink";
import { activeProducts as products, categories } from "@/lib/catalog";
import { caseStudies as studies } from "@/data/content/work";
import { faqJsonLd, pageMetadata } from "@/lib/seo";
import { waGreeting, waLink } from "@/lib/whatsapp";
import { tx } from "@/types/i18n";

type Props = { params: Promise<{ locale: string; slug: string }> };

export function generateStaticParams() {
  return routing.locales.flatMap((locale) => industries.map((i) => ({ locale, slug: i.slug })));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const locale = await resolveLocale(params);
  const industry = getIndustry(slug);
  if (!industry) return {};
  const name = tx(industry.name, locale);
  return pageMetadata({
    locale,
    path: `/industries/${slug}`,
    title: locale === "hi" ? `${name} के लिए प्रिंटिंग — अलवर | ${siteConfig.brandName}` : `Printing for ${name} in Alwar | ${siteConfig.brandName}`,
    description: tx(industry.intro, locale),
  });
}

export default async function IndustryPage({ params }: Props) {
  const { slug } = await params;
  const locale = await resolveLocale(params);
  const industry = getIndustry(slug);
  if (!industry) notFound();

  const t = await getTranslations("industriesPage");
  const tc = await getTranslations("common");
  const tn = await getTranslations("nav");
  const name = tx(industry.name, locale);
  const kit = industry.kit.map((s) => products.find((p) => p.slug === s)).filter((p) => p !== undefined);
  const more = products.filter((p) => p.industries.includes(industry.slug) && !industry.kit.includes(p.slug)).slice(0, 6);
  const colourOf = (cat: string) => categories.find((c) => c.slug === cat)?.colour ?? "ink";
  const work = studies.filter((s) => s.industry === industry.slug).slice(0, 3);
  const faqs = industry.faqs.map((f, i) => ({ id: `${industry.slug}-${i}`, question: tx(f.question, locale), answer: tx(f.answer, locale) }));

  return (
    <>
      <PageHero
        slug={t("slug")}
        title={name}
        sub={tx(industry.tagline, locale)}
        aside={
          <figure className="relative aspect-[4/3] overflow-hidden rounded-card bg-paper-2 shadow-paper">
            <Image
              src={`/images/stock/${industryPhotos[industry.slug]}.webp`}
              alt={locale === "hi" ? `${name} — उदाहरण फ़ोटो` : `${name} — illustrative photo`}
              fill
              preload
              sizes="(min-width: 1024px) 38vw, 92vw"
              className="object-cover"
            />
            <span className={`absolute bottom-4 left-4 grid size-14 place-items-center rounded-full shadow-paper ${inkBg[industry.colour]}`}>
              <IndustryIcon slug={industry.slug} className="size-8" />
            </span>
            <figcaption className="absolute right-2 bottom-2 rounded bg-paper/95 px-2 py-1 text-[11px] leading-tight text-ink">
              Illustrative photo · Pexels
            </figcaption>
          </figure>
        }
      >
        <p className="mt-6 max-w-[60ch] text-body text-ink-muted">{tx(industry.intro, locale)}</p>
        <div className="mt-8 flex flex-wrap gap-3">
          <InkButton href="/quote" size="lg" icon={<ArrowRight className="size-5" />}>
            {tc("getInstantQuote")}
          </InkButton>
          <InkButton href={waLink(waGreeting(locale, name))} variant="ghost" size="lg" icon={<WhatsAppIcon className="size-5" />}>
            {tc("whatsappUs")}
          </InkButton>
        </div>
        <Breadcrumbs
          className="mt-8"
          locale={locale}
          label={tc("breadcrumbHome")}
          items={[
            { name: tc("breadcrumbHome"), path: "/" },
            { name: tn("industries"), path: "/industries" },
            { name, path: `/industries/${industry.slug}` },
          ]}
        />
      </PageHero>

      <section aria-labelledby="kit-title" className="container-x py-14 md:py-20">
        <h2 id="kit-title" className="font-display text-h2 font-semibold">
          {t("kit")}
        </h2>
        <ul className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {kit.map((p) => (
            <li key={p.slug}>
              <ProductCard product={p} colour={colourOf(p.category)} />
            </li>
          ))}
        </ul>
        {more.length ? (
          <>
            <h3 className="mt-12 label-mono text-ink-muted">{t("products", { name })}</h3>
            <ul className="mt-4 flex flex-wrap gap-2">
              {more.map((p) => (
                <li key={p.slug}>
                  <TransitionLink
                    href={`/product/${p.slug}`}
                    className="inline-flex min-h-11 items-center rounded-chip border border-ink/20 px-4 text-small font-medium hover:border-ink"
                  >
                    {tx(p.name, locale)}
                  </TransitionLink>
                </li>
              ))}
            </ul>
          </>
        ) : null}
      </section>

      <section aria-labelledby="why-title" className="ink-grain bg-ink py-14 text-paper md:py-20">
        <div className="container-x">
          <h2 id="why-title" className="font-display text-h2 font-semibold">
            {t("why")}
          </h2>
          <ul className="mt-10 grid gap-6 md:grid-cols-3">
            {industry.why.map((w, i) => (
              <li key={w.en}>
                <Reveal delay={i * 0.06} className="flex h-full gap-3 rounded-card border border-line-ink p-6">
                  <Check className="mt-1 size-5 shrink-0 text-magenta" aria-hidden />
                  <span className="text-lead">{tx(w, locale)}</span>
                </Reveal>
              </li>
            ))}
          </ul>
        </div>
      </section>

      {work.length ? (
        <section aria-labelledby="work-title" className="container-x py-14 md:py-20">
          <h2 id="work-title" className="font-display text-h2 font-semibold">
            {t("work")}
          </h2>
          <ul className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {work.map((s) => (
              <li key={s.slug}>
                <WorkCard study={s} />
              </li>
            ))}
          </ul>
        </section>
      ) : null}

      {faqs.length ? (
        <section className="container-x grid gap-12 pb-20 lg:grid-cols-12">
          <h2 className="font-display text-h2 font-semibold lg:col-span-4">{t("faq")}</h2>
          <div className="lg:col-span-8">
            <AccordionIsland items={faqs} />
          </div>
          <JsonLd data={faqJsonLd(faqs)} />
        </section>
      ) : null}

      <FinalCta />
    </>
  );
}
