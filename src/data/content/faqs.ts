import type { L } from "@/types/i18n";

export type Faq = { id: string; topic: "files" | "proof" | "payment" | "delivery" | "ordering"; question: L; answer: L; home?: boolean };

export const faqs: Faq[] = [
  {
    id: "where",
    topic: "ordering",
    home: true,
    question: { en: "Where is L.K. Offset Printers located?", hi: "एल.के. ऑफ़सेट प्रिंटर्स कहाँ है?" },
    answer: {
      en: "In front of the Panchayat Samiti, Kathumar Road, Laxmangarh, Alwar, Rajasthan 321607. The shop is open Monday to Saturday 9:30 AM – 8:30 PM and Sunday 10 AM – 2 PM. Call or WhatsApp +91 94149 06100.",
      hi: "पंचायत समिति के सामने, कठूमर रोड, लक्ष्मणगढ़, अलवर, राजस्थान 321607। दुकान सोमवार से शनिवार सुबह 9:30 से रात 8:30 और रविवार सुबह 10 से दोपहर 2 बजे तक खुली रहती है। कॉल या WhatsApp: +91 94149 06100।",
    },
  },
  {
    id: "who",
    topic: "ordering",
    question: { en: "Who runs L.K. Offset Printers?", hi: "एल.के. ऑफ़सेट प्रिंटर्स कौन चलाते हैं?" },
    answer: {
      en: "L.K. Offset Printers was founded by Mahendra Choudhary, who has more than 15 years of experience in the printing field. He personally quotes bulk jobs and checks colour on the first sheet.",
      hi: "एल.के. ऑफ़सेट प्रिंटर्स की स्थापना महेंद्र चौधरी ने की, जिन्हें प्रिंटिंग के काम में 15 वर्षों से ज़्यादा का अनुभव है। बड़े ऑर्डर का रेट वे खुद देते हैं और पहली शीट पर रंग जाँचते हैं।",
    },
  },
  {
    id: "same-day",
    topic: "ordering",
    home: true,
    question: { en: "Can I really get visiting cards the same day?", hi: "क्या सच में विज़िटिंग कार्ड उसी दिन मिल जाते हैं?" },
    answer: {
      en: "Yes. Order and approve your proof before 12 PM and your cards are ready by evening at our Panchayat Samiti, Kathumar Road, Laxmangarh counter. Choose Express at checkout for local delivery the same day.",
      hi: "हाँ। दोपहर 12 बजे से पहले ऑर्डर करके प्रूफ़ पास कर दें, तो शाम तक कार्ड पंचायत समिति, कठूमर रोड, लक्ष्मणगढ़ वाले काउंटर पर तैयार मिलेंगे। उसी दिन होम डिलीवरी के लिए चेकआउट पर एक्सप्रेस चुनें।",
    },
  },
  {
    id: "file-format",
    topic: "files",
    home: true,
    question: { en: "Which file format should I send?", hi: "कौन-सी फ़ाइल भेजूँ?" },
    answer: {
      en: "A print-ready PDF in CMYK with 3 mm bleed is best. CorelDRAW (CDR), Illustrator (AI/EPS), Photoshop (PSD), TIFF, JPG and PNG also work — send them on WhatsApp and we check the resolution before printing. A clear phone photo of an old card is fine if you want us to redesign it.",
      hi: "CMYK में 3 mm ब्लीड वाली प्रिंट-रेडी PDF सबसे अच्छी है। CorelDRAW (CDR), Illustrator (AI/EPS), Photoshop (PSD), TIFF, JPG और PNG भी चलते हैं — WhatsApp पर भेजिए, छपाई से पहले हम फ़ोटो की क्वालिटी जाँच लेते हैं। पुराने कार्ड की साफ़ फ़ोटो भी चलेगी अगर आप चाहते हैं कि हम दोबारा डिज़ाइन करें।",
    },
  },
  {
    id: "proof",
    topic: "proof",
    home: true,
    question: { en: "Will I see a proof before printing?", hi: "छपाई से पहले प्रूफ़ दिखाएँगे?" },
    answer: {
      en: "Always, and it's free. We WhatsApp a soft proof within 2 working hours. Reply to approve it or tell us what to change — nothing goes on the press until you say yes.",
      hi: "हमेशा, और बिल्कुल फ़्री। 2 कामकाजी घंटों में WhatsApp पर प्रूफ़ भेजते हैं। वहीं जवाब देकर पास करें या बदलाव बताएँ — आपकी हाँ के बिना कुछ नहीं छपता।",
    },
  },
  {
    id: "no-design",
    topic: "files",
    home: true,
    question: { en: "I don't have a design. Can you make one?", hi: "मेरे पास डिज़ाइन नहीं है। आप बना देंगे?" },
    answer: {
      en: 'Our in-house studio designs visiting cards from ₹299, wedding cards from ₹999 and logos from ₹1,499. Pick "Design it for me" when ordering and we\'ll call you to understand what you need.',
      hi: 'हमारा स्टूडियो विज़िटिंग कार्ड ₹299 से, शादी के कार्ड ₹999 से और लोगो ₹1,499 से डिज़ाइन करता है। ऑर्डर करते समय "मेरे लिए डिज़ाइन कर दो" चुनें, हम फ़ोन करके आपकी ज़रूरत समझ लेंगे।',
    },
  },
  {
    id: "gst",
    topic: "payment",
    home: true,
    question: { en: "Do you give a GST invoice?", hi: "क्या GST बिल मिलेगा?" },
    answer: {
      en: "Yes. Enter your business name and GSTIN at checkout and the invoice will carry them so you can claim input credit. All prices on the site already include GST.",
      hi: "हाँ। चेकआउट पर अपनी दुकान/कंपनी का नाम और GSTIN डालें, बिल पर वही आएगा ताकि आप इनपुट क्रेडिट ले सकें। वेबसाइट के सारे रेट GST सहित हैं।",
    },
  },
  {
    id: "payment",
    topic: "payment",
    home: true,
    question: { en: "How can I pay?", hi: "पेमेंट कैसे कर सकते हैं?" },
    answer: {
      en: "By UPI (GPay, PhonePe, Paytm) or cash. We confirm the price on WhatsApp first and you pay after approving the proof — at the counter when you collect, or by UPI before we courier it.",
      hi: "UPI (GPay, PhonePe, Paytm) या कैश से। पहले WhatsApp पर रेट पक्का करते हैं और प्रूफ़ पास करने के बाद पेमेंट — दुकान से लेते समय काउंटर पर, या कूरियर से पहले UPI से।",
    },
  },
  {
    id: "delivery",
    topic: "delivery",
    home: true,
    question: { en: "Do you deliver outside Alwar?", hi: "क्या अलवर के बाहर डिलीवरी होती है?" },
    answer: {
      en: "Yes. Local delivery in Laxmangarh (PIN 321607) is ₹49, free above ₹999. We courier across Alwar district, all of Rajasthan including Jaipur, Bharatpur and Dausa, and Delhi NCR — Delhi, Gurugram, Noida, Faridabad and Ghaziabad — usually in 1–3 days, and anywhere in India in 3–6 days, for a flat ₹99.",
      hi: "हाँ। लक्ष्मणगढ़ (पिन 321607) में होम डिलीवरी ₹49, ₹999 से ऊपर फ़्री। पूरे अलवर ज़िले, जयपुर, भरतपुर और दौसा सहित पूरे राजस्थान, और दिल्ली NCR — दिल्ली, गुरुग्राम, नोएडा, फ़रीदाबाद और गाज़ियाबाद — में आमतौर पर 1–3 दिन में, और पूरे भारत में 3–6 दिन में, ₹99 फ़िक्स पर कूरियर।",
    },
  },
  {
    id: "reprint",
    topic: "ordering",
    home: true,
    question: { en: "What if something is printed wrong?", hi: "अगर कुछ गलत छप जाए तो?" },
    answer: {
      en: "If the mistake is ours — wrong colour, cut, paper or anything that differs from the approved proof — we reprint free. Tell us within 7 days of delivery with a photo.",
      hi: "अगर गलती हमारी है — रंग, कटिंग, पेपर या कुछ भी जो पास किए प्रूफ़ से अलग हो — तो दोबारा छपाई फ़्री। डिलीवरी के 7 दिन के अंदर फ़ोटो के साथ बताएँ।",
    },
  },
  {
    id: "bleed",
    topic: "files",
    question: { en: "What is bleed and why 3 mm?", hi: "ब्लीड क्या है और 3 mm क्यों?" },
    answer: {
      en: "Paper is cut after printing, and the blade can drift by a millimetre or two. Extending background colours and images 3 mm past the final edge means no white slivers after cutting. Keep text and logos 5 mm inside the edge for the same reason.",
      hi: "छपाई के बाद पेपर कटता है, और ब्लेड एक-दो मिलीमीटर खिसक सकता है। बैकग्राउंड का रंग और फ़ोटो किनारे से 3 mm बाहर तक फैलाने से कटाई के बाद सफ़ेद पट्टी नहीं दिखती। इसी वजह से टेक्स्ट और लोगो किनारे से 5 mm अंदर रखें।",
    },
  },
  {
    id: "cmyk",
    topic: "files",
    question: { en: "Why do colours look different on paper than on my phone?", hi: "फ़ोन पर और पेपर पर रंग अलग क्यों दिखते हैं?" },
    answer: {
      en: "Screens make colour with light (RGB); presses mix four inks (CMYK). Very bright screen colours, especially neon greens and electric blues, can't be reproduced exactly in ink. Designing in CMYK — or asking us for a printed sample — avoids surprises.",
      hi: "स्क्रीन रोशनी से रंग बनाती है (RGB); प्रेस चार स्याहियाँ मिलाती है (CMYK)। स्क्रीन के बहुत चटक रंग, ख़ासकर नियॉन हरा और तेज़ नीला, स्याही में हूबहू नहीं आते। CMYK में डिज़ाइन करें — या छपा हुआ सैंपल माँग लें — तो कोई सरप्राइज़ नहीं होगा।",
    },
  },
  {
    id: "cancel",
    topic: "ordering",
    question: { en: "Can I cancel my order?", hi: "क्या ऑर्डर कैंसिल कर सकते हैं?" },
    answer: {
      en: "Free cancellation with a full refund any time before you approve the proof. Once printing starts, the paper and plates are used, so we can't cancel — see the Refund & Cancellation policy for details.",
      hi: "प्रूफ़ पास करने से पहले कभी भी फ़्री कैंसिलेशन और पूरा रिफ़ंड। छपाई शुरू होने के बाद पेपर और प्लेट लग चुकी होती हैं, इसलिए कैंसिल नहीं हो पाता — पूरी जानकारी रिफ़ंड और कैंसिलेशन पॉलिसी में।",
    },
  },
  {
    id: "bulk",
    topic: "ordering",
    question: { en: "Do you offer bulk or corporate rates?", hi: "क्या बल्क या कॉर्पोरेट रेट मिलते हैं?" },
    answer: {
      en: "Per-piece products get automatic discounts of 5% from 100, 10% from 500 and 15% from 1,000 pieces. For annual contracts, franchises or tenders, send an enquiry and we'll prepare a rate card.",
      hi: "पीस वाले प्रोडक्ट पर 100 से 5%, 500 से 10% और 1,000 पीस से 15% छूट अपने-आप लगती है। सालाना कॉन्ट्रैक्ट, फ़्रैंचाइज़ी या टेंडर के लिए पूछताछ भेजें, हम अलग रेट कार्ड बना देंगे।",
    },
  },
  {
    id: "track",
    topic: "delivery",
    question: { en: "How do I track my order?", hi: "ऑर्डर कैसे ट्रैक करें?" },
    answer: {
      en: "We send every update — proof, printing, dispatch — on WhatsApp. To ask anytime, open Track Order, enter your order reference (it starts with LK-) and your mobile number, and the status request opens in WhatsApp.",
      hi: "हर अपडेट — प्रूफ़, छपाई, डिस्पैच — WhatsApp पर भेजते हैं। कभी भी पूछना हो तो ट्रैक ऑर्डर खोलें, ऑर्डर रेफ़रेंस (LK- से शुरू) और मोबाइल नंबर डालें — स्थिति पूछने वाला मैसेज WhatsApp में खुल जाएगा।",
    },
  },
  {
    id: "files-privacy",
    topic: "files",
    question: { en: "What happens to my files after printing?", hi: "छपाई के बाद मेरी फ़ाइलों का क्या होता है?" },
    answer: {
      en: "Your files stay with our team only, are kept for 90 days after delivery so reorders are easy, and are then deleted. Question papers and confidential jobs are deleted right after printing on request.",
      hi: "आपकी फ़ाइलें सिर्फ़ हमारी टीम के पास रहती हैं, डिलीवरी के 90 दिन तक रखी जाती हैं ताकि दोबारा ऑर्डर आसान रहे, फिर डिलीट कर दी जाती हैं। प्रश्न-पत्र और गोपनीय काम कहने पर छपाई के तुरंत बाद डिलीट कर देते हैं।",
    },
  },
];

export const homeFaqs = faqs.filter((f) => f.home);
