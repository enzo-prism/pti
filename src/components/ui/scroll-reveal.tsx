"use client";

import { ReactNode } from "react";
import type { CSSProperties } from "react";
import { useIntersectionObserver } from '@/hooks/use-intersection-observer';
import { cn } from '@/lib/utils';

interface ScrollRevealProps {
  children: ReactNode;
  className?: string;
  delay?: number;
  direction?: 'up' | 'down' | 'left' | 'right' | 'scale' | 'blur-in' | 'elastic' | 'bounce' | 'parallax' | 'magnetic' | 'morphing';
  duration?: number;
  intensity?: 'subtle' | 'normal' | 'strong';
}

export const ScrollReveal = ({ 
  children, 
  className,
  delay = 0,
  direction = 'up',
  duration,
  intensity = 'normal'
}: ScrollRevealProps) => {
  const { elementRef, isIntersecting } = useIntersectionObserver({
    threshold: 0.1,
    rootMargin: '0px 0px -100px 0px'
  });

  const getAnimationClass = () => {
    const baseClass = (() => {
      switch (direction) {
        case 'up':
          return 'animate-slide-up';
        case 'down':
          return 'animate-slide-down';
        case 'left':
          return 'animate-slide-left';
        case 'right':
          return 'animate-slide-right';
        case 'scale':
          return 'animate-scale-elegant';
        case 'blur-in':
          return 'animate-blur-reveal';
        case 'elastic':
          return 'animate-elastic-bounce';
        case 'bounce':
          return 'animate-soft-bounce';
        case 'parallax':
          return 'animate-parallax-float';
        case 'magnetic':
          return 'animate-magnetic-rise';
        case 'morphing':
          return 'animate-morphing-reveal';
        default:
          return 'animate-slide-up';
      }
    })();

    if (direction === 'up') {
      if (intensity === 'subtle') return `${baseClass}-subtle`;
      if (intensity === 'strong') return `${baseClass}-strong`;
    }

    return baseClass;
  };

  const initialTransform = () => {
    const multiplier = intensity === 'subtle' ? 0.5 : intensity === 'strong' ? 1.5 : 1;
    
    switch (direction) {
      case 'up':
        return `translate3d(0, ${30 * multiplier}px, 0)`;
      case 'down':
        return `translate3d(0, ${-30 * multiplier}px, 0)`;
      case 'left':
        return `translate3d(${-30 * multiplier}px, 0, 0)`;
      case 'right':
        return `translate3d(${30 * multiplier}px, 0, 0)`;
      case 'scale':
        return `scale3d(${0.9 - (0.1 * (multiplier - 1))}, ${0.9 - (0.1 * (multiplier - 1))}, 1)`;
      case 'blur-in':
        return `translate3d(0, ${20 * multiplier}px, 0) scale3d(0.95, 0.95, 1)`;
      case 'elastic':
        return `translate3d(0, ${40 * multiplier}px, 0) scale3d(0.8, 0.8, 1)`;
      case 'bounce':
        return `translate3d(0, ${35 * multiplier}px, 0) scale3d(0.85, 0.85, 1)`;
      case 'parallax':
        return `translate3d(0, ${25 * multiplier}px, 0) scale3d(0.92, 0.92, 1)`;
      case 'magnetic':
        return `translate3d(0, ${45 * multiplier}px, 0) scale3d(0.88, 0.88, 1)`;
      case 'morphing':
        return `translate3d(0, ${20 * multiplier}px, 0) scale3d(0.9, 0.9, 1)`;
      default:
        return `translate3d(0, ${30 * multiplier}px, 0)`;
    }
  };

  const style: CSSProperties = {
    opacity: isIntersecting ? undefined : 0,
    transform: isIntersecting ? undefined : initialTransform(),
    animationDelay: `${delay}ms`,
    animationFillMode: 'both',
    ...(typeof duration === 'number' ? { animationDuration: `${duration}ms` } : {})
  };

  return (
    <div
      ref={elementRef as any}
      className={cn(
        'gpu-accelerated will-change-transform',
        isIntersecting ? getAnimationClass() : '',
        className
      )}
      style={style}
    >
      {children}
    </div>
  );
};
