"use client";

import { useEffect, useMemo, useState, useTransition } from "react";
import { useRouter } from "next/navigation";
import { Pencil, Plus, Search, Trash2 } from "lucide-react";

import { deleteProductAction } from "@/features/admin/action/productAction";
import { ConfirmDialog } from "@/components/common/ConfirmDialog";
import { ProductFormModal } from "@/features/admin/components/ProductFormModal";
import { Badge } from "@/components/ui/badge";
import { CATEGORY_LABEL } from "@/components/common/ProductCard";
import { PRODUCT_BADGE_VARIANT } from "@/features/produk/constants/badges";
import type { Product } from "@/features/produk/types/Product.types";

interface ProdukManagerProps {
  products: Product[];
}

export function ProdukManager({ products }: ProdukManagerProps) {
  const router = useRouter();
  const [search, setSearch] = useState("");
  const [showForm, setShowForm] = useState(false);
  const [editingProduct, setEditingProduct] = useState<Product | null>(null);
  const [deleteTarget, setDeleteTarget] = useState<Product | null>(null);
  const [isDeleting, startDeleteTransition] = useTransition();

  // Tutup modal otomatis setelah create/update berhasil (redirect -> data baru masuk)
  useEffect(() => {
    setShowForm(false);
    setEditingProduct(null);
  }, [products]);

  const filtered = useMemo(() => {
    const q = search.toLowerCase();
    return products.filter(
      (p) =>
        p.name.toLowerCase().includes(q) ||
        CATEGORY_LABEL[p.category].toLowerCase().includes(q),
    );
  }, [products, search]);

  function openNew() {
    setEditingProduct(null);
    setShowForm(true);
  }

  function openEdit(product: Product) {
    setEditingProduct(product);
    setShowForm(true);
  }

  function handleDelete() {
    if (!deleteTarget) return;
    const id = deleteTarget.id;
    startDeleteTransition(async () => {
      await deleteProductAction(id);
      setDeleteTarget(null);
      router.refresh();
    });
  }

  return (
    <div>
      <div className="flex items-center justify-between gap-3">
        <div>
          <h1 className="font-heading text-2xl font-bold text-foreground">
            Produk
          </h1>
          <p className="mt-0.5 text-sm text-muted-foreground">
            {products.length} produk terdaftar
          </p>
        </div>
        <button
          type="button"
          onClick={openNew}
          className="btn-lift flex items-center gap-2 rounded-lg border-2 border-ink bg-primary px-4 py-2 text-sm font-semibold text-primary-foreground shadow-brutalist-sm"
        >
          <Plus className="h-4 w-4" aria-hidden="true" /> Tambah
        </button>
      </div>

      <div className="relative mt-5 mb-6">
        <Search
          className="pointer-events-none absolute left-3.5 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground"
          aria-hidden="true"
        />
        <input
          type="search"
          placeholder="Cari produk..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="w-full rounded-xl border-2 border-ink bg-card py-3 pl-10 pr-4 text-sm shadow-brutalist-sm outline-none"
        />
      </div>

      {/* Mobile: card list */}
      <div className="flex flex-col gap-3 md:hidden">
        {filtered.length === 0 ? (
          <EmptyState />
        ) : (
          filtered.map((p) => (
            <div
              key={p.id}
              className="flex gap-3 rounded-2xl border-2 border-ink bg-card p-4 shadow-brutalist-sm"
            >
              <div className="h-16 w-16 shrink-0 overflow-hidden rounded-xl border-2 border-ink bg-muted">
                {p.imageUrl ? (
                  // eslint-disable-next-line @next/next/no-img-element
                  <img
                    src={p.imageUrl}
                    alt={p.name}
                    className="h-full w-full object-cover"
                  />
                ) : null}
              </div>

              <div className="min-w-0 flex-1">
                <div className="flex items-start justify-between gap-2">
                  <p className="font-heading text-sm font-bold leading-snug text-foreground line-clamp-2">
                    {p.name}
                  </p>
                  {p.badge ? (
                    <Badge
                      variant={PRODUCT_BADGE_VARIANT[p.badge]}
                      className="shrink-0"
                    >
                      {p.badge}
                    </Badge>
                  ) : null}
                </div>
                <Badge variant="secondary" className="mt-1">
                  {CATEGORY_LABEL[p.category]}
                </Badge>
                <p className="mt-1.5 line-clamp-2 text-xs text-muted-foreground">
                  {p.shortDescription}
                </p>
              </div>

              <div className="flex shrink-0 flex-col gap-2">
                <button
                  type="button"
                  onClick={() => openEdit(p)}
                  aria-label={`Edit ${p.name}`}
                  className="flex size-9 items-center justify-center rounded-xl border-2 border-ink"
                >
                  <Pencil className="h-4 w-4" aria-hidden="true" />
                </button>
                <button
                  type="button"
                  onClick={() => setDeleteTarget(p)}
                  aria-label={`Hapus ${p.name}`}
                  className="flex size-9 items-center justify-center rounded-xl border-2 border-destructive text-destructive"
                >
                  <Trash2 className="h-4 w-4" aria-hidden="true" />
                </button>
              </div>
            </div>
          ))
        )}
      </div>

      {/* Desktop: table */}
      <div className="hidden overflow-x-auto rounded-2xl border-2 border-ink bg-card shadow-brutalist-md md:block">
        <table className="w-full text-left text-sm">
          <thead className="border-b-2 border-ink bg-accent">
            <tr>
              <th className="px-5 py-3.5 font-heading text-xs font-bold uppercase tracking-widest">
                Foto
              </th>
              <th className="px-5 py-3.5 font-heading text-xs font-bold uppercase tracking-widest">
                Nama Produk
              </th>
              <th className="px-5 py-3.5 font-heading text-xs font-bold uppercase tracking-widest">
                Kategori
              </th>
              <th className="px-5 py-3.5 font-heading text-xs font-bold uppercase tracking-widest">
                Badge
              </th>
              <th className="px-5 py-3.5 font-heading text-xs font-bold uppercase tracking-widest">
                Aksi
              </th>
            </tr>
          </thead>
          <tbody>
            {filtered.length === 0 ? (
              <tr>
                <td
                  colSpan={5}
                  className="px-4 py-16 text-center text-muted-foreground"
                >
                  Tidak ada produk ditemukan.
                </td>
              </tr>
            ) : (
              filtered.map((p) => (
                <tr
                  key={p.id}
                  className="border-b border-ink/10 last:border-0 hover:bg-muted/60"
                >
                  <td className="px-5 py-3">
                    <div className="h-14 w-14 overflow-hidden rounded-xl border-2 border-ink bg-muted">
                      {p.imageUrl ? (
                        // eslint-disable-next-line @next/next/no-img-element
                        <img
                          src={p.imageUrl}
                          alt={p.name}
                          className="h-full w-full object-cover"
                        />
                      ) : null}
                    </div>
                  </td>
                  <td className="px-5 py-3">
                    <div className="font-heading font-semibold text-foreground">
                      {p.name}
                    </div>
                    <div className="mt-0.5 max-w-xs truncate text-xs text-muted-foreground">
                      {p.shortDescription}
                    </div>
                  </td>
                  <td className="px-5 py-3">
                    <Badge variant="secondary">
                      {CATEGORY_LABEL[p.category]}
                    </Badge>
                  </td>
                  <td className="px-5 py-3">
                    {p.badge ? (
                      <Badge variant={PRODUCT_BADGE_VARIANT[p.badge]}>
                        {p.badge}
                      </Badge>
                    ) : (
                      <span className="text-muted-foreground">—</span>
                    )}
                  </td>
                  <td className="px-5 py-3">
                    <div className="flex justify-end gap-2">
                      <button
                        type="button"
                        onClick={() => openEdit(p)}
                        aria-label={`Edit ${p.name}`}
                        className="flex size-8 items-center justify-center rounded-lg border-2 border-ink hover:bg-muted"
                      >
                        <Pencil className="h-3.5 w-3.5" aria-hidden="true" />
                      </button>
                      <button
                        type="button"
                        onClick={() => setDeleteTarget(p)}
                        aria-label={`Hapus ${p.name}`}
                        className="flex size-8 items-center justify-center rounded-lg border-2 border-ink text-destructive hover:bg-destructive/10"
                      >
                        <Trash2 className="h-3.5 w-3.5" aria-hidden="true" />
                      </button>
                    </div>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>

      {showForm ? (
        <ProductFormModal
          key={editingProduct?.id ?? "new"}
          product={editingProduct ?? undefined}
          onClose={() => {
            setShowForm(false);
            setEditingProduct(null);
          }}
        />
      ) : null}

      {deleteTarget ? (
        <ConfirmDialog
          title="Hapus Produk?"
          description={`"${deleteTarget.name}" akan dihapus permanen dan tidak bisa dibatalkan.`}
          isPending={isDeleting}
          onConfirm={handleDelete}
          onCancel={() => setDeleteTarget(null)}
        />
      ) : null}
    </div>
  );
}

function EmptyState() {
  return (
    <div className="rounded-2xl border-2 border-dashed border-ink/40 py-16 text-center">
      <p className="text-sm text-muted-foreground">Produk tidak ditemukan.</p>
    </div>
  );
}
