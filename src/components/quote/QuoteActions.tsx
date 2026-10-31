"use client";

import { Link2 } from "lucide-react";
import { useLocale, useTranslations } from "next-intl";
import { WhatsAppIcon } from "@/components/icons";
import { InkButton } from "@/components/motion/InkButton";
import { formatINR } from "@/lib/format";
import { notify } from "@/lib/notify";
import { selectionToParams } from "@/lib/pricing";
import { quoteWhatsappMessage } from "@/lib/quote-summary";
import { waLink } from "@/lib/whatsapp";
import { tx } from "@/types/i18n";
import type { QuoteController } from "./useQuote";

export function shareUrl(locale: string, q: QuoteController) {
  const params = selectionToParams(q.selection);
  params.set("product", q.product.slug);
  return `${window.location.origin}/${locale}/quote/?${params.toString()}`;
}

export function WhatsAppOrder({
  q,
  className,
  wrapperClassName,
  tone = "paper",
}: {
  q: QuoteController;
  className?: string;
  wrapperClassName?: string;
  tone?: "paper" | "ink";
}) {
  const t = useTranslations();
  const locale = useLocale();
  const onClick = (event: React.MouseEvent<HTMLAnchorElement>) => {
    event.currentTarget.href = waLink(
      quoteWhatsappMessage(
        q.product,
        q.selection,
        locale,
        { intro: t("quote.whatsappIntro"), totalLine: t("quote.whatsappTotal", { price: formatINR(q.quote.total) }) },
        shareUrl(locale, q),
      ),
    );
  };
  return (
    <InkButton
      href={waLink(t("quote.whatsappIntro"))}
      external
      onClick={onClick}
      variant={tone === "ink" ? "ghost-paper" : "ghost"}
      size="lg"
      className={className}
      wrapperClassName={wrapperClassName}
      icon={<WhatsAppIcon className="size-5" />}
    >
      {t("common.orderOnWhatsapp")}
    </InkButton>
  );
}

export function ShareQuote({ q }: { q: QuoteController }) {
  const t = useTranslations("quote");
  const locale = useLocale();
  const onShare = async () => {
    const url = shareUrl(locale, q);
    try {
      if (navigator.share && window.matchMedia("(pointer: coarse)").matches) {
        await navigator.share({ title: tx(q.product.name, locale), url });
        return;
      }
      await navigator.clipboard.writeText(url);
      notify(t("shareCopied"));
    } catch {
      // User dismissed the share sheet.
    }
  };
  return (
    <button type="button" onClick={onShare} className="inline-flex min-h-11 items-center gap-2 text-small font-medium underline-offset-4 hover:underline">
      <Link2 className="size-4" aria-hidden /> {t("share")}
    </button>
  );
}
