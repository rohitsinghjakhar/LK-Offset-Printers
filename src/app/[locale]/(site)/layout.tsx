import { getTranslations } from "next-intl/server";
import { resolveLocale } from "@/i18n/params";
import { Header, type HeaderLabels } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { MobileActionBar } from "@/components/layout/MobileActionBar";
import { WhatsAppFab } from "@/components/layout/WhatsAppFab";
import { DeferredChrome } from "@/components/layout/DeferredChrome";
import { ScrollEffects } from "@/components/motion/ScrollEffects";
import { AppToaster } from "@/components/layout/AppToaster";
import { CartDrawerLoader } from "@/components/cart/CartDrawerLoader";
import { Mockup } from "@/components/mockups";
import { JsonLd } from "@/components/seo/JsonLd";
import { formatPriceTag } from "@/lib/format";
import { OfferBanner } from "@/components/layout/OfferBanner";
import { bannerIsLive, siteContent as site } from "@/data/content/site";
import { activeProducts as products, getCategorySummaries, priceTag } from "@/lib/catalog";
import { localBusinessJsonLd, organizationJsonLd, websiteJsonLd } from "@/lib/seo";
import { waGreeting } from "@/lib/whatsapp";
import { tx } from "@/types/i18n";

type Props = { children: React.ReactNode; params: Promise<{ locale: string }> };

export default async function SiteLayout({ children, params }: Props) {
  const locale = await resolveLocale(params);
  const t = await getTranslations();
  const categories = getCategorySummaries();
  const lead = products.find((p) => p.featured) ?? products[0];
  const from = (tag: Parameters<typeof formatPriceTag>[0]) => t("common.fromPrice", { price: formatPriceTag(tag, locale) });

  // Client chrome gets plain strings so the initial bundle doesn't need the ICU formatter.
  const labels: HeaderLabels = {
    home: t("nav.home"),
    primary: t("nav.primary"),
    catalog: t("nav.catalog"),
    nav: { services: t("nav.services"), work: t("nav.work"), industries: t("nav.industries"), about: t("nav.about") },
    getQuote: t("common.getQuote"),
    openMenu: t("common.openMenu"),
    featured: t("nav.megaFeatured"),
    all: t("nav.megaAll"),
    locale: { group: t("common.switchLanguage"), en: t("common.english"), hi: t("common.hindi") },
    cart: {
      zero: t("common.cartCount", { count: 0 }),
      one: t("common.cartCount", { count: 1 }),
      many: t("common.cartCount", { count: 7 }).replace("7", "{n}"),
    },
  };

  return (
    <>
      <a href="#main" className="sr-only z-[300] rounded-card bg-ink px-4 py-3 font-medium text-paper focus:not-sr-only focus:fixed focus:top-4 focus:left-4">
        {t("common.skipToContent")}
      </a>
      <Header
        labels={labels}
        banner={bannerIsLive(site.banner) ? <OfferBanner banner={site.banner} locale={locale} /> : null}
        festival={site.festival}
        categories={categories.map((c) => ({
          slug: c.slug,
          name: tx(c.name, locale),
          colour: c.colour,
          fromLabel: from(c.from),
          top: c.top.map((p) => ({ slug: p.slug, name: tx(p.name, locale) })),
        }))}
        featured={
          lead
            ? {
                slug: lead.slug,
                name: tx(lead.name, locale),
                short: tx(lead.short, locale),
                fromLabel: from(priceTag(lead)),
                visual: <Mockup kind={lead.mockup} />,
              }
            : null
        }
      />
      <main id="main" tabIndex={-1} className="outline-none">
        {children}
      </main>
      <Footer categories={categories} />
      <MobileActionBar
        labels={{
          nav: t("common.instantQuote"),
          call: t("common.call"),
          whatsapp: t("common.whatsapp"),
          quote: t("common.instantQuote"),
          greeting: waGreeting(locale),
        }}
      />
      <WhatsAppFab
        labels={{
          open: t("common.waWidget.open"),
          close: t("common.waWidget.close"),
          status: t("common.waWidget.status"),
          body: t("common.waWidget.body"),
          cta: t("common.waWidget.cta"),
          call: t("common.waWidget.call"),
        }}
      />
      <CartDrawerLoader />
      <AppToaster />
      <DeferredChrome />
      <ScrollEffects />
      <JsonLd data={[localBusinessJsonLd(locale), organizationJsonLd(), websiteJsonLd(locale)]} />
    </>
  );
}
