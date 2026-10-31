/** Brand + contact basics, split out so client code can import them without all of siteConfig. */
export const contact = {
  brandName: "L.K. Offset Printers",
  hindi: "एल.के. ऑफ़सेट प्रिंटर्स",
  phone: "+91 94149 06100",
  phoneE164: "+919414906100",
  whatsapp: "919414906100",
  // Publish an email address only after the business has supplied one.
  email: process.env.NEXT_PUBLIC_BUSINESS_EMAIL ?? "",
} as const;
