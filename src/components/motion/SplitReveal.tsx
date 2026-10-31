import { Fragment } from "react";
import { cn } from "@/lib/utils";

export type Segment = { text: string; className?: string };

type SplitRevealProps = {
  segments: Segment[];
  as?: "h1" | "h2" | "h3" | "p";
  className?: string;
  id?: string;
  delay?: number;
};

type Word = { text: string; className?: string; key: string; glue: boolean };

const PUNCTUATION = /^[.,!?।:;)]/;

/** Split into words. A segment starting with punctuation (e.g. ".") glues to the previous word. */
function toWords(segments: Segment[]): Word[] {
  const words: Word[] = [];
  segments.forEach((segment, s) => {
    segment.text
      .split(/\s+/)
      .filter(Boolean)
      .forEach((text, w) => words.push({ text, className: segment.className, key: `${s}-${w}`, glue: s > 0 && w === 0 && PUNCTUATION.test(text) }));
  });
  return words;
}

export function segmentsToText(segments: Segment[]): string {
  return segments
    .map((s) => s.text.trim())
    .filter(Boolean)
    .join(" ")
    .replace(/\s+([.,!?।:;)])/g, "$1");
}

/**
 * Lines rise from y:110% inside overflow masks, staggered 0.06s per line. ScrollEffects measures
 * which line each word landed on (so wrapping is right at any width and in Devanagari) and sets --line.
 * The sentence stays readable to assistive tech through aria-label.
 */
export function SplitReveal({ segments, as: Tag = "h2", className, id, delay = 0 }: SplitRevealProps) {
  const words = toWords(segments);
  return (
    <Tag id={id} aria-label={segmentsToText(segments)} data-split="" className={className} style={{ "--d": `${delay}s` } as React.CSSProperties}>
      {words.map((word, i) => (
        <Fragment key={word.key}>
          <span aria-hidden data-word="" className="-my-[0.14em] inline-block overflow-hidden py-[0.14em] align-bottom">
            <span className={cn(word.className)}>{word.text}</span>
          </span>
          {i < words.length - 1 && !words[i + 1].glue ? " " : null}
        </Fragment>
      ))}
    </Tag>
  );
}
