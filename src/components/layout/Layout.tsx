
import { ReactNode, useEffect } from "react";
import { useLocation } from "react-router-dom";
import Navbar from "./Navbar";
import Footer from "./Footer";
import SEO from "./SEO";
import { useIsMobile } from "@/hooks/use-mobile";
import { useScrollToTop } from "@/hooks/use-scroll-to-top";
import type { BreadcrumbNode } from "@/lib/breadcrumbs";
import { getBreadcrumbsForPath } from "@/lib/routeBreadcrumbs";

interface LayoutProps {
  children: ReactNode;
  title?: string;
  description?: string;
  breadcrumbs?: BreadcrumbNode[];
}

const Layout = ({ children, title, description, breadcrumbs }: LayoutProps) => {
  const isMobile = useIsMobile();
  const location = useLocation();
  
  // Use the scroll to top hook
  useScrollToTop();
  
  // Set default metadata based on current path
  const getMetadata = () => {
    let pageTitle = "Dental Transitions";
    let pageDescription = "Expert guidance for dental practice transitions, helping you build and preserve your professional legacy.";
    
    switch (location.pathname) {
      case "/":
        pageTitle = "Dental Transitions";
        pageDescription = "Expert guidance for dental practice transitions, helping you build and preserve your professional legacy.";
        break;
      case "/about":
        pageTitle = "About Us";
        pageDescription = "Learn about Practice Transitions Institute and our specialized team of dental practice transition experts.";
        break;
      case "/services":
        pageTitle = "Our Services";
        pageDescription = "Comprehensive solutions for dental practice transitions at every stage of your career.";
        break;
      case "/services/value":
        pageTitle = "Opinion of Value";
        pageDescription = "Professional valuation services to determine the true market value of your dental practice.";
        break;
      case "/services/selling":
        pageTitle = "Selling Practices";
        pageDescription = "Strategic guidance and support for selling your dental practice to achieve maximum value.";
        break;
      case "/services/associateships":
        pageTitle = "Associateships";
        pageDescription = "Structured pathways for associates to transition into dental practice ownership roles.";
        break;
      case "/services/partnerships":
        pageTitle = "Partnership Solutions";
        pageDescription = "Creating equitable dental partnership arrangements that benefit all parties involved.";
        break;
      case "/transitions":
        pageTitle = "Practice Listings";
        pageDescription = "Browse available dental practices for sale and recent transitions in your area.";
        break;
      case "/faq":
        pageTitle = "FAQ";
        pageDescription = "Find answers to common questions about dental practice transitions, valuation, and the selling process.";
        break;
      case "/testimonials":
        pageTitle = "Client Testimonials";
        pageDescription = "Read what dental professionals say about their experience with Practice Transitions Institute.";
        break;
      case "/events":
        pageTitle = "Upcoming Events";
        pageDescription = "Join us for educational seminars and events focused on dental practice transitions.";
        break;
      case "/resources":
        pageTitle = "Helpful Resources";
        pageDescription = "Access guides, articles, and tools to help navigate your dental practice transition.";
        break;
      case "/contact":
        pageTitle = "Contact Us";
        pageDescription = "Get in touch with our dental practice transition experts to discuss your unique situation.";
        break;
      default:
        if (location.pathname.startsWith("/transitions/")) {
          pageTitle = "Practice Details";
          pageDescription = "Detailed information about this dental practice opportunity.";
        }
        break;
    }
    
    return { title: title || pageTitle, description: description || pageDescription };
  };
  
  const metadata = getMetadata();
  const defaultBreadcrumbs = getBreadcrumbsForPath(location.pathname);
  const breadcrumbData = breadcrumbs ?? defaultBreadcrumbs ?? undefined;
  
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
    <div className="flex flex-col min-h-screen">
      <SEO 
        title={metadata.title} 
        description={metadata.description} 
        path={location.pathname}
        breadcrumbs={breadcrumbData}
      />
      <Navbar />
      <main className={`flex-grow ${isMobile ? 'pt-14 pb-4' : 'pt-16 pb-8'}`}>
        {children}
      </main>
      <Footer />
    </div>
  );
};

export default Layout;
