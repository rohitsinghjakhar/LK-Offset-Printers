"use client";

import { useSearchParams } from "next/navigation";
import { selectionFromParams } from "@/lib/pricing";
import { useQuoteStore } from "@/stores/quote";
import type { CategorySummary, Product } from "@/types/catalog";
import { ProductConfigurator } from "./ProductConfigurator";

/**
 * Configurator seeded from the URL (share links, "Order these cards", cart edits via ?edit=) or,
 * failing that, the visitor's last saved configuration. Must sit inside <Suspense>.
 */
export function ConfiguratorFromUrl({ product, category }: { product: Product; category: Pick<CategorySummary, "slug" | "colour"> }) {
  const params = useSearchParams();
  const saved = useQuoteStore((s) => s.configs[product.slug]);
  const hasParams = params.has("qty") || Array.from(params.keys()).some((k) => k.startsWith("o."));
  const initial = hasParams ? selectionFromParams(params) : saved;
  const editId = params.get("edit") ?? undefined;
  return <ProductConfigurator key={`${product.slug}-${params.toString()}`} product={product} category={category} initial={initial} editId={editId} />;
}
