"use client";

import { ArrowRight } from "lucide-react";
import { useTranslations } from "next-intl";
import { InkButton } from "@/components/motion/InkButton";
import { MotionProvider } from "@/components/motion/MotionProvider";
import { formatINR } from "@/lib/format";
import { useHydrated } from "@/lib/hooks";
import { selectTotal, useCart } from "@/stores/cart";
import { CartLines } from "./CartLines";

/** /cart — full-page cart. Totals shown here are snapshots; checkout re-prices on the server. */
export function CartView() {
  const t = useTranslations();
  const hydrated = useHydrated();
  const count = useCart((s) => s.items.length);
  const total = useCart(selectTotal);

  if (!hydrated) return <div aria-hidden className="skeleton h-80" />;

  if (count === 0) {
    return (
      <div className="flex flex-col items-start gap-5 py-10">
        <p className="font-display text-h2 font-semibold">{t("cart.empty")}</p>
        <p className="text-lead text-ink-muted">{t("cart.emptySub")}</p>
        <InkButton href="/quote" size="lg" icon={<ArrowRight className="size-5" aria-hidden />}>
          {t("common.getInstantQuote")}
        </InkButton>
      </div>
    );
  }

  return (
    <MotionProvider>
      <div className="grid grid-cols-1 gap-10 lg:grid-cols-12">
        <div className="lg:col-span-8">
          <CartLines />
        </div>
        <aside className="h-fit rounded-card bg-paper-2 p-6 lg:sticky lg:top-[calc(var(--header-h)+24px)] lg:col-span-4">
          <p className="label-mono text-ink-muted">{t("cart.items", { count })}</p>
          <div className="mt-4 flex items-baseline justify-between">
            <span>{t("cart.subtotal")}</span>
            <span className="font-mono text-h3 font-semibold tabular">{formatINR(total)}</span>
          </div>
          <p className="mt-2 text-small text-ink-muted">
            {t("common.inclGst")} · {t("cart.deliveryAtCheckout")}
          </p>
          <p className="mt-4 text-small text-ink-muted">{t("quote.deliveryNote")}</p>
          <InkButton href="/checkout" size="lg" className="mt-6 w-full" wrapperClassName="w-full" icon={<ArrowRight className="size-5" aria-hidden />}>
            {t("cart.checkout")}
          </InkButton>
        </aside>
      </div>
    </MotionProvider>
  );
}
