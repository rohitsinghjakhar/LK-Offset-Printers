"use client";

import { useEffect, useRef, useState } from "react";
import * as m from "motion/react-m";
import { useReducedMotion, useSpring, useTransform } from "motion/react";
import { useTranslations } from "next-intl";
import { formatINR } from "@/lib/format";
import { cn } from "@/lib/utils";

type PriceDisplayProps = {
  total: number;
  className?: string;
  size?: "md" | "lg" | "xl";
  tone?: "paper" | "ink";
  /** Announce changes politely to screen readers. */
  announce?: boolean;
};

const sizes = {
  md: "text-[1.9rem]",
  lg: "text-[clamp(2.4rem,4.4vw,3.4rem)]",
  xl: "text-[clamp(3rem,7vw,5.5rem)]",
};

/** Big mono price with a spring counter and a brief magenta ink ripple on every change. */
export function PriceDisplay({ total, className, size = "lg", tone = "paper", announce = true }: PriceDisplayProps) {
  const t = useTranslations("quote");
  const reduced = useReducedMotion();
  const spring = useSpring(total, { stiffness: 140, damping: 22, mass: 0.8 });
  const text = useTransform(spring, (v) => formatINR(v));
  const [ripple, setRipple] = useState(0);
  const [spoken, setSpoken] = useState("");
  const first = useRef(true);

  useEffect(() => {
    if (reduced) spring.jump(total);
    else spring.set(total);
    if (first.current) {
      first.current = false;
      return;
    }
    const rippleTimer = window.setTimeout(() => setRipple((r) => r + 1), 0);
    const speakTimer = window.setTimeout(() => setSpoken(t("priceAnnounce", { price: formatINR(total) })), 700);
    return () => {
      window.clearTimeout(rippleTimer);
      window.clearTimeout(speakTimer);
    };
  }, [total, reduced, spring, t]);

  return (
    <div className={cn("relative inline-flex", className)}>
      {ripple > 0 && !reduced ? (
        <m.span
          key={ripple}
          aria-hidden
          initial={{ scale: 0.2, opacity: 0.45 }}
          animate={{ scale: 1.6, opacity: 0 }}
          transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
          className="pointer-events-none absolute top-1/2 left-1/4 size-24 -translate-y-1/2 rounded-full bg-magenta mix-blend-multiply"
        />
      ) : null}
      <m.span
        aria-hidden
        className={cn("relative font-mono leading-none font-semibold tracking-[-0.04em] tabular", sizes[size], tone === "ink" ? "text-paper" : "text-ink")}
      >
        {text}
      </m.span>
      <span className="sr-only">{formatINR(total)}</span>
      {announce ? (
        <span className="sr-only" role="status" aria-live="polite">
          {spoken}
        </span>
      ) : null}
    </div>
  );
}
