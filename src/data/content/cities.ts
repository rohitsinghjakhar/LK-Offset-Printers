import type { L } from "@/types/i18n";

/** Local landing pages (/printing-in/[city]). Each has its own copy so they aren't thin duplicates. */
export type CityPage = {
  slug: string;
  intro: L;
  delivery: L[];
  products: string[];
  faqs: { question: L; answer: L }[];
};

export const cityPages: CityPage[] = [
  {
    slug: "laxmangarh",
    intro: {
      en: "Our shop is in front of the Panchayat Samiti on Kathumar Road, Laxmangarh. Walk in with your design or just an idea, check paper and finishes at the counter, approve the proof and collect from the same counter. Founder Mahendra Choudhary has more than 15 years in printing, so most local jobs need only a visit or one WhatsApp message.",
      hi: "हमारी दुकान लक्ष्मणगढ़ में कठूमर रोड पर पंचायत समिति के सामने है। अपना डिज़ाइन या सिर्फ़ आइडिया लेकर आइए, काउंटर पर पेपर और फ़िनिश देखिए, प्रूफ़ पास कीजिए और उसी काउंटर से ले जाइए। संस्थापक महेंद्र चौधरी को छपाई में 15 वर्षों से ज़्यादा का अनुभव है, इसलिए ज़्यादातर लोकल काम बस एक बार आने या एक WhatsApp मैसेज से हो जाता है।",
    },
    delivery: [
      {
        en: "Shop pickup: free — visiting cards ordered and approved before 12 noon are ready the same evening",
        hi: "दुकान से पिकअप: फ़्री — दोपहर 12 बजे से पहले ऑर्डर और प्रूफ़ पास होने पर विज़िटिंग कार्ड उसी शाम तैयार",
      },
      {
        en: "Local delivery in Laxmangarh (PIN 321607): ₹49, free on orders above ₹999",
        hi: "लक्ष्मणगढ़ (पिन 321607) में लोकल डिलीवरी: ₹49, ₹999 से ऊपर के ऑर्डर पर फ़्री",
      },
      { en: "Pay cash or UPI at the counter, after you approve the proof", hi: "प्रूफ़ पास करने के बाद काउंटर पर कैश या UPI से भुगतान" },
    ],
    products: ["visiting-cards", "wedding-cards", "bill-books", "flex-banners", "rubber-stamps", "bw-photocopy"],
    faqs: [
      {
        question: { en: "Where exactly is the shop?", hi: "दुकान ठीक कहाँ है?" },
        answer: {
          en: "In front of the Panchayat Samiti on Kathumar Road, Laxmangarh, Alwar, Rajasthan 321607. Open the map link on the contact page for directions, or call +91 94149 06100.",
          hi: "लक्ष्मणगढ़ में कठूमर रोड पर पंचायत समिति के सामने — लक्ष्मणगढ़, अलवर, राजस्थान 321607। रास्ते के लिए संपर्क पेज पर मैप लिंक खोलें, या +91 94149 06100 पर कॉल करें।",
        },
      },
      {
        question: { en: "Do you also do photocopy, lamination and binding?", hi: "क्या फ़ोटोकॉपी, लैमिनेशन और बाइंडिंग भी होती है?" },
        answer: {
          en: "Yes. Photocopies, colour prints, spiral and hard binding and lamination are done at the counter, usually while you wait.",
          hi: "हाँ। फ़ोटोकॉपी, कलर प्रिंट, स्पाइरल और हार्ड बाइंडिंग और लैमिनेशन काउंटर पर ही होते हैं, आमतौर पर आपके सामने।",
        },
      },
    ],
  },
  {
    slug: "kathumar",
    intro: {
      en: "Kathumar is a short drive down Kathumar Road from our Laxmangarh shop, so many customers simply come in. If you can't, send your files — or a photo of your old card — on WhatsApp, approve the proof on your phone, and collect the order or have it couriered.",
      hi: "कठूमर हमारी लक्ष्मणगढ़ वाली दुकान से कठूमर रोड पर थोड़ी ही दूरी पर है, इसलिए कई ग्राहक सीधे आ जाते हैं। न आ सकें तो अपनी फ़ाइलें — या पुराने कार्ड की फ़ोटो — WhatsApp पर भेजिए, फ़ोन पर प्रूफ़ पास कीजिए, और ऑर्डर ले जाइए या कूरियर से मँगाइए।",
    },
    delivery: [
      { en: "Free pickup from our shop on Kathumar Road, Laxmangarh", hi: "कठूमर रोड, लक्ष्मणगढ़ की दुकान से फ़्री पिकअप" },
      { en: "Courier to Kathumar: ₹99 after proof approval", hi: "प्रूफ़ पास होने के बाद कठूमर कूरियर: ₹99" },
      { en: "Proofs and updates on WhatsApp, in Hindi or English", hi: "प्रूफ़ और अपडेट WhatsApp पर, हिंदी या अंग्रेज़ी में" },
    ],
    products: ["wedding-cards", "visiting-cards", "flex-banners", "bill-books", "school-diaries", "photo-prints"],
    faqs: [
      {
        question: { en: "Can I order wedding cards without visiting the shop?", hi: "क्या दुकान आए बिना शादी के कार्ड ऑर्डर कर सकते हैं?" },
        answer: {
          en: "Yes. Pick a design online or send a sample photo on WhatsApp. We send a proof with your names and dates and print only after you approve it. You can still visit to see paper samples.",
          hi: "हाँ। ऑनलाइन डिज़ाइन चुनिए या WhatsApp पर सैंपल फ़ोटो भेजिए। हम आपके नाम और तारीख़ों के साथ प्रूफ़ भेजते हैं और आपकी मंज़ूरी के बाद ही छापते हैं। पेपर सैंपल देखने के लिए दुकान भी आ सकते हैं।",
        },
      },
    ],
  },
  {
    slug: "alwar",
    intro: {
      en: "Customers from across Alwar district order from our shop on Kathumar Road, Laxmangarh. Visit to see paper and finishes in person, or order online: send the artwork on WhatsApp, approve a free proof, and we courier it to Alwar city, Rajgarh, Ramgarh, Tijara or anywhere else in the district.",
      hi: "पूरे अलवर ज़िले के ग्राहक लक्ष्मणगढ़ में कठूमर रोड वाली हमारी दुकान से ऑर्डर करते हैं। पेपर और फ़िनिश खुद देखने के लिए आइए, या ऑनलाइन ऑर्डर कीजिए: आर्टवर्क WhatsApp पर भेजें, फ़्री प्रूफ़ पास करें, और हम अलवर शहर, राजगढ़, रामगढ़, तिजारा या ज़िले में कहीं भी कूरियर कर देंगे।",
    },
    delivery: [
      {
        en: "Courier anywhere in Alwar district: ₹99, usually 1–2 days after proof approval",
        hi: "अलवर ज़िले में कहीं भी कूरियर: ₹99, आमतौर पर प्रूफ़ पास होने के 1–2 दिन में",
      },
      { en: "Free pickup from our Laxmangarh shop", hi: "लक्ष्मणगढ़ की दुकान से फ़्री पिकअप" },
      { en: "Flex boards and signage fitted on site on request", hi: "मांग पर फ्लेक्स बोर्ड और साइनेज की साइट पर फ़िटिंग" },
    ],
    products: ["visiting-cards", "flex-banners", "wedding-cards", "pamphlets-flyers", "school-diaries", "bill-books"],
    faqs: [
      {
        question: { en: "Do I have to visit the shop in Laxmangarh?", hi: "क्या लक्ष्मणगढ़ की दुकान पर आना ज़रूरी है?" },
        answer: {
          en: "No. Most Alwar orders are placed online or on WhatsApp: you see the price upfront, approve the proof on your phone and the courier delivers. Visit if you'd like to feel the paper first.",
          hi: "नहीं। अलवर के ज़्यादातर ऑर्डर ऑनलाइन या WhatsApp पर होते हैं: रेट पहले दिखता है, फ़ोन पर प्रूफ़ पास करते हैं और कूरियर पहुँचा देता है। पेपर छूकर देखना हो तो दुकान आइए।",
        },
      },
      {
        question: { en: "Can I see a printed sample before a big order?", hi: "बड़े ऑर्डर से पहले छपा हुआ सैंपल देख सकते हैं?" },
        answer: {
          en: "Yes — visit the shop to feel paper stocks and finishes, or ask for a single digital proof print.",
          hi: "हाँ — दुकान पर आकर पेपर और फ़िनिश छूकर देखें, या एक डिजिटल प्रूफ़ प्रिंट माँगें।",
        },
      },
    ],
  },
  {
    slug: "bhiwadi",
    intro: {
      en: "Bhiwadi's factories and offices order from us for the things that need a GST invoice and a fixed delivery date: letterheads, ID cards, safety signage, cartons and product labels. Send the files on WhatsApp, approve the proof and the courier brings it to your gate.",
      hi: "भिवाड़ी की फ़ैक्टरियाँ और ऑफ़िस वो चीज़ें हमसे मँगाते हैं जिनके लिए GST बिल और तय डिलीवरी तारीख चाहिए: लेटरहेड, आईडी कार्ड, सेफ़्टी साइनेज, कार्टन और प्रोडक्ट लेबल। फ़ाइल WhatsApp पर भेजें, प्रूफ़ अप्रूव करें, कूरियर आपके गेट तक लाएगा।",
    },
    delivery: [
      { en: "Courier to Bhiwadi in 1–2 days after proof approval: ₹99", hi: "प्रूफ़ अप्रूव होने के 1–2 दिन में भिवाड़ी कूरियर: ₹99" },
      { en: "Bulk and repeat orders for industrial units, with GST invoices", hi: "औद्योगिक इकाइयों के लिए बल्क और रिपीट ऑर्डर, GST बिल के साथ" },
      { en: "Pay by UPI after approving the proof; proofs shared on WhatsApp", hi: "प्रूफ़ पास करने के बाद UPI से भुगतान; प्रूफ़ WhatsApp पर" },
    ],
    products: ["letterheads", "pvc-id-cards", "labels-stickers", "mono-cartons", "vinyl-sunboard", "corporate-diaries"],
    faqs: [
      {
        question: { en: "Do you handle repeat orders for companies?", hi: "क्या कंपनियों के रिपीट ऑर्डर लेते हैं?" },
        answer: {
          en: "Yes. We keep your approved files, so a reorder is one WhatsApp message.",
          hi: "हाँ। हम आपकी अप्रूव फ़ाइलें रखते हैं, दोबारा ऑर्डर बस एक WhatsApp मैसेज है।",
        },
      },
    ],
  },
  {
    slug: "behror",
    intro: {
      en: "Behror's schools, clinics and highway businesses reach us by courier in a day or two. Most orders here are school diaries and ID cards before the session, dhaba and hotel menus, and flex boards for the NH-48 stretch.",
      hi: "बहरोड़ के स्कूल, क्लिनिक और हाईवे के व्यवसाय एक-दो दिन में कूरियर से हम तक पहुँचते हैं। यहाँ ज़्यादातर ऑर्डर सेशन से पहले स्कूल डायरी और आईडी कार्ड, ढाबा-होटल के मेन्यू और NH-48 के लिए फ्लेक्स बोर्ड होते हैं।",
    },
    delivery: [
      { en: "Courier to Behror in 1–2 days: ₹99", hi: "बहरोड़ कूरियर 1–2 दिन में: ₹99" },
      { en: "School session orders packed class-wise", hi: "स्कूल सेशन के ऑर्डर क्लास-वार पैक" },
      { en: "Large flex prints sent rolled in tubes", hi: "बड़े फ्लेक्स प्रिंट ट्यूब में रोल करके" },
    ],
    products: ["school-diaries", "student-id-cards", "flex-banners", "danglers-table-tents", "report-cards", "letterheads"],
    faqs: [
      {
        question: { en: "Can flex banners be couriered?", hi: "क्या फ्लेक्स बैनर कूरियर हो सकते हैं?" },
        answer: {
          en: "Yes, rolled — never folded — with eyelets fitted, ready to hang.",
          hi: "हाँ, रोल करके — कभी मोड़कर नहीं — आईलेट लगाकर, टाँगने के लिए तैयार।",
        },
      },
    ],
  },
  {
    slug: "rajasthan",
    intro: {
      en: "From Laxmangarh in Alwar district we print for customers across Rajasthan — Jaipur, Bharatpur, Dausa, Ajmer, Jodhpur, Udaipur, Kota, Bikaner and the towns in between. Prices are online and include GST, proofs come on WhatsApp, and the finished job travels by courier.",
      hi: "अलवर ज़िले के लक्ष्मणगढ़ से हम पूरे राजस्थान के ग्राहकों के लिए छपाई करते हैं — जयपुर, भरतपुर, दौसा, अजमेर, जोधपुर, उदयपुर, कोटा, बीकानेर और बीच के कस्बे। रेट ऑनलाइन और GST सहित, प्रूफ़ WhatsApp पर, और तैयार काम कूरियर से।",
    },
    delivery: [
      {
        en: "Courier anywhere in Rajasthan: ₹99 — delivery time for your PIN code is confirmed when you order",
        hi: "राजस्थान में कहीं भी कूरियर: ₹99 — आपके पिन कोड का डिलीवरी समय ऑर्डर पर बताया जाता है",
      },
      { en: "Bulk orders for schools, shops and businesses, with GST invoices", hi: "स्कूल, दुकानों और व्यवसायों के लिए बल्क ऑर्डर, GST बिल के साथ" },
      { en: "Wedding cards, packaging and stationery designed in Hindi or English", hi: "शादी कार्ड, पैकेजिंग और स्टेशनरी का डिज़ाइन हिंदी या अंग्रेज़ी में" },
    ],
    products: ["wedding-cards", "visiting-cards", "school-diaries", "labels-stickers", "paper-bags", "flex-banners"],
    faqs: [
      {
        question: { en: "Do you deliver to every district in Rajasthan?", hi: "क्या राजस्थान के हर ज़िले में डिलीवरी है?" },
        answer: {
          en: "Yes, by courier to any serviceable PIN code. Enter your PIN code at checkout and the city and state fill in; if a remote area takes longer, we tell you before printing.",
          hi: "हाँ, किसी भी सेवा-योग्य पिन कोड पर कूरियर से। चेकआउट पर पिन कोड डालते ही शहर और राज्य भर जाते हैं; किसी दूर के इलाके में ज़्यादा समय लगे तो छपाई से पहले बता देते हैं।",
        },
      },
    ],
  },
  {
    slug: "jaipur",
    intro: {
      en: "Jaipur has plenty of printers, so why order from Alwar? Customers tell us it's the instant online price, the proof in two hours and the free reprint if we get something wrong. Wedding cards and boutique packaging are our most popular Jaipur orders.",
      hi: "जयपुर में प्रिंटर बहुत हैं, तो अलवर से क्यों? ग्राहक बताते हैं — तुरंत ऑनलाइन रेट, दो घंटे में प्रूफ़ और गलती होने पर फ़्री दोबारा छपाई। शादी के कार्ड और बुटीक पैकेजिंग जयपुर के सबसे लोकप्रिय ऑर्डर हैं।",
    },
    delivery: [
      { en: "Courier to Jaipur in about 2 days: ₹99", hi: "जयपुर कूरियर लगभग 2 दिन में: ₹99" },
      { en: "Wedding card samples couriered before you commit", hi: "पक्का करने से पहले शादी कार्ड के सैंपल कूरियर" },
      { en: "Bilingual design for invitations and packaging", hi: "निमंत्रण और पैकेजिंग के लिए द्विभाषी डिज़ाइन" },
    ],
    products: ["wedding-cards", "shagun-envelopes", "paper-bags", "hang-tags", "sweet-boxes", "visiting-cards"],
    faqs: [
      {
        question: { en: "Can I get wedding card samples before ordering?", hi: "ऑर्डर से पहले शादी कार्ड के सैंपल मिल सकते हैं?" },
        answer: {
          en: "Yes. We courier a sample set; the sample cost is adjusted in your final order.",
          hi: "हाँ। सैंपल सेट कूरियर करते हैं; उसकी कीमत फ़ाइनल ऑर्डर में एडजस्ट होती है।",
        },
      },
    ],
  },
  {
    slug: "bharatpur",
    intro: {
      en: "Bharatpur is our neighbouring district, and its shops, schools and families order wedding cards, bill books, school printing and shop boards from us. Send the details on WhatsApp, approve the proof, and the courier brings the finished job to your door.",
      hi: "भरतपुर हमारा पड़ोसी ज़िला है, और वहाँ की दुकानें, स्कूल और परिवार हमसे शादी के कार्ड, बिल बुक, स्कूल की छपाई और दुकान के बोर्ड मँगाते हैं। WhatsApp पर जानकारी भेजिए, प्रूफ़ पास कीजिए, और कूरियर तैयार काम आपके दरवाज़े तक पहुँचा देगा।",
    },
    delivery: [
      { en: "Courier to Bharatpur: ₹99, usually 1–2 days after proof approval", hi: "भरतपुर कूरियर: ₹99, आमतौर पर प्रूफ़ पास होने के 1–2 दिन में" },
      { en: "Large orders can be collected from our Laxmangarh shop", hi: "बड़े ऑर्डर लक्ष्मणगढ़ की दुकान से भी ले सकते हैं" },
      { en: "GST invoice on every order", hi: "हर ऑर्डर पर GST बिल" },
    ],
    products: ["wedding-cards", "bill-books", "school-diaries", "flex-banners", "visiting-cards", "sweet-boxes"],
    faqs: [
      {
        question: { en: "How do I send my design from Bharatpur?", hi: "भरतपुर से अपना डिज़ाइन कैसे भेजें?" },
        answer: {
          en: "Send a PDF, CDR, image or even a phone photo on WhatsApp to +91 94149 06100. Our designers prepare the print file and send you a proof first.",
          hi: "PDF, CDR, इमेज या फ़ोन की फ़ोटो भी +91 94149 06100 पर WhatsApp करें। हमारे डिज़ाइनर प्रिंट फ़ाइल तैयार करके पहले आपको प्रूफ़ भेजते हैं।",
        },
      },
    ],
  },
  {
    slug: "dausa",
    intro: {
      en: "Dausa sits between Alwar and Jaipur, and customers there use us for wedding invitations, coaching and school material, and banners for shops and events. Prices are visible online before you order, and nothing is printed until you approve the proof.",
      hi: "दौसा अलवर और जयपुर के बीच है, और वहाँ के ग्राहक हमसे शादी के निमंत्रण, कोचिंग और स्कूल की सामग्री, और दुकानों व आयोजनों के बैनर छपवाते हैं। ऑर्डर से पहले रेट ऑनलाइन दिखते हैं, और प्रूफ़ पास होने तक कुछ नहीं छपता।",
    },
    delivery: [
      { en: "Courier to Dausa: ₹99, usually about 2 days", hi: "दौसा कूरियर: ₹99, आमतौर पर लगभग 2 दिन" },
      { en: "Free proof on WhatsApp within 2 working hours", hi: "2 कामकाजी घंटों में WhatsApp पर फ़्री प्रूफ़" },
      { en: "Bilingual Hindi–English designs", hi: "हिंदी–अंग्रेज़ी द्विभाषी डिज़ाइन" },
    ],
    products: ["wedding-cards", "admission-forms", "prospectus", "flex-banners", "pamphlets-flyers", "visiting-cards"],
    faqs: [
      {
        question: { en: "Can you print coaching institute material?", hi: "क्या कोचिंग संस्थान की सामग्री छापते हैं?" },
        answer: {
          en: "Yes — pamphlets, admission forms, prospectus, ID cards and banners. Share the content and we design all of it in one consistent style.",
          hi: "हाँ — पैम्फ़लेट, एडमिशन फ़ॉर्म, प्रॉस्पेक्टस, आईडी कार्ड और बैनर। सामग्री भेजिए, हम सब एक जैसी स्टाइल में डिज़ाइन कर देंगे।",
        },
      },
    ],
  },
  {
    slug: "delhi-ncr",
    intro: {
      en: "Startups and agencies in Gurugram, Noida and Delhi use us for print runs that are expensive in the city: welcome kits, diaries, calendars, boxes and event standees. Artwork and proofs go back and forth on WhatsApp, and the courier does the rest.",
      hi: "गुरुग्राम, नोएडा और दिल्ली के स्टार्टअप और एजेंसियाँ वो काम हमसे कराती हैं जो शहर में महँगे पड़ते हैं: वेलकम किट, डायरी, कैलेंडर, डिब्बे और इवेंट स्टैंडी। आर्टवर्क और प्रूफ़ WhatsApp पर आते-जाते हैं, बाकी कूरियर करता है।",
    },
    delivery: [
      { en: "Courier across Delhi NCR in 2–3 days: ₹99", hi: "पूरे दिल्ली NCR में 2–3 दिन में कूरियर: ₹99" },
      { en: "Multi-address dispatch for kits on request", hi: "मांग पर किट की अलग-अलग पतों पर डिलीवरी" },
      { en: "GST invoice with your company GSTIN", hi: "आपकी कंपनी के GSTIN के साथ GST बिल" },
    ],
    products: ["corporate-diaries", "calendars", "printed-tshirts", "roll-up-standee", "mono-cartons", "brochures"],
    faqs: [
      {
        question: { en: "Can you ship kits to several addresses?", hi: "क्या किट कई पतों पर भेज सकते हैं?" },
        answer: {
          en: "Yes — share an address sheet and we'll pack and dispatch each kit separately, at courier cost.",
          hi: "हाँ — पतों की शीट दें, हम हर किट अलग पैक करके भेजेंगे, कूरियर खर्च पर।",
        },
      },
    ],
  },
  {
    slug: "gurugram",
    intro: {
      en: "Gurugram offices and startups order welcome kits, branded diaries, ID cards, brochures and event standees from us. Send artwork from your desk on WhatsApp, approve the proof there, and receive the order by courier with a GST invoice in your company's name.",
      hi: "गुरुग्राम के ऑफ़िस और स्टार्टअप हमसे वेलकम किट, ब्रांडेड डायरी, आईडी कार्ड, ब्रोशर और इवेंट स्टैंडी मँगाते हैं। अपनी डेस्क से आर्टवर्क WhatsApp पर भेजें, वहीं प्रूफ़ पास करें, और कंपनी के नाम GST बिल के साथ कूरियर से ऑर्डर पाएँ।",
    },
    delivery: [
      { en: "Courier to Gurugram: ₹99, usually 2–3 days", hi: "गुरुग्राम कूरियर: ₹99, आमतौर पर 2–3 दिन" },
      { en: "GST invoice with your company GSTIN", hi: "आपकी कंपनी के GSTIN के साथ GST बिल" },
      { en: "Kits packed for several addresses on request", hi: "मांग पर कई पतों के लिए अलग-अलग किट पैकिंग" },
    ],
    products: ["corporate-diaries", "pvc-id-cards", "brochures", "roll-up-standee", "printed-tshirts", "letterheads"],
    faqs: [
      {
        question: { en: "Can you match our brand colours?", hi: "क्या आप हमारे ब्रांड के रंग मिला सकते हैं?" },
        answer: {
          en: "Share the Pantone or CMYK values from your brand guide. We match them on press and can print a colour sample before the full run.",
          hi: "अपनी ब्रांड गाइड से Pantone या CMYK वैल्यू भेजें। हम मशीन पर मिलाते हैं और पूरी छपाई से पहले कलर सैंपल दे सकते हैं।",
        },
      },
    ],
  },
  {
    slug: "noida",
    intro: {
      en: "Noida's D2C brands and agencies order labels, product boxes, hang tags and marketing prints from us. You see the price instantly, approve the proof on WhatsApp, and a repeat order is a single message because we keep your approved files.",
      hi: "नोएडा के D2C ब्रांड और एजेंसियाँ हमसे लेबल, प्रोडक्ट बॉक्स, हैंग टैग और मार्केटिंग प्रिंट मँगाती हैं। रेट तुरंत दिखता है, प्रूफ़ WhatsApp पर पास होता है, और दोबारा ऑर्डर बस एक मैसेज है क्योंकि हम आपकी पास की हुई फ़ाइलें रखते हैं।",
    },
    delivery: [
      { en: "Courier to Noida and Greater Noida: ₹99, usually 2–3 days", hi: "नोएडा और ग्रेटर नोएडा कूरियर: ₹99, आमतौर पर 2–3 दिन" },
      { en: "Repeat orders from your saved, approved files", hi: "सहेजी हुई, पास की गई फ़ाइलों से दोबारा ऑर्डर" },
      { en: "GST invoice on every order", hi: "हर ऑर्डर पर GST बिल" },
    ],
    products: ["labels-stickers", "mono-cartons", "hang-tags", "paper-bags", "brochures", "visiting-cards"],
    faqs: [
      {
        question: { en: "What is the minimum quantity for labels and boxes?", hi: "लेबल और बॉक्स की न्यूनतम मात्रा कितनी है?" },
        answer: {
          en: "Each product page shows its minimum quantity with the price. Short digital runs suit testing a new product; offset works out cheaper as quantities grow.",
          hi: "हर प्रोडक्ट पेज पर रेट के साथ न्यूनतम मात्रा दिखती है। नया प्रोडक्ट आज़माने के लिए कम मात्रा की डिजिटल छपाई ठीक है; मात्रा बढ़ने पर ऑफ़सेट सस्ता पड़ता है।",
        },
      },
    ],
  },
  {
    slug: "faridabad",
    intro: {
      en: "Factories, workshops and shops in Faridabad order letterheads, bill books, safety signage, product labels and cartons from us. Everything is priced online, proofed on WhatsApp and couriered with a GST invoice.",
      hi: "फ़रीदाबाद की फ़ैक्टरियाँ, वर्कशॉप और दुकानें हमसे लेटरहेड, बिल बुक, सेफ़्टी साइनेज, प्रोडक्ट लेबल और कार्टन मँगाती हैं। सबका रेट ऑनलाइन, प्रूफ़ WhatsApp पर, और GST बिल के साथ कूरियर।",
    },
    delivery: [
      { en: "Courier to Faridabad: ₹99, usually 2–3 days", hi: "फ़रीदाबाद कूरियर: ₹99, आमतौर पर 2–3 दिन" },
      { en: "Bulk and repeat orders for industrial units", hi: "औद्योगिक इकाइयों के लिए बल्क और रिपीट ऑर्डर" },
      { en: "Pay by UPI after approving the proof", hi: "प्रूफ़ पास करने के बाद UPI से भुगतान" },
    ],
    products: ["letterheads", "bill-books", "vinyl-sunboard", "labels-stickers", "mono-cartons", "pvc-id-cards"],
    faqs: [
      {
        question: { en: "Do you print numbered bill books?", hi: "क्या नंबर वाली बिल बुक छापते हैं?" },
        answer: {
          en: "Yes — duplicate or triplicate bill books on carbonless paper, 50 serially numbered sets per book, with your business details and GSTIN printed.",
          hi: "हाँ — बिना कार्बन वाले पेपर पर डुप्लीकेट या ट्रिप्लीकेट बिल बुक, हर बुक में 50 सीरियल नंबर वाले सेट, आपके व्यवसाय की जानकारी और GSTIN के साथ।",
        },
      },
    ],
  },
  {
    slug: "ghaziabad",
    intro: {
      en: "Schools, coaching centres and shops in Ghaziabad use us for session printing, admission material and shop branding. Order online with an instant price, approve the proof on WhatsApp and the courier delivers.",
      hi: "गाज़ियाबाद के स्कूल, कोचिंग सेंटर और दुकानें हमसे सेशन की छपाई, एडमिशन सामग्री और दुकान की ब्रांडिंग कराते हैं। तुरंत रेट के साथ ऑनलाइन ऑर्डर करें, WhatsApp पर प्रूफ़ पास करें और कूरियर पहुँचा देगा।",
    },
    delivery: [
      { en: "Courier to Ghaziabad: ₹99, usually 2–3 days", hi: "गाज़ियाबाद कूरियर: ₹99, आमतौर पर 2–3 दिन" },
      { en: "School and coaching orders packed class-wise or batch-wise", hi: "स्कूल और कोचिंग के ऑर्डर क्लास-वार या बैच-वार पैक" },
      { en: "GST invoice on every order", hi: "हर ऑर्डर पर GST बिल" },
    ],
    products: ["school-diaries", "student-id-cards", "admission-forms", "pamphlets-flyers", "flex-banners", "report-cards"],
    faqs: [
      {
        question: { en: "How early should schools order session material?", hi: "स्कूल सेशन की सामग्री कितनी पहले ऑर्डर करें?" },
        answer: {
          en: "Two to three weeks before the session is comfortable for diaries, ID cards and report cards; pamphlets and forms can be done in a few days.",
          hi: "डायरी, आईडी कार्ड और रिपोर्ट कार्ड के लिए सेशन से दो-तीन हफ़्ते पहले ठीक रहता है; पैम्फ़लेट और फ़ॉर्म कुछ दिनों में हो जाते हैं।",
        },
      },
    ],
  },
  {
    slug: "india",
    intro: {
      en: "We ship printed work across India. See an instant GST-inclusive price online, send the order and artwork on WhatsApp, approve the proof and get updates until it reaches you — the same process our Alwar customers use at the counter.",
      hi: "हम पूरे भारत में छपाई भेजते हैं। ऑनलाइन तुरंत GST सहित रेट देखें, ऑर्डर और आर्टवर्क WhatsApp पर भेजें, प्रूफ़ अप्रूव करें और पहुँचने तक अपडेट पाएँ — वही तरीका जो अलवर के ग्राहक काउंटर पर अपनाते हैं।",
    },
    delivery: [
      { en: "Courier anywhere in India in 3–6 days: ₹99", hi: "भारत में कहीं भी 3–6 दिन में कूरियर: ₹99" },
      { en: "Pay by UPI only after you approve the proof", hi: "प्रूफ़ पास करने के बाद ही UPI से भुगतान" },
      { en: "Courier tracking link on WhatsApp as soon as it ships", hi: "शिप होते ही WhatsApp पर कूरियर ट्रैकिंग लिंक" },
    ],
    products: ["visiting-cards", "labels-stickers", "wedding-cards", "photo-mug", "calendars", "canvas-prints"],
    faqs: [
      {
        question: { en: "What if my parcel arrives damaged?", hi: "पार्सल खराब पहुँचे तो?" },
        answer: {
          en: "Send photos within 48 hours of delivery and we'll reprint the damaged items at no cost.",
          hi: "डिलीवरी के 48 घंटे में फ़ोटो भेजें, खराब चीज़ें हम मुफ़्त दोबारा छाप देंगे।",
        },
      },
    ],
  },
];

export function getCityPage(slug: string): CityPage | undefined {
  return cityPages.find((c) => c.slug === slug);
}
