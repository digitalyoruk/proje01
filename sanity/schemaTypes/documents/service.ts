import { defineArrayMember, defineField, defineType } from "sanity";

export const service = defineType({
  name: "service",
  title: "Hizmet",
  type: "document",
  fields: [
    defineField({
      name: "title",
      title: "Hizmet Adı",
      type: "string",
      validation: (r) => r.required(),
    }),
    defineField({
      name: "slug",
      title: "URL",
      type: "slug",
      options: { source: "title", maxLength: 96 },
      validation: (r) => r.required(),
    }),
    defineField({
      name: "icon",
      title: "İkon (Phosphor adı)",
      description:
        "Opsiyonel. Örn. Wrench, PaintRoller, Lightning, Couch, Ruler, House.",
      type: "string",
    }),
    defineField({
      name: "excerpt",
      title: "Kısa Açıklama",
      description: "Kartlarda ve liste görünümünde kullanılır.",
      type: "text",
      rows: 3,
      validation: (r) => r.required(),
    }),
    defineField({
      name: "coverImage",
      title: "Kapak Görseli",
      type: "image",
      options: { hotspot: true },
    }),
    defineField({
      name: "body",
      title: "Detaylı İçerik",
      type: "array",
      of: [defineArrayMember({ type: "block" })],
    }),
    defineField({
      name: "highlightOnLanding",
      title: "Ana sayfada öne çıkar",
      type: "boolean",
      initialValue: false,
    }),
    defineField({
      name: "order",
      title: "Sıralama",
      type: "number",
      initialValue: 0,
    }),
    defineField({ name: "seo", title: "SEO & Paylaşım", type: "seo" }),
  ],
  orderings: [
    {
      title: "Sıralama",
      name: "orderAsc",
      by: [{ field: "order", direction: "asc" }],
    },
  ],
  preview: {
    select: { title: "title", subtitle: "excerpt", media: "coverImage" },
  },
});
