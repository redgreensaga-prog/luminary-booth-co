'use client';

import { useState, useEffect } from 'react';
import { motion, useScroll, useMotionValueEvent, AnimatePresence } from 'framer-motion';
import { cn } from '@/lib/utils';
import { MOTION } from '@/lib/tokens';
import { Menu, X } from 'lucide-react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import MobileMenu from '../navigation/MobileMenu';
import { Button } from '@/components/primitives/Button';

interface NavLink {
  href: string;
  label: string;
  icon?: React.ReactNode;
}

const NAV_LINKS: NavLink[] = [
  { href: '/', label: 'Home' },
  { href: '/about', label: 'About' },
  { href: '/services', label: 'Services' },
  { href: '/portfolio', label: 'Portfolio' },
  { href: '/pricing', label: 'Pricing' },
  { href: '/contact', label: 'Contact' },
];

/**
 * Luxury editorial navbar with scroll effects:
 * - Transparent on load
 * - Frosted glass on scroll > 60px
 * - Logo scales down 8% on scroll
 * - Active link animated underline
 * - Mobile full-screen overlay with staggered link entrance
 */
export default function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [activeLink, setActiveLink] = useState('/');
  const { scrollY } = useScroll();
  const pathname = usePathname();

  // Update active link based on current path
  useEffect(() => {
    setActiveLink(pathname);
  }, [pathname]);

  // Handle scroll effects
  useMotionValueEvent(scrollY, 'change', (latest) => {
    setIsScrolled(latest > 60);
  });

  // Prevent body scroll when mobile menu is open
  useEffect(() => {
    if (isMobileMenuOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [isMobileMenuOpen]);

  // Close mobile menu on escape key press
  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && isMobileMenuOpen) {
        setIsMobileMenuOpen(false);
      }
    };
    window.addEventListener('keydown', handleEscape);
    return () => window.removeEventListener('keydown', handleEscape);
  }, [isMobileMenuOpen]);

  // Logo animation variants
  const logoVariants = {
    initial: { scale: 1 },
    scrolled: { scale: 0.92 }, // 8% scale down
  };

  // Navbar background variants
  const navbarVariants = {
    initial: {
      backdropFilter: 'blur(0px)',
      backgroundColor: 'rgba(10, 10, 10, 0)',
      borderBottomColor: 'rgba(0, 92, 72, 0)',
    },
    scrolled: {
      backdropFilter: 'blur(12px)',
      backgroundColor: 'rgba(10, 10, 10, 0.85)',
      borderBottomColor: 'rgba(0, 92, 72, 0.15)',
    },
  };

  // Underline animation variants for active link
  const underlineVariants = {
    initial: { width: 0, left: '50%' },
    hover: { width: '100%', left: 0 },
    active: { width: '100%', left: 0 },
  };

  return (
    <>
      <motion.nav
        className={cn(
          'fixed top-0 left-0 right-0 z-50',
          'transition-colors duration-300',
          isScrolled ? 'border-b' : ''
        )}
        variants={navbarVariants}
        initial="initial"
        animate={isScrolled ? 'scrolled' : 'initial'}
        transition={{
          duration: MOTION.duration.normal / 1000,
          ease: MOTION.easing.inOut,
        }}
        style={{
          borderBottomWidth: '1px',
        }}
      >
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-20">
            {/* Logo */}
            <motion.div
              className="flex items-center"
              variants={logoVariants}
              animate={isScrolled ? 'scrolled' : 'initial'}
              transition={{
                type: 'spring',
                ...MOTION.spring.cinematic,
              }}
            >
              <motion.div
                className="relative"
                whileHover={{ scale: 1.02, transition: { duration: 0.3, ease: [0.16, 1, 0.3, 1] } }}
              >
                <Link href="/" className="group flex items-center gap-3">
                  <div className="relative">
                    <div className="w-10 h-10 rounded-full bg-gradient-to-br from-[var(--color-gold)] to-[var(--color-gold-dark)] flex items-center justify-center">
                      <span className="text-lg font-bold text-[var(--color-black)] font-display">
                        L
                      </span>
                    </div>
                    <div className="absolute inset-0 rounded-full border border-[var(--color-gold)] opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                  </div>
                  <div className="flex flex-col">
                    <span className="text-xl font-bold tracking-tight text-[var(--color-text-primary)] font-display leading-none">
                      Luminary
                    </span>
                    <span className="text-xs tracking-widest text-[var(--color-text-secondary)] uppercase">
                      Booth Co.
                    </span>
                  </div>
                </Link>
                <motion.div
                  className="h-px bg-gold w-full"
                  initial={{ scaleX: 0 }}
                  whileHover={{ scaleX: 1 }}
                  transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
                  style={{ originX: 0 }}
                />
              </motion.div>
            </motion.div>

            {/* Desktop Navigation */}
            <div className="hidden lg:flex items-center space-x-8">
              {NAV_LINKS.map((link) => {
                const isActive = activeLink === link.href;
                return (
                  <div key={link.href} className="relative">
                    <Link
                      href={link.href}
                      className={cn(
                        'relative px-1 py-2 text-sm font-medium tracking-wider transition-colors duration-300',
                        isActive
                          ? 'text-[var(--color-gold)]'
                          : 'text-[var(--color-text-secondary)] hover:text-[var(--color-gold)]'
                      )}
                      onMouseEnter={() => setActiveLink(link.href)}
                      onMouseLeave={() => setActiveLink(pathname)}
                    >
                      {link.label}
                      {isActive && (
                        <motion.div
                          className="absolute bottom-0 h-[2px] bg-gradient-to-r from-[var(--color-gold)] to-[var(--color-gold-light)] rounded-full"
                          layoutId="navbar-active-indicator"
                          initial={false}
                          transition={{
                            type: 'spring',
                            stiffness: 350,
                            damping: 30,
                          }}
                        />
                      )}
                    </Link>
                    {/* Hover underline */}
                    {!isActive && (
                      <motion.div
                        className="absolute bottom-0 h-[1px] bg-gradient-to-r from-transparent via-[var(--color-gold-transparent-50)] to-transparent"
                        variants={underlineVariants}
                        initial="initial"
                        whileHover="hover"
                        transition={{
                          duration: MOTION.duration.fast / 1000,
                          ease: MOTION.easing.editorial,
                        }}
                      />
                    )}
                  </div>
                );
              })}
            </div>

            {/* Desktop CTA Button */}
            <div className="hidden lg:block">
              <Button variant="primary" size="md" className="btn-glow">
                Book Now
              </Button>
            </div>

            {/* Mobile Menu Toggle */}
            <button
              className="lg:hidden relative w-10 h-10 flex items-center justify-center rounded-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-gold focus-visible:ring-offset-2 focus-visible:ring-offset-black"
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              aria-label={isMobileMenuOpen ? 'Close menu' : 'Open menu'}
            >
              <motion.div
                className="relative w-6 h-6"
                initial={false}
                animate={isMobileMenuOpen ? 'open' : 'closed'}
              >
                <motion.span
                  className="absolute top-1/2 left-1/2 w-6 h-0.5 bg-[var(--color-gold)] rounded-full"
                  style={{ x: '-50%', y: '-50%' }}
                  variants={{
                    closed: { rotate: 0, y: '-6px' },
                    open: { rotate: 45, y: '-50%' },
                  }}
                  transition={{ duration: 0.3, ease: 'easeInOut' }}
                />
                <motion.span
                  className="absolute top-1/2 left-1/2 w-6 h-0.5 bg-[var(--color-gold)] rounded-full"
                  style={{ x: '-50%', y: '-50%' }}
                  variants={{
                    closed: { opacity: 1 },
                    open: { opacity: 0 },
                  }}
                  transition={{ duration: 0.2 }}
                />
                <motion.span
                  className="absolute top-1/2 left-1/2 w-6 h-0.5 bg-[var(--color-gold)] rounded-full"
                  style={{ x: '-50%', y: '-50%' }}
                  variants={{
                    closed: { rotate: 0, y: '6px' },
                    open: { rotate: -45, y: '-50%' },
                  }}
                  transition={{ duration: 0.3, ease: 'easeInOut' }}
                />
              </motion.div>
            </button>
          </div>
        </div>
      </motion.nav>

      {/* Mobile Menu Overlay */}
      <AnimatePresence mode="wait">
        {isMobileMenuOpen && (
          <MobileMenu
            links={NAV_LINKS}
            activeLink={activeLink}
            onClose={() => setIsMobileMenuOpen(false)}
          />
        )}
      </AnimatePresence>
    </>
  );
}