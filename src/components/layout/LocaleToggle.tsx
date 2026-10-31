"use client";

import { useLocale } from "next-intl";
import { usePathname } from "@/i18n/navigation";
import { useTransitionNav } from "@/components/motion/TransitionProvider";
import { cx } from "@/lib/cx";
import { locales, type Locale } from "@/types/i18n";

export type LocaleLabels = { group: string; en: string; hi: string };

const SHORT: Record<Locale, string> = { en: "EN", hi: "हिं" };
const LOCALE_KEY = "lk-locale";

/** EN | हिं with a sliding pill. Keeps the current page (and query) when switching. */
export function LocaleToggle({ tone = "paper", labels }: { tone?: "paper" | "ink"; labels: LocaleLabels }) {
  const locale = useLocale() as Locale;
  const pathname = usePathname();
  const { navigate } = useTransitionNav();
  const onInk = tone === "ink";
  const index = locales.indexOf(locale);

  return (
    <div role="group" aria-label={labels.group} className={cx("relative flex rounded-chip border p-1", onInk ? "border-line-ink" : "border-line")}>
      <span
        aria-hidden
        className={cx("absolute top-1 bottom-1 left-1 w-11 rounded-chip transition-transform duration-300 ease-out", onInk ? "bg-paper" : "bg-ink")}
        style={{ transform: `translateX(${index * 100}%)` }}
      />
      {locales.map((l) => {
        const active = l === locale;
        return (
          <button
            key={l}
            type="button"
            lang={l}
            aria-pressed={active}
            aria-label={labels[l]}
            onClick={() => {
              if (active) return;
              // Remembered for the "/" redirect (src/app/page.tsx) on the next visit.
              try {
                localStorage.setItem(LOCALE_KEY, l);
              } catch {
                // Private mode or storage disabled: the toggle still works for this visit.
              }
              navigate(`${pathname}${window.location.search}`, { locale: l, replace: true });
            }}
            className={cx(
              "relative grid h-9 w-11 place-items-center font-mono text-[0.78rem] font-semibold transition-colors duration-200",
              active ? (onInk ? "text-ink" : "text-paper") : onInk ? "text-paper/75 hover:text-paper" : "text-ink/70 hover:text-ink",
            )}
          >
            {SHORT[l]}
          </button>
        );
      })}
    </div>
  );
}
