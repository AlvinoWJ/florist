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

// keyword dipakai untuk cari foto stok relevan via LoremFlickr, tidak disimpan ke DB
const products = [
  {
    name: "Pupuk NPK Organik",
    type: "produk",
    category: "pupuk",
    short_description:
      "Pupuk seimbang untuk pertumbuhan tanaman lebih optimal dan ramah lingkungan.",
    imageQuery: "fertilizer,granules",
  },
  {
    name: "Bibit Cabai Unggul",
    type: "produk",
    category: "bibit",
    short_description:
      "Bibit cabai tahan hama dengan produktivitas panen tinggi.",
    imageQuery: "chili,seedling",
  },
  {
    name: "Pestisida Nabati",
    type: "produk",
    category: "pestisida",
    short_description:
      "Solusi pengendalian hama alami, aman untuk tanaman dan lingkungan.",
    imageQuery: "pesticide,plant,spray",
  },
  {
    name: "Benih Padi Hibrida",
    type: "produk",
    category: "benih",
    short_description: "Benih padi unggul dengan hasil panen lebih melimpah.",
    imageQuery: "rice,seeds",
  },
  {
    name: "Cangkul Baja Premium",
    type: "produk",
    category: "alat-pertanian",
    short_description: "Alat cangkul kokoh, tahan lama untuk kerja lapangan.",
    imageQuery: "garden,hoe,tool",
  },
  {
    name: "Media Tanam Sekam Bakar",
    type: "produk",
    category: "media-tanam",
    short_description: "Media tanam gembur dan kaya nutrisi untuk bibit muda.",
    imageQuery: "potting,soil",
  },
  {
    name: "Pakan Ternak Organik",
    type: "produk",
    category: "pakan",
    short_description: "Pakan bernutrisi tinggi untuk ternak lebih sehat.",
    imageQuery: "cattle,feed",
  },
  {
    name: "Tanaman Hias Aglonema",
    type: "produk",
    category: "tanaman-hias",
    short_description:
      "Tanaman hias daun cantik, cocok mempercantik taman dan teras rumah.",
    imageQuery: "aglaonema,houseplant",
  },
  {
    name: "Bibit Tanaman Buah Mangga",
    type: "produk",
    category: "tanaman-buah",
    short_description:
      "Bibit unggul cepat berbuah, cocok ditanam di pekarangan maupun kebun.",
    imageQuery: "mango,sapling",
  },
  {
    name: "Pot Tanaman Keramik",
    type: "produk",
    category: "pot-tanaman",
    short_description:
      "Pot tanaman berbagai ukuran dan motif, kokoh dan estetik.",
    imageQuery: "ceramic,plantpot",
  },
  {
    name: "Paket Hidroponik NFT Pemula",
    type: "produk",
    category: "hidroponik",
    short_description:
      "Paket lengkap siap pakai untuk mulai bertanam hidroponik di rumah.",
    imageQuery: "hydroponics,nft",
  },
  {
    name: "Jasa Taman & Menanam",
    type: "jasa",
    category: "jasa-taman",
    short_description:
      "Layanan penataan taman dan penanaman profesional untuk rumah maupun instansi.",
    imageQuery: "garden,landscaping",
  },
  {
    name: "Dekorasi Pernikahan",
    type: "jasa",
    category: "jasa-dekorasi",
    short_description:
      "Dekorasi taman dan pelaminan pernikahan dengan rangkaian tanaman segar.",
    imageQuery: "wedding,flowers,decoration",
  },
  {
    name: "Dekorasi Panggung & Acara",
    type: "jasa",
    category: "jasa-dekorasi",
    short_description:
      "Dekorasi panggung untuk acara resmi, hajatan, dan perayaan lainnya.",
    imageQuery: "stage,decoration,flowers",
  },
];

const galleryItems = [
  {
    title: "Suasana Toko",
    category: "toko",
    description: "Tampilan depan toko Sugih Flower yang tertata rapi.",
    imageQuery: "flowershop,storefront",
  },
  {
    title: "Gudang Penyimpanan",
    category: "gudang",
    description: "Area penyimpanan pupuk dan media tanam.",
    imageQuery: "warehouse,storage",
  },
  {
    title: "Rak Tanaman Hias",
    category: "produk",
    description: "Koleksi tanaman hias siap jual.",
    imageQuery: "plant,nursery,shelf",
  },
  {
    title: "Dekorasi Pernikahan",
    category: "aktivitas",
    description: "Dokumentasi pengerjaan dekorasi pelaminan outdoor.",
    imageQuery: "wedding,decoration,outdoor",
  },
  {
    title: "Dekorasi Panggung Acara",
    category: "aktivitas",
    description: "Dokumentasi dekorasi panggung untuk acara hajatan.",
    imageQuery: "stage,event",
  },
  {
    title: "Pelanggan Konsultasi",
    category: "pelanggan",
    description: "Sesi konsultasi pemilihan bibit bersama pelanggan.",
    imageQuery: "garden,consultation",
  },
];

async function fetchAndUploadImage(bucket, query) {
  const url = `https://loremflickr.com/640/640/${encodeURIComponent(query)}`;
  const res = await fetch(url);
  if (!res.ok) {
    console.warn(
      `⚠️  Gagal fetch gambar untuk "${query}" (${res.status}), dilewati.`,
    );
    return null;
  }
  const arrayBuffer = await res.arrayBuffer();
  const fileName = `${crypto.randomUUID()}.jpg`;

  const { error } = await supabase.storage
    .from(bucket)
    .upload(fileName, Buffer.from(arrayBuffer), {
      cacheControl: "3600",
      upsert: false,
      contentType: "image/jpeg",
    });

  if (error) {
    console.warn(`⚠️  Gagal upload gambar untuk "${query}": ${error.message}`);
    return null;
  }

  const { data } = supabase.storage.from(bucket).getPublicUrl(fileName);
  return data.publicUrl;
}

async function seedProducts() {
  const rows = [];
  for (const { imageQuery, ...product } of products) {
    const imageUrl = await fetchAndUploadImage("product-images", imageQuery);
    rows.push({ ...product, image_url: imageUrl });
  }

  const { error } = await supabase.from("products").insert(rows);
  if (error) throw new Error(`Gagal seed products: ${error.message}`);
  console.log(
    `✅ ${rows.length} produk/jasa berhasil di-seed (dengan gambar).`,
  );
}

async function seedGallery() {
  const rows = [];
  for (const { imageQuery, ...item } of galleryItems) {
    const imageUrl = await fetchAndUploadImage("gallery-images", imageQuery);
    rows.push({ ...item, image_url: imageUrl });
  }

  const { error } = await supabase.from("gallery_items").insert(rows);
  if (error) throw new Error(`Gagal seed gallery_items: ${error.message}`);
  console.log(
    `✅ ${rows.length} item galeri berhasil di-seed (dengan gambar).`,
  );
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
