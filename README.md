# 🌿 Sugih Florist

Website branding & katalog digital untuk **Sugih Florist** — toko tanaman hias modern. Bukan e-commerce, situs ini fokus membangun kepercayaan pelanggan lewat katalog produk, galeri, dan kemudahan konsultasi via WhatsApp.

![Next.js](https://img.shields.io/badge/Next.js-16-black?logo=next.js)
![React](https://img.shields.io/badge/React-19-61DAFB?logo=react)
![TypeScript](https://img.shields.io/badge/TypeScript-strict-3178C6?logo=typescript)
![Tailwind CSS](https://img.shields.io/badge/Tailwind-v4-06B6D4?logo=tailwindcss)
![Supabase](https://img.shields.io/badge/Supabase-Postgres%20%2B%20Auth%20%2B%20Storage-3ECF8E?logo=supabase)

## ✨ Fitur

- **Landing page** — Hero, katalog produk unggulan, galeri, kontak, integrasi Google Maps.
- **Katalog produk** — filter berdasarkan kategori (tanaman hias, bunga, sukulen, pupuk, pestisida, alat pertanian, jasa taman & dekorasi, dll), tanpa transaksi/keranjang.
- **Galeri** — dokumentasi toko, gudang, produk, aktivitas, dan pelanggan.
- **CTA WhatsApp** — setiap produk/jasa punya tombol konsultasi langsung ke WhatsApp dengan pesan otomatis.
- **Panel Admin** (`/admin`) — CRUD produk & galeri, dilindungi Supabase Auth + middleware.
- **Desain "Modern Organic Neo-Brutalism"** — border tegas, shadow offset, nuansa hijau alami, subtle micro-interactions (Framer Motion + Lenis smooth scroll).

## 🧱 Tech Stack

| Layer           | Teknologi                                                                    |
| --------------- | ---------------------------------------------------------------------------- |
| Framework       | [Next.js 16](https://nextjs.org) (App Router), React 19, TypeScript (strict) |
| Styling         | Tailwind CSS v4, shadcn/ui (`aria-nova` style), class-variance-authority     |
| Animasi         | Framer Motion (`motion`), Lenis (smooth scroll)                              |
| Data & Auth     | [Supabase](https://supabase.com) — PostgreSQL, Auth, Storage                 |
| Form & Validasi | React Hook Form _(direncanakan)_, Zod                                        |
| Icon            | Lucide React                                                                 |
| Linting         | ESLint (`eslint-config-next`)                                                |

## 📁 Struktur Proyek

````text
src/
├── app/                         # Routing & halaman (Next.js App Router)
│   ├── admin/                   # Panel admin
│   │   ├── login/              # Halaman login admin
│   │   └── (dashboard)/        # Route group untuk halaman admin
│   │       ├── produk/         # Manajemen produk
│   │       └── galeri/         # Manajemen galeri
│   └── page.tsx                # Landing page
│
├── components/                 # Komponen UI yang dapat digunakan kembali
│   ├── ui/                    # Atoms — shadcn/ui primitives
│   ├── common/                # Molecules — komponen reusable lintas fitur
│   └── sections/              # Organisms — blok besar per halaman
│
├── features/                   # Logika dan tipe berdasarkan domain/fitur
│   ├── produk/                # Tipe, kategori, dan konstanta produk
│   ├── galeri/                # Tipe dan konfigurasi galeri
│   └── admin/                 # Form, actions, dan schema panel admin
│
├── lib/                        # Utility & konfigurasi aplikasi
│   ├── api/                   # Query dan fungsi akses data terpusat
│   ├── supabase/              # Supabase client (browser/server)
│   └── siteConfig.ts          # Konfigurasi toko & WhatsApp
│
├── hooks/                      # Custom React hooks
│   └── useLockBodyScroll.ts   # Hook untuk mengunci scroll body
│
└── middleware.ts               # Proteksi & middleware route /admin

> Lihat [`AGENTS.md`](./AGENTS.md) untuk aturan teknis lengkap (naming convention, arsitektur, import order, dsb) dan [`CLAUDE.md`](./CLAUDE.md) untuk brand & design system.

## 🚀 Getting Started

### Prasyarat

- Node.js 20+
- Akun & project [Supabase](https://supabase.com)

### 1. Clone & install

```bash
git clone <repo-url>
cd florist
npm install
````

### 2. Konfigurasi environment

Buat file `.env.local` di root project:

```bash
NEXT_PUBLIC_SUPABASE_URL=https://xxxxx.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=your-anon-key
SUPABASE_SERVICE_ROLE_KEY=your-service-role-key   # hanya untuk server/seed script
```

### 3. Setup database Supabase

Buat tabel `products` dan `gallery_items` di Supabase (kolom sesuai `src/lib/api/products.ts` dan `src/lib/api/gallery.ts`), aktifkan **Row Level Security (RLS)** yang membatasi write hanya untuk role admin, dan buat 2 bucket Storage: `product-images` dan `gallery-images`.

### 4. (Opsional) Seed data contoh

```bash
npm run seed
```

### 5. Jalankan dev server

```bash
npm run dev
```

Buka [http://localhost:3000](http://localhost:3000). Panel admin tersedia di [http://localhost:3000/admin/login](http://localhost:3000/admin/login).

## 📜 Scripts

| Command         | Keterangan                                  |
| --------------- | ------------------------------------------- |
| `npm run dev`   | Jalankan development server                 |
| `npm run build` | Build production                            |
| `npm run start` | Jalankan production server                  |
| `npm run lint`  | Jalankan ESLint                             |
| `npm run seed`  | Isi data contoh produk & galeri ke Supabase |

## 🔐 Environment Variables

| Variable                        | Wajib            | Keterangan                                                              |
| ------------------------------- | ---------------- | ----------------------------------------------------------------------- |
| `NEXT_PUBLIC_SUPABASE_URL`      | ✅               | URL project Supabase (publik)                                           |
| `NEXT_PUBLIC_SUPABASE_ANON_KEY` | ✅               | Anon key Supabase (publik)                                              |
| `SUPABASE_SERVICE_ROLE_KEY`     | ✅ (server-only) | Untuk Server Actions & script seed — **jangan pernah** expose ke client |

## 🎨 Design System

Proyek ini mengikuti tema **Modern Organic Neo-Brutalism** — border tebal 2–4px, shadow offset tegas, sudut membulat, palet hijau alami (`#2E7D32`, `#4CAF50`, `#AEEA00`), font Space Grotesk (heading), Plus Jakarta Sans (body), dan Inter (angka). Detail lengkap ada di [`CLAUDE.md`](./CLAUDE.md).

## 🤝 Kontribusi

1. Baca `CLAUDE.md` (brand & design) dan `AGENTS.md` (arsitektur & convention) sebelum mengubah kode.
2. Buat branch baru per fitur/perbaikan.
3. Pastikan `npm run lint` dan `npm run build` sukses tanpa error sebelum membuat PR.
4. Ikuti struktur folder Atomic Design (`ui` → `common` → `sections`) dan feature-based folder untuk domain baru.

## 📄 Lisensi

Proprietary — hak cipta © Sugih Florist. Tidak untuk didistribusikan ulang tanpa izin.
