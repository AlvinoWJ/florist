import { createClient } from "@supabase/supabase-js";

const SUPABASE_URL = process.env.NEXT_PUBLIC_SUPABASE_URL;
const SERVICE_ROLE_KEY = process.env.SUPABASE_SERVICE_ROLE_KEY;

if (!SUPABASE_URL || !SERVICE_ROLE_KEY) {
  console.error(
    "❌ NEXT_PUBLIC_SUPABASE_URL dan SUPABASE_SERVICE_ROLE_KEY wajib di-set.\n" +
      "Jalankan: node --env-file=.env.local scripts/seed.mjs",
  );
  process.exit(1);
}

const supabase = createClient(SUPABASE_URL, SERVICE_ROLE_KEY, {
  auth: { persistSession: false },
});

const products = [
  {
    name: "Pupuk NPK Organik",
    slug: "pupuk-npk-organik",
    type: "produk",
    category: "pupuk",
    short_description:
      "Pupuk seimbang untuk pertumbuhan tanaman lebih optimal dan ramah lingkungan.",
  },
  {
    name: "Bibit Cabai Unggul",
    slug: "bibit-cabai-unggul",
    type: "produk",
    category: "bibit",
    short_description:
      "Bibit cabai tahan hama dengan produktivitas panen tinggi.",
  },
  {
    name: "Pestisida Nabati",
    slug: "pestisida-nabati",
    type: "produk",
    category: "pestisida",
    short_description:
      "Solusi pengendalian hama alami, aman untuk tanaman dan lingkungan.",
  },
  {
    name: "Benih Padi Hibrida",
    slug: "benih-padi-hibrida",
    type: "produk",
    category: "benih",
    short_description: "Benih padi unggul dengan hasil panen lebih melimpah.",
  },
  {
    name: "Cangkul Baja Premium",
    slug: "cangkul-baja-premium",
    type: "produk",
    category: "alat-pertanian",
    short_description: "Alat cangkul kokoh, tahan lama untuk kerja lapangan.",
  },
  {
    name: "Media Tanam Sekam Bakar",
    slug: "media-tanam-sekam-bakar",
    type: "produk",
    category: "media-tanam",
    short_description: "Media tanam gembur dan kaya nutrisi untuk bibit muda.",
  },
  {
    name: "Pakan Ternak Organik",
    slug: "pakan-ternak-organik",
    type: "produk",
    category: "pakan",
    short_description: "Pakan bernutrisi tinggi untuk ternak lebih sehat.",
  },
  {
    name: "Tanaman Hias Aglonema",
    slug: "tanaman-hias-aglonema",
    type: "produk",
    category: "tanaman-hias",
    short_description:
      "Tanaman hias daun cantik, cocok mempercantik taman dan teras rumah.",
  },
  {
    name: "Bibit Tanaman Buah Mangga",
    slug: "bibit-tanaman-buah-mangga",
    type: "produk",
    category: "tanaman-buah",
    short_description:
      "Bibit unggul cepat berbuah, cocok ditanam di pekarangan maupun kebun.",
  },
  {
    name: "Pot Tanaman Keramik",
    slug: "pot-tanaman-keramik",
    type: "produk",
    category: "pot-tanaman",
    short_description:
      "Pot tanaman berbagai ukuran dan motif, kokoh dan estetik.",
  },
  {
    name: "Paket Hidroponik NFT Pemula",
    slug: "paket-hidroponik-nft-pemula",
    type: "produk",
    category: "hidroponik",
    short_description:
      "Paket lengkap siap pakai untuk mulai bertanam hidroponik di rumah.",
  },
  {
    name: "Jasa Taman & Menanam",
    slug: "jasa-taman-menanam",
    type: "jasa",
    category: "jasa-taman",
    short_description:
      "Layanan penataan taman dan penanaman profesional untuk rumah maupun instansi.",
  },
  {
    name: "Dekorasi Pernikahan",
    slug: "jasa-dekorasi-pernikahan",
    type: "jasa",
    category: "jasa-dekorasi",
    short_description:
      "Dekorasi taman dan pelaminan pernikahan dengan rangkaian tanaman segar.",
  },
  {
    name: "Dekorasi Panggung & Acara",
    slug: "jasa-dekorasi-panggung",
    type: "jasa",
    category: "jasa-dekorasi",
    short_description:
      "Dekorasi panggung untuk acara resmi, hajatan, dan perayaan lainnya.",
  },
];

const galleryItems = [
  {
    title: "Suasana Toko",
    category: "toko",
    description: "Tampilan depan toko Sugih Flower yang tertata rapi.",
  },
  {
    title: "Gudang Penyimpanan",
    category: "gudang",
    description: "Area penyimpanan pupuk dan media tanam.",
  },
  {
    title: "Rak Tanaman Hias",
    category: "produk",
    description: "Koleksi tanaman hias siap jual.",
  },
  {
    title: "Dekorasi Pernikahan",
    category: "aktivitas",
    description: "Dokumentasi pengerjaan dekorasi pelaminan outdoor.",
  },
  {
    title: "Dekorasi Panggung Acara",
    category: "aktivitas",
    description: "Dokumentasi dekorasi panggung untuk acara hajatan.",
  },
  {
    title: "Pelanggan Konsultasi",
    category: "pelanggan",
    description: "Sesi konsultasi pemilihan bibit bersama pelanggan.",
  },
];

async function seedProducts() {
  const { error } = await supabase
    .from("products")
    .upsert(products, { onConflict: "slug" });
  if (error) throw new Error(`Gagal seed products: ${error.message}`);
  console.log(`✅ ${products.length} produk/jasa berhasil di-seed.`);
}

async function seedGallery() {
  const { error } = await supabase.from("gallery_items").insert(galleryItems);
  if (error) throw new Error(`Gagal seed gallery_items: ${error.message}`);
  console.log(`✅ ${galleryItems.length} item galeri berhasil di-seed.`);
}

async function main() {
  await seedProducts();
  await seedGallery();
  console.log("🌱 Seed selesai.");
}

main().catch((err) => {
  console.error("❌", err.message);
  process.exit(1);
});
