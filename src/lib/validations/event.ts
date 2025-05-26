import { z } from "zod";

export const eventFormSchema = z.object({
  name: z.string().min(1, "Nama event wajib diisi").max(100, "Nama event terlalu panjang"),
  date: z.string().min(1, "Tanggal wajib diisi"),
  status: z.enum(["Draft", "Publikasi", "Berlangsung", "Selesai", "Dibatalkan"]),
});

export type EventFormInput = z.infer<typeof eventFormSchema>;
