'use client';

import { motion } from 'framer-motion';
import { ArrowRight, Sparkles } from 'lucide-react';
import { useMemo, useEffect, useState } from 'react';
import { MOTION } from '@/lib/tokens';
import { Button } from '@/components/primitives/Button';

export default function HeroSection() {
  const [prefersReduced, setPrefersReduced] = useState(false);

  useEffect(() => {
    setPrefersReduced(window.matchMedia('(prefers-reduced-motion: reduce)').matches);
  }, []);

  // Deterministic pseudo-random positions (same on server + client)
  const particles = useMemo(() => {
    const seed = (i: number) => {
      const x = Math.sin(i * 127.1 + 311.7) * 43758.5453;
      return x - Math.floor(x);
    };
    return [...Array(12)].map((_, i) => ({
      left: `${seed(i * 2) * 100}%`,
      top: `${seed(i * 2 + 1) * 100}%`,
    }));
  }, []);

  const dur = prefersReduced ? 0 : undefined;

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: MOTION.stagger.normal,
        delayChildren: 0.3,
        duration: MOTION.duration.slow / 1000,
      },
    },
  };

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: {
        type: 'spring' as const,
        ...MOTION.spring.normal,
        ...(prefersReduced ? { duration: 0 } : {}),
      },
    },
  };

  const linePath = 'M 0 100 Q 250 50 500 100 T 1000 100';

  return (
    <section className="relative min-h-screen overflow-hidden bg-gradient-to-b from-[var(--color-black)] via-[var(--color-gray-dark)] to-[var(--color-black)]">
      {/* Background */}
      <div className="absolute inset-0 z-0">
        <svg
          aria-hidden="true"
          className="absolute inset-0 w-full h-full"
          xmlns="http://www.w3.org/2000/svg"
          preserveAspectRatio="xMidYMid slice"
        >
          <rect width="100%" height="100%" fill="#0A0A0A" />
          {Array.from({ length: 20 }).map((_, i) => (
            <line
              key={`dg-${i}`}
              x1={`${i * 5 - 10}%`} y1="0%"
              x2={`${i * 5 + 10}%`} y2="100%"
              stroke="rgba(0,92,72,0.05)"
              strokeWidth="1"
            />
          ))}
          <polygon
            points="50%,5% 95%,50% 50%,95% 5%,50%"
            fill="none"
            stroke="rgba(0,92,72,0.10)"
            strokeWidth="1"
          />
        </svg>
        <div className="absolute inset-0 bg-gradient-to-r from-[var(--color-black-transparent-70)] via-transparent to-[var(--color-black-transparent-70)]"></div>

        {/* Animated SVG lines */}
        <div className="absolute inset-0">
          <svg
            className="absolute top-0 left-0 w-full h-full opacity-10"
            viewBox="0 0 1000 200"
            preserveAspectRatio="none"
          >
            <motion.path
              d={linePath}
              stroke="var(--color-gold)"
              strokeWidth="2"
              fill="none"
              initial={{ pathLength: 0, opacity: 0 }}
              animate={{ pathLength: 1, opacity: 1 }}
              transition={{
                duration: dur ?? MOTION.duration.slowest / 1000,
                ease: MOTION.easing.inOut,
                delay: prefersReduced ? 0 : 0.5,
              }}
            />
            <motion.path
              d="M 0 150 Q 250 120 500 150 T 1000 150"
              stroke="var(--color-gold)"
              strokeWidth="1"
              fill="none"
              strokeDasharray="5,5"
              initial={{ pathLength: 0, opacity: 0 }}
              animate={{ pathLength: 1, opacity: 1 }}
              transition={{
                duration: dur ?? MOTION.duration.slowest / 1000,
                ease: MOTION.easing.inOut,
                delay: prefersReduced ? 0 : 0.8,
              }}
            />
          </svg>
        </div>

        {/* Gold particles */}
        <div className="absolute inset-0">
          {particles.map((pos, i) => (
            <motion.div
              key={i}
              className="absolute w-1 h-1 bg-[var(--color-gold)] rounded-full"
              style={{ left: pos.left, top: pos.top }}
              initial={{ opacity: 0, scale: 0 }}
              animate={prefersReduced ? {} : {
                opacity: [0, 1, 0],
                scale: [0, 1, 0],
              }}
              transition={{
                duration: MOTION.duration.slowest / 1000,
                repeat: Infinity,
                delay: i * 0.2,
                ease: MOTION.easing.linear,
              }}
            />
          ))}
        </div>
      </div>

      {/* Content */}
      <div className="relative z-10 flex items-center justify-center min-h-screen px-4 py-20">
        <motion.div
          className="container mx-auto max-w-6xl"
          variants={containerVariants}
          initial="hidden"
          animate="visible"
        >
          {/* Badge */}
          <motion.div
            className="inline-flex items-center gap-2 px-4 py-2 mb-8 rounded-full bg-[var(--color-gold-transparent-10)] border border-[var(--color-gold-transparent-30)]"
            variants={itemVariants}
          >
            <Sparkles className="w-4 h-4 text-[var(--color-gold)]" />
            <span className="text-sm font-medium tracking-wider text-[var(--color-gold)] uppercase">
              Luxury Editorial Experience
            </span>
          </motion.div>

          {/* Headline */}
          <motion.h1
            className="mb-6 text-5xl font-bold tracking-tight text-[var(--color-text-primary)] md:text-7xl lg:text-8xl"
            variants={itemVariants}
          >
            <span className="block">Illuminate</span>
            <span className="block text-[var(--color-gold)]">Your Moments</span>
          </motion.h1>

          {/* Subheading */}
          <motion.p
            className="mb-10 max-w-3xl text-xl font-light leading-relaxed text-[var(--color-text-secondary)] md:text-2xl"
            variants={itemVariants}
          >
            Luminary Booth Co. delivers premium photo booth experiences for luxury events.
            Editorial-grade photography, bespoke backdrops, and cinematic lighting for
            unforgettable celebrations.
          </motion.p>

          {/* CTAs */}
          <motion.div
            className="flex flex-col gap-4 sm:flex-row sm:items-center"
            variants={itemVariants}
          >
            <Button
              variant="primary"
              size="lg"
              rightIcon={<ArrowRight className="w-5 h-5" />}
            >
              Book a Consultation
            </Button>

            <Button
              variant="ghost"
              size="lg"
              rightIcon={<ArrowRight className="w-5 h-5" />}
            >
              View Our Portfolio
            </Button>
          </motion.div>

          {/* Scroll indicator */}
          <motion.div
            className="absolute bottom-8 left-1/2 transform -translate-x-1/2"
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{
              delay: prefersReduced ? 0 : MOTION.duration.slower / 1000,
              duration: prefersReduced ? 0 : MOTION.duration.normal / 1000,
            }}
          >
            <div className="flex flex-col items-center">
              <span className="mb-2 text-sm tracking-wider text-[var(--color-text-tertiary)]">
                Scroll
              </span>
              <div className="w-[1px] h-12 bg-gradient-to-b from-[var(--color-gold)] to-transparent"></div>
            </div>
          </motion.div>
        </motion.div>
      </div>

      {/* Decorative corner accents */}
      <div className="absolute top-0 left-0 w-32 h-32 border-t-2 border-l-2 border-[var(--color-gold-transparent-30)]"></div>
      <div className="absolute top-0 right-0 w-32 h-32 border-t-2 border-r-2 border-[var(--color-gold-transparent-30)]"></div>
      <div className="absolute bottom-0 left-0 w-32 h-32 border-b-2 border-l-2 border-[var(--color-gold-transparent-30)]"></div>
      <div className="absolute bottom-0 right-0 w-32 h-32 border-b-2 border-r-2 border-[var(--color-gold-transparent-30)]"></div>
    </section>
  );
}
