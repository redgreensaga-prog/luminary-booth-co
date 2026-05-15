# AUDIT.md — Luminary Booth Co. Elite Polish Pass

---

## 1. Animation Audit

### HeroSection.tsx — `components/sections/HeroSection.tsx`
**State: Partial**

Has: Staggered entrance variants, SVG path draw animation, 12 gold particle loops, scroll indicator fade-in, decorative corner accents.

Missing:
- Spring config is raw (`stiffness: 100, damping: 20` line 41) — not from `MOTION.spring.*`
- SVG path easings use string `'easeInOut'` (lines 69, 84) instead of `MOTION.easing.inOut`
- SVG path durations `2`, `2.5`, particle `3` are raw floats, not `MOTION.duration.*` values
- Scroll indicator uses `delay: 2, duration: 1` — both raw
- Parallax scrolling: completely absent — hero background image is static (the `bg-[url('/placeholder/hero-bg.jpg')]` div has no parallax transform)
- Hero CTAs use raw `<button>` elements, not the `Button` primitive — shimmmer effect missing on primary CTA
- Particle dots are `w-[1px] h-[1px]` — sub-pixel, invisible on most screens

---

### BoothShowcase.tsx — `components/sections/BoothShowcase.tsx`
**State: Partial**

Has: AnimatePresence tab switching, active tab indicator with layoutId, feature list stagger, price badge slide-in.

Missing:
- `contentVariants.center.transition.ease` is `'easeInOut'` string (line 106) — not `MOTION.easing.inOut`
- `tabVariants.active.transition` uses raw `stiffness: 300, damping: 20` (lines 91–92)
- Section header `whileInView` has no `transition` prop at all on the h2 (line 124–131) — Framer Motion uses defaults
- Image area background swap is instant — no crossfade when switching booth type; only the content panel fades
- `delay: 0.1` on subtitle (line 137) has no duration/ease — not from tokens

---

### MasonryGallery.tsx — `components/sections/MasonryGallery.tsx`
**State: Partial**

Has: AnimatePresence filter/search transitions, individual item entrance, hover overlay.

Missing:
- Item `duration: 0.3` (line 170) is a raw float — not from `MOTION.duration.normal / 1000`
- No stagger on initial load — all 12 items appear simultaneously
- Image hover zoom `transition-transform duration-700` (line 177) is pure CSS, not Framer Motion — breaks the motion system consistency
- References `var(--color-black-transparent-80)` (line 182) — **this CSS variable does not exist** in `styles/tokens.css` (only `...70` is defined). Will render no background.
- References `var(--color-gold-transparent-20)` (line 187) — **this CSS variable does not exist** in `styles/tokens.css` (only 10, 30, 50, 70 are defined). Badge has no background.

---

### ProcessTimeline.tsx — `components/sections/ProcessTimeline.tsx`
**State: Adequate** (best in codebase for token compliance)

Has: `MOTION.stagger.cinematic`, `MOTION.duration.slow/slowest`, `MOTION.easing.cinematic/editorial`, line draw animation, dot spring with viewport trigger, rotate decorator.

Missing:
- Tailwind opacity modifier classes (`from-gold/50`, `border-gold/30`, `border-grayMedium/30`) may fail silently at runtime — CSS-variable-based Tailwind colors cannot be modified with the `/opacity` shorthand because Tailwind can't extract RGB channels from `var()` references. These classes compile but produce no effect.

---

### StatsCounter.tsx — `components/sections/StatsCounter.tsx`
**State: Adequate**

Has: `MOTION.stagger.normal`, `MOTION.duration.*`, `MOTION.easing.*`, animated number counter, progress bar, hover corner accents with `useInView`.

Missing:
- Same Tailwind `/opacity` modifier issue: `border-grayMedium/20`, `from-grayDark/30`, `group-hover:border-gold/30`
- `group-hover:shadow-goldLg` — `shadow-goldLg` is not a valid Tailwind class; the box-shadow config keys are `shadow-gold-sm`, `shadow-gold-md`, `shadow-gold-lg`
- `COLORS` and `TYPOGRAPHY` imported (line 7) but never used in the component

---

### LogoMarquee.tsx — `components/sections/LogoMarquee.tsx`
**State: Partial**

Has: Dual-track marquee (forward + reverse), logo card hover effects with gold border.

Missing:
- **Marquee math is broken**: `x: ['0%', \`-${100 / duplicatedLogos.length}%\`]` — with 20 logo items, this moves only 5% (one-twentieth of total width), then resets. The loop is visible and jarring. Should move `-50%` since logos are duplicated.
- No pause-on-hover for the marquee motion
- `COLORS` imported (line 7) but never used
- Tailwind `/opacity` modifier issue throughout: `border-grayMedium/20`, `hover:border-gold/30`

---

### FAQAccordion.tsx — `components/sections/FAQAccordion.tsx`
**State: Adequate**

Has: AnimatePresence expand/collapse with height animation, icon rotation, stagger entrance, `MOTION.duration.*` and `MOTION.easing.*` used.

Missing:
- The bottom `div` with `group-hover:via-gold/30` (line 198–201) is not inside a `group` parent — the hover class never triggers
- `COLORS` and `TYPOGRAPHY` imported (line 7) but never used
- Tailwind `/opacity` modifier issue: `border-gold/30`, `bg-gold/10`, `from-grayDark/30`

---

### TestimonialsCarousel.tsx — `components/sections/TestimonialsCarousel.tsx`
**State: Adequate** (most complete component)

Has: Slide direction variants, per-star spring animation, auto-rotation progress bar, pause-on-hover, aria roles, navigation buttons.

Missing:
- `x: { type: 'spring', stiffness: 300, damping: 30 }` (line 183) — raw spring values, not from `MOTION.spring.*`
- Multi-paragraph docstring (lines 3–27) — against project coding conventions
- `COLORS`, `TYPOGRAPHY`, `SPACING`, `BORDER_RADIUS` imported (line 33) but never used

---

### Lightbox.tsx — `components/sections/Lightbox.tsx`
**State: Partial**

Has: Scale + opacity entrance/exit, backdrop blur, button slide-in animations.

Missing:
- **ArrowLeft/ArrowRight navigation is a stub** — no image array passed, no navigation logic (lines 22–27, 100, 114). The keyboard arrows do nothing.
- Download button (line 176) has no `href` or action — decorative only
- Maximize2 button (line 171) does nothing — decorative only
- `ease: 'easeOut'` (line 127) — raw string, not `MOTION.easing.out`
- `stiffness: 100, damping: 20` (line 82) — not from `MOTION.spring.*`

---

### Navbar.tsx — `components/navigation/Navbar.tsx`
**State: Adequate**

Has: Scroll-triggered frosted glass, logo scale spring, layoutId active indicator, hover underline, hamburger → X morph, proper `MOTION` token usage throughout.

Missing:
- **`Navbar` is never rendered** — not imported in `app/layout.tsx` or `app/page.tsx`. The entire navigation is invisible on the live site.
- `navbarVariants.scrolled.borderBottomColor: 'rgba(201, 169, 110, 0.15)'` (line 87) — this is the **old warm gold**, not the Forbes green (`#005C48 = rgb(0,92,72)`). Wrong brand color hardcoded.
- `backgroundColor: 'rgba(10, 10, 10, 0.85)'` (line 86) — raw RGBA, should use CSS variable
- `COLORS` imported (line 6) but never used

---

### Footer.tsx — `components/navigation/Footer.tsx`
**State: None** (zero entrance animation)

Has: Static layout, social links, newsletter input.

Missing:
- No Framer Motion animation whatsoever — section just appears statically
- `motion` imported from `'framer-motion'` (line 7) but **never used**
- `ChevronRight` imported (line 13) but **never used**
- `COLORS`, `MOTION`, `TYPOGRAPHY` imported from `@/lib/tokens` (line 4) but **never used**
- `bg-black` (line 84) — works but is Tailwind default, not design system class
- `text-white` (line 84) — not design system; should be `text-textPrimary`
- `border-gray-800` (lines 84, 220) — Tailwind default gray scale, not design system token (should be `border-gray-medium`)
- Newsletter form is non-functional — submit handler is missing

---

### MobileMenu.tsx — `components/navigation/MobileMenu.tsx`
**State: Adequate**

Has: Overlay blur animation, y-axis slide entrance, staggered link entrance, layoutId active indicator, `MOTION` tokens used throughout.

Missing: Nothing critical. Solid implementation.

---

### Button.tsx — `components/primitives/Button.tsx`
**State: Adequate**

Has: Spring hover/tap variants via `MOTION.spring.cinematic`, shimmer effect, loading spinner.

Missing: `(props as any)` cast (line 132) bypasses TypeScript safety.

---

### Badge.tsx — `components/primitives/Badge.tsx`
**State: Adequate**

Has: Entrance spring via `MOTION.spring.gentle`, hover scale.

Missing: `ElementRef` imported (line 3) but never used in the component body.

---

### Card.tsx — `components/primitives/Card.tsx`
**State: Adequate**

Has: Entrance animation with `MOTION.spring.cinematic`, lift/glow hover variants.

Missing:
- `ElementRef` imported (line 3) but never used
- `SHADOWS.goldLg` (line 104) references the `SHADOWS` token which uses `rgba(201, 169, 110, 0.25)` — **old warm gold color**, inconsistent with CSS token which correctly uses `rgba(0, 92, 72, 0.25)`

---

### AnimatedSection.tsx — `components/utility/AnimatedSection.tsx`
**State: Partial**

Has: 4 animation presets, intersection observer trigger.

Missing:
- **Zero sections use `AnimatedSection`** — every section manages its own `whileInView` directly. This utility is dead code in the current page composition.
- Easing values hardcoded as `[0.16, 1, 0.3, 1]` (lines 45, 56, 68, 84) — not from `MOTION.easing.*` (closest: `MOTION.easing.editorial = [0.16, 0.77, 0.39, 0.99]`)
- `staggerChildren: 80` (lines 46, 57, etc.) — **this is a bug**: Framer Motion expects fractional seconds (e.g., `0.08`), not milliseconds. Stagger would be 80 seconds between children.
- Uses `react-intersection-observer` library while all sections use Framer Motion's `useInView` — inconsistent dependency

---

## 2. Image & Asset Audit

All images are missing. No actual files exist in `public/`.

| File Referenced | Component | Line | What Is Needed |
|---|---|---|---|
| `/placeholder/hero-bg.jpg` | HeroSection.tsx | 52 | Full-bleed hero background, dark editorial, min 1920×1080 |
| `/placeholder/editorial-booth.jpg` | BoothShowcase.tsx | 35 | Editorial Pro booth, 4:3 aspect ratio |
| `/placeholder/mirror-booth.jpg` | BoothShowcase.tsx | 44 | Crystal Mirror booth, 4:3 aspect ratio |
| `/placeholder/vintage-booth.jpg` | BoothShowcase.tsx | 53 | Vintage Darkroom booth, 4:3 aspect ratio |
| `/placeholder/gallery/gala-1.jpg` | MasonryGallery.tsx | 18 | Gala event, portrait 3:4 |
| `/placeholder/gallery/mirror-1.jpg` | MasonryGallery.tsx | 19 | Mirror booth, square |
| `/placeholder/gallery/wedding-1.jpg` | MasonryGallery.tsx | 20 | Wedding reception, landscape 4:3 |
| `/placeholder/gallery/editorial-1.jpg` | MasonryGallery.tsx | 21 | Editorial portraits, portrait 3:4 |
| `/placeholder/gallery/corporate-1.jpg` | MasonryGallery.tsx | 22 | Corporate launch, landscape 4:3 |
| `/placeholder/gallery/vintage-1.jpg` | MasonryGallery.tsx | 23 | Vintage setup, square |
| `/placeholder/gallery/wedding-2.jpg` | MasonryGallery.tsx | 24 | Luxury wedding, portrait 3:4 |
| `/placeholder/gallery/mirror-2.jpg` | MasonryGallery.tsx | 25 | Mirror effects, landscape 4:3 |
| `/placeholder/gallery/editorial-2.jpg` | MasonryGallery.tsx | 26 | Editorial lighting, square |
| `/placeholder/gallery/gala-2.jpg` | MasonryGallery.tsx | 27 | Gala night, landscape 4:3 |
| `/placeholder/gallery/corporate-2.jpg` | MasonryGallery.tsx | 28 | Corporate awards, portrait 3:4 |
| `/placeholder/gallery/vintage-2.jpg` | MasonryGallery.tsx | 29 | Vintage prints, square |
| `/testimonials/avatar-1.jpg` | content/copy.ts | 131 | Client avatar, square min 200×200 |
| `/testimonials/avatar-2.jpg` | content/copy.ts | 140 | Client avatar, square min 200×200 |
| `/testimonials/avatar-3.jpg` | content/copy.ts | 148 | Client avatar, square min 200×200 |
| `/testimonials/avatar-4.jpg` | content/copy.ts | 157 | Client avatar, square min 200×200 |
| `/testimonials/avatar-5.jpg` | content/copy.ts | 166 | Client avatar, square min 200×200 |
| `/favicon.ico` | app/layout.tsx | 11 | Browser tab icon, 32×32 or SVG |

**Total: 22 missing assets.** All gallery images render as empty colored divs (gradient fallback). Testimonial avatars fall back to initial letter — functional but not premium.

---

## 3. Build Health

### npm run build — OUTPUT

```
> luminary-booth-co@0.1.0 build
> next build

sh: 1: next: not found
```

**Build is unrunnable in this environment.** `npm install` fails with HTTP 403 from `registry.npmmirror.com` on `styled-jsx-5.1.6.tgz`. `node_modules/` is absent. No compiled output exists.

### Static Analysis — Warnings (would appear on successful build)

| File | Issue | Severity |
|---|---|---|
| `app/layout.tsx` | No font loading (no `next/font`, no `<link>` to Google Fonts) — `Cormorant Garamond` and `Inter` are never loaded; entire typography system falls back to system fonts | CRITICAL |
| `app/layout.tsx` | Double `<main>` nesting — layout wraps children in `<main>`, then `page.tsx` also opens `<main>` | HIGH |
| `app/page.tsx` | `Navbar` never imported or rendered — navigation doesn't exist on the site | CRITICAL |
| `Footer.tsx:7` | `motion` imported from `framer-motion` — unused | WARNING |
| `Footer.tsx:13` | `ChevronRight` imported from `lucide-react` — unused | WARNING |
| `Footer.tsx:4` | `cn` import present, `COLORS`, `MOTION`, `TYPOGRAPHY` from tokens — all unused | WARNING |
| `ProcessTimeline.tsx:7` | `COLORS`, `TYPOGRAPHY`, `BORDER_RADIUS` imported — unused | WARNING |
| `StatsCounter.tsx:7` | `COLORS`, `TYPOGRAPHY` imported — unused | WARNING |
| `LogoMarquee.tsx:7` | `COLORS` imported — unused | WARNING |
| `FAQAccordion.tsx:7` | `COLORS`, `TYPOGRAPHY` imported — unused | WARNING |
| `TestimonialsCarousel.tsx:33` | `COLORS`, `TYPOGRAPHY`, `SPACING`, `BORDER_RADIUS` imported — unused | WARNING |
| `Navbar.tsx:6` | `COLORS` imported — unused | WARNING |
| `MobileMenu.tsx:6` | `COLORS` imported — unused | WARNING |
| `Badge.tsx:3` | `ElementRef` imported — unused | WARNING |
| `Card.tsx:3` | `ElementRef` imported — unused | WARNING |
| `FormElements.tsx` | `hasValue` state variable set but never read — appears 2× (Input line 179, Textarea line 308) | WARNING |
| `AnimatedSection.tsx` | `react-intersection-observer` package required — may not be in package.json | WARNING |

### Critical Structural Bugs (not warnings — functional failures)

1. **No fonts ever load** (`app/layout.tsx`) — every `font-display` class renders system serif; every `font-body` renders system sans
2. **Navbar is not mounted anywhere** — `components/navigation/Navbar.tsx` is a complete, animated component that is never imported
3. **`var(--color-black-transparent-80)` and `var(--color-gold-transparent-20)`** are referenced in `MasonryGallery.tsx` but these CSS variables don't exist — transparent overlays silently fail
4. **LogoMarquee scroll calculation** (`-${100 / duplicatedLogos.length}%` = `-5%`) produces a broken non-looping marquee
5. **`AnimatedSection.tsx` `staggerChildren: 80`** — this is 80 seconds between children, not 80ms — component is unusable as-is

---

## 4. UX Assessment

The site architecture is thoughtful and the component library is genuinely well-structured — but three critical failures prevent it from reading as premium: the navigation is missing, the fonts never load, and the gold color is inconsistent across the codebase.

**What feels amateur:** The `HeroSection` is built on a paradox — the entire luxury pitch depends on a background image that simply doesn't exist, leaving a plain gradient with 1×1px invisible particles doing nothing. The CTA buttons (`Book a Consultation`, `View Our Portfolio`) are raw `<button>` tags that don't use the `Button` primitive, so the shimmer effect is absent on the most conversion-critical elements. The `Footer` has zero animation, uses `text-white` and `border-gray-800` (Tailwind defaults, not the design system), and imports `motion`, `ChevronRight`, `COLORS`, `MOTION`, and `TYPOGRAPHY` — all unused — suggesting it was copy-pasted and never finished. `LogoMarquee`'s dual-track concept is sophisticated but the scroll math is broken, producing a jarring 5% shift and reset rather than a seamless loop. The Lightbox's `Download` and `Maximize2` buttons are purely decorative — clicking either does nothing — which on a premium photography portfolio is a trust-destroyer.

**What feels premium:** `TestimonialsCarousel` is the strongest section — aria roles, pause-on-hover, auto-rotation progress bar, directional slide variants, and graceful avatar fallback. `ProcessTimeline` uses cinematic easing tokens correctly and the vertical timeline line draw is a genuinely editorial touch. `FAQAccordion`'s Q-number labeling and expand/collapse motion are polished. `Navbar` (which nobody can see) is the most complete component in the codebase — the frosted glass scroll transition, layoutId active indicator, and hamburger morph animation are all professional-grade.

---

## 5. Token Compliance

### Hardcoded hex values that should use CSS variables or `MOTION` tokens

| File | Line | Hardcoded Value | Should Be |
|---|---|---|---|
| `Navbar.tsx` | 87 | `rgba(201, 169, 110, 0.15)` — **wrong brand color** (old warm gold, not Forbes green) | `var(--color-gold-transparent-10)` |
| `Navbar.tsx` | 86 | `rgba(10, 10, 10, 0.85)` | `var(--color-black-transparent-70)` (approx) or CSS variable |
| `HeroSection.tsx` | 69 | `ease: 'easeInOut'` | `MOTION.easing.inOut` |
| `HeroSection.tsx` | 84 | `ease: 'easeInOut'` | `MOTION.easing.inOut` |
| `HeroSection.tsx` | 39–43 | `stiffness: 100, damping: 20` | `...MOTION.spring.normal` |
| `HeroSection.tsx` | 68–73 | `duration: 2, ease: 'easeInOut'` | `MOTION.duration.slowest / 1000`, `MOTION.easing.inOut` |
| `HeroSection.tsx` | 81–87 | `duration: 2.5, ease: 'easeInOut'` | `MOTION.duration.slowest / 1000`, `MOTION.easing.inOut` |
| `HeroSection.tsx` | 107 | `duration: 3, ease: 'linear'` | `MOTION.duration.slowest / 1000`, `MOTION.easing.linear` |
| `BoothShowcase.tsx` | 106 | `ease: 'easeInOut'` | `MOTION.easing.inOut` |
| `BoothShowcase.tsx` | 91–92 | `stiffness: 300, damping: 20` | closest: `...MOTION.spring.stiff` |
| `AnimatedSection.tsx` | 45, 56, 68, 84 | `ease: [0.16, 1, 0.3, 1]` | `MOTION.easing.editorial` |
| `AnimatedSection.tsx` | 46, 57, 69, 85 | `duration: 0.6` / `0.8` | `MOTION.duration.normal / 1000` / `MOTION.duration.slow / 1000` |
| `AnimatedSection.tsx` | 46 | `staggerChildren: 80` | `MOTION.stagger.normal` (0.1) — this is a bug (80s not 80ms) |
| `TestimonialsCarousel.tsx` | 183 | `stiffness: 300, damping: 30` | closest: `...MOTION.spring.stiff` |
| `Lightbox.tsx` | 82 | `stiffness: 100, damping: 20` | `...MOTION.spring.normal` |
| `Lightbox.tsx` | 127 | `ease: 'easeOut'` | `MOTION.easing.out` |
| `MasonryGallery.tsx` | 170 | `duration: 0.3` | `MOTION.duration.normal / 1000` |
| `Footer.tsx` | 84 | `text-white` | `text-textPrimary` |
| `Footer.tsx` | 84, 220 | `border-gray-800` | `border-gray-medium` |

### Token internal inconsistency — `lib/tokens.ts` vs `styles/tokens.css`

| Token | `lib/tokens.ts` value | `styles/tokens.css` value |
|---|---|---|
| `SHADOWS.gold` | `rgba(201, 169, 110, 0.15)` — **old warm gold** | `rgba(0, 92, 72, 0.15)` — correct Forbes green |
| `SHADOWS.goldLg` | `rgba(201, 169, 110, 0.25)` — **old warm gold** | `rgba(0, 92, 72, 0.25)` — correct Forbes green |

`Card.tsx` uses `SHADOWS.goldLg` directly (line 104) — it gets the wrong warm gold shadow, not the design system green. Any component importing `SHADOWS` from `lib/tokens.ts` gets stale color values.
