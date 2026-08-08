"use client";

import { MessageCircle } from "lucide-react";
import { useEffect, useState } from "react";
import { cn } from "@/lib/utils";
import { getWhatsappLink } from "@/lib/siteConfig";

export function FloatingWhatsApp() {
  const [isHeroVisible, setIsHeroVisible] = useState(true);

  useEffect(() => {
    const heroSection = document.getElementById("beranda");
    if (!heroSection) return;

    const observer = new IntersectionObserver(
      ([entry]) => setIsHeroVisible(entry.isIntersecting),
      { threshold: 0.9 },
    );

    observer.observe(heroSection);
    return () => observer.disconnect();
  }, []);

  return (
    <a
      href={getWhatsappLink(
        "Halo, saya ingin bertanya seputar produk tanaman hias di Sugih Florist.",
      )}
      target="_blank"
      rel="noopener noreferrer"
      aria-label="Chat via WhatsApp"
      aria-hidden={isHeroVisible}
      tabIndex={isHeroVisible ? -1 : 0}
      className={cn(
        "fixed bottom-6 right-6 z-50 flex h-14 w-14 items-center justify-center rounded-full border-2 border-ink bg-secondary text-secondary-foreground shadow-brutalist-md transition-all duration-300 hover:scale-105",
        isHeroVisible
          ? "pointer-events-none opacity-0 translate-y-2"
          : "opacity-100 translate-y-0",
      )}
    >
      <MessageCircle className="h-6 w-6" aria-hidden="true" />
    </a>
  );
}
