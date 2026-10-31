"use client";

import { MotionProvider } from "@/components/motion/MotionProvider";
import { Popover } from "radix-ui";
import { X } from "lucide-react";
import { useLocale, useTranslations } from "next-intl";
import { Drawer } from "@/components/ui/drawer";
import { ProductConfigurator } from "@/components/quote/ProductConfigurator";
import { useMediaQuery } from "@/lib/device";
import { tx } from "@/types/i18n";
import type { CategorySummary, Product } from "@/types/catalog";

type PanelProps = {
  product: Product;
  category: Pick<CategorySummary, "slug" | "colour">;
  open: boolean;
  onOpenChange: (open: boolean) => void;
  anchor: React.RefObject<HTMLButtonElement | null>;
};

/** Loaded on first click: popover on desktop (anchored to the trigger), bottom drawer on phones. */
export default function QuickConfigurePanel({ product, category, open, onOpenChange, anchor }: PanelProps) {
  const t = useTranslations();
  const locale = useLocale();
  const desktop = useMediaQuery("(min-width: 1024px)");
  const title = t("home.bestsellers.quickTitle", { name: tx(product.name, locale) });
  const close = () => onOpenChange(false);

  if (!desktop) {
    return (
      <Drawer open={open} onOpenChange={onOpenChange} title={title}>
        <ProductConfigurator product={product} category={category} compact onAdded={close} />
      </Drawer>
    );
  }

  return (
    <MotionProvider>
      <Popover.Root open={open} onOpenChange={onOpenChange}>
        <Popover.Anchor virtualRef={anchor as React.RefObject<HTMLButtonElement>} />
        <Popover.Portal>
          <Popover.Content
            side="top"
            align="start"
            sideOffset={10}
            collisionPadding={16}
            data-lenis-prevent
            onCloseAutoFocus={(e) => {
              e.preventDefault();
              anchor.current?.focus();
            }}
            className="z-[110] max-h-[min(78vh,720px)] w-[440px] overflow-y-auto rounded-card border border-line bg-paper p-6 shadow-lift outline-none data-[state=open]:animate-[fade-in_.2s_ease-out]"
          >
            <div className="mb-5 flex items-start justify-between gap-4">
              <Popover.Close className="order-last -mt-2 -mr-2 grid size-11 place-items-center rounded-card hover:bg-paper-2" aria-label={t("common.close")}>
                <X className="size-5" aria-hidden />
              </Popover.Close>
              <p className="font-display text-h3 font-semibold">{title}</p>
            </div>
            <ProductConfigurator product={product} category={category} compact onAdded={close} />
          </Popover.Content>
        </Popover.Portal>
      </Popover.Root>
    </MotionProvider>
  );
}
