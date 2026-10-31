"use client";

import { useEffect, useRef, useState } from "react";
import { usePathname } from "next/navigation";
import { useLocale } from "next-intl";
import { Phone, X } from "lucide-react";
import { WhatsAppIcon } from "@/components/icons";
import { contact as siteConfig } from "@/config/contact";
import { telLink, waGreeting, waLink } from "@/lib/whatsapp";
import { contact } from "@/config/contact";

export type WhatsAppWidgetLabels = { open: string; close: string; status: string; body: string; cta: string; call: string };

function pageContext(): string | undefined {
  const heading = document.querySelector("main h1")?.textContent?.trim();
  const title = document.title.split(" — ")[0]?.trim();
  const text = heading || title;
  return text && !text.includes(siteConfig.brandName) ? text.slice(0, 80) : undefined;
}

/**
 * Floating WhatsApp toggle on every screen size (above the mobile action bar on phones). The panel
 * offers a chat pre-filled with the current page or product name, plus a call link. It closes on
 * Escape, outside click and navigation.
 */
export function WhatsAppFab({ labels }: { labels: WhatsAppWidgetLabels }) {
  const locale = useLocale();
  const pathname = usePathname();
  const rootRef = useRef<HTMLDivElement>(null);
  const buttonRef = useRef<HTMLButtonElement>(null);
  // Remember which page the panel was opened on, so navigating away closes it without an effect.
  const [openOn, setOpenOn] = useState<string | null>(null);
  const [href, setHref] = useState(() => waLink(waGreeting(locale), contact.whatsapp));
  const open = openOn === pathname;
  const isHome = /^\/(en|hi)\/?$/.test(pathname);

  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key !== "Escape") return;
      setOpenOn(null);
      buttonRef.current?.focus();
    };
    const onPointer = (e: PointerEvent) => {
      if (!rootRef.current?.contains(e.target as Node)) setOpenOn(null);
    };
    document.addEventListener("keydown", onKey);
    document.addEventListener("pointerdown", onPointer);
    return () => {
      document.removeEventListener("keydown", onKey);
      document.removeEventListener("pointerdown", onPointer);
    };
  }, [open]);

  const toggle = () => {
    if (open) return setOpenOn(null);
    setHref(waLink(waGreeting(locale, isHome ? undefined : pageContext()), contact.whatsapp));
    setOpenOn(pathname);
  };

  return (
    <div
      ref={rootRef}
      className="fixed right-4 bottom-[calc(56px+16px+env(safe-area-inset-bottom))] z-[96] flex flex-col items-end gap-3 md:right-6 md:bottom-6"
    >
      {open ? (
        <div
          id="wa-panel"
          role="dialog"
          aria-label={labels.cta}
          className="w-[min(330px,calc(100vw-2rem))] origin-bottom-right [animation:wa-pop_0.22s_var(--ease-out)] overflow-hidden rounded-card border border-line bg-paper shadow-lift"
        >
          <div className="flex items-center gap-3 bg-[#075E54] px-4 py-3 text-white">
            <span className="grid size-10 shrink-0 place-items-center rounded-full bg-white/15">
              <WhatsAppIcon className="size-6" />
            </span>
            <div className="min-w-0">
              <p className="leading-tight font-semibold">{locale === "hi" ? siteConfig.hindi : siteConfig.brandName}</p>
              <p className="text-[0.78rem] text-white/85">{labels.status}</p>
            </div>
          </div>
          <div className="p-4">
            <p className="rounded-card rounded-tl-none bg-paper-2 p-3 text-small">{labels.body}</p>
            <a
              href={href}
              target="_blank"
              rel="noopener noreferrer"
              onClick={() => setOpenOn(null)}
              className="mt-4 flex min-h-12 items-center justify-center gap-2 rounded-card bg-[#075E54] px-4 font-medium text-white transition-colors hover:bg-[#064c44]"
            >
              <WhatsAppIcon className="size-5" />
              {labels.cta}
            </a>
            <a
              href={telLink(contact.phoneE164)}
              className="mt-2 flex min-h-11 items-center justify-center gap-2 rounded-card border border-line px-4 text-small font-medium transition-colors hover:border-ink"
            >
              <Phone className="size-4" aria-hidden />
              {labels.call} {contact.phone}
            </a>
          </div>
        </div>
      ) : null}
      <button
        ref={buttonRef}
        type="button"
        onClick={toggle}
        aria-expanded={open}
        aria-controls={open ? "wa-panel" : undefined}
        aria-label={open ? labels.close : labels.open}
        className="grid size-14 place-items-center rounded-full bg-green text-white shadow-lift transition-transform duration-300 ease-out hover:scale-105 active:scale-95"
      >
        {open ? <X className="size-6" aria-hidden /> : <WhatsAppIcon className="size-7" />}
      </button>
    </div>
  );
}
