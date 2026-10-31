import { getLocale, getTranslations } from "next-intl/server";
import { MapPin } from "lucide-react";
import { footerNav } from "@/config/nav";
import { siteConfig } from "@/config/site.config";
import { ColorBar, RegMark, SlugLine } from "@/components/marks";
import { TransitionLink } from "@/components/motion/TransitionLink";
import { FacebookIcon, GoogleIcon, InstagramIcon, WhatsAppIcon, YouTubeIcon } from "@/components/icons";
import { mailLink, telLink, waGreeting, waLink } from "@/lib/whatsapp";
import { tx } from "@/types/i18n";
import type { CategorySummary } from "@/types/catalog";
import { FooterWordmark } from "./FooterWordmark";
import { LocaleToggle } from "./LocaleToggle";

const socials = [
  { key: "instagram", Icon: InstagramIcon, label: "Instagram" },
  { key: "facebook", Icon: FacebookIcon, label: "Facebook" },
  { key: "youtube", Icon: YouTubeIcon, label: "YouTube" },
  { key: "googleBusinessProfile", Icon: GoogleIcon, label: "Google" },
] as const;

const linkClass = "inline-flex min-h-9 items-center text-paper/75 transition-colors duration-200 hover:text-paper";

export async function Footer({ categories }: { categories: CategorySummary[] }) {
  const t = await getTranslations();
  const locale = await getLocale();
  const year = new Date().getFullYear();
  const activeSocials = socials.filter((s) => siteConfig.social[s.key]);

  return (
    <footer className="ink-grain relative overflow-hidden bg-ink text-paper">
      <div className="container-x pt-20 md:pt-28">
        <FooterWordmark label={t("footer.wordmarkLabel")} />
        <div className="mt-16 grid gap-12 md:grid-cols-12 md:gap-8">
          <div className="md:col-span-4">
            <p className="label-mono text-paper/60">{t("footer.visit")}</p>
            <address className="mt-4 not-italic">
              <p className="flex gap-2 text-lead leading-snug">
                <MapPin className="mt-1 size-5 shrink-0 text-magenta" aria-hidden />
                {tx(siteConfig.address.full, locale)}
              </p>
              <p className="mt-4 text-paper/75">{tx(siteConfig.hoursLabel, locale)}</p>
              <p className="mt-4 flex flex-col gap-1">
                <a href={telLink(siteConfig.phoneE164)} className={linkClass}>
                  {siteConfig.phone}
                </a>
                {siteConfig.email ? (
                  <a href={mailLink(siteConfig.email)} className={linkClass}>
                    {siteConfig.email}
                  </a>
                ) : null}
                <a href={waLink(waGreeting(locale), siteConfig.whatsapp)} target="_blank" rel="noopener noreferrer" className={`${linkClass} gap-2`}>
                  <WhatsAppIcon className="size-4 text-green" /> {t("common.whatsapp")}
                </a>
              </p>
              <a
                href={siteConfig.mapsUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="mt-4 inline-flex min-h-11 items-center gap-2 text-small font-medium underline underline-offset-4"
              >
                {t("common.openInMaps")} ↗
              </a>
            </address>
          </div>

          <nav aria-label={t("footer.catalog")} className="md:col-span-3">
            <h2 className="label-mono font-sans text-paper/60">{t("footer.catalog")}</h2>
            <ul className="mt-4 flex flex-col">
              {categories.map((c) => (
                <li key={c.slug}>
                  <TransitionLink href={`/catalog/${c.slug}`} className={linkClass}>
                    {tx(c.name, locale)}
                  </TransitionLink>
                </li>
              ))}
            </ul>
          </nav>

          <nav aria-label={t("footer.company")} className="md:col-span-2">
            <h2 className="label-mono font-sans text-paper/60">{t("footer.company")}</h2>
            <ul className="mt-4 flex flex-col">
              {footerNav.company.map((l) => (
                <li key={l.key}>
                  <TransitionLink href={l.href} className={linkClass}>
                    {t(`nav.${l.key}`)}
                  </TransitionLink>
                </li>
              ))}
            </ul>
            <h2 className="mt-8 label-mono font-sans text-paper/60">{t("footer.help")}</h2>
            <ul className="mt-4 flex flex-col">
              {footerNav.help.map((l) => (
                <li key={l.key}>
                  <TransitionLink href={l.href} className={linkClass}>
                    {t(`nav.${l.key}`)}
                  </TransitionLink>
                </li>
              ))}
            </ul>
          </nav>

          <div className="md:col-span-3">
            <nav aria-label={t("footer.legal")}>
              <h2 className="label-mono font-sans text-paper/60">{t("footer.legal")}</h2>
              <ul className="mt-4 flex flex-col">
                {footerNav.legal.map((l) => (
                  <li key={l.key}>
                    <TransitionLink href={l.href} className={linkClass}>
                      {t(`footer.${l.key}`)}
                    </TransitionLink>
                  </li>
                ))}
              </ul>
            </nav>
            <h2 className="mt-8 label-mono font-sans text-paper/60">{t("footer.cities")}</h2>
            <ul className="mt-3 flex flex-wrap gap-x-3 gap-y-1">
              {siteConfig.serviceAreas.map((area) => (
                <li key={area.slug}>
                  <TransitionLink href={`/printing-in/${area.slug}`} className={`${linkClass} text-small`}>
                    {tx(area.name, locale)}
                  </TransitionLink>
                </li>
              ))}
            </ul>
          </div>
        </div>

        <div className="mt-14 flex flex-col gap-6 border-t border-line-ink py-8 md:flex-row md:items-center md:justify-between">
          <div className="flex flex-wrap items-center gap-3">
            <span className="label-mono text-paper/60">{t("footer.weAccept")}</span>
            <ul className="flex flex-wrap gap-2">
              {siteConfig.payments.accepted.map((method) => (
                <li key={method} className="rounded-card border border-line-ink px-2.5 py-1 font-mono text-[0.72rem] font-semibold tracking-wide text-paper/85">
                  {method}
                </li>
              ))}
            </ul>
          </div>
          <div className="flex items-center gap-4">
            {activeSocials.length ? (
              <ul className="flex gap-1" aria-label={t("footer.follow")}>
                {activeSocials.map(({ key, Icon, label }) => (
                  <li key={key}>
                    <a
                      href={siteConfig.social[key]}
                      target="_blank"
                      rel="noopener noreferrer"
                      aria-label={label}
                      className="grid size-11 place-items-center rounded-card text-paper/75 hover:bg-paper/10 hover:text-paper"
                    >
                      <Icon className="size-5" />
                    </a>
                  </li>
                ))}
              </ul>
            ) : null}
            <LocaleToggle tone="ink" labels={{ group: t("common.switchLanguage"), en: t("common.english"), hi: t("common.hindi") }} />
          </div>
        </div>

        <p className="border-t border-line-ink py-5 text-small text-paper/80">
          Developed and designed by{" "}
          <a href="https://www.gyanokar.com" target="_blank" rel="noopener noreferrer" className="font-medium text-paper underline underline-offset-4">
            Gyanokar Learning and IT Services
          </a>
          {" · "}
          <a href="https://www.gyanokar.com" target="_blank" rel="noopener noreferrer" className="underline underline-offset-4">
            www.gyanokar.com
          </a>
        </p>
        <div className="flex flex-col gap-3 pb-28 text-paper/70 md:flex-row md:items-center md:justify-between md:pb-10">
          <SlugLine className="text-paper/60" mark={false}>
            <span className="inline-flex items-center gap-2">
              <RegMark size={12} className="text-magenta" /> {t("footer.slug", { year })}
            </span>
          </SlugLine>
          <div className="flex items-center gap-4">
            {siteConfig.gstin ? <span className="label-mono">{t("footer.gstin", { gstin: siteConfig.gstin })}</span> : null}
            <ColorBar className="h-3" tints />
          </div>
        </div>
      </div>
    </footer>
  );
}
