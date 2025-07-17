import { ReactNode } from 'react';
import { useIntersectionObserver } from '@/hooks/use-intersection-observer';
import { cn } from '@/lib/utils';

interface ScrollRevealProps {
  children: ReactNode;
  className?: string;
  delay?: number;
  direction?: 'up' | 'down' | 'left' | 'right' | 'scale';
  duration?: number;
}

export const ScrollReveal = ({ 
  children, 
  className,
  delay = 0,
  direction = 'up',
  duration = 600
}: ScrollRevealProps) => {
  const { elementRef, isIntersecting } = useIntersectionObserver({
    threshold: 0.1,
    rootMargin: '0px 0px -100px 0px'
  });

  const getAnimationClass = () => {
    switch (direction) {
      case 'up':
        return 'animate-slide-up';
      case 'down':
        return 'animate-fade-in';
      case 'left':
        return 'animate-slide-in';
      case 'right':
        return 'animate-slide-in';
      case 'scale':
        return 'animate-scale-in';
      default:
        return 'animate-slide-up';
    }
  };

  const initialTransform = () => {
    switch (direction) {
      case 'up':
        return 'translate3d(0, 30px, 0)';
      case 'down':
        return 'translate3d(0, -30px, 0)';
      case 'left':
        return 'translate3d(-30px, 0, 0)';
      case 'right':
        return 'translate3d(30px, 0, 0)';
      case 'scale':
        return 'scale3d(0.9, 0.9, 1)';
      default:
        return 'translate3d(0, 30px, 0)';
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