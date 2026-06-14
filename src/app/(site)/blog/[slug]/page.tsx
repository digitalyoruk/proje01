import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import type { PortableTextBlock } from "@portabletext/react";
import { BlogArticleHeader } from "@/components/blog/blog-article-header";
import { PortableBody } from "@/components/site/portable-text";
import { BlogCard } from "@/components/blog/blog-card";
import { Button } from "@/components/ui/button";
import { blogCategoryLabel } from "@/lib/blog-categories";
import {
  blogCoverAbsoluteUrl,
  resolveBlogCover,
} from "@/lib/blog-cover";
import {
  getBlogPost,
  getBlogPosts,
  getBlogSlugs,
  getSiteData,
} from "@cms/lib/fetch";
import { buildMetadata, SITE_URL } from "@/lib/seo";

export const revalidate = 3600;

export async function generateStaticParams() {
  const slugs = await getBlogSlugs();
  return slugs.map((slug) => ({ slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const [post, site] = await Promise.all([getBlogPost(slug), getSiteData()]);
  if (!post) return {};

  const categoryLabel = blogCategoryLabel(post.category);

  return buildMetadata({
    seo: post.seo,
    title: post.title,
    fallbackDescription: post.excerpt,
    contentImage: post.image,
    siteDefaultOg: site.defaultSeo?.ogImage,
    blogCategory: categoryLabel,
    path: `/blog/${slug}`,
    article: {
      publishedTime: post.publishedAt,
      authors: [post.authorName],
      section: categoryLabel,
    },
  });
}

export default async function BlogPostPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const [post, all] = await Promise.all([getBlogPost(slug), getBlogPosts()]);
  if (!post) notFound();

  const others = all.filter((p) => p.slug !== slug).slice(0, 3);
  const category = blogCategoryLabel(post.category);
  const url = `${SITE_URL}/blog/${slug}`;
  const cover = resolveBlogCover({
    title: post.title,
    categoryLabel: category,
    slug: post.slug,
    cmsImage: post.image,
    seoOg: post.seo?.ogImage,
  });
  const coverAbsolute = blogCoverAbsoluteUrl({
    title: post.title,
    categoryLabel: category,
    slug: post.slug,
    cmsImage: post.image,
    seoOg: post.seo?.ogImage,
  });

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "BlogPosting",
    headline: post.title,
    description: post.excerpt,
    image: [coverAbsolute],
    datePublished: post.publishedAt,
    dateModified: post.publishedAt,
    author: { "@type": "Organization", name: post.authorName },
    publisher: {
      "@type": "Organization",
      name: "Proje 01",
      url: SITE_URL,
      logo: { "@type": "ImageObject", url: `${SITE_URL}/icon-192.png` },
    },
    mainEntityOfPage: { "@type": "WebPage", "@id": url },
    url,
    articleSection: category,
    inLanguage: "tr-TR",
  };

  const breadcrumbLd = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "Ana Sayfa", item: SITE_URL },
      { "@type": "ListItem", position: 2, name: "Blog", item: `${SITE_URL}/blog` },
      { "@type": "ListItem", position: 3, name: post.title, item: url },
    ],
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbLd) }}
      />

      <article>
        <BlogArticleHeader
          title={post.title}
          excerpt={post.excerpt}
          category={category}
          authorName={post.authorName}
          publishedAt={post.publishedAt}
          cover={cover}
        />

        <div className="bg-[var(--color-bg)] py-12 md:py-16">
          <div className="container-edge max-w-3xl">
            <PortableBody value={(post.body as PortableTextBlock[]) ?? []} />

            <div className="mt-16 border-t border-[var(--color-border-warm)] pt-10">
              <h2 className="font-display text-xl font-medium text-[var(--color-ink)] md:text-2xl">
                Projeniz için danışmanlık alın
              </h2>
              <p className="mt-3 max-w-xl text-[15px] leading-relaxed text-[var(--color-muted-foreground)]">
                Tadilat veya iç mimari projeniz hakkında konuşmak için bize
                ulaşın; ihtiyaçlarınıza uygun çözümler sunalım.
              </p>
              <Button asChild size="lg" className="mt-6">
                <Link href="/iletisim">İletişime geçin</Link>
              </Button>
            </div>
          </div>
        </div>
      </article>

      {others.length > 0 && (
        <section className="border-t border-[var(--color-border-warm)] bg-[var(--color-bg-warm)] py-16 md:py-24">
          <div className="container-edge">
            <h2 className="font-display text-2xl font-medium text-[var(--color-ink)] md:text-3xl">
              Diğer yazılar
            </h2>
            <div className="mt-10 grid grid-cols-1 items-stretch gap-x-8 gap-y-14 md:grid-cols-3 lg:gap-y-16">
              {others.map((p) => (
                <BlogCard key={p.slug} post={p} />
              ))}
            </div>
          </div>
        </section>
      )}
    </>
  );
}
