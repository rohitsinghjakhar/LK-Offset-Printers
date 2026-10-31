import Image from "next/image";
import { getLocale, getTranslations } from "next-intl/server";
import { ArrowUpRight } from "lucide-react";
import { IndustryIcon } from "@/components/icons";
import { Reveal } from "@/components/motion/Reveal";
import { TransitionLink } from "@/components/motion/TransitionLink";
import { SectionHeader } from "@/components/shared/SectionHeader";
import { inkBg } from "@/lib/ink";
import { cn } from "@/lib/utils";
import { tx } from "@/types/i18n";
import { industryPhotos, type Industry } from "@/data/content/industries";
import type { Product } from "@/types/catalog";

/** S9 — industries. Hover (or focus) reveals each kit's top three products with a stagger. */
export async function Industries({ industries, products }: { industries: Industry[]; products: Product[] }) {
  const t = await getTranslations("home.industries");
  const locale = await getLocale();
  const nameOf = (slug: string) => products.find((p) => p.slug === slug)?.name;

  return (
    <section aria-labelledby="industries-title" className="section-y">
      <div className="container-x">
        <SectionHeader id="industries-title" slug={t("slug")} title={t("title")} accent={t("titleAccent")} after={t("titleAfter")} />
        <ul className="mt-12 grid gap-px overflow-hidden rounded-card border border-line bg-line sm:grid-cols-2 lg:grid-cols-4">
          {industries.map((industry, i) => (
            <li key={industry.slug} className="bg-paper">
              <Reveal delay={(i % 4) * 0.06} className="h-full">
                <TransitionLink
                  href={`/industries/${industry.slug}`}
                  className="group relative flex h-full min-h-[280px] flex-col gap-5 p-6 transition-colors duration-300 hover:bg-paper-2 focus-visible:bg-paper-2 md:p-7"
                >
                  <span className="relative -mx-6 -mt-6 block aspect-[16/9] overflow-hidden bg-paper-2 md:-mx-7 md:-mt-7">
                    <Image
                      src={`/images/stock/${industryPhotos[industry.slug]}.webp`}
                      alt=""
                      fill
                      sizes="(min-width: 1024px) 25vw, (min-width: 640px) 50vw, 100vw"
                      className="object-cover transition-transform duration-500 group-hover:scale-[1.04]"
                    />
                  </span>
                  <span className="flex items-start justify-between">
                    <span className="relative grid size-14 place-items-center">
                      <span
                        aria-hidden
                        className={cn(
                          "absolute inset-0 scale-75 rounded-full opacity-0 transition-[opacity,transform] duration-500 ease-out group-hover:scale-100 group-hover:opacity-100 group-focus-visible:scale-100 group-focus-visible:opacity-100",
                          inkBg[industry.colour],
                        )}
                      />
                      <IndustryIcon slug={industry.slug} className="relative size-8" />
                    </span>
                    <ArrowUpRight
                      className="size-5 opacity-40 transition-[opacity,transform] duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 group-hover:opacity-100"
                      aria-hidden
                    />
                  </span>
                  <span>
                    <span className="block font-display text-h3 font-semibold">{tx(industry.name, locale)}</span>
                    <span className="mt-1.5 block text-small text-ink-muted">{tx(industry.tagline, locale)}</span>
                  </span>
                  <span className="mt-auto flex flex-col gap-1">
                    <span className="label-mono text-ink-muted transition-opacity duration-500 [@media(hover:hover)]:opacity-0 [@media(hover:hover)]:group-hover:opacity-100 [@media(hover:hover)]:group-focus-visible:opacity-100">
                      {t("top")}
                    </span>
                    {industry.kit.slice(0, 3).map((slug, j) => {
                      const name = nameOf(slug);
                      return name ? (
                        <span
                          key={slug}
                          className="text-small font-medium transition-[opacity,transform] duration-500 ease-out [@media(hover:hover)]:translate-y-2 [@media(hover:hover)]:opacity-0 [@media(hover:hover)]:group-hover:translate-y-0 [@media(hover:hover)]:group-hover:opacity-100 [@media(hover:hover)]:group-focus-visible:translate-y-0 [@media(hover:hover)]:group-focus-visible:opacity-100"
                          style={{ transitionDelay: `${j * 60}ms` }}
                        >
                          {tx(name, locale)}
                        </span>
                      ) : null;
                    })}
                  </span>
                </TransitionLink>
              </Reveal>
            </li>
          ))}
          <li className="bg-ink text-paper sm:col-span-2 lg:col-span-1">
            <TransitionLink href="/contact" className="group flex h-full min-h-[200px] flex-col justify-end gap-2 p-6 md:p-7">
              <span className="font-display text-h3 font-semibold">{t("otherTitle")}</span>
              <span className="inline-flex items-center gap-2 serif-accent text-h3 text-magenta">
                {t("otherCta")}
                <ArrowUpRight className="size-5 transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" aria-hidden />
              </span>
            </TransitionLink>
          </li>
        </ul>
      </div>
    </section>
  );
}
