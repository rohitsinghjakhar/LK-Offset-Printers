"use client";

import { MotionProvider } from "@/components/motion/MotionProvider";
import { useEffect, useMemo, useRef, useState } from "react";
import dynamic from "next/dynamic";
import { ArrowRight } from "lucide-react";
import { useTranslations } from "next-intl";
import { ChipGroup } from "@/components/ui/chips";
import { InkButton } from "@/components/motion/InkButton";
import { PriceDisplay } from "@/components/quote/PriceDisplay";
import type { LabFinish, LabPaper } from "@/components/three/FinishLabCanvas";
import type { CardText } from "@/components/three/cardArt";
import { contact } from "@/config/contact";
import { useDeviceTier } from "@/lib/device";
import { computeQuote, normalizeSelection, selectionToParams } from "@/lib/pricing";
import type { Product } from "@/types/catalog";
import { FinishCardCss } from "./FinishCardCss";

const FinishLabCanvas = dynamic(() => import("@/components/three/FinishLabCanvas"), { ssr: false });

const PAPER_OPTIONS: Record<LabPaper, { paper: string; lamination: string }> = {
  matte: { paper: "350gsm", lamination: "matte" },
  gloss: { paper: "350gsm", lamination: "gloss" },
  velvet: { paper: "350gsm", lamination: "velvet" },
  kraft: { paper: "kraft", lamination: "none" },
};

const FINISH_IDS: Record<LabFinish, string> = { spotUv: "spot-uv", goldFoil: "gold-foil", emboss: "emboss", rounded: "rounded" };
const QTYS = [250, 500, 1000, 2000];

/** Mount the 3D scene only when the section is within one viewport and the main thread is idle. */
function useLazyMount(enabled: boolean) {
  const ref = useRef<HTMLDivElement>(null);
  const [mounted, setMounted] = useState(false);
  useEffect(() => {
    const node = ref.current;
    if (!enabled || !node) return;
    const hasIdle = "requestIdleCallback" in window;
    let idleId: number | undefined;
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (!entry.isIntersecting) return;
        observer.disconnect();
        idleId = hasIdle ? window.requestIdleCallback(() => setMounted(true), { timeout: 1500 }) : window.setTimeout(() => setMounted(true), 200);
      },
      { rootMargin: "100% 0px" },
    );
    observer.observe(node);
    return () => {
      observer.disconnect();
      if (idleId === undefined) return;
      if (hasIdle) window.cancelIdleCallback(idleId);
      else window.clearTimeout(idleId);
    };
  }, [enabled]);
  return { ref, mounted };
}

export function FinishLab({ product }: { product: Product }) {
  const t = useTranslations("home.finishLab");
  const tier = useDeviceTier();
  const [paper, setPaper] = useState<LabPaper>("matte");
  const [finishes, setFinishes] = useState<LabFinish[]>(["spotUv"]);
  const [qty, setQty] = useState(500);
  const { ref, mounted } = useLazyMount(tier === "high");

  const text: CardText = useMemo(
    () => ({ brand: contact.brandName, name: t("cardName"), role: t("cardRole"), phone: contact.phone, email: contact.email, city: "Laxmangarh · 321607" }),
    [t],
  );

  const selection = useMemo(
    () =>
      normalizeSelection(product, {
        qty,
        options: {
          sides: ["single"],
          paper: [PAPER_OPTIONS[paper].paper],
          lamination: [PAPER_OPTIONS[paper].lamination],
          finishes: finishes.map((f) => FINISH_IDS[f]),
        },
      }),
    [product, qty, paper, finishes],
  );
  const quote = useMemo(() => computeQuote(product, selection), [product, selection]);
  const orderHref = `/product/${product.slug}?${selectionToParams(selection).toString()}`;
  const show3d = tier === "high" && mounted;

  return (
    <MotionProvider>
      <div className="grid items-center gap-10 lg:grid-cols-12 lg:gap-8">
        <div ref={ref} className="relative aspect-[4/3] w-full lg:col-span-7">
          <div className="absolute inset-0 rounded-card bg-paper-2" />
          <div className="halftone-field absolute inset-0 rounded-card text-ink opacity-[0.06]" />
          <div className="absolute inset-0">
            {show3d ? (
              <FinishLabCanvas paper={paper} finishes={finishes} text={text} label={t("canvasLabel")} />
            ) : (
              <FinishCardCss paper={paper} finishes={finishes} text={text} label={t("staticLabel")} />
            )}
          </div>
          <p className="absolute bottom-4 left-4 label-mono text-ink-muted">{t("dragHint")}</p>
        </div>
        <div className="flex flex-col gap-7 lg:col-span-5">
          <ChipGroup
            label={t("paper")}
            layoutId="lab-paper"
            value={[paper]}
            onChange={([v]) => setPaper(v as LabPaper)}
            options={(Object.keys(PAPER_OPTIONS) as LabPaper[]).map((p) => ({ value: p, label: t(`papers.${p}`) }))}
          />
          <ChipGroup
            label={t("finish")}
            multiple
            value={finishes}
            onChange={(v) => setFinishes(v as LabFinish[])}
            options={(Object.keys(FINISH_IDS) as LabFinish[]).map((f) => ({ value: f, label: t(`finishes.${f}`) }))}
          />
          <ChipGroup
            label={t("quantity")}
            layoutId="lab-qty"
            value={[String(qty)]}
            onChange={([v]) => setQty(Number(v))}
            options={QTYS.map((n) => ({ value: String(n), label: t("cards", { qty: n.toLocaleString("en-IN") }) }))}
          />
          <div className="flex flex-wrap items-end justify-between gap-5 border-t border-line pt-6">
            <div>
              <p className="label-mono text-ink-muted">{t("price")}</p>
              <PriceDisplay total={quote.total} size="lg" className="mt-2" />
            </div>
            <InkButton href={orderHref} size="lg" icon={<ArrowRight className="size-5" aria-hidden />}>
              {t("cta")}
            </InkButton>
          </div>
        </div>
      </div>
    </MotionProvider>
  );
}
