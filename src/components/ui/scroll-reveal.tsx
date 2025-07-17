import { ReactNode } from 'react';
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
  duration = 600,
  intensity = 'normal'
}: ScrollRevealProps) => {
  const { elementRef, isIntersecting } = useIntersectionObserver({
    threshold: 0.1,
    rootMargin: '0px 0px -100px 0px'
  });

  const getAnimationClass = () => {
    const intensityClass = intensity === 'subtle' ? '-subtle' : intensity === 'strong' ? '-strong' : '';
    
    switch (direction) {
      case 'up':
        return `animate-slide-up${intensityClass}`;
      case 'down':
        return `animate-slide-down${intensityClass}`;
      case 'left':
        return `animate-slide-left${intensityClass}`;
      case 'right':
        return `animate-slide-right${intensityClass}`;
      case 'scale':
        return `animate-scale-elegant${intensityClass}`;
      case 'blur-in':
        return `animate-blur-reveal${intensityClass}`;
      case 'elastic':
        return `animate-elastic-bounce${intensityClass}`;
      case 'bounce':
        return `animate-soft-bounce${intensityClass}`;
      case 'parallax':
        return `animate-parallax-float${intensityClass}`;
      case 'magnetic':
        return `animate-magnetic-rise${intensityClass}`;
      case 'morphing':
        return `animate-morphing-reveal${intensityClass}`;
      default:
        return `animate-slide-up${intensityClass}`;
    }
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

  return (
    <div
      ref={elementRef as any}
      className={cn(
        'gpu-accelerated will-change-transform',
        isIntersecting ? getAnimationClass() : '',
        className
      )}
      style={{
        opacity: isIntersecting ? 1 : 0,
        transform: isIntersecting ? 'translate3d(0, 0, 0) scale3d(1, 1, 1)' : initialTransform(),
        transition: `opacity ${duration}ms cubic-bezier(0.16, 1, 0.3, 1), transform ${duration}ms cubic-bezier(0.16, 1, 0.3, 1)`,
        transitionDelay: `${delay}ms`
      }}
    >
      {children}
    </div>
  );
};