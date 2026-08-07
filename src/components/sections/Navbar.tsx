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
        isScrolled || isMobileMenuOpen
          ? "border-ink bg-background/95 backdrop-blur-sm"
          : "border-transparent bg-transparent",
      )}
    >
      <Container>
        <nav className="flex h-16 items-center justify-between md:h-20">
          <div className="flex items-center gap-2">
            <span
              className={cn(
                "flex h-9 w-9 items-center justify-center overflow-hidden rounded-xl border-2 bg-background transition-colors",
                isScrolled || isMobileMenuOpen
                  ? "border-ink"
                  : "border-background/60",
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
              "flex size-11 items-center justify-center rounded-full border-2 bg-background shadow-brutalist-sm transition-transform hover:-translate-y-0.5 md:hidden",
              isScrolled || isMobileMenuOpen
                ? "border-ink text-foreground"
                : "border-background/60 text-background",
            )}
          >
            {isMobileMenuOpen ? (
              <X className="h-5 w-5" aria-hidden="true" />
            ) : (
              <Menu className="h-5 w-5" aria-hidden="true" />
            )}
          </button>
        </nav>

        {isMobileMenuOpen ? (
          <div className="border-t-2 border-ink bg-background md:hidden">
            <ul className="flex flex-col px-2 py-2">
              {NAV_LINKS.map((link) => (
                <li key={link.href}>
                  <a
                    href={link.href}
                    onClick={() => setIsMobileMenuOpen(false)}
                    className="block px-3 py-4 font-heading text-base font-semibold text-foreground transition-colors hover:text-highlight"
                  >
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>

            <div className="border-t-2 border-ink px-4 py-4">
              <LinkButton
                href={getWhatsappLink(
                  "Halo, saya ingin bertanya seputar produk pertanian",
                )}
                target="_blank"
                rel="noopener noreferrer"
                variant="brutalist"
                size="brutalist"
                className="w-full justify-center gap-2 bg-highlight text-ink"
              >
                <MessageCircle className="h-4 w-4" aria-hidden="true" />
                Hubungi Kami
              </LinkButton>
            </div>
          </div>
        ) : null}
      </Container>
    </header>
  );
}
