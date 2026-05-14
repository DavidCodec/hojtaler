import { BrandMarquee } from "@/components/landing/brand-marquee";
import { ContactSection } from "@/components/landing/contact-section";
import { Footer } from "@/components/landing/footer";
import { Header } from "@/components/landing/header";
import { Hero } from "@/components/landing/hero";
import { Solutions } from "@/components/landing/solutions";

export function LandingPage() {
  return (
    <div className="min-h-screen bg-zinc-950 text-zinc-100">
      <Header />
      <main>
        <Hero />
        <BrandMarquee />
        <Solutions />
        <ContactSection />
      </main>
      <Footer />
    </div>
  );
}
