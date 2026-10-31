"use client";

import { useEffect, useRef } from "react";
import { createSpring2D, prefersMotion } from "@/lib/spring";

type TiltProps = {
  children: React.ReactNode;
  className?: string;
  max?: number;
};

/** Pointer tilt, max 6deg, spring.soft damping. Mouse only; touch and reduced motion stay flat. */
export function Tilt({ children, className, max = 6 }: TiltProps) {
  const ref = useRef<HTMLDivElement>(null);
  const spring = useRef<ReturnType<typeof createSpring2D> | null>(null);

  useEffect(() => {
    const node = ref.current;
    if (!node) return;
    spring.current = createSpring2D(
      (ry, rx) => (node.style.transform = rx || ry ? `perspective(900px) rotateX(${rx.toFixed(2)}deg) rotateY(${ry.toFixed(2)}deg)` : ""),
      { stiffness: 140, damping: 20, mass: 0.8 },
    );
    return () => spring.current?.stop();
  }, []);

  const onMove = (event: React.PointerEvent<HTMLDivElement>) => {
    if (event.pointerType !== "mouse" || !prefersMotion()) return;
    const rect = ref.current?.getBoundingClientRect();
    if (!rect) return;
    const px = (event.clientX - rect.left) / rect.width - 0.5;
    const py = (event.clientY - rect.top) / rect.height - 0.5;
    spring.current?.set(px * max * 2, -py * max * 2);
  };

  return (
    <div ref={ref} onPointerMove={onMove} onPointerLeave={() => spring.current?.set(0, 0)} className={className}>
      {children}
    </div>
  );
}
