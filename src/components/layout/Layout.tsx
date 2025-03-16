
import { ReactNode, useEffect } from "react";
import Navbar from "./Navbar";
import Footer from "./Footer";
import { useIsMobile } from "@/hooks/use-mobile";

interface LayoutProps {
  children: ReactNode;
}

const Layout = ({ children }: LayoutProps) => {
  const isMobile = useIsMobile();
  
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
      <Navbar />
      <main className={`flex-grow ${isMobile ? 'pt-14' : 'pt-16'}`}>
        {children}
      </main>
      <Footer />
    </div>
  );
};

export default Layout;
