import { BrandMarquee } from "@/components/landing/brand-marquee";
import { ContactSection } from "@/components/landing/contact-section";
import { FloatingWhatsapp } from "@/components/landing/floating-whatsapp";
import { Footer } from "@/components/landing/footer";
import { Header } from "@/components/landing/header";
import { Hero } from "@/components/landing/hero";
import { Solutions } from "@/components/landing/solutions";

export function LandingPage() {
  return (
    <div className="min-h-screen bg-zinc-50 text-zinc-900 dark:bg-zinc-950 dark:text-zinc-100">
      <Header />
      <main>
        <Hero />
        <BrandMarquee />
        <Solutions />
        <ContactSection />
      </main>
      <Footer />
      <FloatingWhatsapp />
    </div>
  );
}
