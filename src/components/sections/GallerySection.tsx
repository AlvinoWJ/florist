import { getGalleryItems } from "@/lib/api/gallery";

import { Container } from "@/components/common/Container";
import { GalleryCard } from "@/components/common/GalleryCard";

export async function GallerySection() {
  const items = await getGalleryItems();

  return (
    <section id="galeri" className="py-16 md:py-24 lg:py-32">
      <Container>
        <div className="mx-auto max-w-2xl text-center">
          <span className="inline-block items-center gap-2 text-xs font-bold uppercase tracking-widest px-4 py-2 rounded-full mb-4 bg-accent border-2 border-ink text-ink ">
            Galeri
          </span>
          <h2 className="mt-2 font-heading text-3xl font-bold text-foreground md:text-4xl">
            Dokumentasi Kegiatan Kami
          </h2>
          <p className="mt-4 font-medium text-muted-foreground">
            Sekilas suasana toko, gudang, hingga aktivitas kami bersama petani
            dan pelanggan.
          </p>
        </div>

        <div className="mt-12 grid grid-cols-2 gap-4 md:grid-cols-3 md:gap-6 lg:grid-cols-4">
          {items.map((item) => (
            <GalleryCard key={item.id} item={item} />
          ))}
        </div>
      </Container>
    </section>
  );
}
