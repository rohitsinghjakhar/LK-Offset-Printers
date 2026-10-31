"use client";

import { MotionProvider } from "@/components/motion/MotionProvider";
import { useState } from "react";
import * as m from "motion/react-m";
import { AnimatePresence, useReducedMotion } from "motion/react";
import { duration, ease } from "@/lib/motion";
import { cn } from "@/lib/utils";

export type AccordionItem = { id: string; question: string; answer: string };

type AccordionProps = {
  items: AccordionItem[];
  className?: string;
  tone?: "paper" | "ink";
};

/** Smooth FAQ accordion: button + region pattern, height animated via Motion layout. */
export function Accordion({ items, className, tone = "paper" }: AccordionProps) {
  const [open, setOpen] = useState<string | null>(items[0]?.id ?? null);
  const reduced = useReducedMotion();

  return (
    <MotionProvider>
      <m.ul layout className={cn("divide-y border-y", tone === "ink" ? "divide-line-ink border-line-ink" : "divide-line border-line", className)}>
        {items.map((item, i) => {
          const isOpen = open === item.id;
          const buttonId = `faq-btn-${item.id}`;
          const panelId = `faq-panel-${item.id}`;
          return (
            <m.li layout="position" key={item.id}>
              <h3 className="font-sans text-base font-normal">
                <button
                  id={buttonId}
                  type="button"
                  aria-expanded={isOpen}
                  aria-controls={panelId}
                  onClick={() => setOpen(isOpen ? null : item.id)}
                  className="group flex w-full items-start gap-5 py-6 text-left md:gap-8"
                >
                  <span className="mt-1.5 w-7 shrink-0 label-mono text-ink-muted tabular">{String(i + 1).padStart(2, "0")}</span>
                  <span className="flex-1 font-display text-[1.2rem] leading-snug font-medium md:text-[1.4rem]">{item.question}</span>
                  <span aria-hidden className="relative mt-2 size-4 shrink-0">
                    <span className="absolute top-1/2 left-0 h-px w-4 -translate-y-1/2 bg-current" />
                    <span
                      className={cn(
                        "absolute top-0 left-1/2 h-4 w-px -translate-x-1/2 bg-current transition-transform duration-300 ease-out",
                        isOpen && "scale-y-0",
                      )}
                    />
                  </span>
                </button>
              </h3>
              <AnimatePresence initial={false}>
                {isOpen ? (
                  <m.div
                    id={panelId}
                    role="region"
                    aria-labelledby={buttonId}
                    key="panel"
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: "auto", opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={{ duration: reduced ? 0.15 : duration.ui + 0.1, ease: ease.out }}
                    className="overflow-hidden"
                  >
                    <p className="max-w-[62ch] pb-7 pl-12 text-ink-muted md:pl-15">{item.answer}</p>
                  </m.div>
                ) : null}
              </AnimatePresence>
            </m.li>
          );
        })}
      </m.ul>
    </MotionProvider>
  );
}
