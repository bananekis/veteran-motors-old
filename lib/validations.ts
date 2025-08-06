import { z } from "zod";

// Common schemas
export const phoneSchema = z
	.string()
	.min(9, "Telefonní číslo musí mít alespoň 9 znaků")
	.max(15, "Telefonní číslo je příliš dlouhé")
	.regex(/^\+?[0-9\s-]+$/, "Telefonní číslo obsahuje neplatné znaky");

export const emailSchema = z
	.string()
	.min(1, "Email je povinný")
	.email("Neplatný formát emailu");

// Rental Form Schema
export const rentalFormSchema = z.object({
	carType: z.string().min(1, "Typ vozu je povinný"),
	purpose: z.string().min(1, "Účel pronájmu je povinný"),
	dateFrom: z.string().min(1, "Datum od je povinné"),
	dateTo: z.string().min(1, "Datum do je povinné"),
	hours: z.string().optional(),
	location: z.string().min(1, "Místo konání je povinné"),
	comment: z.string().optional(),
	phone: phoneSchema,
	email: emailSchema,
});

// Contact Form Schema
export const contactFormSchema = z.object({
	name: z.string().min(1, "Jméno je povinné"),
	email: emailSchema,
	phone: phoneSchema.optional(),
	inquiryType: z.string().min(1, "Typ dotazu je povinný"),
	subject: z.string().min(1, "Předmět je povinný"),
	message: z.string().min(10, "Zpráva musí mít alespoň 10 znaků"),
});

// Sale Form Schema
export const saleFormSchema = z.object({
	brand: z.string().min(1, "Značka je povinná"),
	type: z.string().optional(),
	bodyType: z.string().optional(),
	engine: z.string().optional(),
	transmission: z.string().optional(),
	color: z.string().optional(),
	price: z.string().optional(),
	condition: z.string().optional(),
	description: z.string().optional(),
	phone: phoneSchema,
	email: emailSchema,
});

// Vehicle Interest Form Schema
export const vehicleInterestFormSchema = z.object({
	name: z.string().min(1, "Jméno je povinné"),
	phone: phoneSchema,
	email: emailSchema,
	viewingDate: z.string().optional(),
	offeredPrice: z.string().optional(),
	message: z.string().min(10, "Zpráva musí mít alespoň 10 znaků"),
});

// Wedding Form Schema
export const weddingFormSchema = z.object({
	carType: z.string().min(1, "Typ vozu je povinný"),
	dateFrom: z.string().min(1, "Datum od je povinné"),
	dateTo: z.string().min(1, "Datum do je povinné"),
	location: z.string().min(1, "Místo konání je povinné"),
	comment: z.string().optional(),
	phone: phoneSchema,
	email: emailSchema,
});
