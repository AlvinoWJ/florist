import type { Product } from "@/features/produk/types/Product.types";

/**
 * TODO: ganti implementasi ini dengan fetch ke Laravel REST API begitu
 * endpoint tersedia, contoh:
 *
 * export async function getFeaturedProducts(): Promise<Product[]> {
 *   const res = await fetch(`${env.NEXT_PUBLIC_API_URL}/products?featured=1`, {
 *     next: { revalidate: 3600 },
 *   });
 *   if (!res.ok) throw new Error("Gagal memuat produk");
 *   return res.json();
 * }
 */
const MOCK_PRODUCTS: Product[] = [
  {
    id: "1",
    slug: "pupuk-npk-organik",
    name: "Pupuk NPK Organik",
    category: "pupuk",
    shortDescription:
      "Pupuk seimbang untuk pertumbuhan tanaman lebih optimal dan ramah lingkungan.",
  },
  {
    id: "2",
    slug: "bibit-cabai-unggul",
    name: "Bibit Cabai Unggul",
    category: "bibit",
    shortDescription:
      "Bibit cabai tahan hama dengan produktivitas panen tinggi.",
  },
  {
    id: "3",
    slug: "pestisida-nabati",
    name: "Pestisida Nabati",
    category: "pestisida",
    shortDescription:
      "Solusi pengendalian hama alami, aman untuk tanaman dan lingkungan.",
  },
  {
    id: "4",
    slug: "benih-padi-hibrida",
    name: "Benih Padi Hibrida",
    category: "benih",
    shortDescription: "Benih padi unggul dengan hasil panen lebih melimpah.",
  },
  {
    id: "5",
    slug: "cangkul-baja-premium",
    name: "Cangkul Baja Premium",
    category: "alat-pertanian",
    shortDescription: "Alat cangkul kokoh, tahan lama untuk kerja lapangan.",
  },
  {
    id: "6",
    slug: "media-tanam-sekam-bakar",
    name: "Media Tanam Sekam Bakar",
    category: "media-tanam",
    shortDescription: "Media tanam gembur dan kaya nutrisi untuk bibit muda.",
  },
  {
    id: "7",
    slug: "pakan-ternak-organik",
    name: "Pakan Ternak Organik",
    category: "pakan",
    shortDescription: "Pakan bernutrisi tinggi untuk ternak lebih sehat.",
  },
  {
    id: "8",
    slug: "sprayer-elektrik",
    name: "Sprayer Elektrik",
    category: "alat-pertanian",
    shortDescription:
      "Penyemprot elektrik hemat tenaga untuk perawatan lahan luas.",
  },
];

export async function getFeaturedProducts(): Promise<Product[]> {
  return MOCK_PRODUCTS;
}
