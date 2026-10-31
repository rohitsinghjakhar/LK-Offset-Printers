import { ChevronRight } from "lucide-react";
import { TransitionLink } from "@/components/motion/TransitionLink";
import { JsonLd } from "@/components/seo/JsonLd";
import { breadcrumbJsonLd } from "@/lib/seo";
import { cn } from "@/lib/utils";

type Crumb = { name: string; path: string };

/** Visible breadcrumb trail + BreadcrumbList JSON-LD. The last crumb is the current page. */
export function Breadcrumbs({ items, locale, label, className }: { items: Crumb[]; locale: string; label: string; className?: string }) {
  return (
    <>
      <nav aria-label={label} className={cn("label-mono text-ink-muted", className)}>
        <ol className="flex flex-wrap items-center gap-1.5">
          {items.map((item, i) => {
            const last = i === items.length - 1;
            return (
              <li key={item.path} className="flex items-center gap-1.5">
                {last ? (
                  <span aria-current="page" className="text-ink">
                    {item.name}
                  </span>
                ) : (
                  <TransitionLink href={item.path} className="inline-flex min-h-8 items-center hover:text-ink">
                    {item.name}
                  </TransitionLink>
                )}
                {last ? null : <ChevronRight className="size-3" aria-hidden />}
              </li>
            );
          })}
        </ol>
      </nav>
      <JsonLd data={breadcrumbJsonLd(locale, items)} />
    </>
  );
}
