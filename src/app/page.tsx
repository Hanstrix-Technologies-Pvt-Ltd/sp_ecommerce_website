import Header from "@/components/Header";
import HeroSection from "@/components/HeroSection";
import AboutSection from "@/components/AboutSection";
import ProductsSection from "@/components/ProductsSection";
import SubProductsSection from "@/components/SubProductsSection";
import MaintenanceSection from "@/components/MaintenanceSection";
import TestimonialSection from "@/components/TestimonialSection";
import ContactSection from "@/components/ContactSection";
import Footer from "@/components/Footer";

export default function Home() {
  return (
    <div className="min-h-screen">
      {/* Skip to main content link for accessibility */}
      <a
        href="#main-content"
        className="skip-link sr-only focus:not-sr-only focus:absolute focus:top-4 focus:left-4 bg-blue-600 text-white px-4 py-2 rounded z-50"
      >
        Skip to main content
      </a>

      <Header />

      <main id="main-content">
        <HeroSection />
        <AboutSection />
        <ProductsSection />
        <SubProductsSection />
        <MaintenanceSection />
        {/* <TestimonialSection /> */}
        <ContactSection />
      </main>

      <Footer />
    </div>
  );
}
