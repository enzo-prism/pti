export function SkipToContent() {
  return (
    <a
      href="#main-content"
      className="fixed left-4 top-[max(0.75rem,env(safe-area-inset-top))] z-[90] -translate-y-[calc(100%+2rem)] rounded-md bg-white px-4 py-3 font-semibold text-primary shadow-xl transition-transform focus:translate-y-0 focus:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 print:hidden"
    >
      Skip to main content
    </a>
  );
}
