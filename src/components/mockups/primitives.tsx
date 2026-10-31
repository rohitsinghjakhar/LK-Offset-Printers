import { cn } from "@/lib/utils";

/** Brand palette as literals — SVG presentation attributes can't read CSS variables. */
export const P = {
  paper: "#F6F3EC",
  paper2: "#ECE6D8",
  white: "#FFFFFF",
  ink: "#0E0E10",
  ink2: "#1B1B20",
  muted: "#5E5A53",
  line: "rgba(14,14,16,0.12)",
  cyan: "#00AEEF",
  magenta: "#EC008C",
  yellow: "#FFE500",
  green: "#00A651",
  red: "#ED1C24",
  blue: "#2E3192",
  kraft: "#C8A97E",
  foil: "#C9A14A",
} as const;

export const G = {
  paper: "url(#bp-paper)",
  paperSide: "url(#bp-paper-side)",
  ink: "url(#bp-ink)",
  foil: "url(#bp-foil)",
  shadow: "url(#bp-shadow)",
  sheen: "url(#bp-sheen)",
  ceramic: "url(#bp-ceramic)",
  roll: "url(#bp-roll)",
  kraft: "url(#bp-kraft)",
  green: "url(#bp-green)",
  magenta: "url(#bp-magenta-g)",
  cyan: "url(#bp-cyan-g)",
  glow: "url(#bp-glow)",
  dots: "url(#bp-dots)",
} as const;

export const displayFont = { fontFamily: "var(--font-display)" } as const;
export const monoFont = { fontFamily: "var(--font-mono)" } as const;
export const serifFont = { fontFamily: "var(--font-serif)", fontStyle: "italic" } as const;

export type MockupProps = {
  className?: string;
  /** Accessible name. Omit when the mockup is decorative next to a visible product name. */
  title?: string;
};

export function Frame({ className, title, children, viewBox = "0 0 400 300" }: MockupProps & { children: React.ReactNode; viewBox?: string }) {
  return (
    <svg
      viewBox={viewBox}
      className={cn("h-auto w-full", className)}
      role={title ? "img" : undefined}
      aria-label={title}
      aria-hidden={title ? undefined : true}
      focusable="false"
    >
      {children}
    </svg>
  );
}

export function Shadow({ cx = 200, cy = 262, rx = 150, ry = 16, opacity = 1 }: { cx?: number; cy?: number; rx?: number; ry?: number; opacity?: number }) {
  return <ellipse cx={cx} cy={cy} rx={rx} ry={ry} fill={G.shadow} opacity={opacity} />;
}

/** Tiny registration target used as the printed logo on mockups. */
export function Logo({ x, y, size = 14, color = P.ink }: { x: number; y: number; size?: number; color?: string }) {
  const r = size / 2;
  return (
    <g transform={`translate(${x} ${y})`} stroke={color} fill="none" strokeWidth={size / 14}>
      <circle cx={r} cy={r} r={r * 0.55} />
      <circle cx={r} cy={r} r={r * 0.2} fill={color} stroke="none" />
      <line x1={r} y1={0} x2={r} y2={size} />
      <line x1={0} y1={r} x2={size} y2={r} />
    </g>
  );
}

/** Grey text lines standing in for body copy on printed items. */
export function TextLines({
  x,
  y,
  widths,
  gap = 7,
  height = 2.4,
  color = P.ink,
  opacity = 0.22,
}: {
  x: number;
  y: number;
  widths: number[];
  gap?: number;
  height?: number;
  color?: string;
  opacity?: number;
}) {
  return (
    <g fill={color} opacity={opacity}>
      {widths.map((w, i) => (
        <rect key={i} x={x} y={y + i * gap} width={w} height={height} rx={height / 2} />
      ))}
    </g>
  );
}

/** One global <defs> sheet shared by every mockup on the page (rendered once in the root layout). */
export function MockupDefs() {
  return (
    <svg width="0" height="0" aria-hidden focusable="false" style={{ position: "absolute", width: 0, height: 0, overflow: "hidden" }}>
      <defs>
        <linearGradient id="bp-paper" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0" stopColor="#FFFFFF" />
          <stop offset="1" stopColor="#EEE8DC" />
        </linearGradient>
        <linearGradient id="bp-paper-side" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0" stopColor="#E4DCCB" />
          <stop offset="1" stopColor="#CDC2AC" />
        </linearGradient>
        <linearGradient id="bp-ink" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0" stopColor="#2C2C33" />
          <stop offset="1" stopColor="#0E0E10" />
        </linearGradient>
        <linearGradient id="bp-foil" x1="0" y1="0" x2="1" y2="0.45">
          <stop offset="0" stopColor="#8A6A1F" />
          <stop offset="0.35" stopColor="#F4D98B" />
          <stop offset="0.55" stopColor="#B8892B" />
          <stop offset="0.7" stopColor="#FFF1C1" />
          <stop offset="1" stopColor="#9C7424" />
        </linearGradient>
        <radialGradient id="bp-shadow" cx="0.5" cy="0.5" r="0.5">
          <stop offset="0" stopColor="#0E0E10" stopOpacity="0.32" />
          <stop offset="0.6" stopColor="#0E0E10" stopOpacity="0.1" />
          <stop offset="1" stopColor="#0E0E10" stopOpacity="0" />
        </radialGradient>
        <linearGradient id="bp-sheen" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0.3" stopColor="#FFFFFF" stopOpacity="0" />
          <stop offset="0.48" stopColor="#FFFFFF" stopOpacity="0.55" />
          <stop offset="0.62" stopColor="#FFFFFF" stopOpacity="0" />
        </linearGradient>
        <linearGradient id="bp-ceramic" x1="0" y1="0" x2="1" y2="0">
          <stop offset="0" stopColor="#B9B2A4" />
          <stop offset="0.28" stopColor="#F4F1EA" />
          <stop offset="0.42" stopColor="#FFFFFF" />
          <stop offset="0.78" stopColor="#E5E0D5" />
          <stop offset="1" stopColor="#ADA597" />
        </linearGradient>
        <linearGradient id="bp-roll" x1="0" y1="0" x2="1" y2="0">
          <stop offset="0" stopColor="#CFC7B6" />
          <stop offset="0.4" stopColor="#FFFFFF" />
          <stop offset="1" stopColor="#D2C9B6" />
        </linearGradient>
        <linearGradient id="bp-kraft" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0" stopColor="#D6B98F" />
          <stop offset="1" stopColor="#B59268" />
        </linearGradient>
        <linearGradient id="bp-green" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0" stopColor="#12BD68" />
          <stop offset="1" stopColor="#00843E" />
        </linearGradient>
        <linearGradient id="bp-magenta-g" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0" stopColor="#FF33AB" />
          <stop offset="1" stopColor="#C4006F" />
        </linearGradient>
        <linearGradient id="bp-cyan-g" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0" stopColor="#45C9FF" />
          <stop offset="1" stopColor="#008FC9" />
        </linearGradient>
        <radialGradient id="bp-glow" cx="0.5" cy="0.5" r="0.6">
          <stop offset="0" stopColor="#FFFFFF" stopOpacity="0.9" />
          <stop offset="1" stopColor="#FFFFFF" stopOpacity="0" />
        </radialGradient>
        <pattern id="bp-dots" width="6" height="6" patternUnits="userSpaceOnUse">
          <circle cx="3" cy="3" r="1.3" fill="#0E0E10" fillOpacity="0.28" />
        </pattern>
      </defs>
    </svg>
  );
}
