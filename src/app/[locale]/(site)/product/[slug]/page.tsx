import { Suspense } from "react";
import type { Metadata } from "next";
import Image from "next/image";
import { notFound } from "next/navigation";
import { getTranslations } from "next-intl/server";
import { Clock3, Star } from "lucide-react";
import { ProductCard } from "@/components/catalog/ProductCard";
import { FileHelper, ProductReviews, SpecsTable } from "@/components/catalog/ProductDetails";
import { ProductGallery, type GallerySlide } from "@/components/catalog/ProductGallery";
import { WhatsAppIcon } from "@/components/icons";
import { SlugLine } from "@/components/marks";
import { Mockup } from "@/components/mockups";
import { ConfiguratorFromUrl } from "@/components/quote/ConfiguratorFromUrl";
import { ProductConfigurator } from "@/components/quote/ProductConfigurator";
import { JsonLd } from "@/components/seo/JsonLd";
import { Breadcrumbs } from "@/components/shared/Breadcrumbs";
import { routing } from "@/i18n/routing";
import { resolveLocale } from "@/i18n/params";
import { formatPriceTag } from "@/lib/format";
import { inkCss } from "@/lib/ink";
import { computeQuote, normalizeSelection } from "@/lib/pricing";
import { activeProducts, getCategory, getProduct, priceTag } from "@/lib/catalog";
import { absoluteUrl, localizedUrl, pageMetadata } from "@/lib/seo";
import { siteConfig } from "@/config/site.config";
import { printPhotos } from "@/components/catalog/PrintPhoto";
import { waGreeting, waLink } from "@/lib/whatsapp";
import { tx } from "@/types/i18n";

type Props = { params: Promise<{ locale: string; slug: string }> };

export function generateStaticParams() {
  const products = activeProducts;
  return routing.locales.flatMap((locale) => products.map((p) => ({ locale, slug: p.slug })));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const locale = await resolveLocale(params);
  const product = getProduct(slug);
  if (!product) return {};
  const t = await getTranslations({ locale, namespace: "common" });
  const name = tx(product.name, locale);
  const title = `${name} — ${t("fromPrice", { price: formatPriceTag(priceTag(product), locale) })}`;
  return pageMetadata({
    locale,
    path: `/product/${slug}`,
    title: title.length > 60 ? `${name} — L.K. Offset Printers` : title,
    description: tx(product.short, locale),
  });
}

export default async function ProductPage({ params }: Props) {
  const { slug } = await params;
  const locale = await resolveLocale(params);
  const product = getProduct(slug);
  if (!product) notFound();
  const category = getCategory(product.category);
  if (!category) notFound();
  const t = await getTranslations();
  const all = activeProducts;
  const name = tx(product.name, locale);
  const catRef = { slug: category.slug, colour: category.colour };

  const related = all
    .filter((p) => p.slug !== product.slug && (p.category === product.category || p.industries.some((i) => product.industries.includes(i))))
    .sort((a, b) => Number(b.category === product.category) - Number(a.category === product.category) || (b.rating?.count ?? 0) - (a.rating?.count ?? 0))
    .slice(0, 4);

  const slides: GallerySlide[] = [
    ...(product.images ?? []).map((src, i) => ({
      id: `img-${i}`,
      label: `${name} ${i + 1}`,
      node: <Image src={src} alt={name} fill sizes="(min-width: 1024px) 50vw, 100vw" className="object-contain p-6" priority={i === 0} />,
    })),
    {
      id: "paper",
      label: `${name} — ${t("product.gallery")} 1`,
      node: (
        <div className="grid h-full place-items-center p-[8%]">
          <Mockup kind={product.mockup} title={name} />
        </div>
      ),
    },
    {
      id: "ink",
      label: `${name} — ${t("product.gallery")} 2`,
      node: (
        <div className="grid h-full place-items-center p-[10%]" style={{ background: inkCss[category.colour] }}>
          <Mockup kind={product.mockup} illustration />
        </div>
      ),
    },
    {
      id: "detail",
      label: `${name} — ${t("product.gallery")} 3`,
      node: (
        <div className="h-full overflow-hidden bg-paper">
          <div className="h-full origin-[35%_40%] scale-[1.9]">
            <div className="grid h-full place-items-center p-[8%]">
              <Mockup kind={product.mockup} illustration />
            </div>
          </div>
        </div>
      ),
    },
  ];

  const base = computeQuote(product, normalizeSelection(product));
  const productJsonLd = {
    "@context": "https://schema.org",
    "@type": "Product",
    name,
    description: tx(product.description, locale),
    sku: product.slug,
    category: tx(category.name, locale),
    brand: { "@type": "Brand", name: "L.K. Offset Printers" },
    image: [...(printPhotos[product.mockup] ? [absoluteUrl(`/images/stock/${printPhotos[product.mockup]!.file}.webp`)] : []), absoluteUrl(`/${locale}/og.png`)],
    url: localizedUrl(locale, `/product/${product.slug}`),
    offers: {
      "@type": "Offer",
      priceCurrency: "INR",
      price: base.total,
      availability: "https://schema.org/InStock",
      itemCondition: "https://schema.org/NewCondition",
      seller: { "@id": absoluteUrl("/#business") },
    },
    ...(product.rating && siteConfig.seo.publishRatings
      ? { aggregateRating: { "@type": "AggregateRating", ratingValue: product.rating.value, reviewCount: product.rating.count, bestRating: 5 } }
      : {}),
  };

  return (
    <>
      <section className="pt-[calc(var(--header-h)+32px)] pb-16 md:pb-24">
        <div className="container-x">
          <Breadcrumbs
            locale={locale}
            label={t("common.breadcrumbHome")}
            items={[
              { name: t("common.breadcrumbHome"), path: "/" },
              { name: tx(category.name, locale), path: `/catalog/${category.slug}` },
              { name, path: `/product/${product.slug}` },
            ]}
          />
          <div className="mt-8 grid gap-10 lg:grid-cols-12 lg:gap-12">
            <div className="lg:sticky lg:top-[calc(var(--header-h)+24px)] lg:col-span-6 lg:self-start">
              <ProductGallery slides={slides} label={t("product.gallery")} />
            </div>
            <div className="lg:col-span-6">
              <SlugLine className="text-ink/70">{t("product.slug", { category: tx(category.name, locale) })}</SlugLine>
              <h1 className="mt-4 text-h1 font-semibold">{name}</h1>
              <p className="mt-4 max-w-[52ch] text-lead text-ink-muted">{tx(product.short, locale)}</p>
              <div className="mt-5 flex flex-wrap items-center gap-3 text-small">
                {product.rating ? (
                  <span className="inline-flex items-center gap-1.5">
                    <Star className="size-4 fill-magenta text-magenta" aria-hidden />
                    <span className="font-medium">{product.rating.value.toFixed(1)}</span>
                    <span className="text-ink-muted">({t("product.reviewsCount", { count: product.rating.count })})</span>
                  </span>
                ) : null}
                <span className="inline-flex items-center gap-1.5 rounded-chip border border-ink/15 px-3 py-1 font-mono text-[0.75rem]">
                  <Clock3 className="size-3.5" aria-hidden /> {tx(product.turnaround.label, locale)}
                </span>
                <span className="font-mono text-[0.8rem]">{t("common.fromPrice", { price: formatPriceTag(priceTag(product), locale) })}</span>
              </div>
              <div className="mt-10">
                <Suspense fallback={<ProductConfigurator product={product} category={catRef} />}>
                  <ConfiguratorFromUrl product={product} category={catRef} />
                </Suspense>
              </div>
              <a
                href={waLink(waGreeting(locale, name))}
                target="_blank"
                rel="noopener noreferrer"
                className="mt-6 inline-flex min-h-11 items-center gap-2 text-small font-medium underline underline-offset-4"
              >
                <WhatsAppIcon className="size-4 text-green" /> {t("product.askWhatsapp")}
              </a>
            </div>
          </div>
        </div>
      </section>

      <section className="border-t border-line bg-paper-2 py-16 md:py-24">
        <div className="container-x grid gap-12 lg:grid-cols-12">
          <div className="lg:col-span-7">
            <p className="max-w-[62ch] text-lead">{tx(product.description, locale)}</p>
            <div className="mt-10">
              <SpecsTable product={product} />
            </div>
          </div>
          <div className="lg:col-span-5">
            <FileHelper />
          </div>
        </div>
      </section>

      <section className="container-x py-16 md:py-24">
        <ProductReviews product={product} />
      </section>

      {related.length ? (
        <section aria-labelledby="related-title" className="border-t border-line py-16 md:py-24">
          <div className="container-x">
            <h2 id="related-title" className="text-h2 font-semibold">
              {t("product.related")}
            </h2>
            <ul className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-4 lg:gap-5">
              {related.map((p) => (
                <li key={p.slug}>
                  <ProductCard product={p} colour={p.category === category.slug ? category.colour : "ink"} />
                </li>
              ))}
            </ul>
          </div>
        </section>
      ) : null}
      <JsonLd data={productJsonLd} />
    </>
  );
}
