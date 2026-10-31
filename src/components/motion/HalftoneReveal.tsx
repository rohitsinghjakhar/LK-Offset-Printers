import { cn } from "@/lib/utils";

type HalftoneRevealProps = {
  children: React.ReactNode;
  className?: string;
  delay?: number;
};

/**
 * Content appears as growing halftone dots: --dot animates 0px → 11px on a 14px grid
 * (CSS @property, see globals.css), then the mask is removed. Triggered by ScrollEffects.
 */
export function HalftoneReveal({ children, className, delay = 0 }: HalftoneRevealProps) {
  return (
    <div data-halftone="" data-delay={delay} className={cn("halftone-reveal", className)}>
      {children}
    </div>
  );
}
