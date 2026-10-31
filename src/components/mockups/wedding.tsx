import { Frame, G, P, Shadow, serifFont, monoFont, type MockupProps } from "./primitives";

function Paisley({ x, y, s = 1, flip = false }: { x: number; y: number; s?: number; flip?: boolean }) {
  return (
    <g transform={`translate(${x} ${y}) scale(${flip ? -s : s} ${s})`} fill="none" stroke={G.foil} strokeWidth="1.1">
      <path d="M0 0 C14 -18 34 -10 30 8 C26 24 6 26 -2 16 C-8 8 -2 -2 8 0" />
      <circle cx="14" cy="6" r="3" />
    </g>
  );
}

export function WeddingCardWithFoil({ className, title }: MockupProps) {
  return (
    <Frame className={className} title={title}>
      <Shadow cy={258} rx={160} ry={16} />
      {/* envelope behind */}
      <g transform="translate(144 160) rotate(-10) translate(-100 -70)">
        <rect x="3" y="4" width="200" height="140" fill="#6B0F1A" />
        <rect width="200" height="140" fill="#8E1424" />
        <path d="M0 0 L100 70 L200 0" fill="none" stroke="rgba(0,0,0,0.25)" strokeWidth="1.2" />
        <rect x="8" y="8" width="184" height="124" fill="none" stroke={G.foil} strokeWidth="0.8" />
      </g>
      {/* card */}
      <g transform="translate(236 140) rotate(6) translate(-92 -118)">
        <rect x="4" y="5" width="184" height="236" fill={G.paperSide} />
        <rect width="184" height="236" fill="#FBF6EA" stroke={P.line} strokeWidth="0.6" />
        <rect x="10" y="10" width="164" height="216" fill="none" stroke={G.foil} strokeWidth="2.2" />
        <rect x="16" y="16" width="152" height="204" fill="none" stroke={G.foil} strokeWidth="0.7" />
        <path d="M92 30 C72 30 60 46 60 62 C60 80 76 92 92 92 C108 92 124 80 124 62 C124 46 112 30 92 30 Z" fill="none" stroke={G.foil} strokeWidth="1.3" />
        <path d="M92 38 L96 56 L114 62 L96 68 L92 86 L88 68 L70 62 L88 56 Z" fill={G.foil} />
        <Paisley x={34} y={116} s={0.9} />
        <Paisley x={150} y={116} s={0.9} flip />
        <text x="92" y="136" fontSize="15" textAnchor="middle" fill="#7A1020" style={serifFont}>
          शुभ विवाह
        </text>
        <text x="92" y="166" fontSize="22" textAnchor="middle" fill={G.foil} style={serifFont}>
          Riya &amp; Arjun
        </text>
        <rect x="62" y="176" width="60" height="0.8" fill={G.foil} />
        <text x="92" y="194" fontSize="7" textAnchor="middle" fill="#6E5B3A" style={monoFont} letterSpacing="1.4">
          14 · FEB · 2027 · ALWAR
        </text>
        <rect width="184" height="236" fill={G.sheen} opacity="0.5" />
      </g>
    </Frame>
  );
}
