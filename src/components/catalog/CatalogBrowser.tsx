"use client";

import { useMemo, useState } from "react";
import * as m from "motion/react-m";
import { AnimatePresence, LayoutGroup } from "motion/react";
import { useTranslations } from "next-intl";
import { MotionProvider } from "@/components/motion/MotionProvider";
import { ChipGroup } from "@/components/ui/chips";
import { NativeSelect } from "@/components/ui/field";
import { spring } from "@/lib/motion";
import type { CategorySlug } from "@/types/catalog";

export type BrowserItem = {
  slug: string;
  category: CategorySlug;
  name: string;
  from: number;
  hours: number;
  popularity: number;
  order: number;
  node: React.ReactNode;
};

type SortKey = "popular" | "price" | "fast" | "name";

/** Filter chips + sort with Motion layout animations. Cards are server-rendered and passed in. */
export function CatalogBrowser({ items, categories }: { items: BrowserItem[]; categories?: { slug: CategorySlug; name: string }[] }) {
  const t = useTranslations("catalog");
  const [category, setCategory] = useState<string>("all");
  const [fast, setFast] = useState(false);
  const [sort, setSort] = useState<SortKey>("popular");

  const visible = useMemo(() => {
    const filtered = items.filter((i) => (category === "all" || i.category === category) && (!fast || i.hours <= 24));
    const sorted = [...filtered];
    if (sort === "popular") sorted.sort((a, b) => b.popularity - a.popularity || a.order - b.order);
    if (sort === "price") sorted.sort((a, b) => a.from - b.from);
    if (sort === "fast") sorted.sort((a, b) => a.hours - b.hours || a.order - b.order);
    if (sort === "name") sorted.sort((a, b) => a.name.localeCompare(b.name));
    return sorted;
  }, [items, category, fast, sort]);

  return (
    <MotionProvider>
      <div className="flex flex-col gap-6 border-b border-line pb-8 lg:flex-row lg:items-end lg:justify-between">
        <div className="flex flex-col gap-5">
          {categories ? (
            <ChipGroup
              label={t("filter")}
              size="sm"
              layoutId="catalog-cat"
              value={[category]}
              onChange={([v]) => setCategory(v)}
              options={[{ value: "all", label: t("all") }, ...categories.map((c) => ({ value: c.slug, label: c.name }))]}
            />
          ) : null}
          <ChipGroup
            label={t("fastFilter")}
            size="sm"
            multiple
            value={fast ? ["fast"] : []}
            onChange={(v) => setFast(v.includes("fast"))}
            options={[{ value: "fast", label: t("fastFilter") }]}
          />
        </div>
        <div className="flex items-end gap-4">
          <p className="pb-3 label-mono text-ink-muted" aria-live="polite">
            {t("results", { count: visible.length })}
          </p>
          <label className="flex flex-col gap-1.5">
            <span className="label-mono text-ink-muted">{t("sort")}</span>
            <NativeSelect value={sort} onChange={(e) => setSort(e.target.value as SortKey)} className="min-w-52">
              <option value="popular">{t("sortPopular")}</option>
              <option value="price">{t("sortPriceLow")}</option>
              <option value="fast">{t("sortFast")}</option>
              <option value="name">{t("sortName")}</option>
            </NativeSelect>
          </label>
        </div>
      </div>

      {visible.length === 0 ? <p className="py-16 text-lead text-ink-muted">{t("empty")}</p> : null}

      <LayoutGroup>
        <m.ul layout className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-3 lg:gap-5 xl:grid-cols-4">
          <AnimatePresence mode="popLayout" initial={false}>
            {visible.map((item) => (
              <m.li
                key={item.slug}
                layout
                initial={{ opacity: 0, scale: 0.96 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.96, transition: { duration: 0.18 } }}
                transition={spring.ui}
              >
                {item.node}
              </m.li>
            ))}
          </AnimatePresence>
        </m.ul>
      </LayoutGroup>
    </MotionProvider>
  );
}
