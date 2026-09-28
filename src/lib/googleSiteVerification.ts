// Only answer for Search Console HTML-file tokens PTI actually issued. Echoing
// any `google*.html` name back would let anyone verify ownership of the domain.
// When a new owner verifies by HTML file, add their token here.
const ISSUED_FILES = new Set([
  "google12cfc68677988bb4.html",
  "google078b551f409128a8.html",
]);

export function googleSiteVerificationBody(file: string): string | null {
  if (!ISSUED_FILES.has(file)) {
    return null;
  }

  return `google-site-verification: ${file}\n`;
}
