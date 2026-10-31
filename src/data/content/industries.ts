import type { IndustrySlug, InkColour } from "@/types/catalog";
import type { L } from "@/types/i18n";

export type Industry = {
  slug: IndustrySlug;
  name: L;
  colour: InkColour;
  tagline: L;
  intro: L;
  kit: string[];
  why: L[];
  faqs: { question: L; answer: L }[];
};

export const industries: Industry[] = [
  {
    slug: "schools-coaching",
    name: { en: "Schools & Coaching", hi: "स्कूल और कोचिंग" },
    colour: "green",
    tagline: { en: "Everything a session needs, on time.", hi: "पूरे सेशन की छपाई, समय पर।" },
    intro: {
      en: "From admission pamphlets in March to report cards in March again, we print the whole academic year for schools and coaching centres across Alwar district — packed class-wise and delivered before the bell.",
      hi: "मार्च के एडमिशन पैम्फ़लेट से अगले मार्च के रिपोर्ट कार्ड तक, अलवर ज़िले के स्कूलों और कोचिंग सेंटरों का पूरा साल हम छापते हैं — क्लास-वार पैक, घंटी बजने से पहले डिलीवर।",
    },
    kit: ["school-diaries", "report-cards", "student-id-cards", "question-papers", "prospectus", "pamphlets-flyers"],
    why: [
      { en: "Confidential exam printing in sealed packets", hi: "सील पैकेट में गोपनीय परीक्षा छपाई" },
      { en: "ID cards printed straight from your Excel sheet", hi: "Excel शीट से सीधे आईडी कार्ड" },
      { en: "Session-start deadlines we actually meet", hi: "सेशन की डेडलाइन जो हम सच में निभाते हैं" },
    ],
    faqs: [
      {
        question: { en: "Can you keep question papers confidential?", hi: "क्या प्रश्न-पत्र गोपनीय रहेंगे?" },
        answer: {
          en: "Yes — files are handled only by the owner, printed in-house, packed in sealed envelopes and deleted after printing.",
          hi: "हाँ — फ़ाइल सिर्फ़ मालिक संभालते हैं, छपाई अपनी मशीन पर, सील लिफ़ाफ़ों में पैकिंग और छपाई के बाद फ़ाइल डिलीट।",
        },
      },
    ],
  },
  {
    slug: "clinics-hospitals",
    name: { en: "Clinics & Hospitals", hi: "क्लिनिक और अस्पताल" },
    colour: "cyan",
    tagline: { en: "Stationery that looks as careful as you are.", hi: "आपकी तरह सधी हुई स्टेशनरी।" },
    intro: {
      en: "Prescription pads, letterheads, patient files, room signage and health-camp flex — printed cleanly, numbered correctly and reordered in one WhatsApp message.",
      hi: "प्रिस्क्रिप्शन पैड, लेटरहेड, मरीज़ों की फ़ाइलें, कमरों के साइन और हेल्थ कैंप के फ्लेक्स — साफ़ छपाई, सही नंबरिंग, और एक WhatsApp मैसेज में दोबारा ऑर्डर।",
    },
    kit: ["visiting-cards", "letterheads", "bill-books", "vinyl-sunboard", "posters", "envelopes"],
    why: [
      { en: "Numbered pads and bill books with no gaps", hi: "बिना गड़बड़ी के नंबर वाले पैड और बिल बुक" },
      { en: "Sunboard room plates installed in Alwar", hi: "अलवर में सनबोर्ड प्लेटें लगाने की सुविधा" },
      { en: "Same design every reorder, stored for you", hi: "हर बार वही डिज़ाइन, हमारे पास सुरक्षित" },
    ],
    faqs: [
      {
        question: { en: "Can you print prescription pads with my registration number?", hi: "क्या मेरे रजिस्ट्रेशन नंबर वाले प्रिस्क्रिप्शन पैड छपेंगे?" },
        answer: {
          en: "Yes. Send your registration details and we'll set them with your clinic timings and logo; pads come in 50 or 100 sheets.",
          hi: "हाँ। रजिस्ट्रेशन की जानकारी भेजें, हम क्लिनिक के समय और लोगो के साथ सेट कर देंगे; पैड 50 या 100 पन्नों के आते हैं।",
        },
      },
    ],
  },
  {
    slug: "restaurants-cafes",
    name: { en: "Restaurants & Cafés", hi: "रेस्टोरेंट और कैफ़े" },
    colour: "red",
    tagline: { en: "Menus that survive the lunch rush.", hi: "ऐसे मेन्यू जो लंच की भीड़ झेल जाएँ।" },
    intro: {
      en: "Laminated menus, table tents, takeaway labels, paper bags and opening-day flex — on stocks chosen so oil and water wipe right off.",
      hi: "लैमिनेटेड मेन्यू, टेबल टेंट, टेकअवे लेबल, पेपर बैग और उद्घाटन के फ्लेक्स — ऐसे पेपर पर कि तेल और पानी पोंछते ही साफ़।",
    },
    kit: ["event-stationery", "danglers-table-tents", "labels-stickers", "paper-bags", "flex-banners", "pamphlets-flyers"],
    why: [
      { en: "Wipe-clean menu stocks and lamination", hi: "पोंछकर साफ़ होने वाले मेन्यू पेपर और लैमिनेशन" },
      { en: "Price updates reprinted within 24 hours", hi: "रेट बदले तो 24 घंटे में नया मेन्यू" },
      { en: "Delivery-ready labels and bags", hi: "डिलीवरी के लिए तैयार लेबल और बैग" },
    ],
    faqs: [
      {
        question: { en: "Which paper is best for menus?", hi: "मेन्यू के लिए कौन-सा पेपर सबसे अच्छा है?" },
        answer: {
          en: "300 GSM art card with matte lamination for handheld menus; for high-use tables we recommend thicker board or synthetic sheets.",
          hi: "हाथ वाले मेन्यू के लिए मैट लैमिनेशन के साथ 300 GSM आर्ट कार्ड; ज़्यादा इस्तेमाल वाली टेबल के लिए मोटा बोर्ड या सिंथेटिक शीट।",
        },
      },
    ],
  },
  {
    slug: "weddings-events",
    name: { en: "Weddings & Events", hi: "शादी और फ़ंक्शन" },
    colour: "foil",
    tagline: { en: "From the first card to the last menu.", hi: "पहले कार्ड से आख़िरी मेन्यू तक।" },
    intro: {
      en: "Invitations, shagun envelopes, ceremony cards, menus, name tags, welcome boards and photo gifts — designed as one set and printed under one roof.",
      hi: "कार्ड, शगुन लिफ़ाफ़े, सेरेमनी कार्ड, मेन्यू, नेम टैग, वेलकम बोर्ड और फ़ोटो गिफ़्ट — एक सेट में डिज़ाइन, एक ही छत के नीचे छपाई।",
    },
    kit: ["wedding-cards", "shagun-envelopes", "event-stationery", "flex-banners", "canvas-prints", "photo-mug"],
    why: [
      { en: "Hindi, English or bilingual designs", hi: "हिंदी, अंग्रेज़ी या दोनों भाषाओं में डिज़ाइन" },
      { en: "Laser-cut, foil and boxed options in-house", hi: "लेज़र-कट, फ़ॉइल और बॉक्स — सब अपनी प्रेस में" },
      { en: "Unlimited WhatsApp proof rounds", hi: "WhatsApp पर जितनी बार चाहें प्रूफ़" },
    ],
    faqs: [
      {
        question: { en: "How early should we order wedding cards?", hi: "शादी के कार्ड कितने दिन पहले ऑर्डर करें?" },
        answer: {
          en: "Three to four weeks before posting is comfortable. Printing itself takes 5–7 days after approval; laser-cut and boxed sets take a little longer.",
          hi: "बाँटने से तीन-चार हफ़्ते पहले आराम से रहता है। प्रूफ़ पास होने के बाद छपाई 5–7 दिन; लेज़र-कट और बॉक्स वाले थोड़े ज़्यादा।",
        },
      },
    ],
  },
  {
    slug: "real-estate",
    name: { en: "Real Estate", hi: "रियल एस्टेट" },
    colour: "blue",
    tagline: { en: "Site to sales office, one look.", hi: "साइट से सेल्स ऑफ़िस तक, एक जैसा लुक।" },
    intro: {
      en: "Project brochures, floor-plan inserts, site hoardings, standees and dealer visiting cards — consistent across every touchpoint of a launch.",
      hi: "प्रोजेक्ट ब्रोशर, फ़्लोर-प्लान इन्सर्ट, साइट होर्डिंग, स्टैंडी और डीलर के विज़िटिंग कार्ड — लॉन्च की हर जगह एक जैसा।",
    },
    kit: ["brochures", "flex-banners", "roll-up-standee", "visiting-cards", "catalogues-booklets", "corporate-diaries"],
    why: [
      { en: "Colour-matched across paper and flex", hi: "पेपर और फ्लेक्स में एक जैसे रंग" },
      { en: "Large hoardings printed and installed", hi: "बड़े होर्डिंग की छपाई और इंस्टॉलेशन" },
      { en: "Fast reprints when prices change", hi: "रेट बदलें तो तुरंत नई छपाई" },
    ],
    faqs: [
      {
        question: { en: "Can you print large site hoardings?", hi: "क्या बड़े साइट होर्डिंग छपते हैं?" },
        answer: {
          en: "Yes — up to 10 ft wide in one piece on our machine, and larger hoardings are printed in panels and joined on a frame.",
          hi: "हाँ — हमारी मशीन पर 10 फ़ुट चौड़ाई तक एक पीस में, और बड़े होर्डिंग पैनल में छापकर फ़्रेम पर जोड़े जाते हैं।",
        },
      },
    ],
  },
  {
    slug: "retail-shops",
    name: { en: "Retail Shops", hi: "दुकानें और शोरूम" },
    colour: "yellow",
    tagline: { en: "Make the counter work harder.", hi: "काउंटर से ज़्यादा बिक्री।" },
    intro: {
      en: "Shop boards, glow signs, offer danglers, bill books, carry bags, stickers and festival pamphlets — everything a shop needs to look busy and sell more.",
      hi: "दुकान के बोर्ड, ग्लो साइन, ऑफ़र वाले डैंगलर, बिल बुक, कैरी बैग, स्टिकर और त्योहार के पर्चे — दुकान को चमकाने और बिक्री बढ़ाने के लिए सब कुछ।",
    },
    kit: ["flex-banners", "backlit-flex", "bill-books", "paper-bags", "labels-stickers", "danglers-table-tents"],
    why: [
      { en: "Festival rush handled with extra shifts", hi: "त्योहार की भीड़ में एक्स्ट्रा शिफ़्ट" },
      { en: "GST bill books with correct numbering", hi: "सही नंबरिंग वाली GST बिल बुक" },
      { en: "Glow signs and flex installed locally", hi: "ग्लो साइन और फ्लेक्स अलवर में लगाकर" },
    ],
    faqs: [
      {
        question: { en: "Do you install shop boards?", hi: "क्या दुकान का बोर्ड लगाते भी हैं?" },
        answer: {
          en: "In Laxmangarh and nearby areas of Alwar district, yes — we measure, print and install flex, glow signs and one-way vision. Ask for an installation quote on WhatsApp.",
          hi: "लक्ष्मणगढ़ और अलवर ज़िले के आसपास के इलाकों में हाँ — नाप, छपाई और फ्लेक्स, ग्लो साइन व वन-वे विज़न लगाना, सब। इंस्टॉलेशन का रेट WhatsApp पर पूछें।",
        },
      },
    ],
  },
  {
    slug: "corporates-startups",
    name: { en: "Corporates & Startups", hi: "कंपनियाँ और स्टार्टअप" },
    colour: "magenta",
    tagline: { en: "Brand kits that ship on time.", hi: "समय पर पहुँचने वाली ब्रांड किट।" },
    intro: {
      en: "Onboarding kits, ID cards, event standees, diaries, calendars and branded T-shirts — for teams in Bhiwadi, Neemrana and Delhi NCR, with one GST invoice.",
      hi: "ऑनबोर्डिंग किट, आईडी कार्ड, इवेंट स्टैंडी, डायरी, कैलेंडर और ब्रांडेड टी-शर्ट — भिवाड़ी, नीमराना और दिल्ली NCR की टीमों के लिए, GST वाले एक बिल के साथ।",
    },
    kit: ["pvc-id-cards", "corporate-diaries", "calendars", "printed-tshirts", "roll-up-standee", "photo-mug"],
    why: [
      { en: "Brand colours matched across materials", hi: "हर मटीरियल पर ब्रांड के रंग एक जैसे" },
      { en: "Monthly billing for regular accounts", hi: "नियमित खातों के लिए मासिक बिलिंग" },
      { en: "Courier to your plant or office in 1–2 days", hi: "प्लांट या ऑफ़िस तक 1–2 दिन में कूरियर" },
    ],
    faqs: [
      {
        question: { en: "Can we get a monthly invoice?", hi: "क्या महीने का एक बिल मिल सकता है?" },
        answer: {
          en: "Yes — regular corporate accounts can be billed monthly against a PO. Send an enquiry with your company details.",
          hi: "हाँ — नियमित कॉर्पोरेट खातों को PO के आधार पर महीने में एक बिल दिया जा सकता है। कंपनी की जानकारी के साथ पूछताछ भेजें।",
        },
      },
    ],
  },
];

/** Illustrative Pexels photo per industry (public/images/stock, credits in sources.json). */
export const industryPhotos: Record<IndustrySlug, string> = {
  "schools-coaching": "exam-papers",
  "clinics-hospitals": "clinic-reception",
  "restaurants-cafes": "table-tent",
  "weddings-events": "wedding-invitations",
  "real-estate": "real-estate",
  "retail-shops": "shop-signage",
  "corporates-startups": "corporate-branding",
};

export function getIndustry(slug: string): Industry | undefined {
  return industries.find((i) => i.slug === slug);
}
