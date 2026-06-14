import Link from "next/link";
import { ArrowLeft } from "@phosphor-icons/react/dist/ssr";
import { BlogCoverImage } from "@/components/blog/blog-cover-image";
import { isGeneratedBlogCover } from "@/lib/blog-cover";
import { formatDateTr } from "@/lib/format-date";
import type { Img } from "@cms/lib/types";

type Props = {
  title: string;
  excerpt: string;
  category?: string;
  authorName: string;
  publishedAt: string;
  cover: Img;
};

export function BlogArticleHeader({
  title,
  excerpt,
  category,
  authorName,
  publishedAt,
  cover,
}: Props) {
  const showCover = !isGeneratedBlogCover(cover.src);

  return (
    <header className="relative overflow-hidden bg-[var(--color-ink-deep)] text-white">
      <div
        className="pointer-events-none absolute inset-x-0 top-0 h-1 bg-[var(--color-clay)]"
        aria-hidden
      />
      <div
        className="pointer-events-none absolute -bottom-40 -right-28 h-[22rem] w-[22rem] rounded-full bg-[radial-gradient(circle,rgba(181,83,41,0.22)_0%,transparent_68%)]"
        aria-hidden
      />

      <div className="container-edge relative max-w-3xl pb-12 pt-28 md:pb-16 md:pt-32">
        <Link
          href="/blog"
          className="inline-flex items-center gap-2 text-sm text-white/55 transition-colors hover:text-[var(--color-clay)]"
        >
          <ArrowLeft className="size-4" />
          Tüm yazılar
        </Link>

        {category && (
          <p className="mt-8 text-[11px] font-medium uppercase tracking-[0.2em] text-[var(--color-clay)]">
            {category}
          </p>
        )}

        <h1 className="mt-4 font-display text-[clamp(1.75rem,4vw,2.75rem)] font-medium leading-[1.12] tracking-tight text-white">
          {title}
        </h1>

        <p className="mt-5 max-w-2xl text-base leading-relaxed text-white/70 md:text-lg">
          {excerpt}
        </p>

        <div className="mt-8 flex flex-wrap items-center gap-x-5 gap-y-2 text-sm text-white/50">
          <time dateTime={publishedAt}>{formatDateTr(publishedAt)}</time>
          <span>{authorName}</span>
        </div>

        {showCover && (
          <div className="relative mt-10 aspect-[1200/630] overflow-hidden rounded-md bg-[var(--color-ink)]">
            <BlogCoverImage
              image={cover}
              alt={title}
              fill
              priority
              sizes="(max-width: 768px) 100vw, 768px"
              className="object-cover"
            />
          </div>
        )}
      </div>
    </header>
  );
}
