"use client";

import { useActionState, useMemo, useState } from "react";
import Link from "next/link";

import { createProductAction } from "@/features/admin/action/productAction";

const PRODUK_CATEGORIES = [
  { value: "pupuk", label: "Pupuk" },
  { value: "pestisida", label: "Pestisida" },
  { value: "bibit", label: "Bibit" },
  { value: "benih", label: "Benih" },
  { value: "alat-pertanian", label: "Alat Pertanian" },
  { value: "media-tanam", label: "Media Tanam" },
  { value: "pakan", label: "Pakan" },
  { value: "tanaman-hias", label: "Tanaman Hias" },
  { value: "tanaman-buah", label: "Tanaman Buah" },
  { value: "pot-tanaman", label: "Pot Tanaman" },
  { value: "hidroponik", label: "Hidroponik" },
  { value: "lainnya", label: "Lainnya" },
];

const JASA_CATEGORIES = [
  { value: "jasa-taman", label: "Jasa Taman & Menanam" },
  { value: "jasa-dekorasi", label: "Jasa Dekorasi (Pernikahan/Panggung)" },
];

export default function NewProductPage() {
  const [state, formAction, isPending] = useActionState(
    createProductAction,
    undefined,
  );
  const [type, setType] = useState<"produk" | "jasa">("produk");

  const categories = useMemo(
    () => (type === "jasa" ? JASA_CATEGORIES : PRODUK_CATEGORIES),
    [type],
  );

  return (
    <div className="mx-auto max-w-xl">
      <h1 className="font-heading text-2xl font-bold text-foreground">
        Tambah Produk / Jasa
      </h1>

      <form
        action={formAction}
        encType="multipart/form-data"
        className="mt-6 flex flex-col gap-4 rounded-2xl border-2 border-ink bg-card p-6 shadow-brutalist-sm"
      >
        <Field label="Nama" name="name" required />

        <div className="flex flex-col gap-1.5">
          <label htmlFor="type" className="text-sm font-medium text-foreground">
            Jenis
          </label>
          <select
            id="type"
            name="type"
            value={type}
            onChange={(e) => setType(e.target.value as "produk" | "jasa")}
            required
            className="rounded-lg border-2 border-ink bg-background px-3 py-2 text-sm outline-none"
          >
            <option value="produk">Produk</option>
            <option value="jasa">Jasa</option>
          </select>
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
            required
            className="rounded-lg border-2 border-ink bg-background px-3 py-2 text-sm outline-none"
          >
            {categories.map((c) => (
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
            required
            rows={3}
            className="rounded-lg border-2 border-ink bg-background px-3 py-2 text-sm outline-none"
          />
        </div>

        <Field label="Merek (opsional)" name="brand" required={false} />

        <div className="flex flex-col gap-1.5">
          <label
            htmlFor="image"
            className="text-sm font-medium text-foreground"
          >
            Gambar
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
            {isPending ? "Menyimpan..." : "Simpan"}
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
  placeholder,
}: {
  label: string;
  name: string;
  required: boolean;
  placeholder?: string;
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
        required={required}
        placeholder={placeholder}
        className="rounded-lg border-2 border-ink bg-background px-3 py-2 text-sm outline-none"
      />
    </div>
  );
}
