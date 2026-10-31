import { CropMarks } from "@/components/marks";
import { SectionHeader } from "./SectionHeader";

type PageHeroProps = {
  slug: string;
  title: string;
  accent?: string;
  after?: string;
  sub?: string;
  children?: React.ReactNode;
  aside?: React.ReactNode;
};

/** Inner-page opener: crop marks, slug line, split-reveal H1, optional lead and aside. */
export function PageHero({ slug, title, accent, after, sub, children, aside }: PageHeroProps) {
  return (
    <section className="relative border-b border-line pt-[calc(var(--header-h)+48px)] pb-14 md:pt-[calc(var(--header-h)+80px)] md:pb-20">
      <CropMarks inset={14} className="text-ink/30" />
      <div className="container-x grid gap-10 lg:grid-cols-12 lg:items-end">
        <div className={aside ? "lg:col-span-7" : "lg:col-span-10"}>
          <SectionHeader as="h1" size="h1" slug={slug} title={title} accent={accent} after={after} sub={sub} />
          {children}
        </div>
        {aside ? <div className="lg:col-span-5">{aside}</div> : null}
      </div>
    </section>
  );
}
