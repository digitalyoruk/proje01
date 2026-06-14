import Link from "next/link";
import { ArrowRight } from "@phosphor-icons/react/dist/ssr";
import { Reveal } from "@/components/motion/reveal";
import { SectionHeading } from "@/components/site/section-heading";
import type { LandingData } from "@cms/lib/types";

export function Services({ data }: { data: LandingData["services"] }) {
  if (!data.items.length) return null;

  return (
    <section className="bg-[var(--color-bg-warm)] py-20 md:py-28">
      <div className="container-edge">
        <Reveal>
          <SectionHeading eyebrow={data.eyebrow} title={data.title} />
        </Reveal>

        <div className="mt-12 md:mt-16">
          {data.items.map((item, i) => (
            <Reveal key={item.title} delay={i * 0.05}>
              <div className="group grid grid-cols-1 gap-4 border-t border-[var(--color-border-warm)] py-8 md:grid-cols-12 md:items-start md:gap-8 md:py-10">
                <div className="font-display text-2xl text-[var(--color-meta)] md:col-span-1">
                  {String(i + 1).padStart(2, "0")}
                </div>
                <h3 className="font-display text-xl font-medium leading-snug text-[var(--color-ink)] md:col-span-4 md:text-2xl">
                  {item.title}
                </h3>
                <p className="text-[15px] leading-relaxed text-[var(--color-muted-foreground)] md:col-span-6">
                  {item.excerpt}
                </p>
                <div className="md:col-span-1 md:flex md:justify-end">
                  <Link
                    href={item.href}
                    aria-label={`${item.title} hakkında daha fazla`}
                    className="inline-flex size-12 items-center justify-center rounded-full border border-[var(--color-ink)] text-[var(--color-ink)] transition-all duration-300 group-hover:bg-[var(--color-clay)] group-hover:border-[var(--color-clay)] group-hover:text-white"
                  >
                    <ArrowRight className="size-5" />
                  </Link>
                </div>
              </div>
            </Reveal>
          ))}
          <div className="border-t border-[var(--color-border-warm)]" />
        </div>
      </div>
    </section>
  );
}
