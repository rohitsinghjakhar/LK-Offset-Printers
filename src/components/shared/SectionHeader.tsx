import { SlugLine } from "@/components/marks";
import { SplitReveal } from "@/components/motion/SplitReveal";
import { cn } from "@/lib/utils";

type SectionHeaderProps = {
  slug: string;
  title: string;
  accent?: string;
  after?: string;
  sub?: string;
  id?: string;
  as?: "h1" | "h2";
  tone?: "paper" | "ink";
  className?: string;
  align?: "left" | "center";
  size?: "h1" | "h2" | "display";
  children?: React.ReactNode;
};

/** Slug line + split-reveal headline with a 1–3 word Instrument Serif accent + optional lead. */
export function SectionHeader({
  slug,
  title,
  accent,
  after,
  sub,
  id,
  as = "h2",
  tone = "paper",
  className,
  align = "left",
  size = "h2",
  children,
}: SectionHeaderProps) {
  const onInk = tone === "ink";
  return (
    <div className={cn("flex flex-col", align === "center" && "items-center text-center", className)}>
      <SlugLine className={onInk ? "text-paper/70" : "text-ink/70"}>{slug}</SlugLine>
      <SplitReveal
        as={as}
        id={id}
        className={cn(
          "mt-5 font-semibold",
          size === "display" ? "text-display" : size === "h1" ? "text-h1" : "text-h2",
          align === "center" ? "max-w-[18ch]" : "max-w-[20ch]",
        )}
        segments={[
          { text: title },
          ...(accent ? [{ text: accent, className: cn("serif-accent", onInk ? "text-paper" : "text-ink") }] : []),
          ...(after ? [{ text: after }] : []),
        ]}
      />
      {sub ? <p className={cn("mt-5 max-w-[56ch] text-lead", onInk ? "text-paper/75" : "text-ink-muted")}>{sub}</p> : null}
      {children}
    </div>
  );
}
