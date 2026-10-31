import { siteConfig } from "@/config/site.config";
import type { L } from "@/types/i18n";

export type LegalSection = { id: string; title: L; body: L[]; list?: L[] };
export type LegalDoc = { slug: LegalSlug; updated: string; intro: L; sections: LegalSection[] };
export type LegalSlug = "privacy" | "terms" | "refund-cancellation" | "shipping-delivery";

const days = siteConfig.artworkRetentionDays;
const g = siteConfig.grievance;
const d = siteConfig.delivery;

/**
 * Plain-language policies. They describe how this site actually behaves (what is stored, where and
 * for how long) — keep them in step with the code, and have them reviewed before launch.
 */
export const legalDocs: Record<LegalSlug, LegalDoc> = {
  privacy: {
    slug: "privacy",
    updated: "2026-10-31",
    intro: {
      en: `This notice explains what personal data ${siteConfig.brandName} collects when you order, ask for a quote or contact us, why we need it, how long we keep it and the rights you have under India's Digital Personal Data Protection Act, 2023 (DPDP Act).`,
      hi: `यह सूचना बताती है कि ऑर्डर करते, कोटेशन माँगते या संपर्क करते समय ${siteConfig.hindi} कौन-सा निजी डेटा लेता है, क्यों लेता है, कितने समय रखता है, और भारत के डिजिटल व्यक्तिगत डेटा संरक्षण अधिनियम, 2023 (DPDP अधिनियम) के तहत आपके क्या अधिकार हैं।`,
    },
    sections: [
      {
        id: "what",
        title: { en: "What we collect", hi: "हम क्या लेते हैं" },
        body: [
          {
            en: "This website does not store anything you type. When you send an order, enquiry or request from a form here, your browser opens WhatsApp with the message written out, and nothing reaches us until you press Send. From the messages you send us, and at the counter, we keep only what we need to print and deliver your order:",
            hi: "यह वेबसाइट आपकी लिखी कोई जानकारी सेव नहीं करती। यहाँ के किसी फ़ॉर्म से ऑर्डर, पूछताछ या अनुरोध भेजने पर आपका ब्राउज़र WhatsApp में लिखा हुआ मैसेज खोलता है, और जब तक आप Send नहीं दबाते, हम तक कुछ नहीं पहुँचता। आपके भेजे मैसेज से और काउंटर पर हम सिर्फ़ उतना रखते हैं जितना ऑर्डर छापने और पहुँचाने के लिए ज़रूरी है:",
          },
        ],
        list: [
          {
            en: "Your name and mobile number, and email, business name and GSTIN if you give them",
            hi: "आपका नाम और मोबाइल नंबर, और ईमेल, व्यवसाय का नाम व GSTIN अगर आप दें",
          },
          { en: "A delivery address, only if you choose delivery", hi: "डिलीवरी का पता, सिर्फ़ अगर आप डिलीवरी चुनें" },
          {
            en: "The artwork files you send us on WhatsApp or bring to the shop, and the details of what you ordered",
            hi: "WhatsApp पर भेजी या दुकान पर लाई गई आर्टवर्क फ़ाइलें और ऑर्डर का विवरण",
          },
          {
            en: "UPI payment references — we never see your UPI PIN or bank details",
            hi: "UPI भुगतान के रेफ़रेंस नंबर — आपका UPI पिन या बैंक विवरण हम कभी नहीं देखते",
          },
          { en: "What you write in an enquiry", hi: "पूछताछ में आप जो लिखें" },
        ],
      },
      {
        id: "why",
        title: { en: "Why we use it", hi: "हम इसका इस्तेमाल क्यों करते हैं" },
        body: [
          {
            en: "To prepare proofs, print and deliver your order, send you order updates by WhatsApp, SMS or phone, issue GST invoices and answer your questions. We rely on your consent, which you give by sending us your details, and on legal obligations such as keeping tax records. We do not sell your data or use it for advertising.",
            hi: "प्रूफ़ बनाने, आपका ऑर्डर छापने और पहुँचाने, WhatsApp, SMS या फ़ोन से अपडेट भेजने, GST बिल बनाने और आपके सवालों का जवाब देने के लिए। इसका आधार आपकी सहमति है, जो आप अपनी जानकारी भेजकर देते हैं, और टैक्स रिकॉर्ड रखने जैसी कानूनी ज़िम्मेदारियाँ। हम आपका डेटा न बेचते हैं, न विज्ञापन के लिए इस्तेमाल करते हैं।",
          },
        ],
      },
      {
        id: "sharing",
        title: { en: "Who we share it with", hi: "हम किसके साथ साझा करते हैं" },
        body: [
          {
            en: "Only with services that help us run the order, each bound to protect it:",
            hi: "सिर्फ़ उन सेवाओं के साथ जो ऑर्डर चलाने में मदद करती हैं, और जो इसे सुरक्षित रखने के लिए बाध्य हैं:",
          },
        ],
        list: [
          {
            en: "WhatsApp (Meta) — carries the orders, enquiries and files you choose to send us, and the proofs and updates we send back",
            hi: "WhatsApp (Meta) — आपके भेजे ऑर्डर, पूछताछ और फ़ाइलें, और हमारे भेजे प्रूफ़ व अपडेट पहुँचाता है",
          },
          { en: "Courier partners — receive your name, phone and address to deliver", hi: "कूरियर पार्टनर — डिलीवरी के लिए आपका नाम, फ़ोन और पता" },
          {
            en: "Our web host — serves the pages of this website; the forms send nothing to it",
            hi: "हमारा वेब होस्ट — इस वेबसाइट के पेज दिखाता है; फ़ॉर्म इसे कुछ नहीं भेजते",
          },
        ],
      },
      {
        id: "retention",
        title: { en: "How long we keep it", hi: "हम कितने समय रखते हैं" },
        body: [],
        list: [
          {
            en: `Artwork files are deleted ${days} days after your order is delivered.`,
            hi: `आर्टवर्क फ़ाइलें ऑर्डर डिलीवर होने के ${days} दिन बाद डिलीट कर दी जाती हैं।`,
          },
          {
            en: "Order records and invoices are kept for eight years to meet GST and tax record-keeping rules, then deleted.",
            hi: "ऑर्डर रिकॉर्ड और बिल GST और टैक्स रिकॉर्ड के नियमों के लिए आठ साल रखे जाते हैं, फिर डिलीट।",
          },
          { en: "Enquiries that don't become orders are deleted within 12 months.", hi: "जो पूछताछ ऑर्डर नहीं बनती, वह 12 महीने के अंदर डिलीट कर दी जाती है।" },
        ],
      },
      {
        id: "device",
        title: { en: "Cookies and your browser", hi: "कुकीज़ और आपका ब्राउज़र" },
        body: [
          {
            en: "Your cart, saved quote and cookie choice are stored in your own browser so they survive a refresh; they never leave your device unless you send an order on WhatsApp. Analytics (Google Analytics and Microsoft Clarity) load only if you tap Accept on the cookie banner, and you can change your mind by clearing site data.",
            hi: "आपकी कार्ट, सेव कोटेशन और कुकी की पसंद आपके ही ब्राउज़र में रखी जाती है ताकि रिफ़्रेश पर न मिटें; WhatsApp पर ऑर्डर भेजे बिना ये आपके डिवाइस से बाहर नहीं जातीं। एनालिटिक्स (Google Analytics और Microsoft Clarity) सिर्फ़ तभी लोड होते हैं जब आप कुकी बैनर पर स्वीकार दबाएँ; साइट डेटा साफ़ करके आप फ़ैसला बदल सकते हैं।",
          },
        ],
      },
      {
        id: "rights",
        title: { en: "Your rights", hi: "आपके अधिकार" },
        body: [{ en: "Under the DPDP Act you can:", hi: "DPDP अधिनियम के तहत आप:" }],
        list: [
          { en: "Ask what personal data we hold about you and how it is used", hi: "पूछ सकते हैं कि हमारे पास आपका कौन-सा डेटा है और कैसे इस्तेमाल होता है" },
          { en: "Ask us to correct or complete it", hi: "उसे सुधारने या पूरा करने को कह सकते हैं" },
          {
            en: "Withdraw consent and ask us to delete it (records the law makes us keep are restricted, not used)",
            hi: "सहमति वापस लेकर डिलीट करने को कह सकते हैं (जो रिकॉर्ड कानूनन रखने ज़रूरी हैं, वे सीमित रहते हैं, इस्तेमाल नहीं होते)",
          },
          { en: "Nominate someone to act for you", hi: "अपनी ओर से किसी को नामित कर सकते हैं" },
          {
            en: "Complain to our Grievance Officer, and then to the Data Protection Board of India",
            hi: "हमारे शिकायत अधिकारी से, और फिर भारतीय डेटा संरक्षण बोर्ड से शिकायत कर सकते हैं",
          },
        ],
      },
      {
        id: "grievance",
        title: { en: "Grievance Officer", hi: "शिकायत अधिकारी" },
        body: [
          {
            en: `${[g.name, g.email, g.phone, siteConfig.address.full.en].filter(Boolean).join(" · ")}. We acknowledge requests within 7 days and resolve them within 30 days.`,
            hi: `${[g.name, g.email, g.phone, siteConfig.address.full.hi].filter(Boolean).join(" · ")}। अनुरोध 7 दिन में स्वीकार और 30 दिन में हल करते हैं।`,
          },
        ],
      },
      {
        id: "children",
        title: { en: "Children", hi: "बच्चे" },
        body: [
          {
            en: "Orders must be placed by adults. School orders are placed by the school, which is responsible for any student details it sends us, and we use them only to print that order.",
            hi: "ऑर्डर वयस्कों को ही देना चाहिए। स्कूल के ऑर्डर स्कूल देता है, जो भेजे गए छात्रों के विवरण के लिए ज़िम्मेदार है; हम उनका इस्तेमाल सिर्फ़ वही ऑर्डर छापने के लिए करते हैं।",
          },
        ],
      },
    ],
  },
  terms: {
    slug: "terms",
    updated: "2026-10-31",
    intro: {
      en: `These terms apply when you order printing from ${siteConfig.brandName}, ${siteConfig.address.full.en}, through this website, WhatsApp or at the counter.`,
      hi: `ये शर्तें तब लागू होती हैं जब आप इस वेबसाइट, WhatsApp या काउंटर के ज़रिए ${siteConfig.hindi}, ${siteConfig.address.full.hi} से छपाई का ऑर्डर देते हैं।`,
    },
    sections: [
      {
        id: "prices",
        title: { en: "Prices and quotes", hi: "रेट और कोटेशन" },
        body: [
          {
            en: "Prices shown on the site include GST. The total in your WhatsApp order is an estimate; we confirm the final price on WhatsApp before printing, and you pay only after you approve the proof. Custom sizes, special stocks or very large quantities may need a manual quote.",
            hi: "साइट पर दिखाए रेट GST सहित हैं। WhatsApp ऑर्डर में लिखा कुल अनुमानित है; छपाई से पहले हम WhatsApp पर फ़ाइनल रेट पक्का करते हैं, और भुगतान प्रूफ़ पास करने के बाद ही होता है। कस्टम साइज़, खास पेपर या बहुत बड़ी मात्रा के लिए अलग कोटेशन लग सकता है।",
          },
        ],
      },
      {
        id: "proofs",
        title: { en: "Proofs and your approval", hi: "प्रूफ़ और आपकी मंज़ूरी" },
        body: [
          {
            en: "We send a digital proof before printing. Please check spelling, numbers, dates and layout carefully: once you approve, we print exactly what you approved. Screen colours differ from ink on paper, and small colour variation between runs is normal in printing.",
            hi: "छपाई से पहले हम डिजिटल प्रूफ़ भेजते हैं। स्पेलिंग, नंबर, तारीख़ और लेआउट ध्यान से जाँचें: अप्रूव करने के बाद हम ठीक वही छापते हैं। स्क्रीन के रंग काग़ज़ पर स्याही से अलग दिखते हैं, और अलग-अलग छपाई में थोड़ा रंग-अंतर सामान्य है।",
          },
        ],
      },
      {
        id: "artwork",
        title: { en: "Your artwork", hi: "आपका आर्टवर्क" },
        body: [
          {
            en: "You confirm that you have the right to print everything you send us, including logos, photos and text. We won't print content that is illegal, defamatory, infringes someone's rights, or impersonates another business or government body, and we may refuse or cancel such orders with a full refund.",
            hi: "आप पुष्टि करते हैं कि भेजी गई हर चीज़ — लोगो, फ़ोटो और टेक्स्ट — छपवाने का आपको अधिकार है। गैरकानूनी, मानहानिकारक, किसी के अधिकार का उल्लंघन करने वाली या किसी दूसरे व्यवसाय या सरकारी संस्था की नकल करने वाली सामग्री हम नहीं छापते, और ऐसे ऑर्डर पूरी वापसी के साथ मना या रद्द कर सकते हैं।",
          },
        ],
      },
      {
        id: "design",
        title: { en: "Design work", hi: "डिज़ाइन का काम" },
        body: [
          {
            en: "Design fees cover the work described when you order. Once paid, the final design files are yours to use anywhere. Drafts and unused concepts remain ours.",
            hi: "डिज़ाइन फ़ीस उसी काम के लिए है जो ऑर्डर के समय बताया गया। भुगतान के बाद फ़ाइनल डिज़ाइन फ़ाइलें आपकी हैं, कहीं भी इस्तेमाल करें। ड्राफ़्ट और इस्तेमाल न हुए कॉन्सेप्ट हमारे रहते हैं।",
          },
        ],
      },
      {
        id: "turnaround",
        title: { en: "Turnaround", hi: "तैयार होने का समय" },
        body: [
          {
            en: "Turnaround times start when you approve the proof. They are our honest estimates; if we miss an express deadline that we accepted, the express charge is refunded.",
            hi: "तैयार होने का समय प्रूफ़ अप्रूव होने से शुरू होता है। ये हमारे ईमानदार अनुमान हैं; अगर हमने एक्सप्रेस डेडलाइन मानी और चूक गए, तो एक्सप्रेस चार्ज वापस।",
          },
        ],
      },
      {
        id: "liability",
        title: { en: "Our responsibility", hi: "हमारी ज़िम्मेदारी" },
        body: [
          {
            en: "If something is wrong because of us, we reprint it free or refund it — see the Refund & Cancellation Policy. Our liability for any order is limited to the amount you paid for it.",
            hi: "अगर गलती हमारी वजह से है, तो हम फ़्री दोबारा छापते हैं या पैसे लौटाते हैं — रिफ़ंड और कैंसलेशन नीति देखें। किसी भी ऑर्डर के लिए हमारी ज़िम्मेदारी उसकी चुकाई गई रकम तक सीमित है।",
          },
        ],
      },
      {
        id: "law",
        title: { en: "Law and disputes", hi: "कानून और विवाद" },
        body: [
          {
            en: "These terms are governed by the laws of India. We'd always rather sort things out over a phone call; if that fails, courts in Alwar, Rajasthan have jurisdiction.",
            hi: "ये शर्तें भारत के कानूनों के अधीन हैं। हम हमेशा फ़ोन पर बात करके हल निकालना पसंद करेंगे; न हो सके तो अलवर, राजस्थान की अदालतों का अधिकार क्षेत्र होगा।",
          },
        ],
      },
    ],
  },
  "refund-cancellation": {
    slug: "refund-cancellation",
    updated: "2026-10-31",
    intro: {
      en: "Printing is made to order, so what can be cancelled depends on how far your job has gone. Here's exactly how it works.",
      hi: "छपाई ऑर्डर पर बनती है, इसलिए रद्द करना इस पर निर्भर है कि काम कहाँ तक पहुँचा। यह रहा पूरा तरीका।",
    },
    sections: [
      {
        id: "cancel",
        title: { en: "Cancelling an order", hi: "ऑर्डर रद्द करना" },
        body: [],
        list: [
          { en: "Before you approve the proof: cancel free, with a full refund.", hi: "प्रूफ़ अप्रूव करने से पहले: फ़्री रद्द, पूरी वापसी।" },
          {
            en: "After approval but before printing starts: we refund everything except any design fee for work already done.",
            hi: "अप्रूव के बाद पर छपाई शुरू होने से पहले: हो चुके डिज़ाइन काम की फ़ीस छोड़कर सब वापस।",
          },
          {
            en: "Once printing has started: the job can't be cancelled, because the materials are cut to your design.",
            hi: "छपाई शुरू होने के बाद: रद्द नहीं हो सकता, क्योंकि सामग्री आपके डिज़ाइन पर कट चुकी है।",
          },
        ],
      },
      {
        id: "problems",
        title: { en: "If something is wrong", hi: "अगर कुछ गड़बड़ हो" },
        body: [
          {
            en: "Tell us within 48 hours of pickup or delivery, with photos on WhatsApp. If the fault is ours — a printing defect, wrong stock, wrong quantity, or a difference from the approved proof — we reprint free or refund, your choice.",
            hi: "पिकअप या डिलीवरी के 48 घंटे में WhatsApp पर फ़ोटो के साथ बताएँ। अगर गलती हमारी है — छपाई में खराबी, गलत पेपर, गलत मात्रा, या अप्रूव प्रूफ़ से अलग — तो आपकी पसंद से फ़्री दोबारा छपाई या पैसे वापस।",
          },
          {
            en: "We can't refund errors that were present in a proof you approved, or the normal slight colour variation between screen and paper.",
            hi: "अप्रूव किए प्रूफ़ में मौजूद गलतियों, या स्क्रीन और काग़ज़ के बीच सामान्य हल्के रंग-अंतर के लिए वापसी नहीं होगी।",
          },
        ],
      },
      {
        id: "how",
        title: { en: "How refunds are paid", hi: "वापसी कैसे होती है" },
        body: [
          {
            en: "UPI payments are refunded by UPI to the same account within 5–7 working days of approval. Cash payments are refunded in cash or by UPI.",
            hi: "UPI भुगतान मंज़ूरी के 5–7 कार्य दिवसों में उसी खाते में UPI से लौटाया जाता है। नकद भुगतान नकद या UPI से लौटाया जाता है।",
          },
        ],
      },
    ],
  },
  "shipping-delivery": {
    slug: "shipping-delivery",
    updated: "2026-10-31",
    intro: {
      en: "Collect from the shop, get it delivered in Laxmangarh, or have it couriered anywhere in India.",
      hi: "दुकान से ले जाएँ, लक्ष्मणगढ़ में डिलीवरी लें, या भारत में कहीं भी कूरियर से मँगाएँ।",
    },
    sections: [
      {
        id: "options",
        title: { en: "Delivery options and charges", hi: "डिलीवरी के विकल्प और चार्ज" },
        body: [],
        list: [
          {
            en: `Shop pickup on Kathumar Road, Laxmangarh, Alwar: free. We'll message you when it's ready.`,
            hi: `पंचायत समिति, कठूमर रोड, लक्ष्मणगढ़, अलवर में दुकान से लें: फ़्री। तैयार होने पर मैसेज करेंगे।`,
          },
          {
            en: `Local delivery within Laxmangarh (PIN 321607): ₹${d.local}, free on orders above ₹${d.localFreeAbove}. Usually the same or next working day after printing.`,
            hi: `लक्ष्मणगढ़ (पिन 321607) में लोकल डिलीवरी: ₹${d.local}, ₹${d.localFreeAbove} से ऊपर फ़्री। आमतौर पर छपाई के उसी या अगले कार्य दिवस।`,
          },
          {
            en: `Courier anywhere in India: ₹${d.courier} per order. 1–3 days to nearby cities and Delhi NCR, 3–6 days elsewhere.`,
            hi: `भारत में कहीं भी कूरियर: ₹${d.courier} प्रति ऑर्डर। पास के शहरों और दिल्ली NCR में 1–3 दिन, बाकी जगह 3–6 दिन।`,
          },
        ],
      },
      {
        id: "when",
        title: { en: "When it ships", hi: "कब भेजा जाता है" },
        body: [
          {
            en: "Orders ship after proof approval, payment and production. The turnaround on each product page plus the courier time gives your expected date. You'll get the tracking details on WhatsApp.",
            hi: "प्रूफ़ अप्रूव, भुगतान और छपाई के बाद ऑर्डर भेजा जाता है। हर प्रोडक्ट पेज पर लिखा समय और कूरियर का समय मिलाकर अनुमानित तारीख़ बनती है। ट्रैकिंग विवरण WhatsApp पर मिलेगा।",
          },
        ],
      },
      {
        id: "packing",
        title: { en: "Packing and damage", hi: "पैकिंग और नुकसान" },
        body: [
          {
            en: "Cards are shrink-wrapped and boxed; flex and posters travel rolled, never folded. If anything arrives damaged, send photos within 48 hours and we'll reprint the damaged items free.",
            hi: "कार्ड श्रिंक-रैप करके डिब्बे में; फ्लेक्स और पोस्टर रोल करके, कभी मोड़कर नहीं। कुछ भी खराब पहुँचे तो 48 घंटे में फ़ोटो भेजें, खराब चीज़ें फ़्री दोबारा छापेंगे।",
          },
        ],
      },
      {
        id: "address",
        title: { en: "Address and delays", hi: "पता और देरी" },
        body: [
          {
            en: "Please double-check your address and PIN code. Re-delivery caused by a wrong address is charged at courier cost. Courier delays caused by weather, strikes or holidays are outside our control, but we'll chase them for you. We don't ship outside India yet.",
            hi: "पता और पिन कोड दोबारा जाँचें। गलत पते की वजह से दोबारा डिलीवरी का खर्च कूरियर के हिसाब से लगेगा। मौसम, हड़ताल या छुट्टियों से कूरियर में देरी हमारे बस में नहीं, पर हम आपके लिए पीछा करेंगे। अभी भारत के बाहर नहीं भेजते।",
          },
        ],
      },
    ],
  },
};
