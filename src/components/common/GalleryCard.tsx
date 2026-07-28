import { Camera, Sprout, Users, Warehouse, Store } from "lucide-react";

import type {
  GalleryCategory,
  GalleryItem,
} from "@/features/galeri/types/Gallery.types";

const CATEGORY_LABEL: Record<GalleryCategory, string> = {
  toko: "Toko",
  gudang: "Gudang",
  produk: "Produk",
  aktivitas: "Aktivitas",
  pelanggan: "Pelanggan",
};

const CATEGORY_ICON: Record<GalleryCategory, typeof Camera> = {
  toko: Store,
  gudang: Warehouse,
  produk: Sprout,
  aktivitas: Camera,
  pelanggan: Users,
};

interface GalleryCardProps {
  item: GalleryItem;
}

export function GalleryCard({ item }: GalleryCardProps) {
  const Icon = CATEGORY_ICON[item.category];

  return (
    <div className="group relative aspect-square transition-transform duration-300 hover:-translate-y-1">
      <figure className="relative h-full w-full overflow-hidden rounded-2xl border-2 border-ink bg-card shadow-brutalist-sm transition-shadow duration-300 group-hover:shadow-brutalist-md">
        {/* Placeholder foto dokumentasi — ganti dengan next/image saat foto asli tersedia (lihat AGENTS.md § Image Rules) */}
        <div className="flex h-full w-full items-center justify-center bg-gradient-to-br from-secondary/20 to-accent/30">
          <Icon
            className="h-10 w-10 text-primary transition-transform duration-300 group-hover:scale-110"
            strokeWidth={1.5}
            aria-hidden="true"
          />
        </div>

        <figcaption className="absolute inset-x-0 bottom-0 translate-y-full bg-foreground/85 p-4 text-background transition-transform duration-300 ease-out group-hover:translate-y-0">
          <span className="font-heading text-xs font-bold uppercase tracking-wide text-accent">
            {CATEGORY_LABEL[item.category]}
          </span>
          <p className="mt-1 font-heading text-sm font-bold">{item.title}</p>
          <p className="mt-1 line-clamp-2 text-xs text-background/80">
            {item.description}
          </p>
        </figcaption>
      </figure>
    </div>
  );
}
