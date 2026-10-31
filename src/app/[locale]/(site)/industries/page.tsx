import type { Metadata } from "next";
import Image from "next/image";
import { getTranslations } from "next-intl/server";
import { ArrowUpRight } from "lucide-react";
import { IndustryIcon } from "@/components/icons";
import { Reveal } from "@/components/motion/Reveal";
import { TransitionLink } from "@/components/motion/TransitionLink";
import { FinalCta } from "@/components/sections/home/FinalCta";
import { Breadcrumbs } from "@/components/shared/Breadcrumbs";
import { PageHero } from "@/components/shared/PageHero";
import { industries, industryPhotos } from "@/data/content/industries";
import { resolveLocale, type LocaleParams } from "@/i18n/params";
import { inkBg } from "@/lib/ink";
import { activeProducts as products } from "@/lib/catalog";
import { pageMetadata } from "@/lib/seo";
import { tx } from "@/types/i18n";

export async function generateMetadata({ params }: LocaleParams): Promise<Metadata> {
  const locale = await resolveLocale(params);
  const t = await getTranslations({ locale, namespace: "meta" });
  return pageMetadata({ locale, path: "/industries", title: t("industriesTitle"), description: t("industriesDescription") });
}

export default async function IndustriesPage({ params }: LocaleParams) {
  const locale = await resolveLocale(params);
  const t = await getTranslations("industriesPage");
  const tc = await getTranslations("common");
  const tn = await getTranslations("nav");
  const nameOf = (slug: string) => products.find((p) => p.slug === slug)?.name;

  return (
    <>
      <PageHero slug={t("slug")} title={t("title")} accent={t("titleAccent")} after={t("titleAfter")} sub={t("sub")}>
        <Breadcrumbs
          className="mt-8"
          locale={locale}
          label={tc("breadcrumbHome")}
          items={[
            { name: tc("breadcrumbHome"), path: "/" },
            { name: tn("industries"), path: "/industries" },
          ]}
        />
      </PageHero>
      <section className="container-x py-14 md:py-20">
        <ul className="grid gap-6 md:grid-cols-2">
          {industries.map((industry, i) => (
            <li key={industry.slug}>
              <Reveal delay={(i % 2) * 0.06} className="h-full">
                <article className="group relative flex h-full flex-col gap-6 overflow-hidden rounded-card border border-line bg-paper p-6 transition-colors hover:border-ink/40 md:p-8">
                  <div className="relative -mx-6 -mt-6 aspect-[16/9] overflow-hidden bg-paper-2 md:-mx-8 md:-mt-8">
                    <Image
                      src={`/images/stock/${industryPhotos[industry.slug]}.webp`}
                      alt=""
                      fill
                      sizes="(min-width: 768px) 46vw, 92vw"
                      className="object-cover transition-transform duration-500 group-hover:scale-[1.03]"
                    />
                  </div>
                  <div className="flex items-start justify-between gap-4">
                    <span className={`grid size-14 place-items-center rounded-full ${inkBg[industry.colour]}`}>
                      <IndustryIcon slug={industry.slug} className="size-8" />
                    </span>
                    <ArrowUpRight className="size-6 transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" aria-hidden />
                  </div>
                  <div>
                    <h2 className="font-display text-h3 font-semibold">
                      <TransitionLink href={`/industries/${industry.slug}`} className="after:absolute after:inset-0 after:content-['']">
                        {tx(industry.name, locale)}
                      </TransitionLink>
                    </h2>
                    <p className="mt-2 text-body text-ink-muted">{tx(industry.tagline, locale)}</p>
                  </div>
                  <div className="mt-auto border-t border-line pt-4">
                    <p className="label-mono text-ink-muted">{t("kit")}</p>
                    <p className="mt-2 text-small">
                      {industry.kit
                        .map(nameOf)
                        .filter((n) => n !== undefined)
                        .map((n) => tx(n, locale))
                        .join(" · ")}
                    </p>
                  </div>
                </article>
              </Reveal>
            </li>
          ))}
        </ul>
      </section>
      <FinalCta />
    </>
  );
}
