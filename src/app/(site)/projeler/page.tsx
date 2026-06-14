import type { Metadata } from "next";
import Link from "next/link";
import { PageHero } from "@/components/site/page-hero";
import { CmsImage } from "@/components/site/cms-image";
import { Reveal } from "@/components/motion/reveal";
import { getProjects, getProjectsPage, getSiteData } from "@cms/lib/fetch";
import { buildMetadata } from "@/lib/seo";

export const revalidate = 3600;

export async function generateMetadata(): Promise<Metadata> {
  const [page, site] = await Promise.all([getProjectsPage(), getSiteData()]);
  return buildMetadata({
    seo: page?.seo,
    title: page?.title || "Projeler",
    fallbackDescription: page?.intro,
    siteDefaultOg: site.defaultSeo?.ogImage,
    path: "/projeler",
  });
}

export default async function ProjelerPage() {
  const [page, projects] = await Promise.all([
    getProjectsPage(),
    getProjects(),
  ]);

  return (
    <>
      <PageHero
        eyebrow={page?.eyebrow}
        title={page?.title || "Projeler"}
        intro={page?.intro}
      />

      <section className="bg-[var(--color-bg)] py-20 md:py-28">
        <div className="container-edge grid grid-cols-1 gap-x-6 gap-y-12 sm:grid-cols-2 lg:grid-cols-3">
          {projects.map((p, i) => (
            <Reveal key={p.slug} delay={(i % 3) * 0.05}>
              <Link href={p.href} className="group block">
                <div className="relative aspect-[3/4] overflow-hidden bg-[var(--color-bg-warm)]">
                  <CmsImage
                    image={p.image}
                    alt={p.title}
                    fill
                    sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                    className="object-cover transition-transform duration-700 ease-out group-hover:scale-105"
                  />
                </div>
                <h2 className="mt-4 font-display text-xl font-medium text-[var(--color-ink)] transition-colors group-hover:text-[var(--color-clay)]">
                  {p.title}
                </h2>
                {p.subtitle && (
                  <p className="text-sm text-[var(--color-muted-foreground)]">
                    {p.subtitle}
                  </p>
                )}
              </Link>
            </Reveal>
          ))}
        </div>
      </section>
    </>
  );
}
