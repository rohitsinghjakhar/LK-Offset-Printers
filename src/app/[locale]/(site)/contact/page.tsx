import type { Metadata } from "next";
import { getTranslations } from "next-intl/server";
import { Clock3, Mail, MapPin, Navigation, Phone } from "lucide-react";
import { WhatsAppIcon } from "@/components/icons";
import { InquiryForm } from "@/components/forms/InquiryForm";
import { MapEmbed } from "@/components/forms/MapEmbed";
import { Breadcrumbs } from "@/components/shared/Breadcrumbs";
import { PageHero } from "@/components/shared/PageHero";
import { siteConfig } from "@/config/site.config";
import { resolveLocale, type LocaleParams } from "@/i18n/params";
import { categories } from "@/lib/catalog";
import { pageMetadata } from "@/lib/seo";
import { mailLink, telLink, waGreeting, waLink } from "@/lib/whatsapp";
import { tx } from "@/types/i18n";

export async function generateMetadata({ params }: LocaleParams): Promise<Metadata> {
  const locale = await resolveLocale(params);
  const t = await getTranslations({ locale, namespace: "meta" });
  return pageMetadata({ locale, path: "/contact", title: t("contactTitle"), description: t("contactDescription") });
}

export default async function ContactPage({ params }: LocaleParams) {
  const locale = await resolveLocale(params);
  const t = await getTranslations("contact");
  const tc = await getTranslations("common");
  const tn = await getTranslations("nav");

  const rows = [
    { icon: MapPin, label: tc("address"), value: tx(siteConfig.address.full, locale), href: siteConfig.mapsUrl, external: true },
    { icon: Clock3, label: tc("hours"), value: tx(siteConfig.hoursLabel, locale) },
    { icon: Phone, label: tc("phone"), value: siteConfig.phone, href: telLink(siteConfig.phoneE164) },
    { icon: WhatsAppIcon, label: tc("whatsapp"), value: siteConfig.phone, href: waLink(waGreeting(locale), siteConfig.whatsapp), external: true },
    ...(siteConfig.email ? [{ icon: Mail, label: tc("email"), value: siteConfig.email, href: mailLink(siteConfig.email) }] : []),
  ];

  return (
    <>
      <PageHero slug={t("slug")} title={t("title")} accent={t("titleAccent")} sub={t("sub")}>
        <Breadcrumbs
          className="mt-8"
          locale={locale}
          label={tc("breadcrumbHome")}
          items={[
            { name: tc("breadcrumbHome"), path: "/" },
            { name: tn("contact"), path: "/contact" },
          ]}
        />
      </PageHero>

      <section className="container-x grid gap-12 py-14 md:py-20 lg:grid-cols-12">
        <div className="lg:col-span-5">
          <h2 className="label-mono text-ink-muted">{t("reach")}</h2>
          <address className="mt-4 not-italic">
            <ul className="divide-y divide-line border-y border-line">
              {rows.map(({ icon: Icon, label, value, href, external }) => (
                <li key={label} className="flex gap-4 py-4">
                  <Icon className="mt-0.5 size-5 shrink-0 text-magenta" aria-hidden />
                  <div className="min-w-0">
                    <p className="label-mono text-ink-muted">{label}</p>
                    {href ? (
                      <a
                        href={href}
                        {...(external ? { target: "_blank", rel: "noopener noreferrer" } : {})}
                        className="mt-1 inline-flex min-h-8 items-center text-body font-medium break-words underline-offset-4 hover:underline"
                      >
                        {value}
                      </a>
                    ) : (
                      <p className="mt-1 text-body font-medium">{value}</p>
                    )}
                  </div>
                </li>
              ))}
            </ul>
          </address>
          <div className="mt-6">
            <MapEmbed src={siteConfig.mapsEmbedUrl} title={t("mapTitle")} />
            <a
              href={siteConfig.mapsUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="mt-3 inline-flex min-h-11 items-center gap-2 text-small font-medium underline underline-offset-4"
            >
              <Navigation className="size-4" aria-hidden /> {t("directions")} ↗
            </a>
          </div>
        </div>

        <div className="lg:col-span-7">
          <div className="rounded-card border border-line bg-paper p-6 md:p-10">
            <h2 className="font-display text-h3 font-semibold">{t("formTitle")}</h2>
            <p className="mt-2 mb-8 text-body text-ink-muted">{t("formSub")}</p>
            <InquiryForm services={categories.map((c) => tx(c.name, locale))} />
          </div>
        </div>
      </section>
    </>
  );
}
