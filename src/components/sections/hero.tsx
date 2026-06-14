import { CmsImage } from "@/components/site/cms-image";
import type { LandingData, Social } from "@cms/lib/types";

export function Hero({
  data,
  socials,
}: {
  data: LandingData["hero"];
  socials: Social[];
}) {
  return (
    <section className="relative min-h-[100dvh] w-full overflow-hidden">
      <div className="hero-image-zoom absolute inset-0">
        <CmsImage
          image={data.image}
          alt={data.image?.alt || data.title}
          fill
          priority
          sizes="100vw"
          className="object-cover"
        />
      </div>

      {/* Scrims for legibility */}
      <div className="absolute inset-0 bg-gradient-to-t from-black/55 via-black/10 to-black/20" />
      <div className="absolute inset-0 bg-gradient-to-r from-black/30 via-transparent to-black/25" />

      <div className="container-edge relative flex min-h-[100dvh] flex-col justify-end pb-16 pt-28 md:pb-20">
        <div className="grid gap-10 md:grid-cols-12 md:items-end">
          <h1 className="max-w-3xl font-display text-4xl font-medium leading-[1.05] tracking-tight text-white md:col-span-8 md:text-6xl lg:text-7xl">
            {data.title}
          </h1>

          <div className="flex flex-col gap-6 md:col-span-4 md:items-end">
            <p className="max-w-sm text-sm leading-relaxed text-white/85 md:text-right">
              {data.intro}
            </p>
            {socials.length > 0 && (
              <ul className="flex flex-wrap gap-x-5 gap-y-1 text-xs uppercase tracking-[0.18em] text-white/70 md:justify-end">
                {socials.map((s) => (
                  <li key={s.platform}>
                    <a
                      href={s.href}
                      target="_blank"
                      rel="noreferrer"
                      className="transition-colors hover:text-white"
                    >
                      {s.label}
                    </a>
                  </li>
                ))}
              </ul>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
