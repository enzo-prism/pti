
import { useEffect } from "react";

export const ContactForm = () => {
  useEffect(() => {
    // Load Typeform embed script
    const script = document.createElement('script');
    script.src = "//embed.typeform.com/next/embed.js";
    script.async = true;
    document.body.appendChild(script);

    return () => {
      // Cleanup script when component unmounts
      document.body.removeChild(script);
    };
  }, []);

  return (
    <div className="lg:col-span-2">
      <h2 className="text-2xl font-semibold mb-6">Request a Consultation</h2>
      <div 
        data-tf-live="01JSPX1AF8DRWKAW5WN77MMX1S"
        className="min-h-[500px]"
      />
    </div>
  );
};
