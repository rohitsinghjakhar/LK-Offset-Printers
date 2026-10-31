import { getTranslations } from "next-intl/server";
import { ArrowRight } from "lucide-react";
import { ProductCard } from "@/components/catalog/ProductCard";
import { InkButton } from "@/components/motion/InkButton";
import { SectionHeader } from "@/components/shared/SectionHeader";
import { cn } from "@/lib/utils";
import type { Category, Product } from "@/types/catalog";

// Asymmetric bento: one hero card, then a rhythm of 3- and 4-column cards.
const SPANS = [
  "lg:col-span-6 lg:row-span-2",
  "lg:col-span-3",
  "lg:col-span-3",
  "lg:col-span-3",
  "lg:col-span-3",
  "lg:col-span-4",
  "lg:col-span-4",
  "lg:col-span-4",
];

/** S7 — bestsellers in an asymmetric bento grid. */
export async function Bestsellers({ products, categories }: { products: Product[]; categories: Category[] }) {
  const t = await getTranslations("home.bestsellers");
  const tc = await getTranslations("common");
  const colourOf = (slug: string) => categories.find((c) => c.slug === slug)?.colour ?? "ink";

  return (
    <section aria-labelledby="bestsellers-title" className="section-y">
      <div className="container-x">
        <div className="flex flex-wrap items-end justify-between gap-6">
          <SectionHeader id="bestsellers-title" slug={t("slug")} title={t("title")} accent={t("titleAccent")} after={t("titleAfter")} />
          <InkButton href="/catalog" variant="ghost" icon={<ArrowRight className="size-4" aria-hidden />}>
            {tc("viewAll")}
          </InkButton>
        </div>
        <ul className="mt-12 grid gap-4 sm:grid-cols-2 lg:auto-rows-[minmax(300px,auto)] lg:grid-cols-12 lg:gap-5">
          {products.slice(0, 8).map((product, i) => (
            <li key={product.slug} className={cn(SPANS[i], i === 0 && "sm:col-span-2")}>
              <ProductCard product={product} colour={colourOf(product.category)} size={i === 0 ? "lg" : "md"} />
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
