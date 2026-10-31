import { RegMark } from "@/components/marks";
import { inkCss } from "@/lib/ink";
import { cn } from "@/lib/utils";
import type { InkColour } from "@/types/catalog";

/** Paper-swatch thumbnail: the category ink with a registration mark, no image weight. */
export function CartThumb({ colour, label, className }: { colour: InkColour; label: string; className?: string }) {
  return (
    <span aria-hidden className={cn("relative block aspect-[3/4] w-16 shrink-0 overflow-hidden bg-paper-2 shadow-paper", className)}>
      <span className="absolute inset-x-0 top-0 h-3/5" style={{ background: inkCss[colour] }} />
      <RegMark size={12} className={cn("absolute top-1.5 left-1.5", colour === "ink" || colour === "blue" ? "text-paper" : "text-ink")} />
      <span className="absolute right-1.5 bottom-1.5 left-1.5 truncate font-mono text-[0.55rem] tracking-wider text-ink uppercase">{label}</span>
    </span>
  );
}
