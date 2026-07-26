import { Sprout } from "lucide-react";

import { storeConfig } from "@/lib/siteConfig";

import { Container } from "@/components/common/Container";

const FOOTER_LINKS = [
  { label: "Beranda", href: "#beranda" },
  { label: "Produk", href: "#produk" },
  { label: "Kontak", href: "#kontak" },
];

export function Footer() {
  return (
    <footer className="border-t-2 border-ink bg-foreground text-background">
      <Container className="flex flex-col gap-8 py-12 items-center text-center md:py-16">
        <div className="flex flex-col gap-3">
          <div className="flex justify-center items-center gap-2">
            <span className="flex h-9 w-9 items-center justify-center rounded-xl border-2 border-background bg-primary text-primary-foreground">
              <Sprout className="h-5 w-5" strokeWidth={2} aria-hidden="true" />
            </span>
            <span className="font-heading text-lg font-bold">
              {storeConfig.name}
            </span>
          </div>
          <p className="max-w-xs text-sm text-background/70">
            Mitra tepercaya petani modern — menyediakan produk pertanian
            berkualitas dan konsultasi ramah.
          </p>
        </div>

        <nav aria-label="Tautan footer">
          <ul className="flex gap-6 text-sm">
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
            dilindungi.
          </p>
        </Container>
      </div>
    </footer>
  );
}
