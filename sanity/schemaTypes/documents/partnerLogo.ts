import { defineField, defineType } from "sanity";

export const partnerLogo = defineType({
  name: "partnerLogo",
  title: "İş Ortağı Logosu",
  type: "document",
  fields: [
    defineField({
      name: "name",
      title: "Ad",
      type: "string",
      validation: (r) => r.required(),
    }),
    defineField({
      name: "logo",
      title: "Logo",
      type: "image",
      options: { hotspot: true },
      validation: (r) => r.required(),
    }),
    defineField({
      name: "href",
      title: "Bağlantı (opsiyonel)",
      type: "url",
    }),
    defineField({
      name: "order",
      title: "Sıralama",
      type: "number",
      initialValue: 0,
    }),
  ],
  orderings: [
    {
      title: "Sıralama",
      name: "orderAsc",
      by: [{ field: "order", direction: "asc" }],
    },
  ],
  preview: {
    select: { title: "name", media: "logo" },
  },
});
