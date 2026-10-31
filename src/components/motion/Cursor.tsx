"use client";

import { MotionProvider } from "@/components/motion/MotionProvider";
import { useEffect, useState } from "react";
import * as m from "motion/react-m";
import { useMotionValue, useSpring } from "motion/react";
import { useTranslations } from "next-intl";
import { useDeviceTier } from "@/lib/device";
import { spring } from "@/lib/motion";

type CursorKey = "view" | "drag" | "open";

const LABELS: Record<string, CursorKey> = { View: "view", Drag: "drag", Open: "open" };

/** Registration-crosshair cursor (high tier only). Grows and shows a mono label over [data-cursor]. */
export function Cursor() {
  const tier = useDeviceTier();
  return tier === "high" ? <CursorInner /> : null;
}

function CursorInner() {
  const t = useTranslations("cursor");
  const x = useMotionValue(-100);
  const y = useMotionValue(-100);
  const ringX = useSpring(x, { stiffness: 320, damping: 30, mass: 0.5 });
  const ringY = useSpring(y, { stiffness: 320, damping: 30, mass: 0.5 });
  const [label, setLabel] = useState<CursorKey | null>(null);
  const [hovering, setHovering] = useState(false);
  const [visible, setVisible] = useState(false);
  const [pressed, setPressed] = useState(false);

  useEffect(() => {
    const root = document.documentElement;
    root.dataset.cursor = "on";

    const onMove = (event: PointerEvent) => {
      if (event.pointerType !== "mouse") return;
      x.set(event.clientX);
      y.set(event.clientY);
      setVisible(true);
    };
    const onOver = (event: PointerEvent) => {
      const target = event.target instanceof Element ? event.target : null;
      const tagged = target?.closest<HTMLElement>("[data-cursor]");
      if (tagged?.dataset.cursor && LABELS[tagged.dataset.cursor]) {
        setLabel(LABELS[tagged.dataset.cursor]);
        setHovering(true);
        return;
      }
      setLabel(null);
      setHovering(Boolean(target?.closest("a, button, [role='button'], summary, label, select, [role='tab'], [role='radio'], [role='checkbox']")));
    };
    const onLeave = () => setVisible(false);
    const onDown = () => setPressed(true);
    const onUp = () => setPressed(false);

    window.addEventListener("pointermove", onMove, { passive: true });
    document.addEventListener("pointerover", onOver, { passive: true });
    root.addEventListener("pointerleave", onLeave);
    window.addEventListener("pointerdown", onDown);
    window.addEventListener("pointerup", onUp);
    return () => {
      delete root.dataset.cursor;
      window.removeEventListener("pointermove", onMove);
      document.removeEventListener("pointerover", onOver);
      root.removeEventListener("pointerleave", onLeave);
      window.removeEventListener("pointerdown", onDown);
      window.removeEventListener("pointerup", onUp);
    };
  }, [x, y]);

  const ringScale = label ? 2.6 : hovering ? 1.55 : 1;

  return (
    <MotionProvider>
      <div
        aria-hidden
        className="pointer-events-none fixed inset-0 z-[180] text-paper mix-blend-difference"
        style={{ opacity: visible ? 1 : 0, transition: "opacity .2s" }}
      >
        <m.div style={{ x, y }} className="absolute top-0 left-0">
          <m.span
            animate={{ scale: label ? 0 : pressed ? 0.6 : 1 }}
            transition={spring.ui}
            className="absolute -top-1 -left-1 block size-2 rounded-full bg-paper"
          />
        </m.div>
        <m.div style={{ x: ringX, y: ringY }} className="absolute top-0 left-0">
          <m.svg
            viewBox="0 0 36 36"
            width={36}
            height={36}
            animate={{ scale: pressed ? ringScale * 0.9 : ringScale, rotate: label ? 45 : 0 }}
            transition={spring.ui}
            className="absolute -top-[18px] -left-[18px]"
            fill="none"
            stroke="currentColor"
            strokeWidth={label ? 0.6 : 1}
          >
            <circle cx="18" cy="18" r="11" />
            <line x1="18" y1="1" x2="18" y2="9" />
            <line x1="18" y1="27" x2="18" y2="35" />
            <line x1="1" y1="18" x2="9" y2="18" />
            <line x1="27" y1="18" x2="35" y2="18" />
          </m.svg>
          {label ? (
            <m.span
              initial={{ opacity: 0, scale: 0.6 }}
              animate={{ opacity: 1, scale: 1 }}
              className="absolute top-0 left-0 -translate-x-1/2 -translate-y-1/2 label-mono whitespace-nowrap text-paper"
            >
              {t(label)}
            </m.span>
          ) : null}
        </m.div>
      </div>
    </MotionProvider>
  );
}
