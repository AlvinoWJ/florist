"use server";

import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";

import { createClient } from "@/lib/supabase/server";
import { productSchema } from "@/features/admin/schema/productSchema";

async function uploadProductImage(
  supabase: Awaited<ReturnType<typeof createClient>>,
  file: File,
) {
  if (!file || file.size === 0) return null;
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

export async function createProductAction(
  _prevState: { error?: string } | undefined,
  formData: FormData,
) {
  const parsed = productSchema.safeParse({
    name: formData.get("name"),
    slug: formData.get("slug"),
    category: formData.get("category"),
    shortDescription: formData.get("shortDescription"),
    brand: formData.get("brand") || undefined,
  });

  if (!parsed.success)
    return { error: parsed.error.issues[0]?.message ?? "Data tidak valid." };

  const supabase = await createClient();

  let imageUrl: string | null = null;
  const file = formData.get("image") as File | null;
  if (file && file.size > 0) {
    try {
      imageUrl = await uploadProductImage(supabase, file);
    } catch (err) {
      return { error: (err as Error).message };
    }
  }

  const { error } = await supabase.from("products").insert({
    name: parsed.data.name,
    slug: parsed.data.slug,
    category: parsed.data.category,
    short_description: parsed.data.shortDescription,
    brand: parsed.data.brand ?? null,
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
  const parsed = productSchema.safeParse({
    name: formData.get("name"),
    slug: formData.get("slug"),
    category: formData.get("category"),
    shortDescription: formData.get("shortDescription"),
    brand: formData.get("brand") || undefined,
  });

  if (!parsed.success)
    return { error: parsed.error.issues[0]?.message ?? "Data tidak valid." };

  const supabase = await createClient();

  const updatePayload: Record<string, unknown> = {
    name: parsed.data.name,
    slug: parsed.data.slug,
    category: parsed.data.category,
    short_description: parsed.data.shortDescription,
    brand: parsed.data.brand ?? null,
  };

  const file = formData.get("image") as File | null;
  if (file && file.size > 0) {
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
