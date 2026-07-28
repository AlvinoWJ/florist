import type { GalleryItem } from "@/features/galeri/types/Gallery.types";

/**
 * TODO: ganti implementasi ini dengan fetch ke Laravel REST API begitu
 * endpoint tersedia, contoh:
 *
 * export async function getGalleryItems(): Promise<GalleryItem[]> {
 *   const res = await fetch(`${env.NEXT_PUBLIC_API_URL}/gallery`, {
 *     next: { revalidate: 3600 },
 *   });
 *   if (!res.ok) throw new Error("Gagal memuat galeri");
 *   return res.json();
 * }
 */
const MOCK_GALLERY: GalleryItem[] = [
  {
    id: "1",
    title: "Tampak Depan Toko",
    category: "toko",
    description: "Toko kami yang mudah diakses dan nyaman dikunjungi.",
  },
  {
    id: "2",
    title: "Gudang Penyimpanan",
    category: "gudang",
    description: "Gudang dengan penyimpanan rapi menjaga kualitas produk.",
  },
  {
    id: "3",
    title: "Panen Bersama Petani",
    category: "aktivitas",
    description: "Pendampingan lapangan bersama mitra petani binaan.",
  },
  {
    id: "4",
    title: "Konsultasi Pelanggan",
    category: "pelanggan",
    description: "Sesi konsultasi langsung seputar kebutuhan pertanian.",
  },
  {
    id: "5",
    title: "Display Produk Pupuk",
    category: "produk",
    description: "Etalase pupuk dan bibit unggulan siap didistribusikan.",
  },
  {
    id: "6",
    title: "Pelatihan Petani Muda",
    category: "aktivitas",
    description: "Kegiatan edukasi rutin untuk regenerasi petani modern.",
  },
];

export async function getGalleryItems(): Promise<GalleryItem[]> {
  return MOCK_GALLERY;
}
