import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { getTranslations } from "next-intl/server";
import { ArrowRight, Check, Truck } from "lucide-react";
import { ProductCard } from "@/components/catalog/ProductCard";
import { WhatsAppIcon } from "@/components/icons";
import { InkButton } from "@/components/motion/InkButton";
import { Reveal } from "@/components/motion/Reveal";
import { TransitionLink } from "@/components/motion/TransitionLink";
import { FinalCta } from "@/components/sections/home/FinalCta";
import { JsonLd } from "@/components/seo/JsonLd";
import { Breadcrumbs } from "@/components/shared/Breadcrumbs";
import { PageHero } from "@/components/shared/PageHero";
import { AccordionIsland } from "@/components/ui/AccordionIsland";
import { siteConfig } from "@/config/site.config";
import { cityPages, getCityPage } from "@/data/content/cities";
import { routing } from "@/i18n/routing";
import { resolveLocale } from "@/i18n/params";
import { activeProducts as products, categories } from "@/lib/catalog";
import { absoluteUrl, areaJsonLd, faqJsonLd, localizedUrl, pageMetadata } from "@/lib/seo";
import { waGreeting, waLink } from "@/lib/whatsapp";
import { tx } from "@/types/i18n";

type Props = { params: Promise<{ locale: string; city: string }> };

const areaFor = (slug: string) => siteConfig.serviceAreas.find((a) => a.slug === slug);

export function generateStaticParams() {
  return routing.locales.flatMap((locale) => cityPages.map((c) => ({ locale, city: c.slug })));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { city } = await params;
  const locale = await resolveLocale(params);
  const page = getCityPage(city);
  const area = areaFor(city);
  if (!page || !area) return {};
  const name = tx(area.name, locale);
  const title =
    locale === "hi"
      ? `${name} में प्रिंटिंग और डिलीवरी | ${siteConfig.brandName}`
      : `Printing in ${name} — Delivery & Instant Prices | ${siteConfig.brandName}`;
  return pageMetadata({ locale, path: `/printing-in/${city}`, title, description: tx(page.intro, locale) });
}

export default async function CityPage({ params }: Props) {
  const { city } = await params;
  const locale = await resolveLocale(params);
  const page = getCityPage(city);
  const area = areaFor(city);
  if (!page || !area) notFound();

  const t = await getTranslations("city");
  const tc = await getTranslations("common");
  const tf = await getTranslations("footer");
  const name = tx(area.name, locale);
  const top = page.products.map((s) => products.find((p) => p.slug === s)).filter((p) => p !== undefined);
  const colourOf = (cat: string) => categories.find((c) => c.slug === cat)?.colour ?? "ink";
  const faqs = page.faqs.map((f, i) => ({ id: `${page.slug}-${i}`, question: tx(f.question, locale), answer: tx(f.answer, locale) }));
  const others = siteConfig.serviceAreas.filter((a) => a.slug !== area.slug);
  const heading = [t("titleBefore"), name, t("titleAfter")].filter(Boolean).join(" ");

  return (
    <>
      <PageHero
        slug={t("slug", { city: name.toUpperCase() })}
        title={t("titleBefore")}
        accent={name}
        after={t("titleAfter")}
        sub={t("sub", { eta: tx(area.eta, locale) })}
      >
        <p className="mt-6 max-w-[62ch] text-body text-ink-muted">{tx(page.intro, locale)}</p>
        <div className="mt-8 flex flex-wrap gap-3">
          <InkButton href="/catalog" size="lg" icon={<ArrowRight className="size-5" />}>
            {tc("getInstantQuote")}
          </InkButton>
          <InkButton href={waLink(waGreeting(locale))} variant="ghost" size="lg" icon={<WhatsAppIcon className="size-5" />}>
            {tc("whatsappUs")}
          </InkButton>
        </div>
        <Breadcrumbs
          className="mt-8"
          locale={locale}
          label={tc("breadcrumbHome")}
          items={[
            { name: tc("breadcrumbHome"), path: "/" },
            { name: heading, path: `/printing-in/${area.slug}` },
          ]}
        />
      </PageHero>

      <section className="container-x grid gap-10 py-14 md:py-20 lg:grid-cols-12">
        <div className="lg:col-span-6">
          <h2 className="flex items-center gap-3 font-display text-h3 font-semibold">
            <Truck className="size-6 text-magenta" aria-hidden />
            {t("delivery", { city: name })}
          </h2>
          <ul className="mt-6 flex flex-col gap-3">
            {page.delivery.map((line) => (
              <li key={line.en} className="flex gap-3 rounded-card border border-line p-4 text-small">
                <Check className="mt-0.5 size-4 shrink-0 text-magenta" aria-hidden />
                {tx(line, locale)}
              </li>
            ))}
          </ul>
        </div>
        <div className="lg:col-span-6">
          <h2 className="font-display text-h3 font-semibold">{t("promises")}</h2>
          <ul className="mt-6 grid gap-3">
            {siteConfig.promises.map((p, i) => (
              <li key={p.id}>
                <Reveal delay={i * 0.06} className="rounded-card bg-paper-2 p-5">
                  <p className="font-medium">{tx(p.title, locale)}</p>
                  <p className="mt-1 text-small text-ink-muted">{tx(p.detail, locale)}</p>
                </Reveal>
              </li>
            ))}
          </ul>
        </div>
      </section>

      {top.length ? (
        <section aria-labelledby="top-title" className="border-y border-line bg-paper-2 py-14 md:py-20">
          <div className="container-x">
            <h2 id="top-title" className="font-display text-h2 font-semibold">
              {t("top", { city: name })}
            </h2>
            <ul className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {top.map((p) => (
                <li key={p.slug}>
                  <ProductCard product={p} colour={colourOf(p.category)} />
                </li>
              ))}
            </ul>
          </div>
        </section>
      ) : null}

      <section className="container-x grid gap-12 py-14 md:py-20 lg:grid-cols-12">
        <div className="lg:col-span-4">
          <h2 className="font-display text-h2 font-semibold">{t("faq", { city: name })}</h2>
        </div>
        <div className="lg:col-span-8">
          <AccordionIsland items={faqs} />
          <h2 className="mt-14 label-mono text-ink-muted">{t("otherCities")}</h2>
          <ul className="mt-4 flex flex-wrap gap-2" aria-label={tf("cities")}>
            {others.map((a) => (
              <li key={a.slug}>
                <TransitionLink
                  href={`/printing-in/${a.slug}`}
                  className="inline-flex min-h-11 items-center rounded-chip border border-ink/20 px-4 text-small font-medium hover:border-ink"
                >
                  {tx(a.name, locale)}
                </TransitionLink>
              </li>
            ))}
          </ul>
        </div>
      </section>

      <FinalCta />
      <JsonLd
        data={[
          faqJsonLd(faqs),
          {
            "@context": "https://schema.org",
            "@type": "Service",
            serviceType: "Printing",
            name: heading,
            url: localizedUrl(locale, `/printing-in/${area.slug}`),
            areaServed: areaJsonLd(area.slug, tx(area.name, "en")),
            provider: { "@id": absoluteUrl("/#business") },
          },
        ]}
      />
    </>
  );
}
