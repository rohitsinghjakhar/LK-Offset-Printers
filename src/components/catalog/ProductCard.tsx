import Image from "next/image";
import { getLocale, getTranslations } from "next-intl/server";
import { Clock3 } from "lucide-react";
import { Mockup } from "@/components/mockups";
import { HalftoneReveal } from "@/components/motion/HalftoneReveal";
import { Tilt } from "@/components/motion/Tilt";
import { TransitionLink } from "@/components/motion/TransitionLink";
import { formatPriceTag } from "@/lib/format";
import { inkBg } from "@/lib/ink";
import { priceTag } from "@/lib/catalog";
import { cn } from "@/lib/utils";
import { tx } from "@/types/i18n";
import type { InkColour, Product } from "@/types/catalog";
import { QuickConfigure } from "./QuickConfigure";

type ProductCardProps = {
  product: Product;
  colour: InkColour;
  size?: "md" | "lg";
  quick?: boolean;
  className?: string;
  headingLevel?: "h2" | "h3";
};

export async function ProductCard({ product, colour, size = "md", quick = true, className, headingLevel: Heading = "h3" }: ProductCardProps) {
  const locale = await getLocale();
  const t = await getTranslations("common");
  const tb = await getTranslations("home.bestsellers");
  const name = tx(product.name, locale);
  const image = product.images?.[0];

  return (
    <Tilt className={cn("h-full", className)}>
      <article className="group relative flex h-full flex-col overflow-hidden rounded-card bg-paper-2 transition-shadow duration-500 hover:shadow-lift">
        <div className={cn("relative overflow-hidden", size === "lg" ? "aspect-[4/3] md:aspect-auto md:min-h-[420px] md:flex-1" : "aspect-[4/3]")}>
          <span aria-hidden className={cn("absolute top-4 left-4 z-10 size-2.5", inkBg[colour])} />
          <HalftoneReveal className="absolute inset-0 grid place-items-center p-6">
            <div className="w-full transition-transform duration-700 ease-out group-hover:scale-[1.04]">
              {image ? (
                <Image
                  src={image}
                  alt={name}
                  width={800}
                  height={600}
                  sizes={size === "lg" ? "(min-width: 1024px) 50vw, 100vw" : "(min-width: 1024px) 25vw, (min-width: 640px) 50vw, 100vw"}
                  className="h-auto w-full object-contain"
                />
              ) : (
                <Mockup kind={product.mockup} title={name} />
              )}
            </div>
          </HalftoneReveal>
        </div>
        <div className="flex flex-col gap-3 border-t border-line p-5">
          <div className="flex items-start justify-between gap-3">
            <Heading className={cn("font-display leading-tight font-semibold", size === "lg" ? "text-h3" : "text-[1.15rem]")}>
              <TransitionLink
                href={`/product/${product.slug}`}
                data-cursor="View"
                className="after:absolute after:inset-0 after:content-[''] focus-visible:outline-none focus-visible:after:outline-2 focus-visible:after:outline-offset-[-2px] focus-visible:after:outline-magenta"
              >
                {name}
              </TransitionLink>
            </Heading>
            <span className="inline-flex shrink-0 items-center gap-1 rounded-chip border border-ink/15 px-2.5 py-1 font-mono text-[0.7rem] font-medium">
              <Clock3 className="size-3" aria-hidden />
              {tx(product.turnaround.label, locale)}
            </span>
          </div>
          {size === "lg" ? <p className="max-w-[48ch] text-small text-ink-muted">{tx(product.short, locale)}</p> : null}
          <div className="mt-auto flex flex-wrap items-center justify-between gap-3">
            <p className="font-mono text-[0.85rem] font-semibold">{t("fromPrice", { price: formatPriceTag(priceTag(product), locale) })}</p>
            {quick ? <QuickConfigure product={product} category={{ slug: product.category, colour }} label={tb("quick")} /> : null}
          </div>
        </div>
      </article>
    </Tilt>
  );
}
