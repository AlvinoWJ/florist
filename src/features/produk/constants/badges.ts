import type { ProductBadge } from "@/features/produk/types/Product.types";

export const PRODUCT_BADGE_VARIANT: Record<
  ProductBadge,
  "default" | "highlight" | "accent" | "earth"
> = {
  Baru: "default",
  Terlaris: "highlight",
  Populer: "accent",
  Pilihan: "earth",
};
