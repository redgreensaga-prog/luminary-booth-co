# Phase 2 Changes Log

## Priority 1 — Critical Structural Fixes

### Fix 1: Font Loading — `app/layout.tsx`
- Added `Cormorant_Garamond` (weights 300, 400, 500, 600) via `next/font/google` as `--font-display` CSS variable
- Added `Inter` (weights 300, 400, 500) via `next/font/google` as `--font-body` CSS variable
- Applied both font variables to `<html>` className
- Changed favicon reference from `/favicon.ico` to `/favicon.svg`

### Fix 2: Mount Navbar — `app/page.tsx`
- Added `import Navbar from '@/components/navigation/Navbar'`
- Added `<Navbar />` as first child inside `<main>` (line ~18)

### Fix 3: SHADOWS Token Fix — `lib/tokens.ts`
- Line 151: `SHADOWS.gold` — changed `rgba(201, 169, 110, 0.15)` → `rgba(0, 92, 72, 0.15)` (Forbes green)
- Line 152: `SHADOWS.goldLg` — changed `rgba(201, 169, 110, 0.25)` → `rgba(0, 92, 72, 0.25)` (Forbes green)

### Fix 4: LogoMarquee Scroll Math + Hover Pause — `components/sections/LogoMarquee.tsx`
- Line 84: First track `x` animation changed from `['0%', \`-${100 / duplicatedLogos.length}%\`]` (was -5%) → `['0%', '-50%']`
- Line 137: Reverse track `x` changed from `[\`-${100/duplicatedLogos.length}%\`, '0%']` → `['-50%', '0%']`
- Added `isHovered` state (useState) and `onMouseEnter`/`onMouseLeave` on `<section>`
- Moved transition to shared `marqueeTransition` object; when `isHovered`, duration is 0 (pause effect)
- Removed unused `COLORS` import from `@/lib/tokens`

### Fix 5: AnimatedSection Stagger Bug — `components/utility/AnimatedSection.tsx`
- Default `staggerChildren` param: `80` → `0.08` (seconds, not milliseconds)
- All 4 animation cases: `ease: [0.16, 1, 0.3, 1]` → `ease: MOTION.easing.editorial`
- `fade` case: `duration: 0.6` → `duration: MOTION.duration.normal / 1000`
- `slide-left`, `slide-right`, `slide-up` cases: `duration: 0.8` → `duration: MOTION.duration.slow / 1000`
- Added `import { MOTION } from '@/lib/tokens'`

## Priority 2 — Replace All Placeholder Images

### Hero Background — `components/sections/HeroSection.tsx`
- Line 52: Replaced `<div className="... bg-[url('/placeholder/hero-bg.jpg')] ...">` with inline `<svg>` containing:
  - Black `#0A0A0A` base rect
  - 20 diagonal grid lines at `rgba(0,92,72,0.05)` opacity
  - Large diamond outline polygon at `rgba(0,92,72,0.10)` opacity
  - `aria-hidden="true"`

### Booth Showcase Images — `components/sections/BoothShowcase.tsx`
- Changed `BoothType.image: string` → `BoothType.svgPattern: React.ReactNode`
- Editorial Pro SVG: vertical lines + nested rectangle frames + crosshair
- Crystal Mirror SVG: hexagonal lattice + centered diamond outlines
- Vintage Darkroom SVG: concentric circles + radiating lines + center dot
- Updated rendering: replaced `<div style={{ backgroundImage: \`url(...)\` }}>` with `<div className="absolute inset-0">{activeBooth.svgPattern}</div>`

### Gallery Images — `components/sections/MasonryGallery.tsx`
- Changed `GalleryItem.image: string` → added `GalleryItem.svgPattern: React.ReactNode` (kept `image: ''` for Lightbox compat)
- Created 12 unique SVG patterns (diagonal grid, concentric circles, hexagonal lattice, radiating lines, grid+polygon combos, etc.)
- Updated rendering: replaced `<div style={{ backgroundImage: \`url(...)\` }}>` with `<div className="absolute inset-0 ...">{item.svgPattern}</div>`

### Testimonial Avatars — `content/copy.ts`
- Lines 130, 139, 148, 157, 166: Changed all 5 `avatarUrl` values from `/testimonials/avatar-N.jpg` to `""` (empty string)
- Triggers existing initials fallback in TestimonialsCarousel (shows first letter of author name)

### Favicon — `public/favicon.svg` (new file)
- Created SVG: black `#0A0A0A` background, Forbes green `#005C48` diamond outline, cream `#F5F0E8` "L" lettermark

## Priority 3 — Fix Broken CSS Variable References

### Navbar Colors — `components/navigation/Navbar.tsx`
- Line 86: `navbarVariants.initial.borderBottomColor` — `rgba(201, 169, 110, 0)` → `rgba(0, 92, 72, 0)` (Forbes green at 0 opacity)
- Line 91: `navbarVariants.scrolled.borderBottomColor` — `rgba(201, 169, 110, 0.15)` → `rgba(0, 92, 72, 0.15)` (Forbes green)

### MasonryGallery CSS Variables — `components/sections/MasonryGallery.tsx`
- Line 182 (old): `var(--color-black-transparent-80)` → `var(--color-black-transparent-70)` (only -70 exists in tokens.css)
- Line 187 (old): `var(--color-gold-transparent-20)` → `var(--color-gold-transparent-10)` (only 10, 30, 50, 70 exist)

## Priority 4 — Remove Unused Imports

### `components/navigation/Footer.tsx`
- Removed: `COLORS, MOTION, TYPOGRAPHY` from `@/lib/tokens` (entire import removed)
- Removed: `motion` from `framer-motion`
- Removed: `ChevronRight` from `lucide-react`

### `components/sections/StatsCounter.tsx`
- Removed: `COLORS, TYPOGRAPHY` from `@/lib/tokens` import (kept `MOTION`)

### `components/sections/LogoMarquee.tsx`
- Removed: `COLORS` from `@/lib/tokens` import (kept `MOTION`) — done in Priority 1 Fix 4

### `components/sections/FAQAccordion.tsx`
- Removed: `COLORS, TYPOGRAPHY` from `@/lib/tokens` import (kept `MOTION`)

### `components/sections/TestimonialsCarousel.tsx`
- Removed: multi-paragraph docstring block (lines 3–27)
- Removed: `COLORS, TYPOGRAPHY, SPACING, BORDER_RADIUS` from `@/lib/tokens` import (kept `MOTION`)

### `components/navigation/Navbar.tsx`
- Removed: `COLORS` from `@/lib/tokens` import (kept `MOTION`) — done in Priority 3

### `components/primitives/Badge.tsx`
- Removed: `ElementRef` from `react` import (kept `forwardRef`)
- Removed: `COLORS` from `@/lib/tokens` import (kept `MOTION`)

### `components/primitives/Card.tsx`
- Removed: `ElementRef` from `react` import (kept `forwardRef`)

### `components/sections/ProcessTimeline.tsx`
- Removed: `COLORS, TYPOGRAPHY, BORDER_RADIUS` from `@/lib/tokens` import (kept `MOTION`)

## Build Status

`npm run build` cannot be executed in this environment — the npm registry (`registry.npmmirror.com`) returns 403 on `styled-jsx-5.1.6.tgz`, preventing `node_modules` installation. `next` binary is therefore absent.

TypeScript check (`tsc --noEmit`) passes with 0 type errors (1 deprecation warning: `target=ES5` in tsconfig.json — pre-existing, not introduced by Phase 2 changes).
