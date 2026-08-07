import Image from "next/image";
import { Sprout } from "lucide-react";
import { getWhatsappLink } from "@/lib/siteConfig";
import { Badge } from "@/components/ui/badge";
import { LinkButton } from "@/components/ui/button";
import type { Product } from "@/features/produk/types/Product.types";

export const CATEGORY_LABEL: Record<Product["category"], string> = {
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
    <article className="card-brutalist group flex flex-col">
      <div className="flex flex-1 flex-col overflow-hidden rounded-[inherit]">
        <div className="relative aspect-square overflow-hidden bg-gradient-to-br from-secondary/20 to-accent/30">
          {product.imageUrl ? (
            <Image
              src={product.imageUrl}
              alt={product.name}
              fill
              sizes="(min-width: 1024px) 25vw, (min-width: 640px) 50vw, 100vw"
              className="object-cover transition-transform duration-300 group-hover:scale-110"
            />
          ) : (
            <div className="flex h-full w-full items-center justify-center">
              <Sprout
                className="h-12 w-12 text-primary transition-transform duration-300 group-hover:scale-110"
                strokeWidth={1.5}
                aria-hidden="true"
              />
            </div>
          )}
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
            variant="brutalist"
            className="w-full border-ink"
          >
            {isJasa ? "Tanya Jasa Ini" : "Konsultasi via WhatsApp"}
          </LinkButton>
        </div>
      </div>
    </article>
  );
}
