import { cx } from "@/lib/cx";

type ColorBarProps = {
  className?: string;
  /** Include tint steps like a real press colour bar. */
  tints?: boolean;
  vertical?: boolean;
};

const solids = ["bg-cyan", "bg-magenta", "bg-yellow", "bg-ink", "bg-red", "bg-green", "bg-blue"];

/** Press colour control bar. Purely decorative. */
export function ColorBar({ className, tints = false, vertical = false }: ColorBarProps) {
  return (
    <div aria-hidden className={cx("flex", vertical ? "flex-col" : "flex-row", className)}>
      {solids.map((bg) => (
        <span key={bg} className={cx(bg, vertical ? "h-3 w-full" : "h-full w-3")} />
      ))}
      {tints ? [75, 50, 25].map((t) => <span key={t} className={cx("bg-ink", vertical ? "h-3 w-full" : "h-full w-3")} style={{ opacity: t / 100 }} />) : null}
    </div>
  );
}
