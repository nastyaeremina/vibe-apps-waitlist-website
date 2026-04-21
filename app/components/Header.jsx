import { CTAButton } from "./CTAButton";
import { SITE } from "../config/site";

// Unified pill-shaped floating header — same visual at every viewport size.
// The mobile-logo.svg (icon + wordmark) works across widths; the pill just
// grows wider and keeps the same padding.
export function Header() {
  return (
    <header className="sticky top-3 z-50 px-3 md:top-4 md:px-4">
      <div className="mx-auto flex max-w-6xl items-center justify-between gap-3 rounded-full border border-white/10 bg-[#1a1a1a]/85 px-4 py-2.5 backdrop-blur-md md:py-2 md:pl-5 md:pr-2">
        <a
          href="/"
          aria-label={SITE.brand}
          className="inline-flex items-center transition-opacity duration-200 hover:opacity-80"
        >
          {/* Wordmark changes by breakpoint: "Studio" only on mobile,
              full "Assembly Studio" lockup from md: up. */}
          <img
            src="/logos/web-logo.svg"
            alt={SITE.brand}
            className="h-6 w-auto"
          />
        </a>
        <CTAButton variant="primary" size="sm" className="hidden md:inline-flex" />
      </div>
    </header>
  );
}
