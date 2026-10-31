"use client";

import dynamic from "next/dynamic";
import { useNearViewport } from "@/components/motion/useNearViewport";
import type { Product } from "@/types/catalog";

// Below-the-fold interactive sections load as the visitor approaches them, keeping the
// home page's initial JavaScript small. Fallbacks reserve roughly the same space.

const QuoteTeaser = dynamic(() => import("./QuoteTeaser").then((mod) => mod.QuoteTeaser), { ssr: false });
const FinishLab = dynamic(() => import("./FinishLab").then((mod) => mod.FinishLab), { ssr: false });

function Placeholder({ className }: { className: string }) {
  return <div aria-hidden className={`skeleton ${className}`} />;
}

export function QuoteTeaserIsland({ products }: { products: Product[] }) {
  const { ref, near } = useNearViewport<HTMLDivElement>();
  return <div ref={ref}>{near ? <QuoteTeaser products={products} /> : <Placeholder className="h-[1180px] md:h-[640px]" />}</div>;
}

export function FinishLabIsland({ product }: { product: Product }) {
  const { ref, near } = useNearViewport<HTMLDivElement>();
  return <div ref={ref}>{near ? <FinishLab product={product} /> : <Placeholder className="aspect-[4/3] w-full lg:aspect-[16/7]" />}</div>;
}
