import type { Metadata } from "next";
import { getTranslations } from "next-intl/server";
import { WhatsAppIcon } from "@/components/icons";
import { InkButton } from "@/components/motion/InkButton";
import { Reveal } from "@/components/motion/Reveal";
import { Breadcrumbs } from "@/components/shared/Breadcrumbs";
import { PageHero } from "@/components/shared/PageHero";
import { finishes, gsmStack, paperTypes } from "@/data/content/paper";
import { resolveLocale, type LocaleParams } from "@/i18n/params";
import { inkCss } from "@/lib/ink";
import { pageMetadata } from "@/lib/seo";
import { cn } from "@/lib/utils";
import { waGreeting, waLink } from "@/lib/whatsapp";
import { tx } from "@/types/i18n";

export async function generateMetadata({ params }: LocaleParams): Promise<Metadata> {
  const locale = await resolveLocale(params);
  const t = await getTranslations({ locale, namespace: "meta" });
  return pageMetadata({ locale, path: "/paper-guide", title: t("paperGuideTitle"), description: t("paperGuideDescription"), type: "article" });
}

/** Visual stand-ins for each finish, drawn with CSS (no photos). */
const FINISH_SWATCH: Record<string, string> = {
  matte: "bg-[linear-gradient(135deg,#2b2b30,#1b1b20)]",
  gloss: "bg-[linear-gradient(120deg,#1b1b20_20%,#5a5a66_45%,#1b1b20_60%)]",
  velvet: "bg-[radial-gradient(circle_at_30%_30%,#3a2a33,#1b1b20_70%)]",
  "spot-uv": "bg-ink-2 [background-image:radial-gradient(circle,rgba(255,255,255,0.35)_1px,transparent_1.5px)] [background-size:10px_10px]",
  foil: "[background:var(--foil)]",
  emboss: "bg-paper-2 shadow-[inset_2px_2px_4px_rgba(14,14,16,0.25),inset_-2px_-2px_4px_rgba(255,255,255,0.8)]",
};

export default async function PaperGuidePage({ params }: LocaleParams) {
  const locale = await resolveLocale(params);
  const t = await getTranslations("paperGuide");
  const tc = await getTranslations("common");
  const tn = await getTranslations("nav");
  const maxCaliper = Math.max(...gsmStack.map((g) => g.caliper));

  return (
    <>
      <PageHero slug={t("slug")} title={t("title")} accent={t("titleAccent")} sub={t("sub")}>
        <Breadcrumbs
          className="mt-8"
          locale={locale}
          label={tc("breadcrumbHome")}
          items={[
            { name: tc("breadcrumbHome"), path: "/" },
            { name: tn("paperGuide"), path: "/paper-guide" },
          ]}
        />
      </PageHero>

      <section aria-labelledby="gsm-title" className="container-x grid gap-12 py-14 md:py-20 lg:grid-cols-12">
        <div className="lg:col-span-5">
          <h2 id="gsm-title" className="font-display text-h2 font-semibold">
            {t("gsmTitle")}
          </h2>
          <p className="mt-5 text-lead text-ink-muted">{t("gsmBody")}</p>
        </div>
        <figure className="lg:col-span-7" aria-label={t("stackLabel")}>
          <ol className="flex flex-col gap-3">
            {gsmStack.map((g, i) => (
              <li key={g.gsm}>
                <Reveal delay={i * 0.05} className="grid grid-cols-[88px_1fr] items-center gap-4 sm:grid-cols-[100px_1fr_1.2fr]">
                  <span className="font-mono text-small font-medium">{t("gsm", { gsm: g.gsm })}</span>
                  {/* Sheet edge: thickness grows with caliper. */}
                  <span className="relative block h-12" aria-hidden>
                    <span
                      className="absolute inset-x-0 top-1/2 -translate-y-1/2 rounded-[2px] bg-paper shadow-[0_1px_0_rgba(14,14,16,0.25),0_6px_14px_-8px_rgba(14,14,16,0.45)] ring-1 ring-ink/10"
                      style={{ height: `${Math.max(3, (g.caliper / maxCaliper) * 36)}px` }}
                    />
                  </span>
                  <span className="col-span-2 text-small sm:col-span-1">
                    <span className="font-medium">{tx(g.feel, locale)}</span>
                    <span className="block text-ink-muted">{tx(g.example, locale)}</span>
                  </span>
                </Reveal>
              </li>
            ))}
          </ol>
        </figure>
      </section>

      <section aria-labelledby="types-title" className="border-y border-line bg-paper-2 py-14 md:py-20">
        <div className="container-x">
          <h2 id="types-title" className="font-display text-h2 font-semibold">
            {t("typesTitle")}
          </h2>
          <ul className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {paperTypes.map((p, i) => (
              <li key={p.id}>
                <Reveal delay={(i % 3) * 0.06} className="flex h-full flex-col overflow-hidden rounded-card bg-paper">
                  <span className="block h-2" style={{ background: inkCss[p.colour] }} aria-hidden />
                  <div className="flex flex-1 flex-col gap-3 p-6">
                    <h3 className="font-display text-[1.35rem] font-semibold">{tx(p.name, locale)}</h3>
                    <p className="text-small text-ink-muted">{tx(p.body, locale)}</p>
                    <p className="mt-auto border-t border-line pt-3 text-small">
                      <span className="label-mono text-ink-muted">{t("usedFor")}</span>
                      <span className="mt-1 block font-medium">{tx(p.usedFor, locale)}</span>
                    </p>
                  </div>
                </Reveal>
              </li>
            ))}
          </ul>
        </div>
      </section>

      <section aria-labelledby="finishes-title" className="container-x py-14 md:py-20">
        <h2 id="finishes-title" className="font-display text-h2 font-semibold">
          {t("finishesTitle")}
        </h2>
        <ul className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {finishes.map((f, i) => (
            <li key={f.id}>
              <Reveal delay={(i % 3) * 0.06} className="flex h-full gap-5 rounded-card border border-line p-5">
                <span aria-hidden className={cn("size-16 shrink-0 rounded-card", FINISH_SWATCH[f.id])} />
                <div>
                  <h3 className="font-display text-[1.2rem] font-semibold">{tx(f.name, locale)}</h3>
                  <p className="mt-1 text-small text-ink-muted">{tx(f.body, locale)}</p>
                  <p className="mt-2 text-small">
                    <span className="text-ink-muted">{t("best")}: </span>
                    <span className="font-medium">{tx(f.best, locale)}</span>
                  </p>
                </div>
              </Reveal>
            </li>
          ))}
        </ul>

        <div className="mt-16 flex flex-col items-start gap-5 rounded-card bg-ink p-8 text-paper md:flex-row md:items-center md:justify-between md:p-10">
          <div>
            <p className="font-display text-h3 font-semibold">{t("ctaTitle")}</p>
            <p className="mt-2 max-w-[56ch] text-paper/75">{t("ctaBody")}</p>
          </div>
          <InkButton href={waLink(waGreeting(locale, tn("paperGuide")))} variant="paper" size="lg" icon={<WhatsAppIcon className="size-5" />}>
            {tc("whatsappUs")}
          </InkButton>
        </div>
      </section>
    </>
  );
}
