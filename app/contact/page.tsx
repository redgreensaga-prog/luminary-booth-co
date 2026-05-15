import Navbar from '@/components/navigation/Navbar';
import Footer from '@/components/navigation/Footer';

export const metadata = {
  title: 'Contact | Luminary Booth Co.',
  description: 'Get in touch with Luminary Booth Co. to book your luxury photo booth experience.',
};

export default function ContactPage() {
  return (
    <main className="bg-black-green min-h-screen">
      <Navbar />
      <section className="flex flex-col items-center justify-center min-h-screen text-center px-6">
        <p className="text-gold font-sans text-sm tracking-[0.3em] uppercase mb-6">
          Luminary Booth Co.
        </p>
        <h1 className="font-display text-textPrimary text-7xl font-light mb-6">
          Let&apos;s Talk
        </h1>
        <p className="text-textPrimary/50 font-sans text-lg max-w-md leading-relaxed">
          Tell us about your event and we&apos;ll craft something extraordinary together.
        </p>
        <a
          href="mailto:hello@luminaryboothco.com"
          className="mt-8 text-gold hover:text-goldLight transition-colors text-lg"
        >
          hello@luminaryboothco.com
        </a>
      </section>
      <Footer />
    </main>
  );
}
