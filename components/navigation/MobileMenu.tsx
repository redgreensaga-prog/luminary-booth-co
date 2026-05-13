'use client';

import { useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { cn } from '@/lib/utils';
import { MOTION, COLORS } from '@/lib/tokens';
import Link from 'next/link';
import { X } from 'lucide-react';

interface MobileMenuProps {
  links: Array<{ href: string; label: string; icon?: React.ReactNode }>;
  activeLink: string;
  onClose: () => void;
}

/**
 * Mobile full-screen overlay menu with:
 * - Hamburger → X morphing SVG animation
 * - Overlay with blur background
 * - Links staggered entrance animation
 * - Close on link click, Escape key, outside click
 */
export default function MobileMenu({ links, activeLink, onClose }: MobileMenuProps) {
  const menuRef = useRef<HTMLDivElement>(null);

  // Close on Escape key
  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };
    window.addEventListener('keydown', handleEscape);
    return () => window.removeEventListener('keydown', handleEscape);
  }, [onClose]);

  // Close on outside click
  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (menuRef.current && !menuRef.current.contains(e.target as Node)) {
        onClose();
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, [onClose]);

  // Overlay animation variants
  const overlayVariants = {
    closed: {
      opacity: 0,
      transition: {
        duration: MOTION.duration.normal / 1000,
        ease: MOTION.easing.editorial,
        staggerChildren: 0.05,
        staggerDirection: -1,
      },
    },
    open: {
      opacity: 1,
      transition: {
        duration: MOTION.duration.normal / 1000,
        ease: MOTION.easing.editorial,
        staggerChildren: 0.05,
        delayChildren: 0.1,
      },
    },
  };

  // Menu container variants
  const menuVariants = {
    closed: {
      y: '-100%',
      opacity: 0,
      transition: {
        duration: MOTION.duration.normal / 1000,
        ease: MOTION.easing.cinematic,
      },
    },
    open: {
      y: 0,
      opacity: 1,
      transition: {
        duration: MOTION.duration.slow / 1000,
        ease: MOTION.easing.cinematic,
        staggerChildren: 0.05,
        delayChildren: 0.2,
      },
    },
  };

  // Link item variants
  const itemVariants = {
    closed: {
      x: -50,
      opacity: 0,
      transition: {
        duration: MOTION.duration.fast / 1000,
        ease: MOTION.easing.in,
      },
    },
    open: {
      x: 0,
      opacity: 1,
      transition: {
        duration: MOTION.duration.slow / 1000,
        ease: MOTION.easing.editorial,
      },
    },
  };

  // Link underline variants
  const linkUnderlineVariants = {
    initial: { scaleX: 0, originX: 0 },
    hover: { scaleX: 1 },
    active: { scaleX: 1 },
  };

  return (
    <AnimatePresence mode="wait">
      <motion.div
        className="fixed inset-0 z-[60]"
        initial="closed"
        animate="open"
        exit="closed"
        variants={overlayVariants}
      >
        {/* Background overlay with blur */}
        <motion.div
          className="absolute inset-0"
          variants={{
            closed: { backdropFilter: 'blur(0px)' },
            open: { backdropFilter: 'blur(16px)' },
          }}
          transition={{ duration: 0.5 }}
        >
          <div className="absolute inset-0 bg-[var(--color-black-transparent-70)]" />
        </motion.div>

        {/* Menu container */}
        <motion.div
          ref={menuRef}
          className="relative h-full w-full flex flex-col items-center justify-center px-6"
          variants={menuVariants}
        >
          {/* Close button */}
          <motion.button
            className="absolute top-8 right-8 w-12 h-12 flex items-center justify-center rounded-full bg-[var(--color-black-transparent-30)] border border-[var(--color-gold-transparent-30)]"
            onClick={onClose}
            aria-label="Close menu"
            whileHover={{ scale: 1.1, backgroundColor: 'rgba(10, 10, 10, 0.5)' }}
            whileTap={{ scale: 0.95 }}
            transition={{ type: 'spring', ...MOTION.spring.gentle }}
          >
            <X className="w-6 h-6 text-[var(--color-gold)]" />
          </motion.button>

          {/* Logo */}
          <motion.div
            className="mb-12"
            initial={{ y: -20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{
              delay: 0.3,
              duration: MOTION.duration.slow / 1000,
              ease: MOTION.easing.editorial,
            }}
          >
            <div className="flex flex-col items-center gap-3">
              <div className="w-16 h-16 rounded-full bg-gradient-to-br from-[var(--color-gold)] to-[var(--color-gold-dark)] flex items-center justify-center">
                <span className="text-2xl font-bold text-[var(--color-black)] font-display">
                  L
                </span>
              </div>
              <div className="flex flex-col items-center">
                <span className="text-3xl font-bold tracking-tight text-[var(--color-text-primary)] font-display leading-none">
                  Luminary
                </span>
                <span className="text-sm tracking-widest text-[var(--color-text-secondary)] uppercase">
                  Booth Co.
                </span>
              </div>
            </div>
          </motion.div>

          {/* Navigation links */}
          <nav className="flex flex-col items-center gap-6 w-full max-w-md">
            {links.map((link, index) => {
              const isActive = activeLink === link.href;
              return (
                <motion.div
                  key={link.href}
                  className="relative w-full"
                  variants={itemVariants}
                  custom={index}
                >
                  <Link
                    href={link.href}
                    className={cn(
                      'block py-4 text-center text-xl font-medium tracking-wider transition-colors duration-300',
                      isActive
                        ? 'text-[var(--color-gold)]'
                        : 'text-[var(--color-text-primary)] hover:text-[var(--color-gold)]'
                    )}
                    onClick={onClose}
                  >
                    {link.label}
                    {isActive && (
                      <motion.div
                        className="absolute bottom-2 left-1/2 h-[2px] w-3/4 -translate-x-1/2 bg-gradient-to-r from-[var(--color-gold)] to-[var(--color-gold-light)] rounded-full"
                        layoutId="mobile-navbar-active-indicator"
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
                      className="absolute bottom-2 left-1/2 h-[1px] w-3/4 -translate-x-1/2 bg-gradient-to-r from-transparent via-[var(--color-gold-transparent-30)] to-transparent"
                      variants={linkUnderlineVariants}
                      initial="initial"
                      whileHover="hover"
                      transition={{
                        duration: MOTION.duration.normal / 1000,
                        ease: MOTION.easing.editorial,
                      }}
                    />
                  )}
                </motion.div>
              );
            })}
          </nav>

          {/* CTA Button */}
          <motion.div
            className="mt-12"
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{
              delay: 0.5,
              duration: MOTION.duration.slow / 1000,
              ease: MOTION.easing.editorial,
            }}
          >
            <button
              className="group relative px-8 py-4 text-base font-medium tracking-wider uppercase transition-all duration-300"
              onClick={onClose}
            >
              <span className="relative z-10 text-[var(--color-gold)] group-hover:text-[var(--color-black)] transition-colors duration-300">
                Book a Consultation
              </span>
              <div className="absolute inset-0 border border-[var(--color-gold)] rounded-sm group-hover:bg-[var(--color-gold)] transition-all duration-300"></div>
              <div className="absolute inset-0 border border-[var(--color-gold)] rounded-sm translate-x-1 translate-y-1 opacity-0 group-hover:translate-x-0 group-hover:translate-y-0 group-hover:opacity-30 transition-all duration-300"></div>
            </button>
          </motion.div>

          {/* Contact info */}
          <motion.div
            className="mt-12 text-center"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{
              delay: 0.6,
              duration: MOTION.duration.slow / 1000,
            }}
          >
            <p className="text-sm text-[var(--color-text-tertiary)] mb-2">
              inquiries@luminarybooth.co
            </p>
            <p className="text-sm text-[var(--color-text-tertiary)]">
              +1 (555) 123-4567
            </p>
          </motion.div>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
}