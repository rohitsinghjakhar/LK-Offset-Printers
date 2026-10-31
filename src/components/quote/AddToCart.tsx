"use client";

import { useRef } from "react";
import { ShoppingBag } from "lucide-react";
import { useTranslations } from "next-intl";
import { notify } from "@/lib/notify";
import { InkButton } from "@/components/motion/InkButton";
import { inkCss } from "@/lib/ink";
import { easeCss } from "@/lib/motion";
import { summarizeSelection } from "@/lib/quote-summary";
import type { CategorySummary } from "@/types/catalog";
import { useCart } from "@/stores/cart";
import type { QuoteController } from "./useQuote";

/** Flies a paper swatch from the button to the cart icon, then the badge pops. */
function flyToCart(from: HTMLElement, colour: string) {
  if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
  const target = Array.from(document.querySelectorAll<HTMLElement>("[data-cart-target]")).find((el) => el.offsetParent !== null);
  if (!target) return;
  const a = from.getBoundingClientRect();
  const b = target.getBoundingClientRect();
  const chip = document.createElement("div");
  chip.setAttribute("aria-hidden", "true");
  Object.assign(chip.style, {
    position: "fixed",
    left: `${a.left + a.width / 2 - 18}px`,
    top: `${a.top + a.height / 2 - 24}px`,
    width: "36px",
    height: "48px",
    background: colour,
    boxShadow: "var(--shadow-paper)",
    zIndex: "160",
    pointerEvents: "none",
    borderRadius: "2px",
  });
  document.body.appendChild(chip);
  const dx = b.left + b.width / 2 - (a.left + a.width / 2);
  const dy = b.top + b.height / 2 - (a.top + a.height / 2);
  chip
    .animate(
      [
        { transform: "translate(0,0) rotate(0deg) scale(1)", opacity: 1 },
        { transform: `translate(${dx * 0.55}px, ${dy - 90}px) rotate(-14deg) scale(0.8)`, opacity: 1, offset: 0.55 },
        { transform: `translate(${dx}px, ${dy}px) rotate(8deg) scale(0.2)`, opacity: 0.2 },
      ],
      { duration: 780, easing: easeCss.inOut },
    )
    .finished.finally(() => chip.remove());
}

export function AddToCart({
  q,
  category,
  editId,
  className,
  wrapperClassName,
  onAdded,
}: {
  q: QuoteController;
  category: Pick<CategorySummary, "slug" | "colour">;
  editId?: string;
  className?: string;
  wrapperClassName?: string;
  onAdded?: () => void;
}) {
  const t = useTranslations("common");
  const ref = useRef<HTMLButtonElement>(null);
  const add = useCart((s) => s.add);
  const update = useCart((s) => s.update);
  const setOpen = useCart((s) => s.setOpen);
  const exists = useCart((s) => (editId ? s.items.some((i) => i.id === editId) : false));

  const onClick = () => {
    const { product, selection, quote } = q;
    if (!quote.ok) return;
    const payload = {
      productSlug: product.slug,
      name: product.name,
      category: category.slug,
      colour: category.colour,
      unit: product.unit,
      selection,
      summary: summarizeSelection(product, selection),
      total: quote.total,
    };
    if (editId && exists) {
      update(editId, payload);
      setOpen(true);
    } else {
      add(payload);
      if (ref.current) flyToCart(ref.current, inkCss[category.colour]);
      notify(t("added"), { action: { label: t("cart"), onClick: () => setOpen(true) } });
    }
    onAdded?.();
  };

  return (
    <InkButton
      ref={ref}
      onClick={onClick}
      disabled={!q.quote.ok}
      size="lg"
      className={className}
      wrapperClassName={wrapperClassName}
      icon={<ShoppingBag className="size-5" aria-hidden />}
      data-cursor="Open"
    >
      {t("addToCart")}
    </InkButton>
  );
}
