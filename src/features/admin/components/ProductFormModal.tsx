"use client";

import { useActionState, useMemo, useState } from "react";
import { X } from "lucide-react";
import { LinkButton } from "@/components/ui/button";
import {
  createProductAction,
  updateProductAction,
} from "@/features/admin/action/productAction";
import {
  JASA_CATEGORIES,
  PRODUK_CATEGORIES,
} from "@/features/produk/constants/categories";
import { PRODUCT_BADGES } from "@/features/produk/types/Product.types";
import type { Product } from "@/features/produk/types/Product.types";
import { useLockBodyScroll } from "@/hooks/useLockBodyScroll";

const MAX_IMAGE_SIZE = 1 * 1024 * 1024; // 1MB

interface ProductFormModalProps {
  product?: Product;
  onClose: () => void;
}

export function ProductFormModal({ product, onClose }: ProductFormModalProps) {
  useLockBodyScroll(true);

  const action = product
    ? updateProductAction.bind(null, product.id)
    : createProductAction;
  const [state, formAction, isPending] = useActionState(action, undefined);

  const [type, setType] = useState<"produk" | "jasa">(
    product?.type === "jasa" ? "jasa" : "produk",
  );
  const [fileError, setFileError] = useState<string | null>(null);

  const categories = useMemo(
    () => (type === "jasa" ? JASA_CATEGORIES : PRODUK_CATEGORIES),
    [type],
  );

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
      <div
        data-lenis-prevent
        className="scrollbar-hide max-h-[90vh] w-full overflow-y-auto rounded-t-3xl border-2 border-ink bg-card p-6 shadow-brutalist-lg md:max-w-lg md:rounded-3xl md:p-8"
      >
        <div className="mx-auto mb-5 h-1.5 w-12 rounded-full bg-ink/20 md:hidden" />

        <div className="mb-5 flex items-center justify-between">
          <h2 className="font-heading text-xl font-bold text-foreground">
            {product ? "Edit Produk" : "Tambah Produk Baru"}
          </h2>
          <LinkButton
            variant="outline"
            onClick={onClose}
            aria-label="Tutup"
            className="flex size-9 items-center justify-center rounded-full border-2 border-ink hover:bg-muted"
          >
            <X className="h-4 w-4" aria-hidden="true" />
          </LinkButton>
        </div>

        {product?.imageUrl ? (
          // eslint-disable-next-line @next/next/no-img-element
          <img
            src={product.imageUrl}
            alt={product.name}
            className="mb-4 h-40 w-full rounded-lg border-2 border-ink object-cover"
          />
        ) : null}

        <form
          action={formAction}
          encType="multipart/form-data"
          className="flex flex-col gap-4"
        >
          <Field
            label="Nama"
            name="name"
            defaultValue={product?.name}
            required
          />

          <div className="flex flex-col gap-1.5">
            <label
              htmlFor="type"
              className="text-sm font-medium text-foreground"
            >
              Jenis <span className="text-destructive">*</span>
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
              Kategori <span className="text-destructive">*</span>
            </label>
            <select
              id="category"
              name="category"
              defaultValue={product?.category}
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
              htmlFor="badge"
              className="text-sm font-medium text-foreground"
            >
              Badge (opsional)
            </label>
            <select
              id="badge"
              name="badge"
              defaultValue={product?.badge ?? ""}
              className="rounded-lg border-2 border-ink bg-background px-3 py-2 text-sm outline-none"
            >
              <option value="">— Tidak ada —</option>
              {PRODUCT_BADGES.map((b) => (
                <option key={b} value={b}>
                  {b}
                </option>
              ))}
            </select>
          </div>

          <div className="flex flex-col gap-1.5">
            <label
              htmlFor="shortDescription"
              className="text-sm font-medium text-foreground"
            >
              Deskripsi Singkat <span className="text-destructive">*</span>
            </label>
            <textarea
              id="shortDescription"
              name="shortDescription"
              defaultValue={product?.shortDescription}
              required
              rows={3}
              className="rounded-lg border-2 border-ink bg-background px-3 py-2 text-sm outline-none"
            />
          </div>

          <Field
            label="Merek (opsional)"
            name="brand"
            defaultValue={product?.brand ?? ""}
            required={false}
          />

          <div className="flex flex-col gap-1.5">
            <label
              htmlFor="image"
              className="text-sm font-medium text-foreground"
            >
              {product ? "Ganti Gambar (opsional)" : "Gambar"}{" "}
              {!product ? <span className="text-destructive">*</span> : null}
            </label>
            <input
              id="image"
              name="image"
              type="file"
              accept="image/*"
              required={!product}
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
              className="flex-1 rounded-lg border-2 border-ink bg-primary px-4 py-2.5 text-sm font-semibold text-primary-foreground shadow-brutalist-sm active:translate-x-0 active:translate-y-0 active:shadow-none hover:-translate-x-0.5 hover:-translate-y-0.5 hover:shadow-brutalist-md disabled:opacity-60"
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
        {label} {required ? <span className="text-destructive">*</span> : null}
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
