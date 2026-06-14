import type { Metadata } from "next";
import { Quotes } from "@phosphor-icons/react/dist/ssr";
import { PageHero } from "@/components/site/page-hero";
import { Reveal } from "@/components/motion/reveal";
import {
  getTestimonials,
  getTestimonialsPage,
  getSiteData,
} from "@cms/lib/fetch";
import { buildMetadata } from "@/lib/seo";

export const revalidate = 3600;

export async function generateMetadata(): Promise<Metadata> {
  const [page, site] = await Promise.all([
    getTestimonialsPage(),
    getSiteData(),
  ]);
  return buildMetadata({
    seo: page?.seo,
    title: page?.title || "Memnuniyet",
    fallbackDescription: page?.intro,
    siteDefaultOg: site.defaultSeo?.ogImage,
    path: "/memnuniyet",
  });
}

export default async function MemnuniyetPage() {
  const [page, testimonials] = await Promise.all([
    getTestimonialsPage(),
    getTestimonials(),
  ]);

  return (
    <>
      <PageHero
        eyebrow={page?.eyebrow}
        title={page?.title || "Müşteri Memnuniyeti"}
        intro={page?.intro}
      />

      <section className="bg-[var(--color-bg)] py-20 md:py-28">
        <div className="container-edge grid grid-cols-1 gap-6 md:grid-cols-2">
          {testimonials.map((t, i) => (
            <Reveal key={t.name} delay={(i % 2) * 0.05}>
              <figure className="flex h-full flex-col justify-between rounded-xl border border-[var(--color-border-warm)] bg-[var(--color-bg-warm)] p-8 md:p-10">
                <Quotes className="size-8 text-[var(--color-clay)]" weight="fill" />
                <blockquote className="mt-6 font-display text-xl font-medium leading-snug text-[var(--color-ink)] md:text-2xl">
                  {t.quote}
                </blockquote>
                <figcaption className="mt-8 border-t border-[var(--color-border-warm)] pt-5">
                  <span className="block font-medium text-[var(--color-ink)]">
                    {t.name}
                  </span>
                  {t.role && (
                    <span className="text-sm text-[var(--color-muted-foreground)]">
                      {t.role}
                    </span>
                  )}
                </figcaption>
              </figure>
            </Reveal>
          ))}
        </div>
      </section>
    </>
  );
}
