
import { useEffect, useState } from "react";

export const ContactForm = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [hasError, setHasError] = useState(false);

  useEffect(() => {
    // Load Typeform embed script
    const script = document.createElement('script');
    script.src = "//embed.typeform.com/next/embed.js";
    script.async = true;
    
    script.onload = () => {
      console.log('Typeform script loaded successfully');
      setIsLoading(false);
    };
    
    script.onerror = () => {
      console.error('Failed to load Typeform script');
      setHasError(true);
      setIsLoading(false);
    };
    
    document.body.appendChild(script);

    return () => {
      // Cleanup script when component unmounts
      try {
        document.body.removeChild(script);
      } catch (error) {
        console.log('Script already removed');
      }
    };
  }, []);

  if (hasError) {
    return (
      <div className="lg:col-span-2">
        <h2 className="text-2xl font-semibold mb-6">Request a Consultation</h2>
        <div className="min-h-[500px] flex items-center justify-center border rounded-lg bg-muted">
          <div className="text-center">
            <p className="text-muted-foreground mb-4">Unable to load the form. Please try again or contact us directly.</p>
            <a 
              href="https://fxuqp40sseh.typeform.com/to/cYOs5Ma2" 
              target="_blank" 
              rel="noopener noreferrer"
              className="text-primary hover:underline"
            >
              Open form in new window
            </a>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="lg:col-span-2">
      <h2 className="text-2xl font-semibold mb-6">Request a Consultation</h2>
      {isLoading && (
        <div className="py-12 flex items-center justify-center">
          <div className="text-muted-foreground">Loading form...</div>
        </div>
      )}
      <div 
        data-tf-widget="https://fxuqp40sseh.typeform.com/to/cYOs5Ma2"
        data-tf-opacity="100"
        data-tf-hide-headers
        data-tf-hide-footer
        data-tf-auto-resize="true"
        className="w-full"
        style={{ opacity: isLoading ? 0 : 1 }}
      />
    </div>
  );
};
