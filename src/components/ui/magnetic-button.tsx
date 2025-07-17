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

    const handleMouseMove = (e: MouseEvent) => {
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
      }
    };

    const handleMouseLeave = () => {
      button.style.transform = 'translate3d(0, 0, 0) scale(1)';
    };

    button.addEventListener('mousemove', handleMouseMove);
    button.addEventListener('mouseleave', handleMouseLeave);

    return () => {
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