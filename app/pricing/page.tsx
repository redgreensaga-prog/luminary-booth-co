import Navbar from '@/components/navigation/Navbar';
import Footer from '@/components/navigation/Footer';

export const metadata = {
  title: 'Pricing | Luminary Booth Co.',
  description: 'Transparent pricing for luxury photo booth rentals in Los Angeles and Southern California.',
};

export default function PricingPage() {
  return (
    <main className="bg-black-green min-h-screen">
      <Navbar />
      <section className="flex flex-col items-center justify-center min-h-screen text-center px-6">
        <p className="text-gold font-sans text-sm tracking-[0.3em] uppercase mb-6">
          Luminary Booth Co.
        </p>
        <h1 className="font-display text-textPrimary text-7xl font-light mb-6">
          Investment
        </h1>
        <p className="text-textPrimary/50 font-sans text-lg max-w-md leading-relaxed">
          Transparent pricing for exceptional experiences.
        </p>
      </section>
      <Footer />
    </main>
  );
}
