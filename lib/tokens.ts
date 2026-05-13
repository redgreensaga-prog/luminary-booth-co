// Luminary Booth Co. Design Tokens - TypeScript Constants
// Motion tokens and design system constants for use in TypeScript/JavaScript

/**
 * ===== Color Tokens =====
 * Dark luxury editorial color palette
 */
export const COLORS = {
  // Core colors
  black: '#0A0A0A',
  grayDark: '#141414',
  grayMedium: '#2A2A2A',
  grayLight: '#404040',
  grayPale: '#5C5C5C',
  
  // Accent Forbes green palette
  gold: '#005C48',
  goldLight: '#1B8A6E',
  goldDark: '#004235',
  goldPale: '#D4EDE4',
  
  // Text colors
  textPrimary: '#F5F0E8',
  textSecondary: '#D9D4CC',
  textTertiary: '#B8B4AE',
  textInverse: '#0A0A0A',
  textPlaceholder: '#8A8A8A',
  
  // Functional colors
  success: '#2E8B57',
  warning: '#DAA520',
  error: '#B22222',
  info: '#4169E1',
  
  // Transparent variants
  blackTransparent: {
    10: 'rgba(10, 10, 10, 0.1)',
    30: 'rgba(10, 10, 10, 0.3)',
    50: 'rgba(10, 10, 10, 0.5)',
    70: 'rgba(10, 10, 10, 0.7)',
  },
  goldTransparent: {
    10: 'rgba(0, 92, 72, 0.1)',
    30: 'rgba(0, 92, 72, 0.3)',
    50: 'rgba(0, 92, 72, 0.5)',
    70: 'rgba(0, 92, 72, 0.7)',
  },
} as const;

/**
 * ===== Typography Tokens =====
 */
export const TYPOGRAPHY = {
  // Font families
  fontDisplay: "'Cormorant Garamond', serif",
  fontBody: "'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, sans-serif",
  fontMono: "'Cascadia Code', 'Consolas', 'Monaco', 'Courier New', monospace",
  
  // Font sizes (in rem)
  fontSize: {
    xs: '0.75rem',
    sm: '0.875rem',
    base: '1rem',
    lg: '1.125rem',
    xl: '1.25rem',
    '2xl': '1.5rem',
    '3xl': '1.875rem',
    '4xl': '2.25rem',
    '5xl': '3rem',
    '6xl': '3.75rem',
    '7xl': '4.5rem',
    '8xl': '6rem',
    '9xl': '8rem',
  } as const,
  
  // Font weights
  fontWeight: {
    light: 300,
    regular: 400,
    medium: 500,
    semibold: 600,
    bold: 700,
    extrabold: 800,
  } as const,
  
  // Line heights
  lineHeight: {
    tight: 1.1,
    snug: 1.25,
    normal: 1.5,
    relaxed: 1.625,
    loose: 2,
  } as const,
  
  // Letter spacing
  letterSpacing: {
    tighter: '-0.05em',
    tight: '-0.025em',
    normal: '0em',
    wide: '0.025em',
    wider: '0.05em',
    widest: '0.1em',
  } as const,
} as const;

/**
 * ===== Spacing Tokens =====
 * Base unit: 4px (0.25rem)
 */
export const SPACING = {
  unit: '0.25rem',
  0: '0',
  1: 'calc(0.25rem * 1)',   // 4px
  2: 'calc(0.25rem * 2)',   // 8px
  3: 'calc(0.25rem * 3)',   // 12px
  4: 'calc(0.25rem * 4)',   // 16px
  5: 'calc(0.25rem * 6)',   // 24px
  6: 'calc(0.25rem * 8)',   // 32px
  7: 'calc(0.25rem * 12)',  // 48px
  8: 'calc(0.25rem * 16)',  // 64px
  9: 'calc(0.25rem * 24)',  // 96px
  10: 'calc(0.25rem * 32)', // 128px
} as const;

/**
 * ===== Border Radius Tokens =====
 */
export const BORDER_RADIUS = {
  none: '0',
  xs: '0.125rem',
  sm: '0.25rem',
  md: '0.375rem',
  lg: '0.5rem',
  xl: '0.75rem',
  '2xl': '1rem',
  '3xl': '1.5rem',
  full: '9999px',
} as const;

/**
 * ===== Shadow Tokens =====
 */
export const SHADOWS = {
  xs: '0 1px 2px 0 rgba(10, 10, 10, 0.05)',
  sm: '0 1px 3px 0 rgba(10, 10, 10, 0.1), 0 1px 2px 0 rgba(10, 10, 10, 0.06)',
  md: '0 4px 6px -1px rgba(10, 10, 10, 0.1), 0 2px 4px -1px rgba(10, 10, 10, 0.06)',
  lg: '0 10px 15px -3px rgba(10, 10, 10, 0.1), 0 4px 6px -2px rgba(10, 10, 10, 0.05)',
  xl: '0 20px 25px -5px rgba(10, 10, 10, 0.1), 0 10px 10px -5px rgba(10, 10, 10, 0.04)',
  '2xl': '0 25px 50px -12px rgba(10, 10, 10, 0.25)',
  inner: 'inset 0 2px 4px 0 rgba(10, 10, 10, 0.06)',
  gold: '0 0 20px 0 rgba(201, 169, 110, 0.15)',
  goldLg: '0 0 40px 0 rgba(201, 169, 110, 0.25)',
} as const;

/**
 * ===== Breakpoint Tokens =====
 */
export const BREAKPOINTS = {
  xs: '20rem',   // 320px
  sm: '40rem',   // 640px
  md: '48rem',   // 768px
  lg: '64rem',   // 1024px
  xl: '80rem',   // 1280px
  '2xl': '96rem', // 1536px
} as const;

/**
 * ===== Motion Tokens =====
 * Slow, deliberate, cinematic motion
 */
export const MOTION = {
  // Durations in milliseconds
  duration: {
    instant: 0,
    fast: 150,
    normal: 300,
    slow: 500,
    slower: 700,
    slowest: 1000,
  } as const,
  
  // Easing functions as Framer Motion arrays (not CSS strings)
  easing: {
    linear: [0, 0, 1, 1] as [number, number, number, number],
    in: [0.4, 0, 1, 1] as [number, number, number, number],
    out: [0, 0, 0.2, 1] as [number, number, number, number],
    inOut: [0.4, 0, 0.2, 1] as [number, number, number, number],
    editorial: [0.16, 0.77, 0.39, 0.99] as [number, number, number, number], // Luxury editorial curve
    cinematic: [0.7, 0, 0.3, 1] as [number, number, number, number], // Cinematic slow-in, slow-out
  } as const,
  
  // Spring configurations for Framer Motion
  spring: {
    normal: { stiffness: 100, damping: 10, mass: 1 },
    gentle: { stiffness: 70, damping: 15, mass: 1 },
    stiff: { stiffness: 150, damping: 8, mass: 1 },
    cinematic: { stiffness: 50, damping: 12, mass: 1.5 }, // Deliberate, weighty
  } as const,
  
  // Transition presets
  transition: {
    fade: { duration: 0.5, ease: [0.4, 0, 0.2, 1] as [number, number, number, number] },
    slideUp: { duration: 0.7, ease: [0.7, 0, 0.3, 1] as [number, number, number, number] },
    slideDown: { duration: 0.7, ease: [0.7, 0, 0.3, 1] as [number, number, number, number] },
    slideLeft: { duration: 0.7, ease: [0.7, 0, 0.3, 1] as [number, number, number, number] },
    slideRight: { duration: 0.7, ease: [0.7, 0, 0.3, 1] as [number, number, number, number] },
    scale: { duration: 0.5, ease: [0.16, 0.77, 0.39, 0.99] as [number, number, number, number] },
  } as const,
  
  // Stagger configurations
  stagger: {
    fast: 0.05,
    normal: 0.1,
    slow: 0.2,
    cinematic: 0.3,
  } as const,
} as const;

/**
 * ===== Layout Tokens =====
 */
export const LAYOUT = {
  // Container max widths
  container: {
    xs: '20rem',
    sm: '24rem',
    md: '28rem',
    lg: '32rem',
    xl: '36rem',
    '2xl': '42rem',
    '3xl': '48rem',
    '4xl': '56rem',
    '5xl': '64rem',
    '6xl': '72rem',
    '7xl': '80rem',
    full: '100%',
  } as const,
  
  // Grid configuration
  grid: {
    columns: 12,
    gutter: SPACING[4],
    margin: SPACING[4],
  } as const,
  
  // Z-index layers
  zIndex: {
    0: 0,
    10: 10,
    20: 20,
    30: 30,
    40: 40,
    50: 50,
    auto: 'auto',
  } as const,
  
  // Aspect ratios
  aspectRatio: {
    square: '1 / 1',
    video: '16 / 9',
    cinematic: '21 / 9',
    portrait: '3 / 4',
    editorial: '2 / 3',
  } as const,
} as const;

/**
 * ===== Design System Export =====
 */
export const DESIGN_TOKENS = {
  colors: COLORS,
  typography: TYPOGRAPHY,
  spacing: SPACING,
  borderRadius: BORDER_RADIUS,
  shadows: SHADOWS,
  breakpoints: BREAKPOINTS,
  motion: MOTION,
  layout: LAYOUT,
} as const;

/**
 * Type helpers for design tokens
 */
export type ColorToken = keyof typeof COLORS;
export type TypographyToken = keyof typeof TYPOGRAPHY;
export type SpacingToken = keyof typeof SPACING;
export type MotionToken = keyof typeof MOTION;
export type EasingToken = keyof typeof MOTION.easing;
export type DurationToken = keyof typeof MOTION.duration;

/**
 * Utility function to get a CSS variable value
 * @param variable The CSS variable name without '--' prefix
 * @returns The CSS var() function call
 */
export function cssVar(variable: string): string {
  return `var(--${variable})`;
}

/**
 * Utility function to create a media query for a breakpoint
 * @param breakpoint The breakpoint token (e.g., 'sm', 'md')
 * @param rule The CSS rule to apply
 * @returns Media query string
 */
export function mediaQuery(breakpoint: keyof typeof BREAKPOINTS, rule: string): string {
  return `@media (min-width: ${BREAKPOINTS[breakpoint]}) { ${rule} }`;
}

/**
 * Utility function to create a transition string
 * @param properties CSS properties to transition
 * @param duration Duration token (default: 'normal')
 * @param easing Easing token (default: 'inOut')
 * @returns CSS transition property string
 */
export function transition(
  properties: string[],
  duration: keyof typeof MOTION.duration = 'normal',
  easing: keyof typeof MOTION.easing = 'inOut'
): string {
  const durationMs = MOTION.duration[duration];
  const easingFn = MOTION.easing[easing];
  return properties.map(prop => `${prop} ${durationMs}ms ${easingFn}`).join(', ');
}

// Default export for convenience
export default DESIGN_TOKENS;