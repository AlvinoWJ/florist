import { MessageCircle } from "lucide-react";

import { getWhatsappLink } from "@/lib/siteConfig";

export function FloatingWhatsApp() {
  return (
    <a
      href={getWhatsappLink(
        "Halo, saya ingin bertanya seputar produk pertanian",
      )}
      target="_blank"
      rel="noopener noreferrer"
      aria-label="Chat via WhatsApp"
      className="fixed bottom-6 right-6 z-50 flex h-14 w-14 items-center justify-center rounded-full border-2 border-ink bg-secondary text-secondary-foreground shadow-brutalist-md transition-transform hover:scale-105"
    >
      <MessageCircle className="h-6 w-6" aria-hidden="true" />
    </a>
  );
}
