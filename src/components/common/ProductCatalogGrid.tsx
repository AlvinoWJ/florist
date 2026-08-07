"use client";

import { useMemo, useState } from "react";
import { ChevronDown } from "lucide-react";
import { cn } from "@/lib/utils";
import { CATEGORY_LABEL, ProductCard } from "@/components/common/ProductCard";
import type { Product } from "@/features/produk/types/Product.types";
import { LinkButton } from "@/components/ui/button";

const PAGE_SIZE = 8;

interface ProductCatalogGridProps {
  products: Product[];
}

export function ProductCatalogGrid({ products }: ProductCatalogGridProps) {
  const categories = useMemo(() => {
    return Array.from(new Set(products.map((p) => p.category)));
  }, [products]);

  const [activeCategory, setActiveCategory] = useState<
    Product["category"] | "semua"
  >("semua");
  const [visibleCount, setVisibleCount] = useState(PAGE_SIZE);

  const filtered = useMemo(() => {
    if (activeCategory === "semua") return products;
    return products.filter((p) => p.category === activeCategory);
  }, [products, activeCategory]);

  function handleSelectCategory(category: Product["category"] | "semua") {
    setActiveCategory(category);
    setVisibleCount(PAGE_SIZE);
  }

  return (
    <div className="mt-12">
      <div
        role="group"
        aria-label="Filter kategori produk"
        className="mb-10 flex flex-wrap justify-center gap-2"
      >
        <button
          type="button"
          onClick={() => handleSelectCategory("semua")}
          aria-pressed={activeCategory === "semua"}
          className={cn(
            "rounded-full border-2 border-ink px-4 py-2 font-heading text-xs font-bold uppercase tracking-wide transition-all",
            activeCategory === "semua"
              ? "-translate-x-0.5 -translate-y-0.5 bg-primary text-primary-foreground shadow-brutalist-sm"
              : "bg-card text-foreground hover:bg-muted",
          )}
        >
          Semua
        </button>

        {categories.map((category) => (
          <button
            key={category}
            type="button"
            onClick={() => handleSelectCategory(category)}
            aria-pressed={activeCategory === category}
            className={cn(
              "rounded-full border-2 border-ink px-4 py-2 font-heading text-xs font-bold uppercase tracking-wide transition-all",
              activeCategory === category
                ? "-translate-x-0.5 -translate-y-0.5 bg-primary text-primary-foreground shadow-brutalist-sm"
                : "bg-card text-foreground hover:bg-muted",
            )}
          >
            {CATEGORY_LABEL[category]}
          </button>
        ))}
      </div>

      <p className="mb-6 text-center text-sm text-muted-foreground">
        Menampilkan{" "}
        <strong className="font-number text-primary">
          {Math.min(visibleCount, filtered.length)}
        </strong>{" "}
        dari <strong className="font-number">{filtered.length}</strong> produk
      </p>

      {filtered.length === 0 ? (
        <div className="py-16 text-center">
          <p className="text-base text-muted-foreground">
            Belum ada produk pada kategori ini.
          </p>
        </div>
      ) : (
        <>
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 md:gap-6 lg:grid-cols-4">
            {filtered.slice(0, visibleCount).map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>

          {visibleCount < filtered.length ? (
            <div className="mt-10 text-center">
              <LinkButton
                variant="brutalist-outline"
                onClick={() => setVisibleCount((count) => count + PAGE_SIZE)}
                className="px-10 py-5 text-base rounded-full"
              >
                Tampilkan Lebih Banyak
                <ChevronDown className="h-4 w-4" aria-hidden="true" />
              </LinkButton>
            </div>
          ) : null}
        </>
      )}
    </div>
  );
}
