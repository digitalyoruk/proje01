import { defineArrayMember, defineField, defineType } from "sanity";

const CATEGORIES = [
  { title: "Tadilat", value: "tadilat" },
  { title: "İç Mimarlık", value: "ic-mimari" },
  { title: "Tasarım", value: "tasarim" },
  { title: "Rehber", value: "rehber" },
];

export const blogPost = defineType({
  name: "blogPost",
  title: "Blog Yazısı",
  type: "document",
  groups: [
    { name: "content", title: "İçerik", default: true },
    { name: "meta", title: "Yayın" },
    { name: "seo", title: "SEO" },
  ],
  fields: [
    defineField({
      name: "title",
      title: "Başlık",
      type: "string",
      group: "content",
      validation: (r) => r.required(),
    }),
    defineField({
      name: "slug",
      title: "URL",
      type: "slug",
      group: "content",
      options: { source: "title", maxLength: 96 },
      validation: (r) => r.required(),
    }),
    defineField({
      name: "excerpt",
      title: "Özet",
      description: "Liste görünümü ve meta açıklama için kısa özet (150-160 karakter ideal).",
      type: "text",
      rows: 3,
      group: "content",
      validation: (r) => r.required(),
    }),
    defineField({
      name: "coverImage",
      title: "Kapak Görseli",
      description:
        "Opsiyonel. Boş bırakılırsa başlık ve kategoriye göre otomatik markalı kapak oluşturulur (site + sosyal paylaşım).",
      type: "image",
      group: "content",
      options: { hotspot: true },
    }),
    defineField({
      name: "body",
      title: "İçerik",
      type: "array",
      group: "content",
      of: [defineArrayMember({ type: "block" })],
      validation: (r) => r.required().min(1),
    }),
    defineField({
      name: "category",
      title: "Kategori",
      type: "string",
      group: "meta",
      options: { list: CATEGORIES, layout: "dropdown" },
    }),
    defineField({
      name: "authorName",
      title: "Yazar",
      type: "string",
      group: "meta",
      initialValue: "Proje 01",
    }),
    defineField({
      name: "publishedAt",
      title: "Yayın Tarihi",
      type: "datetime",
      group: "meta",
      validation: (r) => r.required(),
      initialValue: () => new Date().toISOString(),
    }),
    defineField({ name: "seo", title: "SEO & Paylaşım", type: "seo", group: "seo" }),
  ],
  orderings: [
    {
      title: "Yayın Tarihi (yeniden eskiye)",
      name: "publishedDesc",
      by: [{ field: "publishedAt", direction: "desc" }],
    },
  ],
  preview: {
    select: {
      title: "title",
      subtitle: "excerpt",
      media: "coverImage",
      date: "publishedAt",
    },
    prepare: ({ title, subtitle, media, date }) => ({
      title,
      subtitle: date
        ? `${new Date(date).toLocaleDateString("tr-TR")} · ${subtitle?.slice(0, 60) ?? ""}`
        : subtitle,
      media,
    }),
  },
});
