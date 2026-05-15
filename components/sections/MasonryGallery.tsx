'use client';

import { motion, AnimatePresence } from 'framer-motion';
import { useState, useRef } from 'react';
import { Search, X, Maximize2, Heart } from 'lucide-react';
import Lightbox from './Lightbox';
import { MOTION } from '@/lib/tokens';

type GalleryItem = {
  id: number;
  title: string;
  category: string;
  image: string;
  svgPattern: React.ReactNode;
  aspectRatio: string;
  featured?: boolean;
};

const makeSvg = (children: React.ReactNode) => (
  <svg aria-hidden="true" width="100%" height="100%" xmlns="http://www.w3.org/2000/svg">
    <rect width="100%" height="100%" fill="#111111" />
    {children}
  </svg>
);

const galleryItems: GalleryItem[] = [
  {
    id: 1, title: 'Gala Event Setup', category: 'events', image: '', aspectRatio: 'portrait', featured: true,
    svgPattern: makeSvg(<>
      {Array.from({ length: 8 }).map((_, i) => <line key={i} x1={`${i * 14}%`} y1="0%" x2={`${i * 14 + 14}%`} y2="100%" stroke="rgba(0,92,72,0.10)" strokeWidth="1" />)}
      <polygon points="50%,10% 85%,50% 50%,90% 15%,50%" fill="none" stroke="rgba(0,92,72,0.22)" strokeWidth="1.5" />
      <circle cx="50%" cy="50%" r="15%" fill="none" stroke="rgba(0,92,72,0.12)" strokeWidth="1" />
    </>),
  },
  {
    id: 2, title: 'Mirror Booth in Action', category: 'mirror', image: '', aspectRatio: 'square',
    svgPattern: makeSvg(<>
      {Array.from({ length: 6 }).map((_, i) => <circle key={i} cx="50%" cy="50%" r={`${(i + 1) * 8}%`} fill="none" stroke="rgba(0,92,72,0.10)" strokeWidth="1" />)}
      <rect x="25%" y="25%" width="50%" height="50%" fill="none" stroke="rgba(0,92,72,0.20)" strokeWidth="1.5" transform="rotate(45 50 50)" />
    </>),
  },
  {
    id: 3, title: 'Wedding Reception', category: 'weddings', image: '', aspectRatio: 'landscape',
    svgPattern: makeSvg(<>
      {Array.from({ length: 10 }).map((_, i) => <line key={i} x1="0%" y1={`${i * 11}%`} x2="100%" y2={`${i * 11}%`} stroke="rgba(0,92,72,0.08)" strokeWidth="1" />)}
      {Array.from({ length: 10 }).map((_, i) => <line key={`v${i}`} x1={`${i * 11}%`} y1="0%" x2={`${i * 11}%`} y2="100%" stroke="rgba(0,92,72,0.08)" strokeWidth="1" />)}
      <rect x="20%" y="20%" width="60%" height="60%" fill="none" stroke="rgba(0,92,72,0.24)" strokeWidth="1.5" />
    </>),
  },
  {
    id: 4, title: 'Editorial Portraits', category: 'editorial', image: '', aspectRatio: 'portrait', featured: true,
    svgPattern: makeSvg(<>
      <line x1="50%" y1="50%" x2="100.00%" y2="50.00%" stroke="rgba(0,92,72,0.07)" strokeWidth="1" />
      <line x1="50%" y1="50%" x2="93.30%" y2="75.00%" stroke="rgba(0,92,72,0.07)" strokeWidth="1" />
      <line x1="50%" y1="50%" x2="75.00%" y2="93.30%" stroke="rgba(0,92,72,0.07)" strokeWidth="1" />
      <line x1="50%" y1="50%" x2="50.00%" y2="100.00%" stroke="rgba(0,92,72,0.07)" strokeWidth="1" />
      <line x1="50%" y1="50%" x2="25.00%" y2="93.30%" stroke="rgba(0,92,72,0.07)" strokeWidth="1" />
      <line x1="50%" y1="50%" x2="6.70%" y2="75.00%" stroke="rgba(0,92,72,0.07)" strokeWidth="1" />
      <line x1="50%" y1="50%" x2="0.00%" y2="50.00%" stroke="rgba(0,92,72,0.07)" strokeWidth="1" />
      <line x1="50%" y1="50%" x2="6.70%" y2="25.00%" stroke="rgba(0,92,72,0.07)" strokeWidth="1" />
      <line x1="50%" y1="50%" x2="25.00%" y2="6.70%" stroke="rgba(0,92,72,0.07)" strokeWidth="1" />
      <line x1="50%" y1="50%" x2="50.00%" y2="0.00%" stroke="rgba(0,92,72,0.07)" strokeWidth="1" />
      <line x1="50%" y1="50%" x2="75.00%" y2="6.70%" stroke="rgba(0,92,72,0.07)" strokeWidth="1" />
      <line x1="50%" y1="50%" x2="93.30%" y2="25.00%" stroke="rgba(0,92,72,0.07)" strokeWidth="1" />
      <circle cx="50%" cy="50%" r="20%" fill="none" stroke="rgba(0,92,72,0.25)" strokeWidth="1.5" />
      <circle cx="50%" cy="50%" r="8%" fill="rgba(0,92,72,0.12)" />
    </>),
  },
  {
    id: 5, title: 'Corporate Launch', category: 'corporate', image: '', aspectRatio: 'landscape',
    svgPattern: makeSvg(<>
      {Array.from({ length: 5 }).map((_, row) =>
        Array.from({ length: 7 }).map((_, col) => (
          <rect key={`${row}-${col}`} x={`${col * 15 + 2}%`} y={`${row * 20 + 2}%`} width="12%" height="16%" fill="none" stroke="rgba(0,92,72,0.10)" strokeWidth="1" />
        ))
      )}
    </>),
  },
  {
    id: 6, title: 'Vintage Retro Setup', category: 'vintage', image: '', aspectRatio: 'square',
    svgPattern: makeSvg(<>
      {Array.from({ length: 8 }).map((_, i) => (
        <circle key={i} cx="50%" cy="50%" r={`${i * 7}%`} fill="none" stroke="rgba(0,92,72,0.09)" strokeWidth="1" strokeDasharray="4,4" />
      ))}
      <line x1="20%" y1="50%" x2="80%" y2="50%" stroke="rgba(0,92,72,0.18)" strokeWidth="1" />
      <line x1="50%" y1="20%" x2="50%" y2="80%" stroke="rgba(0,92,72,0.18)" strokeWidth="1" />
    </>),
  },
  {
    id: 7, title: 'Luxury Wedding', category: 'weddings', image: '', aspectRatio: 'portrait',
    svgPattern: makeSvg(<>
      {Array.from({ length: 6 }).map((_, i) => <line key={i} x1={`${i * 20}%`} y1="0%" x2={`${i * 20}%`} y2="100%" stroke="rgba(0,92,72,0.08)" strokeWidth="1" />)}
      <polygon points="50%,5% 95%,50% 50%,95% 5%,50%" fill="none" stroke="rgba(0,92,72,0.18)" strokeWidth="1.5" />
      <polygon points="50%,20% 80%,50% 50%,80% 20%,50%" fill="none" stroke="rgba(0,92,72,0.12)" strokeWidth="1" />
    </>),
  },
  {
    id: 8, title: 'Mirror Effects', category: 'mirror', image: '', aspectRatio: 'landscape',
    svgPattern: makeSvg(<>
      {Array.from({ length: 4 }).map((_, row) =>
        Array.from({ length: 5 }).map((_, col) => {
          const cx = col * 22 + 11;
          const cy = row * 26 + 13;
          return <polygon key={`${row}-${col}`} points={`${cx}%,${cy - 10}% ${cx + 9}%,${cy - 5}% ${cx + 9}%,${cy + 5}% ${cx}%,${cy + 10}% ${cx - 9}%,${cy + 5}% ${cx - 9}%,${cy - 5}%`} fill="none" stroke="rgba(0,92,72,0.10)" strokeWidth="1" />;
        })
      )}
    </>),
  },
  {
    id: 9, title: 'Editorial Lighting', category: 'editorial', image: '', aspectRatio: 'square', featured: true,
    svgPattern: makeSvg(<>
      {Array.from({ length: 15 }).map((_, i) => <line key={i} x1="0%" y1={`${i * 7}%`} x2="100%" y2={`${i * 7}%`} stroke="rgba(0,92,72,0.07)" strokeWidth="1" />)}
      <rect x="15%" y="15%" width="70%" height="70%" fill="none" stroke="rgba(0,92,72,0.20)" strokeWidth="1.5" />
      <rect x="30%" y="30%" width="40%" height="40%" fill="none" stroke="rgba(0,92,72,0.14)" strokeWidth="1" />
      <circle cx="50%" cy="50%" r="10%" fill="rgba(0,92,72,0.10)" />
    </>),
  },
  {
    id: 10, title: 'Gala Night', category: 'events', image: '', aspectRatio: 'landscape',
    svgPattern: makeSvg(<>
      {Array.from({ length: 20 }).map((_, i) => <line key={i} x1={`${i * 5 - 5}%`} y1="0%" x2={`${i * 5 + 10}%`} y2="100%" stroke="rgba(0,92,72,0.07)" strokeWidth="1" />)}
      <ellipse cx="50%" cy="50%" rx="35%" ry="40%" fill="none" stroke="rgba(0,92,72,0.20)" strokeWidth="1.5" />
    </>),
  },
  {
    id: 11, title: 'Corporate Awards', category: 'corporate', image: '', aspectRatio: 'portrait',
    svgPattern: makeSvg(<>
      {Array.from({ length: 8 }).map((_, i) => <line key={i} x1="0%" y1={`${i * 13}%`} x2="100%" y2={`${i * 13}%`} stroke="rgba(0,92,72,0.07)" strokeWidth="1" />)}
      {Array.from({ length: 8 }).map((_, i) => <line key={`v${i}`} x1={`${i * 13}%`} y1="0%" x2={`${i * 13}%`} y2="100%" stroke="rgba(0,92,72,0.07)" strokeWidth="1" />)}
      <polygon points="50%,15% 70%,40% 85%,70% 50%,85% 15%,70% 30%,40%" fill="none" stroke="rgba(0,92,72,0.22)" strokeWidth="1.5" />
    </>),
  },
  {
    id: 12, title: 'Vintage Prints', category: 'vintage', image: '', aspectRatio: 'square',
    svgPattern: makeSvg(<>
      {Array.from({ length: 10 }).map((_, i) => (
        <circle key={i} cx="50%" cy="50%" r={`${i * 5 + 3}%`} fill="none" stroke="rgba(0,92,72,0.08)" strokeWidth="1" strokeDasharray="3,6" />
      ))}
      <rect x="30%" y="30%" width="40%" height="40%" fill="none" stroke="rgba(0,92,72,0.20)" strokeWidth="1.5" transform="rotate(45 50 50)" />
    </>),
  },
];

const categories = [
  { id: 'all', label: 'All Works' },
  { id: 'editorial', label: 'Editorial' },
  { id: 'mirror', label: 'Mirror Booth' },
  { id: 'vintage', label: 'Vintage' },
  { id: 'weddings', label: 'Weddings' },
  { id: 'corporate', label: 'Corporate' },
  { id: 'events', label: 'Events' },
];

const aspectRatioClasses = {
  square: 'aspect-square',
  portrait: 'aspect-[3/4]',
  landscape: 'aspect-[4/3]',
};

export default function MasonryGallery() {
  const [activeCategory, setActiveCategory] = useState<string>('all');
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [selectedImage, setSelectedImage] = useState<GalleryItem | null>(null);
  const [isLightboxOpen, setIsLightboxOpen] = useState<boolean>(false);
  const searchInputRef = useRef<HTMLInputElement>(null);

  const filteredItems = galleryItems.filter(item => {
    const matchesCategory = activeCategory === 'all' || item.category === activeCategory;
    const matchesSearch = item.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.category.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  const handleImageClick = (item: GalleryItem) => {
    setSelectedImage(item);
    setIsLightboxOpen(true);
  };

  const handleCloseLightbox = () => {
    setIsLightboxOpen(false);
    setTimeout(() => setSelectedImage(null), 300);
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Escape' && isLightboxOpen) {
      handleCloseLightbox();
    }
  };

  return (
    <section className="py-[var(--space-10)] bg-black-green" onKeyDown={handleKeyDown} tabIndex={-1}>
      <div className="container px-4 mx-auto max-w-7xl">
        {/* Header */}
        <div className="mb-12 text-center">
          <motion.h2
            className="mb-4 text-4xl font-bold tracking-tight text-[var(--color-text-primary)] md:text-5xl"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            Editorial Gallery
          </motion.h2>
          <motion.p
            className="max-w-3xl mx-auto text-lg text-[var(--color-text-secondary)]"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
          >
            Explore our curated collection of luxury photo booth experiences.
            Each image showcases the meticulous attention to detail that defines Luminary Booth Co.
          </motion.p>
        </div>

        {/* Controls */}
        <div className="sticky top-4 z-20 mb-8">
          <div className="flex flex-col gap-4 p-4 rounded-sm bg-[var(--color-black-transparent-70)] backdrop-blur-sm border border-[var(--color-gray-medium)] sm:flex-row sm:items-center">
            {/* Category filter tabs */}
            <div className="flex flex-wrap gap-2">
              {categories.map((category) => (
                <motion.button
                  key={category.id}
                  className={`px-4 py-2 text-sm font-medium rounded-sm transition-all duration-300 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-gold focus-visible:ring-offset-2 focus-visible:ring-offset-black ${
                    activeCategory === category.id
                      ? 'bg-[var(--color-gold)] text-[var(--color-black)]'
                      : 'bg-[var(--color-gray-dark)] text-[var(--color-text-secondary)] hover:text-[var(--color-text-primary)] hover:bg-[var(--color-gray-medium)]'
                  }`}
                  onClick={() => setActiveCategory(category.id)}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  {category.label}
                </motion.button>
              ))}
            </div>

            {/* Search input */}
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-[var(--color-text-tertiary)]" />
              <input
                ref={searchInputRef}
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search gallery..."
                className="w-full pl-10 pr-10 py-2 bg-[var(--color-gray-dark)] border border-[var(--color-gray-medium)] text-[var(--color-text-primary)] rounded-sm placeholder-[var(--color-text-placeholder)] focus:outline-none focus:border-[var(--color-gold)] focus:ring-1 focus:ring-[var(--color-gold)]"
              />
              {searchQuery && (
                <button
                  onClick={() => setSearchQuery('')}
                  className="absolute right-3 top-1/2 transform -translate-y-1/2 text-[var(--color-text-tertiary)] hover:text-[var(--color-text-primary)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-gold rounded-sm"
                  aria-label="Clear search"
                >
                  <X className="w-4 h-4" />
                </button>
              )}
            </div>
          </div>
        </div>

        {/* Masonry grid */}
        <AnimatePresence mode="wait">
          <motion.div
            key={`${activeCategory}-${searchQuery}`}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1, transition: { staggerChildren: MOTION.stagger.normal } }}
            exit={{ opacity: 0 }}
            className="relative"
          >
            {filteredItems.length === 0 ? (
              <div className="py-20 text-center">
                <p className="text-lg text-[var(--color-text-secondary)]">No images found matching your criteria.</p>
              </div>
            ) : (
              <div className="columns-1 gap-4 sm:columns-2 lg:columns-3">
                {filteredItems.map((item) => (
                  <motion.div
                    key={item.id}
                    layout
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.9 }}
                    transition={{ duration: MOTION.duration.fast / 1000 }}
                    className="relative mb-4 break-inside-avoid cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-gold focus-visible:ring-offset-2 focus-visible:ring-offset-black rounded-sm"
                    onClick={() => handleImageClick(item)}
                    onKeyDown={(e) => {
                      if (e.key === 'Enter' || e.key === ' ') {
                        e.preventDefault();
                        handleImageClick(item);
                      }
                    }}
                    role="button"
                    tabIndex={0}
                    aria-label={`View ${item.title}`}
                  >
                    <div className={`relative overflow-hidden rounded-sm ${aspectRatioClasses[item.aspectRatio as keyof typeof aspectRatioClasses]}`}>
                      {/* SVG pattern background */}
                      <motion.div
                        className="absolute inset-0"
                        whileHover={{ scale: 1.1 }}
                        transition={{ duration: MOTION.duration.slow / 1000, ease: MOTION.easing.inOut }}
                      >
                        {item.svgPattern}
                      </motion.div>

                      {/* Overlay gradient */}
                      <div className="absolute inset-0 bg-gradient-to-t from-[var(--color-black-transparent-70)] via-transparent to-transparent"></div>

                      {/* Content overlay */}
                      <div className="absolute inset-0 flex flex-col justify-end p-6">
                        {/* Category badge */}
                        <div className="inline-flex mb-2 px-3 py-1 text-xs font-medium tracking-wider uppercase rounded-sm bg-[var(--color-gold-transparent-10)] text-[var(--color-gold)]">
                          {item.category}
                        </div>

                        {/* Title */}
                        <h3 className="mb-2 text-xl font-semibold text-[var(--color-text-primary)]">
                          {item.title}
                        </h3>

                        {/* Featured tag */}
                        {item.featured && (
                          <div className="inline-flex items-center gap-1 mb-3 text-xs font-medium text-[var(--color-gold)]">
                            <Heart className="w-3 h-3 fill-current" />
                            Featured Work
                          </div>
                        )}

                        {/* Hover actions */}
                        <div className="absolute top-4 right-4 translate-y-2 opacity-0 transition-all duration-300 group-hover:translate-y-0 group-hover:opacity-100">
                          <div className="p-2 rounded-sm bg-[var(--color-black-transparent-70)] backdrop-blur-sm border border-[var(--color-gold-transparent-30)]">
                            <Maximize2 className="w-5 h-5 text-[var(--color-gold)]" />
                          </div>
                        </div>
                      </div>
                    </div>

                    {/* Gold accent line */}
                    <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-gradient-to-r from-transparent via-[var(--color-gold-transparent-50)] to-transparent"></div>
                  </motion.div>
                ))}
              </div>
            )}
          </motion.div>
        </AnimatePresence>

        {/* Results count */}
        <motion.div
          className="mt-8 text-center text-[var(--color-text-tertiary)]"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.2 }}
        >
          Showing {filteredItems.length} of {galleryItems.length} works
        </motion.div>
      </div>

      {/* Lightbox */}
      <AnimatePresence>
        {isLightboxOpen && selectedImage && (
          <Lightbox
            image={selectedImage.image}
            title={selectedImage.title}
            category={selectedImage.category}
            isOpen={isLightboxOpen}
            onClose={handleCloseLightbox}
          />
        )}
      </AnimatePresence>
    </section>
  );
}
