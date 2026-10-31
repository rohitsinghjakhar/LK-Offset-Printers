"use client";

import { useEffect } from "react";
import { useSearchParams } from "next/navigation";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import type { z } from "zod";
import { useTranslations } from "next-intl";
import { WhatsAppIcon } from "@/components/icons";
import { InkButton } from "@/components/motion/InkButton";
import { Field, Input } from "@/components/ui/field";
import { trackSchema } from "@/lib/validators";
import { openWhatsApp, waCompose, waField, waLink } from "@/lib/whatsapp";

type TrackInput = z.input<typeof trackSchema>;
type TrackOutput = z.output<typeof trackSchema>;

const STAGES = ["placed", "artwork_check", "proof_sent", "approved", "printing", "finishing", "ready_for_pickup", "delivered"] as const;

/** The stages every order moves through; the shop sends each update on WhatsApp. */
function Stages() {
  const t = useTranslations("track");
  return (
    <div>
      <h2 className="label-mono text-ink-muted">{t("stagesTitle")}</h2>
      <ol className="relative mt-6 flex flex-col gap-6 pl-10">
        <span aria-hidden className="absolute top-2 bottom-2 left-[11px] w-0.5 bg-ink/10" />
        <span aria-hidden className="track-line absolute top-2 bottom-2 left-[11px] w-0.5 origin-top bg-ink" />
        {STAGES.map((status, i) => (
          <li key={status} className="track-stage relative" style={{ ["--i" as string]: i }}>
            <span
              aria-hidden
              className="absolute top-0.5 -left-10 grid size-6 place-items-center rounded-full border-2 border-ink bg-paper font-mono text-[0.62rem] font-semibold"
            >
              {i + 1}
            </span>
            <p className="font-medium">{t(`statuses.${status}`)}</p>
            <p className="text-small text-ink-muted">{t(`stageHints.${status}`)}</p>
          </li>
        ))}
      </ol>
    </div>
  );
}

/** Order status on WhatsApp: the reference and mobile number go into a ready-to-send message. */
export function TrackOrder() {
  const t = useTranslations();
  const params = useSearchParams();
  const form = useForm<TrackInput, unknown, TrackOutput>({ resolver: zodResolver(trackSchema), defaultValues: { orderId: "", phone: "" } });
  const { register, handleSubmit, formState, setValue } = form;

  useEffect(() => {
    const id = params.get("id");
    if (id) setValue("orderId", id);
  }, [params, setValue]);

  const lookup = handleSubmit((values) => {
    const message = waCompose([
      `*${t("track.waHeading")}*`,
      "",
      waField(t("track.orderId"), values.orderId),
      waField(t("track.phone"), `+91 ${values.phone}`),
      "",
      t("track.waBody"),
    ]);
    openWhatsApp(waLink(message));
  });

  const phoneError = formState.errors.phone ? t("checkout.errors.phone") : undefined;
  const idError = formState.errors.orderId ? t("track.badId") : undefined;

  return (
    <div className="grid grid-cols-1 gap-12 lg:grid-cols-12">
      <form onSubmit={lookup} noValidate className="flex h-fit flex-col gap-5 rounded-card bg-paper-2 p-6 lg:col-span-5">
        <Field label={t("track.orderId")} hint={t("track.orderIdHint")} error={idError}>
          {(p) => (
            <Input {...p} {...register("orderId")} placeholder={t("track.orderIdPlaceholder")} autoCapitalize="characters" className="font-mono uppercase" />
          )}
        </Field>
        <Field label={t("track.phone")} error={phoneError}>
          {(p) => <Input {...p} {...register("phone")} type="tel" inputMode="numeric" autoComplete="tel-national" maxLength={16} />}
        </Field>
        <InkButton type="submit" size="lg" className="w-full" wrapperClassName="w-full" icon={<WhatsAppIcon className="size-5" />}>
          {t("track.submit")}
        </InkButton>
        <p className="text-small text-ink-muted">{t("track.note")}</p>
      </form>

      <div className="lg:col-span-6 lg:col-start-7">
        <Stages />
      </div>
    </div>
  );
}
