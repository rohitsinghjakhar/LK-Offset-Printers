import type { InkColour } from "@/types/catalog";

/** Background utility per category ink. */
export const inkBg: Record<InkColour, string> = {
  ink: "bg-ink",
  magenta: "bg-magenta",
  cyan: "bg-cyan",
  foil: "bg-foil",
  yellow: "bg-yellow",
  green: "bg-green",
  red: "bg-red",
  blue: "bg-blue",
};

/** Text colour that passes AA on that ink. */
export const inkOn: Record<InkColour, string> = {
  ink: "text-paper",
  magenta: "text-ink",
  cyan: "text-ink",
  foil: "text-ink",
  yellow: "text-ink",
  green: "text-ink",
  red: "text-ink",
  blue: "text-paper",
};

/** CSS background value (foil is a gradient). */
export const inkCss: Record<InkColour, string> = {
  ink: "var(--color-ink)",
  magenta: "var(--color-magenta)",
  cyan: "var(--color-cyan)",
  foil: "var(--foil)",
  yellow: "var(--color-yellow)",
  green: "var(--color-green)",
  red: "var(--color-red)",
  blue: "var(--color-blue)",
};
