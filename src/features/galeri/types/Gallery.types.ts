export type GalleryCategory =
  | "toko"
  | "gudang"
  | "produk"
  | "aktivitas"
  | "pelanggan";

export interface GalleryItem {
  id: string;
  title: string;
  category: GalleryCategory;
  description: string;
  imageUrl?: string | null;
}
