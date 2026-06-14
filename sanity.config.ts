"use client";

import { defineConfig } from "sanity";
import { structureTool } from "sanity/structure";
import { visionTool } from "@sanity/vision";

import { apiVersion, dataset, projectId } from "./sanity/env";
import { schema } from "./sanity/schemaTypes";

const SINGLETONS = [
  { id: "siteSettings", title: "Site Ayarları", type: "siteSettings" },
  { id: "landingPage", title: "Ana Sayfa", type: "landingPage" },
  { id: "aboutPage", title: "Hakkımızda Sayfası", type: "aboutPage" },
  { id: "servicesPage", title: "Hizmetler Sayfası", type: "servicesPage" },
  { id: "projectsPage", title: "Projeler Sayfası", type: "projectsPage" },
  { id: "teamPage", title: "Ekibimiz Sayfası", type: "teamPage" },
  { id: "testimonialsPage", title: "Memnuniyet Sayfası", type: "testimonialsPage" },
  { id: "faqPage", title: "SSS Sayfası", type: "faqPage" },
  { id: "blogPage", title: "Blog Sayfası", type: "blogPage" },
  { id: "contactPage", title: "İletişim Sayfası", type: "contactPage" },
];

const PAGE_SINGLETONS = SINGLETONS.filter(
  (s) => s.type !== "siteSettings" && s.type !== "landingPage"
);

export default defineConfig({
  basePath: "/studio",
  projectId,
  dataset,
  apiVersion,
  schema,
  document: {
    // Hide singletons from the global "create new" menu.
    newDocumentOptions: (prev) =>
      prev.filter(
        (item) => !SINGLETONS.some((s) => s.type === item.templateId)
      ),
  },
  plugins: [
    structureTool({
      structure: (S) =>
        S.list()
          .title("İçerik")
          .items([
            S.listItem()
              .title("Site Ayarları")
              .id("siteSettings")
              .child(
                S.document().schemaType("siteSettings").documentId("siteSettings")
              ),
            S.listItem()
              .title("Ana Sayfa")
              .id("landingPage")
              .child(
                S.document().schemaType("landingPage").documentId("landingPage")
              ),
            S.listItem()
              .title("Sayfalar")
              .child(
                S.list()
                  .title("Sayfalar")
                  .items(
                    PAGE_SINGLETONS.map((s) =>
                      S.listItem()
                        .title(s.title)
                        .id(s.id)
                        .child(
                          S.document()
                            .schemaType(s.type)
                            .documentId(s.id)
                        )
                    )
                  )
              ),
            S.divider(),
            S.documentTypeListItem("service").title("Hizmetler"),
            S.documentTypeListItem("project").title("Projeler"),
            S.documentTypeListItem("teamMember").title("Ekip"),
            S.documentTypeListItem("testimonial").title("Yorumlar"),
            S.documentTypeListItem("faq").title("Sık Sorulan Sorular"),
            S.documentTypeListItem("blogPost").title("Blog"),
            S.documentTypeListItem("partnerLogo").title("İş Ortağı Logoları"),
          ]),
    }),
    visionTool({ defaultApiVersion: apiVersion }),
  ],
});
