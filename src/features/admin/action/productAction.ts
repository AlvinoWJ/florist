"use server";

import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";

import { createClient } from "@/lib/supabase/server";
import { productSchema } from "@/features/admin/schema/productSchema";

const MAX_IMAGE_SIZE = 1 * 1024 * 1024; // 1MB

async function uploadProductImage(
  supabase: Awaited<ReturnType<typeof createClient>>,
  file: File,
) {
  const ext = file.name.split(".").pop();
  const fileName = `${crypto.randomUUID()}.${ext}`;

  const { error } = await supabase.storage
    .from("product-images")
    .upload(fileName, file, { cacheControl: "3600", upsert: false });

  if (error) throw new Error(`Gagal upload gambar: ${error.message}`);

  const { data } = supabase.storage
    .from("product-images")
    .getPublicUrl(fileName);
  return data.publicUrl;
}

function parseProductForm(formData: FormData) {
  return productSchema.safeParse({
    name: formData.get("name"),
    type: formData.get("type"),
    category: formData.get("category"),
    shortDescription: formData.get("shortDescription"),
    brand: formData.get("brand") || undefined,
    badge: formData.get("badge") ?? "",
  });
}

export async function createProductAction(
  _prevState: { error?: string } | undefined,
  formData: FormData,
) {
  const parsed = parseProductForm(formData);
  if (!parsed.success)
    return { error: parsed.error.issues[0]?.message ?? "Data tidak valid." };

  const file = formData.get("image") as File | null;
  if (!file || file.size === 0) {
    return { error: "Gambar produk wajib diunggah." };
  }
  if (file.size > MAX_IMAGE_SIZE) {
    return { error: "Ukuran gambar maksimal 1MB." };
  }

  const supabase = await createClient();
  let imageUrl: string;
  try {
    imageUrl = await uploadProductImage(supabase, file);
  } catch (err) {
    return { error: (err as Error).message };
  }

  const { error } = await supabase.from("products").insert({
    name: parsed.data.name,
    type: parsed.data.type,
    category: parsed.data.category,
    short_description: parsed.data.shortDescription,
    brand: parsed.data.brand ?? null,
    badge: parsed.data.badge ?? null,
    image_url: imageUrl,
  });

  if (error) return { error: `Gagal menyimpan produk: ${error.message}` };

  revalidatePath("/admin/produk");
  revalidatePath("/");
  redirect("/admin/produk");
}

export async function updateProductAction(
  id: string,
  _prevState: { error?: string } | undefined,
  formData: FormData,
) {
  const parsed = parseProductForm(formData);
  if (!parsed.success)
    return { error: parsed.error.issues[0]?.message ?? "Data tidak valid." };

  const supabase = await createClient();

  const updatePayload: Record<string, unknown> = {
    name: parsed.data.name,
    type: parsed.data.type,
    category: parsed.data.category,
    short_description: parsed.data.shortDescription,
    brand: parsed.data.brand ?? null,
    badge: parsed.data.badge ?? null,
  };

  const file = formData.get("image") as File | null;
  if (file && file.size > 0) {
    if (file.size > MAX_IMAGE_SIZE) {
      return { error: "Ukuran gambar maksimal 1MB." };
    }
    try {
      updatePayload.image_url = await uploadProductImage(supabase, file);
    } catch (err) {
      return { error: (err as Error).message };
    }
  }

  const { error } = await supabase
    .from("products")
    .update(updatePayload)
    .eq("id", id);
  if (error) return { error: `Gagal memperbarui produk: ${error.message}` };

  revalidatePath("/admin/produk");
  revalidatePath("/");
  redirect("/admin/produk");
}

export async function deleteProductAction(id: string) {
  const supabase = await createClient();
  const { error } = await supabase.from("products").delete().eq("id", id);
  if (error) throw new Error(`Gagal menghapus produk: ${error.message}`);

  revalidatePath("/admin/produk");
  revalidatePath("/");
}
