'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { cn } from '@/lib/utils';
import { COPY } from '@/content/copy';
import { MOTION } from '@/lib/tokens';

interface ProcessTimelineProps {
  className?: string;
}

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
    <section className={cn('py-20 relative overflow-hidden', className)}>
      <div className="container mx-auto px-4 max-w-6xl">
        {/* Section header */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-100px' }}
          transition={{ duration: 0.8, ease: MOTION.easing.cinematic }}
          className="text-center mb-16"
        >
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
              className="h-full w-full bg-gradient-to-b from-gold via-gold/50 to-transparent"
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
                    className="absolute inset-0 rounded-full border-2 border-gold/30"
                    style={{ scale: 1.5 }}
                  />
                </div>

                {/* Step card */}
                <div className={cn(
                  'md:ml-24 p-8 rounded-2xl border border-grayMedium/30',
                  'bg-gradient-to-br from-grayDark/50 to-black/50',
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
                          <div className="flex items-center gap-2 text-goldLight">
                            <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                              <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm1-12a1 1 0 10-2 0v4a1 1 0 00.293.707l2.828 2.829a1 1 0 101.415-1.415L11 9.586V6z" clipRule="evenodd" />
                            </svg>
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
                      <div className="w-px h-16 bg-gradient-to-b from-gold/30 via-gold/10 to-transparent" />
                    </motion.div>
                  </div>
                </div>

                {/* Connecting line for mobile */}
                {index < steps.length - 1 && (
                  <div className="md:hidden absolute left-1/2 transform -translate-x-1/2 bottom-0 translate-y-8 w-px h-8">
                    <div className="h-full w-full bg-gradient-to-b from-gold/50 to-transparent" />
                  </div>
                )}
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* Background decorative elements */}
        <div className="absolute top-1/4 -right-20 w-64 h-64 rounded-full bg-gold/5 blur-3xl pointer-events-none" />
        <div className="absolute bottom-1/4 -left-20 w-48 h-48 rounded-full bg-gold/3 blur-3xl pointer-events-none" />
      </div>
    </section>
  );
}

export default ProcessTimeline;
