"use client";

import { MotionProvider } from "@/components/motion/MotionProvider";
import * as m from "motion/react-m";
import { AnimatePresence, useReducedMotion } from "motion/react";
import { Dialog } from "radix-ui";
import { Phone, X } from "lucide-react";
import { useLocale, useTranslations } from "next-intl";
import { mobileNav } from "@/config/nav";
import { siteConfig } from "@/config/site.config";
import { TransitionLink } from "@/components/motion/TransitionLink";
import { WhatsAppIcon } from "@/components/icons";
import { ease } from "@/lib/motion";
import { telLink, waGreeting, waLink } from "@/lib/whatsapp";
import { contact } from "@/config/contact";
import { tx } from "@/types/i18n";
import { LocaleToggle } from "./LocaleToggle";
import { Wordmark } from "./Wordmark";

const PANELS = ["bg-cyan", "bg-magenta", "bg-yellow"];

/** Full-screen menu: CMYK panels wipe in, links rise in huge display type. */
export function MobileMenu({ open, onOpenChange }: { open: boolean; onOpenChange: (open: boolean) => void }) {
  const t = useTranslations();
  const locale = useLocale();
  const reduced = useReducedMotion();
  const close = () => onOpenChange(false);

  return (
    <MotionProvider>
      <Dialog.Root open={open} onOpenChange={onOpenChange}>
        <AnimatePresence>
          {open ? (
            <Dialog.Portal forceMount>
              <Dialog.Content forceMount aria-describedby={undefined} className="fixed inset-0 z-[140] outline-none" data-lenis-prevent>
                <Dialog.Title className="sr-only">{t("common.menu")}</Dialog.Title>
                {PANELS.map((bg, i) => (
                  <m.div
                    key={bg}
                    className={`absolute inset-0 origin-top ${bg}`}
                    initial={{ scaleY: reduced ? 1 : 0, opacity: reduced ? 0 : 1 }}
                    animate={{ scaleY: 1, opacity: 1 }}
                    exit={{ scaleY: reduced ? 1 : 0, opacity: reduced ? 0 : 1, transition: { duration: 0.3, ease: ease.press, delay: (2 - i) * 0.04 } }}
                    transition={{ duration: reduced ? 0.15 : 0.45, ease: ease.press, delay: reduced ? 0 : i * 0.05 }}
                  />
                ))}
                <m.div
                  className="absolute inset-0 flex origin-top flex-col overflow-y-auto bg-ink text-paper"
                  initial={{ scaleY: reduced ? 1 : 0, opacity: reduced ? 0 : 1 }}
                  animate={{ scaleY: 1, opacity: 1 }}
                  exit={{ scaleY: reduced ? 1 : 0, opacity: reduced ? 0 : 1, transition: { duration: 0.3, ease: ease.press } }}
                  transition={{ duration: reduced ? 0.15 : 0.5, ease: ease.press, delay: reduced ? 0 : 0.15 }}
                >
                  <div className="container-x flex h-[var(--header-row-h)] shrink-0 items-center justify-between">
                    <TransitionLink href="/" onClick={close} className="text-paper" aria-label={t("nav.home")}>
                      <Wordmark />
                    </TransitionLink>
                    <Dialog.Close className="grid size-11 place-items-center rounded-card hover:bg-paper/10" aria-label={t("common.closeMenu")}>
                      <X className="size-6" strokeWidth={1.6} aria-hidden />
                    </Dialog.Close>
                  </div>
                  <nav aria-label={t("nav.primary")} className="container-x flex-1 py-6">
                    <ul className="flex flex-col">
                      {mobileNav.map((item, i) => (
                        <li key={item.key} className="overflow-hidden border-b border-line-ink">
                          <m.div
                            initial={{ y: reduced ? 0 : "110%", opacity: reduced ? 0 : 1 }}
                            animate={{ y: "0%", opacity: 1 }}
                            transition={{ duration: reduced ? 0.15 : 0.7, ease: ease.out, delay: reduced ? 0 : 0.35 + i * 0.05 }}
                          >
                            <TransitionLink
                              href={item.href}
                              onClick={close}
                              className="flex items-baseline justify-between gap-4 py-3 font-display text-[clamp(2.1rem,9vw,3.6rem)] leading-[1.05] font-semibold tracking-[-0.03em]"
                            >
                              <span>{t(`nav.${item.key}`)}</span>
                              <span className="label-mono text-paper/40 tabular">{String(i + 1).padStart(2, "0")}</span>
                            </TransitionLink>
                          </m.div>
                        </li>
                      ))}
                    </ul>
                  </nav>
                  <m.div
                    className="container-x shrink-0 border-t border-line-ink py-6 pb-[max(1.5rem,env(safe-area-inset-bottom))]"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: reduced ? 0 : 0.7, duration: 0.4 }}
                  >
                    <p className="label-mono text-paper/60">{t("nav.mobileContact")}</p>
                    <div className="mt-4 flex flex-wrap gap-3">
                      <a href={telLink(contact.phoneE164)} className="inline-flex h-12 items-center gap-2 rounded-card border border-line-ink px-4 font-medium">
                        <Phone className="size-4" aria-hidden /> {contact.phone}
                      </a>
                      <a
                        href={waLink(waGreeting(locale), contact.whatsapp)}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex h-12 items-center gap-2 rounded-card bg-paper px-4 font-medium text-ink"
                      >
                        <WhatsAppIcon className="size-4" /> {t("common.whatsapp")}
                      </a>
                    </div>
                    <p className="mt-4 text-small text-paper/70">{tx(siteConfig.address.full, locale)}</p>
                    <div className="mt-5">
                      <LocaleToggle tone="ink" labels={{ group: t("common.switchLanguage"), en: t("common.english"), hi: t("common.hindi") }} />
                    </div>
                  </m.div>
                </m.div>
              </Dialog.Content>
            </Dialog.Portal>
          ) : null}
        </AnimatePresence>
      </Dialog.Root>
    </MotionProvider>
  );
}
