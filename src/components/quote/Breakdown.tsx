"use client";

import { useState } from "react";
import { useLocale, useTranslations } from "next-intl";
import { Drawer } from "@/components/ui/drawer";
import { Sheet } from "@/components/ui/sheet";
import { useMediaQuery } from "@/lib/device";
import { formatINR } from "@/lib/format";
import { DEFAULT_RULES, type QuoteResult } from "@/lib/pricing";
import { cn } from "@/lib/utils";
import { tx } from "@/types/i18n";

function Lines({ quote }: { quote: QuoteResult }) {
  const t = useTranslations("quote");
  const { expressPct } = DEFAULT_RULES;
  const locale = useLocale();
  const row = "flex items-baseline justify-between gap-4 py-2.5";
  return (
    <div className="font-mono text-[0.92rem]">
      <dl className="divide-y divide-line">
        <div className={row}>
          <dt className="font-sans">{t("base")}</dt>
          <dd className="tabular">{formatINR(quote.base)}</dd>
        </div>
        {quote.lines.map((line) => (
          <div key={line.key} className={row}>
            <dt className="pl-3 font-sans text-ink-muted">+ {tx(line.label, locale)}</dt>
            <dd className="tabular">{formatINR(line.amount)}</dd>
          </div>
        ))}
        {quote.discount > 0 ? (
          <div className={cn(row, "text-success")}>
            <dt className="font-sans">{t("discount", { pct: quote.discountPct })}</dt>
            <dd className="tabular">−{formatINR(quote.discount)}</dd>
          </div>
        ) : null}
        {quote.minChargeTopUp > 0 ? (
          <div className={row}>
            <dt className="font-sans">{t("minCharge")}</dt>
            <dd className="tabular">{formatINR(quote.minChargeTopUp)}</dd>
          </div>
        ) : null}
        {quote.express > 0 ? (
          <div className={row}>
            <dt className="font-sans">{t("expressLine", { pct: expressPct })}</dt>
            <dd className="tabular">{formatINR(quote.express)}</dd>
          </div>
        ) : null}
        {quote.design > 0 ? (
          <div className={row}>
            <dt className="font-sans">{t("designLine")}</dt>
            <dd className="tabular">{formatINR(quote.design)}</dd>
          </div>
        ) : null}
        <div className={row}>
          <dt className="font-sans font-medium">{t("subtotal")}</dt>
          <dd className="tabular">{formatINR(quote.taxable)}</dd>
        </div>
        <div className={row}>
          <dt className="font-sans">{t("gst", { rate: quote.gstRate })}</dt>
          <dd className="tabular">{formatINR(quote.gst)}</dd>
        </div>
        <div className={cn(row, "border-t-2 border-ink pt-4 text-[1.1rem] font-semibold")}>
          <dt className="font-sans">{t("grandTotal")}</dt>
          <dd className="tabular">{formatINR(quote.total)}</dd>
        </div>
      </dl>
      <p className="mt-5 font-sans text-small text-ink-muted">{t("roundingNote")}</p>
      <p className="mt-2 font-sans text-small text-ink-muted">{t("deliveryNote")}</p>
    </div>
  );
}

/** "See price breakdown": right sheet on desktop, bottom drawer on phones. */
export function BreakdownButton({ quote, className }: { quote: QuoteResult; className?: string }) {
  const t = useTranslations();
  const [open, setOpen] = useState(false);
  const desktop = useMediaQuery("(min-width: 768px)");
  return (
    <>
      <button type="button" onClick={() => setOpen(true)} className={cn("min-h-11 text-small font-medium underline underline-offset-4", className)}>
        {t("quote.breakdown")}
      </button>
      {desktop ? (
        <Sheet open={open} onOpenChange={setOpen} title={t("quote.breakdownTitle")} closeLabel={t("common.close")}>
          <Lines quote={quote} />
        </Sheet>
      ) : (
        <Drawer open={open} onOpenChange={setOpen} title={t("quote.breakdownTitle")}>
          <Lines quote={quote} />
        </Drawer>
      )}
    </>
  );
}
