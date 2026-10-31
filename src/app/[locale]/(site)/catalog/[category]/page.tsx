import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { getTranslations } from "next-intl/server";
import { CatalogBrowser, type BrowserItem } from "@/components/catalog/CatalogBrowser";
import { ProductCard } from "@/components/catalog/ProductCard";
import { RegMark, SlugLine } from "@/components/marks";
import { TransitionLink } from "@/components/motion/TransitionLink";
import { Breadcrumbs } from "@/components/shared/Breadcrumbs";
import { routing } from "@/i18n/routing";
import { resolveLocale } from "@/i18n/params";
import { formatPriceTag } from "@/lib/format";
import { inkCss, inkOn } from "@/lib/ink";
import { fromPrice } from "@/lib/pricing";
import { categories, getCategory, getCategorySummaries, getProductsByCategory } from "@/lib/catalog";
import { pageMetadata } from "@/lib/seo";
import { cn } from "@/lib/utils";
import { tx } from "@/types/i18n";
import type { CategorySlug } from "@/types/catalog";

type Props = { params: Promise<{ locale: string; category: string }> };

export function generateStaticParams() {
  return routing.locales.flatMap((locale) => categories.map((c) => ({ locale, category: c.slug })));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { category: slug } = await params;
  const locale = await resolveLocale(params);
  const category = getCategory(slug);
  if (!category) return {};
  const suffix = locale === "hi" ? " — एल.के. ऑफ़सेट प्रिंटर्स अलवर" : " Printing in Alwar — L.K.";
  return pageMetadata({ locale, path: `/catalog/${slug}`, title: `${tx(category.name, locale)}${suffix}`, description: tx(category.description, locale) });
}

export default async function CategoryPage({ params }: Props) {
  const { category: slug } = await params;
  const locale = await resolveLocale(params);
  const category = getCategory(slug);
  if (!category) notFound();
  const t = await getTranslations("catalog");
  const tc = await getTranslations("common");
  const tn = await getTranslations("nav");
  const products = getProductsByCategory(slug as CategorySlug);
  const summaries = getCategorySummaries();
  const name = tx(category.name, locale);
  const index = summaries.findIndex((c) => c.slug === slug);

  const items: BrowserItem[] = products.map((p) => ({
    slug: p.slug,
    category: p.category,
    name: tx(p.name, locale),
    from: fromPrice(p).amount,
    hours: p.turnaround.hours,
    popularity: p.rating?.count ?? 0,
    order: p.order,
    node: <ProductCard product={p} colour={category.colour} headingLevel="h2" />,
  }));

  return (
    <>
      <section className="pt-[var(--header-h)]">
        <div
          data-swatch-target
          className={cn("relative h-[34vh] min-h-[220px] w-full md:h-[42vh]", inkOn[category.colour])}
          style={{ background: inkCss[category.colour] }}
        >
          <div className="container-x flex h-full items-end justify-between pb-6">
            <RegMark size={22} className="opacity-80" />
            <span className="label-mono opacity-80">
              LK {String(index + 1).padStart(2, "0")}-{category.colour.slice(0, 1).toUpperCase()}
            </span>
          </div>
        </div>
        <div className="container-x border-b border-line py-12 md:py-16">
          <Breadcrumbs
            locale={locale}
            label={tc("breadcrumbHome")}
            items={[
              { name: tc("breadcrumbHome"), path: "/" },
              { name: tn("catalog"), path: "/catalog" },
              { name, path: `/catalog/${slug}` },
            ]}
          />
          <div className="mt-8 grid gap-8 lg:grid-cols-12 lg:items-end">
            <div className="lg:col-span-7">
              <SlugLine className="text-ink/70">{t("categoryProducts", { count: products.length })}</SlugLine>
              <h1 className="mt-4 text-h1 font-semibold">{name}</h1>
              <p className="mt-3 serif-accent text-h3 text-ink-muted">{tx(category.tagline, locale)}</p>
            </div>
            <p className="max-w-[52ch] text-lead text-ink-muted lg:col-span-5">{tx(category.description, locale)}</p>
          </div>
        </div>
      </section>

      <section className="container-x py-12 md:py-16">
        <CatalogBrowser items={items} />
      </section>

      <section aria-labelledby="other-cats" className="border-t border-line bg-paper-2 py-14 md:py-20">
        <div className="container-x">
          <h2 id="other-cats" className="label-mono text-ink-muted">
            {t("exploreOther")}
          </h2>
          <ul className="mt-6 grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
            {summaries
              .filter((c) => c.slug !== slug)
              .map((c) => (
                <li key={c.slug}>
                  <TransitionLink
                    href={`/catalog/${c.slug}`}
                    swatchColor={inkCss[c.colour]}
                    className="group flex h-full items-center gap-4 rounded-card bg-paper p-4 transition-shadow duration-300 hover:shadow-paper"
                  >
                    <span aria-hidden className="block h-12 w-9 shrink-0" style={{ background: inkCss[c.colour] }} />
                    <span className="flex flex-col">
                      <span className="font-display font-semibold">{tx(c.name, locale)}</span>
                      <span className="label-mono text-ink-muted">{tc("fromPrice", { price: formatPriceTag(c.from, locale) })}</span>
                    </span>
                  </TransitionLink>
                </li>
              ))}
          </ul>
        </div>
      </section>
    </>
  );
}
