import { z } from "zod";

export const productSchema = z.object({
  name: z.string().min(3, "Nama minimal 3 karakter"),
  category: z.enum([
    "pupuk",
    "pestisida",
    "bibit",
    "benih",
    "alat-pertanian",
    "media-tanam",
    "pakan",
    "tanaman-hias",
    "tanaman-buah",
    "pot-tanaman",
    "hidroponik",
    "jasa-taman",
    "jasa-dekorasi",
    "lainnya",
  ]),
  shortDescription: z.string().min(10, "Deskripsi minimal 10 karakter"),
  brand: z.string().optional(),
});
