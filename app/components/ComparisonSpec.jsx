"use client";

import { useEffect, useRef, useState } from "react";

// V7-inspired spec-sheet comparison, Assembly-styled.
// A single rounded card with a header strip (brand logo + label per
// column) and rows beneath where each axis maps to a short
// description. The "— — —" ticks from V7 are replaced with a
// segmented-pill indicator: the competitor column keeps its pills
// flat/muted (static "unpowered" state) while the Assembly column
// lights the pills up in lime brand-green, staggered per pill and
// per row, so the indicator reads row-by-row as the section scrolls
// into view. Animation keyframes live in globals.css under the
// `spec-pill-fill` rule.
export function ComparisonSpec({
  heading,
  headingCallout,
  leftLabel,
  rightLabel,
  rows = [],
  theme = "dark",
}) {
  const ref = useRef(null);
  const [animate, setAnimate] = useState(false);
  const isLight = theme === "light";

  // Token map — keeps the JSX readable while letting the section
  // flip cleanly between dark and light surfaces. White-on-translucent
  // becomes #1A1A1A-on-translucent; the cards lean slightly heavier on
  // contrast than their dark counterparts so they don't disappear into
  // the cream background.
  const t = isLight
    ? {
        heading: "text-[#1A1A1A]",
        headingMuted: "text-[#1A1A1A]/55",
        cardBorder: "border-[#1A1A1A]/10",
        cardBg: "bg-[#1A1A1A]/[0.03]",
        rowDivide: "divide-[#1A1A1A]/8",
        rowHover: "hover:bg-[#1A1A1A]/[0.04]",
        rowLabel: "text-[#1A1A1A]/55",
        bodyMuted: "text-[#1A1A1A]/55",
        bodyMore: "text-[#1A1A1A]/45",
        mobileBorder: "border-[#1A1A1A]/10",
        mobileBg: "bg-[#1A1A1A]/[0.03]",
        mobileCheckBg: "bg-[#1A1A1A]/10 text-[#1A1A1A]",
        mobileCheckText: "text-[#1A1A1A]",
      }
    : {
        heading: "text-white",
        headingMuted: "text-white/50",
        cardBorder: "border-white/10",
        cardBg: "bg-white/[0.02]",
        rowDivide: "divide-white/5",
        rowHover: "hover:bg-white/[0.03]",
        rowLabel: "text-white/45",
        bodyMuted: "text-white/50",
        bodyMore: "text-white/40",
        mobileBorder: "border-white/10",
        mobileBg: "bg-white/[0.02]",
        mobileCheckBg: "bg-white/10 text-white",
        mobileCheckText: "text-white",
      };

  // Section-local intersection observer so pill animations start only
  // when the spec card is actually in view. Reduced-motion users skip
  // the stagger and see the final lit state immediately.
  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    if (
      typeof window !== "undefined" &&
      window.matchMedia("(prefers-reduced-motion: reduce)").matches
    ) {
      setAnimate(true);
      return;
    }

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setAnimate(true);
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.2, rootMargin: "0px 0px -10% 0px" },
    );

    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  // Stagger tuning — row-level delay dominates so each row reads as
  // its own reveal beat; the per-pill delay inside a row is just
  // enough to read as "filling up" rather than flashing on.
  const PILL_COUNT = 9;
  // Competitor side fills only the leading pills — visual cue that
  // they solve a small slice of what Assembly does. Keeps the meter
  // idea without using brand colour on "them".
  const COMPETITOR_LIT_COUNT = 2;
  const ROW_STAGGER_MS = 140;
  const PILL_STAGGER_MS = 55;
  const HEADER_DELAY_MS = 0;

  const rowDelay = (rowIndex) =>
    HEADER_DELAY_MS + 180 + rowIndex * ROW_STAGGER_MS;

  return (
    <section className="gradient-divider py-12 md:py-16">
      <div className="mx-auto max-w-5xl px-6">
        {/* Heading — primary claim on top, dimmed callout below.
            Mirrors the NarrativeBlock pattern from earlier in the page
            ("bold statement → quiet restatement"). */}
        <div className="mb-7 text-center">
          {heading && (
            <h3 className={`text-[1.75rem] font-normal leading-[1.1] tracking-[-0.025em] [text-wrap:balance] md:text-[2.375rem] md:tracking-[-0.03em] ${t.heading}`}>
              {heading}
              {headingCallout && (
                <>
                  <br />
                  <span className={t.headingMuted}>{headingCallout}</span>
                </>
              )}
            </h3>
          )}
        </div>

        {/* Desktop — spec card with per-row pill indicators. */}
        <div
          ref={ref}
          data-spec-animate={animate ? "true" : "false"}
          data-spec-theme={theme}
          className={`hidden rounded-2xl border ${t.cardBorder} ${t.cardBg} pt-4 md:block md:pt-6`}
        >
          {/* Header strip — logo + brand label per column. The logo
              slot is a fixed 32px square so the column headers line
              up even if the competitor logo is a neutral placeholder
              (we don't display third-party brand marks). */}
          <div className={`grid grid-cols-[minmax(180px,220px)_1fr_1fr] gap-x-6 border-b ${t.cardBorder} pb-3 px-6 md:px-8`}>
            <div />
            <BrandSlot variant="competitor" label={leftLabel} isLight={isLight} />
            <BrandSlot variant="assembly" label={rightLabel} isLight={isLight} />
          </div>

          {/* Body rows. divide-y gives just-enough separation without
              the cell-border look of a spreadsheet. Lines bleed full-
              width; px is re-applied per row so content stays inset. */}
          <div className={`divide-y ${t.rowDivide}`}>
            {rows.map(([label, left, right], i) => {
              // Each row cascades left→right: axis label + competitor appear
              // together, then Assembly follows 60ms later. Rows are
              // staggered 80ms apart — tight enough to feel fluid, clear
              // enough to read as sequential.
              const base = i * 80;
              return (
                <div
                  key={i}
                  className={`grid grid-cols-[minmax(180px,220px)_1fr_1fr] gap-x-6 py-4 px-6 md:px-8 transition-colors duration-150 ${t.rowHover}`}
                  style={{
                    paddingTop: i === 0 ? 12 : undefined,
                    paddingBottom: undefined,
                  }}
                >
                  <div
                    className={`spec-row text-[14px] leading-[1.5] ${t.rowLabel}`}
                    style={{ animationDelay: `${base}ms` }}
                  >
                    {label}
                  </div>
                  <div
                    className="spec-row flex flex-col gap-3"
                    style={{ animationDelay: `${base}ms` }}
                  >
                    <PillStrip
                      variant="competitor"
                      count={PILL_COUNT}
                      litCount={COMPETITOR_LIT_COUNT}
                      baseDelayMs={base}
                      pillStepMs={PILL_STAGGER_MS}
                      isLight={isLight}
                    />
                    <p className={`text-[14px] leading-[1.5] ${t.bodyMore}`}>
                      {left}
                    </p>
                  </div>
                  <div
                    className="spec-row flex flex-col gap-3"
                    style={{ animationDelay: `${base + 60}ms` }}
                  >
                    <PillStrip
                      variant="assembly"
                      count={PILL_COUNT}
                      litCount={PILL_COUNT}
                      baseDelayMs={base + 60}
                      pillStepMs={PILL_STAGGER_MS}
                      isLight={isLight}
                    />
                    <p className={`text-[14px] leading-[1.5] ${t.bodyMuted}`}>
                      {right}
                    </p>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Mobile — same stacked-card checklist as the original table. */}
        <div className="flex flex-col gap-2 md:hidden">
          {rows.map(([, , right, mobileFeature], i) => (
            <div
              key={i}
              className={`flex items-start gap-3 rounded-2xl border ${t.mobileBorder} ${t.mobileBg} px-4 py-4`}
            >
              <span
                aria-hidden="true"
                className={`mt-0.5 inline-flex h-5 w-5 flex-none items-center justify-center rounded-full ${t.mobileCheckBg}`}
              >
                <svg
                  width="11"
                  height="11"
                  viewBox="0 0 12 12"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <path d="M2.5 6.5l2.5 2.5 4.5-5.5" />
                </svg>
              </span>
              <span className={`text-[14px] leading-[1.5] ${t.mobileCheckText}`}>
                {mobileFeature || right}
              </span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

// Brand slot — a 32px logo square next to the brand label. For the
// Assembly side we render the actual app mark (the same mark as the
// favicon). For the competitor we render a neutral, unbranded
// placeholder — we deliberately don't display third-party logos in a
// comparative context.
function BrandSlot({ variant, label, isLight }) {
  const isAssembly = variant === "assembly";
  // The Assembly mark is always its dark brand surface (#101010 with
  // white logo) — that mark IS the brand and reads great on both
  // backgrounds. Only the competitor placeholder + label color flip.
  const competitorBg = isLight
    ? "bg-[#1A1A1A]/[0.04] ring-[#1A1A1A]/10"
    : "bg-white/[0.04] ring-white/10";
  const assemblyRing = isLight ? "ring-[#1A1A1A]/10" : "ring-white/10";
  const assemblyLabel = isLight ? "text-[#1A1A1A]/90" : "text-white/85";
  const competitorLabel = isLight ? "text-[#1A1A1A]/55" : "text-white/55";
  return (
    <div className="flex items-center gap-3">
      <span
        aria-hidden="true"
        className={
          isAssembly
            ? `flex h-8 w-8 flex-none items-center justify-center rounded-md bg-[#101010] ring-1 ${assemblyRing}`
            : `flex h-8 w-8 flex-none rounded-md ring-1 ${competitorBg}`
        }
      >
        {isAssembly && <AssemblyMark />}
      </span>
      <span
        className={`text-[14px] leading-[1.5] ${
          isAssembly ? assemblyLabel : competitorLabel
        }`}
      >
        {label}
      </span>
    </div>
  );
}

// Inline four-dot Assembly mark. Recreated inline (vs. <img
// src="/logos/favicon.svg">) so it inherits currentColor and stays
// visually in sync with any future colour changes to the brand-slot
// background.
function AssemblyMark() {
  return (
    <svg
      width="14"
      height="14"
      viewBox="0 0 73 73"
      fill="currentColor"
      className="text-white"
      aria-hidden="true"
    >
      <path d="M47.3157 72.1924H66.7338C70.0489 72.1924 72.7363 69.505 72.7363 66.1899V46.7717C72.7363 43.4567 70.0489 40.7692 66.7338 40.7692H47.3157C44.0006 40.7692 41.3132 43.4567 41.3132 46.7717V66.1899C41.3132 69.505 44.0006 72.1924 47.3157 72.1924Z" />
      <path d="M57.03 0L57.024 0C48.3484 0 41.3154 7.03297 41.3154 15.7086V15.7146C41.3154 24.3902 48.3484 31.4231 57.024 31.4231H57.03C65.7056 31.4231 72.7386 24.3902 72.7386 15.7146V15.7086C72.7386 7.03297 65.7056 0 57.03 0Z" />
      <path d="M15.7146 0L15.7086 0C7.03296 0 0 7.03297 0 15.7086L0 15.7146C0 24.3902 7.03296 31.4231 15.7086 31.4231H15.7146C24.3902 31.4231 31.4231 24.3902 31.4231 15.7146V15.7086C31.4231 7.03297 24.3902 0 15.7146 0Z" />
      <path d="M15.7146 40.7666H15.7086C7.03297 40.7666 0 47.7996 0 56.4752L0 56.4812C0 65.1568 7.03297 72.1897 15.7086 72.1897H15.7146C24.3902 72.1897 31.4231 65.1568 31.4231 56.4812V56.4752C31.4231 47.7996 24.3902 40.7666 15.7146 40.7666Z" />
    </svg>
  );
}

// Segmented-pill indicator. Renders `count` tall stadium pills. Both
// variants animate on reveal, but the competitor side only lights
// the first `litCount` pills — and lights them in a quiet off-white
// rather than the brand lime — so it reads as a partial/incomplete
// meter next to Assembly's full lime bar. Pills beyond `litCount`
// stay in their dim resting state.
function PillStrip({
  variant,
  count,
  litCount,
  baseDelayMs = 0,
  pillStepMs = 0,
  isLight = false,
}) {
  const isAssembly = variant === "assembly";
  const litClass = isAssembly
    ? "spec-pill--assembly-lit"
    : "spec-pill--competitor-lit";
  // Resting (unlit) base — translucent dark on the cream chapter,
  // translucent white on the dark sections.
  const restingBg = isLight ? "bg-[#1A1A1A]/10" : "bg-white/10";
  return (
    <div aria-hidden="true" className="flex items-center gap-[4px]">
      {Array.from({ length: count }).map((_, i) => {
        const isLit = i < litCount;
        return (
          <span
            key={i}
            className={`block h-4 w-[6px] ${restingBg} ${
              isLit ? litClass : ""
            }`}
            style={
              isLit
                ? { animationDelay: `${baseDelayMs + i * pillStepMs}ms` }
                : undefined
            }
          />
        );
      })}
    </div>
  );
}
