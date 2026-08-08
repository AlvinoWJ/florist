"use client";

import { useEffect, useMemo, useState, useTransition } from "react";
import { useRouter } from "next/navigation";
import { ImageIcon, Pencil, Plus, Search, Trash2 } from "lucide-react";

import { deleteGalleryAction } from "@/features/admin/action/galleryAction";
import { ConfirmDialog } from "@/components/common/ConfirmDialog";
import { GalleryFormModal } from "@/features/admin/components/GalleryFormModal";
import { Badge } from "@/components/ui/badge";
import { CATEGORY_LABEL } from "@/components/common/GalleryCard";
import type { GalleryItem } from "@/features/galeri/types/Gallery.types";

interface GalleryManagerProps {
  items: GalleryItem[];
}

export function GalleryManager({ items }: GalleryManagerProps) {
  const router = useRouter();
  const [search, setSearch] = useState("");
  const [showForm, setShowForm] = useState(false);
  const [editingItem, setEditingItem] = useState<GalleryItem | null>(null);
  const [deleteTarget, setDeleteTarget] = useState<GalleryItem | null>(null);
  const [isDeleting, startDeleteTransition] = useTransition();

  // Tutup modal otomatis setelah create/update berhasil (redirect -> data baru masuk)
  useEffect(() => {
    setShowForm(false);
    setEditingItem(null);
  }, [items]);

  const filtered = useMemo(() => {
    const q = search.toLowerCase();
    return items.filter(
      (item) =>
        item.title.toLowerCase().includes(q) ||
        CATEGORY_LABEL[item.category].toLowerCase().includes(q),
    );
  }, [items, search]);

  function openNew() {
    setEditingItem(null);
    setShowForm(true);
  }

  function openEdit(item: GalleryItem) {
    setEditingItem(item);
    setShowForm(true);
  }

  function handleDelete() {
    if (!deleteTarget) return;
    const id = deleteTarget.id;
    startDeleteTransition(async () => {
      await deleteGalleryAction(id);
      setDeleteTarget(null);
      router.refresh();
    });
  }

  return (
    <div>
      <div className="flex items-center justify-between gap-3">
        <div>
          <h1 className="font-heading text-2xl font-bold text-foreground">
            Galeri
          </h1>
          <p className="mt-0.5 text-sm text-muted-foreground">
            {items.length} item galeri
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
          placeholder="Cari item galeri..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="w-full rounded-xl border-2 border-ink bg-card py-3 pl-10 pr-4 text-sm shadow-brutalist-sm outline-none"
        />
      </div>

      {filtered.length === 0 ? (
        <EmptyState />
      ) : (
        <div className="grid grid-cols-2 gap-4 md:grid-cols-3 md:gap-6 lg:grid-cols-4">
          {filtered.map((item) => (
            <div
              key={item.id}
              className="flex flex-col overflow-hidden rounded-2xl border-2 border-ink bg-card shadow-brutalist-sm"
            >
              <div className="relative aspect-square overflow-hidden bg-muted">
                {item.imageUrl ? (
                  // eslint-disable-next-line @next/next/no-img-element
                  <img
                    src={item.imageUrl}
                    alt={item.title}
                    className="h-full w-full object-cover"
                  />
                ) : (
                  <div className="flex h-full w-full items-center justify-center">
                    <ImageIcon
                      className="h-10 w-10 text-muted-foreground"
                      strokeWidth={1.5}
                      aria-hidden="true"
                    />
                  </div>
                )}
              </div>

              <div className="flex flex-1 flex-col gap-2 p-3 md:p-4">
                <Badge variant="secondary" className="w-fit">
                  {CATEGORY_LABEL[item.category]}
                </Badge>
                <p className="line-clamp-1 font-heading text-sm font-bold text-foreground">
                  {item.title}
                </p>
                <p className="line-clamp-2 flex-1 text-xs text-muted-foreground">
                  {item.description}
                </p>

                <div className="mt-1 flex gap-2">
                  <button
                    type="button"
                    onClick={() => openEdit(item)}
                    aria-label={`Edit ${item.title}`}
                    className="flex flex-1 items-center justify-center gap-1.5 rounded-lg border-2 border-ink py-2 text-xs font-semibold hover:bg-muted"
                  >
                    <Pencil className="h-3.5 w-3.5" aria-hidden="true" /> Edit
                  </button>
                  <button
                    type="button"
                    onClick={() => setDeleteTarget(item)}
                    aria-label={`Hapus ${item.title}`}
                    className="flex size-9 items-center justify-center rounded-lg border-2 border-ink text-destructive hover:bg-destructive/10"
                  >
                    <Trash2 className="h-3.5 w-3.5" aria-hidden="true" />
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}

      {showForm ? (
        <GalleryFormModal
          key={editingItem?.id ?? "new"}
          item={editingItem ?? undefined}
          onClose={() => {
            setShowForm(false);
            setEditingItem(null);
          }}
        />
      ) : null}

      {deleteTarget ? (
        <ConfirmDialog
          title="Hapus Item Galeri?"
          description={`"${deleteTarget.title}" akan dihapus permanen dan tidak bisa dibatalkan.`}
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
      <p className="text-sm text-muted-foreground">Belum ada item galeri.</p>
    </div>
  );
}
