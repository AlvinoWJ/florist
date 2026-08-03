import { z } from "zod";

export const gallerySchema = z.object({
  title: z.string().min(3, "Judul minimal 3 karakter"),
  category: z.enum(["toko", "gudang", "produk", "aktivitas", "pelanggan"]),
  description: z.string().min(10, "Deskripsi minimal 10 karakter"),
});
