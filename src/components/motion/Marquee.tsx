import { cx } from "@/lib/cx";

type MarqueeProps = {
  children: React.ReactNode;
  /** Seconds for one full loop. */
  duration?: number;
  reverse?: boolean;
  className?: string;
};

/**
 * Infinite marquee at a calm, constant speed. Pure CSS (two copies, translate -50%), so it needs
 * no client JavaScript. Pauses on hover; with reduced motion it keeps drifting, just slower
 * (see .marquee-track in globals.css).
 */
export function Marquee({ children, duration = 48, reverse = false, className }: MarqueeProps) {
  return (
    <div aria-hidden className={cx("marquee overflow-hidden whitespace-nowrap", className)}>
      <div
        className={cx("marquee-track flex w-max flex-nowrap", reverse && "marquee-track--reverse")}
        style={{ "--marquee-dur": `${duration}s` } as React.CSSProperties}
      >
        {[0, 1].map((i) => (
          <div key={i} className="flex shrink-0 flex-nowrap items-center">
            {children}
          </div>
        ))}
      </div>
    </div>
  );
}
