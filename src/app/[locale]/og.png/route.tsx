import { ImageResponse } from "next/og";
import { siteConfig } from "@/config/site.config";
import { routing } from "@/i18n/routing";

/**
 * Social preview card (WhatsApp, Facebook, X, LinkedIn) written to /en/og.png and /hi/og.png at build
 * time. A route handler rather than an opengraph-image file so the static export keeps the .png
 * extension and every host serves it as image/png.
 */
export const dynamic = "force-static";

const size = { width: 1200, height: 630 };

export function generateStaticParams() {
  return routing.locales.map((locale) => ({ locale }));
}

/** Google Fonts serves TTF when no browser UA is sent — Satori can't read woff2. */
async function loadFont(family: string, weight: number, text: string): Promise<ArrayBuffer | null> {
  try {
    const css = await fetch(`https://fonts.googleapis.com/css2?family=${family}:wght@${weight}&text=${encodeURIComponent(text)}`).then((r) => r.text());
    const url = css.match(/src: url\((.+?)\) format\('(opentype|truetype)'\)/)?.[1];
    return url ? await fetch(url).then((r) => r.arrayBuffer()) : null;
  } catch {
    return null;
  }
}

const INK = "#0E0E10";
const PAPER = "#F6F3EC";

function Crop({ style }: { style: React.CSSProperties }) {
  return (
    <div style={{ position: "absolute", display: "flex", width: 36, height: 36, ...style }}>
      <div style={{ position: "absolute", top: 17, left: 0, width: 36, height: 2, background: "rgba(14,14,16,0.35)" }} />
      <div style={{ position: "absolute", left: 17, top: 0, width: 2, height: 36, background: "rgba(14,14,16,0.35)" }} />
    </div>
  );
}

export async function GET(_request: Request, { params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  const hindi = locale === "hi";
  const headline = hindi ? siteConfig.taglineHi : siteConfig.taglineEn;
  const pin = siteConfig.address.postalCode;
  const footerHi = `अलवर, राजस्थान ${pin} · ऑनलाइन रेट · WhatsApp प्रूफ़`;
  const footerEn = `Laxmangarh, Alwar ${pin} · Instant prices · Proofs on WhatsApp`;
  const slug = "SHEET 01 — 4/4 CMYK · 350 GSM";

  const [display, devanagari, mono] = await Promise.all([
    loadFont("Bricolage+Grotesque", 700, `${siteConfig.taglineEn}${siteConfig.brandName}`),
    hindi ? loadFont("Mukta", 700, `${headline}${footerHi}`) : Promise.resolve(null),
    loadFont("Geist+Mono", 500, `${slug}${footerEn}`),
  ]);
  // Without a Devanagari font Satori would draw empty boxes, so fall back to the English card.
  // Satori also has no Indic shaping: pre-base matras (ि) render out of order, so the brand stays in
  // Latin and Hindi copy used here should avoid ि — the current tagline and footer do.
  const useHindi = hindi && devanagari !== null;
  const fonts = [
    display && { name: "Display", data: display, weight: 700 as const, style: "normal" as const },
    devanagari && { name: "Deva", data: devanagari, weight: 700 as const, style: "normal" as const },
    mono && { name: "Mono", data: mono, weight: 500 as const, style: "normal" as const },
  ].filter((f) => Boolean(f)) as { name: string; data: ArrayBuffer; weight: 700 | 500; style: "normal" }[];
  const headFont = useHindi ? "Deva" : "Display";

  return new ImageResponse(
    <div style={{ width: "100%", height: "100%", display: "flex", position: "relative", background: PAPER, color: INK, padding: 72 }}>
      <Crop style={{ top: 22, left: 22 }} />
      <Crop style={{ top: 22, right: 22 }} />
      <Crop style={{ bottom: 22, left: 22 }} />
      <Crop style={{ bottom: 22, right: 22 }} />

      {/* CMYK registration dots, overlapping like misregistered plates. */}
      <div style={{ position: "absolute", right: 90, top: 150, display: "flex", width: 360, height: 330 }}>
        <div style={{ position: "absolute", left: 0, top: 0, width: 230, height: 230, borderRadius: 999, background: "rgba(0,174,239,0.85)" }} />
        <div style={{ position: "absolute", left: 120, top: 20, width: 230, height: 230, borderRadius: 999, background: "rgba(236,0,140,0.8)" }} />
        <div style={{ position: "absolute", left: 60, top: 100, width: 230, height: 230, borderRadius: 999, background: "rgba(255,229,0,0.8)" }} />
      </div>

      <div style={{ display: "flex", flexDirection: "column", justifyContent: "space-between", width: "100%", position: "relative" }}>
        <div style={{ display: "flex", alignItems: "center", gap: 16 }}>
          <div style={{ display: "flex", position: "relative", width: 44, height: 44, alignItems: "center", justifyContent: "center" }}>
            <div style={{ position: "absolute", width: 3, height: 44, background: INK }} />
            <div style={{ position: "absolute", width: 44, height: 3, background: INK }} />
            <div
              style={{
                width: 28,
                height: 28,
                borderRadius: 999,
                border: `3px solid ${INK}`,
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                background: PAPER,
              }}
            >
              <div style={{ width: 10, height: 10, borderRadius: 999, background: "#EC008C" }} />
            </div>
          </div>
          <div style={{ fontFamily: "Display", fontSize: 38, fontWeight: 700, letterSpacing: -1 }}>{siteConfig.brandName}</div>
        </div>

        <div style={{ display: "flex", flexDirection: "column", maxWidth: 720 }}>
          <div style={{ fontFamily: "Mono", fontSize: 20, letterSpacing: 3, color: "rgba(14,14,16,0.6)" }}>{slug}</div>
          <div
            style={{
              marginTop: 20,
              fontFamily: headFont,
              fontSize: useHindi ? 96 : 104,
              fontWeight: 700,
              lineHeight: useHindi ? 1.15 : 0.95,
              letterSpacing: useHindi ? 0 : -3,
            }}
          >
            {useHindi ? headline : siteConfig.taglineEn}
          </div>
        </div>

        <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", borderTop: `2px solid ${INK}`, paddingTop: 20 }}>
          <div style={{ fontFamily: useHindi ? "Deva" : "Mono", fontSize: 22 }}>{useHindi ? footerHi : footerEn}</div>
          <div style={{ display: "flex", gap: 6 }}>
            {["#00AEEF", "#EC008C", "#FFE500", INK].map((c) => (
              <div key={c} style={{ width: 22, height: 22, background: c }} />
            ))}
          </div>
        </div>
      </div>
    </div>,
    { ...size, fonts },
  );
}
