import { Frame, G, Logo, P, Shadow, TextLines, displayFont, monoFont, serifFont, type MockupProps } from "./primitives";

export function Mug({ className, title }: MockupProps) {
  return (
    <Frame className={className} title={title}>
      <Shadow cy={250} rx={120} ry={14} />
      <path d="M262 110 C318 110 318 200 262 200" fill="none" stroke="#DCD6CA" strokeWidth="18" />
      <path d="M262 110 C318 110 318 200 262 200" fill="none" stroke="#FFFFFF" strokeWidth="6" opacity="0.6" />
      <path d="M130 80 L270 80 L270 226 C270 238 250 246 200 246 C150 246 130 238 130 226 Z" fill={G.ceramic} />
      <ellipse cx="200" cy="80" rx="70" ry="13" fill="#E6E1D7" />
      <ellipse cx="200" cy="82" rx="62" ry="10" fill="#4A2A1A" />
      {/* printed wrap */}
      <path d="M148 106 L252 106 L252 204 L148 204 Z" fill={P.paper} />
      <circle cx="184" cy="146" r="26" fill={P.paper2} />
      <circle cx="184" cy="146" r="26" fill={G.dots} />
      <circle cx="184" cy="140" r="9" fill="#CFC6B6" />
      <path d="M168 166 C170 152 198 152 200 166 Z" fill="#CFC6B6" />
      <text x="216" y="140" fontSize="13" fontWeight="800" fill={P.magenta} style={displayFont}>
        Best
      </text>
      <text x="216" y="156" fontSize="13" fill={P.ink} style={serifFont}>
        papa
      </text>
      <rect x="148" y="186" width="104" height="18" fill={P.magenta} />
      <text x="200" y="198" fontSize="7" textAnchor="middle" fill={P.paper} style={monoFont} letterSpacing="1">
        EST. 1972
      </text>
      <path d="M130 80 L270 80 L270 226 C270 238 250 246 200 246 C150 246 130 238 130 226 Z" fill={G.ceramic} opacity="0.25" />
      <rect x="150" y="92" width="10" height="140" rx="5" fill="#FFFFFF" opacity="0.55" />
    </Frame>
  );
}

export function TShirt({ className, title }: MockupProps) {
  return (
    <Frame className={className} title={title}>
      <Shadow cy={274} rx={130} ry={10} />
      <path d="M150 40 C160 56 240 56 250 40 L318 70 L346 128 L300 146 L290 124 L290 262 L110 262 L110 124 L100 146 L54 128 L82 70 Z" fill={P.ink2} />
      <path d="M150 40 C160 56 240 56 250 40 C240 64 160 64 150 40 Z" fill="#050506" />
      <path d="M290 124 L290 262 L260 262 L276 130 Z" fill="rgba(255,255,255,0.05)" />
      <circle cx="176" cy="130" r="34" fill={P.cyan} style={{ mixBlendMode: "screen" }} />
      <circle cx="216" cy="130" r="34" fill={P.magenta} style={{ mixBlendMode: "screen" }} />
      <circle cx="196" cy="162" r="34" fill={P.yellow} style={{ mixBlendMode: "screen" }} />
      <text x="200" y="224" fontSize="16" fontWeight="800" textAnchor="middle" fill={P.paper} style={displayFont} letterSpacing="1.5">
        TEAM ALWAR
      </text>
      <text x="200" y="240" fontSize="8" textAnchor="middle" fill={P.paper} opacity="0.7" style={monoFont} letterSpacing="1.2">
        MARATHON · 2026
      </text>
    </Frame>
  );
}

export function Calendar({ className, title }: MockupProps) {
  return (
    <Frame className={className} title={title}>
      <Shadow cy={250} rx={150} ry={14} />
      <polygon points="92,240 200,90 308,240" fill={G.paperSide} />
      <polygon points="96,236 200,94 304,236" fill={G.paper} stroke={P.line} strokeWidth="0.6" />
      <polygon points="120,236 200,112 280,236" fill={P.paper} />
      <polygon points="120,236 200,112 280,236" fill={G.sheen} opacity="0.4" />
      {Array.from({ length: 13 }, (_, i) => (
        <circle key={i} cx={128 + i * 12} cy="112" r="3" fill="none" stroke={P.ink} strokeWidth="1.2" />
      ))}
      <rect x="120" y="116" width="160" height="120" fill={P.paper} stroke={P.line} strokeWidth="0.6" />
      <rect x="120" y="116" width="160" height="34" fill={P.red} />
      <text x="132" y="139" fontSize="15" fontWeight="800" fill={P.paper} style={displayFont}>
        OCTOBER
      </text>
      <text x="268" y="139" fontSize="9" textAnchor="end" fill={P.paper} style={monoFont}>
        2026
      </text>
      {Array.from({ length: 28 }, (_, i) => (
        <text
          key={i}
          x={134 + (i % 7) * 21}
          y={166 + Math.floor(i / 7) * 17}
          fontSize="8"
          textAnchor="middle"
          fill={i === 19 ? P.red : P.ink}
          fontWeight={i === 19 ? 700 : 400}
          style={monoFont}
        >
          {i + 1}
        </text>
      ))}
      <circle cx="197" cy="215" r="8" fill="none" stroke={P.red} strokeWidth="1" />
    </Frame>
  );
}

export function CorporateDiary({ className, title }: MockupProps) {
  return (
    <Frame className={className} title={title}>
      <Shadow cy={256} rx={150} ry={16} />
      <g transform="translate(200 150) rotate(-8) translate(-86 -108)">
        <rect x="4" y="6" width="172" height="216" rx="8" fill="#241F1A" />
        <rect width="172" height="216" rx="8" fill="#3B2F25" />
        <rect x="6" y="6" width="160" height="204" rx="6" fill="none" stroke="rgba(255,255,255,0.12)" strokeDasharray="3 3" />
        <rect x="150" y="0" width="22" height="216" rx="4" fill="#2C241C" />
        <Logo x={66} y={70} size={40} color={P.foil} />
        <text x="86" y="140" fontSize="12" fontWeight="700" textAnchor="middle" fill={G.foil} style={displayFont} letterSpacing="2">
          NORTHWIND
        </text>
        <text x="86" y="156" fontSize="7" textAnchor="middle" fill={G.foil} style={monoFont} letterSpacing="2">
          2027
        </text>
        <rect width="172" height="216" rx="8" fill={G.sheen} opacity="0.2" />
      </g>
      <rect x="276" y="60" width="8" height="200" rx="2" fill={P.red} transform="rotate(-8 280 160)" />
    </Frame>
  );
}

export function Keychain({ className, title }: MockupProps) {
  return (
    <Frame className={className} title={title}>
      <Shadow cy={262} rx={90} ry={10} />
      <circle cx="200" cy="54" r="26" fill="none" stroke="#A9A49A" strokeWidth="5" />
      <path d="M200 80 L200 100" stroke="#A9A49A" strokeWidth="4" />
      <circle cx="200" cy="104" r="6" fill="none" stroke="#A9A49A" strokeWidth="3" />
      <g transform="translate(200 180) rotate(-6)">
        <rect x="-62" y="-70" width="124" height="140" rx="22" fill="rgba(255,255,255,0.5)" stroke="rgba(14,14,16,0.2)" />
        <rect x="-54" y="-62" width="108" height="124" rx="16" fill={P.magenta} />
        <circle cx="0" cy="-10" r="30" fill={P.paper2} />
        <circle cx="0" cy="-10" r="30" fill={G.dots} />
        <circle cx="0" cy="-16" r="10" fill="#CFC6B6" />
        <path d="M-18 8 C-16 -6 16 -6 18 8 Z" fill="#CFC6B6" />
        <text x="0" y="44" fontSize="13" textAnchor="middle" fill={P.paper} style={serifFont}>
          forever
        </text>
        <rect x="-62" y="-70" width="124" height="140" rx="22" fill={G.sheen} opacity="0.7" />
      </g>
    </Frame>
  );
}

export function PhotoFrame({ className, title, variant = "frame" }: MockupProps & { variant?: "frame" | "cushion" }) {
  if (variant === "cushion") {
    return (
      <Frame className={className} title={title}>
        <Shadow cy={258} rx={140} ry={14} />
        <path d="M84 70 C140 58 260 58 316 70 C330 120 330 180 316 232 C260 244 140 244 84 232 C70 180 70 120 84 70 Z" fill="#F4EFE6" />
        <path d="M104 88 C150 80 250 80 296 88 C306 126 306 176 296 214 C250 222 150 222 104 214 C94 176 94 126 104 88 Z" fill={P.paper2} />
        <path d="M104 88 C150 80 250 80 296 88 C306 126 306 176 296 214 C250 222 150 222 104 214 C94 176 94 126 104 88 Z" fill={G.dots} />
        <circle cx="170" cy="140" r="22" fill="#CFC6B6" />
        <path d="M140 200 C144 170 196 170 200 200 Z" fill="#CFC6B6" />
        <circle cx="236" cy="146" r="20" fill="#C4BAA8" />
        <path d="M208 200 C212 174 260 174 264 200 Z" fill="#C4BAA8" />
        <text x="200" y="112" fontSize="12" textAnchor="middle" fill={P.red} style={serifFont}>
          Happy anniversary
        </text>
        <path d="M84 70 C140 58 260 58 316 70 C330 120 330 180 316 232 C260 244 140 244 84 232 C70 180 70 120 84 70 Z" fill={G.sheen} opacity="0.4" />
      </Frame>
    );
  }
  return (
    <Frame className={className} title={title}>
      <Shadow cy={262} rx={120} ry={12} />
      <g transform="translate(200 150) rotate(-3) translate(-96 -118)">
        <rect x="6" y="8" width="192" height="236" fill="#0A0A0C" />
        <rect width="192" height="236" fill={G.ink} />
        <rect x="16" y="16" width="160" height="204" fill={P.paper} />
        <rect x="26" y="26" width="140" height="160" fill={P.paper2} />
        <rect x="26" y="26" width="140" height="160" fill={G.dots} />
        <circle cx="96" cy="92" r="26" fill="#CFC6B6" />
        <path d="M58 170 C62 130 130 130 134 170 Z" fill="#CFC6B6" />
        <text x="96" y="208" fontSize="11" textAnchor="middle" fill={P.ink} style={serifFont}>
          Class of 2026
        </text>
        <rect width="192" height="236" fill={G.sheen} opacity="0.35" />
      </g>
    </Frame>
  );
}

export function PhotoStack({ className, title, variant = "photos" }: MockupProps & { variant?: "photos" | "copies" | "lamination" }) {
  if (variant === "copies") {
    return (
      <Frame className={className} title={title}>
        <Shadow cy={250} rx={150} ry={16} />
        {[18, 12, 6, 0].map((off, i) => (
          <g key={off} transform={`translate(${120 + off} ${56 + off}) rotate(${-4 + i * 1.5})`}>
            <rect width="160" height="190" fill={i === 3 ? G.paper : "#F2EDE3"} stroke={P.line} strokeWidth="0.6" />
            {i === 3 ? (
              <>
                <text x="14" y="26" fontSize="10" fontWeight="700" fill={P.ink} style={displayFont}>
                  Physics · Chapter 7
                </text>
                <TextLines x={14} y={40} widths={[132, 126, 132, 110, 132, 120, 132, 90, 128, 132, 100]} gap={11} opacity={0.2} />
                <rect x="96" y="112" width="50" height="36" fill="none" stroke={P.ink} strokeWidth="0.8" opacity="0.4" />
              </>
            ) : null}
          </g>
        ))}
      </Frame>
    );
  }
  if (variant === "lamination") {
    return (
      <Frame className={className} title={title}>
        <Shadow cy={258} rx={140} ry={14} />
        <g transform="translate(200 150) rotate(-5) translate(-90 -110)">
          <rect x="-8" y="-8" width="196" height="236" rx="6" fill="rgba(255,255,255,0.45)" stroke="rgba(14,14,16,0.18)" />
          <rect width="180" height="220" fill={G.paper} />
          <text x="90" y="40" fontSize="13" textAnchor="middle" fill={P.ink} style={serifFont}>
            Marksheet
          </text>
          <TextLines x={20} y={60} widths={[140, 120, 140, 100, 140, 130, 90, 140]} gap={14} opacity={0.2} />
          <circle cx="146" cy="186" r="16" fill="none" stroke={P.blue} strokeWidth="1.5" opacity="0.6" />
          <rect x="-8" y="-8" width="196" height="236" rx="6" fill={G.sheen} opacity="0.95" />
        </g>
      </Frame>
    );
  }
  const photos = [
    { x: 150, y: 150, r: -12, sky: "#7BC8E8", land: "#3E8E5B" },
    { x: 200, y: 142, r: 2, sky: "#F5B971", land: "#A0522D" },
    { x: 252, y: 150, r: 12, sky: "#E8A1C4", land: "#6D4C8E" },
  ];
  return (
    <Frame className={className} title={title}>
      <Shadow cy={250} rx={170} ry={16} />
      {photos.map((photo) => (
        <g key={photo.x} transform={`translate(${photo.x} ${photo.y}) rotate(${photo.r}) translate(-72 -54)`}>
          <rect x="3" y="4" width="144" height="108" fill="rgba(14,14,16,0.25)" />
          <rect width="144" height="108" fill={P.white} />
          <rect x="6" y="6" width="132" height="96" fill={photo.sky} />
          <circle cx="104" cy="32" r="12" fill={P.yellow} opacity="0.9" />
          <path d="M6 80 C40 60 70 70 100 56 C120 48 130 54 138 50 L138 102 L6 102 Z" fill={photo.land} />
          <rect width="144" height="108" fill={G.sheen} opacity="0.5" />
        </g>
      ))}
    </Frame>
  );
}
