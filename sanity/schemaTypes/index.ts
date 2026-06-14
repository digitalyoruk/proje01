import type { SchemaTypeDefinition } from "sanity";

// Objects
import { seo } from "./objects/seo";
import { socialLink } from "./objects/socialLink";
import { navItem } from "./objects/navItem";
import { statItem } from "./objects/statItem";

// Singletons
import { siteSettings } from "./documents/siteSettings";
import { landingPage } from "./documents/landingPage";
import {
  aboutPage,
  servicesPage,
  projectsPage,
  teamPage,
  testimonialsPage,
  faqPage,
  blogPage,
  contactPage,
} from "./documents/pages";

// Collections
import { blogPost } from "./documents/blogPost";
import { service } from "./documents/service";
import { project } from "./documents/project";
import { teamMember } from "./documents/teamMember";
import { testimonial } from "./documents/testimonial";
import { faq } from "./documents/faq";
import { partnerLogo } from "./documents/partnerLogo";

export const schema: { types: SchemaTypeDefinition[] } = {
  types: [
    // objects
    seo,
    socialLink,
    navItem,
    statItem,
    // singletons
    siteSettings,
    landingPage,
    aboutPage,
    servicesPage,
    projectsPage,
    teamPage,
    testimonialsPage,
    faqPage,
    blogPage,
    contactPage,
    // collections
    blogPost,
    service,
    project,
    teamMember,
    testimonial,
    faq,
    partnerLogo,
  ],
};
