import React, { useEffect, useState, useRef } from 'react';
import { cn } from '@/lib/utils';

interface AnimatedTextProps {
  text: string;
  className?: string;
  animationType?: 'char-reveal' | 'typewriter' | 'word-slide';
  delay?: number;
}

export const AnimatedText: React.FC<AnimatedTextProps> = ({
  text,
  className,
  animationType = 'char-reveal',
  delay = 0,
}) => {
  const [isVisible, setIsVisible] = useState(false);
  const [animationStarted, setAnimationStarted] = useState(false);
  const typewriterRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsVisible(true);
      setAnimationStarted(true);
    }, delay);

    return () => clearTimeout(timer);
  }, [delay]);

  useEffect(() => {
    if (animationType === 'typewriter' && typewriterRef.current && animationStarted) {
      const element = typewriterRef.current;
      const textLength = text.length;
      const duration = Math.max(textLength * 0.05, 1); // Dynamic duration based on text length
      
      element.style.setProperty('--duration', `${duration}s`);
      element.style.setProperty('--steps', textLength.toString());
      element.classList.add('active');
    }
  }, [animationType, text, animationStarted]);

  // Support for reduced motion
  const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  
  if (prefersReducedMotion) {
    return (
      <div className={cn('opacity-100', className)}>
        {text}
      </div>
    );
  }

  if (animationType === 'char-reveal') {
    return (
      <div className={cn('hero-text-reveal char-by-char', className, { 'opacity-100': isVisible })}>
        {text.split('').map((char, index) => (
          <span key={index} style={{ animationDelay: `${delay + index * 0.05}s` }}>
            {char === ' ' ? '\u00A0' : char}
          </span>
        ))}
      </div>
    );
  }

  if (animationType === 'typewriter') {
    return (
      <div 
        ref={typewriterRef}
        className={cn('typewriter-text', className)}
      >
        {text}
      </div>
    );
  }

  if (animationType === 'word-slide') {
    return (
      <div className={cn('hero-text-reveal', className)}>
        {text.split(' ').map((word, index) => (
          <span 
            key={index} 
            className="inline-block mr-2 opacity-0 animate-word-slide"
            style={{ animationDelay: `${delay + index * 0.1}s`, animationFillMode: 'forwards' }}
          >
            {word}
          </span>
        ))}
      </div>
    );
  }

  return (
    <div className={cn('hero-text-reveal', className)}>
      {text}
    </div>
  );
};