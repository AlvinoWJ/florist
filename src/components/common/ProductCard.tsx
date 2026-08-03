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
  "tanaman-hias": "Tanaman Hias",
  "tanaman-buah": "Tanaman Buah",
  "pot-tanaman": "Pot Tanaman",
  hidroponik: "Hidroponik",
  "jasa-taman": "Jasa Taman & Menanam",
  "jasa-dekorasi": "Jasa Dekorasi",
  lainnya: "Lainnya",
};

interface ProductCardProps {
  product: Product;
}

export function ProductCard({ product }: ProductCardProps) {
  const isJasa = product.type === "jasa";
  const waMessage = isJasa
    ? `Halo, saya ingin menanyakan jasa ${product.name}`
    : `Halo, saya ingin bertanya tentang produk ${product.name}`;

  return (
    <article className="group flex flex-col overflow-hidden rounded-2xl border-2 border-ink bg-card shadow-brutalist-sm transition-transform duration-300 hover:-translate-y-1 hover:shadow-brutalist-md">
      <div className="flex aspect-square items-center justify-center bg-gradient-to-br from-secondary/20 to-accent/30">
        <Sprout
          className="h-12 w-12 text-primary transition-transform duration-300 group-hover:scale-110"
          strokeWidth={1.5}
          aria-hidden="true"
        />
      </div>

      <div className="flex flex-1 flex-col gap-3 p-4 md:p-6">
        <Badge variant={isJasa ? "accent" : "secondary"} className="w-fit">
          {CATEGORY_LABEL[product.category]}
        </Badge>

        <h3 className="font-heading text-xl font-bold text-foreground">
          {product.name}
        </h3>

        <p className="line-clamp-2 flex-1 text-sm text-muted-foreground">
          {product.shortDescription}
        </p>

        <LinkButton
          href={getWhatsappLink(waMessage)}
          target="_blank"
          rel="noopener noreferrer"
          variant="outline"
          className="w-full border-ink"
        >
          {isJasa ? "Tanya Jasa Ini" : "Konsultasi via WhatsApp"}
        </LinkButton>
      </div>
    </article>
  );
}
