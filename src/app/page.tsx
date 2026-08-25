import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import {
  HeroSection,
  CatalogSection,
  AdvantagesSection,
  WhyChooseSection,
  ProductionSection,
  PartsSection,
  ContactSection,
} from "@/components/sections";

export default function Home() {
  return (
    <>
      <Header />
      <main>
        <HeroSection />
        <CatalogSection />
        <AdvantagesSection />
        <ProductionSection />
        <WhyChooseSection />
        <PartsSection />
        <ContactSection />
      </main>
      <Footer />
    </>
  );
}
