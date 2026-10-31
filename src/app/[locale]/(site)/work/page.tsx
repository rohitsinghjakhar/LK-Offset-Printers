import type { Metadata } from "next";
import { getTranslations } from "next-intl/server";
import { Reveal } from "@/components/motion/Reveal";
import { FinalCta } from "@/components/sections/home/FinalCta";
import { WorkCard } from "@/components/sections/home/SelectedWork";
import { Breadcrumbs } from "@/components/shared/Breadcrumbs";
import { PageHero } from "@/components/shared/PageHero";
import { resolveLocale, type LocaleParams } from "@/i18n/params";
import { caseStudies as studies } from "@/data/content/work";
import { pageMetadata } from "@/lib/seo";

export async function generateMetadata({ params }: LocaleParams): Promise<Metadata> {
  const locale = await resolveLocale(params);
  const t = await getTranslations({ locale, namespace: "meta" });
  return pageMetadata({ locale, path: "/work", title: t("workTitle"), description: t("workDescription") });
}

export default async function WorkPage({ params }: LocaleParams) {
  const locale = await resolveLocale(params);
  const t = await getTranslations("work");
  const tc = await getTranslations("common");
  const tn = await getTranslations("nav");

  return (
    <>
      <PageHero slug={t("slug")} title={t("title")} accent={t("titleAccent")} sub={t("sub")}>
        <Breadcrumbs
          className="mt-8"
          locale={locale}
          label={tc("breadcrumbHome")}
          items={[
            { name: tc("breadcrumbHome"), path: "/" },
            { name: tn("work"), path: "/work" },
          ]}
        />
      </PageHero>
      <section className="container-x py-14 md:py-20">
        <ul className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {studies.map((study, i) => (
            <li key={study.slug}>
              <Reveal delay={(i % 3) * 0.06} className="h-full">
                <WorkCard study={study} headingLevel="h2" />
              </Reveal>
            </li>
          ))}
        </ul>
      </section>
      <FinalCta />
    </>
  );
}
