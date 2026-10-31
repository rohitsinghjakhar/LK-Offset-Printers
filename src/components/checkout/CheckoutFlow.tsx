"use client";

import { useEffect, useState } from "react";
import { useForm, useWatch } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { ArrowLeft, ArrowRight, CheckCircle2, Package, Store, Truck } from "lucide-react";
import { useLocale, useTranslations } from "next-intl";
import { WhatsAppIcon } from "@/components/icons";
import { InkButton } from "@/components/motion/InkButton";
import { Field, Input, Textarea } from "@/components/ui/field";
import { RadioCards } from "@/components/ui/radio-cards";
import { siteConfig } from "@/config/site.config";
import { isLocalPin, lookupPin } from "@/data/pincodes";
import { formatINR } from "@/lib/format";
import { useHydrated } from "@/lib/hooks";
import { deliveryCharge } from "@/lib/pricing";
import { addressSchema, contactSchema } from "@/lib/validators";
import { openWhatsApp, orderReference, waCompose, waField, waLink } from "@/lib/whatsapp";
import { useCart, type CartItem } from "@/stores/cart";
import { tx } from "@/types/i18n";
import { RegStepper } from "./RegStepper";

const formSchema = contactSchema
  .extend({
    deliveryMode: z.enum(["pickup", "local", "courier"]),
    line1: z.string().optional(),
    line2: z.string().optional(),
    pin: z.string().optional(),
    city: z.string().optional(),
    state: z.string().optional(),
    artworkMode: z.enum(["whatsapp", "design", "shop"]),
    notes: z.string().trim().max(1000).optional(),
  })
  .superRefine((value, ctx) => {
    if (value.deliveryMode === "pickup") return;
    const address = addressSchema.safeParse({
      line1: value.line1 ?? "",
      line2: value.line2,
      pin: value.pin ?? "",
      city: value.city ?? "",
      state: value.state ?? "",
    });
    if (!address.success) for (const issue of address.error.issues) ctx.addIssue({ code: "custom", path: issue.path, message: issue.message });
    if (value.deliveryMode === "local" && value.pin && !isLocalPin(value.pin)) ctx.addIssue({ code: "custom", path: ["pin"], message: "local_pin" });
  });

type FormInput = z.input<typeof formSchema>;
type FormOutput = z.output<typeof formSchema>;

const STEP_FIELDS: (keyof FormInput)[][] = [
  ["name", "phone", "email", "business", "gstin"],
  ["deliveryMode", "line1", "line2", "pin", "city", "state", "artworkMode"],
  ["notes"],
];

/** "Design it for me" adds the Basic design fee (plus GST) to each item that doesn't already include design. */
function designFeeFor(items: CartItem[], artworkMode: FormInput["artworkMode"]): number {
  if (artworkMode !== "design") return 0;
  const { designFees, defaultGstRate } = siteConfig.pricing;
  const count = items.filter((i) => i.selection.design === "own").length;
  return Math.round(count * designFees.basic * (1 + defaultGstRate / 100));
}

const COLOURS = ["var(--color-cyan)", "var(--color-magenta)", "var(--color-yellow)", "var(--color-ink)"];

/** A short burst of CMYK dots (1.2s, CSS only; none for reduced motion). */
function Confetti() {
  return (
    <div aria-hidden className="pointer-events-none absolute inset-x-0 -top-24 h-[60vh] overflow-hidden motion-reduce:hidden">
      {Array.from({ length: 36 }, (_, i) => {
        const left = (i * 37) % 100;
        const size = 6 + ((i * 7) % 10);
        const delay = (i % 9) * 0.04;
        const drift = ((i * 53) % 80) - 40;
        return (
          <span
            key={i}
            className="absolute top-0 rounded-full opacity-0"
            style={{
              left: `${left}%`,
              width: size,
              height: size,
              background: COLOURS[i % 4],
              mixBlendMode: "multiply",
              animation: `confetti 1.2s cubic-bezier(0.22,1,0.36,1) ${delay}s forwards`,
              ["--drift" as string]: `${drift}px`,
            }}
          />
        );
      })}
    </div>
  );
}

function OrderSent({ reference, url }: { reference: string; url: string }) {
  const t = useTranslations();
  return (
    <div role="status" className="relative">
      <Confetti />
      <div className="relative flex flex-col items-start">
        <p className="label-mono text-ink-muted">{t("success.orderId")}</p>
        <p className="mt-3 font-mono text-[clamp(2.4rem,9vw,6rem)] leading-none font-semibold tracking-[-0.04em] select-all">{reference}</p>
        <h2 className="mt-8 text-h2 font-semibold">{t("success.title")}</h2>
        <p className="mt-4 max-w-[52ch] text-lead text-ink-muted">{t("success.body")}</p>
        <div className="mt-10 flex flex-wrap gap-3">
          <InkButton href={url} external size="lg" icon={<WhatsAppIcon className="size-5" />}>
            {t("success.openAgain")}
          </InkButton>
          <InkButton href={`/track?id=${reference}`} variant="ghost" size="lg" icon={<ArrowRight className="size-5" aria-hidden />}>
            {t("success.track")}
          </InkButton>
        </div>
      </div>
    </div>
  );
}

/** Contact → delivery & artwork → review. The order is sent as a WhatsApp message; nothing is stored online. */
export function CheckoutFlow() {
  const t = useTranslations();
  const locale = useLocale();
  const hydrated = useHydrated();
  const items = useCart((s) => s.items);
  const clear = useCart((s) => s.clear);
  const [step, setStep] = useState(0);
  const [sent, setSent] = useState<{ reference: string; url: string } | null>(null);
  const [pinNote, setPinNote] = useState(false);

  const form = useForm<FormInput, unknown, FormOutput>({
    resolver: zodResolver(formSchema),
    mode: "onTouched",
    defaultValues: {
      name: "",
      phone: "",
      email: "",
      business: "",
      gstin: "",
      deliveryMode: "pickup",
      artworkMode: "whatsapp",
      notes: "",
    },
  });
  const { register, control, setValue, getValues, trigger, handleSubmit, formState } = form;
  const errors = formState.errors;
  const deliveryMode = useWatch({ control, name: "deliveryMode" });
  const artworkMode = useWatch({ control, name: "artworkMode" });
  const pin = useWatch({ control, name: "pin" });

  const err = (key?: string) => (key ? t(`checkout.errors.${key}` as "checkout.errors.name") : undefined);

  // PIN → city/state auto-fill.
  useEffect(() => {
    if (!pin || pin.length !== 6) return;
    const place = lookupPin(pin);
    if (!place) return;
    setValue("city", place.city, { shouldValidate: true });
    setValue("state", place.state, { shouldValidate: true });
    const id = window.setTimeout(() => setPinNote(true), 0);
    return () => window.clearTimeout(id);
  }, [pin, setValue]);

  const itemsTotal = items.reduce((sum, i) => sum + i.total, 0);
  const delivery = deliveryCharge(deliveryMode, itemsTotal);
  const designFee = designFeeFor(items, artworkMode);
  const total = itemsTotal + delivery + designFee;

  const deliveryLabels = { pickup: t("checkout.pickup"), local: t("checkout.local"), courier: t("checkout.courier") };
  const artworkLabels = { whatsapp: t("checkout.artworkWhatsapp"), design: t("checkout.artworkDesign"), shop: t("checkout.artworkShop") };

  const goTo = (next: number) => {
    setStep(next);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const next = async () => {
    const valid = await trigger(STEP_FIELDS[step]);
    if (valid) goTo(Math.min(2, step + 1));
  };

  const onSubmit = handleSubmit((values) => {
    const reference = orderReference();
    const address =
      values.deliveryMode === "pickup"
        ? null
        : [values.line1, values.line2, values.city, values.state && values.pin ? `${values.state} ${values.pin}` : values.state || values.pin]
            .filter(Boolean)
            .join(", ");
    const message = waCompose([
      `*${t("checkout.waHeading", { id: reference })}*`,
      "",
      `*${t("checkout.stepContact")}*`,
      waField(t("checkout.name"), values.name),
      waField(t("checkout.phone"), `+91 ${values.phone}`),
      waField(t("checkout.email"), values.email),
      waField(t("checkout.business"), values.business),
      waField(t("checkout.gstin"), values.gstin),
      "",
      `*${t("checkout.waItems")}*`,
      ...items.flatMap((item, i) => [`${i + 1}. ${tx(item.name, locale)} — ${formatINR(item.total)}`, ...item.summary.map((s) => `   • ${tx(s, locale)}`)]),
      "",
      `*${t("checkout.stepDelivery")}*`,
      deliveryLabels[values.deliveryMode],
      waField(t("checkout.waAddress"), address),
      waField(t("checkout.artwork"), artworkLabels[values.artworkMode]),
      "",
      waField(t("cart.subtotal"), formatINR(itemsTotal)),
      designFee ? waField(t("checkout.designFee"), formatINR(designFee)) : null,
      waField(t("checkout.delivery"), delivery ? formatINR(delivery) : t("checkout.free")),
      `*${t("checkout.waTotal", { amount: formatINR(total) })}*`,
      "",
      values.notes ? `*${t("checkout.waNotes")}*` : null,
      values.notes || null,
      values.notes ? "" : null,
      t("checkout.waClosing"),
    ]);
    const url = waLink(message);
    setSent({ reference, url });
    clear();
    openWhatsApp(url);
    window.scrollTo({ top: 0, behavior: "smooth" });
  });

  if (!hydrated) return <div aria-hidden className="skeleton h-[720px]" />;

  if (sent) return <OrderSent reference={sent.reference} url={sent.url} />;

  if (!items.length) {
    return (
      <div className="flex flex-col items-start gap-5 py-10">
        <p className="font-display text-h2 font-semibold">{t("checkout.emptyCart")}</p>
        <InkButton href="/quote" size="lg" icon={<ArrowRight className="size-5" aria-hidden />}>
          {t("common.getInstantQuote")}
        </InkButton>
      </div>
    );
  }

  const steps = [
    { key: "contact", label: t("checkout.stepContact") },
    { key: "delivery", label: t("checkout.stepDelivery") },
    { key: "review", label: t("checkout.stepReview") },
  ];
  const review = getValues();

  return (
    <form onSubmit={onSubmit} noValidate className="grid grid-cols-1 gap-10 lg:grid-cols-12">
      <div className="lg:col-span-7">
        <RegStepper steps={steps} current={step} label={t("checkout.stepOf", { current: step + 1, total: 3 })} />
        <p className="sr-only" aria-live="polite">
          {t("checkout.stepOf", { current: step + 1, total: 3 })}: {steps[step].label}
        </p>

        <div key={step} className="mt-10 flex animate-step-in flex-col gap-6">
          {step === 0 ? (
            <>
              <Field label={t("checkout.name")} error={err(errors.name?.message)}>
                {(p) => <Input {...p} {...register("name")} autoComplete="name" />}
              </Field>
              <Field label={t("checkout.phone")} hint={t("checkout.phoneHint")} error={err(errors.phone?.message)}>
                {(p) => (
                  <div className="flex">
                    <span
                      className="grid h-12 place-items-center rounded-l-card border border-r-0 border-ink/20 bg-paper-2 px-3 font-mono text-small"
                      aria-hidden
                    >
                      +91
                    </span>
                    <Input {...p} {...register("phone")} type="tel" inputMode="numeric" autoComplete="tel-national" maxLength={16} className="rounded-l-none" />
                  </div>
                )}
              </Field>
              <Field label={t("checkout.email")} optional={t("common.optional")} error={err(errors.email?.message)}>
                {(p) => <Input {...p} {...register("email")} type="email" autoComplete="email" />}
              </Field>
              <div className="grid gap-6 sm:grid-cols-2">
                <Field label={t("checkout.business")} optional={t("common.optional")}>
                  {(p) => <Input {...p} {...register("business")} autoComplete="organization" />}
                </Field>
                <Field label={t("checkout.gstin")} optional={t("common.optional")} hint={t("checkout.gstinHint")} error={err(errors.gstin?.message)}>
                  {(p) => <Input {...p} {...register("gstin")} className="uppercase" maxLength={15} />}
                </Field>
              </div>
            </>
          ) : null}

          {step === 1 ? (
            <>
              <RadioCards
                name="deliveryMode"
                legend={t("checkout.deliveryMode")}
                value={deliveryMode}
                onChange={(v) => setValue("deliveryMode", v as FormInput["deliveryMode"], { shouldValidate: true })}
                options={[
                  { value: "pickup", label: t("checkout.pickup"), hint: t("checkout.pickupHint"), icon: <Store className="size-4" aria-hidden /> },
                  { value: "local", label: t("checkout.local"), hint: t("checkout.localHint"), icon: <Truck className="size-4" aria-hidden /> },
                  { value: "courier", label: t("checkout.courier"), hint: t("checkout.courierHint"), icon: <Package className="size-4" aria-hidden /> },
                ]}
              />
              {deliveryMode !== "pickup" ? (
                <div className="grid gap-6 sm:grid-cols-2">
                  <Field label={t("checkout.address1")} error={err(errors.line1?.message)} className="sm:col-span-2">
                    {(p) => <Input {...p} {...register("line1")} autoComplete="address-line1" />}
                  </Field>
                  <Field label={t("checkout.address2")} optional={t("common.optional")} className="sm:col-span-2">
                    {(p) => <Input {...p} {...register("line2")} autoComplete="address-line2" />}
                  </Field>
                  <Field label={t("checkout.pin")} error={err(errors.pin?.message)}>
                    {(p) => <Input {...p} {...register("pin")} inputMode="numeric" autoComplete="postal-code" maxLength={6} />}
                  </Field>
                  <div className="grid grid-cols-2 gap-4">
                    <Field label={t("checkout.city")} error={err(errors.city?.message)} hint={pinNote ? t("checkout.pinAuto") : undefined}>
                      {(p) => <Input {...p} {...register("city")} autoComplete="address-level2" />}
                    </Field>
                    <Field label={t("checkout.state")} error={err(errors.state?.message)}>
                      {(p) => <Input {...p} {...register("state")} autoComplete="address-level1" />}
                    </Field>
                  </div>
                </div>
              ) : null}
              <RadioCards
                name="artworkMode"
                legend={t("checkout.artwork")}
                value={artworkMode}
                onChange={(v) => setValue("artworkMode", v as FormInput["artworkMode"])}
                options={[
                  { value: "whatsapp", label: artworkLabels.whatsapp, hint: t("checkout.artworkWhatsappHint") },
                  {
                    value: "design",
                    label: artworkLabels.design,
                    hint: t("checkout.artworkDesignHint", { fee: formatINR(siteConfig.pricing.designFees.basic) }),
                  },
                  { value: "shop", label: artworkLabels.shop, hint: t("checkout.artworkShopHint") },
                ]}
              />
            </>
          ) : null}

          {step === 2 ? (
            <>
              <dl className="grid gap-x-6 gap-y-4 rounded-card border border-line p-5 text-body sm:grid-cols-2">
                <div>
                  <dt className="label-mono text-ink-muted">{t("checkout.stepContact")}</dt>
                  <dd className="mt-1 font-medium">{review.name}</dd>
                  <dd className="font-mono text-small">+91 {review.phone}</dd>
                  {review.business ? <dd className="text-small text-ink-muted">{review.business}</dd> : null}
                </div>
                <div>
                  <dt className="label-mono text-ink-muted">{t("checkout.stepDelivery")}</dt>
                  <dd className="mt-1 font-medium">{deliveryLabels[deliveryMode]}</dd>
                  {deliveryMode !== "pickup" ? (
                    <dd className="text-small text-ink-muted">{[review.line1, review.city, review.pin].filter(Boolean).join(", ")}</dd>
                  ) : null}
                  <dd className="text-small text-ink-muted">{artworkLabels[artworkMode]}</dd>
                </div>
                <div className="sm:col-span-2">
                  <button
                    type="button"
                    onClick={() => goTo(0)}
                    className="inline-flex min-h-11 items-center text-small font-medium underline underline-offset-4"
                  >
                    {t("checkout.edit")}
                  </button>
                </div>
              </dl>
              <Field label={t("checkout.notes")} optional={t("common.optional")} hint={t("checkout.notesHint")}>
                {(p) => <Textarea {...p} {...register("notes")} rows={3} />}
              </Field>
              <div className="flex gap-3 rounded-card bg-paper-2 p-4 text-small">
                <CheckCircle2 className="mt-0.5 size-5 shrink-0 text-success" aria-hidden />
                <p>{t("checkout.howItWorks", { hours: siteConfig.proofWithinHours })}</p>
              </div>
            </>
          ) : null}

          <div className="flex flex-wrap items-center justify-between gap-3 border-t border-line pt-6">
            {step > 0 ? (
              <button type="button" onClick={() => goTo(step - 1)} className="inline-flex min-h-11 items-center gap-2 font-medium">
                <ArrowLeft className="size-4" aria-hidden /> {t("checkout.back")}
              </button>
            ) : (
              <span />
            )}
            {step < 2 ? (
              <InkButton onClick={next} size="lg" icon={<ArrowRight className="size-5" aria-hidden />}>
                {t("checkout.continue")}
              </InkButton>
            ) : (
              <InkButton type="submit" size="lg" icon={<WhatsAppIcon className="size-5" />}>
                {t("checkout.sendOrder")}
              </InkButton>
            )}
          </div>
        </div>
      </div>

      <aside className="h-fit rounded-card bg-paper-2 p-6 lg:sticky lg:top-[calc(var(--header-h)+24px)] lg:col-span-5">
        <h2 className="font-display text-h3 font-semibold">{t("checkout.summary")}</h2>
        <ul className="mt-5 flex flex-col divide-y divide-line">
          {items.map((item) => (
            <li key={item.id} className="flex justify-between gap-4 py-3">
              <div className="min-w-0">
                <p className="font-medium">{tx(item.name, locale)}</p>
                <p className="truncate text-small text-ink-muted">{item.summary.map((s) => tx(s, locale)).join(" · ")}</p>
              </div>
              <p className="shrink-0 font-mono tabular">{formatINR(item.total)}</p>
            </li>
          ))}
        </ul>
        <dl className="mt-4 flex flex-col gap-2 border-t border-line pt-4 font-mono text-[0.92rem]">
          <div className="flex justify-between">
            <dt className="font-sans">{t("cart.subtotal")}</dt>
            <dd className="tabular">{formatINR(itemsTotal)}</dd>
          </div>
          {designFee ? (
            <div className="flex justify-between">
              <dt className="font-sans">{t("checkout.designFee")}</dt>
              <dd className="tabular">{formatINR(designFee)}</dd>
            </div>
          ) : null}
          <div className="flex justify-between">
            <dt className="font-sans">{t("checkout.delivery")}</dt>
            <dd className="tabular">{delivery ? formatINR(delivery) : t("checkout.free")}</dd>
          </div>
          <div className="mt-2 flex justify-between border-t-2 border-ink pt-3 text-[1.15rem] font-semibold">
            <dt className="font-sans">{t("checkout.total")}</dt>
            <dd className="tabular">{formatINR(total)}</dd>
          </div>
        </dl>
        <p className="mt-3 text-small text-ink-muted">
          {t("common.inclGst")} · {t("checkout.orderSummaryNote")}
        </p>
      </aside>
    </form>
  );
}
