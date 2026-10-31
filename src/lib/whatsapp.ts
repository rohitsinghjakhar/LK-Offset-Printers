import { contact } from "@/config/contact";

export function waLink(message: string, phone: string = contact.whatsapp): string {
  return `https://wa.me/${phone}?text=${encodeURIComponent(message)}`;
}

export function telLink(phone: string = contact.phoneE164): string {
  return `tel:${phone}`;
}

export function mailLink(email: string = contact.email, subject?: string): string {
  return `mailto:${email}${subject ? `?subject=${encodeURIComponent(subject)}` : ""}`;
}

export function waGreeting(locale: string, context?: string): string {
  if (locale === "hi") {
    return context ? `नमस्ते ${contact.hindi}! मुझे "${context}" के बारे में जानकारी चाहिए।` : `नमस्ते ${contact.hindi}! मुझे छपाई के बारे में जानकारी चाहिए।`;
  }
  return context
    ? `Hi ${contact.brandName}! I'd like to know more about "${context}".`
    : `Hi ${contact.brandName}! I'd like to know more about your printing services.`;
}

/** "Label: value", or null when there is no value so the line is dropped. */
export function waField(label: string, value: string | number | null | undefined): string | null {
  if (value === null || value === undefined || value === "") return null;
  return `${label}: ${value}`;
}

/**
 * Join message lines for WhatsApp: drops null lines, collapses repeated blank lines and trims.
 * WhatsApp renders *text* as bold, so headings can be passed as `*Heading*`.
 */
export function waCompose(lines: (string | null | false | undefined)[]): string {
  return lines
    .filter((line): line is string => typeof line === "string")
    .filter((line, i, arr) => !(line === "" && arr[i - 1] === ""))
    .join("\n")
    .trim();
}

/** Short order reference, e.g. LK-7K3QX9 (no 0/O or 1/I so it reads cleanly over the phone). */
export function orderReference(): string {
  const alphabet = "ABCDEFGHJKLMNPQRSTUVWXYZ23456789";
  const bytes = new Uint8Array(6);
  crypto.getRandomValues(bytes);
  return `LK-${Array.from(bytes, (b) => alphabet[b % alphabet.length]).join("")}`;
}

/**
 * Hand a pre-filled message to WhatsApp. Phones navigate in the same tab so the app opens and
 * Back returns here; desktops get a new tab (WhatsApp Web) and fall back to the same tab if the
 * pop-up is blocked.
 */
export function openWhatsApp(url: string): void {
  if (!window.matchMedia("(pointer: coarse)").matches) {
    const tab = window.open(url, "_blank");
    if (tab) {
      tab.opener = null;
      return;
    }
  }
  window.location.href = url;
}
