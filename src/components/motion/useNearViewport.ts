"use client";

import { useEffect, useRef, useState } from "react";

/** true once the element comes within `rootMargin` of the viewport — used to lazy-mount heavy islands. */
export function useNearViewport<T extends HTMLElement>(rootMargin = "150% 0px") {
  const ref = useRef<T>(null);
  const [near, setNear] = useState(false);
  useEffect(() => {
    const node = ref.current;
    if (!node) return;
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (!entry.isIntersecting) return;
        setNear(true);
        observer.disconnect();
      },
      { rootMargin },
    );
    observer.observe(node);
    return () => observer.disconnect();
  }, [rootMargin]);
  return { ref, near };
}
