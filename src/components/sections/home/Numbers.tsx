import { getTranslations } from "next-intl/server";
import { SlugLine } from "@/components/marks";
import { Counter } from "@/components/motion/Counter";
import { InViewState } from "@/components/motion/InViewState";
import { siteConfig } from "@/config/site.config";
import { cn } from "@/lib/utils";

const DOT_COLOURS = ["text-cyan", "text-magenta", "text-yellow", "text-ink"];

/** S11 — four giant counters over halftone fields that ripple outward on enter. */
export async function Numbers() {
  const t = await getTranslations("home.numbers");
  const { stats } = siteConfig;
  const items = [
    { key: "years", value: stats.years, suffix: "+", decimals: 0, label: t("years") },
    { key: "orders", value: stats.orders, suffix: "+", decimals: 0, label: t("orders") },
    { key: "clients", value: stats.clients, suffix: "+", decimals: 0, label: t("clients") },
    { key: "rating", value: stats.rating, suffix: "★", decimals: 1, label: t("rating") },
  ];
  return (
    <section aria-label={t("slug")} className="section-y">
      <div className="container-x">
        <SlugLine className="text-ink/70">{t("slug")}</SlugLine>
        <dl className="mt-10 grid border-t border-line sm:grid-cols-2 lg:grid-cols-4">
          {items.map((item, i) => (
            <div
              key={item.key}
              className="relative flex flex-col-reverse justify-end gap-3 overflow-hidden border-b border-line px-5 py-7 md:min-h-[260px] md:justify-between md:p-8 lg:border-r lg:last:border-r-0 sm:[&:nth-child(odd)]:border-r"
            >
              <InViewState className={cn("ripple-field halftone-field pointer-events-none absolute inset-0 opacity-[0.22]", DOT_COLOURS[i])} />
              <dt className="relative label-mono text-ink-muted">{item.label}</dt>
              <dd className="relative font-display text-[clamp(3rem,7vw,6.5rem)] leading-none font-semibold tracking-[-0.04em]">
                <Counter value={item.value} decimals={item.decimals} suffix={item.suffix} duration={2} />
              </dd>
            </div>
          ))}
        </dl>
      </div>
    </section>
  );
}
