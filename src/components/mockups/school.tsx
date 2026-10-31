import { Frame, G, Logo, P, Shadow, TextLines, displayFont, monoFont, serifFont, type MockupProps } from "./primitives";

export function SchoolDiary({ className, title }: MockupProps) {
  return (
    <Frame className={className} title={title}>
      <Shadow cy={258} rx={160} ry={16} />
      {/* open inner page peeking */}
      <g transform="translate(262 150) rotate(9) translate(-70 -96)">
        <rect width="140" height="192" fill={G.paper} stroke={P.line} strokeWidth="0.6" />
        <text x="12" y="22" fontSize="8" fontWeight="700" fill={P.ink} style={displayFont}>
          HOMEWORK · MONDAY
        </text>
        {Array.from({ length: 12 }, (_, i) => (
          <rect key={i} x="12" y={34 + i * 12} width="116" height="0.7" fill={P.cyan} opacity="0.5" />
        ))}
        <TextLines x={14} y={38} widths={[80, 96, 60]} gap={12} opacity={0.3} />
        <rect x="12" y="164" width="116" height="16" fill="none" stroke={P.line} />
        <text x="16" y="175" fontSize="6" fill={P.muted} style={monoFont}>
          PARENT&apos;S SIGN
        </text>
      </g>
      {/* diary cover */}
      <g transform="translate(160 150) rotate(-6) translate(-82 -108)">
        <rect x="6" y="6" width="164" height="216" fill="#006B34" />
        <rect width="164" height="216" rx="3" fill={G.green} />
        <rect width="18" height="216" fill="#00743A" />
        <rect x="18" y="0" width="2" height="216" fill="rgba(0,0,0,0.18)" />
        <circle cx="92" cy="72" r="30" fill={P.paper} />
        <Logo x={74} y={54} size={36} color={P.green} />
        <text x="92" y="130" fontSize="14" fontWeight="800" textAnchor="middle" fill={P.paper} style={displayFont} letterSpacing="0.4">
          ST. XAVIER&apos;S
        </text>
        <text x="92" y="146" fontSize="10" textAnchor="middle" fill={P.yellow} style={serifFont}>
          Senior Secondary School
        </text>
        <rect x="46" y="162" width="92" height="22" rx="2" fill="rgba(255,255,255,0.14)" />
        <text x="92" y="177" fontSize="8" textAnchor="middle" fill={P.paper} style={monoFont} letterSpacing="1.2">
          DIARY 2026–27
        </text>
        <rect width="164" height="216" fill={G.sheen} opacity="0.4" />
      </g>
    </Frame>
  );
}
