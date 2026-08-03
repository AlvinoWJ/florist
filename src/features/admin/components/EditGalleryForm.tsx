"use client";

import { useActionState } from "react";
import Link from "next/link";

import { updateGalleryAction } from "@/features/admin/action/galleryAction";

const CATEGORIES = [
  { value: "toko", label: "Toko" },
  { value: "gudang", label: "Gudang" },
  { value: "produk", label: "Produk" },
  { value: "aktivitas", label: "Aktivitas" },
  { value: "pelanggan", label: "Pelanggan" },
];

interface EditGalleryFormProps {
  item: {
    id: string;
    title: string;
    category: string;
    description: string;
    image_url: string | null;
  };
}

export function EditGalleryForm({ item }: EditGalleryFormProps) {
  const updateWithId = updateGalleryAction.bind(null, item.id);
  const [state, formAction, isPending] = useActionState(
    updateWithId,
    undefined,
  );

  return (
    <div className="mx-auto max-w-xl">
      <h1 className="font-heading text-2xl font-bold text-foreground">
        Edit Item Galeri
      </h1>

      <form
        action={formAction}
        encType="multipart/form-data"
        className="mt-6 flex flex-col gap-4 rounded-2xl border-2 border-ink bg-card p-6 shadow-brutalist-sm"
      >
        {item.image_url ? (
          // eslint-disable-next-line @next/next/no-img-element
          <img
            src={item.image_url}
            alt={item.title}
            className="h-40 w-full rounded-lg border-2 border-ink object-cover"
          />
        ) : null}

        <div className="flex flex-col gap-1.5">
          <label
            htmlFor="title"
            className="text-sm font-medium text-foreground"
          >
            Judul
          </label>
          <input
            id="title"
            name="title"
            type="text"
            defaultValue={item.title}
            required
            className="rounded-lg border-2 border-ink bg-background px-3 py-2 text-sm outline-none"
          />
        </div>

        <div className="flex flex-col gap-1.5">
          <label
            htmlFor="category"
            className="text-sm font-medium text-foreground"
          >
            Kategori
          </label>
          <select
            id="category"
            name="category"
            defaultValue={item.category}
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
            Deskripsi
          </label>
          <textarea
            id="description"
            name="description"
            defaultValue={item.description}
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
            Ganti Gambar (opsional)
          </label>
          <input
            id="image"
            name="image"
            type="file"
            accept="image/*"
            className="rounded-lg border-2 border-ink bg-background px-3 py-2 text-sm outline-none file:mr-3 file:rounded-md file:border-0 file:bg-muted file:px-3 file:py-1.5 file:text-sm"
          />
        </div>

        {state?.error ? (
          <p className="text-sm text-destructive">{state.error}</p>
        ) : null}

        <div className="mt-2 flex gap-3">
          <button
            type="submit"
            disabled={isPending}
            className="btn-lift rounded-lg border-2 border-ink bg-primary px-4 py-2 text-sm font-semibold text-primary-foreground shadow-brutalist-sm disabled:opacity-60"
          >
            {isPending ? "Menyimpan..." : "Simpan Perubahan"}
          </button>
          <Link
            href="/admin/galeri"
            className="rounded-lg border-2 border-ink px-4 py-2 text-sm font-semibold hover:bg-muted"
          >
            Batal
          </Link>
        </div>
      </form>
    </div>
  );
}
