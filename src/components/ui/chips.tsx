"use client";

import { useId } from "react";
import * as m from "motion/react-m";
import { cn } from "@/lib/utils";
import { spring } from "@/lib/motion";

export type ChipOption = { value: string; label: React.ReactNode; hint?: React.ReactNode; disabled?: boolean };

type ChipGroupProps = {
  label: React.ReactNode;
  options: ChipOption[];
  value: string[];
  onChange: (value: string[]) => void;
  multiple?: boolean;
  className?: string;
  tone?: "paper" | "ink";
  /** Shared-layout id so the selection pill slides between chips (single select only). */
  layoutId?: string;
  size?: "sm" | "md";
};

/**
 * Tactile chip group. Single-select behaves as a radio group, multi-select as toggle buttons,
 * both fully keyboard accessible (arrow keys move within radio groups).
 */
export function ChipGroup({ label, options, value, onChange, multiple = false, className, tone = "paper", layoutId, size = "md" }: ChipGroupProps) {
  const groupId = useId();
  const onInk = tone === "ink";

  const select = (option: ChipOption) => {
    if (option.disabled) return;
    if (multiple) onChange(value.includes(option.value) ? value.filter((v) => v !== option.value) : [...value, option.value]);
    else onChange([option.value]);
  };

  const onKeyDown = (event: React.KeyboardEvent, index: number) => {
    if (multiple) return;
    const keys = ["ArrowRight", "ArrowDown", "ArrowLeft", "ArrowUp"];
    if (!keys.includes(event.key)) return;
    event.preventDefault();
    const dir = event.key === "ArrowRight" || event.key === "ArrowDown" ? 1 : -1;
    const enabled = options.filter((o) => !o.disabled);
    const current = enabled.findIndex((o) => o.value === options[index].value);
    const next = enabled[(current + dir + enabled.length) % enabled.length];
    select(next);
    const el = document.getElementById(`${groupId}-${next.value}`);
    el?.focus();
  };

  return (
    <fieldset className={cn("min-w-0", className)}>
      <legend className={cn("mb-3 label-mono", onInk ? "text-paper/70" : "text-ink-muted")}>{label}</legend>
      <div role={multiple ? "group" : "radiogroup"} className="flex flex-wrap gap-2">
        {options.map((option, index) => {
          const active = value.includes(option.value);
          const tabbable = multiple || active || (!value.length && index === 0);
          return (
            <button
              key={option.value}
              id={`${groupId}-${option.value}`}
              type="button"
              role={multiple ? undefined : "radio"}
              aria-checked={multiple ? undefined : active}
              aria-pressed={multiple ? active : undefined}
              tabIndex={tabbable ? 0 : -1}
              disabled={option.disabled}
              onClick={() => select(option)}
              onKeyDown={(e) => onKeyDown(e, index)}
              className={cn(
                "relative isolate inline-flex min-h-11 items-center gap-2 rounded-chip border text-left transition-[color,border-color,transform] duration-200 ease-out active:scale-[0.97] disabled:cursor-not-allowed disabled:opacity-40",
                size === "sm" ? "px-3.5 text-small" : "px-4.5 text-[0.95rem]",
                onInk
                  ? active
                    ? "border-paper text-ink"
                    : "border-paper/25 text-paper hover:border-paper/60"
                  : active
                    ? "border-ink text-paper"
                    : "border-ink/20 text-ink hover:border-ink/60",
              )}
            >
              {active ? (
                layoutId && !multiple ? (
                  <m.span
                    layoutId={`${layoutId}-${groupId}`}
                    transition={spring.ui}
                    className={cn("absolute inset-0 -z-10 rounded-chip", onInk ? "bg-paper" : "bg-ink")}
                  />
                ) : (
                  <span className={cn("absolute inset-0 -z-10 rounded-chip", onInk ? "bg-paper" : "bg-ink")} />
                )
              ) : null}
              {multiple ? (
                <span
                  aria-hidden
                  className={cn(
                    "grid size-3.5 place-items-center rounded-[2px] border",
                    active ? (onInk ? "border-ink bg-ink" : "border-paper bg-paper") : "border-current opacity-60",
                  )}
                >
                  {active ? (
                    <svg viewBox="0 0 10 10" className={cn("size-2.5", onInk ? "text-paper" : "text-ink")} fill="none" stroke="currentColor" strokeWidth="1.8">
                      <path d="M2 5.2 4.2 7.4 8 2.8" />
                    </svg>
                  ) : null}
                </span>
              ) : null}
              <span className="flex flex-col leading-tight">
                <span>{option.label}</span>
                {option.hint ? <span className={cn("text-[0.72rem]", active ? "opacity-80" : "opacity-60")}>{option.hint}</span> : null}
              </span>
            </button>
          );
        })}
      </div>
    </fieldset>
  );
}
