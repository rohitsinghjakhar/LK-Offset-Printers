import { forwardRef, useId } from "react";
import { cn } from "@/lib/utils";

export const inputClass =
  "block w-full rounded-card border border-ink/20 bg-paper px-4 text-body text-ink placeholder:text-ink-muted/70 transition-[border-color,box-shadow] duration-200 hover:border-ink/40 focus:border-ink focus:outline-none focus-visible:shadow-[0_0_0_3px_rgb(236_0_140/0.25)] aria-[invalid=true]:border-danger disabled:opacity-60";

type FieldProps = {
  label: React.ReactNode;
  hint?: React.ReactNode;
  error?: string;
  optional?: string;
  className?: string;
  children: (props: { id: string; "aria-describedby"?: string; "aria-invalid"?: boolean }) => React.ReactNode;
};

/** Label + control + hint + announced error, wired with ids for assistive tech. */
export function Field({ label, hint, error, optional, className, children }: FieldProps) {
  const id = useId();
  const hintId = hint ? `${id}-hint` : undefined;
  const errorId = error ? `${id}-error` : undefined;
  const describedBy = [hintId, errorId].filter(Boolean).join(" ") || undefined;
  return (
    <div className={cn("flex flex-col gap-1.5", className)}>
      <label htmlFor={id} className="flex items-baseline justify-between gap-2 text-small font-medium text-ink">
        <span>{label}</span>
        {optional ? <span className="label-mono text-ink-muted">{optional}</span> : null}
      </label>
      {children({ id, "aria-describedby": describedBy, "aria-invalid": error ? true : undefined })}
      {hint && !error ? (
        <p id={hintId} className="text-small text-ink-muted">
          {hint}
        </p>
      ) : null}
      {error ? (
        <p id={errorId} role="alert" className="flex items-center gap-1.5 text-small font-medium text-danger">
          <span aria-hidden className="inline-block size-1.5 rotate-45 bg-danger" />
          {error}
        </p>
      ) : null}
    </div>
  );
}

export const Input = forwardRef<HTMLInputElement, React.InputHTMLAttributes<HTMLInputElement>>(function Input({ className, ...props }, ref) {
  return <input ref={ref} className={cn(inputClass, "h-12", className)} {...props} />;
});

export const Textarea = forwardRef<HTMLTextAreaElement, React.TextareaHTMLAttributes<HTMLTextAreaElement>>(function Textarea({ className, ...props }, ref) {
  return <textarea ref={ref} className={cn(inputClass, "min-h-28 py-3", className)} {...props} />;
});

export const NativeSelect = forwardRef<HTMLSelectElement, React.SelectHTMLAttributes<HTMLSelectElement>>(function NativeSelect(
  { className, children, ...props },
  ref,
) {
  return (
    <div className="relative">
      <select ref={ref} className={cn(inputClass, "h-12 appearance-none pr-10", className)} {...props}>
        {children}
      </select>
      <svg
        aria-hidden
        viewBox="0 0 12 12"
        className="pointer-events-none absolute top-1/2 right-4 size-3 -translate-y-1/2 text-ink"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.5"
      >
        <path d="M2 4.5 6 8l4-3.5" />
      </svg>
    </div>
  );
});
