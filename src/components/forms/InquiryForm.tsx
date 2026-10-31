"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import type { z } from "zod";
import { CheckCircle2 } from "lucide-react";
import { useLocale, useTranslations } from "next-intl";
import { WhatsAppIcon } from "@/components/icons";
import { InkButton } from "@/components/motion/InkButton";
import { Field, Input, NativeSelect, Textarea } from "@/components/ui/field";
import { formatDate } from "@/lib/format";
import { inquirySchema } from "@/lib/validators";
import { openWhatsApp, waCompose, waField, waLink } from "@/lib/whatsapp";

type Input = z.input<typeof inquirySchema>;
type Output = z.output<typeof inquirySchema>;

/** Contact / bulk enquiry. Nothing is stored: the details open as a ready-to-send WhatsApp message. */
export function InquiryForm({ services }: { services: string[] }) {
  const t = useTranslations();
  const locale = useLocale();
  const [sentUrl, setSentUrl] = useState<string | null>(null);
  const form = useForm<Input, unknown, Output>({
    resolver: zodResolver(inquirySchema),
    defaultValues: { name: "", phone: "", city: "", service: "", requirement: "", quantity: "", deadline: "" },
  });
  const { register, handleSubmit, formState, reset } = form;
  const e = formState.errors;

  const onSubmit = handleSubmit((values) => {
    const message = waCompose([
      `*${t("inquiry.whatsappHeading")}*`,
      "",
      waField(t("inquiry.waName"), values.name),
      waField(t("inquiry.waPhone"), `+91 ${values.phone}`),
      waField(t("inquiry.city"), values.city),
      "",
      waField(t("inquiry.service"), values.service),
      waField(t("inquiry.quantity"), values.quantity),
      waField(t("inquiry.deadline"), values.deadline ? formatDate(values.deadline, locale) : undefined),
      "",
      `*${t("inquiry.waRequirement")}*`,
      values.requirement,
    ]);
    const url = waLink(message);
    setSentUrl(url);
    openWhatsApp(url);
  });

  if (sentUrl) {
    return (
      <div role="status" className="flex flex-col items-start gap-5 rounded-card bg-paper-2 p-6 md:p-8">
        <CheckCircle2 className="size-9 text-success" aria-hidden />
        <div>
          <p className="font-display text-h3 font-semibold">{t("inquiry.successTitle")}</p>
          <p className="mt-2 max-w-[48ch] text-body text-ink-muted">{t("inquiry.successBody")}</p>
        </div>
        <div className="flex flex-wrap items-center gap-3">
          <InkButton href={sentUrl} external icon={<WhatsAppIcon className="size-5" />}>
            {t("inquiry.openAgain")}
          </InkButton>
          <button
            type="button"
            onClick={() => {
              reset();
              setSentUrl(null);
            }}
            className="inline-flex min-h-11 items-center px-2 text-small font-medium underline underline-offset-4"
          >
            {t("inquiry.another")}
          </button>
        </div>
      </div>
    );
  }

  const msg = (key?: string) => (key ? t(`checkout.errors.${key}` as "checkout.errors.name") : undefined);

  return (
    <form onSubmit={onSubmit} noValidate className="flex flex-col gap-5">
      <div className="grid gap-5 sm:grid-cols-2">
        <Field label={t("inquiry.name")} error={msg(e.name?.message)}>
          {(p) => <Input {...p} {...register("name")} autoComplete="name" />}
        </Field>
        <Field label={t("inquiry.phone")} error={msg(e.phone?.message)}>
          {(p) => <Input {...p} {...register("phone")} type="tel" inputMode="numeric" autoComplete="tel-national" maxLength={16} />}
        </Field>
      </div>
      <div className="grid gap-5 sm:grid-cols-2">
        <Field label={t("inquiry.service")} optional={t("common.optional")}>
          {(p) => (
            <NativeSelect {...p} {...register("service")}>
              <option value="">{t("inquiry.servicePlaceholder")}</option>
              {services.map((name) => (
                <option key={name} value={name}>
                  {name}
                </option>
              ))}
              <option value={t("inquiry.serviceOther")}>{t("inquiry.serviceOther")}</option>
            </NativeSelect>
          )}
        </Field>
        <Field label={t("inquiry.city")} optional={t("common.optional")}>
          {(p) => <Input {...p} {...register("city")} autoComplete="address-level2" />}
        </Field>
      </div>
      <Field label={t("inquiry.requirement")} hint={t("inquiry.requirementHint")} error={msg(e.requirement?.message)}>
        {(p) => <Textarea {...p} {...register("requirement")} rows={4} />}
      </Field>
      <div className="grid gap-5 sm:grid-cols-2">
        <Field label={t("inquiry.quantity")} optional={t("common.optional")}>
          {(p) => <Input {...p} {...register("quantity")} />}
        </Field>
        <Field label={t("inquiry.deadline")} optional={t("common.optional")}>
          {(p) => <Input {...p} {...register("deadline")} type="date" />}
        </Field>
      </div>
      <p className="rounded-card border border-line p-4 text-small text-ink-muted">{t("inquiry.notice")}</p>
      <div>
        <InkButton type="submit" size="lg" icon={<WhatsAppIcon className="size-5" />}>
          {t("inquiry.submit")}
        </InkButton>
      </div>
    </form>
  );
}
