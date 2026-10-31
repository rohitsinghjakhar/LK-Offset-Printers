"use client";

import { useCallback, useMemo, useState } from "react";
import { computeQuote, normalizeSelection, type DesignChoice, type QuoteSelection, type SizeUnit, DEFAULT_RULES } from "@/lib/pricing";
import type { Product } from "@/types/catalog";

export type QuoteController = ReturnType<typeof useQuote>;

/** Selection state + live quote for one product. Every setter re-normalises, so state is always priceable. */
export function useQuote(product: Product, initial?: Partial<QuoteSelection>) {
  const [selection, setSelection] = useState<QuoteSelection>(() => normalizeSelection(product, initial));
  const [productSlug, setProductSlug] = useState(product.slug);

  // Reset when the product changes (e.g. the /quote product picker) — derived-state pattern.
  let current = selection;
  if (productSlug !== product.slug) {
    current = normalizeSelection(product, initial);
    setProductSlug(product.slug);
    setSelection(current);
  }

  const update = useCallback(
    (patch: Partial<QuoteSelection>) =>
      setSelection((prev) => normalizeSelection(product, { ...prev, ...patch, options: { ...prev.options, ...patch.options } })),
    [product],
  );

  const setQty = useCallback((qty: number) => update({ qty }), [update]);
  const setOption = useCallback((groupId: string, ids: string[]) => update({ options: { [groupId]: ids } }), [update]);
  const setSize = useCallback(
    (size: { w: number; h: number; unit: SizeUnit; presetId?: string }) =>
      setSelection((prev) => {
        // Custom sizes may be half-typed; keep raw values so inputs don't jump.
        const next = { ...prev, size };
        return size.w > 0 && size.h > 0 ? normalizeSelection(product, next) : next;
      }),
    [product],
  );
  const setExpress = useCallback((express: boolean) => update({ express }), [update]);
  const setDesign = useCallback((design: DesignChoice) => update({ design }), [update]);
  const replace = useCallback((next: Partial<QuoteSelection>) => setSelection(normalizeSelection(product, next)), [product]);

  const quote = useMemo(() => computeQuote(product, current, DEFAULT_RULES), [product, current]);

  return { product, selection: current, quote, setQty, setOption, setSize, setExpress, setDesign, replace };
}
