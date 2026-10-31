import Image from "next/image";
import { getLocale, getTranslations } from "next-intl/server";
import { pressPasses, pressSteps } from "@/data/content/home";
import { tx } from "@/types/i18n";
import { SlugLine } from "@/components/marks";
import { Reveal } from "@/components/motion/Reveal";
import { SplitReveal } from "@/components/motion/SplitReveal";
import { cn } from "@/lib/utils";

const STEP_BG = ["bg-cyan", "bg-magenta", "bg-yellow", "bg-ink"];
/** One illustrative Pexels photo per step: design, WhatsApp proof, printing, delivery. */
const STEP_PHOTOS = ["step-design", "step-whatsapp", "step-printing", "step-delivery"];

/** S5 — "From your phone to our press": four step cards, each with a photo of that step. */
export async function PressStory() {
  const t = await getTranslations("home.press");
  const locale = await getLocale();
  const steps = pressSteps.map((s) => ({ title: tx(s.title, locale), body: tx(s.body, locale) }));
  const labels = pressPasses.map((p) => tx(p, locale));

  return (
    <section aria-label={t("title")} className="relative bg-paper-2 section-y">
      <div className="container-x">
        <SlugLine className="text-ink/70">{t("slug")}</SlugLine>
        <SplitReveal
          as="h2"
          className="mt-5 max-w-[16ch] text-h2 font-semibold"
          segments={[{ text: t("title") }, { text: t("titleAccent"), className: "serif-accent" }, { text: t("titleAfter") }]}
        />
        <ol className="mt-12 grid gap-6 sm:grid-cols-2 xl:grid-cols-4">
          {steps.map((step, i) => (
            <li key={step.title}>
              <Reveal delay={i * 0.08} className="flex h-full flex-col overflow-hidden rounded-card bg-paper shadow-paper">
                <div className="relative aspect-[4/3] overflow-hidden bg-paper-2">
                  <Image
                    src={`/images/stock/${STEP_PHOTOS[i]}.webp`}
                    alt=""
                    fill
                    sizes="(min-width: 1280px) 22vw, (min-width: 640px) 46vw, 92vw"
                    className="object-cover"
                  />
                  <span
                    className={cn(
                      "absolute top-3 left-3 grid size-10 place-items-center rounded-full font-mono text-small font-semibold shadow-paper",
                      STEP_BG[i],
                      i === 2 ? "text-ink" : "text-white",
                    )}
                  >
                    {String(i + 1).padStart(2, "0")}
                  </span>
                </div>
                <div className="flex flex-1 flex-col p-5 md:p-6">
                  <p className="label-mono text-ink-muted">{labels[i]}</p>
                  <h3 className="mt-2 text-h3 font-semibold">{step.title}</h3>
                  <p className="mt-2 text-ink-muted">{step.body}</p>
                </div>
              </Reveal>
            </li>
          ))}
        </ol>
        <p className="mt-4 text-[0.75rem] text-ink-muted">{locale === "hi" ? "उदाहरण फ़ोटो · Pexels" : "Illustrative photos · Pexels"}</p>
      </div>
    </section>
  );
}
