import { Bricolage_Grotesque, Geist, Geist_Mono, Instrument_Serif, Mukta, Tiro_Devanagari_Hindi } from "next/font/google";

// Only the display and body faces are preloaded; the rest load on first use.
const display = Bricolage_Grotesque({
  subsets: ["latin"],
  variable: "--font-bricolage",
  display: "swap",
  weight: "variable",
});

const body = Geist({
  subsets: ["latin"],
  variable: "--font-geist",
  display: "swap",
});

const serif = Instrument_Serif({
  subsets: ["latin"],
  variable: "--font-instrument",
  weight: "400",
  style: ["normal", "italic"],
  display: "swap",
  preload: false,
});

const mono = Geist_Mono({
  subsets: ["latin"],
  variable: "--font-geist-mono",
  display: "swap",
  preload: false,
});

const hindiDisplay = Tiro_Devanagari_Hindi({
  subsets: ["devanagari", "latin"],
  variable: "--font-tiro",
  weight: "400",
  style: ["normal", "italic"],
  display: "swap",
  preload: false,
});

const hindiBody = Mukta({
  subsets: ["devanagari", "latin"],
  variable: "--font-mukta",
  weight: ["400", "500", "600", "700"],
  display: "swap",
  preload: false,
});

export const fontVariables = [display, body, serif, mono, hindiDisplay, hindiBody].map((f) => f.variable).join(" ");
