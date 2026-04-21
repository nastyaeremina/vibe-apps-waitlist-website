import { Reveal } from "./Reveal";

// Single logo cell — extracted so the mobile marquee and desktop grid
// render identical-looking items without duplicating markup inline.
// Text colors are set for the light off-white surface this strip now
// lives on (continuation of the NarrativeBlock color band).
function LogoItem({ name }) {
  return (
    <div className="flex h-8 items-center justify-center">
      <span className="whitespace-nowrap text-sm font-semibold tracking-tight text-[#101010]/40 transition-colors duration-200 hover:text-[#101010]/80">
        {name}
      </span>
    </div>
  );
}

export function LogoStrip({ label, logos = [] }) {
  return (
    // `bg-[#F5F5F0]` + `pt-0` stitches this section onto the bottom of
    // NarrativeBlock so the two read as a single off-white "chapter".
    // `rounded-b-[28px]` closes the chapter with the same corner radius
    // the Hero uses at full zoom — the boundary reads as a deliberate
    // card edge rather than a hard color cut. The dark page bg shows in
    // the corners beneath the curve.
    <section className="gradient-divider bg-[#F5F5F0] pt-0 pb-16 rounded-b-[28px] md:pb-20 md:rounded-b-[36px]">
      <div className="mx-auto max-w-6xl px-6">
        {label && (
          <p className="mono mb-6 text-center text-xs uppercase tracking-[0.08em] text-[#101010]/45 md:mb-8">
            {label}
          </p>
        )}

        {/* Mobile — continuous auto-scrolling marquee. Logos render twice
            inside a flex track that translates -50%, so the second copy
            lands exactly where the first started and the loop is seamless.
            Edge fades via mask-image so logos ease in and out instead of
            hard-clipping at the container edge. */}
        <div
          className="relative overflow-hidden md:hidden"
          style={{
            WebkitMaskImage:
              "linear-gradient(to right, transparent 0, black 8%, black 92%, transparent 100%)",
            maskImage:
              "linear-gradient(to right, transparent 0, black 8%, black 92%, transparent 100%)",
          }}
          aria-label="Alpha users"
        >
          <div className="logo-marquee-track flex w-max items-center gap-x-12">
            {logos.map((logo) => (
              <div key={`a-${logo.name}`} className="flex-none">
                <LogoItem name={logo.name} />
              </div>
            ))}
            {/* Duplicate set — aria-hidden so SR users don't hear logos
                announced twice. */}
            {logos.map((logo) => (
              <div
                key={`b-${logo.name}`}
                className="flex-none"
                aria-hidden="true"
              >
                <LogoItem name={logo.name} />
              </div>
            ))}
          </div>
        </div>

        {/* Desktop — static, centered wrap. Each logo fades in with a
            stagger via Reveal. */}
        <div className="hidden items-center justify-center gap-x-10 gap-y-6 md:flex md:flex-wrap">
          {logos.map((logo, i) => (
            <Reveal key={logo.name} delay={i * 60}>
              <LogoItem name={logo.name} />
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
