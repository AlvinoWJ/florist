import { createClient } from "@/lib/supabase/server";
import type { Product } from "@/features/produk/types/Product.types";

function mapRow(row: Record<string, unknown>): Product {
  return {
    id: row.id as string,
    name: row.name as string,
    type: row.type as Product["type"],
    category: row.category as Product["category"],
    shortDescription: row.short_description as string,
    brand: (row.brand as string) ?? undefined,
    imageUrl: row.image_url as string | null,
    badge: (row.badge as Product["badge"]) ?? null,
  };
}

export async function getFeaturedProducts(): Promise<Product[]> {
  const supabase = await createClient();
  const { data, error } = await supabase
    .from("products")
    .select(
      "id, name, type, category, short_description, brand, image_url, badge",
    )
    .order("created_at", { ascending: false })
    .limit(24);

  if (error) {
    console.error("Gagal memuat produk:", error.message);
    return [];
  }

  return data.map(mapRow);
}

export async function getAdminProducts(): Promise<Product[]> {
  const supabase = await createClient();
  const { data, error } = await supabase
    .from("products")
    .select(
      "id, name, type, category, short_description, brand, image_url, badge",
    )
    .order("created_at", { ascending: false });

  if (error) {
    console.error("Gagal memuat produk (admin):", error.message);
    return [];
  }

  return data.map(mapRow);
}
