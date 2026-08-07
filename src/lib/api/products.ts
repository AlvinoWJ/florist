import { createClient } from "@/lib/supabase/server";
import type { Product } from "@/features/produk/types/Product.types";

export async function getFeaturedProducts(): Promise<Product[]> {
  const supabase = await createClient();
  const { data, error } = await supabase
    .from("products")
    .select(
      "id, name, type, category, short_description, brand, image_url",
    )
    .order("created_at", { ascending: false })
    .limit(8);

  if (error) {
    console.error("Gagal memuat produk:", error.message);
    return [];
  }

  return data.map((row) => ({
    id: row.id,
    name: row.name,
    type: row.type as Product["type"],
    category: row.category as Product["category"],
    shortDescription: row.short_description,
    brand: row.brand ?? undefined,
    imageUrl: row.image_url,
  }));
}
