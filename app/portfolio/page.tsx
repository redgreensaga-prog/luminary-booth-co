import Navbar from '@/components/navigation/Navbar';
import Footer from '@/components/navigation/Footer';

export const metadata = {
  title: 'Portfolio | Luminary Booth Co.',
  description: 'Browse our portfolio of luxury photo booth experiences from weddings, galas, and editorial shoots.',
};

export default function PortfolioPage() {
  return (
    <main className="bg-black-green min-h-screen">
      <Navbar />
      <section className="flex flex-col items-center justify-center min-h-screen text-center px-6">
        <p className="text-gold font-sans text-sm tracking-[0.3em] uppercase mb-6">
          Luminary Booth Co.
        </p>
        <h1 className="font-display text-textPrimary text-7xl font-light mb-6">
          Our Work
        </h1>
        <p className="text-textPrimary/50 font-sans text-lg max-w-md leading-relaxed">
          A curated collection of our finest moments.
        </p>
      </section>
      <Footer />
    </main>
  );
}
