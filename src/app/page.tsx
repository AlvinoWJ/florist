import { FloatingWhatsApp } from "@/components/common/FloatingWhatsApp";
import { ContactSection } from "@/components/sections/ContactSection";
import { FeaturedProducts } from "@/components/sections/FeaturedProducts";
import { Footer } from "@/components/sections/Footer";
import { Hero } from "@/components/sections/Hero";
import { Navbar } from "@/components/sections/Navbar";

export default function Home() {
  return (
    <>
      <Navbar />
      <main className="flex-1">
        <Hero />
        <FeaturedProducts />
        <ContactSection />
      </main>
      <Footer />
      <FloatingWhatsApp />
    </>
  );
}
