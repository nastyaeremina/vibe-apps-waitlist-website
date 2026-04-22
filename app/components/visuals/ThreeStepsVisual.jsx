"use client";

import { useEffect, useRef, useState } from "react";
import { DURATIONS, StudioPreview } from "../Steps";

// Three-phase cycling visual for the "App generation" story panel:
// describe → generate → ship. Wraps StudioPreview with an auto-cycle
// that advances once the visual enters the viewport. The cycle uses
// the same DURATIONS as the old standalone Steps section so the
// narrative beats match.
export function ThreeStepsVisual() {
  const [activeStep, setActiveStep] = useState(null);
  const [inView, setInView] = useState(false);
  const ref = useRef(null);

  // Kick the cycle on once the visual is visible. We check on mount
  // and on scroll so this still works inside story-mode's nested
  // sticky layout (IntersectionObserver fires unreliably in some
  // combinations of sticky parents).
  useEffect(() => {
    if (!ref.current) return;
    const check = () => {
      if (!ref.current) return;
      const rect = ref.current.getBoundingClientRect();
      const threshold = window.innerHeight * 0.85;
      if (rect.top < threshold && rect.bottom > 0) {
        setInView(true);
        window.removeEventListener("scroll", check);
      }
    };
    check();
    window.addEventListener("scroll", check, { passive: true });
    return () => window.removeEventListener("scroll", check);
  }, []);

  // Advance through describe (0) → generate (1) → ship (2), looping.
  useEffect(() => {
    if (!inView) return;
    if (activeStep === null) {
      setActiveStep(0);
      return;
    }
    const t = setTimeout(() => {
      setActiveStep((s) => ((s ?? 0) + 1) % 3);
    }, DURATIONS[activeStep]);
    return () => clearTimeout(t);
  }, [activeStep, inView]);

  return (
    <div ref={ref}>
      <StudioPreview activeStep={activeStep} />
    </div>
  );
}
