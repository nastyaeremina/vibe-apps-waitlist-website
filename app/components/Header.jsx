"use client";

import { useEffect, useRef } from "react";
import { CTAButton } from "./CTAButton";
import { SITE } from "../config/site";

// Scroll-driven navbar transformation (analogueagency.com-style).
//
// At the top of the page, the pill is minimal — fully transparent bg, no
// border, no blur — so it blends into the hero and feels part of the
// content. As the user scrolls, it smoothly interpolates into a defined
// "docked" state: dark translucent pill, thin border, backdrop-blur, a
// subtle drop shadow, and a touch more compact (slight scale-in + tighter
// top offset). Motion is continuous (scroll progress → eased interpolation
// over every animated property), not a threshold switch.

// Scroll distance (px) over which the navbar transitions from the
// integrated "top" state to the docked state.
const SCROLL_RANGE = 140;

export function Header() {
  const headerRef = useRef(null);
  const pillRef = useRef(null);
  const ctaRef = useRef(null);

  useEffect(() => {
    const header = headerRef.current;
    const pill = pillRef.current;
    const cta = ctaRef.current;
    if (!header || !pill) return;

    let raf = null;
    const apply = () => {
      raf = null;
      const p = Math.max(0, Math.min(1, window.scrollY / SCROLL_RANGE));
      // easeOutCubic — quick presence, gentle settle.
      const e = 1 - Math.pow(1 - p, 3);

      // Pill background, border, blur — all fade in together. Kept
      // intentionally light: the docked pill should feel like a thin
      // frosted wash over the content, not a solid chrome bar.
      pill.style.backgroundColor = `rgba(26, 26, 26, ${e * 0.5})`;
      pill.style.borderColor = `rgba(255, 255, 255, ${e * 0.06})`;
      const blur = e * 10;
      const blurValue = blur > 0.1 ? `blur(${blur}px)` : "none";
      pill.style.backdropFilter = blurValue;
      pill.style.webkitBackdropFilter = blurValue;

      // Very soft shadow — just enough to hint at elevation without
      // reading as a floating chrome bar.
      pill.style.boxShadow = `0 ${4 * e}px ${16 * e}px -${10 * e}px rgba(0, 0, 0, ${0.2 * e})`;

      // Slight compacting: pill shrinks very subtly (1 → 0.98) so the
      // transformation reads as the nav "settling in" rather than
      // expanding outward.
      const scale = 1 - e * 0.02;
      pill.style.transform = `scale(${scale})`;

      // Top offset tightens a touch as the pill docks.
      header.style.top = `${12 - e * 2}px`;

      // CTA fades in alongside the pill — the top state is just the
      // logo (minimal, no call-to-action yet). Pointer-events gated
      // on visibility so the invisible button isn't clickable.
      if (cta) {
        cta.style.opacity = String(e);
        cta.style.pointerEvents = e > 0.5 ? "auto" : "none";
        cta.style.transform = `translate3d(${(1 - e) * 8}px, 0, 0)`;
      }
    };

    const onScroll = () => {
      if (raf != null) return;
      raf = requestAnimationFrame(apply);
    };

    apply();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);
    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
      if (raf != null) cancelAnimationFrame(raf);
    };
  }, []);

  return (
    <header
      ref={headerRef}
      className="sticky z-50 px-3 md:px-4"
      style={{ top: "12px" }}
    >
      <div
        ref={pillRef}
        className="mx-auto flex max-w-6xl items-center justify-between gap-3 rounded-full border px-4 py-2.5 md:py-2 md:pl-5 md:pr-2"
        style={{
          // Initial state matches what the scroll listener will produce
          // at scrollY=0 so there's no paint flash on mount.
          backgroundColor: "rgba(26, 26, 26, 0)",
          borderColor: "rgba(255, 255, 255, 0)",
          backdropFilter: "none",
          WebkitBackdropFilter: "none",
          transformOrigin: "center center",
          willChange:
            "transform, background-color, border-color, backdrop-filter, box-shadow",
        }}
      >
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
        <span
          ref={ctaRef}
          className="hidden md:inline-flex"
          style={{
            opacity: 0,
            pointerEvents: "none",
            transform: "translate3d(8px, 0, 0)",
            willChange: "opacity, transform",
          }}
        >
          <CTAButton variant="primary" size="sm" />
        </span>
      </div>
    </header>
  );
}
