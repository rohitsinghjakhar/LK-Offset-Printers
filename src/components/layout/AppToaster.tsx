"use client";

import { useEffect } from "react";
import dynamic from "next/dynamic";
import type { ToasterProps } from "sonner";
import { markToasterMounted, useToasterGate } from "@/lib/notify";

// The wrapper's effect runs after <Toaster>'s own subscription effect, so queued toasts are never lost.
const Toaster = dynamic(
  () =>
    import("sonner").then(({ Toaster: SonnerToaster }) => {
      function SignallingToaster(props: ToasterProps) {
        useEffect(() => markToasterMounted(), []);
        return <SonnerToaster {...props} />;
      }
      return SignallingToaster;
    }),
  { ssr: false },
);

/** Toasts styled as paper slips (see .paper-toast in globals.css). Loaded on first notify(). */
export function AppToaster() {
  const requested = useToasterGate((s) => s.requested);
  if (!requested) return null;
  return <Toaster position="bottom-center" offset={88} mobileOffset={80} toastOptions={{ className: "paper-toast", duration: 5000 }} />;
}
