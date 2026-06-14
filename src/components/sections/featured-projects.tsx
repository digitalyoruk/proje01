"use client";

import { useState } from "react";
import Link from "next/link";
import { CmsImage } from "@/components/site/cms-image";
import { Reveal } from "@/components/motion/reveal";
import { cn } from "@/lib/utils";
import type { LandingData } from "@cms/lib/types";

export function FeaturedProjects({ data }: { data: LandingData["featured"] }) {
  const [hovered, setHovered] = useState<number | null>(null);
  const active = hovered ?? 0;

  if (!data.projects.length) return null;

  return (
    <section className="bg-[var(--color-bg)] py-20 md:py-28">
      <div className="container-edge">
        <Reveal>
          <div className="grid grid-cols-1 gap-6 md:grid-cols-2 md:items-start">
            <p className="pt-1 text-xs font-medium uppercase tracking-[0.18em] text-[var(--color-clay)]">
              {data.eyebrow}
            </p>
            <h2 className="font-display text-[clamp(2rem,4.4vw,3.5rem)] font-medium leading-[1.05] tracking-tight text-[var(--color-ink)]">
              {data.title}
            </h2>
          </div>
        </Reveal>

        <div className="mt-12 flex flex-col gap-6 md:mt-16 sm:flex-row sm:gap-3">
          {data.projects.map((p, i) => (
            <Link
              key={p.title}
              href={p.href}
              className={cn(
                "group block min-w-0 transition-[flex] duration-700 ease-[cubic-bezier(0.16,1,0.3,1)]",
                active === i ? "sm:flex-[3]" : "sm:flex-[1]"
              )}
              onMouseEnter={() => setHovered(i)}
              onMouseLeave={() => setHovered(null)}
              onFocus={() => setHovered(i)}
              onBlur={() => setHovered(null)}
            >
              <div className="relative h-[58vw] overflow-hidden bg-[var(--color-bg-warm)] sm:h-[400px] lg:h-[580px]">
                <CmsImage
                  image={p.image}
                  alt={`${p.title}${p.subtitle ? ` — ${p.subtitle}` : ""}`}
                  fill
                  sizes={
                    i === active
                      ? "(max-width: 640px) 100vw, 60vw"
                      : "(max-width: 640px) 100vw, 20vw"
                  }
                  className="object-cover"
                />
              </div>
              <div className="mt-3">
                <h3 className="font-display text-base font-medium text-[var(--color-ink)]">
                  {p.title}
                </h3>
                {p.subtitle && (
                  <p className="text-sm text-[var(--color-muted-foreground)]">
                    {p.subtitle}
                  </p>
                )}
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
