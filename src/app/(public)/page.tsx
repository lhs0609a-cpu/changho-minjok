import HeroSection from '@/components/home/HeroSection';
import CoreValuesSection from '@/components/home/CoreValuesSection';
import SmartFactorySection from '@/components/home/SmartFactorySection';
import ProductHighlightSection from '@/components/home/ProductHighlightSection';
import EstimateCTASection from '@/components/home/EstimateCTASection';
import PortfolioPreviewSection from '@/components/home/PortfolioPreviewSection';
import PartnersSection from '@/components/home/PartnersSection';
import ContactSection from '@/components/home/ContactSection';

export default function HomePage() {
  return (
    <>
      <HeroSection />
      <CoreValuesSection />
      <SmartFactorySection />
      <ProductHighlightSection />
      <EstimateCTASection />
      <PortfolioPreviewSection />
      <PartnersSection />
      <ContactSection />
    </>
  );
}
