import type { Img } from "@cms/lib/types";
import { blogCoverApiPath } from "@/lib/blog-cover";
import { SITE_URL } from "@/lib/seo";
import { DEFAULT_OG_PATH, OG_HEIGHT, OG_WIDTH } from "./og-constants";

export { DEFAULT_OG_PATH } from "./og-constants";

export function defaultOgImage(): Img {
  return {
    src: DEFAULT_OG_PATH,
    alt: "Proje 01 – Mimarlık, iç mimarlık ve anahtar teslim tadilat",
    width: OG_WIDTH,
    height: OG_HEIGHT,
  };
}

export function pageOgApiPath(title: string, eyebrow?: string) {
  const params = new URLSearchParams({
    title: title.trim().slice(0, 80) || "Proje 01",
  });
  if (eyebrow?.trim()) params.set("eyebrow", eyebrow.trim().slice(0, 40));
  return `/api/og/page?${params.toString()}`;
}

export type OgResolveInput = {
  /** Per-page SEO override from Sanity. */
  seoOg?: Img | null;
  /** Hero image, project photo, service image, blog cover, etc. */
  contentImage?: Img | null;
  /** Site-wide default from Sanity settings (optional). */
  siteDefaultOg?: Img | null;
  /** Used for auto-generated page/blog OG when no image is available. */
  pageTitle?: string;
  /** When set, triggers blog-style auto OG after content image. */
  blogCategory?: string;
  alt?: string;
};

/**
 * Resolve the best Open Graph image for a page.
 *
 * Priority:
 * 1. Manual SEO og image
 * 2. Content image (hero, project, service, blog cover)
 * 3. Blog auto-generated cover (title + category)
 * 4. Site-wide CMS default
 * 5. Page-titled auto OG
 * 6. Site default API image
 */
export function resolveOgImage(input: OgResolveInput): Img {
  if (input.seoOg?.src) return input.seoOg;
  if (input.contentImage?.src) return input.contentImage;

  const title = input.pageTitle?.trim();
  const alt = input.alt || title || "Proje 01";

  if (title && input.blogCategory !== undefined) {
    return {
      src: blogCoverApiPath({
        title,
        categoryLabel: input.blogCategory,
      }),
      alt,
      width: OG_WIDTH,
      height: OG_HEIGHT,
    };
  }

  if (input.siteDefaultOg?.src) return input.siteDefaultOg;

  if (title) {
    return {
      src: pageOgApiPath(title),
      alt,
      width: OG_WIDTH,
      height: OG_HEIGHT,
    };
  }

  return defaultOgImage();
}

export function ogImageAbsoluteUrl(img: Img): string {
  return img.src.startsWith("http") ? img.src : `${SITE_URL}${img.src}`;
}

export function isGeneratedOgImage(src: string) {
  return src.includes("/api/og/");
}
