import { cx } from "@/lib/cx";
import { RegMark } from "./RegMark";

type SlugLineProps = {
  children: React.ReactNode;
  className?: string;
  /** Show the tiny registration mark before the text. */
  mark?: boolean;
  as?: "p" | "span" | "div";
};

/** Monospace printer's slug line, e.g. "CATALOG · 350 GSM · 4/4 CMYK". Decorative context. */
export function SlugLine({ children, className, mark = true, as: Tag = "p" }: SlugLineProps) {
  return (
    <Tag className={cx("flex items-center gap-2 label-mono", className)}>
      {mark ? <RegMark size={12} strokeWidth={1.4} /> : null}
      <span>{children}</span>
    </Tag>
  );
}
