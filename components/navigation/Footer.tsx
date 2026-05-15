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
  Send,
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

const YoutubeIcon = ({ className }: { className?: string }) => (
  <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M22.54 6.42a2.78 2.78 0 0 0-1.94-2C18.88 4 12 4 12 4s-6.88 0-8.6.46a2.78 2.78 0 0 0-1.94 2A29 29 0 0 0 1 12a29 29 0 0 0 .46 5.58 2.78 2.78 0 0 0 1.94 2C5.12 20 12 20 12 20s6.88 0 8.6-.46a2.78 2.78 0 0 0 1.94-2A29 29 0 0 0 23 12a29 29 0 0 0-.46-5.58z" />
    <polygon points="9.75 15.02 15.5 12 9.75 8.98 9.75 15.02" />
  </svg>
);

interface SocialLink {
  name: string;
  href: string;
  icon: React.ReactNode;
}

const socialLinks: SocialLink[] = [
  { name: 'Instagram', href: '#', icon: <InstagramIcon className="w-5 h-5" /> },
  { name: 'Facebook', href: '#', icon: <FacebookIcon className="w-5 h-5" /> },
  { name: 'Twitter', href: '#', icon: <TwitterIcon className="w-5 h-5" /> },
  { name: 'Youtube', href: '#', icon: <YoutubeIcon className="w-5 h-5" /> },
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
    <footer className="bg-black text-white border-t border-gray-800">
      {/* Main footer content */}
      <motion.div
        className="max-w-7xl mx-auto px-4 py-16 md:py-24"
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
                <span className="text-2xl font-display font-bold tracking-wider text-gold">
                  {copy.business.name}
                </span>
              </Link>
            </motion.div>
            <motion.p custom={1} variants={brandVariants} className="text-white/60 mb-8 max-w-sm leading-relaxed">
              Southern California&apos;s premier luxury photo booth experience.
              Elevating events with bespoke photography, artisanal design, and
              unforgettable memories since 2018.
            </motion.p>
            {/* Social links */}
            <motion.div custom={2} variants={brandVariants} className="flex items-center gap-4">
              {socialLinks.map((social) => (
                <Link
                  key={social.name}
                  href={social.href}
                  aria-label={social.name}
                  className="w-10 h-10 rounded-full border border-white/20 flex items-center justify-center text-white/50 hover:text-gold hover:border-[var(--color-gold-transparent-50)] transition-colors"
                >
                  {social.icon}
                </Link>
              ))}
            </motion.div>
          </div>

          {/* Services column */}
          <motion.div custom={0} variants={columnVariants} className="lg:col-span-2">
            <h3 className="text-xs font-semibold tracking-widest uppercase text-gold mb-6">
              Services
            </h3>
            <ul className="space-y-4">
              {footerLinks.services.map((link) => (
                <li key={link.label}>
                  <Link href={link.href} className="text-white/60 hover:text-gold transition-colors text-sm">
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </motion.div>

          {/* Company column */}
          <motion.div custom={1} variants={columnVariants} className="lg:col-span-2">
            <h3 className="text-xs font-semibold tracking-widest uppercase text-gold mb-6">
              Company
            </h3>
            <ul className="space-y-4">
              {footerLinks.company.map((link) => (
                <li key={link.label}>
                  <Link href={link.href} className="text-white/60 hover:text-gold transition-colors text-sm">
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </motion.div>

          {/* Support column */}
          <motion.div custom={2} variants={columnVariants} className="lg:col-span-2">
            <h3 className="text-xs font-semibold tracking-widest uppercase text-gold mb-6">
              Support
            </h3>
            <ul className="space-y-4">
              {footerLinks.support.map((link) => (
                <li key={link.label}>
                  <Link href={link.href} className="text-white/60 hover:text-gold transition-colors text-sm">
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </motion.div>

          {/* Contact + Newsletter */}
          <motion.div custom={3} variants={columnVariants} className="lg:col-span-2">
            <h3 className="text-xs font-semibold tracking-widest uppercase text-gold mb-6">
              Contact
            </h3>
            <ul className="space-y-4 mb-8">
              <li>
                <a href={`mailto:${copy.business.email}`} className="flex items-start gap-3 text-white/60 hover:text-gold transition-colors text-sm">
                  <Mail className="w-4 h-4 mt-0.5 shrink-0 text-[var(--color-gold-transparent-70)]" />
                  <span>{copy.business.email}</span>
                </a>
              </li>
              <li>
                <a href={`tel:${copy.business.phone}`} className="flex items-start gap-3 text-white/60 hover:text-gold transition-colors text-sm">
                  <Phone className="w-4 h-4 mt-0.5 shrink-0 text-[var(--color-gold-transparent-70)]" />
                  <span>{copy.business.phone}</span>
                </a>
              </li>
              <li>
                <span className="flex items-start gap-3 text-white/60 text-sm">
                  <MapPin className="w-4 h-4 mt-0.5 shrink-0 text-[var(--color-gold-transparent-70)]" />
                  <span>{copy.business.location}</span>
                </span>
              </li>
            </ul>

            {/* Newsletter */}
            <div>
              <h4 className="text-[11px] font-semibold tracking-widest uppercase text-white/40 mb-3">
                Newsletter
              </h4>
              <div className="flex">
                <input
                  type="email"
                  placeholder="Your email"
                  className="bg-white/5 border border-white/10 px-4 py-2.5 text-sm text-white placeholder:text-white/30 w-full focus:outline-none focus:border-[var(--color-gold-transparent-50)] transition-colors"
                />
                <button
                  aria-label="Subscribe"
                  className="bg-[var(--color-gold)] hover:bg-[var(--color-gold-light)] text-black px-4 flex items-center justify-center transition-colors"
                >
                  <Send className="w-4 h-4" />
                </button>
              </div>
            </div>
          </motion.div>
        </div>
      </motion.div>

      {/* Bottom bar */}
      <motion.div
        className="border-t border-gray-800 py-6"
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true }}
        variants={bottomBarVariants}
      >
        <div className="max-w-7xl mx-auto px-4 flex flex-col md:flex-row items-center justify-between gap-4">
          <p className="text-white/40 text-xs">
            &copy; {currentYear} {copy.business.name}. All rights reserved.
          </p>
          <div className="flex items-center gap-6">
            <Link href="#" className="text-white/40 hover:text-gold text-xs transition-colors">
              Privacy Policy
            </Link>
            <Link href="#" className="text-white/40 hover:text-gold text-xs transition-colors">
              Terms of Service
            </Link>
          </div>
        </div>
      </motion.div>
    </footer>
  );
}
