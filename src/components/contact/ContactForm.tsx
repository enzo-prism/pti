"use client";

import { useEffect, useRef, useState } from "react";
import {
  trackContactFormStart,
  trackContactFormSubmit,
  trackSelectCta,
} from "@/lib/analytics";

const TYPEFORM_INITIAL_HEIGHT = 1000;
const TYPEFORM_WIDGET_URL = "https://fxuqp40sseh.typeform.com/to/cYOs5Ma2";
const TYPEFORM_EMBED_SCRIPT = "https://embed.typeform.com/next/embed.js";
const TYPEFORM_FORM_ID = "cYOs5Ma2";
const TYPEFORM_PROVIDER = "typeform";

type TypeformSubmitCallback = () => void;
type TypeformWindow = Window & Record<string, unknown>;

export const ContactForm = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [hasError, setHasError] = useState(false);
  const submitCallbackRef = useRef(
    `ptiTypeformSubmit_${Math.random().toString(36).slice(2)}`
  );
  const isPrerender =
    typeof navigator !== "undefined" && navigator.userAgent === "ReactSnap";

  useEffect(() => {
    if (isPrerender) {
      setIsLoading(false);
      return;
    }

    const callbackName = submitCallbackRef.current;
    const win = window as unknown as TypeformWindow;
    win[callbackName] = (() => {
      trackContactFormSubmit("contact", TYPEFORM_FORM_ID, TYPEFORM_PROVIDER);
    }) as TypeformSubmitCallback;

    // Load Typeform embed script.
    const script = document.createElement("script");
    script.src = TYPEFORM_EMBED_SCRIPT;
    script.async = true;

    script.onload = () => {
      setIsLoading(false);
      trackContactFormStart(TYPEFORM_FORM_ID, TYPEFORM_PROVIDER);
    };

    script.onerror = () => {
      setHasError(true);
      setIsLoading(false);
    };

    document.body.appendChild(script);

    return () => {
      if (script.parentNode) {
        script.parentNode.removeChild(script);
      }

      delete win[callbackName];
    };
  }, [isPrerender]);

  if (isPrerender) {
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
            <p className="text-muted-foreground mb-4">
              The contact form loads on the live site. Use the link below if it does not appear.
            </p>
            <a
              href={TYPEFORM_WIDGET_URL}
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
              href={TYPEFORM_WIDGET_URL}
              target="_blank" 
              rel="noopener noreferrer"
              className="text-primary hover:underline"
              onClick={() =>
                trackSelectCta(
                  "external_form_link",
                  "contact_page_error_fallback"
                )
              }
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
        data-tf-widget={TYPEFORM_WIDGET_URL}
        data-tf-opacity="100"
        data-tf-hide-headers
        data-tf-hide-footer
        data-tf-auto-resize="true"
        data-tf-on-submit={submitCallbackRef.current}
        data-tf-height={TYPEFORM_INITIAL_HEIGHT}
        className="w-full"
        style={{ opacity: isLoading ? 0 : 1, minHeight: `${TYPEFORM_INITIAL_HEIGHT}px` }}
      />
    </div>
  );
};
