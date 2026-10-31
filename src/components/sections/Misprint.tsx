"use client";

import { useEffect, useRef } from "react";

const PLATES = [
  { cls: "text-cyan", x: -38, y: 22 },
  { cls: "text-magenta", x: 30, y: -26 },
  { cls: "text-yellow", x: -18, y: -34 },
];

/** Giant misregistered 404: the plates drift toward alignment as the pointer approaches the centre. */
export function Misprint() {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const root = ref.current;
    if (!root) return;
    const plates = Array.from(root.querySelectorAll<HTMLElement>("[data-plate]"));
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    let frame = 0;
    let target = 1;
    let current = 1;

    const apply = () => {
      current += (target - current) * 0.08;
      plates.forEach((plate, i) => {
        const p = PLATES[i];
        plate.style.transform = `translate3d(${(p.x * current).toFixed(2)}px, ${(p.y * current).toFixed(2)}px, 0)`;
      });
      frame = Math.abs(target - current) > 0.002 ? requestAnimationFrame(apply) : 0;
    };
    const onMove = (event: PointerEvent) => {
      const rect = root.getBoundingClientRect();
      const dx = (event.clientX - (rect.left + rect.width / 2)) / (window.innerWidth / 2);
      const dy = (event.clientY - (rect.top + rect.height / 2)) / (window.innerHeight / 2);
      target = Math.min(1, Math.hypot(dx, dy));
      if (!frame) frame = requestAnimationFrame(apply);
    };

    if (reduced) {
      target = 0.35;
      current = 0.35;
      apply();
      return;
    }
    apply();
    window.addEventListener("pointermove", onMove, { passive: true });
    return () => {
      cancelAnimationFrame(frame);
      window.removeEventListener("pointermove", onMove);
    };
  }, []);

  const digits = "404";
  const type = "block text-center font-display text-[clamp(9rem,34vw,26rem)] font-bold leading-[0.8] tracking-[-0.06em]";

  return (
    <div ref={ref} className="relative isolate select-none" aria-hidden>
      {PLATES.map((plate) => (
        <span key={plate.cls} data-plate className={`${type} ${plate.cls} absolute inset-0 -z-10 mix-blend-multiply`}>
          {digits}
        </span>
      ))}
      <span className={`${type} text-ink`}>{digits}</span>
    </div>
  );
}
