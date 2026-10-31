"use client";

import { MotionProvider } from "@/components/motion/MotionProvider";
import { useEffect, useState } from "react";
import Script from "next/script";
import * as m from "motion/react-m";
import { AnimatePresence } from "motion/react";
import { useTranslations } from "next-intl";
import { TransitionLink } from "@/components/motion/TransitionLink";
import { ease } from "@/lib/motion";

const KEY = "bp-consent";
type Consent = "granted" | "denied" | null;

function readConsent(): Consent {
  try {
    const value = localStorage.getItem(KEY);
    return value === "granted" || value === "denied" ? value : null;
  } catch {
    return "denied";
  }
}

const GA_ID = process.env.NEXT_PUBLIC_GA_ID;
const CLARITY_ID = process.env.NEXT_PUBLIC_CLARITY_ID;

/** DPDP-friendly analytics consent: GA4 and Clarity load only after an explicit yes. */
export function ConsentBanner() {
  const t = useTranslations("consent");
  const [consent, setConsent] = useState<Consent>("denied");
  const [ready, setReady] = useState(false);

  useEffect(() => {
    // Read after mount: storage isn't available during SSR.
    const stored = readConsent();
    const timer = window.setTimeout(() => {
      setConsent(stored);
      setReady(true);
    }, 1800);
    return () => window.clearTimeout(timer);
  }, []);

  const decide = (value: Exclude<Consent, null>) => {
    try {
      localStorage.setItem(KEY, value);
    } catch {
      // Private mode: the choice lasts for this page view only.
    }
    setConsent(value);
  };

  const analyticsConfigured = Boolean(GA_ID || CLARITY_ID);

  return (
    <MotionProvider>
      <>
        {consent === "granted" && GA_ID ? (
          <>
            <Script src={`https://www.googletagmanager.com/gtag/js?id=${GA_ID}`} strategy="lazyOnload" />
            <Script id="ga4" strategy="lazyOnload">
              {`window.dataLayer=window.dataLayer||[];function gtag(){dataLayer.push(arguments);}gtag('js',new Date());gtag('config','${GA_ID}',{anonymize_ip:true});`}
            </Script>
          </>
        ) : null}
        {consent === "granted" && CLARITY_ID ? (
          <Script id="clarity" strategy="lazyOnload">
            {`(function(c,l,a,r,i,t,y){c[a]=c[a]||function(){(c[a].q=c[a].q||[]).push(arguments)};t=l.createElement(r);t.async=1;t.src="https://www.clarity.ms/tag/"+i;y=l.getElementsByTagName(r)[0];y.parentNode.insertBefore(t,y);})(window,document,"clarity","script","${CLARITY_ID}");`}
          </Script>
        ) : null}
        <AnimatePresence>
          {ready && analyticsConfigured && consent === null ? (
            <m.div
              role="region"
              aria-label={t("privacy")}
              initial={{ y: "120%" }}
              animate={{ y: 0 }}
              exit={{ y: "120%" }}
              transition={{ duration: 0.5, ease: ease.out }}
              className="fixed inset-x-3 bottom-[calc(64px+env(safe-area-inset-bottom))] z-[96] mx-auto max-w-2xl rounded-card border border-line bg-paper p-4 shadow-lift md:right-auto md:bottom-6 md:left-6 md:mx-0"
            >
              <p className="text-small">
                {t("text")}{" "}
                <TransitionLink href="/legal/privacy" className="underline underline-offset-2">
                  {t("privacy")}
                </TransitionLink>
              </p>
              <div className="mt-3 flex gap-2">
                <button type="button" onClick={() => decide("granted")} className="h-11 rounded-card bg-ink px-4 text-small font-medium text-paper">
                  {t("accept")}
                </button>
                <button type="button" onClick={() => decide("denied")} className="h-11 rounded-card border border-ink/30 px-4 text-small font-medium">
                  {t("reject")}
                </button>
              </div>
            </m.div>
          ) : null}
        </AnimatePresence>
      </>
    </MotionProvider>
  );
}
