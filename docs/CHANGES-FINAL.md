# CHANGES-FINAL — Bug Fix Delivery

## Bug 1 — Nested `<main>` elements (High)
`app/layout.tsx`: Changed `<main className="min-h-screen">` wrapper to `<div>`.
Each page's own `<main>` is now the single document landmark.

## Bug 2 — RAF not cancelled on unmount (Medium)
`components/sections/StatsCounter.tsx`: `useCountUp` hook now stores the RAF
ID in `rafId` and returns `() => cancelAnimationFrame(rafId)` for cleanup.
Prevents state updates on unmounted components.

## Bug 3 — Logo underline never animates (Medium)
`components/navigation/Navbar.tsx`: Replaced `whileHover` object prop with
named variants (`rest` / `hover`) on both the wrapper and the underline div.
Framer Motion now propagates the "hover" variant to the underline child,
which correctly draws in left-to-right on logo hover.

## Bug 4 — `transition-all` vs `transition-shadow` conflict (Medium)
`components/primitives/Button.tsx`: Base CVA class changed from
`transition-all duration-300` to `transition-colors duration-300`.
Primary variant retains `transition-shadow duration-500`.
Color and shadow transitions now run at their intended separate durations.

## Bug 5 — `.btn-glow` duplicate shadow (Low)
`styles/globals.css`: Removed `.btn-glow` and `.btn-glow:hover` rules entirely.
`HeroSection.tsx`, `BoothShowcase.tsx`, `Navbar.tsx`: Removed `className="btn-glow"`.
Shadow glow is handled solely by the Button component's Tailwind utilities.

## Bug 6 — `isStatic` unshared type (Low)
`content/copy.ts`: Exported `Stat` interface with `isStatic?: boolean` field.
`components/sections/StatsCounter.tsx`: Imports `Stat` type; inline interface removed.

## Cleanup
- Moved `AUDIT.md`, `CHANGES-P2.md`, `CHANGES-P3.md`, `CHANGES-P4.md`,
  `CHANGES-FOUNDATION.md` to `docs/` folder.
- Added `grain-filter` id collision warning comment in `app/layout.tsx`.

## Build
`npm run build` — 0 TypeScript errors, 0 warnings, 8 static pages.
