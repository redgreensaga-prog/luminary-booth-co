'use client';

import React, { useState, useEffect, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Star, ChevronLeft, ChevronRight } from 'lucide-react';
import { cn } from '@/lib/utils';
import { MOTION } from '@/lib/tokens';
import { COPY } from '@/content/copy';

export interface Testimonial {
  id: string;
  text: string;
  author: string;
  role?: string;
  company?: string;
  event?: string;
  rating: number; // 1-5
  avatarUrl?: string;
}

interface TestimonialsCarouselProps {
  testimonials?: Testimonial[];
  autoRotateInterval?: number; // milliseconds
  showNavigation?: boolean;
  showDots?: boolean;
  className?: string;
}

export default function TestimonialsCarousel({
  testimonials = COPY.testimonials.testimonials,
  autoRotateInterval = 6000, // 6 seconds
  showNavigation = true,
  showDots = true,
  className,
}: TestimonialsCarouselProps) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isPaused, setIsPaused] = useState(false);
  const [direction, setDirection] = useState(0); // -1 for left, 1 for right, 0 for initial

  const goToSlide = useCallback((index: number) => {
    setDirection(index > currentIndex ? 1 : -1);
    setCurrentIndex(index);
  }, [currentIndex]);

  const goToNext = useCallback(() => {
    setDirection(1);
    setCurrentIndex((prev) => (prev + 1) % testimonials.length);
  }, [testimonials.length]);

  const goToPrev = useCallback(() => {
    setDirection(-1);
    setCurrentIndex((prev) => (prev - 1 + testimonials.length) % testimonials.length);
  }, [testimonials.length]);

  // Auto-rotation with pause on hover
  useEffect(() => {
    if (isPaused || testimonials.length <= 1) return;

    const interval = setInterval(goToNext, autoRotateInterval);
    return () => clearInterval(interval);
  }, [isPaused, autoRotateInterval, goToNext, testimonials.length]);

  const handleMouseEnter = () => setIsPaused(true);
  const handleMouseLeave = () => setIsPaused(false);

  const currentTestimonial = testimonials[currentIndex];

  // Animation variants
  const slideVariants = {
    enter: (direction: number) => ({
      x: direction > 0 ? '100%' : '-100%',
      opacity: 0,
      scale: 0.95,
    }),
    center: {
      x: 0,
      opacity: 1,
      scale: 1,
    },
    exit: (direction: number) => ({
      x: direction > 0 ? '-100%' : '100%',
      opacity: 0,
      scale: 0.95,
    }),
  };

  const fadeVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0 },
  };

  const starVariants = {
    hidden: { opacity: 0, scale: 0 },
    visible: (i: number) => ({
      opacity: 1,
      scale: 1,
      transition: {
        delay: i * 0.1,
        type: 'spring',
        stiffness: 200,
        damping: 10,
      },
    }),
  };

  if (testimonials.length === 0) {
    return null;
  }

  return (
    <section
      className={cn(
        'relative py-16 md:py-24 overflow-hidden',
        className
      )}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      role="region"
      aria-roledescription="carousel"
      aria-label="Customer testimonials"
    >
      <div className="container mx-auto px-4 max-w-6xl">
        {/* Section header */}
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-100px' }}
          variants={fadeVariants}
          transition={{ duration: MOTION.duration.slow / 1000, ease: MOTION.easing.cinematic }}
          className="text-center mb-12 md:mb-16"
        >
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-display font-light tracking-tight mb-4">
            {COPY.testimonials.title}
          </h2>
          <p className="text-lg md:text-xl text-textSecondary max-w-2xl mx-auto">
            {COPY.testimonials.subtitle}
          </p>
        </motion.div>

        {/* Carousel container */}
        <div className="relative">
          {/* Testimonial card */}
          <div className="relative bg-gradient-to-br from-[var(--color-gray-dark)] to-[var(--color-black)] backdrop-blur-sm border border-[var(--color-gray-medium)] rounded-3xl p-8 md:p-12 shadow-2xl overflow-hidden">
            {/* Decorative gold accent */}
            <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-gold to-transparent" />
            
            {/* AnimatePresence for slide transitions */}
            <AnimatePresence initial={false} custom={direction} mode="wait">
              <motion.div
                key={currentTestimonial.id}
                custom={direction}
                variants={slideVariants}
                initial="enter"
                animate="center"
                exit="exit"
                transition={{
                  x: { type: 'spring', ...MOTION.spring.stiff },
                  opacity: { duration: MOTION.duration.normal / 1000 },
                  scale: { duration: MOTION.duration.normal / 1000 },
                }}
                className="flex flex-col lg:flex-row gap-8 lg:gap-12 items-center"
              >
                {/* Avatar/Image section */}
                <div className="flex-shrink-0">
                  <div className="relative w-24 h-24 md:w-32 md:h-32 lg:w-40 lg:h-40">
                    <div className="absolute inset-0 rounded-full bg-gradient-to-br from-gold to-goldDark" />
                    <motion.div
                      initial={{ opacity: 0, scale: 0.8 }}
                      animate={{ opacity: 1, scale: 1 }}
                      transition={{ delay: 0.2, type: 'spring', stiffness: 200, damping: 15 }}
                      className="absolute inset-2 rounded-full overflow-hidden border-4 border-[var(--color-gray-medium)]"
                    >
                      {currentTestimonial.avatarUrl ? (
                        <img
                          src={currentTestimonial.avatarUrl}
                          alt={currentTestimonial.author}
                          className="w-full h-full object-cover"
                        />
                      ) : (
                        <div className="w-full h-full flex items-center justify-center bg-grayMedium">
                          <span className="text-3xl font-display text-goldPale">
                            {currentTestimonial.author.charAt(0).toUpperCase()}
                          </span>
                        </div>
                      )}
                    </motion.div>
                    {/* Decorative rings */}
                    <motion.div
                      initial={{ opacity: 0, scale: 0.5 }}
                      animate={{ opacity: 1, scale: 1 }}
                      transition={{ delay: 0.3 }}
                      className="absolute inset-0 rounded-full border border-[var(--color-gold-transparent-30)]"
                      style={{ borderWidth: '2px' }}
                    />
                    <motion.div
                      initial={{ opacity: 0, scale: 0.8 }}
                      animate={{ opacity: 1, scale: 1 }}
                      transition={{ delay: 0.4 }}
                      className="absolute -inset-2 rounded-full border border-[var(--color-gold-transparent-10)]"
                      style={{ borderWidth: '1px' }}
                    />
                  </div>
                </div>

                {/* Content section */}
                <div className="flex-1 text-center lg:text-left">
                  {/* Star rating */}
                  <motion.div
                    initial="hidden"
                    animate="visible"
                    className="flex justify-center lg:justify-start gap-1 mb-6"
                  >
                    {[...Array(5)].map((_, i) => (
                      <motion.div
                        key={i}
                        custom={i}
                        variants={starVariants}
                        animate={i < currentTestimonial.rating ? 'visible' : 'hidden'}
                      >
                        <Star
                          size={24}
                          className={cn(
                            'fill-current',
                            i < currentTestimonial.rating
                              ? 'text-gold'
                              : 'text-grayLight'
                          )}
                          strokeWidth={1.5}
                        />
                      </motion.div>
                    ))}
                  </motion.div>

                  {/* Testimonial text */}
                  <motion.blockquote
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.1 }}
                    className="text-xl md:text-2xl lg:text-3xl font-display font-light italic text-textPrimary leading-relaxed mb-8"
                    aria-live="polite"
                  >
                    &ldquo;{currentTestimonial.text}&rdquo;
                  </motion.blockquote>

                  {/* Author info */}
                  <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.3 }}
                    className="space-y-2"
                  >
                    <h3 className="text-xl md:text-2xl font-display font-medium text-goldLight">
                      {currentTestimonial.author}
                    </h3>
                    <div className="space-y-1">
                      {currentTestimonial.role && (
                        <p className="text-lg text-textSecondary">
                          {currentTestimonial.role}
                        </p>
                      )}
                      <div className="flex flex-wrap items-center justify-center lg:justify-start gap-2">
                        {currentTestimonial.company && (
                          <span className="text-sm md:text-base text-textTertiary bg-[var(--color-gray-dark)] px-3 py-1 rounded-full">
                            {currentTestimonial.company}
                          </span>
                        )}
                        {currentTestimonial.event && (
                          <span className="text-sm md:text-base text-gold bg-[var(--color-gold-transparent-30)] px-3 py-1 rounded-full">
                            {currentTestimonial.event}
                          </span>
                        )}
                      </div>
                    </div>
                  </motion.div>
                </div>
              </motion.div>
            </AnimatePresence>

            {/* Auto-rotation indicator */}
            {testimonials.length > 1 && (
              <div className="absolute bottom-6 left-1/2 transform -translate-x-1/2">
                <div className="flex items-center gap-2">
                  <div className="w-32 h-0.5 bg-[var(--color-gray-light)] rounded-full overflow-hidden">
                    <motion.div
                      key={currentIndex}
                      initial={{ width: '0%' }}
                      animate={{ width: '100%' }}
                      transition={{ duration: autoRotateInterval / 1000, ease: 'linear' }}
                      className="h-full bg-gold"
                    />
                  </div>
                  <span className="text-xs text-textTertiary">
                    {currentIndex + 1} / {testimonials.length}
                  </span>
                </div>
              </div>
            )}
          </div>

          {/* Navigation buttons */}
          {showNavigation && testimonials.length > 1 && (
            <>
              <button
                onClick={goToPrev}
                className="absolute top-1/2 -left-4 md:-left-8 transform -translate-y-1/2 w-12 h-12 md:w-16 md:h-16 rounded-full bg-[var(--color-gray-dark)] backdrop-blur-sm border border-[var(--color-gray-medium)] hover:border-[var(--color-gold-transparent-50)] hover:bg-[var(--color-gray-dark)] flex items-center justify-center transition-all duration-300 group focus:outline-none focus:ring-2 focus:ring-[var(--color-gold-transparent-50)] focus:ring-offset-2 focus:ring-offset-black"
                aria-label="Previous testimonial"
              >
                <ChevronLeft
                  size={24}
                  className="text-textSecondary group-hover:text-gold group-hover:scale-110 transition-transform duration-300"
                />
              </button>
              <button
                onClick={goToNext}
                className="absolute top-1/2 -right-4 md:-right-8 transform -translate-y-1/2 w-12 h-12 md:w-16 md:h-16 rounded-full bg-[var(--color-gray-dark)] backdrop-blur-sm border border-[var(--color-gray-medium)] hover:border-[var(--color-gold-transparent-50)] hover:bg-[var(--color-gray-dark)] flex items-center justify-center transition-all duration-300 group focus:outline-none focus:ring-2 focus:ring-[var(--color-gold-transparent-50)] focus:ring-offset-2 focus:ring-offset-black"
                aria-label="Next testimonial"
              >
                <ChevronRight
                  size={24}
                  className="text-textSecondary group-hover:text-gold group-hover:scale-110 transition-transform duration-300"
                />
              </button>
            </>
          )}
        </div>

        {/* Dots navigation */}
        {showDots && testimonials.length > 1 && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
            className="flex justify-center gap-3 mt-10 md:mt-12"
          >
            {testimonials.map((_, index) => (
              <button
                key={index}
                onClick={() => goToSlide(index)}
                className={cn(
                  'w-3 h-3 rounded-full transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-[var(--color-gold-transparent-50)] focus:ring-offset-2 focus:ring-offset-black',
                  index === currentIndex
                    ? 'bg-gold scale-125'
                    : 'bg-[var(--color-gray-light)] hover:bg-[var(--color-gray-light)]'
                )}
                aria-label={`Go to testimonial ${index + 1}`}
              />
            ))}
          </motion.div>
        )}

        {/* Pause indicator */}
        {isPaused && testimonials.length > 1 && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="absolute bottom-4 right-4 text-xs text-textTertiary bg-[var(--color-black-transparent-50)] px-2 py-1 rounded"
          >
            Paused
          </motion.div>
        )}

        {/* Background decorative elements */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.5 }}
          className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-96 h-96 rounded-full blur-3xl pointer-events-none"
          style={{ backgroundColor: 'rgba(0,92,72,0.05)' }}
        />
      </div>
    </section>
  );
}