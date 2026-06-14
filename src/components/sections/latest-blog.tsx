import Link from "next/link";
import { ArrowRight } from "@phosphor-icons/react/dist/ssr";
import { BlogCard } from "@/components/blog/blog-card";
import { Reveal } from "@/components/motion/reveal";
import { SectionHeading } from "@/components/site/section-heading";
import { Button } from "@/components/ui/button";
import { getBlogPosts } from "@cms/lib/fetch";

export async function LatestBlog() {
  const posts = (await getBlogPosts()).slice(0, 3);
  if (!posts.length) return null;

  return (
    <section className="bg-[var(--color-bg)] py-20 md:py-28">
      <div className="container-edge">
        <Reveal>
          <div className="flex flex-col gap-8 md:flex-row md:items-end md:justify-between">
            <SectionHeading
              eyebrow="Blog"
              title="Tadilat ve tasarım üzerine yazılar"
            />
            <Button variant="outline" asChild className="shrink-0 self-start md:self-auto">
              <Link href="/blog">
                Tüm yazılar
                <ArrowRight className="size-4" />
              </Link>
            </Button>
          </div>
        </Reveal>

        <div className="mt-12 grid grid-cols-1 items-stretch gap-x-8 gap-y-14 md:mt-16 md:grid-cols-2 lg:grid-cols-3 lg:gap-y-16">
          {posts.map((post) => (
            <BlogCard key={post.slug} post={post} />
          ))}
        </div>
      </div>
    </section>
  );
}
