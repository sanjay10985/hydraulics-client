import Header from "@/components/header";
import HeroSection from "@/components/home/hero-section";
import ProductSection from "@/components/home/product-section";
import ContactSection from "@/components/home/contact-section";
import Footer from "@/components/footer";
import AboutSection from "@/components/home/about-section";

export default function Home() {
  return (
    <div className="flex flex-col min-h-[100dvh]  mx-auto">
      <Header />
      <main className="flex-1">
        <HeroSection />
        <AboutSection />
        <ProductSection />
        <ContactSection />
      </main>
      <Footer />
    </div>
  );
}
