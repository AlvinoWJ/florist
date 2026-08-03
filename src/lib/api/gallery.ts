import { createClient } from "@/lib/supabase/server";
import type { GalleryItem } from "@/features/galeri/types/Gallery.types";

export async function getGalleryItems(): Promise<GalleryItem[]> {
  const supabase = await createClient();
  const { data, error } = await supabase
    .from("gallery_items")
    .select("id, title, category, description, image_url")
    .order("created_at", { ascending: false });

  if (error) {
    console.error("Gagal memuat galeri:", error.message);
    return [];
  }

  return data.map((row) => ({
    id: row.id,
    title: row.title,
    category: row.category as GalleryItem["category"],
    description: row.description,
    imageUrl: row.image_url,
  }));
}
