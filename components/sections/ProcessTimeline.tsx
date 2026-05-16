'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { MessageSquare, Palette, Settings, Camera, Package } from 'lucide-react';
import { cn } from '@/lib/utils';
import { COPY } from '@/content/copy';
import { MOTION } from '@/lib/tokens';

interface ProcessTimelineProps {
  className?: string;
}

const stepIcons = [MessageSquare, Palette, Settings, Camera, Package];

export function ProcessTimeline({ className }: ProcessTimelineProps) {
  const { steps } = COPY.process;

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: MOTION.stagger.cinematic,
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
        duration: MOTION.duration.slow / 1000,
        ease: MOTION.easing.cinematic
      }
    }
  };

  const lineVariants = {
    hidden: { scaleY: 0, transformOrigin: 'top' },
    visible: {
      scaleY: 1,
      transition: {
        duration: MOTION.duration.slowest / 1000,
        ease: MOTION.easing.editorial
      }
    }
  };

  return (
    <section className={cn('py-20 relative overflow-hidden bg-surface', className)}>
      <div className="container mx-auto px-4 max-w-6xl">
        {/* Section header */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-100px' }}
          transition={{ duration: 0.8, ease: MOTION.easing.cinematic }}
          className="text-center mb-16"
        >
          <p className="section-label inline-block text-xs font-semibold tracking-widest uppercase text-gold mb-4">
            The Process
          </p>
          <h2 className="text-4xl md:text-5xl font-display font-light tracking-tight mb-4">
            {COPY.process.title}
          </h2>
          <p className="text-lg md:text-xl text-textSecondary max-w-2xl mx-auto">
            {COPY.process.subtitle}
          </p>
        </motion.div>

        {/* Timeline container */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-50px' }}
          className="relative"
        >
          {/* Vertical timeline line */}
          <div className="absolute left-1/2 transform -translate-x-1/2 md:left-8 md:translate-x-0 h-full w-px hidden md:block">
            <motion.div
              variants={lineVariants}
              className="h-full w-full bg-gradient-to-b from-[var(--color-gold)] via-[var(--color-gold-transparent-50)] to-transparent"
            />
          </div>

          {/* Steps */}
          <div className="space-y-16 md:space-y-24">
            {steps.map((step, index) => (
              <motion.div
                key={step.number}
                variants={itemVariants}
                className="relative"
              >
                {/* Timeline dot */}
                <div className="hidden md:block absolute left-8 transform -translate-x-1/2 w-4 h-4">
                  <motion.div
                    initial={{ scale: 0 }}
                    whileInView={{ scale: 1 }}
                    viewport={{ once: true }}
                    transition={{ delay: index * 0.2 + 0.5, type: 'spring', stiffness: 200 }}
                    className="w-full h-full rounded-full bg-gold"
                  />
                  <motion.div
                    initial={{ scale: 0 }}
                    whileInView={{ scale: 1 }}
                    viewport={{ once: true }}
                    transition={{ delay: index * 0.2 + 0.7, type: 'spring', stiffness: 150 }}
                    className="absolute inset-0 rounded-full border-2 border-[var(--color-gold-transparent-30)]"
                    style={{ scale: 1.5 }}
                  />
                </div>

                {/* Step card */}
                <div className={cn(
                  'md:ml-24 p-8 rounded-2xl border border-[var(--color-gray-medium)]',
                  'bg-gradient-to-br from-[var(--color-gray-dark)] to-[var(--color-black)]',
                  'backdrop-blur-sm',
                  index % 2 === 0 ? 'md:mr-8' : ''
                )}>
                  <div className="flex flex-col md:flex-row md:items-start justify-between gap-6">
                    <div className="flex-1">
                      {/* Step number and title */}
                      <div className="flex items-center gap-4 mb-6">
                        <div className="flex-shrink-0">
                          <motion.div
                            initial={{ scale: 0 }}
                            whileInView={{ scale: 1 }}
                            viewport={{ once: true }}
                            transition={{ delay: index * 0.1, type: 'spring' }}
                            className={cn(
                              'w-16 h-16 rounded-full flex items-center justify-center',
                              'bg-gradient-to-br from-goldDark to-gold',
                              'text-textInverse font-display text-2xl font-bold',
                              'shadow-goldLg'
                            )}
                          >
                            {step.number}
                          </motion.div>
                        </div>
                        <div>
                          <h3 className="text-2xl md:text-3xl font-display font-light mb-2">
                            {step.title}
                          </h3>
                          <div className="flex items-center gap-2 text-[var(--color-text-secondary)]">
                            {React.createElement(stepIcons[index] ?? MessageSquare, { className: 'w-4 h-4', strokeWidth: 1.5 })}
                            <span className="text-sm font-medium">{step.duration}</span>
                          </div>
                        </div>
                      </div>

                      {/* Description */}
                      <p className="text-textSecondary text-lg leading-relaxed">
                        {step.description}
                      </p>
                    </div>

                    {/* Decorative element */}
                    <motion.div
                      initial={{ opacity: 0, rotate: -90 }}
                      whileInView={{ opacity: 1, rotate: 0 }}
                      viewport={{ once: true }}
                      transition={{ delay: index * 0.2 + 0.3, duration: 0.7 }}
                      className="hidden md:block flex-shrink-0"
                    >
                      <div className="w-px h-16 bg-gradient-to-b from-[var(--color-gold-transparent-30)] via-[var(--color-gold-transparent-10)] to-transparent" />
                    </motion.div>
                  </div>
                </div>

                {/* Connecting line for mobile */}
                {index < steps.length - 1 && (
                  <div className="md:hidden absolute left-1/2 transform -translate-x-1/2 bottom-0 translate-y-8 w-px h-8">
                    <div className="h-full w-full bg-gradient-to-b from-[var(--color-gold-transparent-50)] to-transparent" />
                  </div>
                )}
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* Background decorative elements */}
        <div className="absolute top-1/4 -right-20 w-64 h-64 rounded-full blur-3xl pointer-events-none" style={{ backgroundColor: 'rgba(212,175,55,0.04)' }} />
        <div className="absolute bottom-1/4 -left-20 w-48 h-48 rounded-full blur-3xl pointer-events-none" style={{ backgroundColor: 'rgba(212,175,55,0.03)' }} />
      </div>
    </section>
  );
}

export default ProcessTimeline;
