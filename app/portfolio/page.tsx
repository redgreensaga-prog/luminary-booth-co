import Link from 'next/link';

export const metadata = {
  title: 'Portfolio | Luminary Booth Co.',
  description: 'Browse our portfolio of luxury photo booth experiences from weddings, galas, and editorial shoots.',
};

export default function PortfolioPage() {
  return (
    <main className="min-h-screen bg-black-green flex items-center justify-center px-4">
      <div className="text-center max-w-lg">
        <h1 className="text-5xl font-display font-light tracking-tight mb-6 text-textPrimary">
          Portfolio
        </h1>
        <p className="text-lg text-textSecondary mb-8">
          Our full gallery is being curated. Come back soon to explore our work.
        </p>
        <Link
          href="/"
          className="inline-flex items-center gap-2 px-6 py-3 rounded-lg bg-gold hover:bg-gold-light text-black font-semibold text-sm transition-all duration-300"
        >
          Back to Home
        </Link>
      </div>
    </main>
  );
}
