import Link from "next/link";
import { ArrowUpRight } from "@phosphor-icons/react/dist/ssr";
import { BlogCoverImage } from "@/components/blog/blog-cover-image";
import { Reveal } from "@/components/motion/reveal";
import { blogCategoryLabel } from "@/lib/blog-categories";
import { resolveBlogCover } from "@/lib/blog-cover";
import { formatDateTr } from "@/lib/format-date";
import type { BlogPostCard } from "@cms/lib/fetch";

export function BlogCard({ post }: { post: BlogPostCard }) {
  const category = blogCategoryLabel(post.category);
  const cover = resolveBlogCover({
    title: post.title,
    categoryLabel: category,
    slug: post.slug,
    cmsImage: post.image,
  });

  return (
    <Reveal className="h-full">
      <Link
        href={post.href}
        className="group flex h-full flex-col focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--color-clay)]/30 focus-visible:ring-offset-2"
      >
        <article className="flex h-full flex-col">
          <div className="relative aspect-[1200/630] overflow-hidden rounded-md bg-[var(--color-bg-warm)]">
            <BlogCoverImage
              image={cover}
              alt={post.title}
              fill
              sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 33vw"
              className="object-cover transition-transform duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:scale-[1.02]"
            />
            <div
              className="pointer-events-none absolute inset-0 bg-[var(--color-ink)]/0 transition-colors duration-500 group-hover:bg-[var(--color-ink)]/[0.05]"
              aria-hidden
            />
          </div>

          <div className="flex flex-1 flex-col pt-6 md:pt-7">
            <time
              dateTime={post.publishedAt}
              className="text-[12px] tabular-nums tracking-wide text-[var(--color-meta)]"
            >
              {formatDateTr(post.publishedAt)}
            </time>

            <h2 className="mt-3 line-clamp-2 font-display text-[1.35rem] font-medium leading-[1.15] tracking-tight text-[var(--color-ink)] transition-colors duration-300 group-hover:text-[var(--color-clay)] md:text-2xl">
              {post.title}
            </h2>

            <p className="mt-3 line-clamp-2 flex-1 text-[14px] leading-relaxed text-[var(--color-muted-foreground)]">
              {post.excerpt}
            </p>

            <span className="mt-6 inline-flex w-fit items-center gap-1.5 text-[13px] font-medium text-[var(--color-ink)] transition-colors duration-300 group-hover:text-[var(--color-clay)]">
              Oku
              <ArrowUpRight
                className="size-3.5 transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
                aria-hidden
              />
            </span>
          </div>
        </article>
      </Link>
    </Reveal>
  );
}
