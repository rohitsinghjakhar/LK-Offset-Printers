"use client";

import { useSyncExternalStore } from "react";

export type DeviceTier = "high" | "low";

type NavigatorWithMemory = Navigator & { deviceMemory?: number };

function subscribeMedia(query: string) {
  return (callback: () => void) => {
    const mql = window.matchMedia(query);
    mql.addEventListener("change", callback);
    return () => mql.removeEventListener("change", callback);
  };
}

const REDUCED = "(prefers-reduced-motion: reduce)";
const FINE = "(pointer: fine)";
const DESKTOP = "(min-width: 1024px)";

const subscribeTier = (callback: () => void) => {
  const a = subscribeMedia(REDUCED)(callback);
  const b = subscribeMedia(FINE)(callback);
  return () => {
    a();
    b();
  };
};

export function computeTier(): DeviceTier {
  if (typeof window === "undefined") return "low";
  const nav = navigator as NavigatorWithMemory;
  const fine = window.matchMedia(FINE).matches;
  const cores = nav.hardwareConcurrency ?? 4;
  const memory = nav.deviceMemory;
  const reduced = window.matchMedia(REDUCED).matches;
  return fine && cores >= 6 && (memory === undefined || memory >= 4) && !reduced ? "high" : "low";
}

/** "high" only for fine pointer + ≥6 cores + ≥4 GB (or unknown) + no reduced motion. SSR renders "low". */
export function useDeviceTier(): DeviceTier {
  return useSyncExternalStore(subscribeTier, computeTier, () => "low");
}

export function useReducedMotionPref(): boolean {
  return useSyncExternalStore(
    subscribeMedia(REDUCED),
    () => window.matchMedia(REDUCED).matches,
    () => false,
  );
}

export function useIsDesktop(): boolean {
  return useSyncExternalStore(
    subscribeMedia(DESKTOP),
    () => window.matchMedia(DESKTOP).matches,
    () => false,
  );
}

export function useMediaQuery(query: string, serverValue = false): boolean {
  return useSyncExternalStore(
    subscribeMedia(query),
    () => window.matchMedia(query).matches,
    () => serverValue,
  );
}
