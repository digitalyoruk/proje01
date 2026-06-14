import {
  defineArrayMember,
  defineField,
  defineType,
  type FieldDefinition,
} from "sanity";

/**
 * Factory for simple page singletons that share a hero (eyebrow/title/intro)
 * and an SEO object. `extraFields` lets specific pages add their own fields.
 */
function pageSingleton(
  name: string,
  title: string,
  extraFields: FieldDefinition[] = []
) {
  return defineType({
    name,
    title,
    type: "document",
    groups: [
      { name: "content", title: "İçerik", default: true },
      { name: "seo", title: "SEO" },
    ],
    fields: [
      defineField({
        name: "eyebrow",
        title: "Üst Etiket",
        type: "string",
        group: "content",
      }),
      defineField({
        name: "title",
        title: "Başlık",
        type: "text",
        rows: 2,
        group: "content",
      }),
      defineField({
        name: "intro",
        title: "Giriş Metni",
        type: "text",
        rows: 4,
        group: "content",
      }),
      ...extraFields.map((f) => ({ ...f, group: "content" }) as FieldDefinition),
      defineField({ name: "seo", title: "SEO & Paylaşım", type: "seo", group: "seo" }),
    ],
    preview: { prepare: () => ({ title }) },
  });
}

export const aboutPage = pageSingleton("aboutPage", "Hakkımızda Sayfası", [
  defineField({
    name: "heroImage",
    title: "Hero Görseli",
    type: "image",
    options: { hotspot: true },
  }),
  defineField({
    name: "bodyTitle",
    title: "İkinci Bölüm Başlığı",
    type: "text",
    rows: 2,
  }),
  defineField({
    name: "body",
    title: "İkinci Bölüm Metni",
    type: "array",
    of: [defineArrayMember({ type: "block" })],
  }),
  defineField({
    name: "images",
    title: "Görseller",
    type: "array",
    of: [defineArrayMember({ type: "image", options: { hotspot: true } })],
  }),
  defineField({
    name: "stats",
    title: "İstatistikler",
    type: "array",
    of: [defineArrayMember({ type: "statItem" })],
  }),
]);

export const servicesPage = pageSingleton("servicesPage", "Hizmetler Sayfası");

export const projectsPage = pageSingleton("projectsPage", "Projeler Sayfası");

export const teamPage = pageSingleton("teamPage", "Ekibimiz Sayfası", [
  defineField({
    name: "bodyTitle",
    title: "İkinci Bölüm Başlığı",
    type: "text",
    rows: 2,
  }),
  defineField({
    name: "bodyText",
    title: "İkinci Bölüm Metni",
    type: "text",
    rows: 4,
  }),
]);

export const testimonialsPage = pageSingleton(
  "testimonialsPage",
  "Memnuniyet Sayfası"
);

export const faqPage = pageSingleton("faqPage", "SSS Sayfası");

export const blogPage = pageSingleton("blogPage", "Blog Sayfası");

export const contactPage = pageSingleton("contactPage", "İletişim Sayfası", [
  defineField({
    name: "formNote",
    title: "Form Üstü Not",
    type: "text",
    rows: 3,
  }),
]);
