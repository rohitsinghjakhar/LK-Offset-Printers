"use client";

import { forwardRef } from "react";
import { cn } from "@/lib/utils";

type CheckboxProps = Omit<React.InputHTMLAttributes<HTMLInputElement>, "type"> & { label: React.ReactNode };

/** Native checkbox, restyled as a printed tick box. Works with react-hook-form register(). */
export const Checkbox = forwardRef<HTMLInputElement, CheckboxProps>(function Checkbox({ label, className, id, ...props }, ref) {
  return (
    <label htmlFor={id} className={cn("group flex cursor-pointer items-start gap-3 text-small leading-relaxed", className)}>
      <span className="relative mt-0.5 grid size-5 shrink-0 place-items-center">
        <input
          ref={ref}
          id={id}
          type="checkbox"
          className="peer absolute inset-0 size-5 cursor-pointer appearance-none rounded-[3px] border-[1.5px] border-ink bg-paper transition-colors checked:bg-ink focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-magenta aria-[invalid=true]:border-danger"
          {...props}
        />
        <svg
          aria-hidden
          viewBox="0 0 12 12"
          className="pointer-events-none relative size-3 text-paper opacity-0 peer-checked:opacity-100"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
        >
          <path d="M2.5 6.2 5 8.6 9.5 3.4" />
        </svg>
      </span>
      <span>{label}</span>
    </label>
  );
});
