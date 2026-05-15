'use client';

import { ReactNode } from 'react';
import { motion, HTMLMotionProps } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import { cn } from '@/lib/utils';
import { MOTION } from '@/lib/tokens';

interface AnimatedSectionProps extends HTMLMotionProps<'section'> {
  children: ReactNode;
  className?: string;
  threshold?: number;
  once?: boolean;
  delay?: number;
  staggerChildren?: number;
  animation?: 'fade' | 'slide-up' | 'slide-left' | 'slide-right';
}

export default function AnimatedSection({
  children,
  className,
  threshold = 0.15,
  once = true,
  delay = 0,
  staggerChildren = 0.08,
  animation = 'slide-up',
  ...props
}: AnimatedSectionProps) {
  const { ref, inView } = useInView({
    threshold,
    triggerOnce: once,
  });

  const getAnimationVariants = () => {
    switch (animation) {
      case 'fade':
        return {
          hidden: { opacity: 0 },
          visible: {
            opacity: 1,
            transition: {
              duration: MOTION.duration.normal / 1000,
              ease: MOTION.easing.editorial,
              staggerChildren,
              delayChildren: delay,
            },
          },
        };
      case 'slide-left':
        return {
          hidden: { opacity: 0, x: 50 },
          visible: {
            opacity: 1,
            x: 0,
            transition: {
              duration: MOTION.duration.slow / 1000,
              ease: MOTION.easing.editorial,
              staggerChildren,
              delayChildren: delay,
            },
          },
        };
      case 'slide-right':
        return {
          hidden: { opacity: 0, x: -50 },
          visible: {
            opacity: 1,
            x: 0,
            transition: {
              duration: MOTION.duration.slow / 1000,
              ease: MOTION.easing.editorial,
              staggerChildren,
              delayChildren: delay,
            },
          },
        };
      case 'slide-up':
      default:
        return {
          hidden: { opacity: 0, y: 32 },
          visible: {
            opacity: 1,
            y: 0,
            transition: {
              duration: MOTION.duration.slow / 1000,
              ease: MOTION.easing.editorial,
              staggerChildren,
              delayChildren: delay,
            },
          },
        };
    }
  };

  const containerVariants = getAnimationVariants();

  return (
    <motion.section
      ref={ref}
      initial="hidden"
      animate={inView ? 'visible' : 'hidden'}
      variants={containerVariants}
      className={cn('relative', className)}
      {...props}
    >
      {children}
    </motion.section>
  );
}
