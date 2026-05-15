'use client';

import { motion, AnimatePresence } from 'framer-motion';
import { useState } from 'react';
import { Camera, Sparkles, Star, Zap } from 'lucide-react';

type BoothType = {
  id: string;
  title: string;
  subtitle: string;
  description: string;
  features: string[];
  price: string;
  icon: React.ReactNode;
  svgPattern: React.ReactNode;
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
    svgPattern: (
      <svg aria-hidden="true" width="100%" height="100%" xmlns="http://www.w3.org/2000/svg">
        <rect width="100%" height="100%" fill="#0A0A0A" />
        {/* Vertical lines */}
        {Array.from({ length: 12 }).map((_, i) => (
          <line
            key={i}
            x1={`${(i + 1) * (100 / 13)}%`} y1="0%"
            x2={`${(i + 1) * (100 / 13)}%`} y2="100%"
            stroke="rgba(0,92,72,0.12)"
            strokeWidth="1"
          />
        ))}
        {/* Rectangle frames */}
        <rect x="15%" y="10%" width="70%" height="80%" fill="none" stroke="rgba(0,92,72,0.20)" strokeWidth="1" />
        <rect x="25%" y="20%" width="50%" height="60%" fill="none" stroke="rgba(0,92,72,0.12)" strokeWidth="1" />
        <rect x="35%" y="30%" width="30%" height="40%" fill="none" stroke="rgba(0,92,72,0.08)" strokeWidth="1" />
        {/* Center crosshair */}
        <line x1="48%" y1="40%" x2="52%" y2="40%" stroke="rgba(0,92,72,0.30)" strokeWidth="1" />
        <line x1="48%" y1="60%" x2="52%" y2="60%" stroke="rgba(0,92,72,0.30)" strokeWidth="1" />
        <line x1="38%" y1="48%" x2="38%" y2="52%" stroke="rgba(0,92,72,0.30)" strokeWidth="1" />
        <line x1="62%" y1="48%" x2="62%" y2="52%" stroke="rgba(0,92,72,0.30)" strokeWidth="1" />
      </svg>
    ),
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
    svgPattern: (
      <svg aria-hidden="true" width="100%" height="100%" xmlns="http://www.w3.org/2000/svg">
        <rect width="100%" height="100%" fill="#0A0A0A" />
        {/* Hexagonal / diamond lattice */}
        {Array.from({ length: 5 }).map((_, row) =>
          Array.from({ length: 6 }).map((_, col) => {
            const cx = col * 20 + (row % 2 === 0 ? 10 : 0);
            const cy = row * 18 + 9;
            return (
              <polygon
                key={`${row}-${col}`}
                points={`${cx}%,${cy - 8}% ${cx + 7}%,${cy - 4}% ${cx + 7}%,${cy + 4}% ${cx}%,${cy + 8}% ${cx - 7}%,${cy + 4}% ${cx - 7}%,${cy - 4}%`}
                fill="none"
                stroke="rgba(0,92,72,0.12)"
                strokeWidth="1"
              />
            );
          })
        )}
        {/* Central diamond */}
        <polygon
          points="50%,20% 75%,50% 50%,80% 25%,50%"
          fill="none"
          stroke="rgba(0,92,72,0.28)"
          strokeWidth="1.5"
        />
        <polygon
          points="50%,32% 63%,50% 50%,68% 37%,50%"
          fill="none"
          stroke="rgba(0,92,72,0.18)"
          strokeWidth="1"
        />
      </svg>
    ),
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
    svgPattern: (
      <svg aria-hidden="true" width="100%" height="100%" xmlns="http://www.w3.org/2000/svg">
        <rect width="100%" height="100%" fill="#0A0A0A" />
        {/* Concentric circles */}
        {[8, 16, 24, 32, 40, 48].map((r, i) => (
          <circle
            key={i}
            cx="50%"
            cy="50%"
            r={`${r}%`}
            fill="none"
            stroke="rgba(0,92,72,0.10)"
            strokeWidth="1"
          />
        ))}
        {/* Radiating lines */}
        {Array.from({ length: 12 }).map((_, i) => {
          const angle = (i * 30 * Math.PI) / 180;
          const x2 = 50 + 48 * Math.cos(angle);
          const y2 = 50 + 48 * Math.sin(angle);
          return (
            <line
              key={i}
              x1="50%"
              y1="50%"
              x2={`${x2}%`}
              y2={`${y2}%`}
              stroke="rgba(0,92,72,0.06)"
              strokeWidth="1"
            />
          );
        })}
        {/* Inner accent circle */}
        <circle cx="50%" cy="50%" r="8%" fill="none" stroke="rgba(0,92,72,0.30)" strokeWidth="1.5" />
        <circle cx="50%" cy="50%" r="3%" fill="rgba(0,92,72,0.15)" />
      </svg>
    ),
    accentColor: 'var(--color-gold-dark)',
  },
];

export default function BoothShowcase() {
  const [activeTab, setActiveTab] = useState<string>('editorial');

  const activeBooth = boothTypes.find(booth => booth.id === activeTab) || boothTypes[0];

  const tabVariants = {
    inactive: {
      opacity: 0.7,
      scale: 0.95,
    },
    active: {
      opacity: 1,
      scale: 1,
      transition: {
        type: 'spring',
        stiffness: 300,
        damping: 20,
      },
    },
  };

  const contentVariants = {
    enter: {
      opacity: 0,
      y: 20,
    },
    center: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.5,
        ease: 'easeInOut',
      },
    },
    exit: {
      opacity: 0,
      y: -20,
      transition: {
        duration: 0.3,
      },
    },
  };

  return (
    <section className="py-24 bg-[var(--color-black)]">
      <div className="container px-4 mx-auto max-w-7xl">
        {/* Section header */}
        <div className="mb-16 text-center">
          <motion.h2
            className="mb-4 text-4xl font-bold tracking-tight text-[var(--color-text-primary)] md:text-5xl"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            Signature Booths
          </motion.h2>
          <motion.p
            className="max-w-3xl mx-auto text-lg text-[var(--color-text-secondary)]"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
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

              {/* Animated indicator */}
              {activeTab === booth.id && (
                <motion.div
                  className="absolute bottom-0 left-0 right-0 h-0.5 bg-gradient-to-r from-transparent via-[var(--color-gold)] to-transparent"
                  layoutId="activeTabIndicator"
                  initial={false}
                  transition={{ type: 'spring', stiffness: 300, damping: 30 }}
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
              className="grid gap-12 lg:grid-cols-2"
            >
              {/* Image */}
              <div className="relative overflow-hidden rounded-sm">
                <div className="aspect-[4/3] bg-gradient-to-br from-[var(--color-gray-dark)] to-[var(--color-black)]">
                  <div className="absolute inset-0 bg-gradient-to-t from-[var(--color-black-transparent-70)] via-transparent to-transparent"></div>
                  <div className="absolute inset-0">
                    {activeBooth.svgPattern}
                  </div>
                </div>

                {/* Price badge */}
                <motion.div
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.3 }}
                  className="absolute top-6 right-6 px-4 py-2 bg-[var(--color-black-transparent-70)] backdrop-blur-sm border border-[var(--color-gold-transparent-30)] rounded-sm"
                >
                  <div className="text-2xl font-bold text-[var(--color-gold)]">{activeBooth.price}</div>
                </motion.div>
              </div>

              {/* Content */}
              <div className="flex flex-col justify-center">
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.2 }}
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
                        transition={{ delay: 0.1 * index }}
                        className="flex items-center gap-2 text-[var(--color-text-secondary)]"
                      >
                        <div className="w-1 h-1 rounded-full bg-[var(--color-gold)]"></div>
                        {feature}
                      </motion.li>
                    ))}
                  </ul>
                </div>

                {/* CTA */}
                <motion.button
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.5 }}
                  className="group relative inline-flex items-center justify-center gap-2 self-start px-8 py-4 text-base font-medium text-[var(--color-black)] bg-[var(--color-gold)] rounded-sm hover:bg-[var(--color-gold-light)] transition-all duration-300 hover:scale-105 hover:shadow-[0_0_40px_0_var(--color-gold-transparent-30)]"
                >
                  Inquire About {activeBooth.title}
                  <Zap className="w-5 h-5 transition-transform group-hover:translate-x-1" />
                </motion.button>
              </div>
            </motion.div>
          </AnimatePresence>
        </div>
      </div>
    </section>
  );
}
