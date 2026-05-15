# Phase 4 Changes Log

## TASK 1 — JSON-LD Schema (app/layout.tsx)

Added `<script type="application/ld+json">` LocalBusiness structured data inside `<head>`,
immediately after the `<link rel="icon">` favicon line.

Fields: `@context`, `@type: LocalBusiness`, `name`, `description`, `url`, `areaServed`,
`priceRange`, `serviceType`.

## TASK 2 — Fix tsconfig.json deprecation warning

- `"target": "es5"` → `"target": "ES2017"`
- Silences the pre-existing TS5107 deprecation warning permanently.
- `ignoreDeprecations` was NOT added — the target change alone removes the warning.

## TASK 3 — Fix turbopack lockfile warning (next.config.js)

Added inside `nextConfig`:
```js
turbopack: {
  root: __dirname,
},
```
Silences the workspace root warning in every Turbopack build.

Also fixed: replaced all `https://registry.npmmirror.com/` URLs in `package-lock.json`
with `https://registry.npmjs.org/` so `npm install` succeeds (npmmirror was returning 403
on `styled-jsx-5.1.6.tgz`). This enables the build to run.

## TASK 4 — Link Audit

### components/sections/FAQAccordion.tsx
- Added `import Link from 'next/link'`
- Replaced `<a href="/contact">` with `<Link href="/contact">` (internal navigation)
- Added `focus-visible:ring-2 focus-visible:ring-[var(--color-gold-transparent-50)]` to the Link

### External `<a>` tags
- Searched all `.tsx` files for `href="http"` — **none found**
- Footer social links use `href="#"` — not external, no `rel` needed
- Footer contact links (`mailto:`, `tel:`) are protocol links, not external HTTP — no `rel` needed

## TASK 5 — Accessibility Audit

### components/primitives/Button.tsx
- Added `focus-visible:ring-gold` to base CVA class (was missing the ring color;
  `ring-2` and `ring-offset-2` existed but ring color was unset → invisible focus)

### components/navigation/Navbar.tsx
- Mobile menu toggle `<button>`: added `focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-gold focus-visible:ring-offset-2 focus-visible:ring-offset-black`
- Desktop CTA "Book Now": replaced raw `<button>` with `<Button variant="ghost">` primitive (see TASK 6)

### components/navigation/MobileMenu.tsx
- Close `<motion.button>`: added `focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-gold focus-visible:ring-offset-2 focus-visible:ring-offset-black`
- "Book a Consultation" CTA: replaced raw `<button>` with `<Button>` primitive (see TASK 6)

### components/sections/FAQAccordion.tsx
- Accordion trigger `<button>`: added `focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--color-gold-transparent-50)] focus-visible:ring-inset`

### components/sections/MasonryGallery.tsx
- Category filter `<motion.button>` elements: added `focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-gold focus-visible:ring-offset-2 focus-visible:ring-offset-black`
- Clear search `<button>`: added `aria-label="Clear search"` + `focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-gold`
- Gallery item `<motion.div>` with `onClick`: added `role="button"`, `tabIndex={0}`,
  `aria-label={\`View ${item.title}\`}`, and `onKeyDown` handler for Enter/Space,
  plus `focus-visible:ring-2 focus-visible:ring-gold` focus style

### components/sections/Lightbox.tsx
- Close button: added `focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-gold focus-visible:ring-offset-2 focus-visible:ring-offset-black`
- Prev button: same focus style
- Next button: same focus style
- Maximize2 button: same focus style
- Download button: same focus style

### components/sections/TestimonialsCarousel.tsx
- Already had `focus:ring-2 focus:ring-[var(--color-gold-transparent-50)] focus:ring-offset-2 focus:ring-offset-black` on all interactive elements — **no changes needed**

## TASK 6 — Button Consistency

### components/navigation/Navbar.tsx
- Replaced raw styled `<button>` CTA "Book Now" with `<Button variant="ghost">` primitive
- Import added: `import { Button } from '@/components/primitives/Button'`

### components/navigation/MobileMenu.tsx
- Replaced raw styled `<button>` CTA "Book a Consultation" with `<Button variant="ghost">` primitive
- Import added: `import { Button } from '@/components/primitives/Button'`

### components/sections/FAQAccordion.tsx
- CTA `<a href="/contact">` → `<Link>` (see TASK 4)

### HeroSection.tsx — verified correct from Phase 3
- CTAs already use `<Button variant="primary">` and `<Button variant="ghost">` ✓

## TASK 7 — Final Build

```
▲ Next.js 16.2.6 (Turbopack)

  Creating an optimized production build ...
✓ Compiled successfully in 4.6s
  Running TypeScript ...
  Finished TypeScript in 5.6s ...
  Collecting page data using 3 workers ...
  Generating static pages using 3 workers (0/3) ...
✓ Generating static pages using 3 workers (3/3) in 261ms
  Finalizing page optimization ...

Route (app)
┌ ○ /
└ ○ /_not-found


○  (Static)  prerendered as static content


> luminary-booth-co@0.1.0 postbuild
> next-sitemap

✨ [next-sitemap] Loading next-sitemap config: ...
✅ [next-sitemap] Generation completed
   ○ https://luminaryboothco.com/sitemap.xml
   ○ https://luminaryboothco.com/sitemap-0.xml
```

**Zero warnings. Zero errors. Exit code 0.**

## Files Modified

| File | Changes |
|------|---------|
| `app/layout.tsx` | Added JSON-LD script tag |
| `tsconfig.json` | `target: ES2017` (was `es5`) |
| `next.config.js` | Added `turbopack: { root: __dirname }` |
| `package-lock.json` | Fixed registry URLs (npmmirror → npmjs.org) |
| `components/primitives/Button.tsx` | Added `focus-visible:ring-gold` to base class |
| `components/navigation/Navbar.tsx` | Button primitive for CTA, focus ring on mobile toggle, added Button import |
| `components/navigation/MobileMenu.tsx` | Button primitive for CTA, focus ring on close button, added Button import |
| `components/sections/FAQAccordion.tsx` | `<Link>` for /contact, focus ring on accordion button, added Link import |
| `components/sections/MasonryGallery.tsx` | Keyboard accessibility for gallery items, focus rings on filter/search buttons |
| `components/sections/Lightbox.tsx` | Focus rings on all 5 buttons |
