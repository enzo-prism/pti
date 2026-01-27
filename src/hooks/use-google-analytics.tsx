"use client";

import { useEffect } from "react";
import { usePathname, useSearchParams } from "next/navigation";
import { initializeAnalytics, trackPageView } from "@/lib/analytics";

// Custom hook for Google Analytics integration
export const useGoogleAnalytics = () => {
  const pathname = usePathname();
  const searchParams = useSearchParams();

  // Initialize analytics on first load
  useEffect(() => {
    initializeAnalytics();
  }, []);

  // Track page views on route changes
  useEffect(() => {
    const query = searchParams?.toString();
    const path = `${pathname}${query ? `?${query}` : ""}`;
    
    // Get page title from document or generate from path
    const pageTitle = document.title || getPageTitleFromPath(path);
    
    // Small delay to ensure the page has loaded and title is set
    const timer = setTimeout(() => {
      trackPageView(path, pageTitle);
    }, 100);

    return () => clearTimeout(timer);
  }, [pathname, searchParams]);
};

// Helper function to generate page title from path
const getPageTitleFromPath = (path: string): string => {
  const pathSegments = path.split('/').filter(Boolean);
  
  if (pathSegments.length === 0) return 'Home';
  
  // Handle blog posts
  if (pathSegments[0] === 'blog' && pathSegments.length > 1) {
    return `Blog Post: ${pathSegments[1].replace(/-/g, ' ')}`;
  }
  
  // Handle services
  if (pathSegments[0] === 'services' && pathSegments.length > 1) {
    return `Services: ${pathSegments[1].replace(/-/g, ' ')}`;
  }
  
  // Capitalize first segment
  return pathSegments[0].charAt(0).toUpperCase() + pathSegments[0].slice(1);
};
