"use client";

import { useEffect, useState } from "react";
import { Menu, X, MessageCircle } from "lucide-react";
import { getWhatsappLink } from "@/lib/siteConfig";
import { cn } from "@/lib/utils";
import Image from "next/image";
import { Container } from "@/components/common/Container";
import { LinkButton } from "@/components/ui/button";

const NAV_LINKS = [
  { label: "Beranda", href: "#beranda" },
  { label: "Produk", href: "#produk" },
  { label: "Galeri", href: "#galeri" },
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

  useEffect(() => {
    const onResize = () => {
      if (window.innerWidth >= 768) setIsMobileMenuOpen(false);
    };
    window.addEventListener("resize", onResize);
    return () => window.removeEventListener("resize", onResize);
  }, []);

  return (
    <header
      className={cn(
        "fixed top-0 z-50 w-full border-b-2 transition-all duration-300",
        isScrolled 
          ? "border-ink bg-background"
          : "border-transparent bg-transparent",
      )}
    >
      <Container>
        <nav className="flex h-16 items-center justify-between md:h-20">
          <div className="flex items-center gap-2">
            <span
              className={cn(
                "flex h-20 w-20 items-center justify-center overflow-hidden  transition-colors",
                isScrolled || isMobileMenuOpen
                  ? "border-ink"
                  : "border-card/60",
              )}
            >
              <Image
                src="/logo-sugih.webp"
                alt={`Logo`}
                width={100}
                height={100}
                priority
                className="h-full w-full object-contain"
              />
            </span>
          </div>

          <ul className="hidden items-center gap-8 md:flex">
            {NAV_LINKS.map((link) => (
              <li key={link.href}>
                <a
                  href={link.href}
                  className={cn(
                    "font-heading text-base font-semibold transition-colors hover:underline hover:underline-offset-4",
                    isScrolled ? "text-foreground/80" : "text-background",
                  )}
                >
                  {link.label}
                </a>
              </li>
            ))}
          </ul>

          <div className="hidden md:block">
            <LinkButton
              href="#kontak"
              variant="brutalist"
              size="brutalist"
              className="text-sm bg-highlight text-ink"
            >
              Hubungi Kami
            </LinkButton>
          </div>

          <button
            type="button"
            aria-label={isMobileMenuOpen ? "Tutup menu" : "Buka menu"}
            aria-expanded={isMobileMenuOpen}
            onClick={() => setIsMobileMenuOpen((open) => !open)}
            className={cn(
              "flex size-11 items-center justify-center rounded-full border-2 md:hidden",
              isScrolled || isMobileMenuOpen
                ? "border-ink bg-background text-foreground"
                : "border-background/60 bg-background/10 text-background hover:bg-background/10",
            )}
          >
            {isMobileMenuOpen ? (
              <X className="h-5 w-5" aria-hidden="true" />
            ) : (
              <Menu className="h-5 w-5" aria-hidden="true" />
            )}
          </button>
        </nav>
      </Container>

      {isMobileMenuOpen ? (
        <div className="w-full border-t-2 border-ink bg-card  md:hidden">
          <Container>
            <ul className="flex flex-col py-2 gap-3 mt-2">
              {NAV_LINKS.map((link) => (
                <li key={link.href}>
                  <a
                    href={link.href}
                    onClick={() => setIsMobileMenuOpen(false)}
                    className="block font-heading text-sm font-semibold py-2 px-3 rounded-xl transition-colors hover:bg-green-50"
                  >
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </Container>

          <div className="w-full pb-3">
            <Container>
              <div className="py-4">
                <LinkButton
                  href={getWhatsappLink(
                    "Halo, saya ingin bertanya seputar produk pertanian",
                  )}
                  target="_blank"
                  rel="noopener noreferrer"
                  variant="brutalist"
                  size="brutalist"
                  className="w-full justify-center gap-2 bg-highlight text-sm text-ink"
                >
                  <MessageCircle className="h-4 w-4" aria-hidden="true" />
                  Hubungi Kami
                </LinkButton>
              </div>
            </Container>
          </div>
        </div>
      ) : null}
    </header>
  );
}
