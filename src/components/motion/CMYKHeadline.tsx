"use client";

import { useEffect, useRef } from "react";
import { cx } from "@/lib/cx";

type CMYKHeadlineProps = {
  children: React.ReactNode;
  as?: "h1" | "h2" | "p" | "span";
  className?: string;
  onInk?: boolean;
  /** Pointer drift: C/M/Y move up to this many px opposite the cursor. */
  drift?: number;
  id?: string;
};

const FACTORS = [1, -0.72, 0.5] as const;

/**
 * Four stacked plates. Cyan, magenta and yellow (multiply, aria-hidden) start misregistered and
 * spring into alignment via CSS so the LCP text paints before hydration. Only the ink layer is text.
 */
export function CMYKHeadline({ children, as: Tag = "h1", className, onInk = false, drift = 3, id }: CMYKHeadlineProps) {
  const rootRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const root = rootRef.current;
    if (!root || drift === 0) return;
    if (!window.matchMedia("(pointer: fine)").matches || window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const layers = Array.from(root.querySelectorAll<HTMLElement>("[data-plate]"));
    let frame = 0;
    let targetX = 0;
    let targetY = 0;
    let currentX = 0;
    let currentY = 0;

    const loop = () => {
      currentX += (targetX - currentX) * 0.12;
      currentY += (targetY - currentY) * 0.12;
      layers.forEach((layer, i) => {
        const f = FACTORS[i] ?? 1;
        layer.style.transform = `translate3d(${(-currentX * drift * f).toFixed(2)}px, ${(-currentY * drift * f).toFixed(2)}px, 0)`;
      });
      if (Math.abs(targetX - currentX) > 0.001 || Math.abs(targetY - currentY) > 0.001) {
        frame = requestAnimationFrame(loop);
      } else {
        frame = 0;
      }
    };
    const kick = () => {
      if (!frame) frame = requestAnimationFrame(loop);
    };
    const onMove = (event: PointerEvent) => {
      if (event.pointerType !== "mouse") return;
      targetX = (event.clientX / window.innerWidth) * 2 - 1;
      targetY = (event.clientY / window.innerHeight) * 2 - 1;
      kick();
    };
    const onLeave = () => {
      targetX = 0;
      targetY = 0;
      kick();
    };

    window.addEventListener("pointermove", onMove, { passive: true });
    document.documentElement.addEventListener("pointerleave", onLeave);
    window.addEventListener("blur", onLeave);
    return () => {
      cancelAnimationFrame(frame);
      window.removeEventListener("pointermove", onMove);
      document.documentElement.removeEventListener("pointerleave", onLeave);
      window.removeEventListener("blur", onLeave);
    };
  }, [drift]);

  return (
    <Tag ref={rootRef as React.Ref<never>} id={id} className={cx("cmyk", onInk && "cmyk--on-ink", className)}>
      <span aria-hidden data-plate className="cmyk__layer cmyk__layer--c">
        {children}
      </span>
      <span aria-hidden data-plate className="cmyk__layer cmyk__layer--m">
        {children}
      </span>
      <span aria-hidden data-plate className="cmyk__layer cmyk__layer--y">
        {children}
      </span>
      <span className="cmyk__ink">{children}</span>
    </Tag>
  );
}
