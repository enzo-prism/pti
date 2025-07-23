import { ReactNode, useEffect } from "react";
import { useLocation } from "react-router-dom";
import SEO from "./SEO";
import { useIsMobile } from "@/hooks/use-mobile";
import { useScrollToTop } from "@/hooks/use-scroll-to-top";

interface MinimalLayoutProps {
  children: ReactNode;
  title?: string;
  description?: string;
}

const MinimalLayout = ({ children, title, description }: MinimalLayoutProps) => {
  const isMobile = useIsMobile();
  const location = useLocation();
  
  // Use the scroll to top hook
  useScrollToTop();
  
  // Set default metadata based on current path
  const getMetadata = () => {
    let pageTitle = "Dental Transitions";
    let pageDescription = "Expert guidance for dental practice transitions, helping you build and preserve your professional legacy.";
    
    if (location.pathname === "/drnjo") {
      pageTitle = "Dr. Michael Njo - Personal Consultation";
      pageDescription = "Schedule a personal consultation with Dr. Michael Njo, leading dental practice transition expert with 30+ years of experience. Author, speaker, and trusted advisor.";
    }
    
    return { title: title || pageTitle, description: description || pageDescription };
  };
  
  const metadata = getMetadata();
  
  useEffect(() => {
    // Add viewport meta tag to ensure proper scaling for mobile
    const meta = document.createElement('meta');
    meta.name = 'viewport';
    meta.content = 'width=device-width, initial-scale=1, maximum-scale=1, user-scalable=0, viewport-fit=cover';
    document.head.appendChild(meta);
    
    // Add touch-action meta to improve mobile interactions
    const touchActionMeta = document.createElement('meta');
    touchActionMeta.name = 'apple-mobile-web-app-capable';
    touchActionMeta.content = 'yes';
    document.head.appendChild(touchActionMeta);
    
    // Clean up function
    return () => {
      document.head.removeChild(meta);
      document.head.removeChild(touchActionMeta);
    };
  }, []);
  
  return (
    <div className="min-h-screen">
      <SEO 
        title={metadata.title} 
        description={metadata.description} 
        path={location.pathname}
      />
      <main className="min-h-screen">
        {children}
      </main>
    </div>
  );
};

export default MinimalLayout;