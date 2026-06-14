import type { Metadata } from "next";
import { EnvelopeSimple, MapPin, Phone } from "@phosphor-icons/react/dist/ssr";
import { PageHero } from "@/components/site/page-hero";
import { ContactForm } from "@/components/sections/contact";
import { getContactPage, getSiteData } from "@cms/lib/fetch";
import { buildMetadata } from "@/lib/seo";

export const revalidate = 3600;

export async function generateMetadata(): Promise<Metadata> {
  const [page, site] = await Promise.all([getContactPage(), getSiteData()]);
  return buildMetadata({
    seo: page?.seo,
    title: page?.title || "İletişim",
    fallbackDescription: page?.intro,
    siteDefaultOg: site.defaultSeo?.ogImage,
    path: "/iletisim",
  });
}

export default async function IletisimPage() {
  const [page, site] = await Promise.all([getContactPage(), getSiteData()]);

  return (
    <>
      <PageHero
        eyebrow={page?.eyebrow}
        title={(page?.title as string) || "Sorularınız mı var? Bize ulaşın!"}
        intro={page?.intro}
      />

      <section className="bg-[var(--color-bg)] py-20 md:py-28">
        <div className="container-edge grid grid-cols-1 gap-12 lg:grid-cols-2 lg:gap-20">
          <div>
            {page?.formNote ? (
              <p className="max-w-md text-[15px] leading-relaxed text-[var(--color-muted-foreground)] md:text-base">
                {page.formNote as string}
              </p>
            ) : null}

            <ul className="mt-10 flex flex-col gap-6 text-[var(--color-ink)]">
              {site.email && (
                <li>
                  <a
                    href={`mailto:${site.email}`}
                    className="group inline-flex items-center gap-4 transition-colors hover:text-[var(--color-clay)]"
                  >
                    <span className="inline-flex size-11 items-center justify-center rounded-full bg-[var(--color-bg-warm)] text-[var(--color-clay)]">
                      <EnvelopeSimple className="size-5" />
                    </span>
                    {site.email}
                  </a>
                </li>
              )}
              {site.phone && (
                <li>
                  <a
                    href={`tel:${site.phone.replace(/\s+/g, "")}`}
                    className="group inline-flex items-center gap-4 transition-colors hover:text-[var(--color-clay)]"
                  >
                    <span className="inline-flex size-11 items-center justify-center rounded-full bg-[var(--color-bg-warm)] text-[var(--color-clay)]">
                      <Phone className="size-5" />
                    </span>
                    {site.phone}
                  </a>
                </li>
              )}
              {site.address && (
                <li className="flex items-start gap-4">
                  <span className="inline-flex size-11 shrink-0 items-center justify-center rounded-full bg-[var(--color-bg-warm)] text-[var(--color-clay)]">
                    <MapPin className="size-5" />
                  </span>
                  <span className="max-w-xs leading-relaxed">
                    {site.address}
                  </span>
                </li>
              )}
            </ul>
          </div>

          <div className="rounded-2xl border border-[var(--color-border-warm)] bg-[var(--color-bg-warm)] p-8 md:p-10">
            <ContactForm />
          </div>
        </div>
      </section>
    </>
  );
}
