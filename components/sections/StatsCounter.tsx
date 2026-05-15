'use client';

import { useEffect, useRef, useState } from 'react';
import { motion, useInView } from 'framer-motion';
import { cn } from '@/lib/utils';
import { COPY } from '@/content/copy';
import { MOTION } from '@/lib/tokens';

interface StatsCounterProps {
  className?: string;
}

const useCountUp = (end: number, duration: number = 2000, startCounting: boolean = false) => {
  const [count, setCount] = useState(0);

  useEffect(() => {
    if (!startCounting) return;
    let startTime: number;
    const step = (timestamp: number) => {
      if (!startTime) startTime = timestamp;
      const progress = Math.min((timestamp - startTime) / duration, 1);
      setCount(Math.floor(progress * end));
      if (progress < 1) requestAnimationFrame(step);
    };
    const raf = requestAnimationFrame(step);
    return () => cancelAnimationFrame(raf);
  }, [end, duration, startCounting]);

  return count;
};

function StatCard({
  stat,
  index,
  isInView,
}: {
  stat: { value: number; suffix: string; label: string; description: string };
  index: number;
  isInView: boolean;
}) {
  const count = useCountUp(stat.value, 2000 + index * 200, isInView);

  const itemVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: MOTION.duration.slow / 1000,
        ease: MOTION.easing.cinematic,
      },
    },
  };

  return (
    <motion.div variants={itemVariants} className="relative group">
      <div
        className={cn(
          'p-8 rounded-2xl border border-[var(--color-gray-medium)]',
          'bg-gradient-to-br from-[var(--color-gray-dark)] to-[var(--color-black)]',
          'backdrop-blur-sm transition-all duration-500',
          'group-hover:border-[var(--color-gold-transparent-30)] group-hover:shadow-[0_0_40px_0_rgba(0,92,72,0.25)]'
        )}
      >
        {/* Animated number */}
        <div className="flex items-baseline justify-center gap-1 mb-4">
          <span className="text-5xl md:text-6xl lg:text-7xl font-display font-bold bg-gradient-to-b from-gold to-goldLight bg-clip-text text-transparent">
            {count}
          </span>
          {stat.suffix && (
            <span className="text-2xl md:text-3xl text-goldLight font-display">
              {stat.suffix}
            </span>
          )}
        </div>

        <h3 className="text-xl md:text-2xl font-display font-light text-center mb-3">
          {stat.label}
        </h3>

        <p className="text-textTertiary text-center text-sm md:text-base">
          {stat.description}
        </p>

        <motion.div
          initial={{ width: 0 }}
          animate={isInView ? { width: '100%' } : { width: 0 }}
          transition={{
            duration: MOTION.duration.slower / 1000,
            delay: index * 0.1 + 0.3,
            ease: MOTION.easing.editorial,
          }}
          className="h-px bg-gradient-to-r from-transparent via-[var(--color-gold-transparent-50)] to-transparent mt-6"
        />
      </div>

      {/* Corner accents */}
      <div className="absolute top-0 left-0 w-4 h-4 border-t border-l border-[var(--color-gold-transparent-30)] opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
      <div className="absolute top-0 right-0 w-4 h-4 border-t border-r border-[var(--color-gold-transparent-30)] opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
      <div className="absolute bottom-0 left-0 w-4 h-4 border-b border-l border-[var(--color-gold-transparent-30)] opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
      <div className="absolute bottom-0 right-0 w-4 h-4 border-b border-r border-[var(--color-gold-transparent-30)] opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
    </motion.div>
  );
}

export function StatsCounter({ className }: StatsCounterProps) {
  const { stats: statsData } = COPY;
  const stats = statsData.stats;
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-100px' });

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: MOTION.stagger.normal },
    },
  };

  return (
    <section className={cn('py-20 bg-black-green relative overflow-hidden', className)} ref={ref}>
      <div className="container mx-auto px-4 max-w-6xl">
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

        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate={isInView ? 'visible' : 'hidden'}
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8"
        >
          {stats.map((stat, index) => (
            <StatCard key={stat.label} stat={stat} index={index} isInView={isInView} />
          ))}
        </motion.div>

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
