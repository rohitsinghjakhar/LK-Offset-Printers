import { cx } from "@/lib/cx";

type RegMarkProps = {
  className?: string;
  size?: number;
  strokeWidth?: number;
  title?: string;
};

/** Registration target ⊕ — the site's core graphic device. */
export function RegMark({ className, size = 24, strokeWidth = 1.25, title }: RegMarkProps) {
  return (
    <svg
      viewBox="0 0 24 24"
      width={size}
      height={size}
      fill="none"
      stroke="currentColor"
      strokeWidth={strokeWidth}
      className={cx("shrink-0", className)}
      role={title ? "img" : undefined}
      aria-hidden={title ? undefined : true}
      aria-label={title}
    >
      <circle cx="12" cy="12" r="6.5" />
      <circle cx="12" cy="12" r="2.5" fill="currentColor" stroke="none" />
      <line x1="12" y1="0.5" x2="12" y2="23.5" />
      <line x1="0.5" y1="12" x2="23.5" y2="12" />
    </svg>
  );
}
