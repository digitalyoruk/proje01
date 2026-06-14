import { defineField, defineType } from "sanity";

export const seo = defineType({
  name: "seo",
  title: "SEO & Paylaşım",
  type: "object",
  options: { collapsible: true, collapsed: true },
  fields: [
    defineField({
      name: "metaTitle",
      title: "Meta Başlık",
      description:
        "Tarayıcı sekmesinde ve Google'da görünen başlık. Boş bırakılırsa sayfa başlığı kullanılır.",
      type: "string",
      validation: (r) => r.max(70).warning("60-70 karakter idealdir."),
    }),
    defineField({
      name: "metaDescription",
      title: "Meta Açıklama",
      description: "Arama sonuçlarında görünen kısa açıklama (150-160 karakter).",
      type: "text",
      rows: 3,
      validation: (r) => r.max(180).warning("160 karakter idealdir."),
    }),
    defineField({
      name: "ogImage",
      title: "Paylaşım Görseli (OG)",
      description:
        "Sosyal medyada paylaşıldığında görünen görsel (1200x630 önerilir). Boş bırakılırsa sayfa görseli veya otomatik markalı görsel kullanılır.",
      type: "image",
      options: { hotspot: true },
    }),
    defineField({
      name: "noindex",
      title: "Arama motorlarından gizle",
      description: "Açılırsa bu sayfa Google'da indekslenmez.",
      type: "boolean",
      initialValue: false,
    }),
  ],
});
