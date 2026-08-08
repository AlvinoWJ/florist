"use client";

import { useActionState, useState } from "react";
import { X } from "lucide-react";

import {
  createGalleryAction,
  updateGalleryAction,
} from "@/features/admin/action/galleryAction";
import { CATEGORY_LABEL } from "@/components/common/GalleryCard";
import type {
  GalleryCategory,
  GalleryItem,
} from "@/features/galeri/types/Gallery.types";

const CATEGORIES = (
  Object.entries(CATEGORY_LABEL) as [GalleryCategory, string][]
).map(([value, label]) => ({ value, label }));

const MAX_IMAGE_SIZE = 1 * 1024 * 1024; // 1MB

interface GalleryFormModalProps {
  item?: GalleryItem;
  onClose: () => void;
}

export function GalleryFormModal({ item, onClose }: GalleryFormModalProps) {
  const action = item
    ? updateGalleryAction.bind(null, item.id)
    : createGalleryAction;
  const [state, formAction, isPending] = useActionState(action, undefined);
  const [fileError, setFileError] = useState<string | null>(null);

  function handleImageChange(e: React.ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0];
    if (!file) {
      setFileError(null);
      return;
    }
    if (file.size > MAX_IMAGE_SIZE) {
      setFileError("Ukuran gambar melebihi 1MB. Pilih file lain.");
      e.target.value = "";
      return;
    }
    setFileError(null);
  }

  return (
    <div className="fixed inset-0 z-50 flex items-end justify-center bg-foreground/50 backdrop-blur-sm md:items-center">
      <div className="max-h-[90vh] w-full overflow-y-auto rounded-t-3xl border-2 border-ink bg-card p-6 shadow-brutalist-lg md:max-w-lg md:rounded-3xl md:p-8">
        <div className="mx-auto mb-5 h-1.5 w-12 rounded-full bg-ink/20 md:hidden" />

        <div className="mb-5 flex items-center justify-between">
          <h2 className="font-heading text-xl font-bold text-foreground">
            {item ? "Edit Item Galeri" : "Tambah Item Galeri"}
          </h2>
          <button
            type="button"
            onClick={onClose}
            aria-label="Tutup"
            className="flex size-9 items-center justify-center rounded-full border-2 border-ink hover:bg-muted"
          >
            <X className="h-4 w-4" aria-hidden="true" />
          </button>
        </div>

        {item?.imageUrl ? (
          // eslint-disable-next-line @next/next/no-img-element
          <img
            src={item.imageUrl}
            alt={item.title}
            className="mb-4 h-40 w-full rounded-lg border-2 border-ink object-cover"
          />
        ) : null}

        <form
          action={formAction}
          encType="multipart/form-data"
          className="flex flex-col gap-4"
        >
          <div className="flex flex-col gap-1.5">
            <label
              htmlFor="title"
              className="text-sm font-medium text-foreground"
            >
              Judul <span className="text-destructive">*</span>
            </label>
            <input
              id="title"
              name="title"
              type="text"
              defaultValue={item?.title}
              required
              className="rounded-lg border-2 border-ink bg-background px-3 py-2 text-sm outline-none"
            />
          </div>

          <div className="flex flex-col gap-1.5">
            <label
              htmlFor="category"
              className="text-sm font-medium text-foreground"
            >
              Kategori <span className="text-destructive">*</span>
            </label>
            <select
              id="category"
              name="category"
              defaultValue={item?.category}
              required
              className="rounded-lg border-2 border-ink bg-background px-3 py-2 text-sm outline-none"
            >
              {CATEGORIES.map((c) => (
                <option key={c.value} value={c.value}>
                  {c.label}
                </option>
              ))}
            </select>
          </div>

          <div className="flex flex-col gap-1.5">
            <label
              htmlFor="description"
              className="text-sm font-medium text-foreground"
            >
              Deskripsi <span className="text-destructive">*</span>
            </label>
            <textarea
              id="description"
              name="description"
              defaultValue={item?.description}
              required
              rows={3}
              className="rounded-lg border-2 border-ink bg-background px-3 py-2 text-sm outline-none"
            />
          </div>

          <div className="flex flex-col gap-1.5">
            <label
              htmlFor="image"
              className="text-sm font-medium text-foreground"
            >
              {item ? "Ganti Gambar (opsional)" : "Gambar"}{" "}
              {!item ? <span className="text-destructive">*</span> : null}
            </label>
            <input
              id="image"
              name="image"
              type="file"
              accept="image/*"
              required={!item}
              onChange={handleImageChange}
              className="rounded-lg border-2 border-ink bg-background px-3 py-2 text-sm outline-none file:mr-3 file:rounded-md file:border-0 file:bg-muted file:px-3 file:py-1.5 file:text-sm"
            />
            <p className="text-xs text-muted-foreground">
              Format JPG/PNG/WebP, maksimal 1MB.
            </p>
            {fileError ? (
              <p className="text-xs text-destructive">{fileError}</p>
            ) : null}
          </div>

          {state?.error ? (
            <p className="text-sm text-destructive">{state.error}</p>
          ) : null}

          <div className="mt-2 flex gap-3">
            <button
              type="submit"
              disabled={isPending || !!fileError}
              className="btn-lift flex-1 rounded-lg border-2 border-ink bg-primary px-4 py-2.5 text-sm font-semibold text-primary-foreground shadow-brutalist-sm disabled:opacity-60"
            >
              {isPending ? "Menyimpan..." : "Simpan"}
            </button>
            <button
              type="button"
              onClick={onClose}
              className="rounded-lg border-2 border-ink px-4 py-2.5 text-sm font-semibold hover:bg-muted"
            >
              Batal
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
