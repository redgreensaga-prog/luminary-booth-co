'use client';

import { forwardRef } from 'react';
import { motion, HTMLMotionProps } from 'framer-motion';
import { cva, type VariantProps } from 'class-variance-authority';
import { cn } from '@/lib/utils';
import { MOTION } from '@/lib/tokens';

// Badge variants using CVA
const badgeVariants = cva(
  'inline-flex items-center rounded-full border font-medium transition-colors focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-black px-2.5 py-0.5 text-xs',
  {
    variants: {
      variant: {
        default: [
          'border-transparent bg-gray-medium text-text-primary',
          'hover:bg-gray-light',
        ].join(' '),
        accent: [
          'border-transparent bg-gold text-black',
          'hover:bg-gold-light',
        ].join(' '),
        outline: [
          'border-gray-medium text-text-primary bg-transparent',
          'hover:bg-gray-dark',
        ].join(' '),
        muted: [
          'border-transparent bg-gray-dark/50 text-text-tertiary',
          'hover:bg-gray-dark',
        ].join(' '),
      },
      size: {
        sm: 'text-xs px-2 py-0.5',
        md: 'text-sm px-2.5 py-0.5',
        lg: 'text-base px-3 py-1',
      },
    },
    defaultVariants: {
      variant: 'default',
      size: 'md',
    },
  }
);

export interface BadgeProps
  extends Omit<HTMLMotionProps<'div'>, 'children' | 'ref'>,
    VariantProps<typeof badgeVariants> {
  children?: React.ReactNode;
  animateEntrance?: boolean;
  animationDelay?: number;
}

const MotionDiv = motion.div;

const Badge = forwardRef<HTMLDivElement, BadgeProps>(
  (
    {
      className,
      variant = 'default',
      size = 'md',
      children,
      animateEntrance = true,
      animationDelay = 0,
      ...props
    },
    ref
  ) => {
    // Entrance animation variants
    const entranceVariants = {
      hidden: { 
        opacity: 0,
        scale: 0.8,
        y: 5,
      },
      visible: { 
        opacity: 1,
        scale: 1,
        y: 0,
        transition: {
          type: 'spring',
          ...MOTION.spring.gentle,
          delay: animationDelay,
        },
      },
    };

    // Hover animation variants
    const hoverVariants = {
      hover: { 
        scale: 1.05,
        transition: {
          type: 'spring',
          ...MOTION.spring.normal,
        },
      },
    };

    return (
      <MotionDiv
        ref={ref}
        className={cn(badgeVariants({ variant, size, className }))}
        variants={entranceVariants}
        initial={animateEntrance ? 'hidden' : false}
        animate="visible"
        whileHover="hover"
        {...props}
      >
        {children}
      </MotionDiv>
    );
  }
);

Badge.displayName = 'Badge';

export { Badge, badgeVariants };
export default Badge;