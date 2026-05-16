'use client';

import { cn } from '@/lib/utils';
import { copy } from '@/content/copy';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { useEffect, useState } from 'react';
import { MOTION } from '@/lib/tokens';
import {
  Mail,
  Phone,
  MapPin,
} from 'lucide-react';

/* ── Inline SVG social icons ── */
const InstagramIcon = ({ className }: { className?: string }) => (
  <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <rect x="2" y="2" width="20" height="20" rx="5" ry="5" />
    <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
    <line x1="17.5" y1="6.5" x2="17.51" y2="6.5" />
  </svg>
);

const FacebookIcon = ({ className }: { className?: string }) => (
  <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z" />
  </svg>
);

const TwitterIcon = ({ className }: { className?: string }) => (
  <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M22 4s-.7 2.1-2 3.4c1.6 10-9.4 17.3-18 11.6 2.2.1 4.4-.6 6-2C3 15.5.5 9.6 3 5c2.2 2.6 5.6 4.1 9 4-.9-4.2 4-6.6 7-3.8 1.1 0 3-1.2 3-1.2z" />
  </svg>
);

const PinterestIcon = ({ className }: { className?: string }) => (
  <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M12 2C6.477 2 2 6.477 2 12c0 4.236 2.636 7.855 6.356 9.312-.088-.791-.167-2.005.035-2.868.181-.78 1.172-4.97 1.172-4.97s-.299-.598-.299-1.482c0-1.388.806-2.428 1.808-2.428.852 0 1.265.64 1.265 1.408 0 .858-.546 2.14-.828 3.33-.236.995.499 1.806 1.476 1.806 1.771 0 3.132-1.867 3.132-4.562 0-2.387-1.715-4.053-4.163-4.053-2.836 0-4.5 2.126-4.5 4.323 0 .856.33 1.772.741 2.273a.3.3 0 0 1 .069.286c-.076.315-.244.995-.277 1.134-.044.183-.146.222-.337.134-1.249-.581-2.03-2.407-2.03-3.874 0-3.154 2.292-6.052 6.608-6.052 3.469 0 6.165 2.473 6.165 5.776 0 3.447-2.173 6.22-5.19 6.22-1.013 0-1.966-.527-2.292-1.148l-.623 2.378c-.226.869-.835 1.958-1.244 2.621.937.29 1.931.446 2.962.446 5.523 0 10-4.477 10-10S17.523 2 12 2z" />
  </svg>
);

interface SocialLink {
  name: string;
  href: string;
  icon: React.ReactNode;
}

const socialLinks: SocialLink[] = [
  { name: 'Instagram', href: 'https://www.instagram.com/luminaryboothco/', icon: <InstagramIcon className="w-5 h-5" /> },
  { name: 'Facebook', href: 'https://www.facebook.com/luminaryboothco/', icon: <FacebookIcon className="w-5 h-5" /> },
  { name: 'Twitter', href: 'https://twitter.com/luminaryboothco', icon: <TwitterIcon className="w-5 h-5" /> },
  { name: 'Pinterest', href: 'https://www.pinterest.com/luminaryboothco/', icon: <PinterestIcon className="w-5 h-5" /> },
];

const footerLinks = {
  services: [
    { label: 'Weddings', href: '#' },
    { label: 'Corporate Events', href: '#' },
    { label: 'Private Parties', href: '#' },
    { label: 'Product Launches', href: '#' },
    { label: 'Custom Backdrops', href: '#' },
  ],
  company: [
    { label: 'About Us', href: '#' },
    { label: 'Our Work', href: '#gallery' },
    { label: 'Testimonials', href: '#testimonials' },
    { label: 'FAQ', href: '#faq' },
    { label: 'Contact', href: '#contact' },
  ],
  support: [
    { label: 'Help Center', href: '#' },
    { label: 'Terms of Service', href: '#' },
    { label: 'Privacy Policy', href: '#' },
    { label: 'Cancellation Policy', href: '#' },
  ],
};

const currentYear = new Date().getFullYear();

export default function Footer() {
  const [prefersReduced, setPrefersReduced] = useState(false);

  useEffect(() => {
    setPrefersReduced(window.matchMedia('(prefers-reduced-motion: reduce)').matches);
  }, []);

  const dur = prefersReduced ? 0 : MOTION.duration.slow / 1000;
  const fastDur = prefersReduced ? 0 : MOTION.duration.normal / 1000;

  const containerVariants = {
    hidden: { opacity: 0, y: prefersReduced ? 0 : 30 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: dur,
        ease: MOTION.easing.editorial,
        staggerChildren: MOTION.stagger.normal,
      },
    },
  };

  const brandVariants = {
    hidden: { opacity: 0, y: prefersReduced ? 0 : 20 },
    visible: (i: number) => ({
      opacity: 1,
      y: 0,
      transition: {
        delay: prefersReduced ? 0 : i * MOTION.stagger.normal,
        duration: dur,
        ease: MOTION.easing.editorial,
      },
    }),
  };

  const columnVariants = {
    hidden: { opacity: 0, y: prefersReduced ? 0 : 20 },
    visible: (i: number) => ({
      opacity: 1,
      y: 0,
      transition: {
        delay: prefersReduced ? 0 : (i + 2) * MOTION.stagger.normal,
        duration: dur,
        ease: MOTION.easing.editorial,
      },
    }),
  };

  const bottomBarVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        delay: prefersReduced ? 0 : 6 * MOTION.stagger.normal,
        duration: fastDur,
        ease: MOTION.easing.inOut,
      },
    },
  };

  return (
    <footer className="bg-[var(--forest-deep)] text-[var(--cream)] border-t border-[var(--cream-faint)]">
      {/* Main footer content */}
      <motion.div
        className="max-w-7xl mx-auto px-4 py-12 md:py-16"
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: '-80px' }}
        variants={containerVariants}
      >
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-12 lg:gap-8">
          {/* Brand / About */}
          <div className="lg:col-span-4">
            <motion.div custom={0} variants={brandVariants}>
              <Link href="/" className="inline-block mb-6">
                <span className="text-2xl font-display font-light tracking-wider text-[var(--cream)]">
                  {copy.business.name}
                </span>
              </Link>
            </motion.div>
            <motion.p custom={1} variants={brandVariants} className="text-[var(--cream-muted)] mb-8 max-w-sm leading-relaxed">
              Southern California&apos;s premier luxury photo booth experience.
              Elevating events with bespoke photography, artisanal design, and
              unforgettable memories since 2018.
            </motion.p>
            {/* Social links */}
            <motion.div custom={2} variants={brandVariants} className="flex items-center gap-4">
              {socialLinks.map((social) => (
                <a
                  key={social.name}
                  href={social.href}
                  aria-label={social.name}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-10 h-10 rounded-full border border-[var(--cream-faint)] flex items-center justify-center text-[var(--cream-muted)] hover:text-[var(--cream)] hover:border-[var(--color-gold-transparent-50)] transition-colors"
                >
                  {social.icon}
                </a>
              ))}
            </motion.div>
          </div>

          {/* Services column */}
          <motion.div custom={0} variants={columnVariants} className="lg:col-span-2">
            <h3 className="text-xs font-medium tracking-widest uppercase text-[var(--cream)] mb-6">
              Services
            </h3>
            <ul className="space-y-4">
              {footerLinks.services.map((link) => (
                <li key={link.label}>
                  <Link href={link.href} className="text-[var(--cream-muted)] hover:text-[var(--cream)] transition-colors text-sm">
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </motion.div>

          {/* Company column */}
          <motion.div custom={1} variants={columnVariants} className="lg:col-span-2">
            <h3 className="text-xs font-medium tracking-widest uppercase text-[var(--cream)] mb-6">
              Company
            </h3>
            <ul className="space-y-4">
              {footerLinks.company.map((link) => (
                <li key={link.label}>
                  <Link href={link.href} className="text-[var(--cream-muted)] hover:text-[var(--cream)] transition-colors text-sm">
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </motion.div>

          {/* Support column */}
          <motion.div custom={2} variants={columnVariants} className="lg:col-span-2">
            <h3 className="text-xs font-medium tracking-widest uppercase text-[var(--cream)] mb-6">
              Support
            </h3>
            <ul className="space-y-4">
              {footerLinks.support.map((link) => (
                <li key={link.label}>
                  <Link href={link.href} className="text-[var(--cream-muted)] hover:text-[var(--cream)] transition-colors text-sm">
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </motion.div>

          {/* Contact + Newsletter */}
          <motion.div custom={3} variants={columnVariants} className="lg:col-span-2">
            <h3 className="text-xs font-medium tracking-widest uppercase text-[var(--cream)] mb-6">
              Contact
            </h3>
            <ul className="space-y-4 mb-8">
              <li>
                <a href={`mailto:${copy.business.email}`} className="flex items-start gap-3 text-[var(--cream-muted)] hover:text-[var(--cream)] transition-colors text-sm">
                  <Mail className="w-4 h-4 mt-0.5 shrink-0 text-[var(--color-gold-transparent-70)]" />
                  <span>{copy.business.email}</span>
                </a>
              </li>
              <li>
                <a href={`tel:${copy.business.phone}`} className="flex items-start gap-3 text-[var(--cream-muted)] hover:text-[var(--cream)] transition-colors text-sm">
                  <Phone className="w-4 h-4 mt-0.5 shrink-0 text-[var(--color-gold-transparent-70)]" />
                  <span>{copy.business.phone}</span>
                </a>
              </li>
              <li>
                <span className="flex items-start gap-3 text-[var(--cream-muted)] text-sm">
                  <MapPin className="w-4 h-4 mt-0.5 shrink-0 text-[var(--color-gold-transparent-70)]" />
                  <span>{copy.business.location}</span>
                </span>
              </li>
            </ul>

            {/* Email contact */}
            <div>
              <h4 className="text-[11px] font-medium tracking-widest uppercase text-[var(--cream-faint)] mb-3">
                Get in Touch
              </h4>
              <a
                href={`mailto:${copy.business.email}`}
                className="text-sm text-[var(--color-gold)] hover:text-[var(--color-gold-light)] transition-colors"
              >
                {copy.business.email}
              </a>
            </div>
          </motion.div>
        </div>
      </motion.div>

      {/* Bottom bar */}
      <motion.div
        className="border-t border-[var(--cream-faint)] py-6"
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true }}
        variants={bottomBarVariants}
      >
        <div className="max-w-7xl mx-auto px-4 flex flex-col md:flex-row items-center justify-between gap-4">
          <p className="text-[var(--cream-faint)] text-xs">
            &copy; {currentYear} {copy.business.name}. All rights reserved.
          </p>
          <div className="flex items-center gap-6">
            <Link href="#" className="text-[var(--cream-faint)] hover:text-[var(--cream)] text-xs transition-colors">
              Privacy Policy
            </Link>
            <Link href="#" className="text-[var(--cream-faint)] hover:text-[var(--cream)] text-xs transition-colors">
              Terms of Service
            </Link>
          </div>
        </div>
      </motion.div>
    </footer>
  );
}
