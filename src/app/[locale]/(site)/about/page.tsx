import type { Metadata } from "next";
import { getTranslations } from "next-intl/server";
import { MapPin } from "lucide-react";
import { Counter } from "@/components/motion/Counter";
import { InkButton } from "@/components/motion/InkButton";
import { Reveal } from "@/components/motion/Reveal";
import { MachinePhoto } from "@/components/sections/home/MachinePhoto";
import { Breadcrumbs } from "@/components/shared/Breadcrumbs";
import { PageHero } from "@/components/shared/PageHero";
import { siteConfig } from "@/config/site.config";
import { milestones, story, team } from "@/data/content/about";
import { resolveLocale, type LocaleParams } from "@/i18n/params";
import { inkBg, inkCss, inkOn } from "@/lib/ink";
import { pageMetadata } from "@/lib/seo";
import { cn } from "@/lib/utils";
import { tx } from "@/types/i18n";

export async function generateMetadata({ params }: LocaleParams): Promise<Metadata> {
  const locale = await resolveLocale(params);
  const t = await getTranslations({ locale, namespace: "meta" });
  return pageMetadata({ locale, path: "/about", title: t("aboutTitle"), description: t("aboutDescription") });
}

export default async function AboutPage({ params }: LocaleParams) {
  const locale = await resolveLocale(params);
  const t = await getTranslations("about");
  const tnum = await getTranslations("home.numbers");
  const tc = await getTranslations("common");
  const tn = await getTranslations("nav");
  const { stats } = siteConfig;

  const numbers = [
    { value: stats.years, suffix: "+", label: tnum("years") },
    { value: stats.orders, suffix: "+", label: tnum("orders") },
    { value: stats.clients, suffix: "+", label: tnum("clients") },
    { value: stats.rating, suffix: "", label: tnum("rating"), decimals: 1 },
  ];

  return (
    <>
      <PageHero slug={t("slug", { year: siteConfig.established })} title={t("title")} accent={t("titleAccent")} after={t("titleAfter")}>
        <Breadcrumbs
          className="mt-8"
          locale={locale}
          label={tc("breadcrumbHome")}
          items={[
            { name: tc("breadcrumbHome"), path: "/" },
            { name: tn("about"), path: "/about" },
          ]}
        />
      </PageHero>

      <section aria-labelledby="story-title" className="container-x grid gap-12 py-14 md:py-20 lg:grid-cols-12">
        <div className="lg:col-span-4">
          <h2 id="story-title" className="font-display text-h2 font-semibold">
            {t("storyTitle")}
          </h2>
          <p className="mt-3 serif-accent text-h3 text-ink-muted">{t("storySub")}</p>
        </div>
        <div className="flex flex-col gap-6 lg:col-span-8">
          {story.map((p, i) => (
            <p key={i} className={cn(i === 0 ? "text-lead" : "text-body text-ink-muted")}>
              {tx(p, locale)}
            </p>
          ))}
        </div>
      </section>

      <section aria-label={tnum("slug")} className="border-y border-line">
        <dl className="container-x grid grid-cols-2 lg:grid-cols-4">
          {numbers.map((n, i) => (
            <div
              key={n.label}
              className={cn("flex flex-col-reverse py-10", i > 0 && "lg:border-l lg:border-line lg:pl-8", i % 2 === 1 && "border-l border-line pl-6 lg:pl-8")}
            >
              <dt className="mt-2 text-small text-ink-muted">{n.label}</dt>
              <dd className="font-mono text-h2 font-semibold tabular-nums">
                <Counter value={n.value} decimals={n.decimals} suffix={n.suffix} />
              </dd>
            </div>
          ))}
        </dl>
      </section>

      <section aria-labelledby="timeline-title" className="container-x py-14 md:py-20">
        <h2 id="timeline-title" className="font-display text-h2 font-semibold">
          {t("timelineTitle")}
        </h2>
        <ol className="relative mt-10 grid gap-8 border-l border-line pl-8 md:grid-cols-2 md:gap-x-12 lg:grid-cols-4 lg:border-t lg:border-l-0 lg:pt-10 lg:pl-0">
          {milestones.map((m, i) => (
            <li key={m.year} className="relative">
              <Reveal delay={(i % 4) * 0.06}>
                <span
                  aria-hidden
                  className="absolute top-1.5 -left-[39px] size-3.5 rounded-full ring-4 ring-paper lg:-top-[47px] lg:left-0"
                  style={{ background: inkCss[m.colour] }}
                />
                <p className="font-mono text-h3 font-semibold">{m.year}</p>
                <p className="mt-2 text-small text-ink-muted">{tx(m.title, locale)}</p>
              </Reveal>
            </li>
          ))}
        </ol>
      </section>

      <section aria-labelledby="machines-title" className="ink-grain bg-ink py-14 text-paper md:py-20">
        <div className="container-x">
          <h2 id="machines-title" className="font-display text-h2 font-semibold">
            {t("machinesTitle")}
          </h2>
          <ul className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-5">
            {siteConfig.machines.map((m, i) => (
              <li key={m.id}>
                <Reveal delay={i * 0.05} className="flex h-full flex-col rounded-card border border-line-ink p-5">
                  <MachinePhoto id={m.id} />
                  <p className="mt-4 font-display text-[1.15rem] font-semibold">{m.name}</p>
                  <p className="text-small text-paper/70">{tx(m.kind, locale)}</p>
                  <p className="mt-3 text-small text-paper/85">{tx(m.prints, locale)}</p>
                  <p className="mt-auto pt-4 font-mono text-[0.75rem] text-paper/60">
                    {m.maxSize} · {m.speed}
                  </p>
                </Reveal>
              </li>
            ))}
          </ul>
        </div>
      </section>

      <section aria-labelledby="team-title" className="container-x py-14 md:py-20">
        <div className="max-w-[60ch]">
          <h2 id="team-title" className="font-display text-h2 font-semibold">
            {t("teamTitle")}
          </h2>
          <p className="mt-4 text-lead text-ink-muted">{t("teamNote")}</p>
        </div>
        <ul className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {team.map((member, i) => (
            <li key={member.initials}>
              <Reveal delay={i * 0.06} className="h-full rounded-card border border-line p-6">
                <span
                  aria-hidden
                  className={cn(
                    "grid size-16 place-items-center rounded-full font-mono text-[1.1rem] font-semibold",
                    inkBg[member.colour],
                    inkOn[member.colour],
                  )}
                >
                  {member.initials}
                </span>
                {member.name ? <p className="mt-5 font-display text-[1.25rem] font-semibold">{tx(member.name, locale)}</p> : null}
                <h3 className={cn("font-display font-semibold", member.name ? "mt-1 text-body text-ink-muted" : "mt-5 text-[1.25rem]")}>
                  {tx(member.role, locale)}
                </h3>
                <p className="mt-2 text-small text-ink-muted">{tx(member.body, locale)}</p>
              </Reveal>
            </li>
          ))}
        </ul>

        <div className="mt-16 flex flex-col items-start gap-5 border-t border-ink pt-8 md:flex-row md:items-center md:justify-between">
          <p className="flex items-start gap-2 text-lead">
            <MapPin className="mt-1 size-5 shrink-0 text-magenta" aria-hidden />
            {tx(siteConfig.address.full, locale)}
          </p>
          <InkButton href="/contact" size="lg">
            {t("visit")}
          </InkButton>
        </div>
      </section>
    </>
  );
}
