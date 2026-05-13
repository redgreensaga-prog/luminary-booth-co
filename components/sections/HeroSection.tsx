'use client';

import { motion } from 'framer-motion';
import { ArrowRight, Sparkles } from 'lucide-react';
import { useMemo } from 'react';

export default function HeroSection() {
  // Deterministic pseudo-random positions (same on server + client)
  const particles = useMemo(() => {
    // Simple seeded "random" based on index
    const seed = (i: number) => {
      const x = Math.sin(i * 127.1 + 311.7) * 43758.5453;
      return x - Math.floor(x);
    };
    return [...Array(12)].map((_, i) => ({
      left: `${seed(i * 2) * 100}%`,
      top: `${seed(i * 2 + 1) * 100}%`,
    }));
  }, []);

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.3,
        duration: 0.8,
      },
    },
  };

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: {
        type: 'spring',
        stiffness: 100,
        damping: 20,
      },
    },
  };

  const linePath = 'M 0 100 Q 250 50 500 100 T 1000 100';

  return (
    <section className="relative min-h-screen overflow-hidden bg-gradient-to-b from-[var(--color-black)] via-[var(--color-gray-dark)] to-[var(--color-black)]">
      {/* Parallax background */}
      <div className="absolute inset-0 z-0">
        <div className="absolute inset-0 bg-[url('/placeholder/hero-bg.jpg')] bg-cover bg-center bg-no-repeat opacity-20"></div>
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
                duration: 2,
                ease: 'easeInOut',
                delay: 0.5,
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
                duration: 2.5,
                ease: 'easeInOut',
                delay: 0.8,
              }}
            />
          </svg>
        </div>

        {/* Gold particles */}
        <div className="absolute inset-0">
          {particles.map((pos, i) => (
            <motion.div
              key={i}
              className="absolute w-[1px] h-[1px] bg-[var(--color-gold)] rounded-full"
              style={{
                left: pos.left,
                top: pos.top,
              }}
              initial={{ opacity: 0, scale: 0 }}
              animate={{
                opacity: [0, 1, 0],
                scale: [0, 1, 0],
              }}
              transition={{
                duration: 3,
                repeat: Infinity,
                delay: i * 0.2,
                ease: 'linear',
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
            <button className="group relative inline-flex items-center justify-center gap-2 px-8 py-4 text-base font-medium text-[var(--color-black)] bg-[var(--color-gold)] rounded-sm hover:bg-[var(--color-gold-light)] transition-all duration-300 hover:scale-105 hover:shadow-[0_0_40px_0_var(--color-gold-transparent-30)]">
              Book a Consultation
              <ArrowRight className="w-5 h-5 transition-transform group-hover:translate-x-1" />
            </button>
            
            <button className="group inline-flex items-center justify-center gap-2 px-8 py-4 text-base font-medium border border-[var(--color-gray-medium)] text-[var(--color-text-primary)] rounded-sm hover:border-[var(--color-gold)] hover:text-[var(--color-gold)] transition-all duration-300 hover:scale-105">
              View Our Portfolio
              <ArrowRight className="w-5 h-5 transition-transform group-hover:translate-x-1" />
            </button>
          </motion.div>

          {/* Scroll indicator */}
          <motion.div
            className="absolute bottom-8 left-1/2 transform -translate-x-1/2"
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 2, duration: 1 }}
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