export const storeConfig = {
  name: "Florist",
  tagline: "Mitra Tepercaya Petani Modern",
  // TODO: ganti dengan nomor WhatsApp asli toko (format 62xxxxxxxxxx)
  whatsappNumber: "6281234567890",
  email: "halo@florist.example",
  address:
    "Jl. Raya Pertanian No. 123, Kec. Contoh, Kabupaten Contoh, Jawa Timur",
  operatingHours: [
    { day: "Senin – Sabtu", hours: "07.00 – 17.00" },
    { day: "Minggu", hours: "08.00 – 14.00" },
  ],
  social: {
    instagram: "https://instagram.com/florist.tani",
    facebook: "https://facebook.com/florist.tani",
  },
  // TODO: ganti dengan embed URL Google Maps asli
  // (Google Maps > cari lokasi > Share > Embed a map > salin src iframe)
  mapEmbedUrl: "https://www.google.com/maps?q=toko+pertanian&output=embed",
} as const;

export function getWhatsappLink(message: string) {
  const encoded = encodeURIComponent(message);
  return `https://wa.me/${storeConfig.whatsappNumber}?text=${encoded}`;
}
