import { defineField, defineType } from "sanity";

export const SOCIAL_PLATFORMS = [
  { title: "Instagram", value: "instagram" },
  { title: "Behance", value: "behance" },
  { title: "Twitter / X", value: "twitter" },
  { title: "Pinterest", value: "pinterest" },
  { title: "LinkedIn", value: "linkedin" },
  { title: "Facebook", value: "facebook" },
  { title: "YouTube", value: "youtube" },
  { title: "WhatsApp", value: "whatsapp" },
];

export const socialLink = defineType({
  name: "socialLink",
  title: "Sosyal Medya Bağlantısı",
  type: "object",
  fields: [
    defineField({
      name: "platform",
      title: "Platform",
      type: "string",
      options: { list: SOCIAL_PLATFORMS, layout: "dropdown" },
      validation: (r) => r.required(),
    }),
    defineField({
      name: "href",
      title: "Bağlantı (URL)",
      description:
        "Boş bırakılırsa bu ikon sitede HİÇBİR yerde gösterilmez. Görünmesi için tam adres girin.",
      type: "url",
      validation: (r) =>
        r.uri({ scheme: ["http", "https", "mailto", "tel"] }),
    }),
  ],
  preview: {
    select: { title: "platform", subtitle: "href" },
    prepare: ({ title, subtitle }) => ({
      title: title ?? "Sosyal",
      subtitle: subtitle || "(gizli — bağlantı yok)",
    }),
  },
});
