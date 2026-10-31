import type { Metadata } from "next";
import { getTranslations } from "next-intl/server";
import { Hero } from "@/components/sections/home/Hero";
import { MarqueeSection } from "@/components/sections/home/MarqueeSection";
import { SwatchFan } from "@/components/sections/home/SwatchFan";
import { PressStory } from "@/components/sections/home/PressStory";
import { FinishLabIsland, QuoteTeaserIsland } from "@/components/sections/home/Islands";
import { Bestsellers } from "@/components/sections/home/Bestsellers";
import { SelectedWork } from "@/components/sections/home/SelectedWork";
import { Industries } from "@/components/sections/home/Industries";
import { InsidePress } from "@/components/sections/home/InsidePress";
import { Numbers } from "@/components/sections/home/Numbers";
import { Testimonials } from "@/components/sections/home/Testimonials";
import { HomeFaq } from "@/components/sections/home/HomeFaq";
import { FinalCta } from "@/components/sections/home/FinalCta";
import { SectionHeader } from "@/components/shared/SectionHeader";
import { industries } from "@/data/content/industries";
import { resolveLocale, type LocaleParams } from "@/i18n/params";
import { activeProducts as products, categories, getCategorySummaries } from "@/lib/catalog";
import { faqs } from "@/data/content/faqs";
import { testimonials } from "@/data/content/testimonials";
import { caseStudies as studies } from "@/data/content/work";
import { pageMetadata } from "@/lib/seo";

const TEASER_PRODUCTS = ["visiting-cards", "pamphlets-flyers", "flex-banners", "wedding-cards", "labels-stickers", "photo-mug"];

export async function generateMetadata({ params }: LocaleParams): Promise<Metadata> {
  const locale = await resolveLocale(params);
  const t = await getTranslations({ locale, namespace: "meta" });
  return pageMetadata({ locale, path: "/", title: t("homeTitle"), description: t("homeDescription") });
}

export default async function HomePage({ params }: LocaleParams) {
  await resolveLocale(params);
  const summaries = getCategorySummaries();
  const t = await getTranslations("home");
  const cards = products.find((p) => p.slug === "visiting-cards");
  const teaser = TEASER_PRODUCTS.map((slug) => products.find((p) => p.slug === slug)).filter((p): p is NonNullable<typeof p> => Boolean(p));
  const bestsellers = products.filter((p) => p.bestseller);

  return (
    <>
      <Hero />
      <MarqueeSection />
      <SwatchFan categories={summaries} />

      {cards ? (
        <section aria-labelledby="lab-title" className="border-t border-line section-y">
          <div className="container-x">
            <SectionHeader
              id="lab-title"
              slug={t("finishLab.slug")}
              title={t("finishLab.title")}
              accent={t("finishLab.titleAccent")}
              after={t("finishLab.titleAfter")}
              sub={t("finishLab.sub")}
            />
            <div className="mt-12">
              <FinishLabIsland product={cards} />
            </div>
          </div>
        </section>
      ) : null}

      <PressStory />

      {teaser.length ? (
        <section aria-labelledby="teaser-title" className="bg-paper-2 section-y">
          <div className="container-x">
            <SectionHeader
              id="teaser-title"
              slug={t("quoteTeaser.slug")}
              title={t("quoteTeaser.title")}
              accent={t("quoteTeaser.titleAccent")}
              after={t("quoteTeaser.titleAfter")}
              sub={t("quoteTeaser.sub")}
            />
            <div className="mt-12">
              <QuoteTeaserIsland products={teaser} />
            </div>
          </div>
        </section>
      ) : null}

      <Bestsellers products={bestsellers} categories={categories} />
      <SelectedWork studies={studies} />
      <Industries industries={industries} products={products} />
      <InsidePress />
      <Numbers />
      <Testimonials items={testimonials} />
      <HomeFaq faqs={faqs.filter((f) => f.home)} />
      <FinalCta />
    </>
  );
}
