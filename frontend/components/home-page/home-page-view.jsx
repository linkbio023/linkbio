import NavigationMenu from "@/components/shared/navigation-menu";
import FAQ from "@/components/home-page/faq";
import PriceCards from "@/components/upgrade/price-cards";
import Testimonial from "@/components/home-page/testimonial";
import FooterSection from "@/components/shared/footer";
import Features from "@/components/home-page/features";
import Clients from "@/components/home-page/clients";
import Analytics from "@/components/home-page/analytics";
import HeroSection from "@/components/home-page/hero-section";
import CTA from "@/components/home-page/cta";

export default function HomePageView() {
  return (
    <main className="bg-gray-50">
      {/* Navigation Menu */}
      <NavigationMenu />
      {/* Main Page */}
      <HeroSection />

      {/* Users & Stats */}
      <Clients />

      {/* Features */}
      <Features />

      <div className="container">
        {/* Analytics */}
        <Analytics />

        {/* Testimonial */}
        <Testimonial />

        {/* Pricing */}
        <PriceCards />

        {/* CTA */}
        <CTA />

        {/* FAQ */}
        <FAQ />
      </div>

      {/* Footer */}
      <FooterSection />
    </main>
  );
}
