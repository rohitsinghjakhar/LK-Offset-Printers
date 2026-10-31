import "../globals.css";
import type { Metadata, Viewport } from "next";
import { notFound } from "next/navigation";
import { hasLocale, NextIntlClientProvider } from "next-intl";
import { getMessages, setRequestLocale } from "next-intl/server";
import { routing } from "@/i18n/routing";
import { siteConfig } from "@/config/site.config";
import { fontVariables } from "@/lib/fonts";
import { MockupDefs } from "@/components/mockups";
import { PaperGrain } from "@/components/marks";
import { TransitionProvider } from "@/components/motion/TransitionProvider";
import { FX_SCRIPT, InlineScript } from "@/components/motion/InlineScript";

export function generateStaticParams() {
  return routing.locales.map((locale) => ({ locale }));
}

const googleVerification = process.env.NEXT_PUBLIC_GOOGLE_SITE_VERIFICATION;
const bingVerification = process.env.NEXT_PUBLIC_BING_SITE_VERIFICATION;

export const metadata: Metadata = {
  metadataBase: new URL(siteConfig.url),
  applicationName: siteConfig.brandName,
  authors: [{ name: siteConfig.brandName }],
  creator: "Gyanokar Learning and IT Services",
  publisher: siteConfig.brandName,
  category: "Printing services",
  keywords: [...siteConfig.seo.keywords],
  formatDetection: { telephone: true, address: true, email: true },
  robots: { index: true, follow: true, googleBot: { index: true, follow: true, "max-image-preview": "large", "max-snippet": -1 } },
  // Local-search hints for the shop's location (Laxmangarh, Alwar, Rajasthan).
  other: {
    "geo.region": "IN-RJ",
    "geo.placename": siteConfig.city.en,
    "geo.position": `${siteConfig.geo.lat};${siteConfig.geo.lng}`,
    ICBM: `${siteConfig.geo.lat}, ${siteConfig.geo.lng}`,
  },
  ...(googleVerification || bingVerification
    ? {
        verification: {
          ...(googleVerification ? { google: googleVerification } : {}),
          ...(bingVerification ? { other: { "msvalidate.01": bingVerification } } : {}),
        },
      }
    : {}),
};

export const viewport: Viewport = {
  themeColor: "#F6F3EC",
  width: "device-width",
  initialScale: 1,
  viewportFit: "cover",
};

type Props = { children: React.ReactNode; params: Promise<{ locale: string }> };

export default async function LocaleLayout({ children, params }: Props) {
  const { locale } = await params;
  if (!hasLocale(routing.locales, locale)) notFound();
  setRequestLocale(locale);

  // Server-only namespaces stay on the server.
  const { meta: _meta, ...clientMessages } = await getMessages();

  return (
    <html lang={locale} className={fontVariables} suppressHydrationWarning>
      <body>
        <InlineScript html={FX_SCRIPT} />
        <NextIntlClientProvider locale={locale} messages={clientMessages}>
          <TransitionProvider>{children}</TransitionProvider>
        </NextIntlClientProvider>
        <MockupDefs />
        <PaperGrain />
      </body>
    </html>
  );
}
