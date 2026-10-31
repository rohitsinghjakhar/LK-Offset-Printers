import { ArrowRight } from "lucide-react";
import { TransitionLink } from "@/components/motion/TransitionLink";
import { cx } from "@/lib/cx";
import type { OfferBanner as OfferBannerData } from "@/data/content/site";
import { tx, type Locale } from "@/types/i18n";

const TONES: Record<OfferBannerData["colour"], string> = {
  magenta: "bg-magenta text-white",
  cyan: "bg-cyan text-ink",
  yellow: "bg-yellow text-ink",
  ink: "bg-ink text-paper",
};

/** One-line offer strip set in src/data/content/site.ts. Its presence sets --banner-h (see globals.css). */
export function OfferBanner({ banner, locale }: { banner: OfferBannerData; locale: Locale }) {
  const text = tx(banner.text, locale);
  const body = (
    <>
      <span className="truncate">{text}</span>
      {banner.href ? <ArrowRight className="size-3.5 shrink-0 transition-transform duration-200 group-hover:translate-x-0.5" aria-hidden /> : null}
    </>
  );
  const inner = "group container-x flex h-full items-center justify-center gap-2";
  // Accept "/catalog/x" as well as "/en/catalog/x"; TransitionLink adds the current locale.
  const internal = banner.href?.startsWith("/") ? banner.href.replace(/^\/(en|hi)(?=\/|$)/, "") || "/" : null;

  return (
    <div className={cx("offer-banner h-[var(--banner-h)] text-[0.8rem] font-medium", TONES[banner.colour])}>
      {internal ? (
        <TransitionLink href={internal} className={inner}>
          {body}
        </TransitionLink>
      ) : banner.href ? (
        <a href={banner.href} target="_blank" rel="noopener noreferrer" className={inner}>
          {body}
        </a>
      ) : (
        <p className={inner}>{body}</p>
      )}
    </div>
  );
}
