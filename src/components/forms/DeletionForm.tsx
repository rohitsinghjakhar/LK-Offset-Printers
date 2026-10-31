"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import type { z } from "zod";
import { CheckCircle2 } from "lucide-react";
import { useTranslations } from "next-intl";
import { WhatsAppIcon } from "@/components/icons";
import { InkButton } from "@/components/motion/InkButton";
import { Checkbox } from "@/components/ui/checkbox";
import { Field, Input, Textarea } from "@/components/ui/field";
import { deletionSchema } from "@/lib/validators";
import { openWhatsApp, waCompose, waField, waLink } from "@/lib/whatsapp";

type Input = z.input<typeof deletionSchema>;
type Output = z.output<typeof deletionSchema>;

/** DPDP data-deletion request, sent to the shop as a WhatsApp message. */
export function DeletionForm() {
  const t = useTranslations();
  const [sentUrl, setSentUrl] = useState<string | null>(null);
  const { register, handleSubmit, formState } = useForm<Input, unknown, Output>({
    resolver: zodResolver(deletionSchema),
    defaultValues: { name: "", phone: "", email: "", details: "", consent: false },
  });
  const e = formState.errors;

  const onSubmit = handleSubmit((values) => {
    const message = waCompose([
      `*${t("legal.deletionTitle")}*`,
      "",
      waField(t("legal.deletionName"), values.name),
      waField(t("legal.deletionPhone"), `+91 ${values.phone}`),
      waField(t("legal.deletionEmail"), values.email),
      waField(t("legal.deletionDetails"), values.details),
      "",
      t("legal.deletionConsent"),
    ]);
    const url = waLink(message);
    setSentUrl(url);
    openWhatsApp(url);
  });

  if (sentUrl) {
    return (
      <div role="status" className="flex flex-col items-start gap-4 rounded-card bg-paper-2 p-6">
        <div className="flex items-start gap-4">
          <CheckCircle2 className="size-7 shrink-0 text-success" aria-hidden />
          <p className="text-body font-medium">{t("legal.deletionDone")}</p>
        </div>
        <InkButton href={sentUrl} external icon={<WhatsAppIcon className="size-5" />}>
          {t("inquiry.openAgain")}
        </InkButton>
      </div>
    );
  }

  const msg = (key?: string) => (key ? t(`checkout.errors.${key}` as "checkout.errors.name") : undefined);

  return (
    <form onSubmit={onSubmit} noValidate className="flex flex-col gap-5">
      <div className="grid gap-5 sm:grid-cols-2">
        <Field label={t("legal.deletionName")} error={msg(e.name?.message)}>
          {(p) => <Input {...p} {...register("name")} autoComplete="name" />}
        </Field>
        <Field label={t("legal.deletionPhone")} error={msg(e.phone?.message)}>
          {(p) => <Input {...p} {...register("phone")} type="tel" inputMode="numeric" autoComplete="tel-national" maxLength={16} />}
        </Field>
      </div>
      <Field label={t("legal.deletionEmail")} optional={t("common.optional")} error={msg(e.email?.message)}>
        {(p) => <Input {...p} {...register("email")} type="email" autoComplete="email" />}
      </Field>
      <Field label={t("legal.deletionDetails")} optional={t("common.optional")}>
        {(p) => <Textarea {...p} {...register("details")} rows={3} />}
      </Field>
      <div className="rounded-card border border-line p-4">
        <Checkbox id="deletion-consent" {...register("consent")} aria-invalid={e.consent ? true : undefined} label={t("legal.deletionConsent")} />
        {e.consent ? (
          <p role="alert" className="mt-2 pl-8 text-small font-medium text-danger">
            {t("checkout.errors.consent")}
          </p>
        ) : null}
      </div>
      <div>
        <InkButton type="submit" size="lg" icon={<WhatsAppIcon className="size-5" />}>
          {t("legal.deletionSubmit")}
        </InkButton>
      </div>
    </form>
  );
}
