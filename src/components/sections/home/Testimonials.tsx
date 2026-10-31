import { getLocale, getTranslations } from "next-intl/server";
import { Star } from "lucide-react";
import { SectionHeader } from "@/components/shared/SectionHeader";
import { cn } from "@/lib/utils";
import { tx } from "@/types/i18n";
import type { Testimonial } from "@/data/content/testimonials";

function Slip({ item, locale, starsLabel }: { item: Testimonial; locale: string; starsLabel: string }) {
  return (
    <figure className="relative bg-paper [mask-image:radial-gradient(circle_at_6px_0,transparent_4px,#000_4.5px)] [mask-size:14px_100%] [mask-position:0_0] [mask-repeat:repeat-x] p-6 shadow-paper">
      <div className="flex items-center justify-between gap-3">
        <div className="flex gap-0.5" role="img" aria-label={starsLabel}>
          {Array.from({ length: 5 }, (_, i) => (
            <Star key={i} className={cn("size-4", i < item.rating ? "fill-magenta text-magenta" : "text-ink/20")} aria-hidden />
          ))}
        </div>
        <span className="label-mono text-ink-muted">{tx(item.product, locale)}</span>
      </div>
      <blockquote className="mt-4 text-[1.02rem] leading-relaxed">“{tx(item.quote, locale)}”</blockquote>
      <figcaption className="mt-5 border-t border-dashed border-ink/20 pt-4">
        <p className="font-display font-semibold">{item.name}</p>
        <p className="text-small text-ink-muted">
          {tx(item.business, locale)} · {tx(item.city, locale)}
        </p>
      </figcaption>
    </figure>
  );
}

/** S12 — testimonial slips in a static masonry grid: every slip readable, nothing moves. */
export async function Testimonials({ items }: { items: Testimonial[] }) {
  const t = await getTranslations("home.testimonials");
  const locale = await getLocale();

  return (
    <section aria-labelledby="testimonials-title" className="bg-paper-2 section-y">
      <div className="container-x">
        <SectionHeader id="testimonials-title" slug={t("slug")} title={t("title")} accent={t("titleAccent")} after={t("titleAfter")} />
        <div className="mt-12 gap-5 md:columns-2 lg:columns-3">
          {items.map((item, i) => (
            <div key={item.id} className={cn("mb-5 break-inside-avoid", i >= 6 && "hidden md:block")}>
              <Slip item={item} locale={locale} starsLabel={t("stars", { count: item.rating })} />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
