import React from 'react';
import { cn } from '@/lib/utils';

type StackDirection = 'vertical' | 'horizontal';
type StackAlign = 'start' | 'center' | 'end' | 'stretch' | 'baseline';
type StackJustify = 'start' | 'center' | 'end' | 'between' | 'around';
type StackSpacing = 'none' | 'xs' | 'sm' | 'md' | 'lg' | 'xl';

interface StackProps extends React.HTMLAttributes<HTMLDivElement> {
  direction?: StackDirection;
  align?: StackAlign;
  justify?: StackJustify;
  spacing?: StackSpacing;
  wrap?: boolean;
  fullWidth?: boolean;
}

/**
 * Flexible stack component for vertical or horizontal layouts with consistent spacing.
 * Follows dark luxury editorial design system spacing tokens.
 */
export const Stack: React.FC<StackProps> = ({
  direction = 'vertical',
  align = 'stretch',
  justify = 'start',
  spacing = 'md',
  wrap = false,
  fullWidth = false,
  className,
  children,
  ...props
}) => {
  const directionStyles: Record<StackDirection, string> = {
    vertical: 'flex-col',
    horizontal: 'flex-row',
  };

  const alignStyles: Record<StackAlign, string> = {
    start: 'items-start',
    center: 'items-center',
    end: 'items-end',
    stretch: 'items-stretch',
    baseline: 'items-baseline',
  };

  const justifyStyles: Record<StackJustify, string> = {
    start: 'justify-start',
    center: 'justify-center',
    end: 'justify-end',
    between: 'justify-between',
    around: 'justify-around',
  };

  const spacingStyles: Record<Exclude<StackSpacing, 'none'>, string> = {
    xs: direction === 'vertical' ? 'space-y-2' : 'space-x-2',
    sm: direction === 'vertical' ? 'space-y-4' : 'space-x-4',
    md: direction === 'vertical' ? 'space-y-6' : 'space-x-6',
    lg: direction === 'vertical' ? 'space-y-8' : 'space-x-8',
    xl: direction === 'vertical' ? 'space-y-12' : 'space-x-12',
  };

  return (
    <div
      className={cn(
        'flex',
        directionStyles[direction],
        alignStyles[align],
        justifyStyles[justify],
        spacing !== 'none' && spacingStyles[spacing],
        wrap && 'flex-wrap',
        fullWidth && 'w-full',
        className
      )}
      {...props}
    >
      {children}
    </div>
  );
};