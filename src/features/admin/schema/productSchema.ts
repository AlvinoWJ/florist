import { z } from "zod";

export const productSchema = z.object({
  name: z.string().min(3, "Nama minimal 3 karakter"),
  slug: z
    .string()
    .min(3, "Slug minimal 3 karakter")
    .regex(/^[a-z0-9-]+$/, "Slug hanya huruf kecil, angka, dan -"),
  category: z.enum([
    "pupuk",
    "pestisida",
    "bibit",
    "benih",
    "alat-pertanian",
    "media-tanam",
    "pakan",
    "lainnya",
  ]),
  shortDescription: z.string().min(10, "Deskripsi minimal 10 karakter"),
  brand: z.string().optional(),
});
