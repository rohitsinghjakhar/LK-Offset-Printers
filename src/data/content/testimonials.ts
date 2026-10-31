import type { L } from "@/types/i18n";

export type Testimonial = {
  id: string;
  name: string;
  business: L;
  city: L;
  rating: number;
  quote: L;
  product: L;
};

export const testimonials: Testimonial[] = [
  {
    id: "t1",
    name: "Sunil Khandelwal",
    business: { en: "Khandelwal Sweets", hi: "खंडेलवाल मिष्ठान भंडार" },
    city: { en: "Alwar", hi: "अलवर" },
    rating: 5,
    quote: {
      en: "Diwali boxes, 4,000 of them, delivered two days early. The gold foil on our logo looks better than the Jaipur supplier we used for years.",
      hi: "दिवाली के 4,000 डिब्बे, दो दिन पहले डिलीवर। लोगो पर गोल्ड फ़ॉइल तो जयपुर वाले पुराने सप्लायर से भी बढ़िया आई।",
    },
    product: { en: "Sweet boxes", hi: "मिठाई के डिब्बे" },
  },
  {
    id: "t2",
    name: "Dr. Neha Agarwal",
    business: { en: "Agarwal Dental Care", hi: "अग्रवाल डेंटल केयर" },
    city: { en: "Alwar", hi: "अलवर" },
    rating: 5,
    quote: {
      en: "They sent the proof on WhatsApp within an hour and caught a wrong digit in my phone number. That alone saved me a thousand cards.",
      hi: "एक घंटे में WhatsApp पर प्रूफ़ आ गया और मेरे फ़ोन नंबर की एक गलत डिजिट भी पकड़ ली। उसी से हज़ार कार्ड बर्बाद होने से बच गए।",
    },
    product: { en: "Visiting cards + letterheads", hi: "विज़िटिंग कार्ड + लेटरहेड" },
  },
  {
    id: "t3",
    name: "Ramesh Yadav",
    business: { en: "Yadav Coaching Classes", hi: "यादव कोचिंग क्लासेज़" },
    city: { en: "Behror", hi: "बहरोड़" },
    rating: 5,
    quote: {
      en: "Twenty thousand pamphlets for our admission drive, printed overnight. The rate was fair and the colours matched our banner exactly.",
      hi: "एडमिशन के लिए बीस हज़ार पैम्फ़लेट रातों-रात छप गए। रेट भी सही था और रंग हमारे बैनर से एकदम मैच।",
    },
    product: { en: "Pamphlets", hi: "पैम्फ़लेट" },
  },
  {
    id: "t4",
    name: "Priya & Karan Mehta",
    business: { en: "Wedding, Feb 2026", hi: "शादी, फ़रवरी 2026" },
    city: { en: "Jaipur", hi: "जयपुर" },
    rating: 5,
    quote: {
      en: "Our laser-cut cards came out exactly like the design. Relatives are still asking where we got them printed.",
      hi: "लेज़र-कट कार्ड बिल्कुल डिज़ाइन जैसे बने। रिश्तेदार आज तक पूछते हैं कि कहाँ से छपवाए।",
    },
    product: { en: "Wedding cards", hi: "शादी के कार्ड" },
  },
  {
    id: "t5",
    name: "Imran Qureshi",
    business: { en: "Qureshi Motors", hi: "क़ुरैशी मोटर्स" },
    city: { en: "Bhiwadi", hi: "भिवाड़ी" },
    rating: 4,
    quote: {
      en: "Needed a 20-foot flex for our showroom opening on a Saturday. Ordered Friday afternoon, it was up by 10 AM. Seamless, no joints.",
      hi: "शोरूम के उद्घाटन के लिए शनिवार को 20 फ़ुट का फ्लेक्स चाहिए था। शुक्रवार दोपहर ऑर्डर किया, सुबह 10 बजे तक लग गया। बिना जोड़ के।",
    },
    product: { en: "Flex banner", hi: "फ्लेक्स बैनर" },
  },
  {
    id: "t6",
    name: "Sr. Mary Thomas",
    business: { en: "St. Anne's Convent School", hi: "सेंट ऐन्स कॉन्वेंट स्कूल" },
    city: { en: "Alwar", hi: "अलवर" },
    rating: 5,
    quote: {
      en: "Eight years of school diaries and report cards. Every session they arrive before the first day, packed class-wise.",
      hi: "आठ साल से स्कूल डायरी और रिपोर्ट कार्ड यहीं से। हर सेशन पहले दिन से पहले, क्लास-वार पैक होकर आ जाते हैं।",
    },
    product: { en: "School diaries", hi: "स्कूल डायरी" },
  },
  {
    id: "t7",
    name: "Ankit Jain",
    business: { en: "Ghar Ka Swad (D2C pickles)", hi: "घर का स्वाद (अचार ब्रांड)" },
    city: { en: "Delhi NCR", hi: "दिल्ली NCR" },
    rating: 5,
    quote: {
      en: "Waterproof labels that survive the fridge and the oil. We reorder every month by WhatsApp and it's couriered to Gurugram in two days.",
      hi: "वॉटरप्रूफ़ लेबल जो फ्रिज और तेल दोनों झेल जाते हैं। हर महीने WhatsApp पर दोबारा ऑर्डर करते हैं, दो दिन में गुरुग्राम पहुँच जाता है।",
    },
    product: { en: "Labels & stickers", hi: "लेबल और स्टिकर" },
  },
  {
    id: "t8",
    name: "Vikram Singh Shekhawat",
    business: { en: "Shekhawat Realty", hi: "शेखावत रियल्टी" },
    city: { en: "Alwar", hi: "अलवर" },
    rating: 5,
    quote: {
      en: "Brochures, standees and site boards for our new project — one vendor, one invoice with GST, and everything matched perfectly.",
      hi: "नए प्रोजेक्ट के ब्रोशर, स्टैंडी और साइट बोर्ड — एक ही जगह, GST वाला एक बिल, और सब कुछ एक जैसा।",
    },
    product: { en: "Brochures + standees", hi: "ब्रोशर + स्टैंडी" },
  },
  {
    id: "t9",
    name: "Pooja Sharma",
    business: { en: "Chai Adda Café", hi: "चाय अड्डा कैफ़े" },
    city: { en: "Alwar", hi: "अलवर" },
    rating: 5,
    quote: {
      en: "Menu cards, table tents and paper cups sleeves — they even suggested a better paper so the menus don't get oily. Small shop, big help.",
      hi: "मेन्यू कार्ड, टेबल टेंट और कप स्लीव — उन्होंने बेहतर पेपर भी सुझाया ताकि मेन्यू पर तेल के दाग़ न लगें। छोटी दुकान, बड़ी मदद।",
    },
    product: { en: "Menu cards", hi: "मेन्यू कार्ड" },
  },
];
