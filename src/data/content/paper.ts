import type { InkColour } from "@/types/catalog";
import type { L } from "@/types/i18n";

/** Thickness stack on the paper guide: height is relative caliper, not to scale. */
export const gsmStack: { gsm: number; feel: L; example: L; caliper: number }[] = [
  {
    gsm: 70,
    feel: { en: "Thin, see-through", hi: "पतला, आर-पार दिखता" },
    example: { en: "Photocopies, question papers", hi: "फ़ोटोकॉपी, प्रश्न-पत्र" },
    caliper: 1,
  },
  {
    gsm: 90,
    feel: { en: "Everyday office paper", hi: "रोज़ का ऑफ़िस पेपर" },
    example: { en: "Letterheads, bill books", hi: "लेटरहेड, बिल बुक" },
    caliper: 1.3,
  },
  { gsm: 130, feel: { en: "Smooth, doesn't curl", hi: "चिकना, मुड़ता नहीं" }, example: { en: "Pamphlets, flyers", hi: "पैम्फ़लेट, फ़्लायर" }, caliper: 1.8 },
  { gsm: 170, feel: { en: "Brochure weight", hi: "ब्रोशर जितना" }, example: { en: "Brochures, posters, menus", hi: "ब्रोशर, पोस्टर, मेन्यू" }, caliper: 2.3 },
  {
    gsm: 250,
    feel: { en: "Light card", hi: "हल्का कार्ड" },
    example: { en: "Certificates, covers, tent cards", hi: "सर्टिफ़िकेट, कवर, टेंट कार्ड" },
    caliper: 3.3,
  },
  {
    gsm: 350,
    feel: { en: "Stiff, premium card", hi: "सख़्त, प्रीमियम कार्ड" },
    example: { en: "Visiting cards, wedding cards", hi: "विज़िटिंग कार्ड, शादी के कार्ड" },
    caliper: 4.5,
  },
];

export const paperTypes: { id: string; name: L; body: L; usedFor: L; colour: InkColour }[] = [
  {
    id: "maplitho",
    name: { en: "Maplitho", hi: "मैपलिथो" },
    body: {
      en: "Uncoated, slightly rough, easy to write on with any pen. Ink soaks in a little, so colours look softer.",
      hi: "बिना कोटिंग, थोड़ा खुरदरा, किसी भी पेन से आसानी से लिखें। स्याही थोड़ी सोखता है, इसलिए रंग हल्के दिखते हैं।",
    },
    usedFor: { en: "Letterheads, bill books, forms, notebooks", hi: "लेटरहेड, बिल बुक, फ़ॉर्म, नोटबुक" },
    colour: "ink",
  },
  {
    id: "art-paper",
    name: { en: "Art paper (gloss or matte)", hi: "आर्ट पेपर (ग्लॉस या मैट)" },
    body: {
      en: "Coated, so ink sits on top and photos stay sharp and bright. Gloss shines; matte is calmer and easier to read.",
      hi: "कोटेड, इसलिए स्याही ऊपर रहती है और फ़ोटो तीखी और चमकदार दिखती हैं। ग्लॉस चमकता है; मैट शांत और पढ़ने में आसान।",
    },
    usedFor: { en: "Pamphlets, brochures, posters, catalogues", hi: "पैम्फ़लेट, ब्रोशर, पोस्टर, कैटलॉग" },
    colour: "cyan",
  },
  {
    id: "art-card",
    name: { en: "Art card", hi: "आर्ट कार्ड" },
    body: {
      en: "The thick version of art paper, 250–400 GSM. Takes lamination, foil and spot UV well.",
      hi: "आर्ट पेपर का मोटा रूप, 250–400 GSM। लैमिनेशन, फ़ॉइल और स्पॉट UV अच्छे से लेता है।",
    },
    usedFor: { en: "Visiting cards, covers, certificates, boxes", hi: "विज़िटिंग कार्ड, कवर, सर्टिफ़िकेट, डिब्बे" },
    colour: "magenta",
  },
  {
    id: "bond",
    name: { en: "Bond paper", hi: "बॉन्ड पेपर" },
    body: {
      en: "Crisp with a faint texture and a quality feel in the hand. Good for documents that should look official.",
      hi: "कड़क, हल्की बनावट और हाथ में अच्छा एहसास। ऑफ़िशियल दिखने वाले काग़ज़ों के लिए बढ़िया।",
    },
    usedFor: { en: "Premium letterheads, agreements, certificates", hi: "प्रीमियम लेटरहेड, एग्रीमेंट, सर्टिफ़िकेट" },
    colour: "blue",
  },
  {
    id: "textured",
    name: { en: "Textured & metallic stocks", hi: "टेक्सचर और मेटैलिक पेपर" },
    body: {
      en: "Linen, felt, pearl and shimmer sheets imported for invitations. They cost more but need less decoration to look special.",
      hi: "लिनन, फ़ेल्ट, पर्ल और शिमर शीट, खासकर निमंत्रण के लिए। महँगे हैं, पर कम सजावट में ही खास लगते हैं।",
    },
    usedFor: { en: "Wedding cards, premium visiting cards", hi: "शादी के कार्ड, प्रीमियम विज़िटिंग कार्ड" },
    colour: "foil",
  },
  {
    id: "kraft",
    name: { en: "Kraft", hi: "क्राफ़्ट" },
    body: {
      en: "Brown, unbleached and strong. White ink and one-colour designs look best on it.",
      hi: "भूरा, बिना ब्लीच किया और मज़बूत। सफ़ेद स्याही और एक-रंगी डिज़ाइन इस पर सबसे अच्छे लगते हैं।",
    },
    usedFor: { en: "Paper bags, tags, eco-friendly packaging", hi: "पेपर बैग, टैग, इको-फ़्रेंडली पैकेजिंग" },
    colour: "yellow",
  },
];

export const finishes: { id: string; name: L; body: L; best: L }[] = [
  {
    id: "matte",
    name: { en: "Matte lamination", hi: "मैट लैमिनेशन" },
    body: {
      en: "A thin film with no shine. Protects from water and fingerprints and feels smooth.",
      hi: "बिना चमक वाली पतली परत। पानी और उँगलियों के निशान से बचाती है, छूने में चिकनी।",
    },
    best: { en: "Visiting cards, menus, covers", hi: "विज़िटिंग कार्ड, मेन्यू, कवर" },
  },
  {
    id: "gloss",
    name: { en: "Gloss lamination", hi: "ग्लॉस लैमिनेशन" },
    body: {
      en: "High shine that makes photos pop. Shows fingerprints more than matte.",
      hi: "तेज़ चमक, फ़ोटो उभरकर दिखती हैं। मैट से ज़्यादा उँगलियों के निशान दिखते हैं।",
    },
    best: { en: "Photo-heavy flyers, posters", hi: "फ़ोटो वाले फ़्लायर, पोस्टर" },
  },
  {
    id: "velvet",
    name: { en: "Velvet (soft-touch)", hi: "वेलवेट (सॉफ़्ट-टच)" },
    body: { en: "Feels like suede. People keep touching it — which is the point.", hi: "छूने में मखमल जैसा। लोग बार-बार छूते हैं — यही तो मकसद है।" },
    best: { en: "Premium visiting cards, luxury boxes", hi: "प्रीमियम विज़िटिंग कार्ड, लग्ज़री डिब्बे" },
  },
  {
    id: "spot-uv",
    name: { en: "Spot UV", hi: "स्पॉट UV" },
    body: {
      en: "Clear raised gloss on just one part of the design — a logo or a pattern — over a matte base.",
      hi: "मैट बेस पर डिज़ाइन के सिर्फ़ एक हिस्से — लोगो या पैटर्न — पर उभरी हुई पारदर्शी चमक।",
    },
    best: { en: "Logos on cards, book covers", hi: "कार्ड पर लोगो, किताब के कवर" },
  },
  {
    id: "foil",
    name: { en: "Foil stamping", hi: "फ़ॉइल स्टैम्पिंग" },
    body: {
      en: "Real metallic gold, silver or rose-gold pressed on with heat. Nothing printed looks the same.",
      hi: "गर्मी से दबाया गया असली सुनहरा, चाँदी या रोज़-गोल्ड। छपाई से यह असर नहीं आता।",
    },
    best: { en: "Wedding cards, certificates, premium cards", hi: "शादी के कार्ड, सर्टिफ़िकेट, प्रीमियम कार्ड" },
  },
  {
    id: "emboss",
    name: { en: "Embossing", hi: "एम्बॉसिंग" },
    body: {
      en: "The paper itself is raised using a die, so you can feel the logo with your eyes closed.",
      hi: "डाई से काग़ज़ खुद उभारा जाता है, आँखें बंद करके भी लोगो महसूस होता है।",
    },
    best: { en: "Letterheads, invitations, seals", hi: "लेटरहेड, निमंत्रण, मुहर" },
  },
];
