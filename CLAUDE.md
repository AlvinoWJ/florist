# CLAUDE.md — Project Guide

## Website Branding Toko Pertanian Modern

> Dokumen ini adalah pedoman utama pengembangan project. Wajib dibaca dan
> diikuti oleh AI assistant (Claude) maupun developer manusia sebelum
> menulis, mengubah, atau meninjau kode apa pun di repository ini.
>
> Untuk aturan teknis (naming file, arsitektur, import order, Definition
> of Done, dsb), lihat **AGENTS.md** — dokumen ini fokus pada brand &
> design system.

---

## 1. Project Overview

### 1.1 Nama Project

**Florist** — Website Branding Toko Pertanian Modern
_(nama placeholder, sesuaikan dengan nama toko sebenarnya)_

### 1.2 Visi Website

Menjadi wajah digital toko pertanian yang mencerminkan profesionalisme, kepercayaan, dan kedekatan dengan dunia pertanian modern — menjembatani petani tradisional dengan pengalaman digital setara brand startup kelas dunia.

### 1.3 Misi Website

- Memperkenalkan toko dan seluruh lini produk secara profesional dan mudah diakses.
- Membangun kepercayaan pelanggan melalui presentasi visual yang premium namun tetap ramah.
- Menjadi media edukasi pertanian melalui konten artikel dan informasi produk.
- Memudahkan calon pelanggan menghubungi toko tanpa friksi (WhatsApp, kontak langsung).
- Memperkuat citra toko sebagai mitra petani, bukan sekadar penjual.

### 1.4 Tujuan Pengembangan

- Website **bukan e-commerce** — tidak ada transaksi online.
- Fokus pada **branding, katalog digital, dan kepercayaan**.
- Menghadirkan pengalaman pengguna setara landing page pemenang penghargaan desain.
- Performa cepat, SEO kuat, dan mudah dikembangkan di masa depan (roadmap CMS, dsb).

### 1.5 Target Pengguna

| Segmen                        | Kebutuhan                                        |
| ----------------------------- | ------------------------------------------------ |
| Petani / pekebun              | Info produk jelas, cara pakai, kontak mudah (WA) |
| Pemilik usaha tani/agribisnis | Kepercayaan, kredibilitas, katalog lengkap       |
| Pelanggan umum/retail         | Navigasi mudah, visual menarik, kontak cepat     |
| Mitra/distributor potensial   | Profil perusahaan, portofolio, kontak formal     |

### 1.6 Nilai yang Ingin Dibangun

- **Terpercaya** — informasi jujur, transparan, terverifikasi.
- **Berpengalaman** — storytelling sejarah dan perjalanan toko.
- **Ramah** — bahasa dan visual yang hangat, tidak intimidatif.
- **Modern** — teknologi dan desain terkini.
- **Berkelanjutan** — nuansa alami, mendukung pertanian sehat.

### 1.7 Branding yang Ingin Ditampilkan

Modern • Premium • Bersih • Profesional • Ramah Petani • Mudah digunakan • Cepat • Interaktif • Responsif

---

## 2. Project Scope

### 2.1 Yang Termasuk Scope

- Branding perusahaan
- Memperkenalkan produk (katalog digital, bukan toko online)
- Menampilkan informasi toko (lokasi, jam operasional, kontak)
- Meningkatkan kepercayaan pelanggan (testimoni, galeri, cerita)
- Memudahkan pelanggan menghubungi toko (WhatsApp, form, sosial media)

### 2.2 Yang TIDAK Termasuk Scope

❌ Checkout
❌ Shopping Cart
❌ Payment Gateway
❌ Pemesanan online
❌ Manajemen stok
❌ Dashboard admin kompleks
❌ Sistem ERP / CRUD kompleks

> **Catatan untuk AI/Developer:** Jika ada permintaan fitur yang mengarah ke transaksi, cart, atau checkout, tolak dengan sopan dan arahkan kembali ke prinsip "website branding, bukan e-commerce" — kecuali telah eksplisit dipindahkan ke _Future Roadmap_ dan disetujui.

---

## 3. Technology Stack

### Frontend

- Next.js 16 (App Router)
- React 19
- TypeScript
- Tailwind CSS
- shadcn/ui
- Framer Motion
- GSAP
- Lenis (smooth scroll)
- React Icons + Lucide Icons
- Swiper.js

### Backend

- Laravel 12 (REST API)

### Database

- MySQL

### Deployment

- Vercel (frontend)
- VPS Ubuntu (backend/API)

---

## 4. Design Philosophy

Desain mengedepankan: **Minimalis, Modern, Elegan, Natural, Fresh, Clean, Premium, Professional.**

**Inspirasi desain:** Apple, Awwwards, Stripe, Vercel, Linear, Framer, Shopify — dipadukan dengan nuansa pertanian modern.

---

## 5. Design Theme — "Modern Organic Neo-Brutalism"

Perpaduan karakter Neo-Brutalism dengan nuansa pertanian modern, menghasilkan identitas visual yang unik, ramah, profesional, dan mudah diingat — berbeda dari website toko pertanian pada umumnya.

**Konsep visual:** Modern, Fresh, Playful, Professional, Clean, Organic, Bold, Interactive, Premium, Memorable.

**Prinsip penting:** Neo-Brutalism digunakan **subtle**, bukan ekstrem. Hindari tampilan ramai, terlalu gelap, atau terlalu banyak outline hitam. Harus tetap nyaman untuk semua kalangan.

### 5.1 Neo-Brutalism Guidelines

- Border tebal (2–4px) **hanya** pada card penting & tombol utama.
- Shadow tegas dengan offset sederhana (bukan blur berlebihan).
- Sudut membulat (`rounded-xl` s/d `rounded-3xl`) agar tetap ramah.
- Warna solid dipadukan warna alami pertanian.
- Ilustrasi sederhana, bentuk geometris.
- Typography besar, tegas, mudah dibaca.
- Layout asimetris tapi terstruktur.
- White space luas.
- Hover interaction menyenangkan.
- Micro animation pada hampir seluruh komponen (halus, tidak berlebihan).

### 5.2 Agriculture Theme

**Inspirasi visual:** sawah, daun, tanaman, tanah, bibit, pupuk, matahari, air, hasil panen.

**Elemen visual:** organic shape, leaf pattern, grain texture, blob background, nature illustration, farming icon, plant pattern, abstract landscape, seed pattern.

⚠️ Hindari ikon/ilustrasi yang terlalu kartun.

---

## 6. Color Palette

| Role           | Nama           | Hex       |
| -------------- | -------------- | --------- |
| Primary        | Forest Green   | `#2E7D32` |
| Secondary      | Fresh Green    | `#4CAF50` |
| Accent         | Lime           | `#AEEA00` |
| Earth          | Soil Brown     | `#795548` |
| Highlight      | Harvest Yellow | `#FBC02D` |
| Background     | Warm Cream     | `#FFFDF6` |
| Surface        | White          | `#FFFFFF` |
| Text Primary   | —              | `#1E1E1E` |
| Text Secondary | —              | `#555555` |
| Success        | —              | `#43A047` |
| Warning        | —              | `#F9A825` |
| Danger         | —              | `#D32F2F` |
| Border         | —              | `#222222` |

> Gunakan sebagai Tailwind CSS custom theme tokens / CSS variables — jangan hardcode hex di komponen.

---

## 7. Typography

| Fungsi  | Font                 |
| ------- | -------------------- |
| Heading | Space Grotesk / Sora |
| Body    | Plus Jakarta Sans    |
| Angka   | Inter                |

---

## 8. UI Components (Gaya Modern Organic Neo-Brutalism)

- **Hero** — ilustrasi pertanian modern + CTA mencolok.
- **Product Card** — border tebal, shadow offset, hover efek responsif.
- **Category Card** — warna cerah, ikon sederhana.
- **Testimonial Card** — playful namun profesional.
- **FAQ** — accordion dengan animasi halus.
- **Tombol Utama** — hijau, efek "terangkat" saat hover.
- **Badge Kategori** — warna solid, tipografi tegas.
- **Floating WhatsApp** — animasi lembut.
- **Navbar** — sticky, transisi halus saat scroll.

---

## 9. Motion Design

Gunakan **Framer Motion** (React component-level) dan **GSAP** (scroll & timeline kompleks).

Animasi yang disarankan: Smooth Page Transition, Scroll Reveal, Fade Up/Left/Right, Text Reveal, Image Reveal, Hover Lift, Card Bounce (ringan), Button Press Effect, Magnetic Button, Counter Animation, Infinite Marquee, Floating Background Shape, Scroll Progress Indicator, Mouse Parallax, Stagger Animation, Cursor Glow (opsional), Animated Gradient Background (halus), Card Tilt, Button Ripple, Section Transition.

**Prinsip:** durasi nyaman, tidak mengganggu UX, elegan tidak berlebihan.

---

## 10. Overall Impression

Saat pertama membuka website, pengguna harus merasakan:
Modern namun dekat dengan pertanian • Profesional & terpercaya • Identitas visual kuat • Berbeda dari toko pertanian biasa • Menarik dijelajahi • Responsif & cepat • Setara pengalaman startup modern / landing page pemenang desain.

---

## 11. Visual Identity Guidelines

| Aspek                          | Ketentuan                                                          |
| ------------------------------ | ------------------------------------------------------------------ |
| Primary/Secondary/Accent Color | Lihat §6                                                           |
| Typography                     | Lihat §7                                                           |
| Spacing                        | Skala konsisten (4/8px base scale, gunakan Tailwind spacing scale) |
| Grid System                    | 12-column responsive grid, container max-width konsisten           |
| Border Radius                  | `rounded-xl` – `rounded-3xl`                                       |
| Shadow                         | Offset shadow tegas, bukan blur berlebihan                         |
| Animation                      | Lihat §9                                                           |
| Icon Style                     | Lucide Icons + React Icons, line-style sederhana                   |
| Illustration Style             | Geometris, organik, tidak kartun                                   |
| Photography Style              | Natural, terang, high-quality, konteks pertanian nyata             |

---

## 12. UX Principles

- **Visual Hierarchy** — heading besar & tegas, CTA menonjol.
- **Accessibility** — WCAG-compliant (lihat §16).
- **Responsive Design** — mobile-first, breakpoint konsisten.
- **Consistency** — reusable component, design token tunggal.
- **White Space** — luas, tidak sesak.
- **Readability** — kontras cukup, ukuran font nyaman baca.
- **Motion Design** — mendukung, bukan mengganggu.
- **Progressive Disclosure** — info detail muncul bertahap (accordion, expand).
- **Empty State** — desain khusus, ramah, informatif.
- **Loading State** — skeleton/animasi halus, bukan spinner polos.
- **Hover & Micro Interaction** — halus, memberi feedback jelas.

---

## 13. Website Structure

### 13.1 Landing Page

Hero Section (dengan animated background) → Brand Tagline → Quick Product Preview → Statistics → Partner Logo → Featured Products → Customer Trust → Gallery → Testimonial → FAQ → Location → Footer.

### 13.2 Tentang Kami

Sejarah Toko, Visi, Misi, Nilai Perusahaan, Tim, Perjalanan Bisnis.

### 13.3 Produk (Katalog, bukan toko)

**Kategori:** Pupuk, Pestisida, Bibit, Benih, Alat Pertanian, Media Tanam, Pakan, Lainnya.

**Setiap produk memiliki:** foto berkualitas tinggi, nama, kategori, deskripsi, keunggulan, cara penggunaan, manfaat, spesifikasi, merek, galeri, produk terkait.

**Tidak ada tombol beli.** Hanya: _Hubungi Kami_, _Konsultasi via WhatsApp_, _Lihat Produk Lain_.

### 13.4 Detail Produk

Layout premium (seperti landing page): Hero Image, Image Gallery, Sticky Navigation, Benefit Card, Accordion, FAQ, Related Products, CTA WhatsApp.

### 13.5 Artikel (Edukasi)

Tips Bertani, Cara Pemupukan, Pengendalian Hama, Musim Tanam, Teknologi Pertanian.

### 13.6 Galeri

Foto toko, gudang, produk, aktivitas, dokumentasi pelanggan.

### 13.7 Testimoni

Card modern: foto pelanggan, rating, review.

### 13.8 Kontak

Google Maps, alamat, jam operasional, WhatsApp, Instagram, Facebook, Email, form Hubungi Kami.

---

## 14. Component Library (Reusable)

Navbar, Footer, Hero, Section Header, Animated Card, Product Card, Category Card, Gallery Card, Article Card, Feature Card, Timeline, Accordion, Testimonial, FAQ, CTA Banner, Floating WhatsApp, Breadcrumb, Badge, Button, Modal, Image Viewer, Carousel.

> Semua komponen dibangun dengan pendekatan **Atomic Design** (atoms → molecules → organisms) dan disimpan di folder `components/` sesuai struktur di §17.

---

## 15. Branding & SEO Strategy

### 15.1 Branding Strategy

Website harus membangun persepsi: Terpercaya, Berpengalaman, Produk Berkualitas, Harga Kompetitif, Pelayanan Ramah, Konsultasi Gratis, Mitra Petani.

### 15.2 SEO Strategy

- Metadata dinamis per halaman
- Open Graph tags
- Schema.org + JSON-LD (Organization, Product, Article, FAQ)
- Canonical URL
- Dynamic Sitemap (`sitemap.xml`)
- `robots.txt`
- Image Optimization (Next.js `<Image>`, WebP/AVIF)
- Structured Data untuk produk & artikel
- Semantic HTML5

---

## 16. Performance & Accessibility

### 16.1 Target Lighthouse

| Metrik         | Target |
| -------------- | ------ |
| Performance    | > 95   |
| SEO            | > 95   |
| Accessibility  | > 95   |
| Best Practices | > 95   |

**Teknik:** Lazy Loading, Image Optimization, Dynamic Import, Code Splitting, Caching (ISR/SSG di Next.js).

### 16.2 Accessibility (WCAG)

Keyboard Navigation, ARIA Label, Color Contrast memadai, Alt text pada semua gambar, Focus Indicator jelas, Responsive Typography.

---

## 17. Coding Convention

**Prinsip:** SOLID, DRY, KISS, Atomic Design, Reusable Component,
Feature-based Folder Structure, Clean Architecture.

Struktur folder, naming convention, import order, Component Hierarchy,
Feature Structure, dan Architecture Rules yang detail sudah dipindah ke
**AGENTS.md** supaya satu sumber kebenaran (single source of truth) dan
tidak ada dua dokumen yang bisa saling bertentangan. Ringkasan singkat:

- `components/ui` (atoms) · `components/common` (molecules) ·
  `components/sections` (organisms) — lihat AGENTS.md § Component
  Hierarchy.
- `features/<nama-fitur>/` untuk domain (produk, artikel, dll) — lihat
  AGENTS.md § Feature Structure.
- Semua warna & spacing mengacu ke Design Tokens (§20), tidak hardcode.
- Setiap komponen visual baru wajib mengikuti guideline §5–§9
  (Neo-Brutalism subtle + Agriculture theme).
- API call ke Laravel backend melalui layer `lib/api/` terpusat.
- Setiap PR/perubahan mengikuti Definition of Done di AGENTS.md.

---

## 18. Future Roadmap

- CMS Admin (dashboard sederhana)
- Manajemen Produk
- Manajemen Artikel
- Multi Cabang
- Live Chat
- AI Chatbot Pertanian
- Katalog PDF
- QR Code Produk
- Sistem Reservasi Konsultasi
- Loyalty Program
- Marketplace Integration (opsional, di luar scope awal)
- Aplikasi Mobile

---

## 19. Catatan untuk AI Assistant (Claude)

Saat mengerjakan task di repository ini:

1. Selalu ingat: **ini website branding, bukan e-commerce.** Jangan menambahkan fitur cart/checkout/payment kecuali diminta eksplisit sebagai eksperimen di luar scope.
2. Selalu terapkan tema **Modern Organic Neo-Brutalism** secara _subtle_ — cek ulang §5 sebelum membuat komponen visual baru.
3. Gunakan palet warna & typography di §6–§7 secara konsisten, jangan menciptakan warna baru tanpa alasan kuat.
4. Prioritaskan performa (§16) — hindari animasi/asset berat yang menurunkan skor Lighthouse.
5. Ikuti struktur folder & convention di §17 saat membuat file baru.
6. Jika instruksi user bertentangan dengan dokumen ini, tanyakan klarifikasi sebelum melanjutkan, kecuali perubahan kecil yang jelas tidak melanggar prinsip inti.
7. Untuk aturan naming file, arsitektur, performance, responsive, animation, image, dan Definition of Done — rujuk **AGENTS.md**, bukan dokumen ini.

---

## 20. Typography Scale

Skala tipografi mengikuti rasio ~1.25 (major third), dipetakan ke utility
Tailwind. Gunakan token ini, jangan set `font-size` custom per komponen.

| Token     | Tailwind class         | Ukuran (rem / px)          | Line-height       | Pemakaian                        |
| --------- | ---------------------- | -------------------------- | ----------------- | -------------------------------- |
| `display` | `text-6xl md:text-7xl` | 3.75rem–4.5rem / 60–72px   | `leading-[1.05]`  | Hero headline                    |
| `h1`      | `text-4xl md:text-5xl` | 2.25rem–3rem / 36–48px     | `leading-tight`   | Judul halaman utama              |
| `h2`      | `text-3xl md:text-4xl` | 1.875rem–2.25rem / 30–36px | `leading-tight`   | Judul section                    |
| `h3`      | `text-2xl md:text-3xl` | 1.5rem–1.875rem / 24–30px  | `leading-snug`    | Sub-judul, judul card besar      |
| `h4`      | `text-xl`              | 1.25rem / 20px             | `leading-snug`    | Judul card, komponen kecil       |
| `body-lg` | `text-lg`              | 1.125rem / 18px            | `leading-relaxed` | Lead paragraph, deskripsi produk |
| `body`    | `text-base`            | 1rem / 16px                | `leading-relaxed` | Body text default                |
| `body-sm` | `text-sm`              | 0.875rem / 14px            | `leading-normal`  | Caption, meta info, label        |
| `caption` | `text-xs`              | 0.75rem / 12px             | `leading-normal`  | Badge, timestamp, footnote       |

Aturan:

- Heading (`display`–`h4`) selalu pakai font **Space Grotesk / Sora**
  (`font-heading`), body selalu **Plus Jakarta Sans** (`font-sans`), angka
  (harga, statistik, counter) selalu **Inter** (`font-mono`/`font-number`
  — daftarkan sebagai token terpisah, jangan campur dengan `font-sans`).
- Berat font: heading `font-bold` (700) atau `font-extrabold` (800) untuk
  `display`/`h1`; body default `font-normal` (400), penekanan
  `font-medium` (500).
- Maksimal 3 tingkat heading dipakai dalam satu halaman kecuali struktur
  konten memang butuh lebih (artikel panjang).

---

## 21. Spacing Rules

Base scale 4px, ikuti skala default Tailwind (`0, 0.5=2px, 1=4px, 2=8px,
3=12px, 4=16px, 6=24px, 8=32px, 12=48px, 16=64px, 24=96px, 32=128px`).
Jangan gunakan nilai arbitrary (`p-[13px]`) kecuali kasus sangat spesifik
yang didokumentasikan di komentar kode.

| Konteks                                            | Token spacing                                        |
| -------------------------------------------------- | ---------------------------------------------------- |
| Gap antar elemen dalam komponen kecil (icon+label) | `gap-2` (8px)                                        |
| Padding dalam card                                 | `p-4` mobile → `p-6 md:p-8` desktop                  |
| Gap antar card dalam grid                          | `gap-4 md:gap-6`                                     |
| Margin antar komponen dalam section                | `space-y-6 md:space-y-8`                             |
| Padding vertikal per section (halaman)             | `py-16 md:py-24 lg:py-32`                            |
| Padding horizontal container                       | `px-4 md:px-6 lg:px-8` (lihat `Container` component) |
| Gap grid statistik/fitur                           | `gap-6 md:gap-8`                                     |

Aturan:

- Section-to-section spacing selalu pakai `py-*` pada wrapper section,
  bukan `margin-top` pada elemen pertama di dalamnya.
- White space luas adalah bagian dari brand (§1.7) — jangan mengecilkan
  spacing default hanya untuk "memuat lebih banyak konten" di atas fold.

---

## 22. Design Tokens

Semua token didefinisikan sebagai CSS variable di `globals.css` lalu
dipetakan ke Tailwind theme (`@theme inline`, seperti pola `--color-*`
yang sudah ada untuk `background`/`foreground`). **Dilarang hardcode hex
atau angka px langsung di komponen** — selalu lewat token/utility class.

```css
:root {
  /* Colors — lihat §6 untuk deskripsi & role */
  --color-primary: #2e7d32;
  --color-secondary: #4caf50;
  --color-accent: #aeea00;
  --color-earth: #795548;
  --color-highlight: #fbc02d;
  --color-background: #fffdf6;
  --color-surface: #ffffff;
  --color-text-primary: #1e1e1e;
  --color-text-secondary: #555555;
  --color-success: #43a047;
  --color-warning: #f9a825;
  --color-danger: #d32f2f;
  --color-border: #222222;

  /* Radius — §5.1 */
  --radius-sm: 0.75rem; /* rounded-xl */
  --radius-md: 1rem; /* rounded-2xl */
  --radius-lg: 1.5rem; /* rounded-3xl */

  /* Shadow — offset tegas, bukan blur (§5.1) */
  --shadow-brutalist-sm: 3px 3px 0 0 var(--color-border);
  --shadow-brutalist-md: 5px 5px 0 0 var(--color-border);
  --shadow-brutalist-lg: 8px 8px 0 0 var(--color-border);

  /* Border width */
  --border-thin: 2px;
  --border-thick: 4px;

  /* Fonts — §7 */
  --font-heading: var(--font-space-grotesk);
  --font-sans: var(--font-plus-jakarta-sans);
  --font-number: var(--font-inter);
}

@theme inline {
  --color-primary: var(--color-primary);
  --color-secondary: var(--color-secondary);
  --color-accent: var(--color-accent);
  --color-earth: var(--color-earth);
  --color-highlight: var(--color-highlight);
  --color-background: var(--color-background);
  --color-surface: var(--color-surface);
  --color-text-primary: var(--color-text-primary);
  --color-text-secondary: var(--color-text-secondary);
  --color-success: var(--color-success);
  --color-warning: var(--color-warning);
  --color-danger: var(--color-danger);
  --color-border: var(--color-border);
  --font-heading: var(--font-heading);
  --font-sans: var(--font-sans);
  --font-number: var(--font-number);
}
```

Aturan pemakaian:

- Komponen memakai class Tailwind yang dihasilkan dari token ini
  (`bg-primary`, `text-text-secondary`, `border-border`,
  `shadow-brutalist-md`), bukan `bg-[#2E7D32]`.
- Dark mode belum ada di scope (§2.2 tidak menyebutkannya) — jangan
  menambah `@media (prefers-color-scheme: dark)` untuk token brand kecuali
  diminta eksplisit.

---

## 23. Cross-reference

Untuk hal-hal berikut, rujuk **AGENTS.md** (bukan diduplikasi di sini):
File Naming Convention, Architecture Rules, Component Hierarchy, Feature
Structure, Import Order, Performance Rules, Responsive Rules, Animation
Rules, Image Rules, Definition of Done.
