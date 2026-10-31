import type { L } from "./i18n";

export const INK_COLOURS = ["ink", "magenta", "cyan", "foil", "yellow", "green", "red", "blue"] as const;

export type InkColour = (typeof INK_COLOURS)[number];

export const MOCKUP_KINDS = [
  "business-cards",
  "letterhead",
  "envelope",
  "bill-book",
  "stamp",
  "id-card",
  "flyer",
  "trifold",
  "poster",
  "booklet",
  "dangler",
  "flex-roll",
  "signboard",
  "standee",
  "canvas",
  "wedding-card",
  "shagun-envelope",
  "menu-card",
  "certificate",
  "label-roll",
  "carton",
  "paper-bag",
  "sweet-box",
  "hang-tag",
  "school-diary",
  "report-card",
  "question-paper",
  "notebook",
  "mug",
  "tshirt",
  "calendar",
  "diary",
  "keychain",
  "photo-frame",
  "cushion",
  "photo-print",
  "photocopy",
  "spiral-binding",
  "hard-binding",
  "lamination",
] as const;

export type MockupKind = (typeof MOCKUP_KINDS)[number];

export const CATEGORY_SLUGS = [
  "business-stationery",
  "marketing-prints",
  "large-format-signage",
  "wedding-events",
  "packaging-labels",
  "school-coaching",
  "gifts-merchandise",
  "photo-copy-binding",
] as const;

export type CategorySlug = (typeof CATEGORY_SLUGS)[number];

export const INDUSTRY_SLUGS = [
  "schools-coaching",
  "clinics-hospitals",
  "restaurants-cafes",
  "weddings-events",
  "real-estate",
  "retail-shops",
  "corporates-startups",
] as const;

export type IndustrySlug = (typeof INDUSTRY_SLUGS)[number];

export type Category = {
  slug: CategorySlug;
  name: L;
  tagline: L;
  description: L;
  colour: InkColour;
  mockup: MockupKind;
  order: number;
};

export type PriceMode =
  { mode: "multiplier"; value: number } | { mode: "per1000"; value: number } | { mode: "perUnit"; value: number } | { mode: "flat"; value: number };

export type OptionChoice = {
  id: string;
  label: L;
  price?: PriceMode;
  hint?: L;
};

export type OptionGroup = {
  id: string;
  label: L;
  kind: "single" | "multi";
  choices: OptionChoice[];
  /** single: the default choice id. multi: default selected ids. */
  defaults: string[];
};

export type Tier = { qty: number; price: number };

export type SizePreset = { id: string; label: L; widthFt: number; heightFt: number };

export type PricingModel =
  | { kind: "tiered"; tiers: Tier[] }
  | { kind: "area"; ratePerSqFt: number; sizePresets: SizePreset[] }
  | { kind: "perPiece"; unitPrice: number; minQty: number; qtyPresets: number[]; bulkDiscount?: boolean };

export type Spec = { label: L; value: L };

export type Product = {
  slug: string;
  category: CategorySlug;
  name: L;
  short: L;
  description: L;
  specs: Spec[];
  turnaround: { hours: number; label: L; express: boolean };
  pricing: PricingModel;
  options: OptionGroup[];
  /** Unit word for prices, e.g. "card", "book", "pc". */
  unit: L;
  gstRate: number;
  mockup: MockupKind;
  industries: IndustrySlug[];
  featured?: boolean;
  bestseller?: boolean;
  images?: string[];
  rating?: { value: number; count: number };
  active: boolean;
  order: number;
};

export type DesignServiceItem = { id: "basic" | "premium" | "logo"; name: L; price: number };

/** Serializable "from" price used by menus and cards. */
export type PriceTag = { amount: number; per: "job" | "sqft" | "unit"; qty: number; unit: L };

export type CategorySummary = Category & {
  count: number;
  from: PriceTag;
  top: { slug: string; name: L; from: PriceTag }[];
};
