
import { useEffect, useState } from "react";

const TYPEFORM_INITIAL_HEIGHT = 1000;

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
      <div>
        <h2 className="text-2xl font-semibold mb-2">Reach Out to Start the Conversation</h2>
        <div className="mb-6 text-gray-600">
          <p className="mb-2">Call us: (833) 784 – 1121</p>
          <p>Email us: Complete the form below</p>
        </div>
        <div 
          className="flex items-center justify-center border rounded-lg bg-muted"
          style={{ minHeight: `${TYPEFORM_INITIAL_HEIGHT}px` }}
        >
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
    <div>
      <h2 className="text-2xl font-semibold mb-2">Reach Out to Start the Conversation</h2>
      <div className="mb-6 text-gray-600">
        <p className="mb-2">Call us: (833) 784 – 1121</p>
        <p>Email us: Complete the form below</p>
      </div>
      {isLoading && (
        <div 
          className="flex items-center justify-center"
          style={{ minHeight: `${TYPEFORM_INITIAL_HEIGHT}px` }}
        >
          <div className="text-muted-foreground">Loading form...</div>
        </div>
      )}
      <div 
        data-tf-widget="https://fxuqp40sseh.typeform.com/to/cYOs5Ma2"
        data-tf-opacity="100"
        data-tf-hide-headers
        data-tf-hide-footer
        data-tf-auto-resize="true"
        data-tf-height={TYPEFORM_INITIAL_HEIGHT}
        className="w-full"
        style={{ opacity: isLoading ? 0 : 1, minHeight: `${TYPEFORM_INITIAL_HEIGHT}px` }}
      />
    </div>
  );
};
