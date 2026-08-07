import { getFeaturedProducts } from "@/lib/api/products";
import { Container } from "@/components/common/Container";
import { ProductCatalogGrid } from "@/components/common/ProductCatalogGrid";

export async function FeaturedProducts() {
  const products = await getFeaturedProducts();

  return (
    <section id="produk" className="py-16 md:py-24 lg:py-32 ">
      <Container>
        <div className="mx-auto max-w-2xl text-center">
          <span className="inline-block items-center gap-2 text-xs font-bold uppercase tracking-widest px-4 py-2 rounded-full mb-4 bg-accent border-2 border-ink text-ink ">
            Katalog Produk
          </span>
          <h2 className="mt-2 font-heading text-3xl font-bold text-foreground md:text-4xl">
            Koleksi Tanaman Hias Lengkap di Sini
          </h2>
          <p className="mt-4 text-muted-foreground">
            Dari tanaman hias daun, bunga, pupuk, bibit, hingga alat tanam
            <br />
            semua kami kurasi untuk dengan teliti untuk keindahan rumah Anda.
            <br />
            Hubungi kami untuk konsultasi gratis.
          </p>
        </div>

        <ProductCatalogGrid products={products} />
      </Container>
    </section>
  );
}
