'use client';

import { motion, AnimatePresence } from 'framer-motion';
import { useEffect, useCallback } from 'react';
import { X, ChevronLeft, ChevronRight, Maximize2, Download, Heart } from 'lucide-react';

interface LightboxProps {
  image: string;
  title: string;
  category: string;
  isOpen: boolean;
  onClose: () => void;
}

export default function Lightbox({ image, title, category, isOpen, onClose }: LightboxProps) {
  const handleKeyDown = useCallback((event: KeyboardEvent) => {
    switch (event.key) {
      case 'Escape':
        onClose();
        break;
      case 'ArrowLeft':
        // Navigate to previous image (would need image array in real implementation)
        break;
      case 'ArrowRight':
        // Navigate to next image (would need image array in real implementation)
        break;
      default:
        break;
    }
  }, [onClose]);

  useEffect(() => {
    if (isOpen) {
      document.addEventListener('keydown', handleKeyDown);
      document.body.style.overflow = 'hidden';
    }

    return () => {
      document.removeEventListener('keydown', handleKeyDown);
      document.body.style.overflow = 'unset';
    };
  }, [isOpen, handleKeyDown]);

  const backdropVariants = {
    hidden: { opacity: 0 },
    visible: { opacity: 1 },
  };

  const lightboxVariants = {
    hidden: { opacity: 0, scale: 0.9, y: 20 },
    visible: { opacity: 1, scale: 1, y: 0 },
    exit: { opacity: 0, scale: 0.9, y: 20 },
  };

  const imageVariants = {
    hidden: { opacity: 0, scale: 1.1 },
    visible: { opacity: 1, scale: 1 },
    exit: { opacity: 0, scale: 0.9 },
  };

  if (!isOpen) return null;

  return (
    <AnimatePresence>
      <motion.div
        className="fixed inset-0 z-50 flex items-center justify-center"
        initial="hidden"
        animate="visible"
        exit="hidden"
      >
        {/* Backdrop */}
        <motion.div
          className="absolute inset-0 bg-[var(--color-black-transparent-90)] backdrop-blur-sm"
          variants={backdropVariants}
          onClick={onClose}
        />

        {/* Lightbox container */}
        <motion.div
          className="relative z-10 w-full h-full max-w-7xl max-h-[90vh] mx-4 overflow-hidden rounded-sm"
          variants={lightboxVariants}
          transition={{ type: 'spring', stiffness: 100, damping: 20 }}
        >
          {/* Close button */}
          <motion.button
            className="absolute top-4 right-4 z-20 p-2 rounded-sm bg-[var(--color-black-transparent-70)] backdrop-blur-sm border border-[var(--color-gold-transparent-30)] hover:bg-[var(--color-black-transparent-80)] transition-colors"
            onClick={onClose}
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.95 }}
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
          >
            <X className="w-6 h-6 text-[var(--color-text-primary)]" />
          </motion.button>

          {/* Navigation buttons */}
          <motion.button
            className="absolute left-4 top-1/2 z-20 p-3 -translate-y-1/2 rounded-sm bg-[var(--color-black-transparent-70)] backdrop-blur-sm border border-[var(--color-gold-transparent-30)] hover:bg-[var(--color-black-transparent-80)] transition-colors"
            onClick={() => {/* Navigate previous */}}
            whileHover={{ scale: 1.1, x: -2 }}
            whileTap={{ scale: 0.95 }}
            initial={{ opacity: 0, x: -10 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.3 }}
          >
            <ChevronLeft className="w-6 h-6 text-[var(--color-text-primary)]" />
          </motion.button>

          <motion.button
            className="absolute right-4 top-1/2 z-20 p-3 -translate-y-1/2 rounded-sm bg-[var(--color-black-transparent-70)] backdrop-blur-sm border border-[var(--color-gold-transparent-30)] hover:bg-[var(--color-black-transparent-80)] transition-colors"
            onClick={() => {/* Navigate next */}}
            whileHover={{ scale: 1.1, x: 2 }}
            whileTap={{ scale: 0.95 }}
            initial={{ opacity: 0, x: 10 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.3 }}
          >
            <ChevronRight className="w-6 h-6 text-[var(--color-text-primary)]" />
          </motion.button>

          {/* Image container */}
          <div className="relative flex items-center justify-center w-full h-full">
            <motion.div
              className="relative w-full h-full"
              variants={imageVariants}
              transition={{ duration: 0.5, ease: 'easeOut' }}
            >
              {/* Image */}
              <div
                className="w-full h-full bg-cover bg-center"
                style={{ backgroundImage: `url(${image})` }}
              />
              
              {/* Gradient overlays */}
              <div className="absolute inset-0 bg-gradient-to-t from-[var(--color-black-transparent-80)] via-transparent to-transparent" />
              <div className="absolute inset-0 bg-gradient-to-b from-[var(--color-black-transparent-60)] via-transparent to-transparent" />
            </motion.div>
          </div>

          {/* Info panel */}
          <motion.div
            className="absolute bottom-0 left-0 right-0 p-6 bg-gradient-to-t from-[var(--color-black-transparent-90)] to-transparent backdrop-blur-sm"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
          >
            <div className="flex flex-col items-start justify-between gap-4 sm:flex-row sm:items-center">
              <div>
                {/* Category badge */}
                <div className="inline-flex items-center gap-2 px-3 py-1 mb-2 text-xs font-medium tracking-wider uppercase rounded-sm bg-[var(--color-gold-transparent-20)] text-[var(--color-gold)]">
                  <Heart className="w-3 h-3 fill-current" />
                  {category}
                </div>

                {/* Title */}
                <h3 className="mb-1 text-2xl font-bold text-[var(--color-text-primary)]">
                  {title}
                </h3>

                {/* Description */}
                <p className="text-sm text-[var(--color-text-secondary)]">
                  Editorial photography by Luminary Booth Co. • Premium lighting setup • Professional retouching
                </p>
              </div>

              {/* Action buttons */}
              <div className="flex gap-2">
                <motion.button
                  className="p-3 rounded-sm bg-[var(--color-black-transparent-70)] border border-[var(--color-gold-transparent-30)] hover:bg-[var(--color-black-transparent-80)] transition-colors"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <Maximize2 className="w-5 h-5 text-[var(--color-gold)]" />
                </motion.button>
                <motion.button
                  className="p-3 rounded-sm bg-[var(--color-black-transparent-70)] border border-[var(--color-gold-transparent-30)] hover:bg-[var(--color-black-transparent-80)] transition-colors"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <Download className="w-5 h-5 text-[var(--color-gold)]" />
                </motion.button>
              </div>
            </div>
          </motion.div>

          {/* Bottom indicator */}
          <motion.div
            className="absolute bottom-0 left-1/2 transform -translate-x-1/2"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.5 }}
          >
            <div className="flex items-center gap-2 p-2 mb-2 text-xs text-[var(--color-text-tertiary)]">
              <kbd className="px-2 py-1 rounded-sm bg-[var(--color-black-transparent-70)] border border-[var(--color-gray-medium)]">
                ESC
              </kbd>
              <span>to close</span>
              <span className="mx-2">•</span>
              <kbd className="px-2 py-1 rounded-sm bg-[var(--color-black-transparent-70)] border border-[var(--color-gray-medium)]">
                ←
              </kbd>
              <kbd className="px-2 py-1 rounded-sm bg-[var(--color-black-transparent-70)] border border-[var(--color-gray-medium)]">
                →
              </kbd>
              <span>to navigate</span>
            </div>
          </motion.div>
        </motion.div>

        {/* Decorative corners */}
        <div className="absolute top-4 left-4 w-8 h-8 border-t-2 border-l-2 border-[var(--color-gold-transparent-30)]" />
        <div className="absolute top-4 right-4 w-8 h-8 border-t-2 border-r-2 border-[var(--color-gold-transparent-30)]" />
        <div className="absolute bottom-4 left-4 w-8 h-8 border-b-2 border-l-2 border-[var(--color-gold-transparent-30)]" />
        <div className="absolute bottom-4 right-4 w-8 h-8 border-b-2 border-r-2 border-[var(--color-gold-transparent-30)]" />
      </motion.div>
    </AnimatePresence>
  );
}