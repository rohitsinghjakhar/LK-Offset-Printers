"use client";

import { useEffect, useRef, useState } from "react";
import { contact as siteConfig } from "@/config/contact";

/**
 * Giant outlined wordmark that fills with CMYK ink left→right when it scrolls into view.
 * SVG textLength makes it span the full container at every width.
 */
export function FooterWordmark({ label }: { label: string }) {
  const ref = useRef<SVGSVGElement>(null);
  const [inked, setInked] = useState(false);

  useEffect(() => {
    const node = ref.current;
    if (!node) return;
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setInked(true);
          observer.disconnect();
        }
      },
      { threshold: 0.3 },
    );
    observer.observe(node);
    return () => observer.disconnect();
  }, []);

  const text = siteConfig.brandName.toUpperCase();
  const common = {
    x: 4,
    y: 118,
    textLength: 992,
    lengthAdjust: "spacingAndGlyphs" as const,
    fontSize: 150,
    fontWeight: 700,
    style: { fontFamily: "var(--font-bricolage), system-ui, sans-serif" },
  };

  return (
    <svg ref={ref} viewBox="0 0 1000 140" role="img" aria-label={label} className="block h-auto w-full select-none">
      <defs>
        <linearGradient id="footer-ink" x1="0" x2="1" y1="0" y2="0">
          <stop offset="0" stopColor="#00AEEF" />
          <stop offset="0.25" stopColor="#00AEEF" />
          <stop offset="0.25" stopColor="#EC008C" />
          <stop offset="0.5" stopColor="#EC008C" />
          <stop offset="0.5" stopColor="#FFE500" />
          <stop offset="0.75" stopColor="#FFE500" />
          <stop offset="0.75" stopColor="#F6F3EC" />
          <stop offset="1" stopColor="#F6F3EC" />
        </linearGradient>
      </defs>
      {/* Stroke under an ink fill hides the variable font's overlapping contours. */}
      <text {...common} fill="#0E0E10" stroke="rgba(246,243,236,0.32)" strokeWidth={3} paintOrder="stroke fill">
        {text}
      </text>
      <text
        {...common}
        fill="url(#footer-ink)"
        style={{
          ...common.style,
          clipPath: inked ? "inset(0 0% 0 0)" : "inset(0 100% 0 0)",
          transition: "clip-path 1.8s cubic-bezier(0.22, 1, 0.36, 1)",
        }}
      >
        {text}
      </text>
    </svg>
  );
}
