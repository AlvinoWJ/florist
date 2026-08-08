import { z } from "zod";

import { PRODUCT_BADGES } from "@/features/produk/types/Product.types";

export const productSchema = z.object({
  name: z.string().min(3, "Nama minimal 3 karakter"),
  type: z.enum(["produk", "jasa"]),
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
  badge: z
    .union([z.enum(PRODUCT_BADGES), z.literal("")])
    .optional()
    .transform((v) => (v ? v : undefined)),
});
