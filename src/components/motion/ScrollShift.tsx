"use client";

import { useEffect, useRef } from "react";
import { cx } from "@/lib/cx";

type ScrollShiftProps = {
  children?: React.ReactNode;
  className?: string;
  /** Translation at the moment the element enters (progress 0) and leaves (progress 1) the viewport. */
  from: { x?: string; y?: string };
  to: { x?: string; y?: string };
  "aria-hidden"?: boolean;
};

function lerp(a: number, b: number, t: number) {
  return a + (b - a) * t;
}

function parse(value = "0px") {
  const n = parseFloat(value);
  return { n: Number.isFinite(n) ? n : 0, unit: value.replace(/^-?[\d.]+/, "") || "px" };
}

/** Scroll-linked translate (parallax / slow drift). Transform only; static for reduced motion. */
export function ScrollShift({ children, className, from, to, ...rest }: ScrollShiftProps) {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const node = ref.current;
    if (!node || window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const fx = parse(from.x);
    const fy = parse(from.y);
    const tX = parse(to.x);
    const tY = parse(to.y);
    let frame = 0;
    let visible = false;

    const update = () => {
      frame = 0;
      const rect = node.getBoundingClientRect();
      const vh = window.innerHeight;
      const progress = Math.min(1, Math.max(0, (vh - rect.top) / (vh + rect.height)));
      node.style.transform = `translate3d(${lerp(fx.n, tX.n, progress).toFixed(2)}${tX.unit}, ${lerp(fy.n, tY.n, progress).toFixed(2)}${tY.unit}, 0)`;
    };
    const kick = () => {
      if (visible && !frame) frame = requestAnimationFrame(update);
    };
    const observer = new IntersectionObserver(([entry]) => {
      visible = entry.isIntersecting;
      kick();
    });
    observer.observe(node);
    window.addEventListener("scroll", kick, { passive: true });
    update();
    return () => {
      cancelAnimationFrame(frame);
      observer.disconnect();
      window.removeEventListener("scroll", kick);
    };
  }, [from.x, from.y, to.x, to.y]);

  return (
    <div ref={ref} className={cx("will-change-transform", className)} {...rest}>
      {children}
    </div>
  );
}
