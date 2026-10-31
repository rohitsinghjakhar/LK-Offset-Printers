import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { getTranslations } from "next-intl/server";
import { ArrowRight, Check } from "lucide-react";
import { ProductCard } from "@/components/catalog/ProductCard";
import { WhatsAppIcon } from "@/components/icons";
import { Mockup } from "@/components/mockups";
import { InkButton } from "@/components/motion/InkButton";
import { Reveal } from "@/components/motion/Reveal";
import { TransitionLink } from "@/components/motion/TransitionLink";
import { FinalCta } from "@/components/sections/home/FinalCta";
import { MachinePhoto } from "@/components/sections/home/MachinePhoto";
import { JsonLd } from "@/components/seo/JsonLd";
import { Breadcrumbs } from "@/components/shared/Breadcrumbs";
import { PageHero } from "@/components/shared/PageHero";
import { SectionHeader } from "@/components/shared/SectionHeader";
import { AccordionIsland } from "@/components/ui/AccordionIsland";
import { siteConfig } from "@/config/site.config";
import { getService, services } from "@/data/content/services";
import { routing } from "@/i18n/routing";
import { resolveLocale } from "@/i18n/params";
import { inkCss } from "@/lib/ink";
import { activeProducts as products, categories } from "@/lib/catalog";
import { absoluteUrl, faqJsonLd, localizedUrl, pageMetadata } from "@/lib/seo";
import { waGreeting, waLink } from "@/lib/whatsapp";
import { tx } from "@/types/i18n";

type Props = { params: Promise<{ locale: string; slug: string }> };

export function generateStaticParams() {
  return routing.locales.flatMap((locale) => services.map((s) => ({ locale, slug: s.slug })));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const locale = await resolveLocale(params);
  const service = getService(slug);
  if (!service) return {};
  const name = tx(service.name, locale);
  const city = locale === "hi" ? "अलवर" : "Alwar";
  return pageMetadata({
    locale,
    path: `/services/${slug}`,
    title: `${name} ${locale === "hi" ? "—" : "in"} ${city} | ${siteConfig.brandName}`,
    description: tx(service.short, locale),
  });
}

export default async function ServicePage({ params }: Props) {
  const { slug } = await params;
  const locale = await resolveLocale(params);
  const service = getService(slug);
  if (!service) notFound();

  const t = await getTranslations("services");
  const tc = await getTranslations("common");
  const tn = await getTranslations("nav");
  const name = tx(service.name, locale);
  const machine = siteConfig.machines.find((m) => m.id === service.machine);
  const related = service.products.map((s) => products.find((p) => p.slug === s)).filter((p) => p !== undefined);
  const colourOf = (cat: string) => categories.find((c) => c.slug === cat)?.colour ?? "ink";
  const faqs = service.faqs.map((f, i) => ({ id: `${service.slug}-${i}`, question: tx(f.question, locale), answer: tx(f.answer, locale) }));

  return (
    <>
      <PageHero
        slug={`${t("slug")} · ${String(services.indexOf(service) + 1).padStart(2, "0")}`}
        title={name}
        sub={tx(service.short, locale)}
        aside={
          <div className="relative aspect-[4/3] overflow-hidden rounded-card">
            <div className="absolute inset-0" style={{ background: inkCss[service.colour] }} />
            <div className="halftone-field absolute inset-0 text-ink opacity-10" />
            <div className="absolute inset-[12%] grid place-items-center">
              <Mockup kind={service.mockup} title={name} />
            </div>
          </div>
        }
      >
        <div className="mt-8 flex flex-wrap gap-3">
          <InkButton href="/quote" size="lg" icon={<ArrowRight className="size-5" />}>
            {t("cta")}
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
            { name: tn("services"), path: "/services" },
            { name, path: `/services/${service.slug}` },
          ]}
        />
      </PageHero>

      <section className="container-x grid gap-12 py-14 md:py-20 lg:grid-cols-12">
        <div className="lg:col-span-7">
          <p className="text-lead">{tx(service.intro, locale)}</p>
          <h2 className="mt-12 label-mono text-ink-muted">{t("bestFor")}</h2>
          <ul className="mt-4 grid gap-3 sm:grid-cols-2">
            {service.bestFor.map((b) => (
              <li key={b.en} className="flex gap-3 rounded-card border border-line p-4 text-small font-medium">
                <Check className="mt-0.5 size-4 shrink-0 text-magenta" aria-hidden />
                {tx(b, locale)}
              </li>
            ))}
          </ul>
        </div>
        {machine ? (
          <aside className="lg:col-span-5">
            <div className="ink-grain overflow-hidden rounded-card bg-ink p-6 text-paper md:p-8">
              <p className="label-mono text-paper/60">{t("specs")}</p>
              <MachinePhoto id={machine.id} className="mt-4" sizes="(min-width: 1024px) 36vw, 92vw" />
              <p className="mt-4 font-display text-h3 font-semibold">{machine.name}</p>
              <p className="text-small text-paper/70">{tx(machine.kind, locale)}</p>
              <dl className="mt-6 grid grid-cols-2 gap-4 border-t border-line-ink pt-4">
                <div>
                  <dt className="label-mono text-paper/60">{t("maxSize")}</dt>
                  <dd className="mt-1 font-mono text-small">{machine.maxSize}</dd>
                </div>
                <div>
                  <dt className="label-mono text-paper/60">{t("speed")}</dt>
                  <dd className="mt-1 font-mono text-small">{machine.speed}</dd>
                </div>
              </dl>
            </div>
          </aside>
        ) : null}
      </section>

      <section aria-labelledby="process-title" className="border-y border-line bg-paper-2 py-14 md:py-20">
        <div className="container-x">
          <h2 id="process-title" className="font-display text-h2 font-semibold">
            {t("process")}
          </h2>
          <ol className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {service.process.map((step, i) => (
              <li key={step.title.en}>
                <Reveal delay={i * 0.06} className="h-full rounded-card bg-paper p-6">
                  <span className="font-mono text-label text-magenta-deep">{String(i + 1).padStart(2, "0")}</span>
                  <h3 className="mt-3 font-display text-[1.25rem] font-semibold">{tx(step.title, locale)}</h3>
                  <p className="mt-2 text-small text-ink-muted">{tx(step.body, locale)}</p>
                </Reveal>
              </li>
            ))}
          </ol>
        </div>
      </section>

      {related.length ? (
        <section aria-labelledby="products-title" className="container-x py-14 md:py-20">
          <h2 id="products-title" className="font-display text-h2 font-semibold">
            {t("products")}
          </h2>
          <ul className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {related.map((p) => (
              <li key={p.slug}>
                <ProductCard product={p} colour={colourOf(p.category)} />
              </li>
            ))}
          </ul>
        </section>
      ) : null}

      <section className="container-x grid gap-12 pb-20 lg:grid-cols-12">
        <div className="lg:col-span-4">
          <SectionHeader slug={name.toUpperCase()} title={t("faq")} />
        </div>
        <div className="lg:col-span-8">
          <AccordionIsland items={faqs} />
          <h2 className="mt-14 label-mono text-ink-muted">{t("others")}</h2>
          <ul className="mt-4 flex flex-wrap gap-2">
            {services
              .filter((s) => s.slug !== service.slug)
              .map((s) => (
                <li key={s.slug}>
                  <TransitionLink
                    href={`/services/${s.slug}`}
                    className="inline-flex min-h-11 items-center rounded-chip border border-ink/20 px-4 text-small font-medium hover:border-ink"
                  >
                    {tx(s.name, locale)}
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
            name,
            description: tx(service.intro, locale),
            url: localizedUrl(locale, `/services/${service.slug}`),
            areaServed: siteConfig.serviceAreas.map((a) => tx(a.name, "en")),
            provider: { "@id": absoluteUrl("/#business") },
          },
        ]}
      />
    </>
  );
}
