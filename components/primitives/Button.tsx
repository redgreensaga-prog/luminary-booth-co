'use client';

import { forwardRef } from 'react';
import { motion } from 'framer-motion';
import { cva, type VariantProps } from 'class-variance-authority';
import { cn } from '@/lib/utils';
import { MOTION } from '@/lib/tokens';

// Button variants using CVA
const buttonVariants = cva(
  'inline-flex items-center justify-center whitespace-nowrap rounded-lg font-medium transition-colors duration-300 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-gold focus-visible:ring-offset-2 focus-visible:ring-offset-black disabled:pointer-events-none disabled:opacity-50 relative overflow-hidden',
  {
    variants: {
      variant: {
        primary: [
          'bg-gold hover:bg-gold-light text-black font-semibold',
          'shadow-[0_0_0_0_rgba(0,92,72,0)] hover:shadow-[0_0_30px_8px_rgba(0,92,72,0.35)]',
          'transition-shadow duration-500',
          'border border-gold-dark/30',
        ].join(' '),
        secondary: [
          'bg-gray-dark hover:bg-gray-medium text-text-primary border border-gray-medium',
          'shadow-sm hover:shadow-md',
        ].join(' '),
        ghost: [
          'bg-transparent hover:bg-gray-dark/50 text-text-primary border border-transparent hover:border-gray-medium',
          'shadow-none',
        ].join(' '),
        destructive: [
          'bg-error hover:bg-error/90 text-white border border-error/50',
          'shadow-sm hover:shadow-md',
        ].join(' '),
      },
      size: {
        sm: 'h-8 px-3 text-xs',
        md: 'h-10 px-4 text-sm',
        lg: 'h-12 px-6 text-base',
      },
      fullWidth: {
        true: 'w-full',
        false: '',
      },
    },
    defaultVariants: {
      variant: 'primary',
      size: 'md',
      fullWidth: false,
    },
  }
);

export interface ButtonProps
  extends Omit<React.ButtonHTMLAttributes<HTMLButtonElement>, 'onDrag' | 'onDragEnd' | 'onDragStart'>,
    VariantProps<typeof buttonVariants> {
  asChild?: boolean;
  isLoading?: boolean;
  leftIcon?: React.ReactNode;
  rightIcon?: React.ReactNode;
  children?: React.ReactNode;
  animateShimmer?: boolean;
}

const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  (
    {
      className,
      variant = 'primary',
      size = 'md',
      fullWidth = false,
      asChild = false,
      isLoading = false,
      leftIcon,
      rightIcon,
      children,
      animateShimmer = true,
      disabled,
      ...props
    },
    ref
  ) => {
    const isPrimary = variant === 'primary';
    
    const springConfig = MOTION.spring.cinematic;

    const hoverVariants = {
      initial: { scale: 1 },
      hover: { 
        scale: 1.02,
        transition: {
          type: 'spring' as const,
          ...springConfig,
        }
      },
      tap: { 
        scale: 0.98,
        transition: {
          type: 'spring' as const,
          ...springConfig,
        }
      },
    };

    const ShimmerEffect = isPrimary && animateShimmer ? (
      <motion.span
        className="absolute inset-0 bg-gradient-to-r from-transparent via-gold-transparent-30 to-transparent"
        initial={{ x: '-100%', y: '-100%', rotate: '30deg' }}
        whileHover={{
          x: '100%',
          y: '100%',
          transition: {
            duration: 0.8,
            ease: 'linear',
          },
        }}
        style={{
          pointerEvents: 'none',
        }}
      />
    ) : null;

    return (
      <motion.button
        ref={ref}
        className={cn(
          buttonVariants({ variant, size, fullWidth, className }),
          'relative'
        )}
        disabled={isLoading || disabled}
        variants={hoverVariants}
        initial="initial"
        whileHover="hover"
        whileTap="tap"
        {...(props as any)}
      >
        {ShimmerEffect}
        
        {isLoading && (
          <motion.span
            className="absolute inset-0 flex items-center justify-center bg-inherit"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.2 }}
          >
            <motion.svg
              className="h-4 w-4 animate-spin"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              animate={{ rotate: 360 }}
              transition={{
                duration: 1,
                repeat: Infinity,
                ease: 'linear',
              }}
            >
              <circle
                className="opacity-25"
                cx="12"
                cy="12"
                r="10"
                stroke="currentColor"
                strokeWidth="4"
              />
              <path
                className="opacity-75"
                fill="currentColor"
                d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
              />
            </motion.svg>
          </motion.span>
        )}

        <span
          className={cn(
            'inline-flex items-center justify-center gap-2',
            isLoading ? 'opacity-0' : 'opacity-100'
          )}
        >
          {leftIcon && <span className="flex-shrink-0">{leftIcon}</span>}
          {children}
          {rightIcon && <span className="flex-shrink-0">{rightIcon}</span>}
        </span>
      </motion.button>
    );
  }
);

Button.displayName = 'Button';

export { Button, buttonVariants };
export default Button;
