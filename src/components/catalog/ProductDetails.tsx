import { getLocale, getTranslations } from "next-intl/server";
import { FileCheck2, Star } from "lucide-react";
import { SlugLine } from "@/components/marks";
import { fileHelperTips } from "@/data/content/home";
import { reviewsByCategory } from "@/data/content/reviews";
import { formatDate } from "@/lib/format";
import { cn } from "@/lib/utils";
import { tx } from "@/types/i18n";
import type { Product } from "@/types/catalog";

export async function SpecsTable({ product }: { product: Product }) {
  const t = await getTranslations("product");
  const locale = await getLocale();
  return (
    <section aria-labelledby="specs-title">
      <SlugLine className="text-ink/70">{t("specs")}</SlugLine>
      <h2 id="specs-title" className="sr-only">
        {t("specs")}
      </h2>
      <dl className="mt-5 divide-y divide-line border-y border-line">
        {product.specs.map((spec) => (
          <div key={spec.label.en} className="grid gap-1 py-4 sm:grid-cols-[180px_1fr] sm:gap-6">
            <dt className="label-mono text-ink-muted">{tx(spec.label, locale)}</dt>
            <dd>{tx(spec.value, locale)}</dd>
          </div>
        ))}
      </dl>
      <p className="mt-3 text-small text-ink-muted">{t("turnaroundNote")}</p>
    </section>
  );
}

export async function FileHelper() {
  const t = await getTranslations("product");
  const locale = await getLocale();
  return (
    <section aria-labelledby="files-title" className="rounded-card bg-ink p-6 text-paper md:p-8">
      <div className="flex items-center gap-3">
        <FileCheck2 className="size-6 text-magenta" aria-hidden />
        <h2 id="files-title" className="text-h3 font-semibold">
          {t("fileHelperTitle")}
        </h2>
      </div>
      <ol className="mt-5 flex flex-col gap-3">
        {fileHelperTips.map((tip, i) => (
          <li key={tip.en} className="flex gap-3 text-paper/85">
            <span className="mt-0.5 label-mono text-paper/50 tabular">{String(i + 1).padStart(2, "0")}</span>
            <span>{tx(tip, locale)}</span>
          </li>
        ))}
      </ol>
      <p className="mt-6 border-t border-line-ink pt-4 font-mono text-small text-paper/70">{t("fileHelperTips")}</p>
    </section>
  );
}

export async function ProductReviews({ product }: { product: Product }) {
  const t = await getTranslations();
  const locale = await getLocale();
  const reviews = reviewsByCategory[product.category] ?? [];
  if (!product.rating && reviews.length === 0) return null;
  return (
    <section aria-labelledby="reviews-title">
      <div className="flex flex-wrap items-end justify-between gap-4">
        <div>
          <SlugLine className="text-ink/70">{t("product.reviews")}</SlugLine>
          <h2 id="reviews-title" className="mt-4 text-h2 font-semibold">
            {t("product.reviews")}
          </h2>
        </div>
        {product.rating ? (
          <p className="flex items-baseline gap-3">
            <span className="font-display text-[3rem] leading-none font-semibold">{product.rating.value.toFixed(1)}</span>
            <span className="text-small text-ink-muted">
              {t("common.rating", { value: product.rating.value.toFixed(1) })} · {t("product.reviewsCount", { count: product.rating.count })}
            </span>
          </p>
        ) : null}
      </div>
      <ul className="mt-8 grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        {reviews.map((review) => (
          <li key={review.id} className="rounded-card bg-paper-2 p-5">
            <div className="flex gap-0.5" role="img" aria-label={t("home.testimonials.stars", { count: review.rating })}>
              {Array.from({ length: 5 }, (_, i) => (
                <Star key={i} className={cn("size-4", i < review.rating ? "fill-magenta text-magenta" : "text-ink/20")} aria-hidden />
              ))}
            </div>
            <p className="mt-3">“{tx(review.text, locale)}”</p>
            <p className="mt-4 text-small text-ink-muted">
              <span className="font-medium text-ink">{review.name}</span> · {tx(review.city, locale)} ·{" "}
              <time dateTime={review.date}>{formatDate(review.date, locale)}</time>
            </p>
          </li>
        ))}
      </ul>
    </section>
  );
}
