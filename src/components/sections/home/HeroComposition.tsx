"use client";

import { useEffect, useRef } from "react";
import { cx } from "@/lib/cx";

export type CompositionLayer = {
  id: string;
  node: React.ReactNode;
  /** 0–1: pointer parallax depth (×12px). */
  depth: number;
  /** Scroll parallax speed, 0.2–0.6. */
  speed: number;
  className: string;
};

/** Floating print samples: pointer parallax ±12px by depth, scroll parallax 0.2–0.6. One rAF loop, no library. */
export function HeroComposition({ layers, label, className }: { layers: CompositionLayer[]; label: string; className?: string }) {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const root = ref.current;
    if (!root || window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const nodes = Array.from(root.querySelectorAll<HTMLElement>("[data-layer]"));
    const params = nodes.map((n) => ({ depth: Number(n.dataset.depth), speed: Number(n.dataset.speed) }));
    const finePointer = window.matchMedia("(pointer: fine)").matches;
    let tx = 0;
    let ty = 0;
    let px = 0;
    let py = 0;
    let frame = 0;
    let visible = true;

    const render = () => {
      px += (tx - px) * 0.1;
      py += (ty - py) * 0.1;
      const scroll = Math.min(window.scrollY, window.innerHeight * 1.2);
      nodes.forEach((node, i) => {
        const { depth, speed } = params[i];
        node.style.transform = `translate3d(${(px * 12 * depth).toFixed(2)}px, ${(py * 12 * depth - scroll * speed).toFixed(2)}px, 0)`;
      });
      frame = Math.abs(tx - px) > 0.001 || Math.abs(ty - py) > 0.001 ? requestAnimationFrame(render) : 0;
    };
    const kick = () => {
      if (visible && !frame) frame = requestAnimationFrame(render);
    };
    const onPointer = (e: PointerEvent) => {
      if (e.pointerType !== "mouse") return;
      tx = (e.clientX / window.innerWidth) * 2 - 1;
      ty = (e.clientY / window.innerHeight) * 2 - 1;
      kick();
    };
    const observer = new IntersectionObserver(([entry]) => {
      visible = entry.isIntersecting;
      kick();
    });
    observer.observe(root);
    window.addEventListener("scroll", kick, { passive: true });
    if (finePointer) window.addEventListener("pointermove", onPointer, { passive: true });
    return () => {
      cancelAnimationFrame(frame);
      observer.disconnect();
      window.removeEventListener("scroll", kick);
      window.removeEventListener("pointermove", onPointer);
    };
  }, []);

  return (
    <div ref={ref} role="img" aria-label={label} className={cx("relative", className)}>
      {layers.map((layer) => (
        <div key={layer.id} data-layer="" data-depth={layer.depth} data-speed={layer.speed} className={cx("absolute will-change-transform", layer.className)}>
          {layer.node}
        </div>
      ))}
    </div>
  );
}
