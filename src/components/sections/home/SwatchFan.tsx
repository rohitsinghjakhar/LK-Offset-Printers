import Image from "next/image";
import { getLocale, getTranslations } from "next-intl/server";
import { ArrowUpRight } from "lucide-react";
import { TransitionLink } from "@/components/motion/TransitionLink";
import { SectionHeader } from "@/components/shared/SectionHeader";
import { formatPriceTag } from "@/lib/format";
import { inkCss } from "@/lib/ink";
import { tx } from "@/types/i18n";
import type { CategorySummary } from "@/types/catalog";

/** Illustrative Pexels photo per category (see public/images/stock/sources.json). */
export const categoryPhotos: Record<string, string> = {
  "business-stationery": "business-cards",
  "marketing-prints": "colour-swatches",
  "large-format-signage": "shop-signage",
  "wedding-events": "wedding-invitations",
  "packaging-labels": "packaging-cartons",
  "school-coaching": "books-binding",
  "gifts-merchandise": "printed-mug",
  "photo-copy-binding": "digital-printing",
};

/** S3 — the eight categories as photo cards with an ink-colour band, in a grid at every size. */
export async function SwatchFan({ categories }: { categories: CategorySummary[] }) {
  const t = await getTranslations("home.swatch");
  const tc = await getTranslations("common");
  const locale = await getLocale();

  return (
    <section aria-labelledby="swatch-title" className="section-y">
      <div className="container-x">
        <SectionHeader id="swatch-title" slug={t("slug")} title={t("title")} accent={t("titleAccent")} after={t("titleAfter")} sub={t("sub")} />
        <ul className="mt-10 grid grid-cols-2 gap-3 sm:gap-5 lg:grid-cols-4">
          {categories.map((cat) => {
            const photo = categoryPhotos[cat.slug];
            const name = tx(cat.name, locale);
            return (
              <li key={cat.slug} className="min-w-0">
                <TransitionLink
                  href={`/catalog/${cat.slug}`}
                  aria-label={t("open", { name })}
                  className="group flex h-full flex-col overflow-hidden rounded-card bg-paper shadow-paper outline-offset-4 transition-shadow duration-300 hover:shadow-lift"
                >
                  <span className="relative block aspect-[4/3] overflow-hidden bg-paper-2">
                    {photo ? (
                      <Image
                        src={`/images/stock/${photo}.webp`}
                        alt=""
                        fill
                        sizes="(min-width: 1440px) 320px, (min-width: 1024px) 23vw, 46vw"
                        className="object-cover transition-transform duration-500 group-hover:scale-[1.04]"
                      />
                    ) : null}
                    <span aria-hidden className="absolute inset-x-0 bottom-0 h-1.5" style={{ background: inkCss[cat.colour] }} />
                  </span>
                  <span className="flex flex-1 flex-col p-3 sm:p-4">
                    <span className="flex items-start justify-between gap-2">
                      <span className="font-display text-[1rem] leading-tight font-semibold sm:text-[1.2rem]">{name}</span>
                      <ArrowUpRight
                        className="mt-0.5 size-4 shrink-0 text-ink-muted transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
                        aria-hidden
                      />
                    </span>
                    <span className="mt-1.5 hidden text-small text-ink-muted sm:block">{tx(cat.tagline, locale)}</span>
                    <span className="mt-auto flex flex-col gap-0.5 pt-3 text-[0.78rem] sm:text-[0.82rem]">
                      <span className="text-ink-muted">{t("items", { count: cat.count })}</span>
                      <span className="font-mono font-semibold">{tc("fromPrice", { price: formatPriceTag(cat.from, locale) })}</span>
                    </span>
                  </span>
                </TransitionLink>
              </li>
            );
          })}
        </ul>
        <p className="mt-4 text-[0.75rem] text-ink-muted">{locale === "hi" ? "उदाहरण फ़ोटो · Pexels" : "Illustrative photos · Pexels"}</p>
      </div>
    </section>
  );
}
