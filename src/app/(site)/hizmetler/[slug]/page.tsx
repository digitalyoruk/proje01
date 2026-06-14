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
  getService,
  getServices,
  getServiceSlugs,
  getSiteData,
} from "@cms/lib/fetch";
import { buildMetadata, SITE_URL } from "@/lib/seo";

export const revalidate = 3600;

export async function generateStaticParams() {
  const slugs = await getServiceSlugs();
  return slugs.map((slug) => ({ slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const [service, site] = await Promise.all([getService(slug), getSiteData()]);
  if (!service) return {};
  return buildMetadata({
    seo: service.seo,
    title: service.title,
    fallbackDescription: service.excerpt,
    contentImage: service.image,
    siteDefaultOg: site.defaultSeo?.ogImage,
    path: `/hizmetler/${slug}`,
  });
}

export default async function ServiceDetail({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const [service, all] = await Promise.all([getService(slug), getServices()]);
  if (!service) notFound();

  const others = all.filter((s) => s.slug !== slug).slice(0, 3);

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "Service",
    name: service.title,
    description: service.excerpt,
    provider: { "@type": "LocalBusiness", name: "Proje 01" },
    areaServed: ["İzmir", "Manisa"],
    url: `${SITE_URL}/hizmetler/${slug}`,
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <PageHero eyebrow="Hizmet" title={service.title} intro={service.excerpt} />

      <article className="bg-[var(--color-bg)] py-16 md:py-24">
        <div className="container-edge">
          <Link
            href="/hizmetler"
            className="inline-flex items-center gap-2 text-sm font-medium text-[var(--color-meta)] transition-colors hover:text-[var(--color-clay)]"
          >
            <ArrowLeft className="size-4" />
            Tüm hizmetler
          </Link>

          {service.image?.src && (
            <div className="relative mt-8 aspect-[16/9] overflow-hidden bg-[var(--color-bg-warm)]">
              <CmsImage
                image={service.image}
                alt={service.title}
                fill
                sizes="(max-width: 1024px) 100vw, 1024px"
                className="object-cover"
              />
            </div>
          )}

          <div className="mt-12 max-w-3xl">
            <PortableBody value={(service.body as PortableTextBlock[]) ?? []} />
          </div>

          <div className="mt-12 rounded-2xl bg-[var(--color-bg-warm)] p-8 md:p-12">
            <h2 className="font-display text-2xl font-medium text-[var(--color-ink)] md:text-3xl">
              Bu hizmet için teklif alın
            </h2>
            <p className="mt-3 max-w-xl text-[15px] leading-relaxed text-[var(--color-muted-foreground)]">
              Projenizi konuşmak için bize ulaşın; ihtiyaçlarınıza uygun
              çözümler sunalım.
            </p>
            <Button asChild size="lg" className="mt-6">
              <Link href="/iletisim">İletişime geçin</Link>
            </Button>
          </div>
        </div>
      </article>

      {others.length > 0 && (
        <section className="bg-[var(--color-bg-warm)] py-16 md:py-24">
          <div className="container-edge">
            <h2 className="font-display text-2xl font-medium text-[var(--color-ink)] md:text-3xl">
              Diğer hizmetler
            </h2>
            <div className="mt-8 grid grid-cols-1 gap-x-8 gap-y-10 md:grid-cols-3">
              {others.map((s) => (
                <Link key={s.slug} href={s.href} className="group block">
                  <div className="relative aspect-[4/3] overflow-hidden bg-[var(--color-bg)]">
                    <CmsImage
                      image={s.image}
                      alt={s.title}
                      fill
                      sizes="(max-width: 768px) 100vw, 33vw"
                      className="object-cover transition-transform duration-700 ease-out group-hover:scale-105"
                    />
                  </div>
                  <h3 className="mt-4 font-display text-lg font-medium text-[var(--color-ink)] transition-colors group-hover:text-[var(--color-clay)]">
                    {s.title}
                  </h3>
                </Link>
              ))}
            </div>
          </div>
        </section>
      )}
    </>
  );
}
