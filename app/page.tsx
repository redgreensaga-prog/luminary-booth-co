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

export default function HomePage() {
  return (
    <main className="min-h-screen">
      {/* Hero Section - full width, no extra spacing */}
      <HeroSection />
      
      {/* Booth Showcase */}
      <Section id="booths" variant="default" spacing="none" container={false}>
        <BoothShowcase />
      </Section>
      
      {/* Masonry Gallery */}
      <Section id="gallery" variant="default" spacing="none" container={false}>
        <MasonryGallery />
      </Section>
      
      {/* Process Timeline */}
      <Section id="process" variant="default" spacing="none" container={false}>
        <ProcessTimeline />
      </Section>
      
      {/* Stats Counter */}
      <Section id="stats" variant="default" spacing="none" container={false}>
        <StatsCounter />
      </Section>
      
      {/* Logo Marquee */}
      <Section id="clients" variant="default" spacing="none" container={false}>
        <LogoMarquee />
      </Section>
      
      {/* Testimonials */}
      <Section id="testimonials" variant="default" spacing="none" container={false}>
        <TestimonialsCarousel />
      </Section>
      
      {/* FAQ Accordion */}
      <Section id="faq" variant="default" spacing="none" container={false}>
        <FAQAccordion />
      </Section>

      {/* Footer */}
      <Footer />
    </main>
  );
}