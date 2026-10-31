import { getTranslations } from "next-intl/server";
import { ArrowRight } from "lucide-react";
import { CropMarks, SlugLine } from "@/components/marks";
import { InkButton } from "@/components/motion/InkButton";
import { Misprint } from "@/components/sections/Misprint";
import { Wordmark } from "@/components/layout/Wordmark";
import { TransitionLink } from "@/components/motion/TransitionLink";

export default async function NotFound() {
  const t = await getTranslations("notFound");
  const tm = await getTranslations("meta");
  return (
    <main id="main" className="relative flex min-h-dvh flex-col overflow-hidden">
      {/* React hoists this into <head>; not-found boundaries get no page metadata. */}
      <title>{tm("notFoundTitle")}</title>
      <meta name="robots" content="noindex" />
      <CropMarks inset={14} className="text-ink/35" />
      <div className="container-x flex h-[var(--header-row-h)] items-center">
        <TransitionLink href="/" className="rounded-card p-1">
          <Wordmark />
        </TransitionLink>
      </div>
      <div className="container-x flex flex-1 flex-col items-center justify-center py-12 text-center">
        <SlugLine className="justify-center text-ink/70">{t("slug")}</SlugLine>
        <div className="mt-6 w-full">
          <Misprint />
        </div>
        <h1 className="mt-4 text-h1 font-semibold">{t("title")}</h1>
        <p className="mt-4 max-w-[46ch] text-lead text-ink-muted">{t("sub")}</p>
        <div className="mt-9 flex flex-wrap justify-center gap-3">
          <InkButton href="/catalog" size="lg" icon={<ArrowRight className="size-5" aria-hidden />}>
            {t("catalog")}
          </InkButton>
          <InkButton href="/quote" variant="ghost" size="lg">
            {t("quote")}
          </InkButton>
        </div>
      </div>
    </main>
  );
}
