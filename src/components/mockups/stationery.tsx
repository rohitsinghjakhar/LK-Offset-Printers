import { Frame, G, Logo, P, Shadow, TextLines, displayFont, monoFont, type MockupProps } from "./primitives";

function Card({ x, y, rotate, face }: { x: number; y: number; rotate: number; face: "front" | "back" | "plain" }) {
  return (
    <g transform={`translate(${x} ${y}) rotate(${rotate}) translate(-105 -60)`}>
      <rect x="2.5" y="3.5" width="210" height="120" rx="2" fill={face === "back" ? "#050506" : G.paperSide} />
      <rect width="210" height="120" rx="2" fill={face === "back" ? G.ink : G.paper} stroke={P.line} strokeWidth="0.6" />
      {face === "front" ? (
        <>
          <rect x="0" y="0" width="7" height="120" fill={P.magenta} />
          <Logo x={22} y={20} size={18} />
          <text x="46" y="34" fontSize="15" fontWeight="700" fill={P.ink} style={displayFont} letterSpacing="-0.4">
            L.K.
          </text>
          <text x="22" y="82" fontSize="10.5" fontWeight="600" fill={P.ink} style={displayFont}>
            Rohit Sharma
          </text>
          <text x="22" y="95" fontSize="6.5" fill={P.muted} style={monoFont} letterSpacing="0.6">
            PROPRIETOR · ALWAR
          </text>
          <TextLines x={130} y={78} widths={[58, 48, 54]} gap={7} />
        </>
      ) : null}
      {face === "back" ? (
        <>
          <Logo x={90} y={38} size={30} color={P.foil} />
          <rect x="72" y="80" width="66" height="4" rx="2" fill={G.foil} />
        </>
      ) : null}
      <rect width="210" height="120" rx="2" fill={G.sheen} opacity="0.55" />
    </g>
  );
}

export function BusinessCardStack({ className, title }: MockupProps) {
  return (
    <Frame className={className} title={title}>
      <Shadow cy={248} rx={150} ry={18} />
      <Card x={188} y={150} rotate={-14} face="back" />
      <Card x={200} y={146} rotate={-4} face="plain" />
      <Card x={214} y={140} rotate={7} face="front" />
    </Frame>
  );
}

export function Letterhead({ className, title }: MockupProps) {
  return (
    <Frame className={className} title={title}>
      <Shadow cy={268} rx={120} ry={14} />
      <g transform="translate(200 146) rotate(-5) translate(-88 -122)">
        <rect x="6" y="6" width="176" height="244" fill={G.paperSide} />
        <rect width="176" height="244" fill={G.paper} stroke={P.line} strokeWidth="0.6" />
        <Logo x={16} y={16} size={16} />
        <text x="37" y="28" fontSize="12" fontWeight="700" style={displayFont} fill={P.ink}>
          L.K.
        </text>
        <rect x="16" y="42" width="144" height="1" fill={P.magenta} />
        <TextLines x={16} y={60} widths={[60, 44]} gap={8} />
        <TextLines x={16} y={92} widths={[144, 138, 144, 120, 144, 132, 90]} gap={9} opacity={0.14} />
        <TextLines x={16} y={170} widths={[144, 128, 140, 70]} gap={9} opacity={0.14} />
        <rect x="0" y="228" width="176" height="16" fill={P.ink} />
        <rect x="0" y="228" width="44" height="16" fill={P.cyan} />
        <rect x="44" y="228" width="44" height="16" fill={P.magenta} />
        <rect x="88" y="228" width="44" height="16" fill={P.yellow} />
      </g>
    </Frame>
  );
}

export function Envelope({ className, title, variant = "dl" }: MockupProps & { variant?: "dl" | "shagun" }) {
  const shagun = variant === "shagun";
  const body = shagun ? P.red : G.paper;
  return (
    <Frame className={className} title={title}>
      <Shadow cy={236} rx={150} ry={16} />
      <g transform="translate(200 150) rotate(-6) translate(-130 -62)">
        <rect x="4" y="5" width="260" height="124" fill={shagun ? "#9E0F16" : G.paperSide} />
        <rect width="260" height="124" fill={body} stroke={P.line} strokeWidth="0.6" />
        <path d="M0 0 L130 70 L260 0" fill="none" stroke={shagun ? "rgba(0,0,0,0.25)" : P.line} strokeWidth="1" />
        <path d="M0 0 L130 70 L260 0 Z" fill={shagun ? "#D3141C" : "#FBF8F2"} opacity="0.9" />
        {shagun ? (
          <>
            <circle cx="130" cy="72" r="16" fill={G.foil} />
            <text x="130" y="108" fontSize="14" textAnchor="middle" fill={G.foil} style={displayFont}>
              शुभ विवाह
            </text>
            <rect x="10" y="10" width="240" height="104" fill="none" stroke={G.foil} strokeWidth="1.2" />
          </>
        ) : (
          <>
            <Logo x={16} y={90} size={16} />
            <text x="38" y="102" fontSize="11" fontWeight="700" style={displayFont} fill={P.ink}>
              L.K.
            </text>
            <TextLines x={150} y={92} widths={[90, 70, 80]} gap={7} />
          </>
        )}
        <rect width="260" height="124" fill={G.sheen} opacity="0.35" />
      </g>
    </Frame>
  );
}

export function BillBook({ className, title }: MockupProps) {
  return (
    <Frame className={className} title={title}>
      <Shadow cy={262} rx={130} ry={16} />
      <g transform="translate(200 150) rotate(-4) translate(-80 -108)">
        <rect x="8" y="10" width="160" height="216" fill={P.ink2} />
        {[
          { off: 6, fill: "#F5E26B" },
          { off: 3, fill: "#F7B6D2" },
        ].map((sheet) => (
          <rect key={sheet.off} x={sheet.off} y={sheet.off} width="160" height="216" fill={sheet.fill} />
        ))}
        <rect width="160" height="216" fill={G.paper} stroke={P.line} strokeWidth="0.6" />
        <Logo x={12} y={12} size={14} />
        <text x="31" y="24" fontSize="10" fontWeight="700" style={displayFont} fill={P.ink}>
          L.K.
        </text>
        <text x="148" y="24" fontSize="8" textAnchor="end" fill={P.red} style={monoFont}>
          No. 0417
        </text>
        <rect x="12" y="38" width="136" height="1" fill={P.line} />
        <text x="12" y="52" fontSize="6.5" fill={P.muted} style={monoFont} letterSpacing="0.5">
          TAX INVOICE · GSTIN
        </text>
        {Array.from({ length: 9 }, (_, i) => (
          <rect key={i} x="12" y={64 + i * 14} width="136" height="0.8" fill={P.line} />
        ))}
        <rect x="100" y="60" width="0.8" height="126" fill={P.line} />
        <TextLines x={16} y={70} widths={[60, 72, 48, 66, 54]} gap={14} opacity={0.3} />
        <rect x="0" y="198" width="160" height="2" fill="none" stroke={P.line} strokeDasharray="3 3" />
      </g>
    </Frame>
  );
}

export function Stamp({ className, title }: MockupProps) {
  return (
    <Frame className={className} title={title}>
      <Shadow cx={150} cy={250} rx={80} ry={12} />
      <Shadow cx={290} cy={248} rx={80} ry={8} opacity={0.5} />
      {/* impression */}
      <g transform="translate(290 212) rotate(-8)">
        <rect x="-70" y="-24" width="140" height="48" rx="4" fill="none" stroke={P.blue} strokeWidth="2.5" opacity="0.85" />
        <text x="0" y="-2" fontSize="15" fontWeight="700" textAnchor="middle" fill={P.blue} opacity="0.85" style={displayFont}>
          L.K. OFFSET PRINTERS
        </text>
        <text x="0" y="14" fontSize="8" textAnchor="middle" fill={P.blue} opacity="0.85" style={monoFont} letterSpacing="1.2">
          ALWAR · RAJ. 301001
        </text>
      </g>
      {/* stamp body */}
      <g transform="translate(150 150)">
        <rect x="-44" y="70" width="88" height="26" rx="4" fill={P.ink2} />
        <rect x="-38" y="96" width="76" height="6" rx="1" fill={P.blue} />
        <path d="M-30 70 L-24 8 L24 8 L30 70 Z" fill="#2B2B33" />
        <path d="M-24 8 L-20 -10 L20 -10 L24 8 Z" fill={P.ink} />
        <rect x="-34" y="-48" width="68" height="40" rx="18" fill={G.ink} />
        <rect x="-34" y="-48" width="68" height="40" rx="18" fill={G.sheen} opacity="0.4" />
        <rect x="-14" y="30" width="28" height="18" rx="2" fill={P.paper} />
        <Logo x={-7} y={32} size={14} />
      </g>
    </Frame>
  );
}

export function IdCard({ className, title }: MockupProps) {
  return (
    <Frame className={className} title={title}>
      <Shadow cy={268} rx={110} ry={12} />
      <path d="M170 0 C170 40 186 70 196 86 M230 0 C230 40 214 70 204 86" stroke={P.magenta} strokeWidth="10" fill="none" />
      <rect x="192" y="80" width="16" height="16" rx="3" fill="#9A958B" />
      <g transform="translate(200 176) rotate(3) translate(-66 -84)">
        <rect x="-6" y="-6" width="144" height="180" rx="10" fill="rgba(255,255,255,0.35)" stroke="rgba(14,14,16,0.15)" />
        <rect width="132" height="168" rx="6" fill={G.paper} stroke={P.line} strokeWidth="0.6" />
        <rect width="132" height="40" rx="6" fill={P.ink} />
        <rect y="30" width="132" height="10" fill={P.ink} />
        <Logo x={12} y={12} size={16} color={P.paper} />
        <text x="34" y="25" fontSize="10" fontWeight="700" fill={P.paper} style={displayFont}>
          L.K.
        </text>
        <rect x="42" y="52" width="48" height="56" rx="3" fill={P.paper2} />
        <rect x="42" y="52" width="48" height="56" rx="3" fill={G.dots} />
        <circle cx="66" cy="72" r="11" fill="#CFC6B6" />
        <path d="M48 108 C50 92 82 92 84 108 Z" fill="#CFC6B6" />
        <text x="66" y="124" fontSize="9" fontWeight="700" textAnchor="middle" fill={P.ink} style={displayFont}>
          Priya Verma
        </text>
        <text x="66" y="136" fontSize="6" textAnchor="middle" fill={P.muted} style={monoFont} letterSpacing="0.6">
          DESIGN STUDIO
        </text>
        <rect x="0" y="154" width="132" height="14" fill={P.magenta} />
        <rect width="132" height="168" rx="6" fill={G.sheen} opacity="0.6" />
      </g>
    </Frame>
  );
}
