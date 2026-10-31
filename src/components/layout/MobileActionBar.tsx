"use client";

import { useEffect, useState } from "react";
import { Calculator, Phone } from "lucide-react";
import { TransitionLink } from "@/components/motion/TransitionLink";
import { WhatsAppIcon } from "@/components/icons";
import { contact } from "@/config/contact";
import { telLink, waLink } from "@/lib/whatsapp";

export type ActionBarLabels = { nav: string; call: string; whatsapp: string; quote: string; greeting: string };

function isTextField(el: EventTarget | null) {
  if (!(el instanceof HTMLElement)) return false;
  if (el.tagName === "TEXTAREA" || el.tagName === "SELECT") return true;
  return el.tagName === "INPUT" && !["checkbox", "radio", "button", "submit", "range", "file"].includes((el as HTMLInputElement).type);
}

/** < 768px: Call · WhatsApp · Instant Quote. 56px, safe-area aware, hidden while a text field has focus. */
export function MobileActionBar({ labels }: { labels: ActionBarLabels }) {
  const [typing, setTyping] = useState(false);

  useEffect(() => {
    const onIn = (e: FocusEvent) => setTyping(isTextField(e.target));
    const onOut = () => setTyping(false);
    document.addEventListener("focusin", onIn);
    document.addEventListener("focusout", onOut);
    return () => {
      document.removeEventListener("focusin", onIn);
      document.removeEventListener("focusout", onOut);
    };
  }, []);

  const item = "flex h-14 flex-1 flex-col items-center justify-center gap-0.5 text-[0.72rem] font-medium";

  return (
    <nav
      aria-label={labels.nav}
      className="fixed inset-x-0 bottom-0 z-[95] border-t border-line bg-paper/95 pb-[env(safe-area-inset-bottom)] backdrop-blur-md transition-transform duration-300 ease-out md:hidden"
      style={{ transform: typing ? "translateY(110%)" : undefined }}
    >
      <div className="flex">
        <a href={telLink(contact.phoneE164)} className={item}>
          <Phone className="size-5" strokeWidth={1.6} aria-hidden />
          {labels.call}
        </a>
        <a href={waLink(labels.greeting, contact.whatsapp)} target="_blank" rel="noopener noreferrer" className={`${item} border-x border-line`}>
          <WhatsAppIcon className="size-5 text-green" />
          {labels.whatsapp}
        </a>
        <TransitionLink href="/quote" className={`${item} bg-ink text-paper`}>
          <Calculator className="size-5" strokeWidth={1.6} aria-hidden />
          {labels.quote}
        </TransitionLink>
      </div>
    </nav>
  );
}
