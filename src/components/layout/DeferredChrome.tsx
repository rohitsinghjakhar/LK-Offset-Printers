"use client";

import { useEffect, useState } from "react";
import dynamic from "next/dynamic";

// Non-critical chrome loads after the page is interactive: the consent banner after idle,
// the custom cursor only on high-tier devices.
const ConsentBanner = dynamic(() => import("./ConsentBanner").then((m) => m.ConsentBanner), { ssr: false });

export function DeferredChrome() {
  const [ready, setReady] = useState(false);

  useEffect(() => {
    const start = () => {
      setReady(true);
    };
    if (typeof window.requestIdleCallback === "function") {
      const id = window.requestIdleCallback(start, { timeout: 2500 });
      return () => window.cancelIdleCallback(id);
    }
    const id = globalThis.setTimeout(start, 1200);
    return () => globalThis.clearTimeout(id);
  }, []);

  if (!ready) return null;
  return (
    <>
      <ConsentBanner />
    </>
  );
}
