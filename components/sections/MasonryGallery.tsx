'use client';

import { motion, AnimatePresence } from 'framer-motion';
import { useState, useRef } from 'react';
import { Search, X, Maximize2, Heart } from 'lucide-react';
import Lightbox from './Lightbox';

type GalleryItem = {
  id: number;
  title: string;
  category: string;
  image: string;
  aspectRatio: string;
  featured?: boolean;
};

const galleryItems: GalleryItem[] = [
  { id: 1, title: 'Gala Event Setup', category: 'events', image: '/placeholder/gallery/gala-1.jpg', aspectRatio: 'portrait', featured: true },
  { id: 2, title: 'Mirror Booth in Action', category: 'mirror', image: '/placeholder/gallery/mirror-1.jpg', aspectRatio: 'square' },
  { id: 3, title: 'Wedding Reception', category: 'weddings', image: '/placeholder/gallery/wedding-1.jpg', aspectRatio: 'landscape' },
  { id: 4, title: 'Editorial Portraits', category: 'editorial', image: '/placeholder/gallery/editorial-1.jpg', aspectRatio: 'portrait', featured: true },
  { id: 5, title: 'Corporate Launch', category: 'corporate', image: '/placeholder/gallery/corporate-1.jpg', aspectRatio: 'landscape' },
  { id: 6, title: 'Vintage Retro Setup', category: 'vintage', image: '/placeholder/gallery/vintage-1.jpg', aspectRatio: 'square' },
  { id: 7, title: 'Luxury Wedding', category: 'weddings', image: '/placeholder/gallery/wedding-2.jpg', aspectRatio: 'portrait' },
  { id: 8, title: 'Mirror Effects', category: 'mirror', image: '/placeholder/gallery/mirror-2.jpg', aspectRatio: 'landscape' },
  { id: 9, title: 'Editorial Lighting', category: 'editorial', image: '/placeholder/gallery/editorial-2.jpg', aspectRatio: 'square', featured: true },
  { id: 10, title: 'Gala Night', category: 'events', image: '/placeholder/gallery/gala-2.jpg', aspectRatio: 'landscape' },
  { id: 11, title: 'Corporate Awards', category: 'corporate', image: '/placeholder/gallery/corporate-2.jpg', aspectRatio: 'portrait' },
  { id: 12, title: 'Vintage Prints', category: 'vintage', image: '/placeholder/gallery/vintage-2.jpg', aspectRatio: 'square' },
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
    <section className="py-[var(--space-10)] bg-[var(--color-gray-dark)]" onKeyDown={handleKeyDown} tabIndex={-1}>
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
                  className={`px-4 py-2 text-sm font-medium rounded-sm transition-all duration-300 ${
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
                  className="absolute right-3 top-1/2 transform -translate-y-1/2 text-[var(--color-text-tertiary)] hover:text-[var(--color-text-primary)]"
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
            animate={{ opacity: 1 }}
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
                    transition={{ duration: 0.3 }}
                    className="relative mb-4 break-inside-avoid group cursor-pointer"
                    onClick={() => handleImageClick(item)}
                  >
                    <div className={`relative overflow-hidden rounded-sm ${aspectRatioClasses[item.aspectRatio as keyof typeof aspectRatioClasses]}`}>
                      {/* Image background */}
                      <div 
                        className="absolute inset-0 bg-cover bg-center transition-transform duration-700 group-hover:scale-110"
                        style={{ backgroundImage: `url(${item.image})` }}
                      ></div>
                      
                      {/* Overlay gradient */}
                      <div className="absolute inset-0 bg-gradient-to-t from-[var(--color-black-transparent-80)] via-transparent to-transparent"></div>
                      
                      {/* Content overlay */}
                      <div className="absolute inset-0 flex flex-col justify-end p-6 transition-all duration-300 group-hover:bg-[var(--color-black-transparent-50)]">
                        {/* Category badge */}
                        <div className="inline-flex mb-2 px-3 py-1 text-xs font-medium tracking-wider uppercase rounded-sm bg-[var(--color-gold-transparent-20)] text-[var(--color-gold)]">
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
                    <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-gradient-to-r from-transparent via-[var(--color-gold-transparent-50)] to-transparent transform scale-x-0 group-hover:scale-x-100 transition-transform duration-500"></div>
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