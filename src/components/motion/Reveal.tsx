import { cn } from "@/lib/utils";

type RevealProps = {
  children: React.ReactNode;
  className?: string;
  delay?: number;
  y?: number;
  as?: "div" | "section" | "li" | "article" | "span";
};

/**
 * Enter reveal: fade + rise once when in view (driven by ScrollEffects + CSS).
 * Server-renderable, zero client JS per instance; visible without JS.
 */
export function Reveal({ children, className, delay = 0, y = 28, as: Tag = "div" }: RevealProps) {
  return (
    <Tag data-reveal="" className={cn(className)} style={{ "--d": `${delay}s`, "--ry": `${y}px` } as React.CSSProperties}>
      {children}
    </Tag>
  );
}
