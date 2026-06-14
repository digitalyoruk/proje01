import type { Metadata } from "next";
import { PageHero } from "@/components/site/page-hero";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { getFaqs, getFaqPage, getSiteData } from "@cms/lib/fetch";
import { buildMetadata } from "@/lib/seo";

export const revalidate = 3600;

export async function generateMetadata(): Promise<Metadata> {
  const [page, site] = await Promise.all([getFaqPage(), getSiteData()]);
  return buildMetadata({
    seo: page?.seo,
    title: page?.title || "Sık Sorulan Sorular",
    fallbackDescription: page?.intro,
    siteDefaultOg: site.defaultSeo?.ogImage,
    path: "/sik-sorulan-sorular",
  });
}

export default async function FaqPage() {
  const [page, faqs] = await Promise.all([getFaqPage(), getFaqs()]);

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: faqs.map((f) => ({
      "@type": "Question",
      name: f.question,
      acceptedAnswer: { "@type": "Answer", text: f.answer },
    })),
  };

  return (
    <>
      {faqs.length > 0 && (
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
      )}
      <PageHero
        eyebrow={page?.eyebrow}
        title={page?.title || "Sık Sorulan Sorular"}
        intro={page?.intro}
      />

      <section className="bg-[var(--color-bg)] py-20 md:py-28">
        <div className="container-edge max-w-3xl">
          <Accordion type="single" collapsible className="w-full">
            {faqs.map((f, i) => (
              <AccordionItem key={i} value={`item-${i}`}>
                <AccordionTrigger>{f.question}</AccordionTrigger>
                <AccordionContent>{f.answer}</AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </div>
      </section>
    </>
  );
}
