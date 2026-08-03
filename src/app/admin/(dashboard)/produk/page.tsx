import Link from "next/link";
import { Pencil, Plus, Trash2 } from "lucide-react";

import { createClient } from "@/lib/supabase/server";
import { deleteProductAction } from "@/features/admin/action/productAction";

export default async function AdminProdukPage() {
  const supabase = await createClient();
  const { data: products, error } = await supabase
    .from("products")
    .select("id, name, category, slug")
    .order("created_at", { ascending: false });

  return (
    <div>
      <div className="flex items-center justify-between">
        <h1 className="font-heading text-2xl font-bold text-foreground">
          Produk
        </h1>
        <Link
          href="/admin/produk/baru"
          className="btn-lift flex items-center gap-2 rounded-lg border-2 border-ink bg-primary px-4 py-2 text-sm font-semibold text-primary-foreground shadow-brutalist-sm"
        >
          <Plus className="h-4 w-4" aria-hidden="true" /> Tambah Produk
        </Link>
      </div>

      {error ? (
        <p className="mt-6 text-sm text-destructive">
          Gagal memuat produk: {error.message}
        </p>
      ) : null}

      <div className="mt-6 overflow-hidden rounded-2xl border-2 border-ink bg-card shadow-brutalist-sm">
        <table className="w-full text-left text-sm">
          <thead className="border-b-2 border-ink bg-muted">
            <tr>
              <th className="px-4 py-3 font-semibold">Nama</th>
              <th className="px-4 py-3 font-semibold">Kategori</th>
              <th className="px-4 py-3 font-semibold">Slug</th>
              <th className="px-4 py-3 font-semibold text-right">Aksi</th>
            </tr>
          </thead>
          <tbody>
            {products?.map((product) => (
              <tr
                key={product.id}
                className="border-b border-ink/10 last:border-0"
              >
                <td className="px-4 py-3 font-medium">{product.name}</td>
                <td className="px-4 py-3">{product.category}</td>
                <td className="px-4 py-3 text-muted-foreground">
                  {product.slug}
                </td>
                <td className="px-4 py-3">
                  <div className="flex justify-end gap-2">
                    <Link
                      href={`/admin/produk/${product.id}/edit`}
                      aria-label={`Edit ${product.name}`}
                      className="flex size-8 items-center justify-center rounded-lg border-2 border-ink hover:bg-muted"
                    >
                      <Pencil className="h-3.5 w-3.5" aria-hidden="true" />
                    </Link>
                    <form action={deleteProductAction.bind(null, product.id)}>
                      <button
                        type="submit"
                        aria-label={`Hapus ${product.name}`}
                        className="flex size-8 items-center justify-center rounded-lg border-2 border-ink text-destructive hover:bg-destructive/10"
                      >
                        <Trash2 className="h-3.5 w-3.5" aria-hidden="true" />
                      </button>
                    </form>
                  </div>
                </td>
              </tr>
            ))}
            {products?.length === 0 ? (
              <tr>
                <td
                  colSpan={4}
                  className="px-4 py-8 text-center text-muted-foreground"
                >
                  Belum ada produk.
                </td>
              </tr>
            ) : null}
          </tbody>
        </table>
      </div>
    </div>
  );
}
