import { Clock, PhoneCall, MapPin, MessageCircle } from "lucide-react";
import { InstagramIcon } from "@/components/ui/instagram";
import { FacebookIcon } from "@/components/ui/facebook";

import { getWhatsappLink, storeConfig } from "@/lib/siteConfig";

import { Container } from "@/components/common/Container";
import { LinkButton } from "@/components/ui/button";

export function ContactSection() {
  return (
    <section id="kontak" className="bg-muted py-16 md:py-24 lg:py-32 ">
      <Container>
        <div className="mx-auto max-w-2xl text-center">
          <span className="font-heading text-sm font-bold uppercase tracking-widest text-secondary">
            Kontak Kami
          </span>
          <h2 className="mt-2 font-heading text-3xl font-bold text-foreground md:text-4xl">
            Kunjungi atau Hubungi Kami
          </h2>
          <p className="mt-4 text-muted-foreground">
            Tim kami siap membantu kebutuhan pertanian Anda, mulai dari
            pemilihan produk hingga konsultasi lapangan.
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
              href={getWhatsappLink(
                "Halo, saya ingin bertanya seputar produk pertanian",
              )}
              target="_blank"
              rel="noopener noreferrer"
              className="mt-2 w-full gap-2 border-2 border-ink"
            >
              <MessageCircle className="h-4 w-4" aria-hidden="true" />
              Chat WhatsApp
            </LinkButton>

            <div className="mt-2 justify-center flex items-center gap-3">
              <a
                href={storeConfig.social.instagram}
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Instagram Florist"
                className="flex size-11 items-center justify-center rounded-lg border-2 border-ink transition-colors hover:bg-muted"
              >
                <InstagramIcon size={25} />
              </a>
              <a
                href={storeConfig.social.facebook}
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Facebook Florist"
                className="flex size-11 items-center justify-center rounded-lg border-2 border-ink transition-colors hover:bg-muted"
              >
                <FacebookIcon size={25} />
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
