import { getGalleryItems } from "@/lib/api/gallery";
import { GalleryManager } from "@/features/admin/components/GalleryManager";

export default async function AdminGaleriPage() {
  const items = await getGalleryItems();
  return <GalleryManager items={items} />;
}
