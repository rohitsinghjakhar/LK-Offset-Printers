import { getLocale, getTranslations } from "next-intl/server";
import { marqueeRows } from "@/data/content/home";
import { tx } from "@/types/i18n";
import { RegMark } from "@/components/marks";
import { Marquee } from "@/components/motion/Marquee";

function Row({ items }: { items: string[] }) {
  return (
    <>
      {items.map((item) => (
        <span key={item} className="flex items-center">
          <span className="px-5 font-display text-[clamp(1.75rem,5vw,4.5rem)] leading-[1.15] font-semibold tracking-[-0.03em] text-ink md:px-8">{item}</span>
          <RegMark size={22} strokeWidth={1.2} className="text-magenta" />
        </span>
      ))}
    </>
  );
}

/** Two rows of product names drifting in opposite directions at a steady, readable pace. */
export async function MarqueeSection() {
  const t = await getTranslations("home.marquee");
  const locale = await getLocale();
  const [rowA, rowB] = marqueeRows.map((row) => row.map((item) => tx(item, locale)));
  return (
    <section aria-label={t("label")} className="relative overflow-hidden border-y border-line py-8 md:py-12">
      <ul className="sr-only">
        {[...rowA, ...rowB].map((item) => (
          <li key={item}>{item}</li>
        ))}
      </ul>
      <Marquee duration={50}>
        <Row items={rowA} />
      </Marquee>
      <Marquee duration={56} reverse className="mt-1">
        <Row items={rowB} />
      </Marquee>
    </section>
  );
}
