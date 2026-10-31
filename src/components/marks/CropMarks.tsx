import { cx } from "@/lib/cx";

type CropMarksProps = {
  className?: string;
  /** Distance of the marks from the container edge. */
  inset?: number | string;
  size?: number;
};

const corners = [
  { key: "tl", style: { top: 0, left: 0 }, path: "M0 10 H7 M10 0 V7" },
  { key: "tr", style: { top: 0, right: 0 }, path: "M24 10 H17 M14 0 V7" },
  { key: "bl", style: { bottom: 0, left: 0 }, path: "M0 14 H7 M10 24 V17" },
  { key: "br", style: { bottom: 0, right: 0 }, path: "M24 14 H17 M14 24 V17" },
] as const;

/** Printer's crop marks drawn just outside each corner of the parent (parent must be positioned). */
export function CropMarks({ className, inset = 12, size = 24 }: CropMarksProps) {
  const offset = typeof inset === "number" ? `${inset}px` : inset;
  return (
    <div aria-hidden className={cx("pointer-events-none absolute", className)} style={{ inset: offset }}>
      {corners.map((corner) => (
        <svg
          key={corner.key}
          viewBox="0 0 24 24"
          width={size}
          height={size}
          className="absolute"
          style={corner.style}
          fill="none"
          stroke="currentColor"
          strokeWidth={1}
        >
          <path d={corner.path} />
        </svg>
      ))}
    </div>
  );
}
