'use client';

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { cn } from '@/lib/utils';
import { COPY } from '@/content/copy';
import { MOTION } from '@/lib/tokens';
import Link from 'next/link';

interface FAQAccordionProps {
  className?: string;
  maxOpen?: number; // Allow multiple open items
}

export function FAQAccordion({ className, maxOpen = 1 }: FAQAccordionProps) {
  const { items } = COPY.faq;
  const [openIndexes, setOpenIndexes] = useState<number[]>([]);

  const toggleItem = (index: number) => {
    setOpenIndexes(prev => {
      if (prev.includes(index)) {
        // Close this item
        return prev.filter(i => i !== index);
      } else {
        // Open this item, respecting maxOpen
        const newOpen = [...prev, index];
        if (newOpen.length > maxOpen) {
          // Remove the oldest opened item
          newOpen.shift();
        }
        return newOpen;
      }
    });
  };

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: MOTION.stagger.normal,
        delayChildren: 0.2
      }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: MOTION.duration.normal / 1000,
        ease: MOTION.easing.editorial
      }
    }
  };

  const contentVariants = {
    collapsed: { opacity: 0, height: 0 },
    expanded: {
      opacity: 1,
      height: 'auto',
      transition: {
        duration: MOTION.duration.slow / 1000,
        ease: MOTION.easing.inOut
      }
    }
  };

  const iconVariants = {
    collapsed: { rotate: 0 },
    expanded: { rotate: 45 }
  };

  return (
    <section className={cn('py-20 relative overflow-hidden bg-surface', className)}>
      <div className="container mx-auto px-4 max-w-4xl">
        {/* Section header */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-100px' }}
          transition={{ duration: 0.8, ease: MOTION.easing.cinematic }}
          className="text-center mb-16"
        >
          <p className="section-label inline-block text-xs font-semibold tracking-widest uppercase text-gold mb-4">
            Questions
          </p>
          <h2 className="text-4xl md:text-5xl font-display font-light tracking-tight mb-4">
            {COPY.faq.title}
          </h2>
          <p className="text-lg md:text-xl text-textSecondary max-w-2xl mx-auto">
            {COPY.faq.subtitle}
          </p>
        </motion.div>

        {/* FAQ items */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-50px' }}
          className="space-y-4"
        >
          {items.map((item, index) => {
            const isOpen = openIndexes.includes(index);

            return (
              <motion.div
                key={index}
                variants={itemVariants}
                className={cn(
                  'group rounded-xl border',
                  'bg-gradient-to-b from-[var(--color-gray-dark)] to-[var(--color-black)]',
                  'backdrop-blur-sm',
                  'transition-all duration-300',
                  isOpen
                    ? 'border-[var(--color-gold-transparent-30)] shadow-[0_0_20px_0_rgba(0,92,72,0.15)]'
                    : 'border-[var(--color-gray-medium)] hover:border-[var(--color-gold-transparent-20)]'
                )}
              >
                {/* Question header */}
                <button
                  onClick={() => toggleItem(index)}
                  className="w-full p-6 md:p-8 text-left flex items-center justify-between gap-6 group focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--color-gold-transparent-50)] focus-visible:ring-inset rounded-xl"
                  aria-expanded={isOpen}
                >
                  <div className="flex-1">
                    <div className="flex items-center gap-4 mb-2">
                      <span className="text-gold font-display text-lg font-light">
                        Q{index + 1}
                      </span>
                      <h3 className="text-xl md:text-2xl font-display font-light text-textPrimary group-hover:text-goldLight transition-colors duration-300">
                        {item.question}
                      </h3>
                    </div>
                  </div>

                  {/* Expand/collapse icon */}
                  <motion.div
                    variants={iconVariants}
                    initial="collapsed"
                    animate={isOpen ? 'expanded' : 'collapsed'}
                    className="flex-shrink-0"
                  >
                    <div className={cn(
                      'w-10 h-10 rounded-full flex items-center justify-center',
                      'border',
                      isOpen
                        ? 'border-[var(--color-gold)] bg-[var(--color-gold-transparent-10)]'
                        : 'border-[var(--color-gray-light)] group-hover:border-[var(--color-gold)]',
                      'transition-all duration-300'
                    )}>
                      <svg
                        className="w-5 h-5 text-gold"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M12 4v16m8-8H4"
                        />
                      </svg>
                    </div>
                  </motion.div>
                </button>

                {/* Answer content */}
                <AnimatePresence initial={false}>
                  {isOpen && (
                    <motion.div
                      initial="collapsed"
                      animate="expanded"
                      exit="collapsed"
                      variants={contentVariants}
                      className="overflow-hidden"
                    >
                      <div className="px-6 md:px-8 pb-6 md:pb-8">
                        <div className="pl-10 border-l-2 border-[var(--color-gold-transparent-30)]">
                          <p className="text-textSecondary text-lg leading-relaxed">
                            {item.answer}
                          </p>
                          {/* Decorative element */}
                          <div className="flex items-center gap-3 mt-6">
                            <div className="w-2 h-2 rounded-full bg-gold" />
                            <div className="text-sm text-goldLight font-medium">
                              Need more details? Contact our team for personalized answers.
                            </div>
                          </div>
                        </div>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>

                {/* Hover effect line */}
                <div
                  className="h-px mx-6 bg-gradient-to-r from-transparent to-transparent transition-all duration-500"
                  style={{ backgroundImage: isOpen ? 'linear-gradient(to right, transparent, rgba(0,92,72,0.50), transparent)' : undefined }}
                />
              </motion.div>
            );
          })}
        </motion.div>

        {/* CTA section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-50px' }}
          transition={{ delay: 0.5 }}
          className="text-center mt-16"
        >
          <div className="inline-flex flex-col items-center gap-6 p-8 rounded-2xl border border-[var(--color-gray-medium)] bg-gradient-to-br from-[var(--color-gray-dark)] to-[var(--color-black)] backdrop-blur-sm">
            <h3 className="text-2xl font-display font-light">
              Didn&apos;t find what you&apos;re looking for?
            </h3>
            <p className="text-textSecondary max-w-md">
              Our team is ready to answer any questions about custom designs, availability, or special requests.
            </p>
            <Link
              href="/contact"
              className="inline-flex items-center justify-center px-6 py-2.5 rounded-lg bg-gold hover:bg-gold-light text-black font-semibold text-sm transition-all duration-300 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-gold focus-visible:ring-offset-2 focus-visible:ring-offset-black shadow-md hover:shadow-lg"
            >
              Contact Our Team
            </Link>
          </div>
        </motion.div>

        {/* Background decorative elements */}
        <div className="absolute top-20 -left-20 w-48 h-48 rounded-full blur-3xl pointer-events-none" style={{ backgroundColor: 'rgba(0,92,72,0.05)' }} />
        <div className="absolute bottom-20 -right-20 w-64 h-64 rounded-full blur-3xl pointer-events-none" style={{ backgroundColor: 'rgba(0,92,72,0.03)' }} />
      </div>
    </section>
  );
}

export default FAQAccordion;
