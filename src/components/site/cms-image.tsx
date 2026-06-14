import Image from "next/image";
import type { Img } from "@cms/lib/types";
import { isGeneratedBlogCover } from "@/lib/blog-cover";

type Props = {
  image: Img | null | undefined;
  alt?: string;
  className?: string;
  sizes?: string;
  fill?: boolean;
  priority?: boolean;
};

/**
 * Renders a normalized CMS image with an LQIP blur placeholder when available.
 * Auto-generated `/api/og/*` covers skip the optimizer (already sized).
 */
export function CmsImage({
  image,
  alt,
  className,
  sizes,
  fill = true,
  priority = false,
}: Props) {
  if (!image?.src) return null;
  const generated =
    isGeneratedBlogCover(image.src) || image.src.startsWith("/api/");
  const dimensions = fill
    ? {}
    : { width: image.width ?? 1200, height: image.height ?? 800 };
  return (
    <Image
      src={image.src}
      alt={alt ?? image.alt ?? ""}
      fill={fill}
      {...dimensions}
      sizes={sizes}
      priority={priority}
      unoptimized={generated}
      placeholder={image.lqip && !generated ? "blur" : "empty"}
      blurDataURL={generated ? undefined : image.lqip}
      className={className}
    />
  );
}
