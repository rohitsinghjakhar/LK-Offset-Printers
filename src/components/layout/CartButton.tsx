"use client";

import { ShoppingBag } from "lucide-react";
import { useHydrated } from "@/lib/hooks";
import { selectCount, useCart } from "@/stores/cart";

export type CartLabels = { zero: string; one: string; many: string };

function label(count: number, labels: CartLabels) {
  if (count === 0) return labels.zero;
  if (count === 1) return labels.one;
  return labels.many.replace("{n}", String(count));
}

export function CartButton({ labels }: { labels: CartLabels }) {
  const hydrated = useHydrated();
  const count = useCart(selectCount);
  const bump = useCart((s) => s.bump);
  const setOpen = useCart((s) => s.setOpen);
  const shown = hydrated ? count : 0;

  return (
    <button
      type="button"
      data-cart-target
      onClick={() => setOpen(true)}
      aria-label={label(shown, labels)}
      className="relative grid size-11 place-items-center rounded-card transition-colors duration-200 hover:bg-ink/5"
    >
      <ShoppingBag className="size-[1.3rem]" strokeWidth={1.6} aria-hidden />
      {shown > 0 ? (
        // Keyed by bump so the pop animation replays on every add.
        <span
          key={bump}
          aria-hidden
          className="absolute top-0.5 right-0.5 grid min-w-[1.15rem] animate-[pop_.45s_var(--ease-out)] place-items-center rounded-chip bg-magenta px-1 font-mono text-[0.66rem] leading-[1.15rem] font-semibold text-ink"
        >
          {shown}
        </span>
      ) : null}
    </button>
  );
}
