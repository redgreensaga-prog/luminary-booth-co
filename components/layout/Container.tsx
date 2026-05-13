import React from 'react';
import { cn } from '@/lib/utils';
import { LAYOUT } from '@/lib/tokens';

export interface ContainerProps extends React.HTMLAttributes<HTMLDivElement> {
  as?: React.ElementType;
  size?: keyof typeof LAYOUT.container;
  padding?: boolean;
}

/**
 * Container component for consistent content width and responsive padding.
 * Follows dark luxury editorial design system with max-width constraints.
 */
export const Container: React.FC<ContainerProps> = ({
  as: Component = 'div',
  size = '5xl',
  padding = true,
  className,
  children,
  ...props
}) => {
  const maxWidth = LAYOUT.container[size];
  
  return (
    <Component
      className={cn(
        'mx-auto w-full',
        padding && 'px-4 sm:px-6 lg:px-8',
        className
      )}
      style={{ 
        maxWidth: size !== 'full' ? maxWidth : undefined,
        ...props.style 
      }}
      {...props}
    >
      {children}
    </Component>
  );
};