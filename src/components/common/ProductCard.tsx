import { Sprout } from "lucide-react";

import { getWhatsappLink } from "@/lib/siteConfig";

import { Badge } from "@/components/ui/badge";
import { LinkButton } from "@/components/ui/button";

import type { Product } from "@/features/produk/types/Product.types";

const CATEGORY_LABEL: Record<Product["category"], string> = {
  pupuk: "Pupuk",
  pestisida: "Pestisida",
  bibit: "Bibit",
  benih: "Benih",
  "alat-pertanian": "Alat Pertanian",
  "media-tanam": "Media Tanam",
  pakan: "Pakan",
  lainnya: "Lainnya",
};

interface ProductCardProps {
  product: Product;
}

export function ProductCard({ product }: ProductCardProps) {
  return (
    <article className="group flex flex-col overflow-hidden rounded-2xl border-2 border-ink bg-card shadow-brutalist-sm transition-transform duration-300 hover:-translate-y-1 hover:shadow-brutalist-md">
      {/* Placeholder foto produk — ganti dengan next/image saat foto asli tersedia (lihat AGENTS.md § Image Rules) */}
      <div className="flex aspect-square items-center justify-center bg-gradient-to-br from-secondary/20 to-accent/30">
        <Sprout
          className="h-12 w-12 text-primary transition-transform duration-300 group-hover:scale-110"
          strokeWidth={1.5}
          aria-hidden="true"
        />
      </div>

      <div className="flex flex-1 flex-col gap-3 p-4 md:p-6">
        <Badge variant="secondary" className="w-fit">
          {CATEGORY_LABEL[product.category]}
        </Badge>

        <h3 className="font-heading text-xl font-bold text-foreground">
          {product.name}
        </h3>

        <p className="line-clamp-2 flex-1 text-sm text-muted-foreground">
          {product.shortDescription}
        </p>

        <LinkButton
          href={getWhatsappLink(
            `Halo, saya ingin bertanya tentang produk ${product.name}`,
          )}
          target="_blank"
          rel="noopener noreferrer"
          variant="outline"
          className="w-full border-ink"
        >
          Konsultasi via WhatsApp
        </LinkButton>
      </div>
    </article>
  );
}
