import { Frame, G, Logo, P, Shadow, displayFont, monoFont, serifFont, type MockupProps } from "./primitives";

export function FlexRoll({ className, title }: MockupProps) {
  return (
    <Frame className={className} title={title}>
      <Shadow cy={250} rx={175} ry={16} />
      {/* unrolled banner */}
      <path d="M78 96 L372 84 L372 218 L78 232 Z" fill={G.paper} stroke={P.line} strokeWidth="0.6" />
      <path d="M78 96 L372 84 L372 124 L78 136 Z" fill={P.cyan} />
      <text x="96" y="122" fontSize="21" fontWeight="800" fill={P.paper} style={displayFont} letterSpacing="-0.6" transform="rotate(-2.3 96 122)">
        GRAND OPENING
      </text>
      <text x="96" y="176" fontSize="36" fontWeight="800" fill={P.ink} style={displayFont} letterSpacing="-1.6" transform="rotate(-2.3 96 176)">
        Sunday, 10 AM
      </text>
      <text x="98" y="204" fontSize="13" fill={P.magenta} style={serifFont} transform="rotate(-2.3 98 204)">
        Panchayat Samiti, Kathumar Road, Laxmangarh road, Alwar
      </text>
      <path d="M300 180 L372 177 L372 218 L300 221 Z" fill={P.yellow} />
      {[92, 150, 210, 270, 330].map((x, i) => (
        <circle key={x} cx={x + 4} cy={101 - i * 2.4} r="3.2" fill="#D8D2C6" stroke="#8C877D" strokeWidth="1" />
      ))}
      <path d="M78 96 L372 84 L372 218 L78 232 Z" fill={G.sheen} opacity="0.35" />
      {/* roll */}
      <rect x="40" y="92" width="44" height="146" rx="4" fill={G.roll} />
      <ellipse cx="62" cy="92" rx="22" ry="7" fill="#EDE7DA" stroke={P.line} />
      <ellipse cx="62" cy="92" rx="7" ry="2.4" fill="#6E685E" />
      <ellipse cx="62" cy="238" rx="22" ry="7" fill="#C9C0AE" />
    </Frame>
  );
}

export function Signboard({ className, title, variant = "vinyl" }: MockupProps & { variant?: "vinyl" | "backlit" | "oneway" }) {
  const backlit = variant === "backlit";
  const oneway = variant === "oneway";
  return (
    <Frame className={className} title={title}>
      <Shadow cy={262} rx={160} ry={14} />
      {backlit ? <ellipse cx="200" cy="140" rx="200" ry="110" fill={G.glow} opacity="0.7" /> : null}
      <rect x="44" y="60" width="312" height="170" rx="4" fill={backlit ? P.ink2 : "#D9D2C4"} />
      <rect x="52" y="68" width="296" height="154" fill={backlit ? "#FFFDF4" : G.paper} />
      {oneway ? <rect x="52" y="68" width="296" height="154" fill={G.dots} opacity="0.7" /> : null}
      <rect x="52" y="68" width="112" height="154" fill={oneway ? P.cyan : P.magenta} opacity={oneway ? 0.85 : 1} />
      <Logo x={80} y={110} size={56} color={P.paper} />
      <text x="182" y="130" fontSize="30" fontWeight="800" fill={P.ink} style={displayFont} letterSpacing="-1.2">
        {oneway ? "Open" : "Dr. Mehta"}
      </text>
      <text x="182" y="156" fontSize="14" fill={P.ink} style={serifFont}>
        {oneway ? "all week" : "Dental Clinic"}
      </text>
      <text x="182" y="192" fontSize="8.5" fill={P.muted} style={monoFont} letterSpacing="1">
        {backlit ? "OPEN 10 AM – 9 PM" : "ROOM 04 · FIRST FLOOR"}
      </text>
      <rect x="52" y="68" width="296" height="154" fill={G.sheen} opacity={backlit ? 0.2 : 0.45} />
    </Frame>
  );
}

export function Standee({ className, title }: MockupProps) {
  return (
    <Frame className={className} title={title} viewBox="0 0 300 400">
      <Shadow cx={150} cy={374} rx={110} ry={12} />
      <rect x="147" y="16" width="6" height="340" fill="#9E998F" />
      <rect x="64" y="20" width="172" height="336" fill={G.paper} stroke={P.line} strokeWidth="0.6" />
      <rect x="64" y="20" width="172" height="150" fill={G.ink} />
      <circle cx="120" cy="96" r="46" fill={P.cyan} style={{ mixBlendMode: "screen" }} />
      <circle cx="170" cy="112" r="46" fill={P.magenta} style={{ mixBlendMode: "screen" }} />
      <circle cx="142" cy="140" r="30" fill={P.yellow} style={{ mixBlendMode: "screen" }} />
      <text x="78" y="206" fontSize="24" fontWeight="800" fill={P.ink} style={displayFont} letterSpacing="-1">
        Admissions
      </text>
      <text x="78" y="230" fontSize="16" fill={P.magenta} style={serifFont}>
        now open
      </text>
      {[0, 1, 2].map((i) => (
        <g key={i}>
          <circle cx="84" cy={260 + i * 22} r="4" fill={P.green} />
          <rect x="96" y={257 + i * 22} width={[96, 110, 84][i]} height="5" rx="2.5" fill={P.ink} opacity="0.22" />
        </g>
      ))}
      <Logo x={78} y={326} size={16} />
      <text x="100" y="339" fontSize="10" fontWeight="700" fill={P.ink} style={displayFont}>
        L.K.
      </text>
      <rect x="64" y="20" width="172" height="336" fill={G.sheen} opacity="0.3" />
      <rect x="54" y="352" width="192" height="16" rx="8" fill={G.roll} />
      <rect x="54" y="352" width="192" height="16" rx="8" fill="none" stroke={P.line} />
    </Frame>
  );
}

export function Canvas({ className, title }: MockupProps) {
  return (
    <Frame className={className} title={title}>
      <Shadow cy={262} rx={140} ry={14} />
      <g transform="translate(200 146) rotate(-3) translate(-120 -96)">
        <rect x="8" y="8" width="240" height="192" fill="#6D5A43" />
        <rect width="240" height="192" fill="#F1E3C9" />
        <rect width="240" height="192" fill={G.dots} opacity="0.35" />
        <path d="M0 150 C40 120 70 130 110 110 C150 90 190 120 240 96 L240 192 L0 192 Z" fill="#0D7A6B" />
        <path d="M0 170 C60 150 110 170 160 150 C200 136 220 150 240 144 L240 192 L0 192 Z" fill="#0A4F47" />
        <circle cx="176" cy="54" r="26" fill={P.yellow} opacity="0.85" />
        <path d="M0 150 C40 120 70 130 110 110 C150 90 190 120 240 96" fill="none" stroke="#F4D98B" strokeWidth="1" opacity="0.7" />
        <rect width="240" height="192" fill={G.sheen} opacity="0.2" />
      </g>
    </Frame>
  );
}
