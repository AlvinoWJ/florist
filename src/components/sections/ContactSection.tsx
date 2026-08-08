import Image from "next/image";
import { Clock, PhoneCall, MapPin, MessageCircle } from "lucide-react";
import { getWhatsappLink, storeConfig } from "@/lib/siteConfig";

import { Container } from "@/components/common/Container";
import { LinkButton } from "@/components/ui/button";

export function ContactSection() {
  return (
    <section id="kontak" className=" py-16 md:py-24 lg:py-32 ">
      <Container>
        <div className="mx-auto max-w-2xl text-center">
          <span className="inline-block items-center gap-2 text-xs font-bold uppercase tracking-widest px-4 py-2 rounded-full mb-4 bg-accent border-2 border-ink text-ink ">
            Kontak Kami
          </span>
          <h2 className="mt-2 font-heading text-3xl font-bold text-foreground md:text-4xl">
            Kunjungi atau Hubungi Kami
          </h2>
          <p className="mt-4 font-medium text-muted-foreground">
            Tim kami siap membantu kebutuhan tanaman hias anda, mulai dari
            pemilihan produk hingga konsultasi perawatan.
          </p>
        </div>

        <div className="mt-12 grid gap-6 lg:grid-cols-5 lg:gap-8">
          <div className="flex flex-col gap-4 rounded-2xl border-2 border-ink bg-card p-6 shadow-brutalist-sm md:p-8 lg:col-span-2">
            <div className="flex items-start gap-3">
              <MapPin
                className="mt-0.5 h-5 w-5 shrink-0 text-primary"
                aria-hidden="true"
              />
              <p className="text-sm text-foreground">{storeConfig.address}</p>
            </div>
            <div className="flex items-start gap-3">
              <Clock
                className="mt-0.5 h-5 w-5 shrink-0 text-primary"
                aria-hidden="true"
              />
              <ul className="text-sm text-foreground">
                {storeConfig.operatingHours.map((item) => (
                  <li key={item.day}>
                    <span className="font-medium">{item.day} :</span>{" "}
                    {item.hours}
                  </li>
                ))}
              </ul>
            </div>
            <div className="flex items-start gap-3">
              <PhoneCall
                className="mt-0.5 h-5 w-5 shrink-0 text-primary"
                aria-hidden="true"
              />
              <p className="text-sm text-foreground">
                {storeConfig.whatsappNumber}
              </p>
            </div>
            <LinkButton
              variant="brutalist"
              href={getWhatsappLink(
                "Halo, saya ingin bertanya seputar produk tanaman hias di Sugih Florist.",
              )}
              target="_blank"
              rel="noopener noreferrer"
              className="mt-2 w-full gap-2 border-2 border-ink py-5 text-base font-semibold shadow-brutalist-sm "
            >
              <MessageCircle className="h-4 w-4" aria-hidden="true" />
              Chat WhatsApp
            </LinkButton>
            <div className="mt-2 flex items-center justify-center gap-3">
              <a
                href={storeConfig.social.tiktok}
                target="_blank"
                rel="noopener noreferrer"
                aria-label="TikTok Florist"
                className="flex size-11 items-center justify-center rounded-lg border-2 border-ink transition-colors hover:bg-muted"
              >
                <Image src="/tiktok.webp" alt="TikTok" width={25} height={25} />
              </a>
            </div>
          </div>

          <div className="overflow-hidden rounded-2xl border-2 border-ink shadow-brutalist-sm lg:col-span-3">
            <iframe
              src={storeConfig.mapEmbedUrl}
              title={`Lokasi ${storeConfig.name} di Google Maps`}
              className="h-80 w-full lg:h-full"
              style={{ border: 0 }}
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
            />
          </div>
        </div>
      </Container>
    </section>
  );
}
