'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { cn } from '@/lib/utils';
import { COPY } from '@/content/copy';
import { COLORS, MOTION } from '@/lib/tokens';

interface LogoMarqueeProps {
  className?: string;
  speed?: 'slow' | 'normal' | 'fast';
}

export function LogoMarquee({ className, speed = 'normal' }: LogoMarqueeProps) {
  const { logos } = COPY.clients;

  // Duplicate logos for seamless loop
  const duplicatedLogos = [...logos, ...logos];

  const speedMap = {
    slow: 40,
    normal: 30,
    fast: 20
  };

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
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
        ease: MOTION.easing.editorial
      }
    }
  };

  return (
    <section className={cn('py-16 relative overflow-hidden', className)}>
      <div className="container mx-auto px-4 max-w-6xl">
        {/* Section header */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-100px' }}
          transition={{ duration: 0.8, ease: MOTION.easing.cinematic }}
          className="text-center mb-12"
        >
          <h2 className="text-3xl md:text-4xl font-display font-light tracking-tight mb-4">
            {COPY.clients.title}
          </h2>
          <p className="text-textSecondary max-w-xl mx-auto">
            Leading brands and institutions choose Luminary for their most important events
          </p>
        </motion.div>

        {/* Marquee container */}
        <div className="relative">
          {/* Gradient overlays for fade effect */}
          <div className="absolute left-0 top-0 bottom-0 w-24 z-10 bg-gradient-to-r from-black to-transparent pointer-events-none" />
          <div className="absolute right-0 top-0 bottom-0 w-24 z-10 bg-gradient-to-l from-black to-transparent pointer-events-none" />

          {/* First marquee track */}
          <motion.div
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: '-50px' }}
            className="flex overflow-hidden py-8"
          >
            <motion.div
              animate={{
                x: ['0%', `-${100 / duplicatedLogos.length}%`]
              }}
              transition={{
                x: {
                  repeat: Infinity,
                  duration: speedMap[speed],
                  ease: 'linear'
                }
              }}
              className="flex flex-shrink-0"
            >
              {duplicatedLogos.map((logo, index) => (
                <motion.div
                  key={`${logo.name}-${index}`}
                  variants={itemVariants}
                  className="flex-shrink-0 px-8 md:px-12"
                >
                  <div className={cn(
                    'relative group',
                    'w-32 h-24 md:w-40 md:h-28',
                    'flex items-center justify-center',
                    'border border-grayMedium/20 rounded-xl',
                    'bg-gradient-to-b from-grayDark/20 to-black/20',
                    'backdrop-blur-sm',
                    'transition-all duration-500',
                    'hover:border-gold/30 hover:shadow-gold'
                  )}>
                    {/* Logo text */}
                    <div className="text-center">
                      <span className="text-xl md:text-2xl font-display font-light text-textPrimary">
                        {logo.name}
                      </span>
                      <div className="absolute inset-0 rounded-xl border border-gold/0 group-hover:border-gold/20 transition-all duration-500" />
                    </div>

                    {/* Decorative dot */}
                    <div className="absolute top-3 right-3 w-2 h-2 rounded-full bg-gold/0 group-hover:bg-gold/50 transition-all duration-500" />
                  </div>
                </motion.div>
              ))}
            </motion.div>
          </motion.div>

          {/* Second marquee track (reverse direction) */}
          <motion.div
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: '-50px' }}
            className="flex overflow-hidden py-8"
          >
            <motion.div
              animate={{
                x: [`-${100 / duplicatedLogos.length}%`, '0%']
              }}
              transition={{
                x: {
                  repeat: Infinity,
                  duration: speedMap[speed],
                  ease: 'linear'
                }
              }}
              className="flex flex-shrink-0"
            >
              {duplicatedLogos.slice().reverse().map((logo, index) => (
                <motion.div
                  key={`${logo.name}-reverse-${index}`}
                  variants={itemVariants}
                  className="flex-shrink-0 px-8 md:px-12"
                >
                  <div className={cn(
                    'relative group',
                    'w-32 h-24 md:w-40 md:h-28',
                    'flex items-center justify-center',
                    'border border-grayMedium/20 rounded-xl',
                    'bg-gradient-to-b from-grayDark/20 to-black/20',
                    'backdrop-blur-sm',
                    'transition-all duration-500',
                    'hover:border-gold/30 hover:shadow-gold'
                  )}>
                    {/* Logo text */}
                    <div className="text-center">
                      <span className="text-xl md:text-2xl font-display font-light text-textPrimary">
                        {logo.name}
                      </span>
                      <div className="absolute inset-0 rounded-xl border border-gold/0 group-hover:border-gold/20 transition-all duration-500" />
                    </div>

                    {/* Decorative dot */}
                    <div className="absolute bottom-3 left-3 w-2 h-2 rounded-full bg-gold/0 group-hover:bg-gold/50 transition-all duration-500" />
                  </div>
                </motion.div>
              ))}
            </motion.div>
          </motion.div>
        </div>

        {/* Background decorative elements */}
        <div className="absolute top-0 left-1/4 w-32 h-32 rounded-full bg-gold/5 blur-3xl pointer-events-none" />
        <div className="absolute bottom-0 right-1/4 w-40 h-40 rounded-full bg-gold/5 blur-3xl pointer-events-none" />
      </div>
    </section>
  );
}

export default LogoMarquee;
