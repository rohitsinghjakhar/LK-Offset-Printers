import Image from "next/image";
import { getLocale, getTranslations } from "next-intl/server";
import { ArrowRight, MapPin } from "lucide-react";
import { InkButton } from "@/components/motion/InkButton";
import { WhatsAppIcon } from "@/components/icons";
import { waGreeting, waLink } from "@/lib/whatsapp";
import { siteConfig } from "@/config/site.config";

export async function Hero() {
  const locale = await getLocale();
  const hi = locale === "hi";
  const t = await getTranslations("common");
  return (
    <section aria-labelledby="hero-title" className="overflow-hidden pt-[var(--header-h)]">
      <div className="container-x grid items-center gap-10 py-12 md:py-16 lg:grid-cols-2 lg:gap-14 lg:py-20">
        <div className="min-w-0">
          <p className="flex items-start gap-2 text-small font-medium text-ink-muted">
            <MapPin className="mt-0.5 size-4 shrink-0" aria-hidden />
            {hi ? "लक्ष्मणगढ़, अलवर · राजस्थान और दिल्ली NCR के लिए" : "Laxmangarh, Alwar · Serving Rajasthan & Delhi NCR"}
          </p>
          <p className="mt-7 label-mono text-magenta-deep">L.K. OFFSET PRINTERS</p>
          <h1 id="hero-title" className="mt-4 text-[clamp(2.7rem,5.7vw,5.6rem)] leading-[1.06] tracking-tight">
            {hi ? "आपकी सोच।" : "Your ideas."}
            <br />
            <span className="serif-accent text-magenta-deep">{hi ? "खूबसूरत छपाई।" : "Beautifully printed."}</span>
          </h1>
          <p className="mt-6 max-w-[48ch] text-lead text-ink-muted">
            {hi
              ? "विज़िटिंग कार्ड, शादी के निमंत्रण, ब्रोशर, फ्लेक्स बैनर और पैकेजिंग। महेंद्र चौधरी के 15+ वर्षों के प्रिंटिंग अनुभव के साथ, आपकी ज़रूरत के अनुसार छपाई।"
              : "Business cards, wedding invitations, brochures, flex banners and packaging. Thoughtful printing, backed by Mahendra Choudhary’s 15+ years in the printing field."}
          </p>
          <div className="mt-8 flex flex-wrap gap-3">
            <InkButton href="/quote" size="lg" icon={<ArrowRight className="size-5" aria-hidden />}>
              {t("getInstantQuote")}
            </InkButton>
            <InkButton href={waLink(waGreeting(locale))} variant="ghost" size="lg" icon={<WhatsAppIcon className="size-5" />}>
              {t("whatsappUs")}
            </InkButton>
          </div>
          <div className="mt-9 flex flex-wrap gap-x-8 gap-y-4 border-t border-line pt-5">
            <p>
              <strong className="block text-h3">15+</strong>
              <span className="text-small text-ink-muted">{hi ? "वर्षों का प्रिंटिंग अनुभव" : "Years of printing experience"}</span>
            </p>
            <p>
              <strong className="block text-h3">{hi ? "एक जगह" : "One place"}</strong>
              <span className="text-small text-ink-muted">{hi ? "डिज़ाइन से तैयार प्रिंट तक" : "From design to finished print"}</span>
            </p>
          </div>
        </div>
        <figure className="relative min-w-0">
          <div className="relative aspect-[5/4] overflow-hidden rounded-card bg-paper-2 shadow-paper">
            <Image
              src="/images/stock/printing-workshop.webp"
              alt={hi ? "प्रिंटिंग मशीन पर कागज़ की छपाई — उदाहरण फ़ोटो" : "Paper moving through a printing press — illustrative photograph"}
              fill
              sizes="(min-width: 1440px) 640px, (min-width: 1024px) 46vw, 92vw"
              preload
              className="object-cover"
            />
            <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-ink/95 to-transparent p-6 pt-20 text-paper">
              <p className="label-mono text-paper/80">{hi ? "कागज़। रंग। बारीकियाँ।" : "Paper. Colour. Craft."}</p>
              <p className="mt-2 font-display text-2xl font-semibold">{hi ? "हर प्रिंट में आपकी पहचान।" : "Make every impression count."}</p>
            </div>
          </div>
          <figcaption className="mt-3 text-small text-ink-muted">
            {hi ? "प्रिंटिंग प्रक्रिया का उदाहरण चित्र · Pexels" : "The craft of printing · Illustrative photo from Pexels"}
          </figcaption>
          <div className="mt-5 border-l-2 border-magenta pl-4 text-small">
            <p className="font-semibold">{hi ? siteConfig.founder.nameHi : siteConfig.founder.name}</p>
            <p className="text-ink-muted">{hi ? "संस्थापक, एल.के. ऑफ़सेट प्रिंटर्स" : siteConfig.founder.role}</p>
          </div>
        </figure>
      </div>
    </section>
  );
}
