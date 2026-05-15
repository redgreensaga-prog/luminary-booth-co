import Navbar from '@/components/navigation/Navbar';
import Footer from '@/components/navigation/Footer';

export const metadata = {
  title: 'Services | Luminary Booth Co.',
  description: 'Explore our luxury photo booth services — weddings, corporate events, product launches, and more.',
};

export default function ServicesPage() {
  return (
    <main className="bg-black-green min-h-screen">
      <Navbar />
      <section className="flex flex-col items-center justify-center min-h-screen text-center px-6">
        <p className="text-gold font-sans text-sm tracking-[0.3em] uppercase mb-6">
          Luminary Booth Co.
        </p>
        <h1 className="font-display text-textPrimary text-7xl font-light mb-6">
          What We Do
        </h1>
        <p className="text-textPrimary/50 font-sans text-lg max-w-md leading-relaxed">
          Every service designed for the extraordinary.
        </p>
      </section>
      <Footer />
    </main>
  );
}
