export type ProductCategory =
  | "pupuk"
  | "pestisida"
  | "bibit"
  | "benih"
  | "alat-pertanian"
  | "media-tanam"
  | "pakan"
  | "lainnya";

export interface Product {
  id: string;
  slug: string;
  name: string;
  category: ProductCategory;
  shortDescription: string;
  brand?: string;
  imageurl?: string | null;
}
