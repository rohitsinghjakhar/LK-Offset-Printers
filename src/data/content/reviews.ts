import type { CategorySlug } from "@/types/catalog";
import type { L } from "@/types/i18n";

export type Review = { id: string; name: string; city: L; rating: number; text: L; date: string };

/** Product-page reviews, grouped by category (a product shows its category's reviews). */
export const reviewsByCategory: Record<CategorySlug, Review[]> = {
  "business-stationery": [
    {
      id: "bs1",
      name: "Manish Gupta",
      city: { en: "Alwar", hi: "अलवर" },
      rating: 5,
      date: "2026-08-14",
      text: {
        en: "Ordered 500 velvet cards at 11 AM, picked them up at 6 PM. The spot UV on the logo is sharp and even.",
        hi: "सुबह 11 बजे 500 वेलवेट कार्ड ऑर्डर किए, शाम 6 बजे ले आया। लोगो पर स्पॉट UV एकदम साफ़ और बराबर।",
      },
    },
    {
      id: "bs2",
      name: "Adv. Kavita Meena",
      city: { en: "Alwar", hi: "अलवर" },
      rating: 5,
      date: "2026-07-02",
      text: {
        en: "Letterheads and envelopes matched perfectly. The bond paper takes my office printer without smudging.",
        hi: "लेटरहेड और लिफ़ाफ़े बिल्कुल मैच हुए। बॉन्ड पेपर पर ऑफ़िस प्रिंटर से छपाई बिना फैले होती है।",
      },
    },
    {
      id: "bs3",
      name: "Rakesh Saini",
      city: { en: "Bhiwadi", hi: "भिवाड़ी" },
      rating: 4,
      date: "2026-06-19",
      text: {
        en: "Bill books are neat and numbered correctly. Courier took two days, as promised.",
        hi: "बिल बुक साफ़-सुथरी और नंबरिंग सही। कूरियर दो दिन में आया, जैसा बताया था।",
      },
    },
  ],
  "marketing-prints": [
    {
      id: "mp1",
      name: "Deepak Yadav",
      city: { en: "Behror", hi: "बहरोड़" },
      rating: 5,
      date: "2026-08-02",
      text: {
        en: "10,000 pamphlets overnight for our coaching admissions. Colours were bright and the cut was straight.",
        hi: "कोचिंग एडमिशन के लिए 10,000 पैम्फ़लेट रातों-रात। रंग चटक और कटिंग सीधी।",
      },
    },
    {
      id: "mp2",
      name: "Shalini Arora",
      city: { en: "Jaipur", hi: "जयपुर" },
      rating: 5,
      date: "2026-05-27",
      text: {
        en: "The tri-fold brochures feel premium. They suggested 250 GSM for the cover and they were right.",
        hi: "ट्राई-फ़ोल्ड ब्रोशर हाथ में प्रीमियम लगते हैं। कवर के लिए 250 GSM सुझाया था, बिल्कुल सही निकला।",
      },
    },
  ],
  "large-format-signage": [
    {
      id: "lf1",
      name: "Imran Qureshi",
      city: { en: "Bhiwadi", hi: "भिवाड़ी" },
      rating: 5,
      date: "2026-07-21",
      text: {
        en: "20-foot flex with no joints, eyelets every two feet. Still bright after the monsoon.",
        hi: "20 फ़ुट का फ्लेक्स बिना जोड़ के, हर दो फ़ुट पर आईलेट। बारिश के बाद भी चमक बनी हुई है।",
      },
    },
    {
      id: "lf2",
      name: "Pradeep Sharma",
      city: { en: "Alwar", hi: "अलवर" },
      rating: 4,
      date: "2026-06-08",
      text: {
        en: "Standee arrived in a padded bag and set up in a minute. Good for our bank branch events.",
        hi: "स्टैंडी गद्देदार बैग में आई और एक मिनट में खड़ी हो गई। बैंक के कार्यक्रमों के लिए बढ़िया।",
      },
    },
  ],
  "wedding-events": [
    {
      id: "we1",
      name: "Nidhi & Rohan",
      city: { en: "Alwar", hi: "अलवर" },
      rating: 5,
      date: "2026-02-11",
      text: {
        en: "Three proof rounds on WhatsApp without any fuss. The foil border is gorgeous in person.",
        hi: "WhatsApp पर बिना झंझट तीन बार प्रूफ़। फ़ॉइल वाला बॉर्डर हाथ में देखने पर और सुंदर लगता है।",
      },
    },
    {
      id: "we2",
      name: "Sunita Khandelwal",
      city: { en: "Delhi NCR", hi: "दिल्ली NCR" },
      rating: 5,
      date: "2026-01-20",
      text: {
        en: "Ordered from Gurugram for my daughter's wedding. Boxed invites arrived safely in three days.",
        hi: "बेटी की शादी के लिए गुरुग्राम से ऑर्डर किया। बॉक्स वाले कार्ड तीन दिन में सुरक्षित पहुँच गए।",
      },
    },
  ],
  "packaging-labels": [
    {
      id: "pl1",
      name: "Ankit Jain",
      city: { en: "Delhi NCR", hi: "दिल्ली NCR" },
      rating: 5,
      date: "2026-08-20",
      text: {
        en: "Vinyl labels survive oil and the fridge. Monthly reorders on WhatsApp are effortless.",
        hi: "विनाइल लेबल तेल और फ्रिज दोनों झेल जाते हैं। हर महीने WhatsApp पर दोबारा ऑर्डर बड़ा आसान।",
      },
    },
    {
      id: "pl2",
      name: "Sunil Khandelwal",
      city: { en: "Alwar", hi: "अलवर" },
      rating: 5,
      date: "2025-11-01",
      text: {
        en: "Diwali sweet boxes were two days early. Customers liked the window on the 500 g pack.",
        hi: "दिवाली के मिठाई के डिब्बे दो दिन पहले आ गए। 500 ग्राम वाले की विंडो ग्राहकों को ख़ूब पसंद आई।",
      },
    },
  ],
  "school-coaching": [
    {
      id: "sc1",
      name: "Sr. Mary Thomas",
      city: { en: "Alwar", hi: "अलवर" },
      rating: 5,
      date: "2026-04-01",
      text: {
        en: "Diaries delivered class-wise before the session. The hard binding lasts the whole year.",
        hi: "सेशन से पहले क्लास-वार डायरी मिल गईं। हार्ड बाइंडिंग पूरा साल चलती है।",
      },
    },
    {
      id: "sc2",
      name: "Ramesh Yadav",
      city: { en: "Behror", hi: "बहरोड़" },
      rating: 5,
      date: "2026-03-12",
      text: {
        en: "Question papers printed in sealed packets overnight. Completely confidential and on time.",
        hi: "प्रश्न-पत्र रातों-रात सील पैकेट में छप गए। पूरी तरह गोपनीय और समय पर।",
      },
    },
  ],
  "gifts-merchandise": [
    {
      id: "gm1",
      name: "Pooja Sharma",
      city: { en: "Alwar", hi: "अलवर" },
      rating: 5,
      date: "2026-08-09",
      text: {
        en: "The magic mug for my father's birthday was ready the same evening. Print hasn't faded after washing.",
        hi: "पापा के जन्मदिन का मैजिक मग उसी शाम तैयार था। धोने के बाद भी प्रिंट फीका नहीं हुआ।",
      },
    },
    {
      id: "gm2",
      name: "Varun Mehta",
      city: { en: "Neemrana", hi: "नीमराना" },
      rating: 4,
      date: "2026-06-30",
      text: {
        en: "Team T-shirts for our plant's safety week — sizes were right and colours matched our logo.",
        hi: "प्लांट के सेफ़्टी वीक के लिए टीम टी-शर्ट — साइज़ सही और रंग लोगो से मैच।",
      },
    },
  ],
  "photo-copy-binding": [
    {
      id: "pc1",
      name: "Aditi Singh",
      city: { en: "Alwar", hi: "अलवर" },
      rating: 5,
      date: "2026-05-15",
      text: {
        en: "Thesis hard-bound with gold lettering overnight. The spine text was perfectly centred.",
        hi: "थीसिस रातों-रात सुनहरे अक्षरों के साथ हार्ड बाउंड। स्पाइन पर अक्षर एकदम बीच में।",
      },
    },
    {
      id: "pc2",
      name: "Rahul Verma",
      city: { en: "Alwar", hi: "अलवर" },
      rating: 4,
      date: "2026-04-22",
      text: {
        en: "Colour prints for our project came out sharp. Quick service even during exam rush.",
        hi: "प्रोजेक्ट के कलर प्रिंट एकदम साफ़ आए। परीक्षा की भीड़ में भी जल्दी काम।",
      },
    },
  ],
};
