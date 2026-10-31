"use client";

import { useId } from "react";
import { Minus, Plus } from "lucide-react";
import { useLocale, useTranslations } from "next-intl";
import { ChipGroup } from "@/components/ui/chips";
import { inputClass } from "@/components/ui/field";
import { formatINR, formatNumber } from "@/lib/format";
import { DEFAULT_RULES, minQty, qtyChoices } from "@/lib/pricing";
import { areaLabel } from "@/lib/quote-summary";
import { cn } from "@/lib/utils";
import { tx } from "@/types/i18n";
import type { QuoteController } from "./useQuote";

type Tone = { tone?: "paper" | "ink" };

export function QtyControl({ q, tone = "paper", allowCustom = true }: { q: QuoteController; allowCustom?: boolean } & Tone) {
  const t = useTranslations("quote");
  const locale = useLocale();
  const inputId = useId();
  const { product, selection, setQty } = q;
  const p = product.pricing;
  const choices = qtyChoices(product);
  const unit = tx(product.unit, locale);

  if (p.kind === "area") {
    return (
      <div>
        <label htmlFor={inputId} className={cn("mb-3 block label-mono", tone === "ink" ? "text-paper/70" : "text-ink-muted")}>
          {t("quantity")}
        </label>
        <Stepper id={inputId} value={selection.qty} min={1} max={500} onChange={setQty} tone={tone} />
      </div>
    );
  }

  return (
    <div className="flex flex-col gap-3">
      <ChipGroup
        label={t("quantity")}
        tone={tone}
        size="sm"
        layoutId={`qty-${product.slug}`}
        value={[String(selection.qty)]}
        onChange={([v]) => setQty(Number(v))}
        options={choices.map((qty) => ({ value: String(qty), label: `${formatNumber(qty)}` }))}
      />
      {p.kind === "perPiece" && allowCustom ? (
        <div className="flex items-center gap-3">
          <label htmlFor={inputId} className={cn("text-small", tone === "ink" ? "text-paper/70" : "text-ink-muted")}>
            {t("customQty")} ({unit})
          </label>
          <Stepper id={inputId} value={selection.qty} min={minQty(product)} max={100000} step={p.minQty >= 100 ? 50 : 1} onChange={setQty} tone={tone} />
        </div>
      ) : null}
    </div>
  );
}

function Stepper({
  id,
  value,
  min,
  max,
  step = 1,
  onChange,
  tone,
}: { id: string; value: number; min: number; max: number; step?: number; onChange: (v: number) => void } & Tone) {
  const t = useTranslations("quote");
  const onInk = tone === "ink";
  const btn = cn(
    "grid size-11 place-items-center rounded-card border transition-colors",
    onInk ? "border-line-ink hover:bg-paper/10" : "border-ink/20 hover:bg-ink/5",
  );
  return (
    <div className="flex items-center gap-2">
      <button type="button" className={btn} aria-label={t("decrease")} onClick={() => onChange(Math.max(min, value - step))} disabled={value <= min}>
        <Minus className="size-4" aria-hidden />
      </button>
      <input
        id={id}
        type="number"
        inputMode="numeric"
        min={min}
        max={max}
        value={value}
        onChange={(e) => {
          const v = Number(e.target.value);
          if (Number.isFinite(v)) onChange(Math.min(max, Math.max(min, Math.floor(v))));
        }}
        className={cn(inputClass, "h-11 w-24 text-center font-mono tabular", onInk && "border-line-ink bg-ink-2 text-paper")}
      />
      <button type="button" className={btn} aria-label={t("increase")} onClick={() => onChange(Math.min(max, value + step))} disabled={value >= max}>
        <Plus className="size-4" aria-hidden />
      </button>
    </div>
  );
}

export function SizeControl({ q, tone = "paper" }: { q: QuoteController } & Tone) {
  const t = useTranslations("quote");
  const locale = useLocale();
  const wId = useId();
  const hId = useId();
  const { product, selection, setSize } = q;
  if (product.pricing.kind !== "area" || !selection.size) return null;
  const size = selection.size;
  const presets = product.pricing.sizePresets;
  const area = areaLabel(selection);
  const onInk = tone === "ink";
  const field = cn(inputClass, "h-11 w-full font-mono tabular", onInk && "border-line-ink bg-ink-2 text-paper");

  return (
    <div className="flex flex-col gap-4">
      <ChipGroup
        label={t("presets")}
        tone={tone}
        size="sm"
        layoutId={`size-${product.slug}`}
        value={size.presetId ? [size.presetId] : []}
        onChange={([id]) => {
          const preset = presets.find((s) => s.id === id);
          if (preset) setSize({ w: preset.widthFt, h: preset.heightFt, unit: "ft", presetId: preset.id });
        }}
        options={presets.map((s) => ({ value: s.id, label: tx(s.label, locale) }))}
      />
      <fieldset>
        <legend className={cn("mb-3 label-mono", onInk ? "text-paper/70" : "text-ink-muted")}>{t("customSize")}</legend>
        <div className="grid grid-cols-[1fr_auto_1fr_auto] items-end gap-2">
          <div>
            <label htmlFor={wId} className="mb-1 block text-small">
              {t("width")}
            </label>
            <input
              id={wId}
              type="number"
              inputMode="decimal"
              min={0}
              step="0.5"
              value={size.w || ""}
              onChange={(e) => setSize({ ...size, w: Number(e.target.value), presetId: undefined })}
              className={field}
            />
          </div>
          <span className="pb-3" aria-hidden>
            ×
          </span>
          <div>
            <label htmlFor={hId} className="mb-1 block text-small">
              {t("height")}
            </label>
            <input
              id={hId}
              type="number"
              inputMode="decimal"
              min={0}
              step="0.5"
              value={size.h || ""}
              onChange={(e) => setSize({ ...size, h: Number(e.target.value), presetId: undefined })}
              className={field}
            />
          </div>
          <div role="radiogroup" aria-label={t("unit")} className={cn("flex h-11 rounded-card border p-1", onInk ? "border-line-ink" : "border-ink/20")}>
            {(["ft", "in"] as const).map((u) => (
              <button
                key={u}
                type="button"
                role="radio"
                aria-checked={size.unit === u}
                onClick={() => {
                  if (u === size.unit) return;
                  const factor = u === "in" ? 12 : 1 / 12;
                  setSize({ w: Math.round(size.w * factor * 100) / 100, h: Math.round(size.h * factor * 100) / 100, unit: u, presetId: size.presetId });
                }}
                className={cn("min-w-11 rounded-[3px] px-2 text-small font-medium", size.unit === u ? (onInk ? "bg-paper text-ink" : "bg-ink text-paper") : "")}
              >
                {u === "ft" ? t("feet") : t("inches")}
              </button>
            ))}
          </div>
        </div>
        {area ? (
          <p className={cn("mt-2 font-mono text-small", onInk ? "text-paper/70" : "text-ink-muted")}>
            {t("area", { area: formatNumber(Math.round(area * 100) / 100) })}
          </p>
        ) : null}
      </fieldset>
    </div>
  );
}

export function OptionControls({ q, tone = "paper", only }: { q: QuoteController; only?: string[] } & Tone) {
  const locale = useLocale();
  const { product, selection, setOption } = q;
  const groups = only ? product.options.filter((g) => only.includes(g.id)) : product.options;
  return (
    <>
      {groups.map((group) => (
        <ChipGroup
          key={group.id}
          label={tx(group.label, locale)}
          tone={tone}
          size="sm"
          multiple={group.kind === "multi"}
          layoutId={group.kind === "single" ? `${product.slug}-${group.id}` : undefined}
          value={selection.options[group.id] ?? group.defaults}
          onChange={(ids) => setOption(group.id, ids)}
          options={group.choices.map((c) => ({ value: c.id, label: tx(c.label, locale), hint: c.hint ? tx(c.hint, locale) : undefined }))}
        />
      ))}
    </>
  );
}

export function AddOnControls({ q, tone = "paper" }: { q: QuoteController } & Tone) {
  const t = useTranslations("quote");
  const { product, selection, setExpress, setDesign } = q;
  const rules = DEFAULT_RULES;
  const fees = rules.designFees;
  const onInk = tone === "ink";
  return (
    <div className="flex flex-col gap-6">
      <div>
        <p className={cn("mb-3 label-mono", onInk ? "text-paper/70" : "text-ink-muted")}>{t("express")}</p>
        {product.turnaround.express ? (
          <label className="flex min-h-11 cursor-pointer items-center gap-3">
            <span className="relative inline-flex">
              <input type="checkbox" checked={selection.express} onChange={(e) => setExpress(e.target.checked)} className="peer sr-only" />
              <span
                className={cn(
                  "h-7 w-12 rounded-chip border transition-colors peer-checked:border-magenta peer-checked:bg-magenta peer-focus-visible:outline-2 peer-focus-visible:outline-offset-2 peer-focus-visible:outline-magenta",
                  onInk ? "border-line-ink bg-ink-2" : "border-ink/25 bg-paper-2",
                )}
              />
              <span
                className={cn(
                  "absolute top-1 left-1 size-5 rounded-full transition-transform duration-300 ease-out peer-checked:translate-x-5",
                  onInk ? "bg-paper" : "bg-ink",
                )}
              />
            </span>
            <span className="text-small">{t("expressHint", { pct: rules.expressPct })}</span>
          </label>
        ) : (
          <p className={cn("text-small", onInk ? "text-paper/60" : "text-ink-muted")}>{t("expressUnavailable")}</p>
        )}
      </div>
      <ChipGroup
        label={t("design")}
        tone={tone}
        size="sm"
        layoutId={`design-${product.slug}`}
        value={[selection.design]}
        onChange={([v]) => setDesign(v as "own" | "basic" | "premium")}
        options={[
          { value: "own", label: t("designOwn") },
          { value: "basic", label: t("designBasic"), hint: t("designFee", { price: formatINR(fees.basic) }) },
          { value: "premium", label: t("designPremium"), hint: t("designFee", { price: formatINR(fees.premium) }) },
        ]}
      />
    </div>
  );
}

export function QuoteErrors({ q }: { q: QuoteController }) {
  const t = useTranslations("quote.errors");
  if (q.quote.ok) return null;
  return (
    <ul role="alert" className="flex flex-col gap-1 text-small font-medium text-danger">
      {q.quote.errors.map((e) => (
        <li key={e.code}>{t(e.code, { detail: e.detail ?? "" })}</li>
      ))}
    </ul>
  );
}
