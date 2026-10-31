"use client";

import { createContext, useContext, useEffect, useRef } from "react";
import type Lenis from "lenis";
import { useDeviceTier, useIsDesktop } from "@/lib/device";

type LenisRef = React.RefObject<Lenis | null>;

const LenisContext = createContext<LenisRef>({ current: null });

export function useLenis(): LenisRef {
  return useContext(LenisContext);
}

/** Scrolls to a position through Lenis when it's running, natively otherwise. */
export function scrollToTop(lenis: Lenis | null) {
  if (lenis) lenis.scrollTo(0, { immediate: true, force: true });
  else window.scrollTo({ top: 0, behavior: "instant" as ScrollBehavior });
}

/**
 * Lenis smooth scrolling on high-tier desktops only, driven by the GSAP ticker so
 * ScrollTrigger pins stay in sync. Both libraries are dynamic imports — never in the initial bundle.
 */
export function SmoothScrollProvider({ children }: { children: React.ReactNode }) {
  const tier = useDeviceTier();
  const desktop = useIsDesktop();
  const lenisRef = useRef<Lenis | null>(null);

  useEffect(() => {
    if (tier !== "high" || !desktop) return;
    let cancelled = false;
    let teardown = () => {};

    (async () => {
      const [{ default: LenisClass }, { gsap }, { ScrollTrigger }] = await Promise.all([import("lenis"), import("gsap"), import("gsap/ScrollTrigger")]);
      if (cancelled) return;
      gsap.registerPlugin(ScrollTrigger);
      const lenis = new LenisClass({
        lerp: 0.1,
        autoRaf: false,
        prevent: (node) => Boolean(node.closest("[data-lenis-prevent], [role='dialog'], [data-vaul-drawer]")),
      });
      lenisRef.current = lenis;
      lenis.on("scroll", ScrollTrigger.update);
      const tick = (time: number) => lenis.raf(time * 1000);
      gsap.ticker.add(tick);
      gsap.ticker.lagSmoothing(0);
      document.documentElement.dataset.lenis = "on";
      teardown = () => {
        gsap.ticker.remove(tick);
        lenis.destroy();
        lenisRef.current = null;
        delete document.documentElement.dataset.lenis;
      };
    })();

    return () => {
      cancelled = true;
      teardown();
    };
  }, [tier, desktop]);

  return <LenisContext.Provider value={lenisRef}>{children}</LenisContext.Provider>;
}
