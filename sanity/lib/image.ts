import { createImageUrlBuilder } from "@sanity/image-url";

import { dataset, projectId } from "../env";
import type { Img } from "./types";

const builder = createImageUrlBuilder({ projectId, dataset });

export function urlForImage(source: Parameters<typeof builder.image>[0]) {
  return builder.image(source);
}

/**
 * Shape returned by GROQ when we expand an image's asset (see queries.ts):
 *   image{ alt, asset->{ url, metadata{ lqip, dimensions } } }
 */
type ExpandedImage = {
  alt?: string;
  asset?: {
    url?: string;
    metadata?: {
      lqip?: string;
      dimensions?: { width?: number; height?: number };
    };
  };
} | null;

/** Normalize an expanded Sanity image (or null) into our `Img` shape. */
export function resolveImage(
  source: ExpandedImage,
  fallbackAlt = ""
): Img | null {
  if (!source?.asset?.url) return null;
  return {
    src: source.asset.url,
    alt: source.alt || fallbackAlt,
    lqip: source.asset.metadata?.lqip,
    width: source.asset.metadata?.dimensions?.width,
    height: source.asset.metadata?.dimensions?.height,
  };
}

/** Resolve an array of expanded images, dropping any that fail to resolve. */
export function resolveImages(
  sources: ExpandedImage[] | undefined,
  fallbackAlt = ""
): Img[] {
  if (!sources) return [];
  return sources
    .map((s) => resolveImage(s, fallbackAlt))
    .filter((x): x is Img => x !== null);
}
