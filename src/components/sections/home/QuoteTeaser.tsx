"use client";

import { MotionProvider } from "@/components/motion/MotionProvider";
import { useId, useState } from "react";
import { ArrowRight } from "lucide-react";
import { useLocale, useTranslations } from "next-intl";
import { NativeSelect } from "@/components/ui/field";
import { InkButton } from "@/components/motion/InkButton";
import { OptionControls, QtyControl, SizeControl } from "@/components/quote/Controls";
import { PriceDisplay } from "@/components/quote/PriceDisplay";
import { WhatsAppOrder } from "@/components/quote/QuoteActions";
import { useQuote } from "@/components/quote/useQuote";
import { selectionToParams } from "@/lib/pricing";
import { tx } from "@/types/i18n";
import type { Product } from "@/types/catalog";

const PREFERRED_GROUPS = ["size", "paper", "material", "lamination", "finishes", "type", "sides"];

function teaserGroups(product: Product) {
  return PREFERRED_GROUPS.filter((id) => product.options.some((g) => g.id === id)).slice(0, 2);
}

/** S6 — compact calculator: product, size, quantity, finish → animated price incl. GST. */
export function QuoteTeaser({ products }: { products: Product[] }) {
  const t = useTranslations();
  const locale = useLocale();
  const selectId = useId();
  const [slug, setSlug] = useState(products[0]?.slug);
  const product = products.find((p) => p.slug === slug) ?? products[0];
  const q = useQuote(product);
  const params = selectionToParams(q.selection);
  params.set("product", product.slug);

  return (
    <MotionProvider>
      <div className="grid gap-10 rounded-card bg-paper p-5 shadow-paper md:p-10 lg:grid-cols-12 lg:gap-12">
        <div className="flex flex-col gap-7 lg:col-span-7">
          <div>
            <label htmlFor={selectId} className="mb-3 block label-mono text-ink-muted">
              {t("home.quoteTeaser.product")}
            </label>
            <NativeSelect id={selectId} value={product.slug} onChange={(e) => setSlug(e.target.value)}>
              {products.map((p) => (
                <option key={p.slug} value={p.slug}>
                  {tx(p.name, locale)}
                </option>
              ))}
            </NativeSelect>
          </div>
          <SizeControl q={q} />
          <QtyControl q={q} allowCustom={false} />
          <OptionControls q={q} only={teaserGroups(product)} />
        </div>
        <div className="flex flex-col justify-between gap-8 border-t border-line pt-8 lg:col-span-5 lg:border-t-0 lg:border-l lg:pt-0 lg:pl-12">
          <div>
            <p className="label-mono text-ink-muted">{t("quote.total")}</p>
            <PriceDisplay total={q.quote.total} size="xl" className="mt-3" />
            <p className="mt-3 text-small text-ink-muted">{t("common.inclGst")}</p>
          </div>
          <div className="flex flex-col gap-3">
            <InkButton
              href={`/quote?${params.toString()}`}
              size="lg"
              className="w-full"
              wrapperClassName="w-full"
              icon={<ArrowRight className="size-5" aria-hidden />}
            >
              {t("home.quoteTeaser.continue")}
            </InkButton>
            <WhatsAppOrder q={q} className="w-full" wrapperClassName="w-full" />
          </div>
        </div>
      </div>
    </MotionProvider>
  );
}
