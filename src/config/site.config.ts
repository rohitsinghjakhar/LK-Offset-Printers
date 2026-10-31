import type { L } from "@/types/i18n";
import { contact } from "./contact";

export type Machine = {
  id: string;
  name: string;
  kind: L;
  prints: L;
  maxSize: string;
  speed: string;
  colour: "cyan" | "magenta" | "yellow" | "ink" | "green";
};

export type ServiceArea = {
  slug: string;
  name: L;
  mode: "pickup-local" | "courier" | "pan-india";
  eta: L;
};

/** Every business detail on the site comes from here. Edit, rebuild (npm run build) and re-upload `out/`. */
export const siteConfig = {
  brandName: contact.brandName,
  short: "L.K.",
  hindi: contact.hindi,
  monogram: "LK",
  taglineEn: "Print that leaves a mark.",
  taglineHi: "छाप, जो याद रह जाए।",
  url: (process.env.NEXT_PUBLIC_SITE_URL || "https://www.lkprinters.in").replace(/\/$/, ""),
  founder: { name: "Mahendra Choudhary", nameHi: "महेंद्र चौधरी", role: "Founder of LK Offset Printers", experienceYears: 15 },

  seo: {
    description: {
      en: "L.K. Offset Printers is an offset and digital printing press in Laxmangarh, Alwar, Rajasthan, founded by Mahendra Choudhary (15+ years in printing). Visiting cards, wedding cards, flex banners, packaging, labels and school printing, delivered across Rajasthan, Jaipur and Delhi NCR.",
      hi: "एल.के. ऑफ़सेट प्रिंटर्स लक्ष्मणगढ़, अलवर (राजस्थान) की ऑफ़सेट और डिजिटल प्रिंटिंग प्रेस है, जिसकी स्थापना महेंद्र चौधरी (प्रिंटिंग में 15+ वर्ष) ने की। विज़िटिंग कार्ड, शादी के कार्ड, फ्लेक्स बैनर, पैकेजिंग, लेबल और स्कूल प्रिंटिंग — पूरे राजस्थान, जयपुर और दिल्ली NCR में डिलीवरी।",
    } satisfies L,
    keywords: [
      "L.K. Offset Printers",
      "LK Offset Printers Laxmangarh",
      "printing press Laxmangarh",
      "printing press Alwar",
      "offset printing Alwar",
      "offset printers Rajasthan",
      "printing press Jaipur",
      "printing services Delhi NCR",
      "visiting card printing",
      "wedding card printing",
      "flex banner printing",
      "packaging and label printing",
      "school diary printing",
      "bill book printing",
    ],
    knowsAbout: [
      "Offset printing",
      "Digital printing",
      "Visiting cards",
      "Wedding cards",
      "Flex banners and signage",
      "Packaging, cartons and labels",
      "School diaries and ID cards",
      "Brochures and pamphlets",
      "Laser cutting",
      "Sublimation printing",
    ],
    /** Star ratings in structured data must come from real, verifiable reviews. Turn on only when they do. */
    publishRatings: false,
  },

  city: { en: "Laxmangarh, Alwar, Rajasthan", hi: "लक्ष्मणगढ़, अलवर, राजस्थान" } satisfies L,
  address: {
    street: { en: "In front of Panchayat Samiti, Kathumar Road", hi: "पंचायत समिति के सामने, कठूमर रोड, लक्ष्मणगढ़" } satisfies L,
    locality: "Laxmangarh, Alwar",
    region: "Rajasthan",
    postalCode: "321607",
    country: "IN",
    full: {
      en: "In front of Panchayat Samiti, Kathumar Road, Laxmangarh, Alwar, Rajasthan 321607",
      hi: "पंचायत समिति के सामने, कठूमर रोड, लक्ष्मणगढ़, अलवर, राजस्थान 321607",
    } satisfies L,
  },
  // Exact shop pin, from the owner's Google Maps link.
  geo: { lat: 27.364869, lng: 76.861252 },
  mapsUrl: "https://maps.app.goo.gl/H8qSDkBkPipmaZ6d9",
  mapsEmbedUrl: "https://www.google.com/maps?q=27.364869,76.861252&z=17&output=embed",

  phone: contact.phone,
  phoneE164: contact.phoneE164,
  whatsapp: contact.whatsapp,
  email: contact.email,

  hours: [
    { days: { en: "Mon – Sat", hi: "सोम – शनि" }, open: "09:30", close: "20:30", schema: ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"] },
    { days: { en: "Sunday", hi: "रविवार" }, open: "10:00", close: "14:00", schema: ["Sunday"] },
  ],
  hoursLabel: {
    en: "Mon–Sat 9:30 AM – 8:30 PM · Sun 10:00 AM – 2:00 PM",
    hi: "सोम–शनि सुबह 9:30 – रात 8:30 · रवि सुबह 10 – दोपहर 2",
  } satisfies L,

  established: 2010,
  stats: {
    years: 15,
    orders: 50000,
    clients: 3000,
    rating: 4.8,
    reviewCount: 1260,
  },

  promises: [
    {
      id: "same-day",
      title: { en: "Same-day visiting cards", hi: "विज़िटिंग कार्ड उसी दिन" },
      detail: { en: "Order before 12 PM, collect by evening.", hi: "दोपहर 12 बजे से पहले ऑर्डर करें, शाम तक ले जाएँ।" },
    },
    {
      id: "proof",
      title: { en: "Free soft proof in 2 hours", hi: "2 घंटे में फ़्री प्रूफ़" },
      detail: { en: "On WhatsApp, within 2 working hours.", hi: "WhatsApp पर, 2 कामकाजी घंटों के अंदर।" },
    },
    {
      id: "reprint",
      title: { en: "Free reprint if we slip", hi: "गलती हमारी, तो दोबारा छपाई फ़्री" },
      detail: { en: "If the mistake is ours, the reprint is on us.", hi: "अगर गलती हमारी है, तो नई छपाई हमारे खर्च पर।" },
    },
  ],

  machines: [
    {
      id: "heidelberg",
      name: "Heidelberg SM 52",
      kind: { en: "4-colour offset press", hi: "4-कलर ऑफ़सेट मशीन" },
      prints: { en: "Visiting cards, letterheads, brochures, wedding cards in bulk", hi: "विज़िटिंग कार्ड, लेटरहेड, ब्रोशर, शादी के कार्ड — बड़ी मात्रा में" },
      maxSize: "37 × 52 cm",
      speed: "15,000 sheets/hr",
      colour: "cyan",
    },
    {
      id: "accurio",
      name: "Konica Minolta AccurioPress",
      kind: { en: "Digital production press", hi: "डिजिटल प्रोडक्शन प्रेस" },
      prints: { en: "Short runs, same-day cards, personalised prints", hi: "कम मात्रा, उसी दिन के कार्ड, नाम वाली छपाई" },
      maxSize: "33 × 48.7 cm",
      speed: "80 pages/min",
      colour: "magenta",
    },
    {
      id: "eco-solvent",
      name: "10-ft Eco-solvent Printer",
      kind: { en: "Large-format printer", hi: "बड़े साइज़ का प्रिंटर" },
      prints: { en: "Flex banners, vinyl, one-way vision, backlit", hi: "फ्लेक्स बैनर, विनाइल, वन-वे विज़न, बैकलिट" },
      maxSize: "10 ft wide, any length",
      speed: "450 sq ft/hr",
      colour: "yellow",
    },
    {
      id: "laser",
      name: "CO₂ Laser Cutter",
      kind: { en: "Laser cutting & engraving", hi: "लेज़र कटिंग और नक्काशी" },
      prints: { en: "Laser-cut wedding cards, acrylic signs, wooden gifts", hi: "लेज़र-कट शादी कार्ड, एक्रेलिक साइन, लकड़ी के गिफ़्ट" },
      maxSize: "130 × 90 cm",
      speed: "Up to 600 mm/s",
      colour: "green",
    },
    {
      id: "sublimation",
      name: "Sublimation Heat Press",
      kind: { en: "Heat transfer press", hi: "हीट ट्रांसफ़र प्रेस" },
      prints: { en: "Photo mugs, T-shirts, cushions, keychains", hi: "फ़ोटो मग, टी-शर्ट, कुशन, की-चेन" },
      maxSize: "40 × 60 cm",
      speed: "60 pieces/hr",
      colour: "ink",
    },
  ] satisfies readonly Machine[],

  serviceAreas: [
    {
      slug: "laxmangarh",
      name: { en: "Laxmangarh", hi: "लक्ष्मणगढ़" },
      mode: "pickup-local",
      eta: { en: "Free shop pickup · local delivery ₹49", hi: "दुकान से फ़्री पिकअप · लोकल डिलीवरी ₹49" },
    },
    {
      slug: "kathumar",
      name: { en: "Kathumar", hi: "कठूमर" },
      mode: "courier",
      eta: { en: "Shop pickup or courier after proof approval", hi: "दुकान से पिकअप या प्रूफ़ पास होने के बाद कूरियर" },
    },
    {
      slug: "alwar",
      name: { en: "Alwar", hi: "अलवर" },
      mode: "courier",
      eta: { en: "1–2 days by courier across the district", hi: "पूरे ज़िले में कूरियर से 1–2 दिन" },
    },
    { slug: "bhiwadi", name: { en: "Bhiwadi", hi: "भिवाड़ी" }, mode: "courier", eta: { en: "1–2 days by courier", hi: "कूरियर से 1–2 दिन" } },
    { slug: "behror", name: { en: "Behror", hi: "बहरोड़" }, mode: "courier", eta: { en: "1–2 days by courier", hi: "कूरियर से 1–2 दिन" } },
    {
      slug: "rajasthan",
      name: { en: "Rajasthan", hi: "राजस्थान" },
      mode: "courier",
      eta: { en: "Courier timing confirmed for your PIN code", hi: "आपके पिन कोड के अनुसार कूरियर समय की पुष्टि" },
    },
    { slug: "jaipur", name: { en: "Jaipur", hi: "जयपुर" }, mode: "courier", eta: { en: "2 days by courier", hi: "कूरियर से 2 दिन" } },
    { slug: "bharatpur", name: { en: "Bharatpur", hi: "भरतपुर" }, mode: "courier", eta: { en: "1–2 days by courier", hi: "कूरियर से 1–2 दिन" } },
    { slug: "dausa", name: { en: "Dausa", hi: "दौसा" }, mode: "courier", eta: { en: "About 2 days by courier", hi: "कूरियर से लगभग 2 दिन" } },
    { slug: "delhi-ncr", name: { en: "Delhi NCR", hi: "दिल्ली NCR" }, mode: "courier", eta: { en: "2–3 days by courier", hi: "कूरियर से 2–3 दिन" } },
    { slug: "gurugram", name: { en: "Gurugram", hi: "गुरुग्राम" }, mode: "courier", eta: { en: "2–3 days by courier", hi: "कूरियर से 2–3 दिन" } },
    { slug: "noida", name: { en: "Noida", hi: "नोएडा" }, mode: "courier", eta: { en: "2–3 days by courier", hi: "कूरियर से 2–3 दिन" } },
    { slug: "faridabad", name: { en: "Faridabad", hi: "फ़रीदाबाद" }, mode: "courier", eta: { en: "2–3 days by courier", hi: "कूरियर से 2–3 दिन" } },
    { slug: "ghaziabad", name: { en: "Ghaziabad", hi: "गाज़ियाबाद" }, mode: "courier", eta: { en: "2–3 days by courier", hi: "कूरियर से 2–3 दिन" } },
    { slug: "india", name: { en: "Pan-India", hi: "पूरा भारत" }, mode: "pan-india", eta: { en: "3–6 days by courier", hi: "कूरियर से 3–6 दिन" } },
  ] satisfies readonly ServiceArea[],

  /** Orders are confirmed on WhatsApp; payment is taken after the proof is approved. */
  payments: {
    accepted: ["UPI", "Cash"],
  },

  gstin: "",
  social: {
    instagram: "",
    facebook: "",
    youtube: "",
    googleBusinessProfile: "",
  },

  grievance: {
    name: "Mahendra Choudhary, L.K. Offset Printers",
    email: contact.email,
    phone: contact.phone,
  },

  delivery: {
    pickup: 0,
    local: 49,
    localFreeAbove: 999,
    courier: 99,
    localCity: "Laxmangarh",
  },

  pricing: {
    expressPct: 25,
    areaMinCharge: 150,
    defaultGstRate: 18,
    bulkDiscounts: [
      { minQty: 1000, pct: 15 },
      { minQty: 500, pct: 10 },
      { minQty: 100, pct: 5 },
    ],
    designFees: { own: 0, basic: 299, premium: 999 },
  },

  artworkRetentionDays: 90,
  sameDayCutoff: "12:00",
  proofWithinHours: 2,
} as const;

export type SiteConfig = typeof siteConfig;
export type DeliveryMode = "pickup" | "local" | "courier";
export type DesignService = keyof typeof siteConfig.pricing.designFees;
