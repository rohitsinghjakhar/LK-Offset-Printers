"use client";

import { useTranslations } from "next-intl";
import { InkButton } from "@/components/motion/InkButton";
import { MotionProvider } from "@/components/motion/MotionProvider";
import { Sheet } from "@/components/ui/sheet";
import { formatINR } from "@/lib/format";
import { selectTotal, useCart } from "@/stores/cart";
import { CartLines } from "./CartLines";

export default function CartDrawer() {
  const t = useTranslations();
  const open = useCart((s) => s.open);
  const setOpen = useCart((s) => s.setOpen);
  const count = useCart((s) => s.items.length);
  const total = useCart(selectTotal);
  const close = () => setOpen(false);

  return (
    <MotionProvider>
      <Sheet
        open={open}
        onOpenChange={setOpen}
        title={t("cart.title")}
        description={count ? t("cart.items", { count }) : undefined}
        closeLabel={t("common.close")}
        footer={
          count ? (
            <div className="flex flex-col gap-4">
              <div className="flex items-baseline justify-between">
                <span className="text-small text-ink-muted">{t("cart.subtotal")}</span>
                <span className="font-mono text-h3 font-semibold tabular">{formatINR(total)}</span>
              </div>
              <p className="-mt-3 text-small text-ink-muted">
                {t("common.inclGst")} · {t("cart.deliveryAtCheckout")}
              </p>
              <InkButton href="/checkout" size="lg" magnetic={false} className="w-full" wrapperClassName="w-full" onClick={close}>
                {t("cart.checkout")}
              </InkButton>
            </div>
          ) : null
        }
      >
        {count === 0 ? (
          <div className="flex flex-col items-start gap-4 py-10">
            <p className="font-display text-h3">{t("cart.empty")}</p>
            <p className="text-ink-muted">{t("cart.emptySub")}</p>
            <InkButton href="/quote" onClick={close}>
              {t("common.getInstantQuote")}
            </InkButton>
          </div>
        ) : (
          <CartLines onNavigate={close} />
        )}
      </Sheet>
    </MotionProvider>
  );
}
