"use client";

import { useSyncExternalStore } from "react";

const noop = () => () => {};

/** false during SSR and hydration, true afterwards — for values that only exist in the browser. */
export function useHydrated(): boolean {
  return useSyncExternalStore(
    noop,
    () => true,
    () => false,
  );
}
