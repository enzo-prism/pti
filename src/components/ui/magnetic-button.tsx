import React, { useRef, useEffect } from 'react';
import { Button, ButtonProps } from './button';
import { cn } from '@/lib/utils';

interface MagneticButtonProps extends ButtonProps {
  magneticStrength?: number;
  children: React.ReactNode;
}

export const MagneticButton: React.FC<MagneticButtonProps> = ({
  magneticStrength = 0.3,
  className,
  children,
  ...props
}) => {
  const buttonRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    const button = buttonRef.current;
    if (!button) return;

    // Check for reduced motion preference
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (prefersReducedMotion) return;

    let animationId: number;
    let lastTime = 0;
    const throttleMs = 16; // ~60fps

    const handleMouseMove = (e: MouseEvent) => {
      const currentTime = Date.now();
      if (currentTime - lastTime < throttleMs) return;
      lastTime = currentTime;

      if (animationId) cancelAnimationFrame(animationId);
      
      animationId = requestAnimationFrame(() => {
        const rect = button.getBoundingClientRect();
        const x = e.clientX - rect.left - rect.width / 2;
        const y = e.clientY - rect.top - rect.height / 2;
        
        const distance = Math.sqrt(x * x + y * y);
        const maxDistance = Math.max(rect.width, rect.height);
        
        if (distance < maxDistance) {
          const strength = (1 - distance / maxDistance) * magneticStrength;
          const translateX = x * strength;
          const translateY = y * strength;
          
          button.style.transform = `translate3d(${translateX}px, ${translateY}px, 0) scale(1.05)`;
          button.style.willChange = 'transform';
        }
      });
    };

    const handleMouseLeave = () => {
      if (animationId) cancelAnimationFrame(animationId);
      button.style.transform = 'translate3d(0, 0, 0) scale(1)';
      button.style.willChange = 'auto';
    };

    button.addEventListener('mousemove', handleMouseMove);
    button.addEventListener('mouseleave', handleMouseLeave);

    return () => {
      if (animationId) cancelAnimationFrame(animationId);
      button.removeEventListener('mousemove', handleMouseMove);
      button.removeEventListener('mouseleave', handleMouseLeave);
    };
  }, [magneticStrength]);

  return (
    <Button
      ref={buttonRef}
      className={cn('magnetic-button', className)}
      {...props}
    >
      {children}
    </Button>
  );
};