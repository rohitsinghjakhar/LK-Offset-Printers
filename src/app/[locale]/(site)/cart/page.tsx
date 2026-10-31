import type { Metadata } from "next";
import { getTranslations } from "next-intl/server";
import { CartView } from "@/components/cart/CartView";
import { SlugLine } from "@/components/marks";
import { resolveLocale, type LocaleParams } from "@/i18n/params";
import { pageMetadata } from "@/lib/seo";

export async function generateMetadata({ params }: LocaleParams): Promise<Metadata> {
  const locale = await resolveLocale(params);
  const t = await getTranslations({ locale, namespace: "meta" });
  return pageMetadata({ locale, path: "/cart", title: t("cartTitle"), noIndex: true });
}

export default async function CartPage({ params }: LocaleParams) {
  await resolveLocale(params);
  const t = await getTranslations();
  return (
    <section className="container-x pt-[calc(var(--header-h)+48px)] pb-24">
      <SlugLine className="text-ink/70">{t("nav.cart")}</SlugLine>
      <h1 className="mt-4 mb-10 text-h1 font-semibold">{t("cart.title")}</h1>
      <CartView />
    </section>
  );
}
