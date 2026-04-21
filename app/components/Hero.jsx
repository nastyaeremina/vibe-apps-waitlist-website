import { CTAButton } from "./CTAButton";

export function Hero({ eyebrow, heading, subheading }) {
  return (
    <section className="mx-auto flex min-h-screen max-w-6xl flex-col px-6 pb-20 pt-32 md:pb-28 md:pt-40">
      <div>
        {eyebrow && (
          <span className="mono mb-5 block text-xs uppercase tracking-[0.08em] text-white/40">
            {eyebrow}
          </span>
        )}
        <h1 className="mb-6 max-w-[900px] text-[2.25rem] font-semibold leading-[1.1] tracking-[-0.03em] text-white [text-wrap:balance] md:text-[3rem]">
          {heading}
        </h1>
        <p className="mb-8 max-w-[620px] text-[1.05rem] leading-[1.6] text-white/65">
          {subheading}
        </p>
        <CTAButton variant="primary" />
      </div>
    </section>
  );
}
