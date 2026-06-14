import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowLeft } from "@phosphor-icons/react/dist/ssr";
import type { PortableTextBlock } from "@portabletext/react";
import { PageHero } from "@/components/site/page-hero";
import { CmsImage } from "@/components/site/cms-image";
import { PortableBody } from "@/components/site/portable-text";
import { Button } from "@/components/ui/button";
import {
  getProject,
  getProjectSlugs,
  getSiteData,
} from "@cms/lib/fetch";
import { buildMetadata } from "@/lib/seo";

export const revalidate = 3600;

export async function generateStaticParams() {
  const slugs = await getProjectSlugs();
  return slugs.map((slug) => ({ slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const [project, site] = await Promise.all([getProject(slug), getSiteData()]);
  if (!project) return {};
  return buildMetadata({
    seo: project.seo,
    title: project.title,
    fallbackDescription: project.subtitle,
    contentImage: project.image,
    siteDefaultOg: site.defaultSeo?.ogImage,
    path: `/projeler/${slug}`,
  });
}

export default async function ProjectDetail({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const project = await getProject(slug);
  if (!project) notFound();

  const meta = [
    project.subtitle && { label: "Kategori", value: project.subtitle },
    project.location && { label: "Konum", value: project.location },
    project.year && { label: "Yıl", value: project.year },
  ].filter(Boolean) as { label: string; value: string }[];

  return (
    <>
      <PageHero
        eyebrow={project.subtitle || "Proje"}
        title={project.title}
        image={project.image}
      />

      <article className="bg-[var(--color-bg)] py-16 md:py-24">
        <div className="container-edge">
          <Link
            href="/projeler"
            className="inline-flex items-center gap-2 text-sm font-medium text-[var(--color-meta)] transition-colors hover:text-[var(--color-clay)]"
          >
            <ArrowLeft className="size-4" />
            Tüm projeler
          </Link>

          <div className="mt-10 grid grid-cols-1 gap-10 lg:grid-cols-3">
            <div className="lg:col-span-2">
              <PortableBody
                value={(project.description as PortableTextBlock[]) ?? []}
              />
            </div>
            {meta.length > 0 && (
              <dl className="h-fit divide-y divide-[var(--color-border-warm)] rounded-xl border border-[var(--color-border-warm)] bg-[var(--color-bg-warm)] p-6">
                {meta.map((m) => (
                  <div key={m.label} className="flex justify-between gap-4 py-3">
                    <dt className="text-sm text-[var(--color-meta)]">
                      {m.label}
                    </dt>
                    <dd className="text-sm font-medium text-[var(--color-ink)]">
                      {m.value}
                    </dd>
                  </div>
                ))}
              </dl>
            )}
          </div>

          {project.gallery.length > 0 && (
            <div className="mt-12 grid grid-cols-1 gap-4 sm:grid-cols-2">
              {project.gallery.map((g, i) => (
                <div
                  key={g.src}
                  className="relative aspect-[4/3] overflow-hidden bg-[var(--color-bg-warm)]"
                >
                  <CmsImage
                    image={g}
                    alt={`${project.title} görsel ${i + 1}`}
                    fill
                    sizes="(max-width: 640px) 100vw, 50vw"
                    className="object-cover"
                  />
                </div>
              ))}
            </div>
          )}

          <div className="mt-14 flex flex-col items-start gap-4 border-t border-[var(--color-border-warm)] pt-10 sm:flex-row sm:items-center sm:justify-between">
            <p className="font-display text-xl font-medium text-[var(--color-ink)] md:text-2xl">
              Benzer bir proje mi planlıyorsunuz?
            </p>
            <Button asChild size="lg">
              <Link href="/iletisim">İletişime geçin</Link>
            </Button>
          </div>
        </div>
      </article>
    </>
  );
}
