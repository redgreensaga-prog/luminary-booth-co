# Phase 3 Changes Log

## FIX 1 — HeroSection.tsx

- Added `useEffect` / `useState` for `prefersReduced` (window.matchMedia 'prefers-reduced-motion: reduce')
- Added `import { MOTION } from '@/lib/tokens'` and `import { Button } from '@/components/primitives/Button'`
- `itemVariants.transition`: replaced `stiffness:100, damping:20` → spread `MOTION.spring.normal`
- `staggerChildren`: raw `0.1` → `MOTION.stagger.normal`; `duration: 0.8` → `MOTION.duration.slow / 1000`
- SVG path transitions (lines ~93, ~107): `duration: 2` / `2.5` → `MOTION.duration.slowest / 1000`; `ease: 'easeInOut'` → `MOTION.easing.inOut`
- Particle dots: `w-[1px] h-[1px]` → `w-1 h-1` (4px visible size)
- Particle `duration: 3` → `MOTION.duration.slowest / 1000`; `ease: 'linear'` → `MOTION.easing.linear`
- Particle `animate` conditionally skipped when `prefersReduced`
- Scroll indicator: `delay:2, duration:1` → `MOTION.duration.slower / 1000` delay + `MOTION.duration.normal / 1000` duration
- CTAs: replaced raw `<button>` elements with `<Button variant="primary" size="lg">` and `<Button variant="ghost" size="lg">` using `rightIcon`

## FIX 2 — BoothShowcase.tsx

- Added `useEffect` / `useState` for `prefersReduced`
- Added `import { MOTION } from '@/lib/tokens'`
- `tabVariants.active.transition`: `stiffness:300, damping:20` → spread `MOTION.spring.stiff`
- `activeTabIndicator` transition: same fix → `MOTION.spring.stiff`
- `contentVariants.center.transition`: `ease: 'easeInOut'` → `MOTION.easing.inOut`; `duration: 0.5` → `MOTION.duration.normal / 1000`
- `contentVariants.exit.transition`: `duration: 0.3` → `MOTION.duration.fast / 1000`
- Section `h2` `whileInView`: added `transition` with `MOTION.duration.normal / 1000` + `MOTION.easing.editorial`
- Subtitle `motion.p`: added `duration` + `ease` to match MOTION tokens; delay skipped when `prefersReduced`
- Added `svgCrossfadeVariants` wrapping `activeBooth.svgPattern` in `<AnimatePresence mode="wait">` inside the image panel — opacity 0→1 crossfade on tab switch
- All delays conditional on `prefersReduced`

## FIX 3 — MasonryGallery.tsx

- Added `import { MOTION } from '@/lib/tokens'`
- Item `transition.duration`: `0.3` → `MOTION.duration.fast / 1000`
- Grid container `animate`: added `transition: { staggerChildren: MOTION.stagger.normal }` for initial load
- Image hover zoom: replaced CSS `transition-transform duration-700 group-hover:scale-110` with Framer Motion `<motion.div whileHover={{ scale: 1.1 }} transition={{ duration: MOTION.duration.slow / 1000, ease: MOTION.easing.inOut }}>`
- Removed `group` class from card (no longer needed for CSS hover); removed `group-hover:bg-[...]` from content overlay; simplified gold accent line

## FIX 4 — Footer.tsx

- Added `'use client'` directive (needed for `useState` / `useEffect`)
- Added `import { motion } from 'framer-motion'`, `import { useEffect, useState }`, `import { MOTION } from '@/lib/tokens'`
- Added `prefersReduced` state via `window.matchMedia`
- `containerVariants`: fade-up `y:30→0, opacity:0→1` on `whileInView` with `MOTION.easing.editorial`, `staggerChildren: MOTION.stagger.normal`
- `brandVariants`: logo/tagline/social stagger with custom index delay using `MOTION.stagger.normal`
- `columnVariants`: 4 link columns stagger left-to-right via custom delay
- `bottomBarVariants`: fade-in after columns complete
- Wrapped main content in `<motion.div ... whileInView="visible" viewport={{ once: true, margin: '-80px' }}>`
- Wrapped bottom bar in `<motion.div ... whileInView="visible" viewport={{ once: true }}>`
- All animations skip (duration:0) when `prefersReduced`

## FIX 5 — StatsCounter.tsx

- Card `border-grayMedium/20` → `border-[var(--color-gray-medium)]`
- Card `from-grayDark/30 to-black/30` → `from-[var(--color-gray-dark)] to-[var(--color-black)]`
- `group-hover:border-gold/30` → `group-hover:border-[var(--color-gold-transparent-30)]`
- `group-hover:shadow-goldLg` → `group-hover:shadow-[0_0_40px_0_rgba(0,92,72,0.25)]`
- Progress bar `via-gold/50` → `via-[var(--color-gold-transparent-50)]`
- Corner accents `border-gold/30` → `border-[var(--color-gold-transparent-30)]`
- Background glow `bg-gold/5` → `style={{ backgroundColor: 'rgba(0,92,72,0.05)' }}`

## FIX 6 — ProcessTimeline.tsx

- Timeline line `from-gold via-gold/50` → `from-[var(--color-gold)] via-[var(--color-gold-transparent-50)]`
- Ring dot `border-gold/30` → `border-[var(--color-gold-transparent-30)]`
- Step card `border-grayMedium/30` → `border-[var(--color-gray-medium)]`
- Step card `from-grayDark/50 to-black/50` → `from-[var(--color-gray-dark)] to-[var(--color-black)]`
- Decorative vertical line `from-gold/30 via-gold/10` → `from-[var(--color-gold-transparent-30)] via-[var(--color-gold-transparent-10)]`
- Mobile connecting line `from-gold/50` → `from-[var(--color-gold-transparent-50)]`
- Background glows `bg-gold/5` / `bg-gold/3` → inline `style={{ backgroundColor: 'rgba(0,92,72,0.05)' }}`

## FIX 7 — TestimonialsCarousel.tsx

- Slide x spring: `stiffness:300, damping:30` → spread `MOTION.spring.stiff`
- Card container `from-grayDark/40 to-black/40 border-grayMedium/20 shadow-gold/10` → `from-[var(--color-gray-dark)] to-[var(--color-black)] border-[var(--color-gray-medium)]`
- Avatar ring `border-gold/30` / `border-gold/10` → `border-[var(--color-gold-transparent-30)]` / `border-[var(--color-gold-transparent-10)]`
- Avatar inner border `border-black/20` → `border-[var(--color-gray-medium)]`
- Event badge `bg-gold/30` → `bg-[var(--color-gold-transparent-30)]`
- Progress bar container `bg-grayLight/30` → `bg-[var(--color-gray-light)]`
- Company badge `bg-grayDark/50` → `bg-[var(--color-gray-dark)]`
- Dot inactive `bg-grayLight/50` → `bg-[var(--color-gray-light)]`
- Nav buttons `bg-grayDark/80 border-grayMedium/30 hover:border-gold/50 focus:ring-gold/50` → all using `var(--color-...)` tokens
- Counter bg `bg-black/50` → `bg-[var(--color-black-transparent-50)]`
- Background glow `bg-gold/5` → `style={{ backgroundColor: 'rgba(0,92,72,0.05)' }}`

## FIX 8 — FAQAccordion.tsx

- Added `group` class to the item wrapper `motion.div` (previously missing — `group-hover:` on child had no `group` parent)
- Item border: `border-grayMedium/20` → `border-[var(--color-gray-medium)]`; `border-gold/30` → `border-[var(--color-gold-transparent-30)]`
- Item background: `from-grayDark/30 to-black/30` → `from-[var(--color-gray-dark)] to-[var(--color-black)]`
- Shadow: `shadow-gold` → `shadow-[0_0_20px_0_rgba(0,92,72,0.15)]`
- Hover border: `hover:border-gold/20` → `hover:border-[var(--color-gold-transparent-20)]`
- Icon border states: `border-gold bg-gold/10` / `border-grayLight group-hover:border-gold` → CSS var versions
- Answer left border: `border-gold/30` → `border-[var(--color-gold-transparent-30)]`
- Hover line: replaced `group-hover:via-gold/30` CSS with inline `style` `backgroundImage` conditional — avoids the broken `group-hover:` on a non-group parent
- CTA box: `border-grayMedium/30 from-grayDark/20 to-black/20` → CSS var versions
- Background glows `bg-gold/5` / `bg-gold/3` → inline style

## FIX 9 — Lightbox.tsx

- Spring config `stiffness:100, damping:20` → spread `MOTION.spring.normal`
- Image variants `ease: 'easeOut'` → `MOTION.easing.out`
- Image transition `duration: 0.5` → `MOTION.duration.normal / 1000`
- Added `import { MOTION } from '@/lib/tokens'`
- Props extended: `currentIndex?: number`, `images?: { image; title; category }[]`, `onNavigate?: (index: number) => void`
- `handlePrev` / `handleNext`: boundary-safe index arithmetic using `images.length`
- Keyboard handler now calls `handlePrev` / `handleNext` for ArrowLeft / ArrowRight
- Nav buttons: `disabled={total === 0}` with `disabled:opacity-30 disabled:pointer-events-none`
- Maximize2 button: `aria-label="Full screen (coming soon)"`
- Download button: `aria-label="Download image"` + `onClick` opens image URL
- Close button: `aria-label="Close lightbox"`
- Category badge: `bg-[var(--color-gold-transparent-20)]` → `bg-[var(--color-gold-transparent-10)]` (token exists)

## Also Fixed — Card.tsx

- `hover:border-gold/30` → `hover:border-[var(--color-gold-transparent-30)]`
- `hover:bg-gray-dark/50` → `hover:bg-[var(--color-gray-dark)]`

## Also Fixed — LogoMarquee.tsx

- Logo card `border-grayMedium/20` → `border-[var(--color-gray-medium)]`
- Logo card `from-grayDark/20 to-black/20` → `from-[var(--color-gray-dark)] to-[var(--color-black)]`
- Logo card `hover:border-gold/30` → `hover:border-[var(--color-gold-transparent-30)]`
- Inner border `border-gold/0 group-hover:border-gold/20` → `border-transparent group-hover:border-[var(--color-gold-transparent-20)]`
- Dot `bg-gold/0 group-hover:bg-gold/50` → `bg-transparent group-hover:bg-[var(--color-gold-transparent-50)]`
- Background glows `bg-gold/5` → inline style

## Build Status

`npm run build` cannot execute — registry.npmmirror.com returns 403 on styled-jsx-5.1.6.tgz, `node_modules` absent.

`tsc --noEmit` passes with **0 type errors** (1 pre-existing deprecation warning: `target=ES5` in tsconfig.json — not introduced by Phase 3).

## prefers-reduced-motion Compliance

- **HeroSection**: `prefersReduced` state → skips particle animation (`animate={prefersReduced ? {} : ...}`), zeroes all durations
- **BoothShowcase**: all delays and durations conditioned on `prefersReduced`; y offsets zeroed
- **Footer**: all durations set to 0 when `prefersReduced`
