import { z } from "zod";

export const eventFormSchema = z.object({
  name: z.string().min(1, "Nama event wajib diisi").max(100, "Nama event terlalu panjang"),
  description: z.string().min(10, "Deskripsi minimal 10 karakter").max(500, "Deskripsi terlalu panjang"),
  type: z.enum(["tournament", "league", "series", "workshop", "training"]),
  visibility: z.enum(["public", "private", "unlisted"]),
  inviteCode: z.string().optional(),
  location: z.string().min(1, "Lokasi wajib diisi"),
  startDate: z.string().min(1, "Tanggal mulai wajib diisi"),
  endDate: z.string().optional(),
  registrationDeadline: z.string().min(1, "Deadline pendaftaran wajib diisi"),
});

export const pricingOptionSchema = z.object({
  category: z.string().min(1, "Kategori wajib diisi"),
  price: z.number().min(0, "Harga tidak boleh negatif"),
  currency: z.string().min(1, "Mata uang wajib dipilih"),
});

export const ageCategorySchema = z.object({
  name: z.string().min(1, "Nama kategori wajib diisi"),
  minAge: z.number().min(0, "Umur minimal tidak boleh negatif"),
  maxAge: z.number().min(1, "Umur maksimal harus lebih dari 0"),
}).refine(data => data.maxAge > data.minAge, {
  message: "Umur maksimal harus lebih besar dari umur minimal",
  path: ["maxAge"],
});

export type EventFormInput = z.infer<typeof eventFormSchema>;
export type PricingOptionInput = z.infer<typeof pricingOptionSchema>;
export type AgeCategoryInput = z.infer<typeof ageCategorySchema>;
