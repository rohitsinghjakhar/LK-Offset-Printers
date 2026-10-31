"use client";

import { useId, useState } from "react";
import Image from "next/image";
import { useSearchParams } from "next/navigation";
import { Clock3 } from "lucide-react";
import { useLocale, useTranslations } from "next-intl";
import { printPhotos } from "@/components/catalog/PrintPhoto";
import { NativeSelect } from "@/components/ui/field";
import { inkCss } from "@/lib/ink";
import { selectionFromParams } from "@/lib/pricing";
import { useQuoteStore } from "@/stores/quote";
import { tx } from "@/types/i18n";
import type { Category, Product } from "@/types/catalog";
import { ProductConfigurator } from "./ProductConfigurator";

/** /quote — pick any product (grouped by category) and configure it with live pricing. */
export function QuoteCalculator({ products, categories }: { products: Product[]; categories: Category[] }) {
  const t = useTranslations("quote");
  const locale = useLocale();
  const params = useSearchParams();
  const selectId = useId();
  const store = useQuoteStore();
  const fromUrl = params.get("product");
  const valid = (slug: string | null | undefined) => (slug && products.some((p) => p.slug === slug) ? slug : null);
  const [slug, setSlug] = useState(() => valid(fromUrl) ?? valid(store.lastProduct) ?? products[0].slug);
  const product = products.find((p) => p.slug === slug) ?? products[0];
  const category = categories.find((c) => c.slug === product.category) ?? categories[0];
  const initial = slug === fromUrl ? selectionFromParams(params) : store.configs[slug];
  const photo = printPhotos[product.mockup];

  const choose = (next: string) => {
    setSlug(next);
    // Keep the address bar shareable without a navigation.
    const url = new URL(window.location.href);
    url.search = `?product=${next}`;
    window.history.replaceState(window.history.state, "", url);
  };

  return (
    <div className="grid gap-10 lg:grid-cols-12 lg:gap-12">
      <aside className="flex flex-col gap-6 lg:sticky lg:top-[calc(var(--header-h)+24px)] lg:col-span-4 lg:self-start">
        <div>
          <label htmlFor={selectId} className="mb-3 block label-mono text-ink-muted">
            {t("product")}
          </label>
          <NativeSelect id={selectId} value={slug} onChange={(e) => choose(e.target.value)}>
            {categories.map((c) => (
              <optgroup key={c.slug} label={tx(c.name, locale)}>
                {products
                  .filter((p) => p.category === c.slug)
                  .map((p) => (
                    <option key={p.slug} value={p.slug}>
                      {tx(p.name, locale)}
                    </option>
                  ))}
              </optgroup>
            ))}
          </NativeSelect>
        </div>
        <div className="overflow-hidden rounded-card bg-paper-2">
          <div className="relative h-44" style={{ background: inkCss[category.colour] }}>
            {photo ? (
              <>
                <Image
                  key={photo.file}
                  src={`/images/stock/${photo.file}.webp`}
                  alt=""
                  fill
                  sizes="(min-width: 1024px) 30vw, 92vw"
                  className="animate-[fade-in_0.4s_ease-out] object-cover"
                />
                <span className="absolute right-2 bottom-2 rounded bg-paper/95 px-2 py-1 text-[11px] leading-tight text-ink">Illustrative photo · Pexels</span>
              </>
            ) : null}
            <span aria-hidden className="absolute inset-x-0 top-0 h-1.5" style={{ background: inkCss[category.colour] }} />
          </div>
          <div className="p-5">
            <p className="label-mono text-ink-muted">{tx(category.name, locale)}</p>
            <p className="mt-2 font-display text-h3 font-semibold">{tx(product.name, locale)}</p>
            <p className="mt-2 text-small text-ink-muted">{tx(product.short, locale)}</p>
            <dl className="mt-4 flex flex-col gap-2 border-t border-line pt-4 text-small">
              {product.specs.slice(0, 3).map((s) => (
                <div key={s.label.en} className="flex justify-between gap-4">
                  <dt className="text-ink-muted">{tx(s.label, locale)}</dt>
                  <dd className="text-right">{tx(s.value, locale)}</dd>
                </div>
              ))}
            </dl>
            <p className="mt-4 inline-flex items-center gap-1.5 rounded-chip border border-ink/15 px-3 py-1 font-mono text-[0.75rem]">
              <Clock3 className="size-3.5" aria-hidden /> {tx(product.turnaround.label, locale)}
            </p>
          </div>
        </div>
      </aside>
      <div className="lg:col-span-8">
        <ProductConfigurator key={slug} product={product} category={{ slug: category.slug, colour: category.colour }} initial={initial} />
      </div>
    </div>
  );
}
