import { categories as allCategories, products as allProducts } from "@/data/seed/catalog";
import { fromPrice } from "@/lib/pricing";
import type { Category, CategorySlug, CategorySummary, IndustrySlug, PriceTag, Product } from "@/types/catalog";

export type { CategorySummary };

/** The catalog is static: edit src/data/seed/catalog.ts and rebuild to change products or prices. */
export const categories: Category[] = [...allCategories].sort((a, b) => a.order - b.order);
export const activeProducts: Product[] = allProducts.filter((p) => p.active).sort((a, b) => a.order - b.order);

export function getProduct(slug: string): Product | undefined {
  return activeProducts.find((p) => p.slug === slug);
}

export function getCategory(slug: string): Category | undefined {
  return categories.find((c) => c.slug === slug);
}

export function getProductsByCategory(slug: CategorySlug): Product[] {
  return activeProducts.filter((p) => p.category === slug);
}

export function getProductsByIndustry(slug: IndustrySlug): Product[] {
  return activeProducts.filter((p) => p.industries.includes(slug));
}

export function priceTag(product: Product): PriceTag {
  return { ...fromPrice(product), unit: product.unit };
}

/** Categories with counts, a representative "from" price and top products — used by menus and the swatch fan. */
export function getCategorySummaries(): CategorySummary[] {
  return categories.map((category) => {
    const items = getProductsByCategory(category.slug);
    const lead = items.find((p) => p.bestseller) ?? items[0];
    return {
      ...category,
      count: items.length,
      from: lead ? priceTag(lead) : { amount: 0, per: "job", qty: 1, unit: { en: "", hi: "" } },
      top: items.slice(0, 3).map((p) => ({ slug: p.slug, name: p.name, from: priceTag(p) })),
    };
  });
}
