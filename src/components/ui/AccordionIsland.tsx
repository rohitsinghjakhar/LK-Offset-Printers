"use client";

import dynamic from "next/dynamic";
import { useNearViewport } from "@/components/motion/useNearViewport";
import { cx } from "@/lib/cx";
import type { AccordionItem } from "./accordion";

const MotionAccordion = dynamic(() => import("./accordion").then((m) => m.Accordion), { ssr: false });

/** Native <details> list (works without JS); upgrades to the Motion accordion near the viewport. */
function DetailsAccordion({ items, className }: { items: AccordionItem[]; className?: string }) {
  return (
    <ul className={cx("divide-y divide-line border-y border-line", className)}>
      {items.map((item, i) => (
        <li key={item.id}>
          <details className="group" open={i === 0}>
            <summary className="flex cursor-pointer list-none items-start gap-5 py-6 md:gap-8 [&::-webkit-details-marker]:hidden">
              <span className="mt-1.5 w-7 shrink-0 label-mono text-ink-muted tabular">{String(i + 1).padStart(2, "0")}</span>
              <h3 className="flex-1 font-display text-[1.2rem] leading-snug font-medium md:text-[1.4rem]">{item.question}</h3>
              <span aria-hidden className="relative mt-2 size-4 shrink-0">
                <span className="absolute top-1/2 left-0 h-px w-4 -translate-y-1/2 bg-current" />
                <span className="absolute top-0 left-1/2 h-4 w-px -translate-x-1/2 bg-current group-open:scale-y-0" />
              </span>
            </summary>
            <p className="max-w-[62ch] pb-7 pl-12 text-ink-muted md:pl-15">{item.answer}</p>
          </details>
        </li>
      ))}
    </ul>
  );
}

export function AccordionIsland({ items, className }: { items: AccordionItem[]; className?: string }) {
  const { ref, near } = useNearViewport<HTMLDivElement>("60% 0px");
  return <div ref={ref}>{near ? <MotionAccordion items={items} className={className} /> : <DetailsAccordion items={items} className={className} />}</div>;
}
