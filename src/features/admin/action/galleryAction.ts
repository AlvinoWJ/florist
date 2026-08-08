"use server";

import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";

import { createClient } from "@/lib/supabase/server";
import { gallerySchema } from "@/features/admin/schema/gallerySchema";

const MAX_IMAGE_SIZE = 1 * 1024 * 1024;

async function uploadGalleryImage(
  supabase: Awaited<ReturnType<typeof createClient>>,
  file: File,
) {
  const ext = file.name.split(".").pop();
  const fileName = `${crypto.randomUUID()}.${ext}`;

  const { error } = await supabase.storage
    .from("gallery-images")
    .upload(fileName, file, { cacheControl: "3600", upsert: false });
  if (error) throw new Error(`Gagal upload gambar: ${error.message}`);

  const { data } = supabase.storage
    .from("gallery-images")
    .getPublicUrl(fileName);
  return data.publicUrl;
}

export async function createGalleryAction(
  _prevState: { error?: string } | undefined,
  formData: FormData,
) {
  const parsed = gallerySchema.safeParse({
    title: formData.get("title"),
    category: formData.get("category"),
    description: formData.get("description"),
  });

  if (!parsed.success)
    return { error: parsed.error.issues[0]?.message ?? "Data tidak valid." };

  const file = formData.get("image") as File | null;
  if (!file || file.size === 0) {
    return { error: "Gambar galeri wajib diunggah." };
  }
  if (file.size > MAX_IMAGE_SIZE) {
    return { error: "Ukuran gambar maksimal 1MB." };
  }

  const supabase = await createClient();

  let imageUrl: string;
  try {
    imageUrl = await uploadGalleryImage(supabase, file);
  } catch (err) {
    return { error: (err as Error).message };
  }

  const { error } = await supabase.from("gallery_items").insert({
    title: parsed.data.title,
    category: parsed.data.category,
    description: parsed.data.description,
    image_url: imageUrl,
  });

  if (error) return { error: `Gagal menyimpan item galeri: ${error.message}` };

  revalidatePath("/admin/galeri");
  revalidatePath("/");
  redirect("/admin/galeri");
}

export async function updateGalleryAction(
  id: string,
  _prevState: { error?: string } | undefined,
  formData: FormData,
) {
  const parsed = gallerySchema.safeParse({
    title: formData.get("title"),
    category: formData.get("category"),
    description: formData.get("description"),
  });

  if (!parsed.success)
    return { error: parsed.error.issues[0]?.message ?? "Data tidak valid." };

  const supabase = await createClient();

  const updatePayload: Record<string, unknown> = {
    title: parsed.data.title,
    category: parsed.data.category,
    description: parsed.data.description,
  };

  const file = formData.get("image") as File | null;
  if (file && file.size > 0) {
    if (file.size > MAX_IMAGE_SIZE) {
      return { error: "Ukuran gambar maksimal 1MB." };
    }
    try {
      updatePayload.image_url = await uploadGalleryImage(supabase, file);
    } catch (err) {
      return { error: (err as Error).message };
    }
  }

  const { error } = await supabase
    .from("gallery_items")
    .update(updatePayload)
    .eq("id", id);
  if (error)
    return { error: `Gagal memperbarui item galeri: ${error.message}` };

  revalidatePath("/admin/galeri");
  revalidatePath("/");
  redirect("/admin/galeri");
}

export async function deleteGalleryAction(id: string) {
  const supabase = await createClient();
  const { error } = await supabase.from("gallery_items").delete().eq("id", id);
  if (error) throw new Error(`Gagal menghapus item galeri: ${error.message}`);

  revalidatePath("/admin/galeri");
  revalidatePath("/");
}
