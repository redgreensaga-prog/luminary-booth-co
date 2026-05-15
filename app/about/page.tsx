import Link from 'next/link';

export const metadata = {
  title: 'About | Luminary Booth Co.',
  description: 'Learn about Luminary Booth Co., Southern California\'s premier luxury photo booth experience.',
};

export default function AboutPage() {
  return (
    <main className="min-h-screen bg-black-green flex items-center justify-center px-4">
      <div className="text-center max-w-lg">
        <h1 className="text-5xl font-display font-light tracking-tight mb-6 text-textPrimary">
          About Us
        </h1>
        <p className="text-lg text-textSecondary mb-8">
          We&apos;re crafting this page with the same care we bring to every event.
          Check back soon.
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
