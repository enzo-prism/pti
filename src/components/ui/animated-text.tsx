import React, { useEffect, useState } from 'react';
import { cn } from '@/lib/utils';

interface AnimatedTextProps {
  text: string;
  className?: string;
  animationType?: 'char-reveal' | 'typewriter' | 'word-slide';
  delay?: number;
  children?: React.ReactNode;
}

export const AnimatedText: React.FC<AnimatedTextProps> = ({
  text,
  className,
  animationType = 'char-reveal',
  delay = 0,
  children
}) => {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsVisible(true);
    }, delay);

    return () => clearTimeout(timer);
  }, [delay]);

  if (animationType === 'char-reveal') {
    return (
      <div className={cn('hero-text-reveal char-by-char', className, { 'opacity-100': isVisible })}>
        {text.split('').map((char, index) => (
          <span key={index} style={{ animationDelay: `${delay + index * 0.05}s` }}>
            {char === ' ' ? '\u00A0' : char}
          </span>
        ))}
        {children}
      </div>
    );
  }

  if (animationType === 'typewriter') {
    return (
      <div className={cn('typewriter-text', className, { 'animation-play-state: running': isVisible })}>
        {text}
        {children}
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
        {children}
      </div>
    );
  }

  return (
    <div className={cn('hero-text-reveal', className)}>
      {text}
      {children}
    </div>
  );
};