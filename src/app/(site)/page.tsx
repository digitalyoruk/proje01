import type { Metadata } from "next";
import { Hero } from "@/components/sections/hero";
import { FeaturedProjects } from "@/components/sections/featured-projects";
import { Services } from "@/components/sections/services";
import { StatementStats } from "@/components/sections/statement-stats";
import { Process } from "@/components/sections/process";
import { Testimonials } from "@/components/sections/testimonials";
import { LatestBlog } from "@/components/sections/latest-blog";
import { ContactMarquee } from "@/components/sections/contact-marquee";
import { Contact } from "@/components/sections/contact";
import { Clients } from "@/components/sections/clients";
import { getLanding, getSiteData } from "@cms/lib/fetch";
import { buildMetadata } from "@/lib/seo";

export async function generateMetadata(): Promise<Metadata> {
  const [landing, site] = await Promise.all([getLanding(), getSiteData()]);
  return buildMetadata({
    seo: landing.seo,
    fallbackTitle: site.defaultSeo?.metaTitle,
    fallbackDescription:
      site.defaultSeo?.metaDescription ?? landing.hero.intro,
    contentImage: landing.hero.image,
    siteDefaultOg: site.defaultSeo?.ogImage,
    path: "/",
    titleAsIs: true,
  });
}

export default async function Home() {
  const [landing, site] = await Promise.all([getLanding(), getSiteData()]);

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "LocalBusiness",
    name: "Proje 01",
    description:
      "Mimarlık, iç mimarlık ve anahtar teslim tadilat çözümleri sunan tasarım stüdyosu.",
    image: landing.hero.image?.src,
    url: "https://proje01.com",
    email: site.email,
    telephone: site.phone,
    address: {
      "@type": "PostalAddress",
      streetAddress:
        "Kültür Mahallesi, Şehit Nevres Bulvarı, No: 3 Kat: 5 Daire: 53",
      addressLocality: "Konak",
      addressRegion: "İzmir",
      postalCode: "35220",
      addressCountry: "TR",
    },
    areaServed: ["İzmir", "Manisa"],
    parentOrganization: { "@type": "Organization", name: "Egekale Group" },
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <Hero data={landing.hero} socials={site.socials} />
      <FeaturedProjects data={landing.featured} />
      <Services data={landing.services} />
      <StatementStats data={landing.statement} />
      <Process data={landing.process} />
      <Testimonials data={landing.testimonials} />
      <LatestBlog />
      <ContactMarquee text={landing.contact.marqueeText} />
      <Contact data={landing.contact} />
      <Clients title={landing.contact.clientsTitle} logos={landing.clients.logos} />
    </>
  );
}
