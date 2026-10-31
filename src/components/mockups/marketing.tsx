import { Frame, G, Logo, P, Shadow, TextLines, displayFont, monoFont, serifFont, type MockupProps } from "./primitives";

export function TrifoldBrochure({ className, title }: MockupProps) {
  // Three panels in a zig-zag: left leans back, middle faces forward, right leans back.
  return (
    <Frame className={className} title={title}>
      <Shadow cy={258} rx={160} ry={16} />
      <polygon points="70,70 150,52 150,242 70,228" fill={G.paperSide} />
      <polygon points="150,52 250,62 250,250 150,242" fill={G.paper} stroke={P.line} strokeWidth="0.6" />
      <polygon points="250,62 330,48 330,236 250,250" fill="#F8F4EC" stroke={P.line} strokeWidth="0.6" />
      {/* left panel content */}
      <g opacity="0.8">
        <polygon points="80,96 140,84 140,92 80,104" fill={P.ink} opacity="0.3" />
        <polygon points="80,112 140,100 140,104 80,116" fill={P.ink} opacity="0.18" />
        <polygon points="80,122 132,111 132,115 80,126" fill={P.ink} opacity="0.18" />
        <polygon points="80,150 140,138 140,190 80,200" fill={P.cyan} opacity="0.85" />
      </g>
      {/* cover panel */}
      <polygon points="150,52 250,62 250,150 150,142" fill={P.magenta} />
      <circle cx="220" cy="98" r="30" fill={P.yellow} style={{ mixBlendMode: "multiply" }} />
      <circle cx="192" cy="112" r="26" fill={P.cyan} style={{ mixBlendMode: "multiply" }} />
      <text x="162" y="176" fontSize="17" fontWeight="700" fill={P.ink} style={displayFont} letterSpacing="-0.5">
        Grand
      </text>
      <text x="162" y="194" fontSize="17" fill={P.ink} style={serifFont}>
        opening
      </text>
      <Logo x={162} y={214} size={12} />
      <text x="178" y="224" fontSize="7" fill={P.muted} style={monoFont} letterSpacing="0.8">
        L.K.
      </text>
      {/* right panel */}
      <polygon points="262,86 318,76 318,120 262,130" fill={P.yellow} opacity="0.9" />
      <polygon points="262,146 318,136 318,140 262,150" fill={P.ink} opacity="0.2" />
      <polygon points="262,158 310,149 310,153 262,162" fill={P.ink} opacity="0.2" />
      <polygon points="262,170 316,160 316,164 262,174" fill={P.ink} opacity="0.2" />
      <polygon points="150,52 250,62 250,250 150,242" fill={G.sheen} opacity="0.45" />
    </Frame>
  );
}

export function PaperSheet({
  className,
  title,
  variant,
}: MockupProps & { variant: "flyer" | "poster" | "certificate" | "question-paper" | "report-card" | "menu-card" }) {
  const tall = variant !== "certificate";
  const w = tall ? 170 : 236;
  const h = tall ? 236 : 170;
  return (
    <Frame className={className} title={title}>
      <Shadow cy={268} rx={130} ry={14} />
      <g transform={`translate(200 148) rotate(${tall ? 4 : -3}) translate(${-w / 2} ${-h / 2})`}>
        <rect x="5" y="6" width={w} height={h} fill={G.paperSide} />
        <rect width={w} height={h} fill={G.paper} stroke={P.line} strokeWidth="0.6" />
        {variant === "flyer" ? (
          <>
            <rect width={w} height="110" fill={P.magenta} />
            <circle cx="120" cy="54" r="40" fill={P.yellow} style={{ mixBlendMode: "multiply" }} />
            <text x="14" y="64" fontSize="34" fontWeight="800" fill={P.paper} style={displayFont} letterSpacing="-1.5">
              50%
            </text>
            <text x="14" y="86" fontSize="13" fill={P.paper} style={serifFont}>
              festive sale
            </text>
            <TextLines x={14} y={126} widths={[120, 100, 132, 90]} gap={9} opacity={0.2} />
            <rect x="14" y="176" width="70" height="20" fill={P.ink} />
            <rect x="0" y={h - 22} width={w} height="22" fill={P.ink} />
            <Logo x={14} y={h - 17} size={12} color={P.paper} />
          </>
        ) : null}
        {variant === "poster" ? (
          <>
            <rect x="10" y="10" width={w - 20} height="160" fill={P.ink} />
            <circle cx="70" cy="80" r="44" fill={P.cyan} style={{ mixBlendMode: "screen" }} />
            <circle cx="104" cy="96" r="44" fill={P.magenta} style={{ mixBlendMode: "screen" }} />
            <circle cx="86" cy="120" r="44" fill={P.yellow} style={{ mixBlendMode: "screen" }} />
            <text x="12" y="198" fontSize="20" fontWeight="800" fill={P.ink} style={displayFont} letterSpacing="-0.8">
              Admissions
            </text>
            <text x="12" y="216" fontSize="12" fill={P.magenta} style={serifFont}>
              open 2026–27
            </text>
          </>
        ) : null}
        {variant === "certificate" ? (
          <>
            <rect x="8" y="8" width={w - 16} height={h - 16} fill="none" stroke={G.foil} strokeWidth="3" />
            <rect x="14" y="14" width={w - 28} height={h - 28} fill="none" stroke={G.foil} strokeWidth="0.8" />
            <text x={w / 2} y="48" fontSize="18" textAnchor="middle" fill={P.ink} style={serifFont}>
              Certificate of Merit
            </text>
            <text x={w / 2} y="64" fontSize="6.5" textAnchor="middle" fill={P.muted} style={monoFont} letterSpacing="1.2">
              PRESENTED TO
            </text>
            <text x={w / 2} y="90" fontSize="16" fontWeight="700" textAnchor="middle" fill={P.ink} style={displayFont}>
              Aarav Gupta
            </text>
            <rect x={w / 2 - 60} y="96" width="120" height="0.8" fill={P.ink} opacity="0.4" />
            <TextLines x={w / 2 - 50} y={108} widths={[100, 80]} gap={7} />
            <circle cx={w - 44} cy={h - 40} r="18" fill={G.foil} />
            <circle cx={w - 44} cy={h - 40} r="12" fill="none" stroke="#FFF1C1" strokeWidth="0.8" />
            <rect x="30" y={h - 36} width="60" height="0.8" fill={P.ink} opacity="0.5" />
          </>
        ) : null}
        {variant === "question-paper" ? (
          <>
            <text x={w / 2} y="22" fontSize="9" fontWeight="700" textAnchor="middle" fill={P.ink} style={displayFont}>
              HALF-YEARLY EXAMINATION
            </text>
            <text x={w / 2} y="34" fontSize="6.5" textAnchor="middle" fill={P.muted} style={monoFont}>
              CLASS X · MATHEMATICS · M.M. 80
            </text>
            <rect x="12" y="42" width={w - 24} height="0.8" fill={P.ink} opacity="0.5" />
            {Array.from({ length: 7 }, (_, i) => (
              <g key={i}>
                <text x="14" y={60 + i * 25} fontSize="7" fill={P.ink} style={monoFont}>
                  {`Q${i + 1}.`}
                </text>
                <TextLines x={30} y={55 + i * 25} widths={[w - 48, (w - 48) * 0.7]} gap={7} opacity={0.18} />
              </g>
            ))}
          </>
        ) : null}
        {variant === "report-card" ? (
          <>
            <rect width={w} height="44" fill={G.green} />
            <Logo x={12} y={14} size={16} color={P.paper} />
            <text x="34" y="27" fontSize="10" fontWeight="700" fill={P.paper} style={displayFont}>
              PROGRESS REPORT
            </text>
            {Array.from({ length: 8 }, (_, i) => (
              <g key={i}>
                <rect x="12" y={60 + i * 18} width={w - 24} height="18" fill={i % 2 ? "transparent" : "rgba(0,166,81,0.07)"} />
                <TextLines x={18} y={68 + i * 18} widths={[70]} opacity={0.25} />
                <text x={w - 20} y={72 + i * 18} fontSize="8" textAnchor="end" fill={P.ink} style={monoFont}>
                  {["A1", "A2", "B1", "A1", "A2", "A1", "B2", "A1"][i]}
                </text>
              </g>
            ))}
          </>
        ) : null}
        {variant === "menu-card" ? (
          <>
            <rect x="10" y="10" width={w - 20} height={h - 20} fill="none" stroke={G.foil} strokeWidth="1.2" />
            <text x={w / 2} y="46" fontSize="20" textAnchor="middle" fill={P.ink} style={serifFont}>
              Menu
            </text>
            <rect x={w / 2 - 16} y="54" width="32" height="1.2" fill={G.foil} />
            {["Paneer Tikka", "Dal Makhani", "Veg Biryani", "Gulab Jamun"].map((dish, i) => (
              <g key={dish}>
                <text x={w / 2} y={82 + i * 34} fontSize="10" fontWeight="600" textAnchor="middle" fill={P.ink} style={displayFont}>
                  {dish}
                </text>
                <TextLines x={w / 2 - 36} y={88 + i * 34} widths={[72]} opacity={0.18} />
              </g>
            ))}
          </>
        ) : null}
        <rect width={w} height={h} fill={G.sheen} opacity="0.35" />
      </g>
    </Frame>
  );
}

export function Booklet({ className, title, variant = "catalogue" }: MockupProps & { variant?: "catalogue" | "notebook" | "spiral" | "hard" }) {
  const cover = variant === "notebook" ? G.cyan : variant === "hard" ? "#5B1220" : variant === "spiral" ? "rgba(255,255,255,0.55)" : G.ink;
  return (
    <Frame className={className} title={title}>
      <Shadow cy={260} rx={140} ry={16} />
      <g transform="translate(200 150) rotate(-7) translate(-78 -104)">
        {[10, 7, 4].map((off) => (
          <rect key={off} x={off} y={off} width="156" height="208" fill={off === 10 ? G.paperSide : "#F2EDE3"} stroke={P.line} strokeWidth="0.4" />
        ))}
        <rect width="156" height="208" fill={variant === "spiral" ? G.paper : cover} stroke={P.line} strokeWidth="0.6" />
        {variant === "catalogue" ? (
          <>
            <rect x="14" y="16" width="128" height="110" fill={P.paper} />
            <rect x="14" y="16" width="128" height="110" fill={G.dots} />
            <circle cx="78" cy="71" r="32" fill={P.magenta} style={{ mixBlendMode: "multiply" }} />
            <text x="14" y="154" fontSize="20" fontWeight="800" fill={P.paper} style={displayFont} letterSpacing="-0.8">
              Catalogue
            </text>
            <text x="14" y="172" fontSize="12" fill={P.yellow} style={serifFont}>
              collection 2026
            </text>
          </>
        ) : null}
        {variant === "notebook" ? (
          <>
            <rect x="14" y="20" width="128" height="44" fill={P.paper} />
            <Logo x={22} y={30} size={20} />
            <text x="48" y="46" fontSize="12" fontWeight="700" fill={P.ink} style={displayFont}>
              BRIGHT MINDS
            </text>
            <TextLines x={22} y={84} widths={[112, 112, 112]} gap={14} color={P.paper} opacity={0.6} height={1.2} />
          </>
        ) : null}
        {variant === "spiral" ? (
          <>
            <text x="18" y="60" fontSize="15" fontWeight="700" fill={P.ink} style={displayFont}>
              Project Report
            </text>
            <TextLines x={18} y={76} widths={[100, 80]} gap={8} />
            <TextLines x={18} y={110} widths={[120, 116, 120, 96, 120, 108]} gap={9} opacity={0.14} />
            <rect width="156" height="208" fill={G.sheen} opacity="0.8" />
            {Array.from({ length: 16 }, (_, i) => (
              <ellipse key={i} cx="4" cy={12 + i * 12.2} rx="7" ry="3.6" fill="none" stroke={P.ink} strokeWidth="1.6" />
            ))}
          </>
        ) : null}
        {variant === "hard" ? (
          <>
            <rect x="0" y="0" width="14" height="208" fill="#3E0B15" />
            <text x="85" y="70" fontSize="11" fontWeight="700" textAnchor="middle" fill={G.foil} style={displayFont} letterSpacing="1">
              A THESIS ON
            </text>
            <text x="85" y="88" fontSize="11" fontWeight="700" textAnchor="middle" fill={G.foil} style={displayFont} letterSpacing="1">
              RENEWABLE ENERGY
            </text>
            <rect x="55" y="100" width="60" height="1" fill={G.foil} />
            <text x="85" y="170" fontSize="8" textAnchor="middle" fill={G.foil} style={monoFont} letterSpacing="1">
              SUBMITTED BY · 2026
            </text>
          </>
        ) : null}
        {variant !== "spiral" ? <rect width="156" height="208" fill={G.sheen} opacity="0.4" /> : null}
      </g>
    </Frame>
  );
}

export function Dangler({ className, title }: MockupProps) {
  return (
    <Frame className={className} title={title}>
      <line x1="200" y1="0" x2="200" y2="58" stroke={P.muted} strokeWidth="1" />
      <Shadow cy={274} rx={70} ry={8} opacity={0.6} />
      <g transform="translate(200 150) rotate(-6)">
        <circle cx="0" cy="0" r="92" fill={P.yellow} />
        <circle cx="0" cy="0" r="92" fill={G.sheen} opacity="0.5" />
        <circle cx="0" cy="-86" r="4" fill={P.paper} stroke={P.muted} />
        <text x="0" y="-12" fontSize="16" fontWeight="700" textAnchor="middle" fill={P.ink} style={displayFont}>
          FLAT
        </text>
        <text x="0" y="30" fontSize="46" fontWeight="800" textAnchor="middle" fill={P.magenta} style={displayFont} letterSpacing="-2">
          30%
        </text>
        <text x="0" y="52" fontSize="12" textAnchor="middle" fill={P.ink} style={serifFont}>
          this Diwali
        </text>
      </g>
    </Frame>
  );
}
