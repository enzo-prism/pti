/**
 * Build information for deployment verification.
 * This helps identify which version is deployed in preview vs production.
 */

// Build timestamp is injected at build time by next.config.mjs
const rawTimestamp = process.env.NEXT_PUBLIC_BUILD_TIMESTAMP ?? "";
const numericTimestamp = Number(rawTimestamp);
const parsedTimestamp = Number.isFinite(numericTimestamp)
  ? numericTimestamp
  : Date.parse(rawTimestamp);

export const BUILD_TIMESTAMP = Number.isFinite(parsedTimestamp)
  ? parsedTimestamp
  : Date.now();

// Format: "YYMMDD-HHMM" for compact display
export const BUILD_ID = new Date(BUILD_TIMESTAMP || Date.now())
  .toISOString()
  .replace(/^20(\d{2})-(\d{2})-(\d{2})T(\d{2}):(\d{2}).*$/, "$1$2$3-$4$5");

// Full readable date for tooltips
export const BUILD_DATE = new Date(
  BUILD_TIMESTAMP || Date.now()
).toLocaleString("en-US", {
  month: "short",
  day: "numeric",
  year: "numeric",
  hour: "numeric",
  minute: "2-digit",
  hour12: true,
});
