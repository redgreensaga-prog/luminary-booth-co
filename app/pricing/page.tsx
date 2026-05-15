import Link from 'next/link';

export const metadata = {
  title: 'Pricing | Luminary Booth Co.',
  description: 'Transparent pricing for luxury photo booth rentals in Los Angeles and Southern California.',
};

export default function PricingPage() {
  return (
    <main className="min-h-screen bg-black-green flex items-center justify-center px-4">
      <div className="text-center max-w-lg">
        <h1 className="text-5xl font-display font-light tracking-tight mb-6 text-textPrimary">
          Pricing
        </h1>
        <p className="text-lg text-textSecondary mb-8">
          Detailed packages and pricing are on their way. In the meantime,
          reach out for a custom quote.
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
