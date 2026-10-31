"use client";

import { useEffect } from "react";

/**
 * One tiny runtime for every first-view effect, so the home page's initial JavaScript stays small.
 * Server components mark elements with data attributes; CSS does the animating:
 *
 *   data-reveal     fade + rise once when 30% visible            (--d = delay)
 *   data-split      split-line headline: words get --line, then rise inside overflow masks
 *   data-count      count 0 → value once   (data-count="50000" data-decimals data-prefix data-suffix)
 *   data-halftone   halftone dot reveal, mask removed when done
 *   data-ticker     mono spec line types in via clip-path steps
 *   data-inview     generic data-state="in" hook (ripple fields etc.)
 *
 * Reduced motion: no movement — reveals become plain fades (CSS), counters still count, and
 * halftone masks are skipped.
 */
const SELECTOR = "[data-reveal],[data-split],[data-count],[data-halftone],[data-ticker],[data-inview]";

function formatCount(value: number, decimals: number) {
  return new Intl.NumberFormat("en-IN", { minimumFractionDigits: decimals, maximumFractionDigits: decimals }).format(value);
}

function countUp(el: HTMLElement) {
  const target = Number(el.dataset.count);
  const decimals = Number(el.dataset.decimals ?? 0);
  const prefix = el.dataset.prefix ?? "";
  const suffix = el.dataset.suffix ?? "";
  const delay = Number(el.dataset.delay ?? 0) * 1000;
  const duration = Number(el.dataset.duration ?? 1.6) * 1000;
  if (!Number.isFinite(target)) return;
  const render = (v: number) => {
    el.textContent = `${prefix}${formatCount(v, decimals)}${suffix}`;
  };
  render(0);
  const start = performance.now() + delay;
  const tick = (now: number) => {
    const t = Math.min(1, Math.max(0, (now - start) / duration));
    // ease.out ≈ cubic-bezier(0.22, 1, 0.36, 1)
    render(target * (1 - Math.pow(1 - t, 4)));
    if (t < 1) requestAnimationFrame(tick);
  };
  requestAnimationFrame(tick);
}

function assignLines(el: HTMLElement) {
  const words = Array.from(el.querySelectorAll<HTMLElement>("[data-word]"));
  let line = -1;
  let lastTop = Number.NEGATIVE_INFINITY;
  for (const word of words) {
    const top = word.offsetTop;
    if (top > lastTop + 4) {
      line += 1;
      lastTop = top;
    }
    word.style.setProperty("--line", String(line));
  }
}

function activate(el: HTMLElement, reduced: boolean) {
  if (el.hasAttribute("data-split")) assignLines(el);
  if (el.hasAttribute("data-count")) countUp(el);
  if (el.hasAttribute("data-halftone")) {
    if (reduced) {
      el.dataset.state = "done";
      return;
    }
    const delay = Number(el.dataset.delay ?? 0) * 1000;
    window.setTimeout(() => {
      el.dataset.state = "in";
      window.setTimeout(() => (el.dataset.state = "done"), 950);
    }, delay);
    return;
  }
  el.dataset.state = "in";
}

export function ScrollEffects() {
  useEffect(() => {
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const root = document.documentElement;
    root.classList.add("js");
    root.dataset.fx = "on";

    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          // Reveal on entry, and also anything already scrolled past (e.g. a fast scroll before hydration),
          // so nothing above the viewport is left hidden.
          if (!entry.isIntersecting && entry.boundingClientRect.bottom > 0) continue;
          observer.unobserve(entry.target);
          activate(entry.target as HTMLElement, reduced);
        }
      },
      { threshold: 0.2, rootMargin: "0px 0px -8% 0px" },
    );

    // Tracked per effect run (not on the DOM) so a remount — e.g. React StrictMode — re-observes pending elements.
    const bound = new WeakSet<Element>();
    const scan = (scope: ParentNode) => {
      scope.querySelectorAll<HTMLElement>(SELECTOR).forEach((el) => {
        if (bound.has(el) || el.dataset.state) return;
        bound.add(el);
        if (el.hasAttribute("data-halftone") && !CSS.supports("mask-image", "radial-gradient(#000, transparent)")) {
          el.dataset.state = "done";
          return;
        }
        observer.observe(el);
      });
    };

    scan(document);
    // Route changes and lazily mounted islands add new marked elements.
    const mutations = new MutationObserver((records) => {
      for (const record of records) {
        record.addedNodes.forEach((node) => {
          if (node instanceof HTMLElement) {
            if (node.matches(SELECTOR)) scan(node.parentElement ?? document);
            else scan(node);
          }
        });
      }
    });
    mutations.observe(document.body, { childList: true, subtree: true });

    return () => {
      observer.disconnect();
      mutations.disconnect();
    };
  }, []);

  return null;
}
