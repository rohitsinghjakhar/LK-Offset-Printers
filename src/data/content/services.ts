import type { InkColour, MockupKind } from "@/types/catalog";
import type { L } from "@/types/i18n";

export type Service = {
  slug: string;
  name: L;
  short: L;
  intro: L;
  colour: InkColour;
  mockup: MockupKind;
  /** siteConfig.machines id, if one machine does this job. */
  machine?: string;
  bestFor: L[];
  process: { title: L; body: L }[];
  products: string[];
  faqs: { question: L; answer: L }[];
};

export const services: Service[] = [
  {
    slug: "offset-printing",
    name: { en: "Offset printing", hi: "ऑफ़सेट प्रिंटिंग" },
    short: {
      en: "The cheapest way to print thousands, with colour that stays the same from the first sheet to the last.",
      hi: "हज़ारों कॉपी का सबसे सस्ता तरीका — पहली शीट से आख़िरी तक एक जैसा रंग।",
    },
    intro: {
      en: "Our Heidelberg four-colour press prints from metal plates, one ink at a time, at up to 15,000 sheets an hour. Once the plates are made, every extra copy costs very little — so from about 1,000 pieces, offset beats digital on price and on colour consistency.",
      hi: "हमारी हाइडलबर्ग 4-कलर मशीन मेटल प्लेट से, एक-एक स्याही करके, घंटे में 15,000 शीट तक छापती है। प्लेट बनने के बाद हर अतिरिक्त कॉपी बहुत सस्ती पड़ती है — इसलिए लगभग 1,000 पीस से ऊपर ऑफ़सेट, डिजिटल से सस्ता और रंग में ज़्यादा एक-सा रहता है।",
    },
    colour: "cyan",
    mockup: "trifold",
    machine: "heidelberg",
    bestFor: [
      { en: "1,000+ visiting cards, letterheads and bill books", hi: "1,000+ विज़िटिंग कार्ड, लेटरहेड और बिल बुक" },
      { en: "Brochures and catalogues with brand colours", hi: "ब्रांड रंगों वाले ब्रोशर और कैटलॉग" },
      { en: "Wedding cards in bulk", hi: "बड़ी संख्या में शादी के कार्ड" },
      { en: "Pamphlets from 5,000 to 50,000", hi: "5,000 से 50,000 तक पैम्फ़लेट" },
    ],
    process: [
      {
        title: { en: "Pre-press check", hi: "प्री-प्रेस जाँच" },
        body: {
          en: "We check bleed, fonts and colour mode, then send you a soft proof on WhatsApp.",
          hi: "ब्लीड, फ़ॉन्ट और कलर मोड जाँचकर WhatsApp पर सॉफ़्ट प्रूफ़ भेजते हैं।",
        },
      },
      {
        title: { en: "Plates", hi: "प्लेट" },
        body: {
          en: "Your approved file becomes four CTP plates — cyan, magenta, yellow and black.",
          hi: "अप्रूव फ़ाइल से चार CTP प्लेट बनती हैं — सियान, मैजेंटा, येलो और ब्लैक।",
        },
      },
      {
        title: { en: "Make-ready & press", hi: "मेक-रेडी और छपाई" },
        body: {
          en: "The operator matches colour on the first sheets, then the run goes through at full speed.",
          hi: "ऑपरेटर पहली शीटों पर रंग मिलाता है, फिर पूरी रफ़्तार से छपाई।",
        },
      },
      {
        title: { en: "Finishing", hi: "फ़िनिशिंग" },
        body: { en: "Lamination, cutting, creasing and binding happen in the same building.", hi: "लैमिनेशन, कटिंग, क्रीज़िंग और बाइंडिंग उसी बिल्डिंग में।" },
      },
    ],
    products: ["visiting-cards", "letterheads", "brochures", "pamphlets-flyers", "wedding-cards", "bill-books"],
    faqs: [
      {
        question: { en: "When should I choose offset over digital?", hi: "डिजिटल की जगह ऑफ़सेट कब चुनें?" },
        answer: {
          en: "Usually from around 1,000 copies of the same design. Below that, digital is faster and cheaper; we'll suggest the right one on your quote.",
          hi: "आमतौर पर एक ही डिज़ाइन की लगभग 1,000 कॉपी से ऊपर। उससे कम में डिजिटल तेज़ और सस्ता है; कोटेशन में हम सही विकल्प बताएँगे।",
        },
      },
      {
        question: { en: "Can you match my exact brand colour?", hi: "क्या मेरा ब्रांड रंग बिल्कुल वैसा ही आएगा?" },
        answer: {
          en: "Share the Pantone or CMYK value. We match it on press and can print a colour sample before the full run.",
          hi: "Pantone या CMYK वैल्यू भेजें। हम मशीन पर मिलाते हैं और पूरी छपाई से पहले सैंपल दे सकते हैं।",
        },
      },
    ],
  },
  {
    slug: "digital-printing",
    name: { en: "Digital printing", hi: "डिजिटल प्रिंटिंग" },
    short: {
      en: "Short runs and same-day jobs, with a different name on every card if you need it.",
      hi: "कम मात्रा और उसी दिन का काम — ज़रूरत हो तो हर कार्ड पर अलग नाम।",
    },
    intro: {
      en: "The Konica Minolta AccurioPress prints straight from your file, with no plates and no set-up waste. That makes it right for 50 visiting cards by this evening, 200 certificates with different names, or a sample before a bigger offset run.",
      hi: "कोनिका मिनोल्टा एक्यूरियोप्रेस सीधे आपकी फ़ाइल से छापती है — न प्लेट, न सेट-अप की बर्बादी। इसलिए शाम तक 50 विज़िटिंग कार्ड, अलग-अलग नाम वाले 200 सर्टिफ़िकेट, या बड़ी ऑफ़सेट छपाई से पहले सैंपल के लिए यही सही है।",
    },
    colour: "magenta",
    mockup: "business-cards",
    machine: "accurio",
    bestFor: [
      { en: "Same-day visiting cards", hi: "उसी दिन विज़िटिंग कार्ड" },
      { en: "Certificates and ID cards with variable names", hi: "अलग-अलग नाम वाले सर्टिफ़िकेट और आईडी कार्ड" },
      { en: "Menus, posters and invitations under 500 copies", hi: "500 से कम कॉपी के मेन्यू, पोस्टर और निमंत्रण" },
      { en: "Proof copies before a bulk order", hi: "बड़े ऑर्डर से पहले प्रूफ़ कॉपी" },
    ],
    process: [
      {
        title: { en: "File check", hi: "फ़ाइल जाँच" },
        body: { en: "Resolution and bleed are checked as soon as your file arrives.", hi: "फ़ाइल आते ही रेज़ोल्यूशन और ब्लीड की जाँच।" },
      },
      {
        title: { en: "Data merge", hi: "डेटा मर्ज" },
        body: { en: "Send an Excel sheet for names, roll numbers or QR codes on each piece.", hi: "हर पीस पर नाम, रोल नंबर या QR कोड के लिए Excel शीट भेजें।" },
      },
      {
        title: { en: "Print", hi: "छपाई" },
        body: { en: "80 pages a minute, with the colour calibrated every morning.", hi: "मिनट में 80 पेज, हर सुबह रंग कैलिब्रेट।" },
      },
      {
        title: { en: "Cut & pack", hi: "कटिंग और पैकिंग" },
        body: { en: "Trimmed, counted and packed, ready at the counter.", hi: "कटे, गिने और पैक — काउंटर पर तैयार।" },
      },
    ],
    products: ["visiting-cards", "school-certificates", "student-id-cards", "posters", "colour-prints", "event-stationery"],
    faqs: [
      {
        question: { en: "What is the cut-off for same-day printing?", hi: "उसी दिन छपाई के लिए कितने बजे तक ऑर्डर दें?" },
        answer: {
          en: "Approve your proof by 12 noon and standard visiting cards are ready the same evening.",
          hi: "दोपहर 12 बजे तक प्रूफ़ अप्रूव करें, स्टैंडर्ड विज़िटिंग कार्ड उसी शाम तैयार।",
        },
      },
    ],
  },
  {
    slug: "large-format",
    name: { en: "Large format & flex", hi: "लार्ज फ़ॉर्मेट और फ्लेक्स" },
    short: {
      en: "Flex, vinyl and backlit prints up to 10 feet wide and as long as your wall.",
      hi: "10 फ़ुट चौड़े और आपकी दीवार जितने लंबे फ्लेक्स, विनाइल और बैकलिट प्रिंट।",
    },
    intro: {
      en: "Shop boards, election hoardings, school gate banners and exhibition standees all come off our 10-ft eco-solvent printer. The inks are weather-resistant and low-odour, so the same print works outdoors in Alwar summers and inside an air-conditioned showroom.",
      hi: "दुकान के बोर्ड, होर्डिंग, स्कूल गेट के बैनर और प्रदर्शनी स्टैंडी — सब हमारे 10 फ़ुट के इको-सॉल्वेंट प्रिंटर से निकलते हैं। स्याही धूप-बारिश झेलती है और गंध कम होती है, इसलिए अलवर की गर्मी में बाहर और AC शोरूम के अंदर, दोनों जगह चलती है।",
    },
    colour: "yellow",
    mockup: "flex-roll",
    machine: "eco-solvent",
    bestFor: [
      { en: "Shop boards and hoardings", hi: "दुकान के बोर्ड और होर्डिंग" },
      { en: "Roll-up standees for events", hi: "इवेंट के लिए रोल-अप स्टैंडी" },
      { en: "Glass branding with one-way vision", hi: "वन-वे विज़न से शीशे पर ब्रांडिंग" },
      { en: "Backlit signs for night visibility", hi: "रात में दिखने वाले बैकलिट साइन" },
    ],
    process: [
      {
        title: { en: "Measure", hi: "नाप" },
        body: {
          en: "Tell us the size in feet — or we visit and measure in and around Laxmangarh.",
          hi: "फ़ुट में साइज़ बताएँ — या लक्ष्मणगढ़ और आसपास हम आकर नाप लेते हैं।",
        },
      },
      {
        title: { en: "Design at scale", hi: "बड़े साइज़ का डिज़ाइन" },
        body: { en: "We check that text reads from the road, not just on your phone.", hi: "जाँचते हैं कि टेक्स्ट सड़क से पढ़ा जाए, सिर्फ़ फ़ोन पर नहीं।" },
      },
      {
        title: { en: "Print", hi: "छपाई" },
        body: { en: "Up to 450 sq ft an hour, dried before it is rolled.", hi: "घंटे में 450 वर्ग फ़ुट तक, रोल करने से पहले सुखाया जाता है।" },
      },
      {
        title: { en: "Eyelets & fitting", hi: "आईलेट और फ़िटिंग" },
        body: { en: "Pasting, framing and on-site fitting on request.", hi: "मांग पर चिपकाना, फ़्रेमिंग और साइट पर फ़िटिंग।" },
      },
    ],
    products: ["flex-banners", "vinyl-sunboard", "roll-up-standee", "one-way-vision", "backlit-flex", "canvas-prints"],
    faqs: [
      {
        question: { en: "What resolution does a flex banner need?", hi: "फ्लेक्स बैनर के लिए कितना रेज़ोल्यूशन चाहिए?" },
        answer: {
          en: "Less than you think: 72–100 DPI at full size is fine because banners are viewed from a distance. Send what you have and we'll tell you if it holds up.",
          hi: "जितना आप सोचते हैं उससे कम: पूरे साइज़ पर 72–100 DPI काफ़ी है, क्योंकि बैनर दूर से देखे जाते हैं। जो फ़ाइल है भेजें, हम बता देंगे।",
        },
      },
    ],
  },
  {
    slug: "laser-cutting",
    name: { en: "Laser cutting & engraving", hi: "लेज़र कटिंग और नक्काशी" },
    short: {
      en: "Lace-fine wedding cards, acrylic name boards and engraved wooden gifts.",
      hi: "जाली जैसे बारीक शादी कार्ड, एक्रेलिक नेम-बोर्ड और लकड़ी पर नक्काशी वाले गिफ़्ट।",
    },
    intro: {
      en: "Our CO₂ laser cuts paper, acrylic, MDF and leatherette to a fraction of a millimetre. It is how we make jaali-cut wedding cards, office name plates, award trophies and engraved gifts — all designed and cut in-house.",
      hi: "हमारा CO₂ लेज़र कागज़, एक्रेलिक, MDF और लेदरेट को मिलीमीटर के हिस्से तक सटीक काटता है। जाली-कट शादी कार्ड, ऑफ़िस नेम-प्लेट, ट्रॉफ़ी और नक्काशी वाले गिफ़्ट ऐसे ही बनते हैं — डिज़ाइन से कटिंग तक, सब अपने यहाँ।",
    },
    colour: "green",
    mockup: "wedding-card",
    machine: "laser",
    bestFor: [
      { en: "Laser-cut wedding card jackets", hi: "लेज़र-कट शादी कार्ड जैकेट" },
      { en: "Acrylic signage and name plates", hi: "एक्रेलिक साइनेज और नेम-प्लेट" },
      { en: "Engraved trophies and corporate gifts", hi: "नक्काशी वाली ट्रॉफ़ी और कॉर्पोरेट गिफ़्ट" },
      { en: "Custom packaging inserts", hi: "कस्टम पैकेजिंग इन्सर्ट" },
    ],
    process: [
      {
        title: { en: "Vector file", hi: "वेक्टर फ़ाइल" },
        body: { en: "We turn your design into cut lines, or draw them for you.", hi: "आपके डिज़ाइन को कट-लाइन में बदलते हैं, या खुद बनाते हैं।" },
      },
      {
        title: { en: "Material test", hi: "मटीरियल टेस्ट" },
        body: { en: "A test cut sets speed and power for that exact sheet.", hi: "टेस्ट कट से उसी शीट के लिए स्पीड और पावर तय होती है।" },
      },
      { title: { en: "Cut or engrave", hi: "कटिंग या नक्काशी" }, body: { en: "Up to 130 × 90 cm per sheet.", hi: "एक शीट में 130 × 90 सेमी तक।" } },
      {
        title: { en: "Clean & assemble", hi: "सफ़ाई और असेंबली" },
        body: { en: "Edges cleaned, parts assembled and packed by hand.", hi: "किनारों की सफ़ाई, जोड़ना और हाथ से पैकिंग।" },
      },
    ],
    products: ["wedding-cards", "shagun-envelopes", "keychains", "photo-frames"],
    faqs: [
      {
        question: { en: "Which materials can you cut?", hi: "किन चीज़ों पर कटिंग हो सकती है?" },
        answer: {
          en: "Card and paper up to 600 GSM, acrylic up to 8 mm, MDF up to 6 mm, leatherette and fabric. We don't cut metal or PVC.",
          hi: "600 GSM तक कार्ड और कागज़, 8 मिमी तक एक्रेलिक, 6 मिमी तक MDF, लेदरेट और कपड़ा। धातु और PVC नहीं काटते।",
        },
      },
    ],
  },
  {
    slug: "sublimation",
    name: { en: "Sublimation & merchandise", hi: "सब्लिमेशन और मर्चेंडाइज़" },
    short: {
      en: "Photo mugs, T-shirts and cushions that survive the dishwasher and the washing machine.",
      hi: "फ़ोटो मग, टी-शर्ट और कुशन — जो डिशवॉशर और वॉशिंग मशीन झेल जाएँ।",
    },
    intro: {
      en: "Sublimation turns ink into gas under heat and presses it into the surface itself, so the print doesn't crack or peel. We use it for gifting, team T-shirts, corporate welcome kits and one-off birthday mugs alike.",
      hi: "सब्लिमेशन में गर्मी से स्याही भाप बनकर सतह के अंदर बैठ जाती है, इसलिए प्रिंट न फटता है न उखड़ता है। गिफ़्ट, टीम टी-शर्ट, कॉर्पोरेट वेलकम किट और जन्मदिन के एक मग — सबके लिए यही तरीका।",
    },
    colour: "red",
    mockup: "mug",
    machine: "sublimation",
    bestFor: [
      { en: "Photo gifts, from one piece", hi: "फ़ोटो गिफ़्ट, एक पीस से भी" },
      { en: "Event and team T-shirts", hi: "इवेंट और टीम टी-शर्ट" },
      { en: "Corporate welcome kits", hi: "कॉर्पोरेट वेलकम किट" },
      { en: "Branded keychains and calendars", hi: "ब्रांडेड की-चेन और कैलेंडर" },
    ],
    process: [
      {
        title: { en: "Photo check", hi: "फ़ोटो जाँच" },
        body: { en: "We crop and colour-correct your photo for the product.", hi: "प्रोडक्ट के हिसाब से फ़ोटो क्रॉप और कलर-करेक्ट।" },
      },
      {
        title: { en: "Transfer print", hi: "ट्रांसफ़र प्रिंट" },
        body: { en: "Mirrored print on sublimation paper.", hi: "सब्लिमेशन पेपर पर उल्टा (मिरर) प्रिंट।" },
      },
      {
        title: { en: "Heat press", hi: "हीट प्रेस" },
        body: { en: "Pressed at around 200°C for the time each item needs.", hi: "हर चीज़ के हिसाब से लगभग 200°C पर दबाया जाता है।" },
      },
      {
        title: { en: "Quality check", hi: "क्वालिटी जाँच" },
        body: { en: "Every piece is inspected before it is boxed.", hi: "डिब्बे में रखने से पहले हर पीस की जाँच।" },
      },
    ],
    products: ["photo-mug", "printed-tshirts", "photo-cushions", "keychains", "calendars", "corporate-diaries"],
    faqs: [
      {
        question: { en: "Can I order just one mug?", hi: "क्या सिर्फ़ एक मग मँगा सकते हैं?" },
        answer: { en: "Yes. Single photo gifts are usually ready in 24 hours.", hi: "हाँ। एक फ़ोटो गिफ़्ट आमतौर पर 24 घंटे में तैयार।" },
      },
    ],
  },
  {
    slug: "design-studio",
    name: { en: "Design studio", hi: "डिज़ाइन स्टूडियो" },
    short: {
      en: "No file? Our designers make one — logos, cards, menus and invitations — before it goes to press.",
      hi: "फ़ाइल नहीं है? हमारे डिज़ाइनर बना देंगे — लोगो, कार्ड, मेन्यू, निमंत्रण — छपाई से पहले।",
    },
    intro: {
      en: "Half our customers walk in with an idea, not a file. Our in-house designers work in English and Hindi, know what prints well on each machine, and send drafts on WhatsApp until you're happy. Basic layouts start at ₹299; complete brand work from ₹999.",
      hi: "हमारे आधे ग्राहक फ़ाइल नहीं, बस एक आइडिया लेकर आते हैं। हमारे डिज़ाइनर हिंदी और अंग्रेज़ी दोनों में काम करते हैं, जानते हैं कि किस मशीन पर क्या अच्छा छपता है, और आपकी पसंद आने तक WhatsApp पर ड्राफ़्ट भेजते हैं। बेसिक लेआउट ₹299 से; पूरा ब्रांड काम ₹999 से।",
    },
    colour: "blue",
    mockup: "letterhead",
    bestFor: [
      { en: "New shop logos and visiting cards", hi: "नई दुकान के लोगो और विज़िटिंग कार्ड" },
      { en: "Menus and price lists", hi: "मेन्यू और रेट लिस्ट" },
      { en: "Wedding invitations in Hindi and English", hi: "हिंदी और अंग्रेज़ी में शादी के निमंत्रण" },
      { en: "Fixing files that won't print right", hi: "जो फ़ाइल ठीक से नहीं छप रही, उसे सुधारना" },
    ],
    process: [
      {
        title: { en: "Brief", hi: "ब्रीफ़" },
        body: {
          en: "Tell us on WhatsApp or at the counter — photos of references help.",
          hi: "WhatsApp या काउंटर पर बताएँ — पसंद के नमूनों की फ़ोटो मदद करती है।",
        },
      },
      { title: { en: "First draft", hi: "पहला ड्राफ़्ट" }, body: { en: "Usually within one working day.", hi: "आमतौर पर एक कार्य दिवस में।" } },
      {
        title: { en: "Revisions", hi: "बदलाव" },
        body: { en: "Two rounds included on basic, unlimited on premium.", hi: "बेसिक में दो बार बदलाव, प्रीमियम में असीमित।" },
      },
      {
        title: { en: "Print-ready file", hi: "प्रिंट-रेडी फ़ाइल" },
        body: { en: "You get the final PDF to keep, even if you print elsewhere.", hi: "फ़ाइनल PDF आपको मिलती है, चाहे कहीं भी छपवाएँ।" },
      },
    ],
    products: ["visiting-cards", "letterheads", "wedding-cards", "pamphlets-flyers", "flex-banners", "labels-stickers"],
    faqs: [
      {
        question: { en: "Do I own the design?", hi: "क्या डिज़ाइन मेरा होगा?" },
        answer: { en: "Yes. Once paid, the final files are yours to use anywhere.", hi: "हाँ। भुगतान के बाद फ़ाइनल फ़ाइलें आपकी, कहीं भी इस्तेमाल करें।" },
      },
    ],
  },
];

export function getService(slug: string): Service | undefined {
  return services.find((s) => s.slug === slug);
}
