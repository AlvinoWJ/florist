"use client";

import { useEffect, useState } from "react";

import { Menu, Sprout, X } from "lucide-react";

import { cn } from "@/lib/utils";

import { Container } from "@/components/common/Container";
import { LinkButton } from "@/components/ui/button";

const NAV_LINKS = [
  { label: "Beranda", href: "#beranda" },
  { label: "Produk", href: "#produk" },
  { label: "Kontak", href: "#kontak" },
];

export function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setIsScrolled(window.scrollY > 8);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header
      className={cn(
        "sticky top-0 z-50 w-full border-b-2 transition-colors duration-300",
        isScrolled
          ? "border-ink bg-background/95 backdrop-blur-sm"
          : "border-transparent bg-transparent",
      )}
    >
      <Container>
        <nav className="flex h-16 items-center justify-between md:h-20">
          <a href="#beranda" className="flex items-center gap-2">
            <span className="flex h-9 w-9 items-center justify-center rounded-xl border-2 border-ink bg-primary text-primary-foreground">
              <Sprout className="h-5 w-5" strokeWidth={2} aria-hidden="true" />
            </span>
            <span className="font-heading text-lg font-bold text-foreground">
              Florist
            </span>
          </a>

          <ul className="hidden items-center gap-8 md:flex">
            {NAV_LINKS.map((link) => (
              <li key={link.href}>
                <a
                  href={link.href}
                  className="text-sm font-medium text-foreground/80 transition-colors hover:text-primary"
                >
                  {link.label}
                </a>
              </li>
            ))}
          </ul>

          <div className="hidden md:block">
            <LinkButton
              href="#kontak"
              className="btn-lift border-2 border-ink shadow-brutalist-sm"
            >
              Hubungi Kami
            </LinkButton>
          </div>

          <button
            type="button"
            aria-label={isMobileMenuOpen ? "Tutup menu" : "Buka menu"}
            aria-expanded={isMobileMenuOpen}
            onClick={() => setIsMobileMenuOpen((open) => !open)}
            className="flex size-11 items-center justify-center rounded-lg border-2 border-ink md:hidden"
          >
            {isMobileMenuOpen ? (
              <X className="h-5 w-5" aria-hidden="true" />
            ) : (
              <Menu className="h-5 w-5" aria-hidden="true" />
            )}
          </button>
        </nav>

        {isMobileMenuOpen ? (
          <ul className="flex flex-col gap-1 border-t-2 border-ink py-4 md:hidden">
            {NAV_LINKS.map((link) => (
              <li key={link.href}>
                <a
                  href={link.href}
                  onClick={() => setIsMobileMenuOpen(false)}
                  className="block rounded-lg px-3 py-3 text-base font-medium text-foreground hover:bg-muted"
                >
                  {link.label}
                </a>
              </li>
            ))}
          </ul>
        ) : null}
      </Container>
    </header>
  );
}
