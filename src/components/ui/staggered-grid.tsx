import { ReactNode } from 'react';
import { useStaggeredIntersection } from '@/hooks/use-intersection-observer';
import { cn } from '@/lib/utils';

interface StaggeredGridProps {
  children: ReactNode[];
  className?: string;
  itemClassName?: string;
  staggerDelay?: number;
}

export const StaggeredGrid = ({ 
  children, 
  className,
  itemClassName,
  staggerDelay = 100
}: StaggeredGridProps) => {
  const { elementRef, isItemVisible } = useStaggeredIntersection(children.length, {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
  });

  return (
    <div ref={elementRef as React.RefObject<HTMLDivElement>} className={cn('gpu-accelerated', className)}>
      {children.map((child, index) => (
        <div
          key={index}
          className={cn(
            'will-change-transform transition-all duration-700 ease-out',
            isItemVisible(index) 
              ? 'opacity-100 translate-y-0 scale-100' 
              : 'opacity-0 translate-y-8 scale-95',
            itemClassName
          )}
          style={{
            transitionDelay: isItemVisible(index) ? `${index * staggerDelay}ms` : '0ms',
            transform: isItemVisible(index) 
              ? 'translate3d(0, 0, 0) scale3d(1, 1, 1)' 
              : 'translate3d(0, 32px, 0) scale3d(0.95, 0.95, 1)'
          }}
        >
          {child}
        </div>
      ))}
    </div>
  );
};