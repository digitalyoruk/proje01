import Image from "next/image";
import type { Img } from "@cms/lib/types";
import { isGeneratedBlogCover } from "@/lib/blog-cover";

type Props = {
  image: Img;
  alt?: string;
  className?: string;
  sizes?: string;
  fill?: boolean;
  priority?: boolean;
};

/**
 * Blog cover with CMS upload or auto-generated `/api/og/blog` fallback.
 * Generated covers skip the image optimizer (already sized for OG/display).
 */
export function BlogCoverImage({
  image,
  alt,
  className,
  sizes,
  fill = true,
  priority = false,
}: Props) {
  const generated = isGeneratedBlogCover(image.src);
  const dimensions = fill
    ? {}
    : {
        width: image.width ?? 1200,
        height: image.height ?? 630,
      };

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
