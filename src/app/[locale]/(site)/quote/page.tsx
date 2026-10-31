import { Suspense } from "react";
import type { Metadata } from "next";
import { getTranslations } from "next-intl/server";
import { QuoteCalculator } from "@/components/quote/QuoteCalculator";
import { PageHero } from "@/components/shared/PageHero";
import { resolveLocale, type LocaleParams } from "@/i18n/params";
import { activeProducts as products, categories } from "@/lib/catalog";
import { pageMetadata } from "@/lib/seo";

export async function generateMetadata({ params }: LocaleParams): Promise<Metadata> {
  const locale = await resolveLocale(params);
  const t = await getTranslations({ locale, namespace: "meta" });
  return pageMetadata({ locale, path: "/quote", title: t("quoteTitle"), description: t("quoteDescription") });
}

export default async function QuotePage({ params }: LocaleParams) {
  await resolveLocale(params);
  const t = await getTranslations("quote");
  return (
    <>
      <PageHero slug={t("slug")} title={t("title")} accent={t("titleAccent")} sub={t("sub")} />
      <section className="container-x py-12 md:py-16">
        <Suspense fallback={<div aria-hidden className="skeleton h-[900px]" />}>
          <QuoteCalculator products={products} categories={categories} />
        </Suspense>
        <p className="mt-10 text-small text-ink-muted">{t("deliveryNote")}</p>
      </section>
    </>
  );
}
