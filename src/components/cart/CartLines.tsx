"use client";

import * as m from "motion/react-m";
import { AnimatePresence } from "motion/react";
import { Pencil, Trash2 } from "lucide-react";
import { useLocale, useTranslations } from "next-intl";
import { TransitionLink } from "@/components/motion/TransitionLink";
import { formatINR } from "@/lib/format";
import { spring } from "@/lib/motion";
import { notify } from "@/lib/notify";
import { selectionToParams } from "@/lib/pricing";
import { useCart } from "@/stores/cart";
import { tx } from "@/types/i18n";
import { CartThumb } from "./CartThumb";

/** Cart line items with edit (back to the product configurator) and remove-with-undo. */
export function CartLines({ onNavigate }: { onNavigate?: () => void }) {
  const t = useTranslations();
  const locale = useLocale();
  const items = useCart((s) => s.items);
  const remove = useCart((s) => s.remove);
  const restore = useCart((s) => s.restore);

  const onRemove = (id: string) => {
    const removed = remove(id);
    if (!removed) return;
    notify(t("cart.removed", { name: tx(removed.item.name, locale) }), {
      action: { label: t("common.undo"), onClick: () => restore(removed.item, removed.index) },
    });
  };

  return (
    <ul className="flex flex-col">
      <AnimatePresence initial={false}>
        {items.map((item) => {
          const name = tx(item.name, locale);
          const editHref = `/product/${item.productSlug}?${selectionToParams(item.selection).toString()}&edit=${item.id}`;
          return (
            <m.li
              key={item.id}
              layout
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, x: 40, transition: { duration: 0.2 } }}
              transition={spring.ui}
              className="flex gap-4 border-b border-line py-5 first:pt-0"
            >
              <CartThumb colour={item.colour} label={name} />
              <div className="flex min-w-0 flex-1 flex-col">
                <div className="flex items-start justify-between gap-3">
                  <p className="font-display text-[1.05rem] leading-snug font-semibold">{name}</p>
                  <p className="shrink-0 font-mono font-semibold tabular">{formatINR(item.total)}</p>
                </div>
                <p className="mt-1 text-small leading-relaxed text-ink-muted">{item.summary.map((s) => tx(s, locale)).join(" · ")}</p>
                <div className="mt-2 flex gap-1">
                  <TransitionLink
                    href={editHref}
                    onClick={onNavigate}
                    aria-label={t("cart.editItem", { name })}
                    className="-ml-2 inline-flex min-h-11 items-center gap-1.5 rounded-card px-2 text-small font-medium hover:bg-paper-2"
                  >
                    <Pencil className="size-3.5" aria-hidden /> {t("common.edit")}
                  </TransitionLink>
                  <button
                    type="button"
                    onClick={() => onRemove(item.id)}
                    aria-label={t("cart.removeItem", { name })}
                    className="inline-flex min-h-11 items-center gap-1.5 rounded-card px-2 text-small font-medium text-danger hover:bg-paper-2"
                  >
                    <Trash2 className="size-3.5" aria-hidden /> {t("common.remove")}
                  </button>
                </div>
              </div>
            </m.li>
          );
        })}
      </AnimatePresence>
    </ul>
  );
}
