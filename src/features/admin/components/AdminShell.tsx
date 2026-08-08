"use client";

import type { ReactNode } from "react";
import { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import {
  LogOut,
  Menu,
  Package,
  Image as ImageIcon,
  X,
  ArrowLeft,
} from "lucide-react";

import { logoutAction } from "@/features/admin/action/authAction";
import { cn } from "@/lib/utils";

const NAV_ITEMS = [
  { label: "Produk", href: "/admin/produk", icon: Package },
  { label: "Galeri", href: "/admin/galeri", icon: ImageIcon },
];

export function AdminShell({ children }: { children: ReactNode }) {
  const pathname = usePathname();
  const [sidebarOpen, setSidebarOpen] = useState(false);

  return (
    <div className="flex min-h-screen flex-col bg-background md:flex-row">
      {/* Mobile top bar */}
      <header className="sticky top-0 z-40 flex items-center justify-between border-b-2 border-ink bg-primary px-4 py-3 md:hidden">
        <Image
          src="/logo-sugih.webp"
          alt="Sugih Florist"
          width={120}
          height={48}
          priority
          className="h-9 w-auto object-contain"
        />
        <span className="font-heading text-base font-semibold uppercase tracking-widest text-background">
          Panel Admin
        </span>
        <button
          type="button"
          onClick={() => setSidebarOpen(true)}
          aria-label="Buka menu"
          className="flex size-11 items-center justify-center rounded-xl border-2 border-primary-foreground/20 bg-primary-foreground/10 text-primary-foreground"
        >
          <Menu className="h-5 w-5" aria-hidden="true" />
        </button>
      </header>

      {/* Mobile drawer (kanan) */}
      {sidebarOpen ? (
        <>
          <div
            className="fixed inset-0 z-40 bg-black/50 backdrop-blur-sm md:hidden"
            onClick={() => setSidebarOpen(false)}
            aria-hidden="true"
          />
          <div className="fixed inset-y-0 right-0 z-50 flex w-64 flex-col gap-4 border-l-2 border-ink bg-primary px-4 py-6 md:hidden">
            <div className="mb-2 flex items-center justify-between">
              <span className="font-heading text-base    font-bold uppercase tracking-widest text-background">
                Menu
              </span>
              <button
                type="button"
                onClick={() => setSidebarOpen(false)}
                aria-label="Tutup menu"
                className="flex size-9 items-center justify-center rounded-xl border-2 border-primary-foreground/20 bg-primary-foreground/10 text-primary-foreground"
              >
                <X className="h-4 w-4" aria-hidden="true" />
              </button>
            </div>

            <nav className="flex flex-col gap-3" aria-label="Admin navigasi">
              {NAV_ITEMS.map((item) => {
                const active = pathname.startsWith(item.href);
                const Icon = item.icon;
                return (
                  <Link
                    key={item.href}
                    href={item.href}
                    onClick={() => setSidebarOpen(false)}
                    className={cn(
                      "flex items-center gap-3 rounded-xl px-4 py-3.5 font-heading text-sm font-bold transition-colors",
                      active
                        ? "border-2 border-ink bg-accent text-ink shadow-brutalist-sm"
                        : "border-2 border-transparent text-background hover:bg-primary-foreground/20",
                    )}
                  >
                    <Icon className="h-4 w-4" aria-hidden="true" />
                    {item.label}
                  </Link>
                );
              })}
            </nav>

            <div className="mt-auto flex flex-col gap-2">
              <Link
                href="/"
                onClick={() => setSidebarOpen(false)}
                className="flex items-center gap-2 rounded-xl border border-2 border-card px-4 py-3 font-heading text-sm font-semibold text-background hover:bg-primary-foreground/20"
              >
                <ArrowLeft className="h-4 w-4" aria-hidden="true" /> Website
                Publik
              </Link>
              <form action={logoutAction}>
                <button
                  type="submit"
                  className="flex w-full items-center gap-2 rounded-xl bg-destructive border border-2 border-destructive px-4 py-3 font-heading text-sm font-semibold text-background hover:bg-destructive/90"
                >
                  <LogOut className="h-4 w-4" aria-hidden="true" /> Keluar
                </button>
              </form>
            </div>
          </div>
        </>
      ) : null}

      {/* Desktop sidebar */}
      <aside className="sticky top-0 hidden h-screen w-60 shrink-0 flex-col gap-6 overflow-y-auto border-r-2 border-ink bg-primary px-4 py-7 md:flex">
        <div>
          <div className="flex justify-center items-center">
            <Image
              src="/logo-sugih.webp"
              alt="Sugih Florist"
              width={150}
              height={150}
              className="h-12 w-auto object-contain"
            />
          </div>
          <p className="flex justify-center items-center mt-3 font-heading text-base font-bold uppercase tracking-widest text-background">
            Panel Admin
          </p>
        </div>

        <nav className="flex flex-col gap-3" aria-label="Admin navigasi">
          {NAV_ITEMS.map((item) => {
            const active = pathname.startsWith(item.href);
            const Icon = item.icon;
            return (
              <Link
                key={item.href}
                href={item.href}
                className={cn(
                  "flex items-center gap-3 rounded-xl px-4 py-3.5 font-heading text-sm font-bold transition-all",
                  active
                    ? "border-2 border-ink bg-accent text-ink shadow-brutalist-sm"
                    : "border-2 border-transparent text-background hover:bg-primary-foreground/20",
                )}
              >
                <Icon className="h-4 w-4" aria-hidden="true" />
                {item.label}
              </Link>
            );
          })}
        </nav>

        <div className="mt-auto flex flex-col gap-2">
          <Link
            href="/"
            className="flex items-center gap-2 rounded-xl border border-2 border-card px-4 py-3 font-heading text-sm font-semibold text-background hover:bg-primary-foreground/20"
          >
            <ArrowLeft className="h-4 w-4" aria-hidden="true" /> Website Publik
          </Link>
          <form action={logoutAction}>
            <button
              type="submit"
              className="flex w-full items-center gap-2 rounded-xl bg-destructive border border-2 border-destructive px-4 py-3 font-heading text-sm font-semibold text-background hover:bg-destructive/90"
            >
              <LogOut className="h-4 w-4" aria-hidden="true" /> Logout
            </button>
          </form>
        </div>
      </aside>

      {/* Main content */}
      <main className="flex-1 overflow-y-auto p-4 pb-24 md:p-8 md:pb-8">
        {children}
      </main>

      {/* Mobile bottom nav */}
      <nav
        className="fixed inset-x-0 bottom-0 z-40 flex h-16 items-center border-t-2 border-ink bg-primary md:hidden"
        aria-label="Bottom navigation"
      >
        {NAV_ITEMS.map((item) => {
          const active = pathname.startsWith(item.href);
          const Icon = item.icon;
          return (
            <Link
              key={item.href}
              href={item.href}
              aria-current={active ? "page" : undefined}
              className={cn(
                "flex h-full flex-1 flex-col items-center justify-center gap-1 border-t-2 font-heading text-xs font-bold uppercase tracking-wide transition-colors",
                active
                  ? "border-accent text-accent"
                  : "border-transparent text-background",
              )}
            >
              <Icon className="h-5 w-5" aria-hidden="true" />
              {item.label}
            </Link>
          );
        })}
      </nav>
    </div>
  );
}
