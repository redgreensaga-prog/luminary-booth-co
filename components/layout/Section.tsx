import React from 'react';
import { cn } from '@/lib/utils';
import { Container, ContainerProps } from './Container';
import { SPACING } from '@/lib/tokens';

type SectionVariant = 'default' | 'dark' | 'gold' | 'gradient';

interface SectionProps extends React.HTMLAttributes<HTMLElement> {
  as?: React.ElementType;
  variant?: SectionVariant;
  container?: boolean;
  containerSize?: ContainerProps['size'];
  spacing?: 'none' | 'sm' | 'md' | 'lg' | 'xl';
  fullWidth?: boolean;
}

/**
 * Section component for vertical spacing and background variants.
 * Supports dark luxury editorial variants with proper spacing.
 */
export const Section: React.FC<SectionProps> = ({
  as: Component = 'section',
  variant = 'default',
  container = true,
  containerSize = '5xl',
  spacing = 'md',
  fullWidth = false,
  className,
  children,
  ...props
}) => {
  const variantStyles: Record<SectionVariant, string> = {
    default: 'bg-transparent',
    dark: 'bg-[var(--color-gray-dark)]',
    gold: 'bg-gradient-to-b from-[var(--color-gold-transparent-10)] to-transparent',
    gradient: 'bg-gradient-to-b from-[var(--color-black)] via-[var(--color-gray-dark)] to-[var(--color-black)]',
  };

  const spacingStyles: Record<'sm' | 'md' | 'lg' | 'xl', string> = {
    sm: 'py-8 sm:py-12',
    md: 'py-12 sm:py-16 lg:py-20',
    lg: 'py-16 sm:py-20 lg:py-24',
    xl: 'py-20 sm:py-24 lg:py-32',
  };

  const content = container ? (
    <Container size={containerSize} padding={!fullWidth}>
      {children}
    </Container>
  ) : (
    children
  );

  return (
    <Component
      className={cn(
        variantStyles[variant],
        spacing !== 'none' && spacingStyles[spacing],
        className
      )}
      {...props}
    >
      {content}
    </Component>
  );
};