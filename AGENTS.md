# Project Rules

Baca **CLAUDE.md** terlebih dahulu untuk brand, design system, color
palette, typography, dan struktur halaman. Dokumen ini (`AGENTS.md`) berisi
aturan teknis & operasional untuk menulis kode.

## Tech Stack

- Next.js 16 (App Router)
- React 19
- TypeScript (strict mode)
- Tailwind CSS
- shadcn/ui
- Framer Motion + GSAP
- Laravel 12 REST API (backend, terpisah repo)

## Coding Rules

- Selalu gunakan App Router. Jangan pernah gunakan Pages Router.
- Utamakan Server Components. Gunakan Client Component (`"use client"`)
  hanya jika benar-benar butuh interaktivitas/browser API/hooks state.
- Jangan pernah gunakan `any`. Gunakan `unknown` + narrowing bila tipe belum
  pasti.
- TypeScript strict mode wajib aktif (`tsconfig.json` sudah `"strict": true`
  — jangan diubah).
- Gunakan async Server Component untuk data fetching, bukan `useEffect`.
- Gunakan Zod untuk validasi semua data eksternal (form input, response API).
- Gunakan React Hook Form untuk semua form.
- Gunakan TanStack Query hanya untuk client-side data fetching (mis. data
  yang butuh refetch/polling di Client Component).
- Komponen harus reusable — cek dulu apakah sudah ada sebelum membuat baru.
- Ikuti prinsip Atomic Design (lihat Component Hierarchy).

## Architecture Rules

- **Tidak ada akses database langsung** dari Next.js. Semua data lewat
  Laravel REST API.
- Semua pemanggilan API terpusat di `lib/api/` — dilarang `fetch()`
  langsung di dalam komponen.
- Bentuk layer: `component → hook/query → lib/api → Laravel API`.
- Server Component memanggil `lib/api` langsung (server-side fetch, bisa
  pakai `fetch` native dengan `next: { revalidate }`).
- Client Component memanggil `lib/api` lewat TanStack Query hook di
  `hooks/` atau `features/*/hooks/`.
- Environment variables (base URL API, key publik) hanya diakses lewat
  `lib/env.ts` yang divalidasi dengan Zod saat startup — jangan
  `process.env.X` tersebar di banyak file.
- Tidak boleh ada logic bisnis di dalam komponen UI (`components/ui`) —
  logic bisnis tinggal di `features/*` atau `lib/`.
- Error handling: gunakan `error.tsx` / `not-found.tsx` per-route di App
  Router, bukan try/catch manual yang render conditional di tiap komponen.

## File & Folder Naming Convention

| Jenis                          | Konvensi                                                | Contoh                     |
| ------------------------------ | ------------------------------------------------------- | -------------------------- |
| Folder route (App Router)      | kebab-case                                              | `app/produk/[slug]/`       |
| Komponen React (file & export) | PascalCase                                              | `ProductCard.tsx`          |
| Hook custom                    | camelCase, prefix `use`                                 | `useProductFilter.ts`      |
| Util / helper function         | camelCase                                               | `formatCurrency.ts`        |
| Tipe / interface               | PascalCase, file `*.types.ts`                           | `Product.types.ts`         |
| Zod schema                     | camelCase, suffix `Schema`                              | `productSchema.ts`         |
| Constant                       | UPPER_SNAKE_CASE untuk value, camelCase untuk nama file | `siteConfig.ts`            |
| Folder komponen non-route      | kebab-case                                              | `components/product-card/` |
| Test file                      | sama nama + `.test.ts(x)`                               | `ProductCard.test.tsx`     |
| CSS/asset khusus               | kebab-case                                              | `hero-bg.webp`             |

Aturan tambahan:

- Satu komponen = satu file. Sub-komponen kecil boleh co-located di folder
  yang sama (`ProductCard/ProductCard.tsx`, `ProductCard/index.ts`).
- Barrel file (`index.ts`) hanya untuk re-export publik, tidak untuk logic.
- Nama file harus sama persis dengan nama komponen/fungsi utama di
  dalamnya.

## Component Hierarchy (Atomic Design)

components/
├── ui/ # Atoms — shadcn/ui primitives & atom murni (Button, Badge, Input)
├── common/ # Molecules — gabungan 2+ atoms yang reusable lintas fitur
│ (SearchBar, ProductPrice, CTAButtonGroup)
└── sections/ # Organisms — blok besar spesifik halaman
(Hero, FeaturedProducts, Testimonial, FAQSection)

- **Atoms** (`ui/`): tidak boleh punya business logic atau fetch data.
- **Molecules** (`common/`): boleh terima props kompleks, tetap tanpa fetch
  data langsung (data dikirim dari parent/Server Component).
- **Organisms** (`sections/`): boleh jadi Server Component async yang
  fetch data via `lib/api`, lalu compose molecules & atoms.
- **Templates/Pages**: berada di `app/**/page.tsx`, hanya compose
  `sections/`, tidak berisi markup mentah.
- Dilarang membuat komponen sekali-pakai langsung di `page.tsx` yang
  melebihi ~30 baris JSX — ekstrak ke `sections/`.

## Feature Structure

Untuk domain yang punya logic/state/API spesifik (produk, artikel, dll),
gunakan folder feature-based:

features/
└── produk/
├── components/ # komponen spesifik fitur ini (tidak reusable lintas fitur)
├── hooks/ # useProductList, useProductFilter, dst
├── api/ # getProducts, getProductBySlug (pemanggil lib/api)
├── types/ # Product.types.ts
├── schema/ # productSchema.ts (Zod)
└── utils/ # helper spesifik fitur ini

- Komponen di `features/*/components` **tidak** boleh diimpor lintas
  fitur. Jika perlu dipakai fitur lain, naikkan ke `components/common/`.
- `app/produk/**` hanya berisi `page.tsx`, `layout.tsx`, `loading.tsx`,
  `error.tsx` yang mengimpor dari `features/produk`.

## Import Order

Urutkan import dalam tiap file (dipisah baris kosong per grup):

1. React / Next.js core (`react`, `next/*`)
2. Library eksternal (`framer-motion`, `zod`, `react-hook-form`, dst)
3. Alias internal `@/lib`, `@/hooks`, `@/features`
4. Alias internal `@/components`
5. Tipe (`import type { ... }`) — taruh terpisah di grup terakhir jika
   memungkinkan, atau gunakan `import type` inline
6. Asset/style (`./x.css`, gambar)

```ts
import { useState } from "react";
import Image from "next/image";

import { motion } from "framer-motion";
import { z } from "zod";

import { getProducts } from "@/lib/api/products";
import { useProductFilter } from "@/features/produk/hooks/useProductFilter";

import { ProductCard } from "@/components/common/ProductCard";
import { Button } from "@/components/ui/button";

import type { Product } from "@/features/produk/types/Product.types";
```

ESLint (`eslint-plugin-import` sudah ada di `eslint-config-next`) sebaiknya
dikonfigurasi untuk menegakkan urutan ini (`import/order`) — tambahkan rule
eksplisit di `eslint.config.mjs` jika belum ada.

## Performance Rules

- Semua gambar wajib lewat `next/image` — dilarang `<img>` mentah.
- Semua font wajib lewat `next/font` (sudah pakai Geist — pertahankan pola
  ini untuk font tambahan seperti Space Grotesk/Sora/Plus Jakarta Sans).
- Komponen berat & non-critical (modal, carousel, chart) wajib
  `next/dynamic` dengan `ssr: false` bila tidak butuh SEO.
- Hindari `"use client"` di level tinggi (mis. `layout.tsx`) — akan
  membuat seluruh subtree jadi Client Component.
- Gunakan `loading.tsx` per-route untuk streaming/suspense boundary.
- ISR/SSG diutamakan untuk halaman katalog & artikel
  (`export const revalidate = ...`), bukan `force-dynamic` tanpa alasan.
- Bundle: jangan import seluruh library icon (`import * as Icons`), selalu
  named import per-icon.
- Target Lighthouse (lihat CLAUDE.md §16): Performance/SEO/Accessibility/
  Best Practices semua > 95. Cek sebelum PR jika mengubah halaman utama.

## Responsive Rules

- Mobile-first: tulis style default untuk mobile, tambahkan breakpoint
  `sm:` `md:` `lg:` `xl:` untuk memperbesar/mengubah layout.
- Breakpoint Tailwind default dipakai apa adanya (jangan override kecuali
  ada kebutuhan brand spesifik yang didiskusikan dulu):
  `sm 640px · md 768px · lg 1024px · xl 1280px · 2xl 1536px`
- Container max-width konsisten lintas halaman — gunakan satu wrapper
  (`components/common/Container.tsx`) yang set `max-w-*` + padding
  horizontal responsif, jangan hardcode `max-w-7xl` di tiap section.
- Grid produk/kategori: 1 kolom mobile → 2 kolom `sm/md` → 3–4 kolom
  `lg/xl`, tidak boleh horizontal scroll paksa di mobile kecuali carousel
  yang memang didesain untuk itu (Swiper).
- Sentuhan (touch target) minimal 44×44px untuk semua elemen interaktif
  di breakpoint mobile.
- Uji minimal di 3 lebar: 375px (mobile), 768px (tablet), 1440px
  (desktop) sebelum menganggap komponen selesai.

## Animation Rules

- Framer Motion untuk animasi level komponen React; GSAP hanya untuk
  scroll-timeline kompleks (parallax multi-elemen, pinned section).
- Gunakan preset yang sudah disetujui saja: Fade, Slide, Scale, Stagger,
  Hover, Scroll Reveal — jangan menambah jenis animasi baru tanpa alasan
  desain yang jelas.
- Durasi default 200–400ms untuk micro-interaction, 400–700ms untuk
  section reveal. Easing: `ease-out` untuk masuk, `ease-in` untuk keluar.
- Hormati `prefers-reduced-motion` — semua animasi non-esensial harus
  punya fallback/disable lewat `useReducedMotion()` (Framer Motion) atau
  media query.
- Jangan animasikan `width`/`height`/`top`/`left` (layout thrashing).
  Animasikan `transform` dan `opacity` saja.
- Scroll-triggered animation harus pakai `viewport={{ once: true }}`
  (Framer Motion) supaya tidak replay tiap scroll naik-turun, kecuali ada
  alasan desain eksplisit.
- Animasi tidak boleh menunda interaktivitas — elemen harus tetap bisa
  diklik/fokus sebelum animasi selesai.

## Image Rules

- Semua gambar produk/galeri disajikan dalam WebP/AVIF via `next/image`
  dengan `sizes` yang benar (bukan default `100vw` untuk gambar kecil).
- Wajib isi `alt` deskriptif (bukan nama file) untuk semua gambar — lihat
  §16 Accessibility di CLAUDE.md.
- Hero image & gambar above-the-fold: gunakan `priority`. Gambar lain:
  lazy-load default (jangan set `priority` sembarangan).
- Logo & ikon vektor sederhana pakai SVG inline/komponen, bukan `<Image>`.
- Placeholder: gunakan `placeholder="blur"` dengan `blurDataURL` untuk
  gambar produk/galeri agar tidak ada layout shift.
- Rasio aspek gambar wajib didefinisikan (`width`/`height` atau
  `aspect-*` class) — no CLS (Cumulative Layout Shift).

## Definition of Done

Sebuah task/PR dianggap **selesai** hanya jika semua berikut terpenuhi:

- [ ] Sesuai dengan CLAUDE.md (brand, warna, tipografi, tone Neo-Brutalism
      subtle) dan AGENTS.md (arsitektur, naming, struktur folder).
- [ ] Tidak ada `any`, `// @ts-ignore` tanpa alasan tertulis.
- [ ] `npm run lint` bersih (0 error, warning dijustifikasi jika ada).
- [ ] `npm run build` sukses tanpa error/warning baru.
- [ ] Responsive teruji di mobile/tablet/desktop (lihat Responsive Rules).
- [ ] Semua interaksi bisa diakses via keyboard, ada `aria-label`/`alt`
      sesuai §16 CLAUDE.md.
- [ ] Tidak ada `fetch()` langsung di komponen — semua lewat `lib/api/`.
- [ ] Tidak menambah dependency baru tanpa alasan yang dicatat di PR
      description.
- [ ] Tidak ada komponen/file yang menduplikasi komponen yang sudah ada.
- [ ] Tidak menyentuh file yang tidak relevan dengan task (lihat Git §
      di bawah).
- [ ] Animasi menghormati `prefers-reduced-motion` bila relevan.
- [ ] Commit message jelas & scoped ke satu perubahan logis.

## Git

- Commit kecil dan fokus, satu perubahan logis per commit.
- Jangan mengubah file yang tidak relevan dengan task.
- Jangan menghapus komentar kecuali diminta secara eksplisit.

## Before Writing Code

Baca urutan berikut sebelum menulis/mengubah kode apa pun:

1. `CLAUDE.md` — brand, design system, struktur halaman.
2. `AGENTS.md` (dokumen ini) — aturan teknis, naming, arsitektur.
3. Struktur proyek & komponen yang sudah ada (`components/`, `features/`,
   `lib/api/`) — jangan duplikasi.
4. Ikuti arsitektur & pola yang sudah ada, jangan perkenalkan pola baru
   tanpa didiskusikan (mis. state management baru, library UI baru).

Jika instruksi user bertentangan dengan dokumen ini, tanyakan klarifikasi
sebelum melanjutkan — kecuali perubahan kecil yang jelas tidak melanggar
prinsip inti.
