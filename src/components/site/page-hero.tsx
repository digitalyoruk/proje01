import { CmsImage } from "@/components/site/cms-image";
import type { Img } from "@cms/lib/types";

export function PageHero({
  eyebrow,
  title,
  intro,
  image,
}: {
  eyebrow?: string;
  title?: string;
  intro?: string;
  image?: Img | null;
}) {
  return (
    <section className="relative overflow-hidden bg-[var(--color-ink-deep)] text-white">
      {image?.src && (
        <>
          <CmsImage
            image={image}
            alt={image.alt || title || "Proje 01"}
            fill
            priority
            sizes="100vw"
            className="object-cover opacity-40"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-[var(--color-ink-deep)] via-[var(--color-ink-deep)]/70 to-[var(--color-ink-deep)]/40" />
        </>
      )}
      <div className="container-edge relative pb-16 pt-36 md:pb-24 md:pt-44">
        {eyebrow && (
          <p className="mb-4 text-xs font-medium uppercase tracking-[0.18em] text-[var(--color-clay)]">
            {eyebrow}
          </p>
        )}
        {title && (
          <h1 className="max-w-4xl font-display text-4xl font-medium leading-[1.08] tracking-tight md:text-5xl lg:text-6xl">
            {title}
          </h1>
        )}
        {intro && (
          <p className="mt-6 max-w-2xl text-base leading-relaxed text-white/70 md:text-lg">
            {intro}
          </p>
        )}
      </div>
    </section>
  );
}
