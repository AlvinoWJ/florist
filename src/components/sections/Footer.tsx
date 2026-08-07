import { Sprout } from "lucide-react";
import Image from "next/image";
import { storeConfig } from "@/lib/siteConfig";

import { Container } from "@/components/common/Container";

const FOOTER_LINKS = [
  { label: "Beranda", href: "#beranda" },
  { label: "Produk", href: "#produk" },
  { label: "Galeri", href: "#galeri" },
  { label: "Kontak", href: "#kontak" },
];

export function Footer() {
  return (
    <footer className="border-t-2 border-ink bg-foreground text-background">
      <Container className="flex flex-col gap-4 py-8 items-center text-center md:py-12">
        <div className="flex flex-col gap-3">
          <div className="flex  justify-center items-center  gap-2">
            <Image
              src="/logo-sugih.webp"
              alt="logo"
              width={100}
              height={100}
              className="h-28 w-auto"
            />
          </div>
          <p className="max-w-xs text-sm text-background/70">
            Mitra tepercaya petani modern — menyediakan produk pertanian
            berkualitas dan konsultasi ramah.
          </p>
        </div>

        <nav aria-label="Tautan footer">
          <ul className="flex gap-8 text-base">
            {FOOTER_LINKS.map((link) => (
              <li key={link.href}>
                <a
                  href={link.href}
                  className="text-background/80 transition-colors hover:text-background"
                >
                  {link.label}
                </a>
              </li>
            ))}
          </ul>
        </nav>
      </Container>

      <div className="border-t border-background/20 py-4">
        <Container>
          <p className="text-center text-xs text-background/60">
            © {new Date().getFullYear()} {storeConfig.name}. Seluruh hak cipta
            dilindungi Alvino Ganteng.
          </p>
        </Container>
      </div>
    </footer>
  );
}
