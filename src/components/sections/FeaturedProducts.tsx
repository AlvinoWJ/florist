import { getFeaturedProducts } from "@/lib/api/products";

import { Container } from "@/components/common/Container";
import { ProductCard } from "@/components/common/ProductCard";

export async function FeaturedProducts() {
  const products = await getFeaturedProducts();

  return (
    <section id="produk" className="py-16 md:py-24 lg:py-32 ">
      <Container>
        <div className="mx-auto max-w-2xl text-center">
          <span className="font-heading text-sm font-bold uppercase tracking-widest text-secondary">
            Katalog Produk
          </span>
          <h2 className="mt-2 font-heading text-3xl font-bold text-foreground md:text-4xl">
            Kebutuhan Pertanian Anda, Lengkap di Sini
          </h2>
          <p className="mt-4 text-muted-foreground">
            Dari pupuk, bibit, hingga alat pertanian — semua kami kurasi untuk
            hasil panen yang lebih baik. Hubungi kami untuk konsultasi gratis.
          </p>
        </div>

        <div className="mt-12 grid grid-cols-1 gap-4 sm:grid-cols-2 md:gap-6 lg:grid-cols-4">
          {products.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      </Container>
    </section>
  );
}
