"use client";

import { useState } from "react";
import { cx } from "@/lib/cx";

export type GallerySlide = { id: string; node: React.ReactNode; label: string };

/** Product gallery: large stage + thumbnail rail (keyboard: arrow keys move between thumbnails). */
export function ProductGallery({ slides, label }: { slides: GallerySlide[]; label: string }) {
  const [active, setActive] = useState(0);

  const onKey = (event: React.KeyboardEvent, index: number) => {
    if (event.key !== "ArrowRight" && event.key !== "ArrowLeft") return;
    event.preventDefault();
    const next = (index + (event.key === "ArrowRight" ? 1 : -1) + slides.length) % slides.length;
    setActive(next);
    document.getElementById(`gallery-thumb-${next}`)?.focus();
  };

  return (
    <div role="region" aria-roledescription="carousel" aria-label={label} className="flex flex-col gap-3">
      <div className="relative aspect-[4/3] overflow-hidden rounded-card bg-paper-2" aria-live="polite">
        {slides.map((slide, i) => (
          <div
            key={slide.id}
            role="group"
            aria-roledescription="slide"
            aria-label={slide.label}
            aria-hidden={i !== active}
            className={cx(
              "absolute inset-0 transition-[opacity,transform] duration-500 ease-out",
              i === active ? "scale-100 opacity-100" : "pointer-events-none scale-[1.02] opacity-0",
            )}
          >
            {slide.node}
          </div>
        ))}
      </div>
      {slides.length > 1 ? (
        <div role="tablist" aria-label={label} className="grid grid-cols-4 gap-3">
          {slides.map((slide, i) => (
            <button
              key={slide.id}
              id={`gallery-thumb-${i}`}
              type="button"
              role="tab"
              aria-selected={i === active}
              aria-label={slide.label}
              tabIndex={i === active ? 0 : -1}
              onClick={() => setActive(i)}
              onKeyDown={(e) => onKey(e, i)}
              className={cx(
                "relative aspect-[4/3] overflow-hidden rounded-card bg-paper-2 outline-offset-2 transition-shadow",
                i === active ? "ring-2 ring-ink" : "opacity-70 hover:opacity-100",
              )}
            >
              <span className="pointer-events-none absolute inset-0 scale-[0.9] [&_figcaption]:hidden">{slide.node}</span>
            </button>
          ))}
        </div>
      ) : null}
    </div>
  );
}
