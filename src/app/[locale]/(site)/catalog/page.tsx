import type { Metadata } from "next";
import { getTranslations } from "next-intl/server";
import { CatalogBrowser, type BrowserItem } from "@/components/catalog/CatalogBrowser";
import { ProductCard } from "@/components/catalog/ProductCard";
import { Breadcrumbs } from "@/components/shared/Breadcrumbs";
import { PageHero } from "@/components/shared/PageHero";
import { resolveLocale, type LocaleParams } from "@/i18n/params";
import { fromPrice } from "@/lib/pricing";
import { activeProducts as products, categories } from "@/lib/catalog";
import { pageMetadata } from "@/lib/seo";
import { tx } from "@/types/i18n";

export async function generateMetadata({ params }: LocaleParams): Promise<Metadata> {
  const locale = await resolveLocale(params);
  const t = await getTranslations({ locale, namespace: "meta" });
  return pageMetadata({ locale, path: "/catalog", title: t("catalogTitle"), description: t("catalogDescription") });
}

export default async function CatalogPage({ params }: LocaleParams) {
  const locale = await resolveLocale(params);
  const t = await getTranslations("catalog");
  const tc = await getTranslations("common");
  const tn = await getTranslations("nav");
  const colourOf = (slug: string) => categories.find((c) => c.slug === slug)?.colour ?? "ink";

  const items: BrowserItem[] = products.map((p) => ({
    slug: p.slug,
    category: p.category,
    name: tx(p.name, locale),
    from: fromPrice(p).amount,
    hours: p.turnaround.hours,
    popularity: p.rating?.count ?? 0,
    order: p.order,
    node: <ProductCard product={p} colour={colourOf(p.category)} headingLevel="h2" />,
  }));

  return (
    <>
      <PageHero slug={t("slug", { count: products.length })} title={t("title")} accent={t("titleAccent")} sub={t("sub")}>
        <Breadcrumbs
          className="mt-8"
          locale={locale}
          label={tc("breadcrumbHome")}
          items={[
            { name: tc("breadcrumbHome"), path: "/" },
            { name: tn("catalog"), path: "/catalog" },
          ]}
        />
      </PageHero>
      <section className="container-x py-12 md:py-16">
        <CatalogBrowser items={items} categories={categories.map((c) => ({ slug: c.slug, name: tx(c.name, locale) }))} />
      </section>
    </>
  );
}
