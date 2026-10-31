import { getLocale, getTranslations } from "next-intl/server";
import { ArrowUpRight } from "lucide-react";
import { Mockup } from "@/components/mockups";
import { TransitionLink } from "@/components/motion/TransitionLink";
import { SectionHeader } from "@/components/shared/SectionHeader";
import { inkCss } from "@/lib/ink";
import { tx } from "@/types/i18n";
import type { CaseStudy } from "@/data/content/work";
import { WorkGallery, type WorkCardData } from "./WorkGallery";

export async function WorkCard({ study, headingLevel: Heading = "h3" }: { study: CaseStudy; headingLevel?: "h2" | "h3" }) {
  const locale = await getLocale();
  const t = await getTranslations("home.work");
  const rows = [
    { label: t("client"), value: tx(study.clientType, locale) },
    { label: t("printed"), value: tx(study.printed, locale) },
    { label: t("quantity"), value: tx(study.quantity, locale) },
    { label: t("turnaround"), value: tx(study.turnaround, locale) },
  ];
  return (
    <article className="group relative flex h-full flex-col overflow-hidden rounded-card bg-paper shadow-paper">
      <div className="relative aspect-[5/4] overflow-hidden">
        <div className="absolute inset-0 opacity-90" style={{ background: inkCss[study.colour] }} />
        <div className="halftone-field absolute inset-0 text-ink opacity-10" />
        <div className="absolute inset-[8%] grid place-items-center transition-transform duration-700 ease-out group-hover:scale-[1.04]">
          <Mockup kind={study.mockup} />
        </div>
      </div>
      <div className="flex flex-1 flex-col gap-4 p-5 md:p-6">
        <div className="flex items-start justify-between gap-4">
          <div>
            <p className="label-mono text-ink-muted">{tx(study.client, locale)}</p>
            <Heading className="mt-1.5 font-display text-h3 font-semibold">
              <TransitionLink href={`/work/${study.slug}`} className="after:absolute after:inset-0 after:content-['']">
                {tx(study.title, locale)}
              </TransitionLink>
            </Heading>
          </div>
          <ArrowUpRight className="size-5 shrink-0 transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" aria-hidden />
        </div>
        <dl className="mt-auto grid grid-cols-2 gap-x-4 gap-y-3 border-t border-line pt-4">
          {rows.map((row) => (
            <div key={row.label}>
              <dt className="label-mono text-ink-muted">{row.label}</dt>
              <dd className="mt-0.5 text-small font-medium">{row.value}</dd>
            </div>
          ))}
        </dl>
      </div>
    </article>
  );
}

/** S8 — selected work. */
export async function SelectedWork({ studies }: { studies: CaseStudy[] }) {
  const t = await getTranslations("home.work");
  const tc = await getTranslations("common");
  const cards: WorkCardData[] = studies.slice(0, 6).map((study) => ({ slug: study.slug, node: <WorkCard study={study} /> }));
  return (
    <section aria-label={t("title")} className="relative">
      <WorkGallery
        header={
          <div className="flex flex-wrap items-end justify-between gap-6">
            <SectionHeader slug={t("slug")} title={t("title")} accent={t("titleAccent")} />
            <TransitionLink href="/work" className="inline-flex min-h-11 items-center gap-2 font-medium underline underline-offset-4">
              {t("cta")} →
            </TransitionLink>
          </div>
        }
        cards={cards}
        labels={{ prev: tc("back"), next: tc("next") }}
      />
    </section>
  );
}
