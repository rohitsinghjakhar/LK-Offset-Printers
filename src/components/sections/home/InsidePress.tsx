import { getLocale, getTranslations } from "next-intl/server";
import { SlugLine } from "@/components/marks";
import { Reveal } from "@/components/motion/Reveal";
import { SplitReveal } from "@/components/motion/SplitReveal";
import { TickerLine } from "@/components/motion/TickerLine";
import { siteConfig } from "@/config/site.config";
import { tx } from "@/types/i18n";
import { MachinePhoto } from "./MachinePhoto";

/** S10 — ink section: in-house machines as spec cards, each with its line drawing. */
export async function InsidePress() {
  const t = await getTranslations("home.inside");
  const locale = await getLocale();

  return (
    <section aria-labelledby="inside-title" className="ink-grain overflow-hidden bg-ink section-y text-paper">
      <div className="container-x">
        <SlugLine className="text-paper/70">{t("slug")}</SlugLine>
        <div className="mt-5 grid gap-6 lg:grid-cols-12">
          <SplitReveal
            as="h2"
            id="inside-title"
            className="text-h2 font-semibold lg:col-span-7"
            segments={[{ text: t("title") }, { text: t("titleAccent"), className: "serif-accent text-magenta" }, { text: t("titleAfter") }]}
          />
          <p className="max-w-[48ch] self-end text-lead text-paper/75 lg:col-span-5">{t("sub")}</p>
        </div>
      </div>

      <div className="container-x mt-12">
        <ul className="grid gap-px overflow-hidden rounded-card border border-line-ink bg-line-ink sm:grid-cols-2 lg:grid-cols-5">
          {siteConfig.machines.map((machine, i) => (
            <li key={machine.id} className="bg-ink">
              <Reveal delay={i * 0.06} className="flex h-full flex-col gap-4 p-6">
                <MachinePhoto id={machine.id} />
                <div>
                  <p className="label-mono text-paper/55">
                    {String(i + 1).padStart(2, "0")} · {tx(machine.kind, locale)}
                  </p>
                  <h3 className="mt-2 font-display text-[1.3rem] leading-tight font-semibold">{machine.name}</h3>
                </div>
                <p className="text-small text-paper/70">{tx(machine.prints, locale)}</p>
                <dl className="mt-auto flex flex-col gap-2 border-t border-line-ink pt-4 text-[0.78rem]">
                  <div className="flex justify-between gap-3">
                    <dt className="label-mono text-paper/50">{t("maxSize")}</dt>
                    <dd>
                      <TickerLine delay={i * 120}>{machine.maxSize}</TickerLine>
                    </dd>
                  </div>
                  <div className="flex justify-between gap-3">
                    <dt className="label-mono text-paper/50">{t("speed")}</dt>
                    <dd>
                      <TickerLine delay={i * 120 + 300}>{machine.speed}</TickerLine>
                    </dd>
                  </div>
                </dl>
              </Reveal>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
