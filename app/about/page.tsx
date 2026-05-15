import Navbar from '@/components/navigation/Navbar';
import Footer from '@/components/navigation/Footer';

export const metadata = {
  title: 'About | Luminary Booth Co.',
  description: 'Learn about Luminary Booth Co., Southern California\'s premier luxury photo booth experience.',
};

export default function AboutPage() {
  return (
    <main className="bg-black-green min-h-screen">
      <Navbar />
      <section className="flex flex-col items-center justify-center min-h-screen text-center px-6">
        <p className="text-gold font-sans text-sm tracking-[0.3em] uppercase mb-6">
          Luminary Booth Co.
        </p>
        <h1 className="font-display text-textPrimary text-7xl font-light mb-6">
          Our Story
        </h1>
        <p className="text-textPrimary/50 font-sans text-lg max-w-md leading-relaxed">
          Crafted obsession, editorial precision, unforgettable moments.
        </p>
      </section>
      <Footer />
    </main>
  );
}
