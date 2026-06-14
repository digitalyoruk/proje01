import { Quotes } from "@phosphor-icons/react/dist/ssr";
import { Reveal, RevealGroup, RevealItem } from "@/components/motion/reveal";
import { SectionHeading } from "@/components/site/section-heading";
import { cn } from "@/lib/utils";
import type { LandingData } from "@cms/lib/types";

type Testimonial = LandingData["testimonials"]["items"][number];

function TestimonialCard({ item }: { item: Testimonial }) {
  return (
    <figure className="flex h-full flex-col justify-between rounded-xl border border-[var(--color-border-warm)] bg-[var(--color-bg)] p-8 md:p-9">
      <Quotes className="size-7 text-[var(--color-clay)]" weight="fill" />
      <blockquote className="mt-5 line-clamp-4 font-display text-lg font-medium leading-snug text-[var(--color-ink)] md:text-xl">
        {item.quote}
      </blockquote>
      <figcaption className="mt-7 border-t border-[var(--color-border-warm)] pt-4">
        <span className="block text-sm font-medium text-[var(--color-ink)]">
          {item.name}
        </span>
        {item.role && (
          <span className="text-sm text-[var(--color-muted-foreground)]">
            {item.role}
          </span>
        )}
      </figcaption>
    </figure>
  );
}

function testimonialGridClass(count: number) {
  if (count === 1) {
    return "mx-auto max-w-2xl grid-cols-1";
  }
  if (count === 3) {
    return "md:grid-cols-2 lg:grid-cols-3";
  }
  return "md:grid-cols-2";
}

function testimonialItemClass(count: number, index: number) {
  if (count !== 3 || index !== 2) return "";

  return cn(
    "md:col-span-2 md:max-w-2xl md:justify-self-center",
    "lg:col-span-1 lg:max-w-none lg:justify-self-stretch"
  );
}

export function Testimonials({ data }: { data: LandingData["testimonials"] }) {
  const { items } = data;
  if (!items.length) return null;

  const count = items.length;

  return (
    <section className="bg-[var(--color-bg-warm)] py-20 md:py-28">
      <div className="container-edge">
        <Reveal>
          <SectionHeading eyebrow={data.eyebrow} title={data.title} />
        </Reveal>

        <RevealGroup
          className={cn(
            "mt-12 grid grid-cols-1 items-stretch gap-6 md:mt-16 md:gap-8",
            testimonialGridClass(count)
          )}
        >
          {items.map((t, i) => (
            <RevealItem
              key={`${t.name}-${i}`}
              className={cn("h-full", testimonialItemClass(count, i))}
            >
              <TestimonialCard item={t} />
            </RevealItem>
          ))}
        </RevealGroup>
      </div>
    </section>
  );
}
