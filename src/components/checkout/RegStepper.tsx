import { cn } from "@/lib/utils";

type Step = { key: string; label: string };

/**
 * Checkout stepper drawn as registration marks: a step's C/M/Y rings sit misregistered until the
 * step is complete, then snap into a single sharp mark.
 */
export function RegStepper({ steps, current, label }: { steps: Step[]; current: number; label: string }) {
  return (
    <ol aria-label={label} className="grid grid-cols-3 gap-2">
      {steps.map((step, i) => {
        const done = i < current;
        const active = i === current;
        return (
          <li key={step.key} aria-current={active ? "step" : undefined} className="flex min-w-0 items-center gap-2 sm:gap-3">
            <span aria-hidden className="relative grid size-10 shrink-0 place-items-center">
              {[
                { c: "text-cyan", o: "-translate-x-[3px] translate-y-[2px]" },
                { c: "text-magenta", o: "translate-x-[2px] -translate-y-[2px]" },
                { c: "text-yellow", o: "-translate-x-[1px] -translate-y-[3px]" },
              ].map((plate) => (
                <svg
                  key={plate.c}
                  viewBox="0 0 40 40"
                  className={cn(
                    "absolute inset-0 transition-transform duration-500 ease-out",
                    plate.c,
                    done ? "translate-0" : plate.o,
                    !done && !active && "opacity-40",
                  )}
                  style={{ mixBlendMode: "multiply" }}
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                >
                  <circle cx="20" cy="20" r="11" />
                </svg>
              ))}
              <svg
                viewBox="0 0 40 40"
                className={cn("absolute inset-0", active || done ? "text-ink" : "text-ink/30")}
                fill="none"
                stroke="currentColor"
                strokeWidth="1.5"
              >
                <circle cx="20" cy="20" r="11" />
                <line x1="20" y1="2" x2="20" y2="38" />
                <line x1="2" y1="20" x2="38" y2="20" />
                {done ? <circle cx="20" cy="20" r="4" fill="currentColor" stroke="none" /> : null}
              </svg>
            </span>
            <span className="flex flex-col">
              <span className="label-mono text-ink-muted tabular">{String(i + 1).padStart(2, "0")}</span>
              <span className={cn("text-small font-medium", active ? "text-ink" : "text-ink-muted")}>{step.label}</span>
            </span>
          </li>
        );
      })}
    </ol>
  );
}
