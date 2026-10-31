import type { Metadata } from "next";
import { getTranslations } from "next-intl/server";
import { CheckoutFlow } from "@/components/checkout/CheckoutFlow";
import { SlugLine } from "@/components/marks";
import { MotionProvider } from "@/components/motion/MotionProvider";
import { resolveLocale, type LocaleParams } from "@/i18n/params";
import { pageMetadata } from "@/lib/seo";

export async function generateMetadata({ params }: LocaleParams): Promise<Metadata> {
  const locale = await resolveLocale(params);
  const t = await getTranslations({ locale, namespace: "meta" });
  return pageMetadata({ locale, path: "/checkout", title: t("checkoutTitle"), noIndex: true });
}

export default async function CheckoutPage({ params }: LocaleParams) {
  await resolveLocale(params);
  const t = await getTranslations("checkout");
  return (
    <section className="container-x pt-[calc(var(--header-h)+48px)] pb-24">
      <SlugLine className="text-ink/70">{t("slug")}</SlugLine>
      <h1 className="mt-4 mb-10 text-h1 font-semibold">{t("title")}</h1>
      <MotionProvider>
        <CheckoutFlow />
      </MotionProvider>
    </section>
  );
}
