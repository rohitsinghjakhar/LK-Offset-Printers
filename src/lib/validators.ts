import { z } from "zod";

/** Client form schemas (react-hook-form). Error messages are i18n keys under checkout.errors. */
export const phoneSchema = z
  .string()
  .trim()
  .transform((v) => v.replace(/[\s-]/g, "").replace(/^(\+91|0091|91|0)(?=[6-9]\d{9}$)/, ""))
  .pipe(z.string().regex(/^[6-9]\d{9}$/, "phone"));

export const gstinSchema = z
  .string()
  .trim()
  .toUpperCase()
  .regex(/^\d{2}[A-Z]{5}\d{4}[A-Z][1-9A-Z]Z[0-9A-Z]$/, "gstin");

const optionalText = (max: number) =>
  z
    .string()
    .trim()
    .max(max)
    .optional()
    .transform((v) => (v ? v : undefined));

const optionalEmail = z
  .string()
  .trim()
  .max(120)
  .optional()
  .refine((v) => !v || z.email().safeParse(v).success, "email")
  .transform((v) => (v ? v : undefined));

export const contactSchema = z.object({
  name: z.string().trim().min(2, "name").max(80, "name"),
  phone: phoneSchema,
  email: optionalEmail,
  business: optionalText(120),
  gstin: z
    .string()
    .trim()
    .optional()
    .refine((v) => !v || gstinSchema.safeParse(v).success, "gstin")
    .transform((v) => (v ? v.toUpperCase() : undefined)),
});

export const addressSchema = z.object({
  line1: z.string().trim().min(3, "address").max(160, "address"),
  line2: optionalText(160),
  pin: z
    .string()
    .trim()
    .regex(/^[1-9]\d{5}$/, "pin"),
  city: z.string().trim().min(2, "city").max(60, "city"),
  state: z.string().trim().min(2, "state").max(60, "state"),
});

/** Order references are made in the browser when an order is sent on WhatsApp (see lib/order-message.ts). */
export const trackSchema = z.object({
  orderId: z
    .string()
    .trim()
    .toUpperCase()
    .transform((v) => (/^(LK|BP)-/.test(v) ? v : `LK-${v}`))
    .pipe(z.string().regex(/^(?:LK|BP)-[A-Z0-9]{6}$/, "orderId")),
  phone: phoneSchema,
});

export const inquirySchema = z.object({
  name: z.string().trim().min(2, "name").max(80, "name"),
  phone: phoneSchema,
  city: optionalText(60),
  service: optionalText(80),
  requirement: z.string().trim().min(5, "requirement").max(2000, "requirement"),
  quantity: optionalText(60),
  deadline: optionalText(40),
});

export const deletionSchema = z.object({
  name: z.string().trim().min(2, "name").max(80, "name"),
  phone: phoneSchema,
  email: optionalEmail,
  details: optionalText(1000),
  consent: z.boolean().refine((v) => v, "consent"),
});
