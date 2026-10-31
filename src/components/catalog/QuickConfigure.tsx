"use client";

import { useRef, useState } from "react";
import dynamic from "next/dynamic";
import { SlidersHorizontal } from "lucide-react";
import type { CategorySummary, Product } from "@/types/catalog";

const QuickConfigurePanel = dynamic(() => import("./QuickConfigurePanel"), { ssr: false });

/** Quick configure trigger. The configurator, popover and drawer code load on first click. */
export function QuickConfigure({ product, category, label }: { product: Product; category: Pick<CategorySummary, "slug" | "colour">; label: string }) {
  const anchor = useRef<HTMLButtonElement>(null);
  const [open, setOpen] = useState(false);
  const [loaded, setLoaded] = useState(false);

  return (
    <>
      <button
        ref={anchor}
        type="button"
        aria-haspopup="dialog"
        aria-expanded={open}
        onClick={() => {
          setLoaded(true);
          setOpen((v) => !v);
        }}
        className="relative z-10 inline-flex min-h-11 items-center gap-2 rounded-chip border border-ink/20 bg-paper px-4 text-small font-medium transition-colors hover:border-ink"
      >
        <SlidersHorizontal className="size-4" aria-hidden />
        {label}
      </button>
      {loaded ? <QuickConfigurePanel product={product} category={category} open={open} onOpenChange={setOpen} anchor={anchor} /> : null}
    </>
  );
}
