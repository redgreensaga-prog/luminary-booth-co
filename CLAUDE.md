# CLAUDE.md — Luminary Booth Co.

## Project Overview
Luxury LA photo booth rental website — **Luminary Booth Co.**  
Single brand (NOT two brands — this was the final decision).  
Dark luxury editorial aesthetic (blacks, Forbes green/gold accent, cream text).

## Quick Start
```bash
npm install
npm run dev     # → http://localhost:3000
npm run build   # Static site generation
npm run start   # Serve built site
```

## Tech Stack
- **Next.js 16.2.6** (App Router, Turbopack, TypeScript)
- **Tailwind CSS v3** + `@tailwindcss/typography`
- **Framer Motion** (cinematic/editorial easing curves)
- **Radix UI** (Accordion, Dialog, Tabs)
- **React Hook Form** + **Zod** (form handling)
- **Lucide React** (icons)
- **next-sitemap** (SEO — configured)

## Key File Map
```
app/layout.tsx              → Root layout (fonts, font loading, meta)
app/page.tsx                → Page composition (imports all sections)
content/copy.ts             → ALL text content (brand copy, FAQ, testimonials)
lib/tokens.ts               → Design system tokens (colors, spacing, shadows, motion)
styles/tokens.css           → CSS custom properties
styles/globals.css          → Global styles
components/sections/        → Page section components (10 total)
  HeroSection.tsx
  BoothShowcase.tsx
  MasonryGallery.tsx
  ProcessTimeline.tsx
  StatsCounter.tsx
  LogoMarquee.tsx
  FAQAccordion.tsx
  TestimonialsCarousel.tsx
  Lightbox.tsx
components/layout/          → Layout primitives (Container, Grid, Section, Stack)
components/navigation/      → Navbar, MobileMenu, Footer
components/primitives/      → Badge, Button, Card, FormElements
components/utility/         → AnimatedSection
next-sitemap.config.js      → Sitemap config (siteUrl: https://luminaryboothco.com)
```

## Design System
All tokens live in `lib/tokens.ts` and `styles/tokens.css`:
- **Colors:** Dark editorial palette — black `#0A0A0A`, gold `#005C48` (Forbes green), cream text `#F5F0E8`
- **Typography:** Display font — Cormorant Garamond (serif), Body font — Inter (sans-serif)
- **Motion:** Cinematic easing `[0.7, 0, 0.3, 1]`, Editorial easing `[0.16, 0.77, 0.39, 0.99]`
- **Spacing:** 4px base unit
- **Shadows:** Gold glow effects available (`shadow-gold`, `shadow-gold-lg`)

## Current Build Status
- ✅ Compiles clean — 0 TypeScript errors, static site generation
- ✅ Sitemap working (sitemap.xml + robots.txt)
- ❌ All images are placeholders (`public/placeholder/`) — need real client assets
- ❌ No booking form wired up yet (FormElements component exists but not integrated)
- ❌ No deployment configured

## Coding Conventions
- **Components:** Named exports + barrel `index.ts` in each component folder
- **Imports:** `@/` path alias for project root
- **Types:** Inline `interface` or `type` — no separate types file
- **CSS:** Tailwind utility classes + CSS custom properties from `tokens.css`
- **Animations:** Use Framer Motion with tokens from `MOTION` object (not raw values)
- **Dark mode only:** `className="dark"` on `<html>` — no light mode

## Common Tasks

### Change text content
Edit `content/copy.ts` — all brand copy, FAQs, testimonials, stats live here.

### Add a new section
1. Create component in `components/sections/`
2. Export from `components/sections/index.ts`
3. Import and add to `app/page.tsx` wrapped in `<Section>` component

### Adjust colors/spacing
Edit `lib/tokens.ts` (TypeScript) AND `styles/tokens.css` (CSS) — keep them in sync.

### Modify animations
Edit `lib/tokens.ts` → `MOTION` object → easing curves, durations, spring configs.
Use `motion.div` with `variants` from the animation presets.

## Important Previous Decisions (DO NOT REDO)
- **Single brand only** — Luminary Booth Co. NOT two separate brands (the original doc mentioned S&D Booths + Eventure Booth, but that was merged into one)
- **Dark mode only** — no light mode toggle
- **Placeholder images** — no real client assets available yet
- **No paid APIs** — build with free tools only
