import Image from "next/image";
import { Reveal, RevealGroup, RevealItem } from "@/components/motion/reveal";
import type { LandingData } from "@cms/lib/types";

export function Process({ data }: { data: LandingData["process"] }) {
  return (
    <section className="bg-[var(--color-bg)] py-20 md:py-28">
      <div className="container-edge">
        <Reveal>
          <div className="grid grid-cols-1 gap-8 lg:grid-cols-2 lg:gap-16">
            <div>
              <p className="mb-4 text-xs font-medium uppercase tracking-[0.18em] text-[var(--color-clay)]">
                {data.eyebrow}
              </p>
              <h2 className="font-display text-[clamp(2rem,4.2vw,3.25rem)] font-medium leading-[1.08] tracking-tight text-[var(--color-ink)]">
                {data.title}
              </h2>
            </div>
            <div className="space-y-4 text-[15px] leading-relaxed text-[var(--color-muted-foreground)] lg:pt-2">
              <p>{data.body}</p>
              {data.body2 && <p>{data.body2}</p>}
            </div>
          </div>
        </Reveal>

        <RevealGroup className="mt-12 grid grid-cols-2 gap-3 md:mt-16 lg:grid-cols-4">
          {data.tabs.map((tab) => (
            <RevealItem key={tab.title}>
              <div className="group relative aspect-[300/435] overflow-hidden bg-[var(--color-bg-warm)]">
                {tab.image && (
                  <Image
                    src={tab.image}
                    alt={tab.title}
                    fill
                    sizes="(max-width: 640px) 50vw, (max-width: 1024px) 33vw, 25vw"
                    className="object-cover transition-transform duration-700 ease-out group-hover:scale-105"
                  />
                )}
                <div className="absolute inset-0 bg-gradient-to-t from-black/65 via-black/10 to-transparent" />
                <h3 className="absolute inset-x-0 bottom-0 p-5 font-display text-lg font-medium text-white">
                  {tab.title}
                </h3>
              </div>
            </RevealItem>
          ))}
        </RevealGroup>
      </div>
    </section>
  );
}
