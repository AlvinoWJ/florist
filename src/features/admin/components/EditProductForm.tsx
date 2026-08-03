"use client";

import { useActionState } from "react";
import Link from "next/link";

import { updateProductAction } from "@/features/admin/action/productAction";

const CATEGORIES = [
  { value: "pupuk", label: "Pupuk" },
  { value: "pestisida", label: "Pestisida" },
  { value: "bibit", label: "Bibit" },
  { value: "benih", label: "Benih" },
  { value: "alat-pertanian", label: "Alat Pertanian" },
  { value: "media-tanam", label: "Media Tanam" },
  { value: "pakan", label: "Pakan" },
  { value: "lainnya", label: "Lainnya" },
];

interface EditProductFormProps {
  product: {
    id: string;
    name: string;
    slug: string;
    category: string;
    short_description: string;
    brand: string | null;
    image_url: string | null;
  };
}

export function EditProductForm({ product }: EditProductFormProps) {
  const updateWithId = updateProductAction.bind(null, product.id);
  const [state, formAction, isPending] = useActionState(
    updateWithId,
    undefined,
  );

  return (
    <div className="mx-auto max-w-xl">
      <h1 className="font-heading text-2xl font-bold text-foreground">
        Edit Produk
      </h1>

      <form
        action={formAction}
        encType="multipart/form-data"
        className="mt-6 flex flex-col gap-4 rounded-2xl border-2 border-ink bg-card p-6 shadow-brutalist-sm"
      >
        {product.image_url ? (
          // eslint-disable-next-line @next/next/no-img-element
          <img
            src={product.image_url}
            alt={product.name}
            className="h-40 w-full rounded-lg border-2 border-ink object-cover"
          />
        ) : null}

        <Field
          label="Nama Produk"
          name="name"
          defaultValue={product.name}
          required
        />
        <Field
          label="Slug (untuk URL)"
          name="slug"
          defaultValue={product.slug}
          required
        />

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
            defaultValue={product.category}
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
            htmlFor="shortDescription"
            className="text-sm font-medium text-foreground"
          >
            Deskripsi Singkat
          </label>
          <textarea
            id="shortDescription"
            name="shortDescription"
            defaultValue={product.short_description}
            required
            rows={3}
            className="rounded-lg border-2 border-ink bg-background px-3 py-2 text-sm outline-none"
          />
        </div>

        <Field
          label="Merek (opsional)"
          name="brand"
          defaultValue={product.brand ?? ""}
          required={false}
        />

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
            href="/admin/produk"
            className="rounded-lg border-2 border-ink px-4 py-2 text-sm font-semibold hover:bg-muted"
          >
            Batal
          </Link>
        </div>
      </form>
    </div>
  );
}

function Field({
  label,
  name,
  required,
  defaultValue,
}: {
  label: string;
  name: string;
  required: boolean;
  defaultValue?: string;
}) {
  return (
    <div className="flex flex-col gap-1.5">
      <label htmlFor={name} className="text-sm font-medium text-foreground">
        {label}
      </label>
      <input
        id={name}
        name={name}
        type="text"
        defaultValue={defaultValue}
        required={required}
        className="rounded-lg border-2 border-ink bg-background px-3 py-2 text-sm outline-none"
      />
    </div>
  );
}
