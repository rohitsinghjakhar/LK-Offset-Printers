import type { IndustrySlug, InkColour, MockupKind } from "@/types/catalog";
import type { L } from "@/types/i18n";

export type CaseStudy = {
  slug: string;
  client: L;
  clientType: L;
  industry: IndustrySlug;
  title: L;
  printed: L;
  quantity: L;
  turnaround: L;
  colour: InkColour;
  mockup: MockupKind;
  brief: L;
  solution: L;
  result: L;
  specs: { label: L; value: L }[];
  products: string[];
  images?: string[];
};

export const caseStudies: CaseStudy[] = [
  {
    slug: "st-annes-school-session-kit",
    client: { en: "St. Anne's Convent School", hi: "सेंट ऐन्स कॉन्वेंट स्कूल" },
    clientType: { en: "School, 1,800 students", hi: "स्कूल, 1,800 बच्चे" },
    industry: "schools-coaching",
    title: { en: "A full session kit, before day one", hi: "पूरे सेशन की किट, पहले दिन से पहले" },
    printed: { en: "Diaries, report cards, ID cards", hi: "डायरी, रिपोर्ट कार्ड, आईडी कार्ड" },
    quantity: { en: "1,800 kits", hi: "1,800 किट" },
    turnaround: { en: "9 days", hi: "9 दिन" },
    colour: "green",
    mockup: "school-diary",
    brief: {
      en: "The school needed diaries with a new rules section, report cards in the updated CBSE format and PVC ID cards for every student — all class-wise, before the new session.",
      hi: "स्कूल को नए नियमों वाली डायरी, CBSE के नए फ़ॉर्मेट में रिपोर्ट कार्ड और हर बच्चे के लिए PVC आईडी कार्ड चाहिए थे — सब क्लास-वार, नए सेशन से पहले।",
    },
    solution: {
      en: "We laid out the 200-page diary in-house, printed covers on the Heidelberg and inner pages in two colours, and generated 1,800 ID cards from the school's Excel sheet with photos matched by admission number.",
      hi: "200 पेज की डायरी का लेआउट हमने ख़ुद बनाया, कवर हाइडलबर्ग पर और अंदर के पेज दो रंगों में छापे, और स्कूल की Excel शीट से एडमिशन नंबर के हिसाब से फ़ोटो मिलाकर 1,800 आईडी कार्ड बनाए।",
    },
    result: {
      en: "Delivered packed by class and section three days before the session. Zero reprints on ID cards.",
      hi: "सेशन से तीन दिन पहले क्लास और सेक्शन के हिसाब से पैक करके डिलीवर। आईडी कार्ड में एक भी दोबारा छपाई नहीं।",
    },
    specs: [
      { label: { en: "Diary", hi: "डायरी" }, value: { en: "200 pp, hard bound, 2-colour", hi: "200 पेज, हार्ड बाउंड, 2 रंग" } },
      { label: { en: "ID cards", hi: "आईडी कार्ड" }, value: { en: "PVC, double side, lanyard", hi: "PVC, दोनों तरफ़, लैनयार्ड" } },
      { label: { en: "Report cards", hi: "रिपोर्ट कार्ड" }, value: { en: "250 GSM, 8 pages", hi: "250 GSM, 8 पेज" } },
    ],
    products: ["school-diaries", "student-id-cards", "report-cards"],
  },
  {
    slug: "khandelwal-sweets-diwali",
    client: { en: "Khandelwal Sweets", hi: "खंडेलवाल मिष्ठान भंडार" },
    clientType: { en: "Sweet shop, 3 outlets", hi: "मिठाई की दुकान, 3 आउटलेट" },
    industry: "retail-shops",
    title: { en: "Diwali boxes that sell the mithai", hi: "दिवाली के डिब्बे जो मिठाई बेच दें" },
    printed: { en: "Sweet boxes with gold foil", hi: "गोल्ड फ़ॉइल वाले मिठाई के डिब्बे" },
    quantity: { en: "4,000 boxes", hi: "4,000 डिब्बे" },
    turnaround: { en: "6 days", hi: "6 दिन" },
    colour: "red",
    mockup: "sweet-box",
    brief: {
      en: "A festive box for 500 g and 1 kg gift packs that looked premium on the counter but stayed within the shop's per-box budget.",
      hi: "500 ग्राम और 1 किलो गिफ़्ट पैक के लिए त्योहारी डिब्बा, जो काउंटर पर प्रीमियम लगे पर दुकान के बजट में रहे।",
    },
    solution: {
      en: "Deep red food-grade board with a single gold-foil border and logo, plus a clear window on the 500 g size so the kaju katli shows through.",
      hi: "गहरे लाल फ़ूड-ग्रेड बोर्ड पर सिर्फ़ बॉर्डर और लोगो में गोल्ड फ़ॉइल, और 500 ग्राम वाले में पारदर्शी विंडो ताकि काजू कतली दिखे।",
    },
    result: {
      en: "Delivered two days before Dhanteras; the shop reordered 1,500 more in the same week.",
      hi: "धनतेरस से दो दिन पहले डिलीवर; उसी हफ़्ते दुकान ने 1,500 और मँगवाए।",
    },
    specs: [
      { label: { en: "Board", hi: "बोर्ड" }, value: { en: "Food-grade 350 GSM", hi: "फ़ूड-ग्रेड 350 GSM" } },
      { label: { en: "Finish", hi: "फ़िनिश" }, value: { en: "Gold foil + window", hi: "गोल्ड फ़ॉइल + विंडो" } },
    ],
    products: ["sweet-boxes", "paper-bags", "labels-stickers"],
  },
  {
    slug: "riya-arjun-wedding",
    client: { en: "Riya & Arjun", hi: "रिया और अर्जुन" },
    clientType: { en: "Wedding, 650 guests", hi: "शादी, 650 मेहमान" },
    industry: "weddings-events",
    title: { en: "Laser-cut jaali, foil and a shagun set", hi: "लेज़र-कट जाली, फ़ॉइल और शगुन सेट" },
    printed: { en: "Wedding cards, shagun envelopes, menus", hi: "शादी के कार्ड, शगुन लिफ़ाफ़े, मेन्यू" },
    quantity: { en: "650 sets", hi: "650 सेट" },
    turnaround: { en: "7 days", hi: "7 दिन" },
    colour: "foil",
    mockup: "wedding-card",
    brief: {
      en: "A bilingual invitation with a Rajasthani jaali motif, matching shagun envelopes and reception menus — all in the family's maroon and gold.",
      hi: "राजस्थानी जाली डिज़ाइन वाला हिंदी-अंग्रेज़ी कार्ड, मैचिंग शगुन लिफ़ाफ़े और रिसेप्शन मेन्यू — सब परिवार के मरून और सुनहरे रंग में।",
    },
    solution: {
      en: "Our studio drew the jaali as a vector, cut it on the CO₂ laser over a foil-printed inner card, and set the Hindi in a classical Devanagari face.",
      hi: "हमारे स्टूडियो ने जाली को वेक्टर में बनाया, फ़ॉइल छपे अंदर वाले कार्ड के ऊपर CO₂ लेज़र से काटा, और हिंदी को क्लासिक देवनागरी फ़ॉन्ट में सेट किया।",
    },
    result: {
      en: "Three proof rounds on WhatsApp, printed in a week, and 40 extra cards ordered because guests kept asking.",
      hi: "WhatsApp पर तीन बार प्रूफ़, एक हफ़्ते में छपाई, और मेहमानों के कहने पर 40 कार्ड और मँगवाए।",
    },
    specs: [
      { label: { en: "Card", hi: "कार्ड" }, value: { en: "Textured 300 GSM, laser-cut", hi: "टेक्सचर 300 GSM, लेज़र-कट" } },
      { label: { en: "Foil", hi: "फ़ॉइल" }, value: { en: "Gold, 2 passes", hi: "गोल्ड, 2 बार" } },
    ],
    products: ["wedding-cards", "shagun-envelopes", "event-stationery"],
  },
  {
    slug: "qureshi-motors-launch",
    client: { en: "Qureshi Motors", hi: "क़ुरैशी मोटर्स" },
    clientType: { en: "Two-wheeler showroom", hi: "टू-व्हीलर शोरूम" },
    industry: "retail-shops",
    title: { en: "A showroom launch, overnight", hi: "रातों-रात शोरूम लॉन्च" },
    printed: { en: "20-ft flex, standees, danglers", hi: "20 फ़ुट फ्लेक्स, स्टैंडी, डैंगलर" },
    quantity: { en: "1 flex · 4 standees · 200 danglers", hi: "1 फ्लेक्स · 4 स्टैंडी · 200 डैंगलर" },
    turnaround: { en: "18 hours", hi: "18 घंटे" },
    colour: "cyan",
    mockup: "flex-roll",
    brief: {
      en: "Launch branding for a Saturday opening, with the final offer confirmed by the brand only on Friday afternoon.",
      hi: "शनिवार के उद्घाटन की ब्रांडिंग, जबकि कंपनी ने फ़ाइनल ऑफ़र शुक्रवार दोपहर को ही कन्फ़र्म किया।",
    },
    solution: {
      en: "A seamless 20 × 8 ft star flex printed on the 10-ft machine in two panels, plus roll-up standees and ceiling danglers — installed at 9 AM.",
      hi: "10 फ़ुट मशीन पर 20 × 8 फ़ुट का स्टार फ्लेक्स, साथ में रोल-अप स्टैंडी और छत के डैंगलर — सुबह 9 बजे लगा दिए।",
    },
    result: {
      en: "Everything up before the ribbon-cutting. The showroom now orders every festival campaign from us.",
      hi: "फ़ीता कटने से पहले सब तैयार। अब शोरूम हर त्योहार की कैंपेन हमसे ही छपवाता है।",
    },
    specs: [
      { label: { en: "Flex", hi: "फ्लेक्स" }, value: { en: "Star flex 380 GSM, 20 × 8 ft", hi: "स्टार फ्लेक्स 380 GSM, 20 × 8 फ़ुट" } },
      { label: { en: "Standees", hi: "स्टैंडी" }, value: { en: "6 × 3 ft, premium base", hi: "6 × 3 फ़ुट, प्रीमियम बेस" } },
    ],
    products: ["flex-banners", "roll-up-standee", "danglers-table-tents"],
  },
  {
    slug: "agarwal-dental-identity",
    client: { en: "Agarwal Dental Care", hi: "अग्रवाल डेंटल केयर" },
    clientType: { en: "Dental clinic", hi: "डेंटल क्लिनिक" },
    industry: "clinics-hospitals",
    title: { en: "A calm, clean clinic identity", hi: "शांत और साफ़-सुथरी क्लिनिक पहचान" },
    printed: { en: "Cards, letterheads, prescription pads, signage", hi: "कार्ड, लेटरहेड, प्रिस्क्रिप्शन पैड, साइनबोर्ड" },
    quantity: { en: "11 items", hi: "11 आइटम" },
    turnaround: { en: "5 days", hi: "5 दिन" },
    colour: "magenta",
    mockup: "business-cards",
    brief: {
      en: "A new clinic wanted everything from visiting cards to room signs to feel consistent and trustworthy, without looking like a hospital.",
      hi: "नए क्लिनिक को विज़िटिंग कार्ड से कमरों के साइन तक सब कुछ एक जैसा और भरोसेमंद चाहिए था, पर अस्पताल जैसा नहीं।",
    },
    solution: {
      en: "Logo refresh, velvet-touch visiting cards with spot UV, bond letterheads, numbered prescription pads and vinyl-on-sunboard room plates.",
      hi: "लोगो में सुधार, स्पॉट UV वाले वेलवेट विज़िटिंग कार्ड, बॉन्ड लेटरहेड, नंबर वाले प्रिस्क्रिप्शन पैड और सनबोर्ड पर विनाइल वाली कमरों की प्लेटें।",
    },
    result: {
      en: "One consistent look across 11 items, delivered in five days with a single GST invoice.",
      hi: "11 आइटम में एक जैसा लुक, पाँच दिन में डिलीवर, GST वाला एक ही बिल।",
    },
    specs: [
      { label: { en: "Cards", hi: "कार्ड" }, value: { en: "350 GSM velvet + spot UV", hi: "350 GSM वेलवेट + स्पॉट UV" } },
      { label: { en: "Signage", hi: "साइन" }, value: { en: "Vinyl on 5 mm sunboard", hi: "5 mm सनबोर्ड पर विनाइल" } },
    ],
    products: ["visiting-cards", "letterheads", "vinyl-sunboard"],
  },
  {
    slug: "ghar-ka-swad-labels",
    client: { en: "Ghar Ka Swad", hi: "घर का स्वाद" },
    clientType: { en: "D2C pickle brand", hi: "ऑनलाइन अचार ब्रांड" },
    industry: "corporates-startups",
    title: { en: "Labels that survive oil and the fridge", hi: "तेल और फ्रिज झेलने वाले लेबल" },
    printed: { en: "Waterproof jar labels, hang tags, cartons", hi: "वॉटरप्रूफ़ जार लेबल, हैंग टैग, कार्टन" },
    quantity: { en: "12,000 labels / month", hi: "12,000 लेबल / महीना" },
    turnaround: { en: "3 days, monthly", hi: "3 दिन, हर महीने" },
    colour: "yellow",
    mockup: "label-roll",
    brief: {
      en: "Paper labels were peeling and smudging with oil. The brand needed durable labels for six flavours, delivered monthly to Gurugram.",
      hi: "पेपर लेबल तेल से फैल रहे थे और उखड़ रहे थे। ब्रांड को छह फ़्लेवर के मज़बूत लेबल चाहिए थे, हर महीने गुरुग्राम पहुँचाने।",
    },
    solution: {
      en: "White vinyl labels with a matte laminate on rolls for their applicator, colour-coded per flavour, plus kraft hang tags for gift jars.",
      hi: "उनकी मशीन के लिए रोल पर मैट लैमिनेट वाले सफ़ेद विनाइल लेबल, हर फ़्लेवर का अलग रंग, और गिफ़्ट जार के लिए क्राफ़्ट हैंग टैग।",
    },
    result: {
      en: "No more peeling complaints; reorders happen on WhatsApp and reach Gurugram in two days.",
      hi: "लेबल उखड़ने की शिकायतें ख़त्म; दोबारा ऑर्डर WhatsApp पर होते हैं और दो दिन में गुरुग्राम पहुँचते हैं।",
    },
    specs: [
      { label: { en: "Labels", hi: "लेबल" }, value: { en: "Vinyl, matte laminate, roll", hi: "विनाइल, मैट लैमिनेट, रोल" } },
      { label: { en: "Delivery", hi: "डिलीवरी" }, value: { en: "Courier, Gurugram", hi: "कूरियर, गुरुग्राम" } },
    ],
    products: ["labels-stickers", "hang-tags", "mono-cartons"],
  },
];
