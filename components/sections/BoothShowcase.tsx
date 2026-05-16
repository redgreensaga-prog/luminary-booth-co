'use client';

import { motion, AnimatePresence } from 'framer-motion';
import { useState, useEffect } from 'react';
import Image from 'next/image';
import { Camera, Sparkles, Star, Zap } from 'lucide-react';
import { Button } from '@/components/primitives/Button';
import { MOTION } from '@/lib/tokens';

type BoothType = {
  id: string;
  title: string;
  subtitle: string;
  description: string;
  features: string[];
  price: string;
  icon: React.ReactNode;
  image: string;
  imageAlt: string;
  accentColor: string;
};

const boothTypes: BoothType[] = [
  {
    id: 'editorial',
    title: 'Editorial Pro',
    subtitle: 'Luxury Magazine Style',
    description: 'Professional lighting, high-end DSLR cameras, and magazine-style editing for red carpet events and luxury weddings.',
    features: [
      '4K DSLR photography',
      'Cinematic lighting setup',
      'Magazine-grade retouching',
      'Custom backdrops',
      'Dedicated attendant',
      'Premium print packaging',
    ],
    price: 'From $2,500',
    icon: <Star className="w-6 h-6" />,
    image: 'https://images.unsplash.com/photo-1606216794074-735e91aa2c92?w=600&q=80',
    imageAlt: 'Editorial pro photo booth setup with professional studio lighting at a luxury event',
    accentColor: 'var(--color-gold)',
  },
  {
    id: 'mirror',
    title: 'Crystal Mirror',
    subtitle: 'Interactive Experience',
    description: 'Full-length LED mirror booth with touchscreen interface, AR filters, and instant social sharing.',
    features: [
      '55" touchscreen mirror',
      'AR filters and effects',
      'Instant digital delivery',
      'Custom logo branding',
      'Social media integration',
      'GIF and video options',
    ],
    price: 'From $1,800',
    icon: <Sparkles className="w-6 h-6" />,
    image: 'https://images.unsplash.com/photo-1519671482749-fd09be7ccebf?w=600&q=80',
    imageAlt: 'Crystal mirror interactive photo booth with LED lighting at a gala event',
    accentColor: 'var(--color-gold-light)',
  },
  {
    id: 'vintage',
    title: 'Vintage Darkroom',
    subtitle: 'Analog Charm',
    description: 'Classic film booth with vintage aesthetics, black and white photography, and tactile printed souvenirs.',
    features: [
      'Film camera setup',
      'Black & white processing',
      'Vintage backdrop collection',
      'Antique furniture props',
      'Polaroid-style prints',
      'Hand-developed look',
    ],
    price: 'From $1,400',
    icon: <Camera className="w-6 h-6" />,
    image: 'https://images.unsplash.com/photo-1452587925148-ce544e77e70d?w=600&q=80',
    imageAlt: 'Vintage darkroom aesthetic with warm film tones and classic photographic equipment',
    accentColor: 'var(--color-gold-dark)',
  },
];

export default function BoothShowcase() {
  const [activeTab, setActiveTab] = useState<string>('editorial');
  const [prefersReduced, setPrefersReduced] = useState(false);

  useEffect(() => {
    setPrefersReduced(window.matchMedia('(prefers-reduced-motion: reduce)').matches);
  }, []);

  const activeBooth = boothTypes.find(booth => booth.id === activeTab) || boothTypes[0];

  const tabVariants = {
    inactive: { opacity: 0.7, scale: 0.95 },
    active: {
      opacity: 1,
      scale: 1,
      transition: {
        type: 'spring' as const,
        ...MOTION.spring.stiff,
        ...(prefersReduced ? { duration: 0 } : {}),
      },
    },
  };

  const contentVariants = {
    enter: { opacity: 0, y: prefersReduced ? 0 : 20 },
    center: {
      opacity: 1,
      y: 0,
      transition: {
        duration: prefersReduced ? 0 : MOTION.duration.normal / 1000,
        ease: MOTION.easing.inOut,
      },
    },
    exit: {
      opacity: 0,
      y: prefersReduced ? 0 : -20,
      transition: {
        duration: prefersReduced ? 0 : MOTION.duration.fast / 1000,
      },
    },
  };

  const svgCrossfadeVariants = {
    enter: { opacity: 0 },
    center: {
      opacity: 1,
      transition: {
        duration: prefersReduced ? 0 : MOTION.duration.normal / 1000,
        ease: MOTION.easing.inOut,
      },
    },
    exit: {
      opacity: 0,
      transition: {
        duration: prefersReduced ? 0 : MOTION.duration.fast / 1000,
      },
    },
  };

  return (
    <section className="py-24 bg-surface">
      <div className="container px-4 mx-auto max-w-7xl">
        {/* Section header */}
        <div className="mb-16 text-center">
          <motion.p
            className="section-label inline-block text-xs font-semibold tracking-widest uppercase text-gold mb-4"
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: MOTION.duration.normal / 1000, ease: MOTION.easing.editorial }}
          >
            Signature Collection
          </motion.p>
          <motion.h2
            className="mb-4 text-4xl font-bold tracking-tight text-[var(--color-text-primary)] md:text-5xl"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{
              duration: prefersReduced ? 0 : MOTION.duration.normal / 1000,
              ease: MOTION.easing.editorial,
            }}
          >
            Signature Booths
          </motion.h2>
          <motion.p
            className="max-w-3xl mx-auto text-lg text-[var(--color-text-secondary)]"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{
              delay: prefersReduced ? 0 : 0.1,
              duration: prefersReduced ? 0 : MOTION.duration.normal / 1000,
              ease: MOTION.easing.editorial,
            }}
          >
            Each booth is meticulously designed and engineered for luxury events.
            Choose from our curated collection of premium experiences.
          </motion.p>
        </div>

        {/* Tab navigation */}
        <div className="flex flex-col mb-12 sm:flex-row sm:items-center sm:justify-center gap-4">
          {boothTypes.map((booth) => (
            <motion.button
              key={booth.id}
              className={`relative flex items-center gap-3 px-6 py-4 rounded-sm border transition-all duration-300 ${
                activeTab === booth.id
                  ? 'border-[var(--color-gold)] bg-[var(--color-gold-transparent-10)]'
                  : 'border-[var(--color-gray-medium)] hover:border-[var(--color-gold-transparent-50)]'
              }`}
              onClick={() => setActiveTab(booth.id)}
              variants={tabVariants}
              animate={activeTab === booth.id ? 'active' : 'inactive'}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <div className={`p-2 rounded ${
                activeTab === booth.id
                  ? 'bg-[var(--color-gold-transparent-30)]'
                  : 'bg-[var(--color-gray-dark)]'
              }`}>
                <div style={{ color: activeTab === booth.id ? booth.accentColor : 'var(--color-text-tertiary)' }}>
                  {booth.icon}
                </div>
              </div>
              <div className="text-left">
                <div className="font-medium text-[var(--color-text-primary)]">{booth.title}</div>
                <div className="text-sm text-[var(--color-text-tertiary)]">{booth.subtitle}</div>
              </div>

              {activeTab === booth.id && (
                <motion.div
                  className="absolute bottom-0 left-0 right-0 h-0.5 bg-gradient-to-r from-transparent via-[var(--color-gold)] to-transparent"
                  layoutId="activeTabIndicator"
                  initial={false}
                  transition={{ type: 'spring', ...MOTION.spring.stiff }}
                />
              )}
            </motion.button>
          ))}
        </div>

        {/* Content area */}
        <div className="relative min-h-[600px]">
          <AnimatePresence mode="wait">
            <motion.div
              key={activeTab}
              variants={contentVariants}
              initial="enter"
              animate="center"
              exit="exit"
              className="grid gap-12 lg:grid-cols-5"
            >
              {/* Image with crossfade */}
              <div className="relative overflow-hidden rounded-sm lg:col-span-2">
                <div className="aspect-[4/3]">
                  <AnimatePresence mode="wait">
                    <motion.div
                      key={`img-${activeTab}`}
                      className="absolute inset-0"
                      variants={svgCrossfadeVariants}
                      initial="enter"
                      animate="center"
                      exit="exit"
                    >
                      <Image
                        src={activeBooth.image}
                        alt={activeBooth.imageAlt}
                        fill
                        className="object-cover"
                        sizes="(max-width: 1024px) 100vw, 50vw"
                      />
                    </motion.div>
                  </AnimatePresence>
                  <div className="absolute inset-0 bg-gradient-to-t from-[var(--color-black-transparent-70)] via-transparent to-transparent pointer-events-none" />
                </div>

                {/* Price badge */}
                <motion.div
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: prefersReduced ? 0 : 0.3 }}
                  className="absolute top-6 right-6 px-4 py-2 bg-[var(--color-black-transparent-70)] backdrop-blur-sm border border-[var(--color-gold-transparent-30)] rounded-sm"
                >
                  <div className="text-2xl font-bold text-[var(--color-gold)]">{activeBooth.price}</div>
                </motion.div>
              </div>

              {/* Content */}
              <div className="flex flex-col justify-center lg:col-span-3">
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: prefersReduced ? 0 : 0.2 }}
                  className="inline-flex items-center gap-2 mb-4 text-[var(--color-gold)]"
                >
                  {activeBooth.icon}
                  <span className="text-sm font-medium tracking-wider uppercase">
                    {activeBooth.subtitle}
                  </span>
                </motion.div>

                <h3 className="mb-4 text-3xl font-bold text-[var(--color-text-primary)] md:text-4xl">
                  {activeBooth.title}
                </h3>

                <p className="mb-6 text-lg leading-relaxed text-[var(--color-text-secondary)]">
                  {activeBooth.description}
                </p>

                {/* Features */}
                <div className="mb-8">
                  <h4 className="mb-4 text-lg font-semibold text-[var(--color-text-primary)]">
                    Included Features
                  </h4>
                  <ul className="grid gap-3 sm:grid-cols-2">
                    {activeBooth.features.map((feature, index) => (
                      <motion.li
                        key={index}
                        initial={{ opacity: 0, x: -10 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: prefersReduced ? 0 : 0.1 * index }}
                        className="flex items-center gap-2 text-[var(--color-text-secondary)]"
                      >
                        <div className="w-1 h-1 rounded-full bg-[var(--color-gold)]"></div>
                        {feature}
                      </motion.li>
                    ))}
                  </ul>
                </div>

                {/* CTA */}
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: prefersReduced ? 0 : 0.5 }}
                  className="self-start"
                >
                  <Button
                    variant="primary"
                    size="lg"
                    rightIcon={<Zap className="w-5 h-5" />}
                  >
                    Inquire About {activeBooth.title}
                  </Button>
                </motion.div>
              </div>
            </motion.div>
          </AnimatePresence>
        </div>
      </div>
    </section>
  );
}
