import type { Metadata } from "next";
import Link from "next/link";
import { ArrowUpRight } from "@phosphor-icons/react/dist/ssr";
import { PageHero } from "@/components/site/page-hero";
import { CmsImage } from "@/components/site/cms-image";
import { Reveal } from "@/components/motion/reveal";
import { getServices, getServicesPage, getSiteData } from "@cms/lib/fetch";
import { buildMetadata } from "@/lib/seo";

export const revalidate = 3600;

export async function generateMetadata(): Promise<Metadata> {
  const [page, site] = await Promise.all([getServicesPage(), getSiteData()]);
  return buildMetadata({
    seo: page?.seo,
    title: page?.title || "Hizmetler",
    fallbackDescription: page?.intro,
    siteDefaultOg: site.defaultSeo?.ogImage,
    path: "/hizmetler",
  });
}

export default async function HizmetlerPage() {
  const [page, services] = await Promise.all([
    getServicesPage(),
    getServices(),
  ]);

  return (
    <>
      <PageHero
        eyebrow={page?.eyebrow}
        title={page?.title || "Hizmetler"}
        intro={page?.intro}
      />

      <section className="bg-[var(--color-bg)] py-20 md:py-28">
        <div className="container-edge grid grid-cols-1 gap-x-8 gap-y-12 md:grid-cols-2 lg:grid-cols-3">
          {services.map((s, i) => (
            <Reveal key={s.slug} delay={(i % 3) * 0.05}>
              <Link href={s.href} className="group block">
                <div className="relative aspect-[4/3] overflow-hidden bg-[var(--color-bg-warm)]">
                  <CmsImage
                    image={s.image}
                    alt={s.title}
                    fill
                    sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 33vw"
                    className="object-cover transition-transform duration-700 ease-out group-hover:scale-105"
                  />
                </div>
                <div className="mt-5 flex items-start justify-between gap-4">
                  <h2 className="font-display text-xl font-medium leading-snug text-[var(--color-ink)] md:text-2xl">
                    {s.title}
                  </h2>
                  <ArrowUpRight className="mt-1 size-5 shrink-0 text-[var(--color-meta)] transition-colors group-hover:text-[var(--color-clay)]" />
                </div>
                <p className="mt-3 text-[15px] leading-relaxed text-[var(--color-muted-foreground)]">
                  {s.excerpt}
                </p>
              </Link>
            </Reveal>
          ))}
        </div>
      </section>
    </>
  );
}
