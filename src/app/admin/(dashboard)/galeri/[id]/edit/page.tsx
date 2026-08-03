import { notFound } from "next/navigation";
import { createClient } from "@/lib/supabase/server";
import { EditGalleryForm } from "@/features/admin/components/EditGalleryForm";

export default async function EditGalleryPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const supabase = await createClient();
  const { data: item } = await supabase
    .from("gallery_items")
    .select("*")
    .eq("id", id)
    .single();

  if (!item) notFound();

  return <EditGalleryForm item={item} />;
}
