"use client";

import { useEffect, useRef } from "react";
import { createSpring2D, prefersMotion } from "@/lib/spring";
import { cx } from "@/lib/cx";

type MagneticProps = {
  children: React.ReactNode;
  strength?: number;
  max?: number;
  className?: string;
};

/** Pulls its child toward the pointer (fine pointers only), capped at `max` px, spring.ui damping. */
export function Magnetic({ children, strength = 0.35, max = 10, className }: MagneticProps) {
  const ref = useRef<HTMLSpanElement>(null);
  const spring = useRef<ReturnType<typeof createSpring2D> | null>(null);

  useEffect(() => {
    const node = ref.current;
    if (!node) return;
    spring.current = createSpring2D((x, y) => (node.style.transform = x || y ? `translate3d(${x.toFixed(2)}px, ${y.toFixed(2)}px, 0)` : ""), {
      stiffness: 380,
      damping: 30,
    });
    return () => spring.current?.stop();
  }, []);

  const onMove = (event: React.PointerEvent) => {
    const node = ref.current;
    if (!node || event.pointerType !== "mouse" || !prefersMotion()) return;
    const rect = node.getBoundingClientRect();
    const dx = (event.clientX - (rect.left + rect.width / 2)) * strength;
    const dy = (event.clientY - (rect.top + rect.height / 2)) * strength;
    spring.current?.set(Math.max(-max, Math.min(max, dx)), Math.max(-max, Math.min(max, dy)));
  };

  return (
    <span ref={ref} onPointerMove={onMove} onPointerLeave={() => spring.current?.set(0, 0)} className={cx("inline-flex will-change-transform", className)}>
      {children}
    </span>
  );
}
