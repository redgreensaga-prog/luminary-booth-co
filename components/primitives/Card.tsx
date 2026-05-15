'use client';

import { forwardRef } from 'react';
import { motion, HTMLMotionProps } from 'framer-motion';
import { cva, type VariantProps } from 'class-variance-authority';
import { cn } from '@/lib/utils';
import { SHADOWS, MOTION } from '@/lib/tokens';

// Card variants using CVA
const cardVariants = cva(
  'rounded-lg border transition-all duration-300',
  {
    variants: {
      variant: {
        default: [
          'bg-gray-dark border-gray-medium/30',
          'shadow-sm hover:shadow-md',
        ].join(' '),
        elevated: [
          'bg-gray-dark border-gray-medium/50',
          'shadow-md hover:shadow-lg hover:shadow-gold-transparent-10',
        ].join(' '),
        bordered: [
          'bg-transparent border-gray-medium',
          'shadow-none hover:border-gold/30',
        ].join(' '),
        ghost: [
          'bg-transparent border-transparent',
          'shadow-none hover:bg-gray-dark/50',
        ].join(' '),
      },
      padding: {
        none: 'p-0',
        sm: 'p-4',
        md: 'p-6',
        lg: 'p-8',
      },
      hoverEffect: {
        none: '',
        lift: 'hover:-translate-y-1',
        glow: 'hover:shadow-gold',
      },
    },
    defaultVariants: {
      variant: 'default',
      padding: 'md',
      hoverEffect: 'lift',
    },
  }
);

export interface CardProps
  extends Omit<HTMLMotionProps<'div'>, 'children' | 'ref'>,
    VariantProps<typeof cardVariants> {
  children?: React.ReactNode;
  as?: 'div' | 'section' | 'article' | 'aside';
  disableAnimation?: boolean;
  animationDelay?: number;
}

const MotionDiv = motion.div;

const Card = forwardRef<HTMLDivElement, CardProps>(
  (
    {
      className,
      variant = 'default',
      padding = 'md',
      hoverEffect = 'lift',
      children,
      as = 'div',
      disableAnimation = false,
      animationDelay = 0,
      ...props
    },
    ref
  ) => {
    // Animation variants for entrance
    const entranceVariants = {
      hidden: { 
        opacity: 0,
        y: 20,
      },
      visible: { 
        opacity: 1,
        y: 0,
        transition: {
          type: 'spring',
          ...MOTION.spring.cinematic,
          delay: animationDelay,
        },
      },
    };

    // Hover animation variants based on hoverEffect prop
    const hoverVariants = {
      hover: hoverEffect === 'lift' ? { 
        y: -4,
        boxShadow: SHADOWS.lg,
        transition: {
          type: 'spring',
          ...MOTION.spring.gentle,
        },
      } : hoverEffect === 'glow' ? {
        boxShadow: SHADOWS.goldLg,
        transition: {
          type: 'spring',
          ...MOTION.spring.gentle,
        },
      } : {},
    };

    const Component = MotionDiv;

    return (
      <Component
        ref={ref}
        className={cn(cardVariants({ variant, padding, hoverEffect, className }))}
        variants={entranceVariants}
        initial={disableAnimation ? false : 'hidden'}
        animate="visible"
        whileHover={disableAnimation ? undefined : 'hover'}
        {...props}
      >
        {children}
      </Component>
    );
  }
);

Card.displayName = 'Card';

export { Card, cardVariants };

// Card subcomponents for common patterns
export interface CardHeaderProps extends React.HTMLAttributes<HTMLDivElement> {
  children?: React.ReactNode;
}

const CardHeader = forwardRef<HTMLDivElement, CardHeaderProps>(
  ({ className, children, ...props }, ref) => (
    <div
      ref={ref}
      className={cn('flex flex-col space-y-1.5 p-6 pb-3', className)}
      {...props}
    >
      {children}
    </div>
  )
);
CardHeader.displayName = 'CardHeader';

export interface CardTitleProps extends React.HTMLAttributes<HTMLHeadingElement> {
  as?: 'h1' | 'h2' | 'h3' | 'h4' | 'h5' | 'h6';
  children?: React.ReactNode;
}

const CardTitle = forwardRef<HTMLHeadingElement, CardTitleProps>(
  ({ className, as = 'h3', children, ...props }, ref) => {
    const Component = as;
    return (
      <Component
        ref={ref}
        className={cn(
          'font-display text-2xl font-semibold leading-tight tracking-tight text-text-primary',
          className
        )}
        {...props}
      >
        {children}
      </Component>
    );
  }
);
CardTitle.displayName = 'CardTitle';

export interface CardDescriptionProps extends React.HTMLAttributes<HTMLParagraphElement> {
  children?: React.ReactNode;
}

const CardDescription = forwardRef<HTMLParagraphElement, CardDescriptionProps>(
  ({ className, children, ...props }, ref) => (
    <p
      ref={ref}
      className={cn('text-sm text-text-tertiary', className)}
      {...props}
    >
      {children}
    </p>
  )
);
CardDescription.displayName = 'CardDescription';

export interface CardContentProps extends React.HTMLAttributes<HTMLDivElement> {
  children?: React.ReactNode;
}

const CardContent = forwardRef<HTMLDivElement, CardContentProps>(
  ({ className, children, ...props }, ref) => (
    <div ref={ref} className={cn('p-6 pt-0', className)} {...props}>
      {children}
    </div>
  )
);
CardContent.displayName = 'CardContent';

export interface CardFooterProps extends React.HTMLAttributes<HTMLDivElement> {
  children?: React.ReactNode;
}

const CardFooter = forwardRef<HTMLDivElement, CardFooterProps>(
  ({ className, children, ...props }, ref) => (
    <div
      ref={ref}
      className={cn('flex items-center p-6 pt-3', className)}
      {...props}
    >
      {children}
    </div>
  )
);
CardFooter.displayName = 'CardFooter';

// Export all subcomponents
export { CardHeader, CardTitle, CardDescription, CardContent, CardFooter };