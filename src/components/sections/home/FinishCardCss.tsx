"use client";

import { useRef } from "react";
import * as m from "motion/react-m";
import { useMotionValue, useSpring } from "motion/react";
import { RegMark } from "@/components/marks";
import type { LabFinish, LabPaper } from "@/components/three/FinishLabCanvas";
import type { CardText } from "@/components/three/cardArt";
import { spring } from "@/lib/motion";
import { cn } from "@/lib/utils";

/**
 * Low-tier / pre-load render of the Finish Lab card in CSS 3D. Each paper and finish maps to a
 * visual treatment so every toggle still changes the card, with zero WebGL cost.
 */
export function FinishCardCss({ paper, finishes, text, label }: { paper: LabPaper; finishes: LabFinish[]; text: CardText; label: string }) {
  const ref = useRef<HTMLDivElement>(null);
  const rx = useSpring(useMotionValue(10), spring.soft);
  const ry = useSpring(useMotionValue(-18), spring.soft);
  const kraft = paper === "kraft";
  const has = (f: LabFinish) => finishes.includes(f);

  const onMove = (e: React.PointerEvent) => {
    if (e.pointerType !== "mouse") return;
    const r = ref.current?.getBoundingClientRect();
    if (!r) return;
    ry.set(((e.clientX - r.left) / r.width - 0.5) * 36);
    rx.set(-((e.clientY - r.top) / r.height - 0.5) * 24);
  };
  const reset = () => {
    rx.set(10);
    ry.set(-18);
  };

  return (
    <div
      ref={ref}
      onPointerMove={onMove}
      onPointerLeave={reset}
      role="img"
      aria-label={label}
      className="grid h-full w-full place-items-center [perspective:1100px]"
    >
      <m.div
        style={{ rotateX: rx, rotateY: ry }}
        className={cn(
          "relative aspect-[1.75] w-[min(88%,460px)] overflow-hidden shadow-[0_40px_60px_-30px_rgba(14,14,16,0.45),0_18px_30px_-18px_rgba(14,14,16,0.35)] transition-[border-radius] duration-500",
          has("rounded") ? "rounded-[18px]" : "rounded-[3px]",
          kraft ? "bg-[#C8A97E]" : "bg-[#FBF9F4]",
        )}
      >
        {kraft ? (
          <div className="halftone-field absolute inset-0 text-[#8a6a45] opacity-20" />
        ) : (
          <div className="absolute inset-y-0 left-0 w-[2.5%] bg-magenta" />
        )}
        <div className="absolute top-[13%] left-[8%] flex items-center gap-2">
          <span
            className={cn(
              "relative",
              has("spotUv") &&
                "after:absolute after:-inset-1 after:rounded-full after:bg-[linear-gradient(115deg,transparent_30%,rgba(255,255,255,0.8)_48%,transparent_62%)]",
            )}
          >
            <RegMark
              size={34}
              strokeWidth={1.6}
              className={cn("text-ink", has("emboss") && "[filter:drop-shadow(1px_1px_0_rgba(255,255,255,0.8))_drop-shadow(-1px_-1px_0_rgba(0,0,0,0.25))]")}
            />
          </span>
          <span
            className={cn(
              "text-[clamp(1.2rem,2.4vw,1.6rem)] font-bold tracking-[-0.03em] text-ink",
              has("emboss") && "[text-shadow:1px_1px_0_rgba(255,255,255,0.8),-1px_-1px_0_rgba(0,0,0,0.25)]",
            )}
            style={{ fontFamily: "var(--font-bricolage), sans-serif" }}
          >
            {text.brand.split(" ")[0].toUpperCase()}
          </span>
        </div>
        <div className="absolute bottom-[16%] left-[8%]">
          <p
            className={cn("text-[clamp(1rem,2vw,1.35rem)] font-semibold", has("goldFoil") ? "foil-text" : "text-ink")}
            style={{ fontFamily: "var(--font-bricolage), sans-serif" }}
          >
            {text.name}
          </p>
          <p className="font-mono text-[0.62rem] tracking-[0.12em] text-ink/70 uppercase">{text.role}</p>
        </div>
        <div className="absolute right-[8%] bottom-[16%] text-right font-mono text-[0.6rem] leading-relaxed text-ink/60">
          <p>{text.phone}</p>
          <p>{text.email}</p>
          <p>{text.city}</p>
        </div>
        {paper === "gloss" ? (
          <div className="pointer-events-none absolute inset-0 bg-[linear-gradient(115deg,transparent_30%,rgba(255,255,255,0.65)_46%,transparent_58%)]" />
        ) : null}
        {paper === "velvet" ? (
          <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(120%_90%_at_30%_20%,rgba(255,255,255,0.35),transparent_60%)] mix-blend-soft-light" />
        ) : null}
        {paper === "matte" ? (
          <div className="pointer-events-none absolute inset-0 bg-[linear-gradient(160deg,rgba(255,255,255,0.18),rgba(0,0,0,0.04))]" />
        ) : null}
      </m.div>
    </div>
  );
}
