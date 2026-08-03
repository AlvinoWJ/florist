import { createClient } from "@/lib/supabase/server";
import type { Product } from "@/features/produk/types/Product.types";

export async function getFeaturedProducts(): Promise<Product[]> {
  const supabase = await createClient();
  const { data, error } = await supabase
    .from("products")
    .select("id, slug, name, category, short_description, brand, image_url")
    .order("created_at", { ascending: false })
    .limit(8);

  if (error) {
    console.error("Gagal memuat produk:", error.message);
    return [];
  }

  return data.map((row) => ({
    id: row.id,
    slug: row.slug,
    name: row.name,
    category: row.category as Product["category"],
    shortDescription: row.short_description,
    brand: row.brand ?? undefined,
    imageUrl: row.image_url,
  }));
}
