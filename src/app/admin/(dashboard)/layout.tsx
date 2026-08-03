import type { ReactNode } from "react";
import Link from "next/link";
import { LogOut, Package, Image as ImageIcon } from "lucide-react";

import { logoutAction } from "@/features/admin/action/authAction";

export default function AdminDashboardLayout({
  children,
}: {
  children: ReactNode;
}) {
  return (
    <div className="flex min-h-screen bg-muted">
      <aside className="hidden w-56 shrink-0 flex-col border-r-2 border-ink bg-card p-4 md:flex">
        <span className="font-heading text-lg font-bold text-foreground">
          Admin Florist
        </span>

        <nav className="mt-8 flex flex-col gap-1">
          <Link
            href="/admin/produk"
            className="flex items-center gap-2 rounded-lg px-3 py-2 text-sm font-medium text-foreground hover:bg-muted"
          >
            <Package className="h-4 w-4" aria-hidden="true" /> Produk
          </Link>
          <Link
            href="/admin/galeri"
            className="flex items-center gap-2 rounded-lg px-3 py-2 text-sm font-medium text-foreground hover:bg-muted"
          >
            <ImageIcon className="h-4 w-4" aria-hidden="true" /> Galeri
          </Link>
        </nav>

        <form action={logoutAction} className="mt-auto">
          <button
            type="submit"
            className="flex w-full items-center gap-2 rounded-lg px-3 py-2 text-sm font-medium text-destructive hover:bg-destructive/10"
          >
            <LogOut className="h-4 w-4" aria-hidden="true" /> Keluar
          </button>
        </form>
      </aside>

      <main className="flex-1 p-4 md:p-8">{children}</main>
    </div>
  );
}
