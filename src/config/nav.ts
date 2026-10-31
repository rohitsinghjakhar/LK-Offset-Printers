export const primaryNav = [
  { key: "services", href: "/services" },
  { key: "work", href: "/work" },
  { key: "industries", href: "/industries" },
  { key: "about", href: "/about" },
] as const;

export const mobileNav = [
  { key: "catalog", href: "/catalog" },
  { key: "quote", href: "/quote" },
  { key: "services", href: "/services" },
  { key: "work", href: "/work" },
  { key: "industries", href: "/industries" },
  { key: "about", href: "/about" },
  { key: "contact", href: "/contact" },
  { key: "track", href: "/track" },
] as const;

export const footerNav = {
  company: [
    { key: "about", href: "/about" },
    { key: "services", href: "/services" },
    { key: "work", href: "/work" },
    { key: "industries", href: "/industries" },
    { key: "paperGuide", href: "/paper-guide" },
    { key: "contact", href: "/contact" },
  ],
  help: [
    { key: "quote", href: "/quote" },
    { key: "track", href: "/track" },
    { key: "faq", href: "/faq" },
    { key: "cart", href: "/cart" },
  ],
  legal: [
    { key: "privacy", href: "/legal/privacy" },
    { key: "terms", href: "/legal/terms" },
    { key: "refund", href: "/legal/refund-cancellation" },
    { key: "shipping", href: "/legal/shipping-delivery" },
  ],
} as const;
