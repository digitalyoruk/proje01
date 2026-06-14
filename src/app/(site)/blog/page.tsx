import type { Metadata } from "next";
import { PageHero } from "@/components/site/page-hero";
import { BlogCard } from "@/components/blog/blog-card";
import { blogCategoryLabel } from "@/lib/blog-categories";
import { blogCoverAbsoluteUrl } from "@/lib/blog-cover";
import { getBlogPage, getBlogPosts, getSiteData } from "@cms/lib/fetch";
import { buildMetadata, SITE_URL } from "@/lib/seo";

export const revalidate = 3600;

export async function generateMetadata(): Promise<Metadata> {
  const [page, site] = await Promise.all([getBlogPage(), getSiteData()]);
  return buildMetadata({
    seo: page?.seo,
    title: page?.title || "Blog",
    fallbackDescription:
      page?.intro ||
      "Tadilat, iç mimarlık ve tasarım üzerine Proje 01 blog yazıları.",
    siteDefaultOg: site.defaultSeo?.ogImage,
    path: "/blog",
  });
}

export default async function BlogPage() {
  const [page, posts] = await Promise.all([getBlogPage(), getBlogPosts()]);

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "Blog",
    name: "Proje 01 Blog",
    description:
      page?.intro ||
      "Tadilat, iç mimarlık ve anahtar teslim renovasyon üzerine rehber yazılar.",
    url: `${SITE_URL}/blog`,
    publisher: {
      "@type": "Organization",
      name: "Proje 01",
      url: SITE_URL,
    },
    blogPost: posts.map((p) => ({
      "@type": "BlogPosting",
      headline: p.title,
      description: p.excerpt,
      url: `${SITE_URL}${p.href}`,
      datePublished: p.publishedAt,
      author: { "@type": "Organization", name: p.authorName ?? "Proje 01" },
      image: blogCoverAbsoluteUrl({
        title: p.title,
        categoryLabel: blogCategoryLabel(p.category),
        slug: p.slug,
        cmsImage: p.image,
      }),
    })),
  };

  return (
    <>
      {posts.length > 0 && (
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
      )}
      <PageHero
        eyebrow={page?.eyebrow || "Blog"}
        title={page?.title || "Tadilat ve tasarım üzerine yazılar"}
        intro={
          page?.intro ||
          "Anahtar teslim tadilat, iç mimarlık ve mekan yenileme süreçlerine dair pratik rehberler ve uzman görüşleri."
        }
      />

      <section className="bg-[var(--color-bg)] py-20 md:py-28">
        <div className="container-edge">
          {posts.length > 0 ? (
            <div className="grid grid-cols-1 items-stretch gap-x-8 gap-y-14 md:grid-cols-2 lg:grid-cols-3 lg:gap-y-16">
              {posts.map((post) => (
                <BlogCard key={post.slug} post={post} />
              ))}
            </div>
          ) : (
            <p className="text-[var(--color-muted-foreground)]">
              Henüz yayınlanmış yazı yok. Yakında burada olacak.
            </p>
          )}
        </div>
      </section>
    </>
  );
}
