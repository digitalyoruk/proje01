import type { Img } from "@cms/lib/types";
import { SITE_URL } from "@/lib/seo";
import { OG_HEIGHT, OG_WIDTH } from "@/lib/og-constants";

export const BLOG_COVER_WIDTH = OG_WIDTH;
export const BLOG_COVER_HEIGHT = OG_HEIGHT;

type CoverInput = {
  title: string;
  categoryLabel?: string;
  slug?: string;
  /** Sanity cover image (optional). */
  cmsImage?: Img | null;
  /** Per-post SEO og image overrides everything. */
  seoOg?: Img | null;
};

/** Build the query string for the auto-generated cover API. */
export function blogCoverApiPath({
  title,
  categoryLabel,
}: Pick<CoverInput, "title" | "categoryLabel">) {
  const params = new URLSearchParams({ title });
  if (categoryLabel) params.set("category", categoryLabel);
  return `/api/og/blog?${params.toString()}`;
}

/** Absolute URL for OpenGraph / JSON-LD (social crawlers need full URL). */
export function blogCoverAbsoluteUrl(input: CoverInput): string {
  const img = resolveBlogCover(input);
  return img.src.startsWith("http") ? img.src : `${SITE_URL}${img.src}`;
}

/**
 * Resolve the cover image for a blog post.
 * Priority: custom SEO og image → CMS cover upload → auto-generated branded cover.
 */
export function resolveBlogCover(input: CoverInput): Img {
  if (input.seoOg?.src) return input.seoOg;
  if (input.cmsImage?.src) return input.cmsImage;

  return {
    src: blogCoverApiPath(input),
    alt: input.title,
    width: BLOG_COVER_WIDTH,
    height: BLOG_COVER_HEIGHT,
  };
}

export function isGeneratedBlogCover(src: string) {
  return src.includes("/api/og/blog");
}
