import { EmailCTA } from "./EmailCTA";
import { LogoStrip } from "./LogoStrip";
import { HeroPromptToApp } from "./HeroPromptToApp";

export function Hero({
  eyebrow,
  heading,
  subheading,
  alphaLabel,
  alphaLogos,
}) {
  return (
    // Notion-style stacked hero: headline + CTA at the top, the
    // studio/client-portal visual anchored below it, and the logo
    // strip on its own band at the bottom of the viewport. The
    // visual is taller than the available middle slot so it bleeds
    // below the logo band — the section's overflow-hidden clips
    // anything past the viewport edge, giving the "screen continues
    // off-canvas" feel.
    <section
      className="relative flex flex-col overflow-hidden"
      style={{
        height: "min(100vh, 1080px)",
      }}
    >
      {/* Soft halo behind the headline area so the text has somewhere
          to sit visually against the dark field. */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 z-0"
        style={{
          background:
            "radial-gradient(40% 35% at 30% 35%, rgba(255,255,255,0.04) 0%, transparent 70%), radial-gradient(35% 30% at 75% 55%, rgba(217,237,146,0.04) 0%, transparent 75%)",
        }}
      />

      {/* Headline + CTA — pinned to the top of the section. */}
      <div className="relative z-10 mx-auto flex w-full max-w-4xl shrink-0 flex-col items-center px-6 pt-28 text-center md:pt-32 lg:pt-36">
        <h1 className="mb-6 max-w-[820px] text-[2.125rem] font-normal leading-[1.05] tracking-[-0.03em] text-white [text-wrap:balance] md:text-[3.25rem] md:tracking-[-0.035em]">
          {heading}
        </h1>
        <p className="mb-8 max-w-[620px] text-[1.0625rem] leading-[1.55] text-white/55 [text-wrap:pretty]">
          {subheading}
        </p>
        <EmailCTA />
      </div>

      {/* Visual slot — takes the remaining vertical space between the
          CTA and the logo band. The HeroPromptToApp card has a fixed
          640px height; when the slot is shorter than that (typical
          laptop viewports) the card overflows downward and the
          section's overflow-hidden clips it at the logo band, which
          is exactly the Notion-style bleed we want. min-h-0 is needed
          so flex-1 can actually shrink under its content height. */}
      <div className="relative z-10 mt-10 flex min-h-0 flex-1 items-start justify-center px-6 md:mt-12">
        <div className="w-full max-w-[1100px]">
          <HeroPromptToApp />
        </div>
      </div>

      {/* Alpha-user credential band — sits on top of the bleeding
          visual, on its own dark strip so the logos read against a
          flat backdrop instead of against the partially-visible
          mock chrome behind them. */}
      {alphaLogos && alphaLogos.length > 0 && (
        <div className="relative z-20 shrink-0 bg-[var(--color-bg)]">
          <div className="pb-2 pt-4 md:pb-3">
            <div className="mx-auto w-full max-w-[620px] px-6">
              {alphaLabel && (
                <p
                  className="mb-3 text-center text-[10px] uppercase tracking-[0.18em] text-white/45"
                  style={{
                    fontFamily:
                      '"ABC Diatype Mono", ui-monospace, monospace',
                  }}
                >
                  {alphaLabel}
                </p>
              )}
              <LogoStrip logos={alphaLogos} variant="dark" />
            </div>
          </div>
        </div>
      )}
    </section>
  );
}
