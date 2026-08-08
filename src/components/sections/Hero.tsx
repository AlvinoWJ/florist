import { ArrowRight, MessageCircle } from "lucide-react";
import Image from "next/image";
import { getWhatsappLink, storeConfig } from "@/lib/siteConfig";

import { Container } from "@/components/common/Container";
import { LinkButton } from "@/components/ui/button";

export function Hero() {
  return (
    <section
      id="beranda"
      className="relative flex min-h-svh flex-col justify-center overflow-hidden py-16 md:py-24 lg:py-32 "
    >
      <Image
        src="/hero.webp"
        alt="Lahan pertanian modern yang subur dan hijau"
        fill
        priority
        sizes="100vw"
        className="object-cover"
      />

      <div
        aria-hidden="true"
        className="absolute inset-0 bg-gradient-to-r from-foreground/85 via-foreground/55 to-foreground/20"
      />
      <div
        aria-hidden="true"
        className="absolute inset-0 bg-gradient-to-t from-foreground/70 via-transparent to-transparent"
      />

      <Container>
        <div className="grid items-center gap-12 lg:grid-cols-2">
          <div className="relative z-10 flex flex-col items-center gap-6 text-center lg:items-start lg:text-left">
            <span className="mb-4 inline-flex items-center gap-1.5 rounded-full border border-ink bg-accent px-3 py-1.5 text-[10px] font-bold uppercase tracking-wider text-ink sm:gap-2 sm:px-4 sm:py-2 sm:text-xs sm:tracking-widest">
              Spesialis Tanaman Hias Terpercaya
            </span>

            <h1 className="font-heading text-5xl font-extrabold leading-[1.05] md:text-6xl lg:text-7xl">
              <span className="block text-white">Keindahan Alam,</span>
              <span className="block text-accent">Hadir di Rumahmu</span>
            </h1>

            <p className="max-w-lg text-base leading-relaxed text-background/85 md:text-lg">
              Hadirkan suasana hijau yang lebih asri dengan pilihan tanaman hias
              berkualitas dan berbagai kebutuhan berkebun untuk mempercantik
              rumahmu.
            </p>

            <div className="flex flex-col gap-4 sm:flex-row">
              <LinkButton href="#produk" variant="brutalist" size="brutalist">
                Lihat Katalog Produk
                <ArrowRight className="h-4 w-4" aria-hidden="true" />
              </LinkButton>
              <LinkButton
                href={getWhatsappLink(
                  "Halo, saya ingin konsultasi seputar produk pertanian",
                )}
                target="_blank"
                rel="noopener noreferrer"
                variant="brutalist-outline"
                size="brutalist"
                className="border-background text-background hover:bg-background/10"
              >
                <MessageCircle className="h-4 w-4" aria-hidden="true" />
                Konsultasi Gratis
              </LinkButton>
            </div>
          </div>
        </div>
      </Container>
      <div className="absolute inset-x-0 bottom-8 z-10 hidden flex-col items-center gap-2 text-background/80 md:flex">
        <span className="text-xs font-medium uppercase tracking-widest">
          Scroll ke bawah
        </span>
        <span className="flex h-9 w-6 items-start justify-center rounded-full border-2 border-background/60 p-1.5">
          <span className="h-1.5 w-1.5 rounded-full bg-background motion-safe:animate-bounce" />
        </span>
      </div>
    </section>
  );
}
