export type ProductType = "produk" | "jasa";

export type ProductCategory =
  | "pupuk"
  | "pestisida"
  | "bibit"
  | "benih"
  | "alat-pertanian"
  | "media-tanam"
  | "pakan"
  | "tanaman-hias"
  | "tanaman-buah"
  | "pot-tanaman"
  | "hidroponik"
  | "jasa-taman"
  | "jasa-dekorasi"
  | "lainnya";

export interface Product {
  id: string;
  name: string;
  type: ProductType;
  category: ProductCategory;
  shortDescription: string;
  brand?: string;
  imageUrl?: string | null;
}
