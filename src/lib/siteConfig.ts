export const storeConfig = {
  name: "Florist",
  tagline: "Mitra Tepercaya Petani Modern",
  whatsappNumber: "+6281374537801",
  address:
    "Jl. Rejosari, Mojogeneng, Gedangan, Kec. Mojowarno, Kabupaten Jombang, Jawa Timur",
  operatingHours: [
    { day: "Senin – Sabtu", hours: "07.00 – 17.00" },
    { day: "Minggu", hours: "08.00 – 14.00" },
  ],
  social: {
    instagram: "https://instagram.com/ino_alv",
    facebook: "https://facebook.com/florist.tani",
  },
  mapEmbedUrl:
    "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d7909.336798145286!2d112.2790677838015!3d-7.6110154894526625!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x2e786b042efffabd%3A0xd3534f1a88754749!2sSugihFlower!5e0!3m2!1sid!2sid!4v1785063724754!5m2!1sid!2sid",
} as const;

export function getWhatsappLink(message: string) {
  const encoded = encodeURIComponent(message);
  return `https://wa.me/${storeConfig.whatsappNumber}?text=${encoded}`;
}
