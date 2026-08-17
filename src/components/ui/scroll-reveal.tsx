"use client";

import {
  ReactNode,
  useEffect,
  useLayoutEffect,
  useRef,
  useState,
  type CSSProperties,
} from "react";
import { cn } from "@/lib/utils";

type RevealDirection =
  | "up"
  | "down"
  | "left"
  | "right"
  | "scale"
  | "blur-in"
  | "elastic"
  | "bounce"
  | "parallax"
  | "magnetic"
  | "morphing";

interface ScrollRevealProps {
  children: ReactNode;
  className?: string;
  delay?: number;
  direction?: RevealDirection;
  duration?: number;
  intensity?: "subtle" | "normal" | "strong";
}

interface RevealEnvironment {
  top: number;
  viewportHeight: number;
  reducedMotion: boolean;
  supportsIntersectionObserver: boolean;
}

export const shouldAnimateReveal = ({
  top,
  viewportHeight,
  reducedMotion,
  supportsIntersectionObserver,
}: RevealEnvironment): boolean =>
  supportsIntersectionObserver &&
  !reducedMotion &&
  viewportHeight > 0 &&
  top >= viewportHeight * 0.9;

// useLayoutEffect warns when run during SSR; fall back to useEffect on the server.
const useIsomorphicLayoutEffect =
  typeof window !== "undefined" ? useLayoutEffect : useEffect;

export const ScrollReveal = ({
  children,
  className,
  delay = 0,
  direction = "up",
  duration,
  intensity = "normal",
}: ScrollRevealProps) => {
  const elementRef = useRef<HTMLDivElement>(null);
  // Content is visible by default. Server render, no-JS, and reduced-motion all
  // paint immediately and stay crawlable — only below-the-fold elements opt in
  // to an entrance animation once JS runs.
  const [animate, setAnimate] = useState(false);
  const [revealed, setRevealed] = useState(true);

  // Runs before paint: hide (without a flash) only elements that start below the
  // fold, so the LCP/above-the-fold content never depends on JS to appear.
  useIsomorphicLayoutEffect(() => {
    const element = elementRef.current;
    if (!element || typeof window === "undefined") return;

    const motionQuery = window.matchMedia?.("(prefers-reduced-motion: reduce)");

    const viewportHeight =
      window.innerHeight || document.documentElement.clientHeight;
    const { top } = element.getBoundingClientRect();
    const canAnimate = shouldAnimateReveal({
      top,
      viewportHeight,
      reducedMotion: motionQuery?.matches ?? false,
      supportsIntersectionObserver: "IntersectionObserver" in window,
    });
    if (!canAnimate) return;

    setAnimate(true);
    setRevealed(false);
  }, []);

  useEffect(() => {
    if (!animate) return;
    const element = elementRef.current;
    if (!element) return;

    const reveal = () => setRevealed(true);
    const motionQuery = window.matchMedia?.("(prefers-reduced-motion: reduce)");
    const handleMotionChange = (event: MediaQueryListEvent) => {
      if (event.matches) reveal();
    };
    const fallbackTimer = window.setTimeout(reveal, 2500);

    try {
      if (!("IntersectionObserver" in window)) {
        reveal();
        return () => window.clearTimeout(fallbackTimer);
      }

      const observer = new IntersectionObserver(
        (entries) => {
          entries.forEach((entry) => {
            if (entry.isIntersecting) {
              reveal();
              observer.unobserve(entry.target);
            }
          });
        },
        { threshold: 0.05, rootMargin: "0px 0px -48px 0px" }
      );

      motionQuery?.addEventListener?.("change", handleMotionChange);
      observer.observe(element);
      return () => {
        window.clearTimeout(fallbackTimer);
        motionQuery?.removeEventListener?.("change", handleMotionChange);
        observer.disconnect();
      };
    } catch {
      reveal();
      return () => window.clearTimeout(fallbackTimer);
    }
  }, [animate]);

  const getAnimationClass = () => {
    const baseClass = (() => {
      switch (direction) {
        case "up":
          return "animate-slide-up";
        case "down":
          return "animate-slide-down";
        case "left":
          return "animate-slide-left";
        case "right":
          return "animate-slide-right";
        case "scale":
          return "animate-scale-elegant";
        case "blur-in":
          return "animate-blur-reveal";
        case "elastic":
          return "animate-elastic-bounce";
        case "bounce":
          return "animate-soft-bounce";
        case "parallax":
          return "animate-parallax-float";
        case "magnetic":
          return "animate-magnetic-rise";
        case "morphing":
          return "animate-morphing-reveal";
        default:
          return "animate-slide-up";
      }
    })();

    if (direction === "up") {
      if (intensity === "subtle") return `${baseClass}-subtle`;
      if (intensity === "strong") return `${baseClass}-strong`;
    }

    return baseClass;
  };

  const initialTransform = () => {
    const multiplier =
      intensity === "subtle" ? 0.5 : intensity === "strong" ? 1.5 : 1;

    switch (direction) {
      case "up":
        return `translate3d(0, ${30 * multiplier}px, 0)`;
      case "down":
        return `translate3d(0, ${-30 * multiplier}px, 0)`;
      case "left":
        return `translate3d(${-30 * multiplier}px, 0, 0)`;
      case "right":
        return `translate3d(${30 * multiplier}px, 0, 0)`;
      case "scale":
        return `scale3d(${0.9 - 0.1 * (multiplier - 1)}, ${
          0.9 - 0.1 * (multiplier - 1)
        }, 1)`;
      case "blur-in":
        return `translate3d(0, ${20 * multiplier}px, 0) scale3d(0.95, 0.95, 1)`;
      case "elastic":
        return `translate3d(0, ${40 * multiplier}px, 0) scale3d(0.8, 0.8, 1)`;
      case "bounce":
        return `translate3d(0, ${35 * multiplier}px, 0) scale3d(0.85, 0.85, 1)`;
      case "parallax":
        return `translate3d(0, ${25 * multiplier}px, 0) scale3d(0.92, 0.92, 1)`;
      case "magnetic":
        return `translate3d(0, ${45 * multiplier}px, 0) scale3d(0.88, 0.88, 1)`;
      case "morphing":
        return `translate3d(0, ${20 * multiplier}px, 0) scale3d(0.9, 0.9, 1)`;
      default:
        return `translate3d(0, ${30 * multiplier}px, 0)`;
    }
  };

  const isHidden = animate && !revealed;
  const style: CSSProperties = {
    opacity: isHidden ? 0 : undefined,
    transform: isHidden ? initialTransform() : undefined,
    animationDelay: `${delay}ms`,
    animationFillMode: "both",
    ...(typeof duration === "number"
      ? { animationDuration: `${duration}ms` }
      : {}),
  };

  return (
    <div
      ref={elementRef}
      className={cn(
        animate && !revealed && "gpu-accelerated will-change-transform",
        animate && revealed && "!opacity-100",
        animate && revealed ? getAnimationClass() : "",
        className
      )}
      style={style}
    >
      {children}
    </div>
  );
};
