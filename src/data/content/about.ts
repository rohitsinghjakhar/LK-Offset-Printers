import type { InkColour } from "@/types/catalog";
import type { L } from "@/types/i18n";

/** Owner-editable About page copy. Team entries are roles; add names and photos when ready. */
export const story: L[] = [
  {
    en: "L.K. Offset Printers was founded by Mahendra Choudhary, who has spent more than 15 years in the printing trade. It started in 2010 as a single photocopy counter on Kathumar Road, Laxmangarh. Most of our first customers were students with project files and shopkeepers who needed a bill book by Monday.",
    hi: "एल.के. ऑफ़सेट प्रिंटर्स की स्थापना महेंद्र चौधरी ने की, जिन्हें प्रिंटिंग के काम में 15 वर्षों से ज़्यादा का अनुभव है। यह 2010 में पंचायत समिति के सामने, कठूमर रोड, लक्ष्मणगढ़ एक फ़ोटोकॉपी काउंटर से शुरू हुआ। पहले ग्राहक ज़्यादातर प्रोजेक्ट फ़ाइल वाले छात्र और सोमवार तक बिल बुक चाहने वाले दुकानदार थे।",
  },
  {
    en: "They kept coming back because the phone got answered, the price didn't change after the job was done, and a mistake on our side was reprinted without an argument. That is still how we work.",
    hi: "वे बार-बार लौटे, क्योंकि फ़ोन उठता था, काम के बाद रेट नहीं बदलता था, और गलती हमारी होने पर बिना बहस दोबारा छपाई होती थी। आज भी हम ऐसे ही काम करते हैं।",
  },
  {
    en: "Today the counter is a full press: offset, digital, 10-foot large format, laser cutting and sublimation under one roof, with designers who work in Hindi and English. The website is the newest counter — same prices, same people, open all night.",
    hi: "आज वह काउंटर एक पूरी प्रेस है: ऑफ़सेट, डिजिटल, 10 फ़ुट लार्ज फ़ॉर्मेट, लेज़र कटिंग और सब्लिमेशन — एक ही छत के नीचे, हिंदी-अंग्रेज़ी दोनों में काम करने वाले डिज़ाइनरों के साथ। वेबसाइट सबसे नया काउंटर है — वही रेट, वही लोग, रात भर खुला।",
  },
];

export const milestones: { year: number; title: L; colour: InkColour }[] = [
  {
    year: 2010,
    title: {
      en: "Photocopy and binding counter opens on Kathumar Road, Laxmangarh",
      hi: "पंचायत समिति के सामने, कठूमर रोड, लक्ष्मणगढ़ फ़ोटोकॉपी और बाइंडिंग काउंटर शुरू",
    },
    colour: "ink",
  },
  {
    year: 2013,
    title: { en: "First digital colour press — same-day visiting cards begin", hi: "पहली डिजिटल कलर प्रेस — उसी दिन विज़िटिंग कार्ड शुरू" },
    colour: "magenta",
  },
  {
    year: 2016,
    title: { en: "10-ft flex printer for shop boards and hoardings", hi: "दुकान बोर्ड और होर्डिंग के लिए 10 फ़ुट फ्लेक्स प्रिंटर" },
    colour: "yellow",
  },
  { year: 2018, title: { en: "In-house design studio, Hindi and English", hi: "हिंदी-अंग्रेज़ी में अपना डिज़ाइन स्टूडियो" }, colour: "blue" },
  {
    year: 2021,
    title: { en: "Laser cutting and sublimation for wedding cards and gifts", hi: "शादी कार्ड और गिफ़्ट के लिए लेज़र कटिंग और सब्लिमेशन" },
    colour: "green",
  },
  { year: 2024, title: { en: "Heidelberg four-colour offset press installed", hi: "हाइडलबर्ग 4-कलर ऑफ़सेट मशीन लगी" }, colour: "cyan" },
  {
    year: 2026,
    title: { en: "Instant prices online, orders and proofs on WhatsApp", hi: "ऑनलाइन तुरंत रेट, WhatsApp पर ऑर्डर और प्रूफ़" },
    colour: "magenta",
  },
];

export const team: { name?: L; role: L; body: L; initials: string; colour: InkColour }[] = [
  {
    name: { en: "Mahendra Choudhary", hi: "महेंद्र चौधरी" },
    role: { en: "Founder · Owner & press lead", hi: "संस्थापक · मालिक और प्रेस प्रमुख" },
    body: {
      en: "Quotes every bulk job personally and signs off colour on the first sheet.",
      hi: "हर बड़े ऑर्डर का रेट खुद देते हैं और पहली शीट पर रंग पास करते हैं।",
    },
    initials: "MC",
    colour: "magenta",
  },
  {
    role: { en: "Design desk", hi: "डिज़ाइन डेस्क" },
    body: {
      en: "Turns ideas, sketches and old cards into print-ready files — usually within a day.",
      hi: "आइडिया, स्केच और पुराने कार्ड को प्रिंट-रेडी फ़ाइल में बदलते हैं — आमतौर पर एक दिन में।",
    },
    initials: "DD",
    colour: "cyan",
  },
  {
    role: { en: "Large format & fitting", hi: "लार्ज फ़ॉर्मेट और फ़िटिंग" },
    body: {
      en: "Measures shop fronts, prints flex and vinyl, and fits boards across Alwar.",
      hi: "दुकानों का नाप, फ्लेक्स-विनाइल छपाई और पूरे अलवर में बोर्ड फ़िटिंग।",
    },
    initials: "LF",
    colour: "yellow",
  },
  {
    role: { en: "Counter, accounts & dispatch", hi: "काउंटर, हिसाब और डिस्पैच" },
    body: {
      en: "GST invoices, payments, pickups and couriers — and the one who answers the phone.",
      hi: "GST बिल, भुगतान, पिकअप और कूरियर — और फ़ोन उठाने वाले भी यही।",
    },
    initials: "CA",
    colour: "green",
  },
];
