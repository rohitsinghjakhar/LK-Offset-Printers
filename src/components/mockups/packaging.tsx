import { Frame, G, Logo, P, Shadow, displayFont, monoFont, serifFont, type MockupProps } from "./primitives";

export function LabelRoll({ className, title }: MockupProps) {
  const labels = [150, 208, 266, 324];
  return (
    <Frame className={className} title={title}>
      <Shadow cy={250} rx={170} ry={16} />
      {/* strip unrolling to the right */}
      <path d="M120 176 L380 176 L380 234 L120 234 Z" fill="#EDE7DA" stroke={P.line} strokeWidth="0.6" />
      {labels.map((x, i) => (
        <g key={x}>
          <circle cx={x} cy="205" r="24" fill={i % 2 ? P.yellow : P.ink} />
          <circle cx={x} cy="205" r="24" fill={G.sheen} opacity="0.5" />
          <Logo x={x - 8} y={190} size={16} color={i % 2 ? P.ink : P.yellow} />
          <text x={x} y="222" fontSize="5.5" textAnchor="middle" fill={i % 2 ? P.ink : P.yellow} style={monoFont} letterSpacing="0.6">
            PURE GHEE
          </text>
        </g>
      ))}
      {/* roll */}
      <circle cx="120" cy="150" r="84" fill="#E9E2D3" />
      <circle cx="120" cy="150" r="84" fill="none" stroke={P.line} />
      {[74, 64, 54].map((r) => (
        <circle key={r} cx="120" cy="150" r={r} fill="none" stroke="rgba(14,14,16,0.08)" />
      ))}
      <circle cx="120" cy="150" r="42" fill="#B39A76" />
      <circle cx="120" cy="150" r="30" fill={P.paper} />
      <path d="M120 66 A84 84 0 0 1 204 150" fill="none" stroke={P.yellow} strokeWidth="10" opacity="0.9" />
      <circle cx="120" cy="150" r="84" fill={G.sheen} opacity="0.3" />
    </Frame>
  );
}

export function Carton({ className, title }: MockupProps) {
  return (
    <Frame className={className} title={title}>
      <Shadow cy={258} rx={150} ry={16} />
      <polygon points="120,90 220,60 300,92 200,124" fill="#FBF8F1" stroke={P.line} strokeWidth="0.6" />
      <polygon points="120,90 200,124 200,250 120,214" fill={G.paper} stroke={P.line} strokeWidth="0.6" />
      <polygon points="200,124 300,92 300,218 200,250" fill={P.magenta} />
      <polygon points="200,124 300,92 300,218 200,250" fill={G.sheen} opacity="0.35" />
      <text x="214" y="170" fontSize="18" fontWeight="800" fill={P.paper} style={displayFont} transform="skewY(-17.7) translate(0 66)">
        GLOW
      </text>
      <text x="214" y="190" fontSize="10" fill={P.paper} style={serifFont} transform="skewY(-17.7) translate(0 66)">
        face serum
      </text>
      <g transform="skewY(24) translate(0 -68)">
        <Logo x={134} y={150} size={18} />
        <rect x="134" y="180" width="50" height="4" rx="2" fill={P.ink} opacity="0.2" />
        <rect x="134" y="190" width="38" height="4" rx="2" fill={P.ink} opacity="0.2" />
      </g>
    </Frame>
  );
}

export function SweetBox({ className, title }: MockupProps) {
  return (
    <Frame className={className} title={title}>
      <Shadow cy={250} rx={165} ry={18} />
      <polygon points="60,150 220,110 344,142 184,184" fill="#8F1120" />
      <polygon points="60,150 184,184 184,232 60,196" fill="#6E0C18" />
      <polygon points="184,184 344,142 344,190 184,232" fill="#A3162A" />
      {/* lid top */}
      <polygon points="60,140 220,100 344,132 184,174" fill="#C21A30" />
      <polygon points="120,136 220,111 290,129 190,155" fill="#FFF4DF" opacity="0.9" />
      <polygon points="120,136 220,111 290,129 190,155" fill={G.dots} opacity="0.4" />
      {[0, 1, 2].map((i) => (
        <ellipse key={i} cx={168 + i * 34} cy={134 - i * 6} rx="13" ry="6" fill="#E8A33B" />
      ))}
      <polygon points="60,140 220,100 344,132 184,174" fill="none" stroke={G.foil} strokeWidth="2" />
      <text x="96" y="210" fontSize="13" fill={G.foil} style={serifFont} transform="skewY(15) translate(0 -26)">
        Shree Mithai
      </text>
      <polygon points="184,184 344,142 344,190 184,232" fill={G.sheen} opacity="0.25" />
    </Frame>
  );
}

export function PaperBag({ className, title }: MockupProps) {
  return (
    <Frame className={className} title={title}>
      <Shadow cy={262} rx={130} ry={14} />
      <path d="M160 100 C160 50 240 50 240 100" fill="none" stroke="#8C6B45" strokeWidth="6" />
      <path d="M176 100 C176 64 224 64 224 100" fill="none" stroke="#A7835A" strokeWidth="4" />
      <polygon points="120,96 280,96 290,256 110,256" fill={G.kraft} />
      <polygon points="280,96 316,108 322,250 290,256" fill="#A6845C" />
      <polygon points="120,96 280,96 290,256 110,256" fill={G.sheen} opacity="0.25" />
      <Logo x={184} y={140} size={32} color={P.ink} />
      <text x="200" y="198" fontSize="18" fontWeight="800" textAnchor="middle" fill={P.ink} style={displayFont} letterSpacing="-0.6">
        Kavya
      </text>
      <text x="200" y="214" fontSize="10" textAnchor="middle" fill={P.ink} style={serifFont}>
        boutique · alwar
      </text>
    </Frame>
  );
}

export function HangTag({ className, title }: MockupProps) {
  return (
    <Frame className={className} title={title}>
      <Shadow cy={262} rx={100} ry={12} />
      <path d="M200 10 C180 40 210 60 196 82" fill="none" stroke="#B89A6A" strokeWidth="1.6" />
      <g transform="translate(200 160) rotate(8) translate(-58 -92)">
        <path d="M18 0 L98 0 L116 18 L116 184 L0 184 L0 18 Z" fill={G.kraft} />
        <circle cx="58" cy="16" r="6" fill={P.paper} stroke="#8C6B45" strokeWidth="1" />
        <Logo x={42} y={46} size={32} />
        <text x="58" y="108" fontSize="15" fontWeight="800" textAnchor="middle" fill={P.ink} style={displayFont}>
          HANDLOOM
        </text>
        <text x="58" y="124" fontSize="9" textAnchor="middle" fill={P.ink} style={serifFont}>
          made in Rajasthan
        </text>
        <rect x="20" y="146" width="76" height="0.8" fill={P.ink} opacity="0.4" />
        <text x="58" y="164" fontSize="8" textAnchor="middle" fill={P.ink} style={monoFont}>
          SIZE M · ₹1,499
        </text>
        <path d="M18 0 L98 0 L116 18 L116 184 L0 184 L0 18 Z" fill={G.sheen} opacity="0.3" />
      </g>
    </Frame>
  );
}
