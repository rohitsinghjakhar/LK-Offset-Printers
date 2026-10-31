"use client";

import type * as Sonner from "sonner";
import { create } from "zustand";

type NotifyOptions = { action?: { label: string; onClick: () => void }; duration?: number };

/** Flips to true on the first toast so <AppToaster> can load sonner lazily. */
export const useToasterGate = create<{ requested: boolean }>(() => ({ requested: false }));

let sonner: Promise<typeof Sonner> | null = null;
let mounted: Promise<void> | null = null;
let resolveMounted: (() => void) | null = null;

/** Called by AppToaster once <Toaster> has subscribed. */
export function markToasterMounted() {
  resolveMounted?.();
}

/** Paper-slip toast. sonner (≈25 KB) only downloads the first time something is announced. */
export function notify(message: string, options?: NotifyOptions) {
  sonner ??= import("sonner");
  mounted ??= new Promise<void>((resolve) => {
    resolveMounted = resolve;
  });
  useToasterGate.setState({ requested: true });
  void Promise.all([sonner, mounted]).then(([{ toast }]) => toast(message, options));
}
