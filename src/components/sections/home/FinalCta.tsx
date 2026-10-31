import { ArrowRight } from "lucide-react";
import { getLocale, getTranslations } from "next-intl/server";
import { CropMarks } from "@/components/marks";
import { CMYKHeadline } from "@/components/motion/CMYKHeadline";
import { InkButton } from "@/components/motion/InkButton";
import { ScrollShift } from "@/components/motion/ScrollShift";
import { WhatsAppIcon } from "@/components/icons";
import { waGreeting, waLink } from "@/lib/whatsapp";

/** S14 — full-bleed magenta call to action with halftone dots drifting behind (scroll-linked). */
export async function FinalCta() {
  const t = await getTranslations("home.cta");
  const locale = await getLocale();

  return (
    <section aria-labelledby="cta-title" className="relative overflow-hidden bg-magenta text-ink">
      <ScrollShift aria-hidden from={{ x: "-40px", y: "30px" }} to={{ x: "40px", y: "-50px" }} className="absolute -inset-20">
        <div className="halftone-field h-full w-full [background-size:18px_18px] text-ink opacity-[0.16]" />
      </ScrollShift>
      <CropMarks inset={14} className="text-ink/50" />
      <div className="relative container-x flex min-h-[80vh] flex-col items-start justify-center py-24 md:min-h-[88vh]">
        <CMYKHeadline as="h2" id="cta-title" className="max-w-[14ch] text-display font-semibold" drift={2} onInk={false}>
          {t("title")} <span className="serif-accent">{t("titleAccent")}</span>
          {t("titleAfter") ? ` ${t("titleAfter")}` : null}
        </CMYKHeadline>
        <p className="mt-7 max-w-[40ch] text-lead">{t("sub")}</p>
        <div className="mt-10 flex flex-wrap gap-3">
          <InkButton href="/quote" variant="inverse" size="lg" icon={<ArrowRight className="size-5" aria-hidden />}>
            {t("quote")}
          </InkButton>
          <InkButton href={waLink(waGreeting(locale))} variant="ghost" size="lg" icon={<WhatsAppIcon className="size-5" />}>
            {t("whatsapp")}
          </InkButton>
        </div>
      </div>
    </section>
  );
}
