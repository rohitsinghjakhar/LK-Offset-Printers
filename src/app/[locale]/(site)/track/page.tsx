import { Suspense } from "react";
import type { Metadata } from "next";
import { getTranslations } from "next-intl/server";
import { PageHero } from "@/components/shared/PageHero";
import { TrackOrder } from "@/components/track/TrackOrder";
import { resolveLocale, type LocaleParams } from "@/i18n/params";
import { pageMetadata } from "@/lib/seo";

export async function generateMetadata({ params }: LocaleParams): Promise<Metadata> {
  const locale = await resolveLocale(params);
  const t = await getTranslations({ locale, namespace: "meta" });
  return pageMetadata({ locale, path: "/track", title: t("trackTitle"), description: t("trackDescription") });
}

export default async function TrackPage({ params }: LocaleParams) {
  await resolveLocale(params);
  const t = await getTranslations("track");
  return (
    <>
      <PageHero slug={t("slug")} title={t("title")} accent={t("titleAccent")} sub={t("sub")} />
      <section className="container-x py-12 md:py-16">
        <Suspense fallback={<div aria-hidden className="skeleton h-72" />}>
          <TrackOrder />
        </Suspense>
      </section>
    </>
  );
}
