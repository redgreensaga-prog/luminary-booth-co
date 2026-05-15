import Link from 'next/link';

export const metadata = {
  title: 'Contact | Luminary Booth Co.',
  description: 'Get in touch with Luminary Booth Co. to book your luxury photo booth experience.',
};

export default function ContactPage() {
  return (
    <main className="min-h-screen bg-black-green flex items-center justify-center px-4">
      <div className="text-center max-w-lg">
        <h1 className="text-5xl font-display font-light tracking-tight mb-6 text-textPrimary">
          Contact Us
        </h1>
        <p className="text-lg text-textSecondary mb-4">
          Ready to elevate your event? We&apos;d love to hear from you.
        </p>
        <a
          href="mailto:hello@luminaryboothco.com"
          className="block text-xl text-gold hover:text-gold-light transition-colors mb-8"
        >
          hello@luminaryboothco.com
        </a>
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
