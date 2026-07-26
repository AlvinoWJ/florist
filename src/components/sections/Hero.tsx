import { ArrowRight, MessageCircle } from "lucide-react";

import { getWhatsappLink } from "@/lib/siteConfig";

import { Container } from "@/components/common/Container";
import { LinkButton } from "@/components/ui/button";

export function Hero() {
  return (
    <section
      id="beranda"
      className="relative overflow-hidden py-16 md:py-24 lg:py-32 "
    >
      {/* Organic blob background — dekoratif, tema Agriculture §5.2 */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -right-24 -top-24 h-72 w-72 rounded-full bg-accent/30 blur-3xl md:h-96 md:w-96"
      />
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -bottom-32 -left-16 h-72 w-72 rounded-full bg-secondary/20 blur-3xl md:h-96 md:w-96"
      />

      <Container>
        <div className="grid items-center gap-12 lg:grid-cols-2">
          <div className="relative z-10 flex flex-col items-center gap-6 text-center lg:items-start lg:text-left">
            <span className="rounded-full border-2 border-ink bg-highlight px-4 py-1.5 text-sm font-bold text-ink">
              Mitra Tepercaya Petani Modern
            </span>

            <h1 className="font-heading text-5xl font-extrabold leading-[1.05] text-foreground md:text-6xl">
              Pertanian Modern,
              <br />
              Dimulai dari Sini
            </h1>

            <p className="max-w-md text-lg text-muted-foreground">
              Kami menyediakan pupuk, bibit, benih, dan alat pertanian
              berkualitas — didukung konsultasi langsung untuk hasil panen
              terbaik.
            </p>

            <div className="flex flex-col gap-4 sm:flex-row">
              <LinkButton
                href="#produk"
                size="lg"
                className="btn-lift gap-2 border-2 border-ink shadow-brutalist-md "
              >
                Lihat Katalog Produk
                <ArrowRight className="h-4 w-4" aria-hidden="true" />
              </LinkButton>
              <LinkButton
                href={getWhatsappLink(
                  "Halo, saya ingin konsultasi seputar produk pertanian",
                )}
                target="_blank"
                rel="noopener noreferrer"
                variant="outline"
                size="lg"
                className="gap-2 border-2 border-ink"
              >
                <MessageCircle className="h-4 w-4" aria-hidden="true" />
                Konsultasi Gratis
              </LinkButton>
            </div>
          </div>

          {/* Hero illustration — ganti dengan foto asli via next/image saat tersedia */}
          <div className="relative z-10 flex justify-center">
            <div className="relative aspect-square w-full max-w-md rounded-[2.5rem] border-4 border-ink bg-gradient-to-br from-secondary/30 via-accent/20 to-highlight/30 shadow-brutalist-lg">
              <svg
                viewBox="0 0 400 400"
                className="h-full w-full p-8"
                role="img"
                aria-label="Ilustrasi tanaman dan hasil panen pertanian modern"
              >
                <circle
                  cx="200"
                  cy="330"
                  r="60"
                  fill="var(--color-earth)"
                  opacity="0.25"
                />
                <path
                  d="M200 320 C160 260 160 180 200 100 C240 180 240 260 200 320Z"
                  fill="var(--secondary)"
                />
                <path
                  d="M200 260 C170 230 170 190 200 150 C230 190 230 230 200 260Z"
                  fill="var(--primary)"
                />
                <circle
                  cx="130"
                  cy="140"
                  r="34"
                  fill="var(--color-highlight)"
                />
                <circle cx="280" cy="120" r="24" fill="var(--accent)" />
              </svg>
            </div>
          </div>
        </div>
      </Container>
    </section>
  );
}
