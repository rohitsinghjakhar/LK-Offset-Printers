"use client";

import { MotionProvider } from "@/components/motion/MotionProvider";
import { useEffect } from "react";
import { useLocale, useTranslations } from "next-intl";
import { formatINRPrecise } from "@/lib/format";
import type { QuoteSelection } from "@/lib/pricing";
import { cn } from "@/lib/utils";
import { useQuoteStore } from "@/stores/quote";
import { tx } from "@/types/i18n";
import type { CategorySummary, Product } from "@/types/catalog";
import { AddToCart } from "./AddToCart";
import { BreakdownButton } from "./Breakdown";
import { AddOnControls, OptionControls, QtyControl, QuoteErrors, SizeControl } from "./Controls";
import { PriceDisplay } from "./PriceDisplay";
import { ShareQuote, WhatsAppOrder } from "./QuoteActions";
import { useQuote } from "./useQuote";

type ConfiguratorProps = {
  product: Product;
  category: Pick<CategorySummary, "slug" | "colour">;
  initial?: Partial<QuoteSelection>;
  editId?: string;
  compact?: boolean;
  onAdded?: () => void;
  className?: string;
};

/** Full product configurator: size, quantity, options, add-ons, live price, cart and WhatsApp. */
export function ProductConfigurator({ product, category, initial, editId, compact = false, onAdded, className }: ConfiguratorProps) {
  const t = useTranslations();
  const locale = useLocale();
  const q = useQuote(product, initial);
  const save = useQuoteStore((s) => s.save);

  useEffect(() => {
    save(product.slug, q.selection);
  }, [product.slug, q.selection, save]);

  return (
    <MotionProvider>
      <div className={cn("flex flex-col gap-7", className)}>
        <SizeControl q={q} />
        <QtyControl q={q} allowCustom={!compact} />
        <OptionControls q={q} />
        {compact ? null : <AddOnControls q={q} />}
        <QuoteErrors q={q} />
        <div className="rounded-card border border-line bg-paper-2 p-5 md:p-6">
          <div className="flex flex-wrap items-end justify-between gap-3">
            <div>
              <p className="label-mono text-ink-muted">{t("common.inclGst")}</p>
              <PriceDisplay total={q.quote.total} className="mt-2" />
              <p className="mt-2 font-mono text-small text-ink-muted">
                {t("quote.unitPrice", { price: formatINRPrecise(q.quote.unitPrice), unit: tx(product.unit, locale) })}
              </p>
            </div>
            <BreakdownButton quote={q.quote} />
          </div>
          <div className="mt-5 flex flex-col gap-3 sm:flex-row sm:flex-wrap">
            <AddToCart q={q} category={category} editId={editId} onAdded={onAdded} className="w-full sm:w-auto" wrapperClassName="w-full sm:w-auto" />
            <WhatsAppOrder q={q} className="w-full sm:w-auto" wrapperClassName="w-full sm:w-auto" />
          </div>
          {compact ? null : (
            <div className="mt-3">
              <ShareQuote q={q} />
            </div>
          )}
        </div>
      </div>
    </MotionProvider>
  );
}
