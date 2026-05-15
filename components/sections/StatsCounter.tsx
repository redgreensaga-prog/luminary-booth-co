'use client';

import React, { useEffect, useState, useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import { cn } from '@/lib/utils';
import { COPY } from '@/content/copy';
import { MOTION } from '@/lib/tokens';

interface StatsCounterProps {
  className?: string;
}

export function StatsCounter({ className }: StatsCounterProps) {
  const { stats: statsData } = COPY;
  const stats = statsData.stats;
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-100px' });
  const [counts, setCounts] = useState(stats.map(() => 0));

  useEffect(() => {
    if (!isInView) return;

    const durations = [2000, 2200, 2400, 2600];
    const intervals = stats.map((stat, index) => {
      const duration = durations[index % durations.length];
      const increment = stat.value / (duration / 16);
      let current = 0;

      const timer = setInterval(() => {
        current += increment;
        if (current >= stat.value) {
          current = stat.value;
          clearInterval(timer);
        }
        setCounts(prev => {
          const newCounts = [...prev];
          newCounts[index] = Math.floor(current);
          return newCounts;
        });
      }, 16);

      return timer;
    });

    return () => intervals.forEach(interval => clearInterval(interval));
  }, [isInView, stats]);

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: MOTION.stagger.normal
      }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: MOTION.duration.slow / 1000,
        ease: MOTION.easing.cinematic
      }
    }
  };

  const numberVariants = {
    hidden: { opacity: 0, scale: 0.8 },
    visible: {
      opacity: 1,
      scale: 1,
      transition: {
        type: 'spring',
        stiffness: 100,
        damping: 12
      }
    }
  };

  return (
    <section className={cn('py-20 relative overflow-hidden', className)} ref={ref}>
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
            {statsData.title}
          </h2>
          <p className="text-lg md:text-xl text-textSecondary max-w-2xl mx-auto">
            Our impact in the luxury event space
          </p>
        </motion.div>

        {/* Stats grid */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate={isInView ? 'visible' : 'hidden'}
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8"
        >
          {stats.map((stat, index) => (
            <motion.div
              key={stat.label}
              variants={itemVariants}
              className="relative group"
            >
              {/* Card */}
              <div className={cn(
                'p-8 rounded-2xl border border-[var(--color-gray-medium)]',
                'bg-gradient-to-br from-[var(--color-gray-dark)] to-[var(--color-black)]',
                'backdrop-blur-sm',
                'transition-all duration-500',
                'group-hover:border-[var(--color-gold-transparent-30)] group-hover:shadow-[0_0_40px_0_rgba(0,92,72,0.25)]'
              )}
              >
                {/* Animated number */}
                <div className="flex items-baseline justify-center gap-1 mb-4">
                  <motion.span
                    variants={numberVariants}
                    className="text-5xl md:text-6xl lg:text-7xl font-display font-bold bg-gradient-to-b from-gold to-goldLight bg-clip-text text-transparent"
                  >
                    {counts[index]}
                  </motion.span>
                  {stat.suffix && (
                    <span className="text-2xl md:text-3xl text-goldLight font-display">
                      {stat.suffix}
                    </span>
                  )}
                </div>

                {/* Label */}
                <h3 className="text-xl md:text-2xl font-display font-light text-center mb-3">
                  {stat.label}
                </h3>

                {/* Description */}
                <p className="text-textTertiary text-center text-sm md:text-base">
                  {stat.description}
                </p>

                {/* Animated progress bar */}
                <motion.div
                  initial={{ width: 0 }}
                  animate={isInView ? { width: '100%' } : { width: 0 }}
                  transition={{
                    duration: MOTION.duration.slower / 1000,
                    delay: index * 0.1 + 0.3,
                    ease: MOTION.easing.editorial
                  }}
                  className="h-px bg-gradient-to-r from-transparent via-[var(--color-gold-transparent-50)] to-transparent mt-6"
                />
              </div>

              {/* Decorative corner accents */}
              <div className="absolute top-0 left-0 w-4 h-4 border-t border-l border-[var(--color-gold-transparent-30)] opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
              <div className="absolute top-0 right-0 w-4 h-4 border-t border-r border-[var(--color-gold-transparent-30)] opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
              <div className="absolute bottom-0 left-0 w-4 h-4 border-b border-l border-[var(--color-gold-transparent-30)] opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
              <div className="absolute bottom-0 right-0 w-4 h-4 border-b border-r border-[var(--color-gold-transparent-30)] opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
            </motion.div>
          ))}
        </motion.div>

        {/* Background decorative elements */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={isInView ? { opacity: 1 } : { opacity: 0 }}
          transition={{ delay: 0.5 }}
          className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-96 h-96 rounded-full blur-3xl pointer-events-none"
          style={{ backgroundColor: 'rgba(0,92,72,0.05)' }}
        />
      </div>
    </section>
  );
}

export default StatsCounter;
