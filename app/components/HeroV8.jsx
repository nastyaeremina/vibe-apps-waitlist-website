import { EmailCTA } from "./EmailCTA";
import { HeroPromptToAppV8 } from "./HeroPromptToAppV8";

// V8 — light-mode hero. Same shape as V7 (full-viewport section, sticky
// alpha logo strip at the bottom) but the surface is light, so the
// generated-app preview reads as a real product UI rather than a dark
// marketing visual. data-nav-theme="light" tells the Header to switch
// to its light treatment over this section.
export function HeroV8({ heading, subheading, alphaLabel, alphaLogos }) {
  return (
    <section
      data-nav-theme="light"
      data-tinted-section="light"
      className="relative flex flex-col bg-[#F5F5F0]"
      style={{ height: "100vh", minHeight: "100vh" }}
    >
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 z-0"
        style={{
          background:
            "radial-gradient(40% 35% at 30% 35%, rgba(16,16,16,0.04) 0%, transparent 70%), radial-gradient(35% 30% at 75% 55%, rgba(217,237,146,0.18) 0%, transparent 75%)",
        }}
      />

      <div className="relative z-10 mx-auto flex w-full max-w-4xl shrink-0 flex-col items-center px-6 pt-28 text-center md:pt-32 lg:pt-36">
        <h1 className="mb-6 max-w-[820px] text-[2.125rem] font-normal leading-[1.05] tracking-[-0.03em] text-[#101010] [text-wrap:balance] md:text-[3.25rem] md:tracking-[-0.035em]">
          {heading}
        </h1>
        <p className="mb-8 max-w-[620px] text-[1.0625rem] leading-[1.55] text-[#101010]/60 [text-wrap:pretty]">
          {subheading}
        </p>
        <EmailCTA />
      </div>

      <div className="relative z-10 mt-10 flex min-h-0 flex-1 items-start justify-center overflow-hidden px-6 md:mt-12">
        <div className="w-full max-w-[1180px]">
          <HeroPromptToAppV8 />
        </div>
      </div>

      {alphaLogos && alphaLogos.length > 0 && (
        <div className="sticky bottom-0 z-20 mt-auto shrink-0 bg-[#F5F5F0]">
          <div className="pb-2 pt-4 md:pb-3">
            <div className="mx-auto w-full max-w-[620px] px-6">
              {alphaLabel && (
                <p
                  className="mb-3 text-center text-[10px] uppercase tracking-[0.18em] text-[#101010]/45"
                  style={{
                    fontFamily:
                      '"ABC Diatype Mono", ui-monospace, monospace',
                  }}
                >
                  {alphaLabel}
                </p>
              )}
              <div className="flex items-center justify-center gap-x-10 gap-y-3 flex-wrap">
                {alphaLogos.map((logo) => (
                  <span
                    key={logo.name}
                    className="text-[14px] font-semibold tracking-[-0.01em] text-[#1A1A1A]/45 hover:text-[#1A1A1A]/85 transition-colors"
                  >
                    {logo.name}
                  </span>
                ))}
              </div>
            </div>
          </div>
        </div>
      )}
    </section>
  );
}
