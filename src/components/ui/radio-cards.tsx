"use client";

import { useId } from "react";
import { cn } from "@/lib/utils";

export type RadioCardOption = { value: string; label: React.ReactNode; hint?: React.ReactNode; icon?: React.ReactNode; disabled?: boolean };

type RadioCardsProps = {
  name: string;
  legend: React.ReactNode;
  options: RadioCardOption[];
  value: string;
  onChange: (value: string) => void;
  columns?: 1 | 2 | 3;
  error?: string;
};

/** Native radio inputs styled as paper cards: arrow keys, labels and form semantics for free. */
export function RadioCards({ name, legend, options, value, onChange, columns = 3, error }: RadioCardsProps) {
  const id = useId();
  return (
    <fieldset aria-describedby={error ? `${id}-err` : undefined}>
      <legend className="mb-3 label-mono text-ink-muted">{legend}</legend>
      <div className={cn("grid gap-3", columns === 3 && "sm:grid-cols-3", columns === 2 && "sm:grid-cols-2")}>
        {options.map((option) => {
          const checked = option.value === value;
          return (
            <label
              key={option.value}
              className={cn(
                "relative flex min-h-11 cursor-pointer gap-3 rounded-card border p-4 transition-[border-color,background-color,box-shadow] duration-200",
                checked ? "border-ink bg-paper shadow-paper" : "border-ink/15 bg-paper/60 hover:border-ink/40",
                option.disabled && "cursor-not-allowed opacity-45",
              )}
            >
              <input
                type="radio"
                name={name}
                value={option.value}
                checked={checked}
                disabled={option.disabled}
                onChange={() => onChange(option.value)}
                className="peer mt-1 size-4 shrink-0 accent-ink focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-magenta"
              />
              <span className="flex flex-col gap-1">
                <span className="flex items-center gap-2 font-medium">
                  {option.icon}
                  {option.label}
                </span>
                {option.hint ? <span className="text-small text-ink-muted">{option.hint}</span> : null}
              </span>
            </label>
          );
        })}
      </div>
      {error ? (
        <p id={`${id}-err`} role="alert" className="mt-2 text-small font-medium text-danger">
          {error}
        </p>
      ) : null}
    </fieldset>
  );
}
