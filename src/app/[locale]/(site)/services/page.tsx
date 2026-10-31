import type { Metadata } from "next";
import { getTranslations } from "next-intl/server";
import { ArrowUpRight, Check } from "lucide-react";
import { Mockup } from "@/components/mockups";
import { Reveal } from "@/components/motion/Reveal";
import { TransitionLink } from "@/components/motion/TransitionLink";
import { FinalCta } from "@/components/sections/home/FinalCta";
import { Breadcrumbs } from "@/components/shared/Breadcrumbs";
import { PageHero } from "@/components/shared/PageHero";
import { siteConfig } from "@/config/site.config";
import { services } from "@/data/content/services";
import { resolveLocale, type LocaleParams } from "@/i18n/params";
import { inkCss } from "@/lib/ink";
import { pageMetadata } from "@/lib/seo";
import { tx } from "@/types/i18n";

export async function generateMetadata({ params }: LocaleParams): Promise<Metadata> {
  const locale = await resolveLocale(params);
  const t = await getTranslations({ locale, namespace: "meta" });
  return pageMetadata({ locale, path: "/services", title: t("servicesTitle"), description: t("servicesDescription") });
}

export default async function ServicesPage({ params }: LocaleParams) {
  const locale = await resolveLocale(params);
  const t = await getTranslations("services");
  const tc = await getTranslations("common");
  const tn = await getTranslations("nav");

  return (
    <>
      <PageHero slug={t("slug")} title={t("title")} accent={t("titleAccent")} after={t("titleAfter")} sub={t("sub")}>
        <Breadcrumbs
          className="mt-8"
          locale={locale}
          label={tc("breadcrumbHome")}
          items={[
            { name: tc("breadcrumbHome"), path: "/" },
            { name: tn("services"), path: "/services" },
          ]}
        />
      </PageHero>

      <section className="container-x py-14 md:py-20">
        <ol className="flex flex-col gap-6 md:gap-8">
          {services.map((service, i) => {
            const machine = siteConfig.machines.find((m) => m.id === service.machine);
            return (
              <li key={service.slug}>
                <Reveal>
                  <article className="group relative grid overflow-hidden rounded-card border border-line bg-paper md:grid-cols-12">
                    <div className="relative aspect-[16/10] overflow-hidden md:col-span-5 md:aspect-auto md:min-h-[320px]">
                      <div className="absolute inset-0" style={{ background: inkCss[service.colour] }} />
                      <div className="halftone-field absolute inset-0 text-ink opacity-10" />
                      <div className="absolute inset-[12%] grid place-items-center transition-transform duration-700 ease-out group-hover:scale-[1.04]">
                        <Mockup kind={service.mockup} />
                      </div>
                      <span className="absolute top-4 left-4 font-mono text-label text-ink/70">{String(i + 1).padStart(2, "0")}</span>
                    </div>
                    <div className="flex flex-col gap-5 p-6 md:col-span-7 md:p-10">
                      <div className="flex items-start justify-between gap-4">
                        <h2 className="font-display text-h3 font-semibold">
                          <TransitionLink href={`/services/${service.slug}`} className="after:absolute after:inset-0 after:content-['']">
                            {tx(service.name, locale)}
                          </TransitionLink>
                        </h2>
                        <ArrowUpRight
                          className="size-6 shrink-0 transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
                          aria-hidden
                        />
                      </div>
                      <p className="max-w-[56ch] text-body text-ink-muted">{tx(service.short, locale)}</p>
                      <div>
                        <p className="label-mono text-ink-muted">{t("bestFor")}</p>
                        <ul className="mt-3 grid gap-2 sm:grid-cols-2">
                          {service.bestFor.map((b) => (
                            <li key={b.en} className="flex gap-2 text-small">
                              <Check className="mt-0.5 size-4 shrink-0 text-magenta" aria-hidden />
                              {tx(b, locale)}
                            </li>
                          ))}
                        </ul>
                      </div>
                      {machine ? (
                        <p className="mt-auto border-t border-line pt-4 font-mono text-[0.8rem] text-ink-muted">
                          {t("machine")}: <span className="text-ink">{machine.name}</span> · {machine.maxSize} · {machine.speed}
                        </p>
                      ) : null}
                    </div>
                  </article>
                </Reveal>
              </li>
            );
          })}
        </ol>
      </section>
      <FinalCta />
    </>
  );
}
