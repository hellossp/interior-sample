import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";
import Services from "@/components/Services";
import Portfolio from "@/components/Portfolio";
import Testimonials from "@/components/Testimonials";
import Contact from "@/components/Contact";
import Footer from "@/components/Footer";
import ContentWrapper from "@/components/ContentWrapper";
import ScrollToTop from "@/components/ScrollToTop";

export const metadata = {
  title: "Elevé Interiors | Luxury Interior Design & Architecture Studio",
  description: "Bespoke high-end interior styling, space planning, and residential architecture for refined spaces.",
};

export default function Home() {
  return (
    <div className="relative min-h-screen bg-[#050508] font-sans antialiased">
      {/* Dynamic Floating Navigation */}
      <Navbar />

      <main className="relative w-full">
        {/* Scroll-Animated Door Hero Section */}
        <Hero />

        {/* Website Content - scrolls up after the doors open and blends backgrounds */}
        <ContentWrapper>
          <Services />
          <Portfolio />
          <Testimonials />
          <Contact />
          <Footer />
        </ContentWrapper>
      </main>

      {/* Luxury Scroll to Top Button */}
      <ScrollToTop />
    </div>
  );
}

