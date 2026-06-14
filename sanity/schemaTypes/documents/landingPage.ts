import { defineArrayMember, defineField, defineType } from "sanity";

const imageField = (name: string, title: string, group?: string) =>
  defineField({
    name,
    title,
    type: "image",
    options: { hotspot: true },
    group,
  });

const imageArray = (name: string, title: string, group?: string) =>
  defineField({
    name,
    title,
    type: "array",
    group,
    of: [defineArrayMember({ type: "image", options: { hotspot: true } })],
  });

export const landingPage = defineType({
  name: "landingPage",
  title: "Ana Sayfa",
  type: "document",
  groups: [
    { name: "hero", title: "Hero", default: true },
    { name: "featured", title: "Öne Çıkan Projeler" },
    { name: "services", title: "Hizmetler" },
    { name: "statement", title: "Stüdyo & İstatistik" },
    { name: "process", title: "Süreç" },
    { name: "testimonials", title: "Yorumlar" },
    { name: "contact", title: "İletişim" },
    { name: "seo", title: "SEO" },
  ],
  fields: [
    // HERO
    defineField({ name: "heroTitle", title: "Başlık", type: "text", rows: 2, group: "hero" }),
    defineField({ name: "heroIntro", title: "Giriş Metni", type: "text", rows: 3, group: "hero" }),
    imageField("heroImage", "Hero Görseli", "hero"),

    // FEATURED (list comes from Projects flagged "highlight on landing")
    defineField({ name: "featuredEyebrow", title: "Üst Etiket", type: "string", group: "featured" }),
    defineField({ name: "featuredTitle", title: "Başlık", type: "string", group: "featured" }),

    // SERVICES (list comes from Services flagged "highlight on landing")
    defineField({ name: "servicesEyebrow", title: "Üst Etiket", type: "string", group: "services" }),
    defineField({ name: "servicesTitle", title: "Başlık", type: "string", group: "services" }),

    // STATEMENT + STATS
    defineField({
      name: "statementTitle",
      title: "Stüdyo Cümlesi",
      type: "text",
      rows: 3,
      group: "statement",
    }),
    imageArray("statementGalleryA", "Cümle İçi Galeri 1", "statement"),
    imageArray("statementGalleryB", "Cümle İçi Galeri 2", "statement"),
    imageArray("statementCollage", "Kolaj Görselleri (5 adet)", "statement"),
    defineField({
      name: "stats",
      title: "İstatistikler",
      type: "array",
      group: "statement",
      of: [defineArrayMember({ type: "statItem" })],
    }),

    // PROCESS
    defineField({ name: "processEyebrow", title: "Üst Etiket", type: "string", group: "process" }),
    defineField({ name: "processTitle", title: "Başlık", type: "text", rows: 2, group: "process" }),
    defineField({ name: "processBody", title: "Açıklama", type: "text", rows: 5, group: "process" }),
    defineField({ name: "processBody2", title: "Açıklama (2)", type: "text", rows: 3, group: "process" }),
    defineField({
      name: "processTabs",
      title: "Sekmeler",
      type: "array",
      group: "process",
      of: [
        defineArrayMember({
          type: "object",
          fields: [
            { name: "title", title: "Başlık", type: "string" },
            { name: "image", title: "Görsel", type: "image", options: { hotspot: true } },
          ],
          preview: { select: { title: "title", media: "image" } },
        }),
      ],
    }),

    // TESTIMONIALS (list comes from Testimonials flagged "highlight on landing")
    defineField({ name: "testimonialsEyebrow", title: "Üst Etiket", type: "string", group: "testimonials" }),
    defineField({ name: "testimonialsTitle", title: "Başlık", type: "string", group: "testimonials" }),

    // CONTACT
    defineField({ name: "contactEyebrow", title: "Üst Etiket", type: "string", group: "contact" }),
    defineField({ name: "contactTitle", title: "Başlık", type: "string", group: "contact" }),
    defineField({ name: "marqueeText", title: "Kayan Yazı", type: "string", group: "contact" }),
    imageField("contactImage", "İletişim Görseli", "contact"),
    defineField({ name: "clientsTitle", title: "Logolar Başlığı", type: "string", group: "contact" }),

    // SEO
    defineField({ name: "seo", title: "SEO & Paylaşım", type: "seo", group: "seo" }),
  ],
  preview: { prepare: () => ({ title: "Ana Sayfa İçeriği" }) },
});
