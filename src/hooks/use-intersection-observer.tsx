"use client";

import { useEffect, useRef, useState } from "react";

interface UseIntersectionObserverOptions {
  threshold?: number | number[];
  rootMargin?: string;
  triggerOnce?: boolean;
}

export const useIntersectionObserver = (
  options: UseIntersectionObserverOptions = {}
) => {
  const [isIntersecting, setIsIntersecting] = useState(false);
  const [hasTriggered, setHasTriggered] = useState(false);
  const elementRef = useRef<HTMLElement>(null);

  const {
    threshold = 0.1,
    rootMargin = '0px 0px -50px 0px',
    triggerOnce = true,
  } = options;

  useEffect(() => {
    const element = elementRef.current;
    if (!element) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        const isElementIntersecting = entry.isIntersecting;
        
        if (isElementIntersecting && !hasTriggered) {
          setIsIntersecting(true);
          if (triggerOnce) {
            setHasTriggered(true);
          }
        } else if (!triggerOnce) {
          setIsIntersecting(isElementIntersecting);
        }
      },
      {
        threshold,
        rootMargin,
      }
    );

    observer.observe(element);

    return () => {
      observer.unobserve(element);
    };
  }, [threshold, rootMargin, triggerOnce, hasTriggered]);

  return { elementRef, isIntersecting };
};

export const useStaggeredIntersection = (
  itemCount: number,
  options: UseIntersectionObserverOptions = {}
) => {
  const [visibleItems, setVisibleItems] = useState<Set<number>>(new Set());
  const { elementRef, isIntersecting } = useIntersectionObserver(options);

  useEffect(() => {
    if (isIntersecting) {
      const interval = setInterval(() => {
        setVisibleItems(prev => {
          const next = new Set(prev);
          const nextIndex = next.size;
          if (nextIndex < itemCount) {
            next.add(nextIndex);
          } else {
            clearInterval(interval);
          }
          return next;
        });
      }, 100);

      return () => clearInterval(interval);
    }
  }, [isIntersecting, itemCount]);

  const isItemVisible = (index: number) => visibleItems.has(index);

  return { elementRef, isItemVisible, isIntersecting };
};
