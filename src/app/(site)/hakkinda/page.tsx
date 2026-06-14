import type { Metadata } from "next";
import Link from "next/link";
import type { PortableTextBlock } from "@portabletext/react";
import { PageHero } from "@/components/site/page-hero";
import { CmsImage } from "@/components/site/cms-image";
import { PortableBody } from "@/components/site/portable-text";
import { StatsBand } from "@/components/site/stats-band";
import { Button } from "@/components/ui/button";
import { Reveal } from "@/components/motion/reveal";
import { getAboutPage, getSiteData } from "@cms/lib/fetch";
import { buildMetadata } from "@/lib/seo";
import type { Img, Stat } from "@cms/lib/types";

export const revalidate = 3600;

export async function generateMetadata(): Promise<Metadata> {
  const [page, site] = await Promise.all([getAboutPage(), getSiteData()]);
  return buildMetadata({
    seo: page?.seo,
    title: page?.title || "Hakkımızda",
    fallbackDescription: page?.intro,
    contentImage: page?.heroImage,
    siteDefaultOg: site.defaultSeo?.ogImage,
    path: "/hakkinda",
  });
}

export default async function HakkindaPage() {
  const page = await getAboutPage();
  const images = (page?.images as Img[]) ?? [];
  const stats = (page?.stats as Stat[]) ?? [];

  return (
    <>
      <PageHero
        eyebrow={page?.eyebrow}
        title={page?.title || "Hakkımızda"}
        intro={page?.intro}
        image={page?.heroImage as Img | null}
      />

      {stats.length > 0 && (
        <section className="bg-[var(--color-bg-warm)] py-16 md:py-20">
          <div className="container-edge">
            <StatsBand stats={stats} />
          </div>
        </section>
      )}

      <section className="bg-[var(--color-bg)] py-20 md:py-28">
        <div className="container-edge grid grid-cols-1 gap-12 lg:grid-cols-2 lg:gap-16">
          <Reveal>
            <div>
              {page?.bodyTitle ? (
                <h2 className="font-display text-3xl font-medium leading-tight text-[var(--color-ink)] md:text-4xl">
                  {page.bodyTitle as string}
                </h2>
              ) : null}
              <div className="mt-6">
                <PortableBody
                  value={(page?.body as PortableTextBlock[]) ?? []}
                />
              </div>
              <Button asChild size="lg" className="mt-4">
                <Link href="/iletisim">Bizimle çalışın</Link>
              </Button>
            </div>
          </Reveal>

          {images.length > 0 && (
            <div className="grid grid-cols-2 gap-4">
              {images.slice(0, 2).map((img, i) => (
                <div
                  key={img.src}
                  className={
                    "relative overflow-hidden bg-[var(--color-bg-warm)] " +
                    (i === 0
                      ? "aspect-[3/4]"
                      : "mt-10 aspect-[3/4]")
                  }
                >
                  <CmsImage
                    image={img}
                    alt={img.alt || "Proje 01"}
                    fill
                    sizes="(max-width: 1024px) 50vw, 25vw"
                    className="object-cover"
                  />
                </div>
              ))}
            </div>
          )}
        </div>
      </section>
    </>
  );
}
