export function ContactMarquee({ text }: { text: string }) {
  if (!text) return null;
  const row = [text, text];

  return (
    <section aria-hidden className="bg-[var(--color-bg)] pb-[140px] pt-[50px]">
      <div className="relative h-[132px] overflow-hidden">
        <div className="contact-marquee-track absolute inset-y-0 left-0 flex w-max items-center">
          {row.map((t, i) => (
            <span
              key={i}
              className="shrink-0 whitespace-nowrap pr-[6%] font-display text-[60px] font-medium uppercase leading-[0.8] tracking-[-0.01em] text-[var(--color-ink)] md:text-[157px]"
            >
              {t}
            </span>
          ))}
        </div>
      </div>
    </section>
  );
}
