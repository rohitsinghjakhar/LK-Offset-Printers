import type { L } from "@/types/i18n";

/** Home copy that is list-shaped (kept out of messages so they can be precompiled). */
export const marqueeRows: [L[], L[]] = [
  [
    { en: "Visiting Cards", hi: "विज़िटिंग कार्ड" },
    { en: "Flex Banners", hi: "फ्लेक्स बैनर" },
    { en: "Wedding Cards", hi: "शादी के कार्ड" },
    { en: "Brochures", hi: "ब्रोशर" },
    { en: "Stickers & Labels", hi: "स्टिकर और लेबल" },
  ],
  [
    { en: "School Diaries", hi: "स्कूल डायरी" },
    { en: "Roll-up Standees", hi: "रोल-अप स्टैंडी" },
    { en: "Photo Mugs", hi: "फ़ोटो मग" },
    { en: "Letterheads", hi: "लेटरहेड" },
    { en: "Sweet Boxes", hi: "मिठाई के डिब्बे" },
  ],
];

export const pressPasses: L[] = [
  { en: "Design", hi: "डिज़ाइन" },
  { en: "Proof", hi: "प्रूफ़" },
  { en: "Print", hi: "छपाई" },
  { en: "Deliver", hi: "डिलीवरी" },
];

export const pressSteps: { title: L; body: L }[] = [
  {
    title: { en: "Send your design — or we design it", hi: "डिज़ाइन भेजिए — या हम बना देंगे" },
    body: {
      en: "Send a PDF, CDR, AI or even a clear phone photo. No design yet? Our studio makes one from ₹299.",
      hi: "PDF, CDR, AI या फ़ोन से खींची साफ़ फ़ोटो भी चलेगी। डिज़ाइन नहीं है? हमारा स्टूडियो ₹299 से बना देता है।",
    },
  },
  {
    title: { en: "Free soft proof on WhatsApp within 2 hours", hi: "2 घंटे में WhatsApp पर फ़्री प्रूफ़" },
    body: {
      en: "We check size, bleed, spelling and colours, then send you a proof. Nothing prints until you say yes.",
      hi: "साइज़, ब्लीड, स्पेलिंग और रंग जाँचकर प्रूफ़ भेजते हैं। आपकी हाँ के बिना कुछ नहीं छपता।",
    },
  },
  {
    title: { en: "Printed on our in-house machines", hi: "हमारी अपनी मशीनों पर छपाई" },
    body: {
      en: "Heidelberg offset, Konica Minolta digital and a 10-ft large-format printer. No outsourcing, no surprises.",
      hi: "हाइडलबर्ग ऑफ़सेट, कोनिका मिनोल्टा डिजिटल और 10 फ़ुट का लार्ज-फ़ॉर्मेट प्रिंटर। बाहर से काम नहीं करवाते, कोई झंझट नहीं।",
    },
  },
  {
    title: { en: "Pickup or delivery", hi: "दुकान से लें या डिलीवरी" },
    body: {
      en: "Collect from Panchayat Samiti, Kathumar Road, Laxmangarh, get local delivery in Laxmangarh, or have it couriered to any PIN code in India.",
      hi: "पंचायत समिति, कठूमर रोड, लक्ष्मणगढ़ से ले जाइए, लक्ष्मणगढ़ में होम डिलीवरी लीजिए, या भारत के किसी भी पिन कोड पर कूरियर।",
    },
  },
];

/** "What file should I send?" tips shown on product pages. */
export const fileHelperTips: L[] = [
  {
    en: "Best: a print-ready PDF in CMYK with 3 mm bleed on every side.",
    hi: "सबसे अच्छा: CMYK में प्रिंट-रेडी PDF, चारों तरफ़ 3 mm ब्लीड के साथ।",
  },
  {
    en: "Also fine: CorelDRAW (CDR), Illustrator (AI/EPS) or Photoshop (PSD) — convert text to curves.",
    hi: "ये भी चलेगा: CorelDRAW (CDR), Illustrator (AI/EPS) या Photoshop (PSD) — टेक्स्ट को कर्व में बदल दें।",
  },
  {
    en: "Photos and JPGs work if they are big enough; our checker tells you before you pay.",
    hi: "फ़ोटो और JPG भी चलते हैं अगर साइज़ बड़ा हो; हमारा चेकर पेमेंट से पहले बता देगा।",
  },
  {
    en: 'No file at all? Choose "Design it for me" and our studio will make it.',
    hi: 'फ़ाइल ही नहीं है? "मेरे लिए डिज़ाइन कर दो" चुनिए, हमारा स्टूडियो बना देगा।',
  },
];
