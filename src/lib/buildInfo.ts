/**
 * Build information for deployment verification.
 * This helps identify which version is deployed in preview vs production.
 */

// Build timestamp is set at build time by Vite's define
export const BUILD_TIMESTAMP = __BUILD_TIMESTAMP__;

// Format: "YYMMDD-HHMM" for compact display
export const BUILD_ID = new Date(BUILD_TIMESTAMP)
  .toISOString()
  .replace(/^20(\d{2})-(\d{2})-(\d{2})T(\d{2}):(\d{2}).*$/, "$1$2$3-$4$5");

// Full readable date for tooltips
export const BUILD_DATE = new Date(BUILD_TIMESTAMP).toLocaleString("en-US", {
  month: "short",
  day: "numeric",
  year: "numeric",
  hour: "numeric",
  minute: "2-digit",
  hour12: true,
});

// Declare the global constant injected by Vite
declare const __BUILD_TIMESTAMP__: number;
