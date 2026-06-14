import type { Metadata } from "next";
import type { Img, Seo } from "@cms/lib/types";
import { ogImageAbsoluteUrl, resolveOgImage } from "@/lib/og-image";

export const SITE_URL = "https://proje01.com";

type BuildOpts = {
  seo?: Seo;
  /** Page title used with the "%s | PROJE 01" template. */
  title?: string;
  fallbackTitle?: string;
  description?: string;
  fallbackDescription?: string;
  /** Hero / project / service / blog cover image. */
  contentImage?: Img | null;
  /** @deprecated Use contentImage — kept for gradual migration. */
  fallbackOg?: Img | null;
  /** Site-wide default from Sanity settings. */
  siteDefaultOg?: Img | null;
  /** Blog category label — enables blog auto OG when no image exists. */
  blogCategory?: string;
  /** Route path, e.g. "/hizmetler". */
  path: string;
  /** When true the title is used verbatim (no template). */
  titleAsIs?: boolean;
  /** Article metadata for blog posts. */
  article?: {
    publishedTime: string;
    modifiedTime?: string;
    authors?: string[];
    section?: string;
  };
};

export function buildMetadata(opts: BuildOpts): Metadata {
  const title = opts.seo?.metaTitle || opts.title || opts.fallbackTitle;
  const description =
    opts.seo?.metaDescription || opts.description || opts.fallbackDescription;

  const resolvedOg = resolveOgImage({
    seoOg: opts.seo?.ogImage,
    contentImage: opts.contentImage ?? opts.fallbackOg,
    siteDefaultOg: opts.siteDefaultOg,
    pageTitle: opts.title ?? opts.fallbackTitle,
    blogCategory: opts.blogCategory,
    alt: title || "Proje 01",
  });

  const ogUrl = ogImageAbsoluteUrl(resolvedOg);
  const images = [
    {
      url: ogUrl,
      width: resolvedOg.width ?? 1200,
      height: resolvedOg.height ?? 630,
      alt: resolvedOg.alt || title || "Proje 01",
    },
  ];

  const noindex = opts.seo?.noindex;
  const url = SITE_URL + (opts.path === "/" ? "" : opts.path);

  return {
    title: title ? (opts.titleAsIs ? { absolute: title } : title) : undefined,
    description,
    alternates: { canonical: opts.path },
    openGraph: {
      type: opts.article ? "article" : "website",
      locale: "tr_TR",
      url,
      siteName: "PROJE 01",
      title,
      description,
      images,
      ...(opts.article
        ? {
            publishedTime: opts.article.publishedTime,
            modifiedTime: opts.article.modifiedTime ?? opts.article.publishedTime,
            authors: opts.article.authors,
            section: opts.article.section,
          }
        : {}),
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
      images: images.map((i) => i.url),
    },
    ...(noindex ? { robots: { index: false, follow: false } } : {}),
  };
}
