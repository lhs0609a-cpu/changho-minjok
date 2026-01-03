import Header from "@/components/common/Header";
import Footer from "@/components/common/Footer";
import KakaoFloating from "@/components/common/KakaoFloating";
import HeroSection from "@/components/home/HeroSection";
import PriceSimulator from "@/components/home/PriceSimulator";
import WindowSimulator from "@/components/home/WindowSimulator";
import ProcessTimeline from "@/components/home/ProcessTimeline";
import InstallationMap from "@/components/home/InstallationMap";
import PortfolioGrid from "@/components/home/PortfolioGrid";
import QuickInquiryForm from "@/components/home/QuickInquiryForm";

export default function Home() {
  return (
    <>
      <Header />
      <main>
        <HeroSection />
        <PriceSimulator />
        <WindowSimulator />
        <ProcessTimeline />
        <InstallationMap />
        <PortfolioGrid />
        <QuickInquiryForm />
      </main>
      <Footer />
      <KakaoFloating />
    </>
  );
}
