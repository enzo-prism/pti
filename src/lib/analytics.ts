// Google Analytics 4 utility functions
declare global {
  interface Window {
    gtag: (command: string, targetId: string | Date, config?: any) => void;
    dataLayer: any[];
  }
}

// Analytics event types
export interface AnalyticsEvent {
  event_category: string;
  event_label?: string;
  value?: number;
  custom_parameters?: Record<string, any>;
}

// Check if we're in production and analytics should be enabled
const vercelEnv = process.env.NEXT_PUBLIC_VERCEL_ENV;
const isProduction =
  typeof vercelEnv === "string"
    ? vercelEnv === "production"
    : process.env.NODE_ENV === "production";
const GA_MEASUREMENT_ID = 'G-XCBKH87HG5';

// Initialize Google Analytics
export const initializeAnalytics = () => {
  if (!isProduction) {
    console.log('[Analytics] Development mode - analytics disabled');
    return;
  }

  if (typeof window.gtag === 'undefined') {
    console.warn('[Analytics] Google Analytics not loaded');
    return;
  }

  console.log('[Analytics] Initialized successfully');
};

// Track page views
export const trackPageView = (path: string, title?: string) => {
  if (!isProduction) {
    console.log(`[Analytics] Page view: ${path}${title ? ` - ${title}` : ''}`);
    return;
  }

  if (typeof window.gtag === 'undefined') {
    console.warn('[Analytics] gtag not available');
    return;
  }

  window.gtag('config', GA_MEASUREMENT_ID, {
    page_path: path,
    page_title: title,
  });
};

// Track custom events
export const trackEvent = (eventName: string, parameters: AnalyticsEvent) => {
  if (!isProduction) {
    console.log(`[Analytics] Event: ${eventName}`, parameters);
    return;
  }

  if (typeof window.gtag === 'undefined') {
    console.warn('[Analytics] gtag not available for event tracking');
    return;
  }

  window.gtag('event', eventName, {
    event_category: parameters.event_category,
    event_label: parameters.event_label,
    value: parameters.value,
    ...parameters.custom_parameters,
  });
};

// Predefined event tracking functions
export const trackContactFormSubmit = () => {
  trackEvent('form_submit', {
    event_category: 'engagement',
    event_label: 'contact_form',
  });
};

export const trackServiceView = (serviceName: string) => {
  trackEvent('page_view', {
    event_category: 'services',
    event_label: serviceName,
  });
};

export const trackBlogPostView = (postTitle: string, category: string) => {
  trackEvent('page_view', {
    event_category: 'blog',
    event_label: postTitle,
    custom_parameters: {
      content_category: category,
    },
  });
};

export const trackCTAClick = (ctaName: string, location: string) => {
  trackEvent('click', {
    event_category: 'cta',
    event_label: ctaName,
    custom_parameters: {
      click_location: location,
    },
  });
};

export const trackSeriesNavigation = (fromPart: string, toPart: string) => {
  trackEvent('navigation', {
    event_category: 'blog_series',
    event_label: `${fromPart}_to_${toPart}`,
  });
};
