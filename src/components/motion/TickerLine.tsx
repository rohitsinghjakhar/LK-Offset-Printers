import { cn } from "@/lib/utils";

/**
 * Mono spec line that types itself in (steps() on clip-path) when it scrolls into view.
 * The runtime observes the unclipped wrapper: Chrome counts a target's own clip-path.
 */
export function TickerLine({ children, className, delay = 0 }: { children: string; className?: string; delay?: number }) {
  return (
    <span data-ticker="" className={cn("relative inline-block font-mono", className)}>
      <span className="sr-only">{children}</span>
      <span
        aria-hidden
        className="ticker block overflow-hidden whitespace-nowrap"
        style={{ "--n": children.length, "--delay": `${delay}ms` } as React.CSSProperties}
      >
        {children}
      </span>
    </span>
  );
}
