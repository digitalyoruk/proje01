/**
 * Normalized content shapes consumed by the UI. The fetch layer maps either
 * Sanity documents or the local fallback (src/content/site.ts) into these,
 * so components never care where the data came from.
 */

export type Img = {
  src: string;
  alt: string;
  lqip?: string;
  width?: number;
  height?: number;
};

export type Seo = {
  metaTitle?: string;
  metaDescription?: string;
  ogImage?: Img | null;
  noindex?: boolean;
};

export type Social = {
  platform: string;
  label: string;
  href: string;
};

export type NavChild = { label: string; href: string };

export type NavItem = {
  label: string;
  href: string;
  autoChildrenFromServices?: boolean;
  children?: NavChild[];
};

export type SiteData = {
  name: string;
  wordmark: string;
  logo?: Img | null;
  email: string;
  phone?: string;
  address: string;
  legal: string;
  builtBy: string;
  footerBlurb: string;
  nav: NavItem[];
  socials: Social[];
  defaultSeo?: Seo;
};

export type Stat = { value: number; suffix: string; label: string };

export type ProjectCard = {
  title: string;
  subtitle?: string;
  image: Img | null;
  href: string;
};

export type ServiceCard = {
  title: string;
  excerpt: string;
  icon?: string;
  image?: Img | null;
  href: string;
};

export type Testimonial = {
  quote: string;
  name: string;
  role?: string;
};

export type LandingData = {
  hero: { title: string; intro: string; image: Img | null; imageAlt?: string };
  featured: { eyebrow: string; title: string; projects: ProjectCard[] };
  services: { eyebrow: string; title: string; items: ServiceCard[] };
  statement: {
    title: string;
    galleryA: string[];
    galleryB: string[];
    collage: { image: string; alt: string }[];
    stats: Stat[];
  };
  process: {
    eyebrow: string;
    title: string;
    body: string;
    body2: string;
    tabs: { title: string; image: string }[];
  };
  testimonials: { eyebrow: string; title: string; items: Testimonial[] };
  contact: {
    eyebrow: string;
    title: string;
    marqueeText: string;
    image: Img | null;
    clientsTitle: string;
  };
  clients: { logos: { src: string; alt: string }[] };
  seo?: Seo;
};
