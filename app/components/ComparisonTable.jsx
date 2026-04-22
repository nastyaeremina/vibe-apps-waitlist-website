export function ComparisonTable({
  eyebrow,
  heading,
  firstColumnLabel,
  leftLabel,
  rightLabel,
  rows = [],
}) {
  return (
    <section className="gradient-divider py-20 md:py-24">
      <div className="mx-auto max-w-4xl px-6">
        <div className="mb-12 text-center">
          {eyebrow && (
            <span className="mono mb-4 block text-xs uppercase tracking-[0.08em] text-white/40">
              {eyebrow}
            </span>
          )}
          {heading && (
            <h3 className="text-2xl font-semibold leading-tight tracking-[-0.02em] text-white [text-wrap:balance] md:text-[2rem]">
              {heading}
            </h3>
          )}
        </div>

        {/* Desktop — 3-col grid: row label | left (competitor) | right
            (us). The label column is narrower and quieter; the accent
            shading stays on the right half to keep the "us" column
            visually dominant. Cramped on narrow viewports, so mobile
            gets its own stacked-card layout below. */}
        <div className="relative hidden overflow-hidden rounded-2xl border border-white/10 md:block">
          <div
            aria-hidden="true"
            className="pointer-events-none absolute inset-y-0 right-0 w-1/2 bg-gradient-to-l from-white/[0.03] to-transparent"
          />
          <div className="relative grid grid-cols-[minmax(120px,180px)_1fr_1fr] border-b border-white/10 bg-white/[0.02]">
            <div className="px-5 py-4 text-sm text-white/45">
              {firstColumnLabel}
            </div>
            <div className="border-l border-white/10 px-5 py-4 text-sm text-white/50">
              {leftLabel}
            </div>
            <div className="border-l border-white/10 px-5 py-4 text-sm text-white">
              {rightLabel}
            </div>
          </div>
          {rows.map(([label, left, right], i) => (
            <div
              key={i}
              className="relative grid grid-cols-[minmax(120px,180px)_1fr_1fr] border-b border-white/5 transition-colors duration-200 last:border-b-0 hover:bg-white/[0.02]"
            >
              <div className="px-5 py-4 text-sm text-white/45">{label}</div>
              <div className="border-l border-white/10 px-5 py-4 text-sm text-white/55">
                {left}
              </div>
              <div className="border-l border-white/10 px-5 py-4 text-sm text-white">
                {right}
              </div>
            </div>
          ))}
        </div>

        {/* Mobile — Studio-only checklist. The side-by-side vs.
            comparison doesn't fit cleanly on narrow viewports, so we
            drop the competitor column entirely and render each row as
            a single statement about Studio, prefixed with a lime
            check. Copy comes from the optional 4th element of each
            row (mobile feature phrasing) and falls back to the third
            (Assembly answer) if not provided. */}
        <div className="flex flex-col gap-2 md:hidden">
          {rows.map(([, , right, mobileFeature], i) => (
            <div
              key={i}
              className="flex items-start gap-3 rounded-2xl border border-white/10 bg-white/[0.02] px-4 py-4"
            >
              <span
                aria-hidden="true"
                className="mt-0.5 inline-flex h-5 w-5 flex-none items-center justify-center rounded-full bg-white/10 text-white"
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
              <span className="text-[0.95rem] leading-snug text-white">
                {mobileFeature || right}
              </span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
