import HeroSection from '@/components/sections/HeroSection';
import { Section } from '@/components/layout/Section';
import { Container } from '@/components/layout/Container';
import BoothShowcase from '@/components/sections/BoothShowcase';
import MasonryGallery from '@/components/sections/MasonryGallery';
import { ProcessTimeline } from '@/components/sections/ProcessTimeline';
import { StatsCounter } from '@/components/sections/StatsCounter';
import { LogoMarquee } from '@/components/sections/LogoMarquee';
import { FAQAccordion } from '@/components/sections/FAQAccordion';
import TestimonialsCarousel from '@/components/sections/TestimonialsCarousel';
import Footer from '@/components/navigation/Footer';
import Navbar from '@/components/navigation/Navbar';

export default function HomePage() {
  return (
    <main className="min-h-screen">
      <Navbar />
      {/* Hero Section - full width, no extra spacing */}
      <HeroSection />
      <div className="section-divider" />

      {/* Booth Showcase */}
      <Section id="booths" variant="default" spacing="none" container={false}>
        <BoothShowcase />
      </Section>
      <div className="section-divider" />

      {/* Masonry Gallery */}
      <Section id="gallery" variant="default" spacing="none" container={false}>
        <MasonryGallery />
      </Section>
      <div className="section-divider" />

      {/* Process Timeline */}
      <Section id="process" variant="default" spacing="none" container={false}>
        <ProcessTimeline />
      </Section>
      <div className="section-divider" />

      {/* Stats Counter */}
      <Section id="stats" variant="default" spacing="none" container={false}>
        <StatsCounter />
      </Section>
      <div className="section-divider" />

      {/* Logo Marquee */}
      <Section id="clients" variant="default" spacing="none" container={false}>
        <LogoMarquee />
      </Section>
      <div className="section-divider" />

      {/* Testimonials */}
      <Section id="testimonials" variant="default" spacing="none" container={false}>
        <TestimonialsCarousel />
      </Section>
      <div className="section-divider" />

      {/* FAQ Accordion */}
      <Section id="faq" variant="default" spacing="none" container={false}>
        <FAQAccordion />
      </Section>
      <div className="section-divider" />

      {/* Footer */}
      <Footer />
    </main>
  );
}