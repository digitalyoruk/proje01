import { defineField, defineType } from "sanity";

export const statItem = defineType({
  name: "statItem",
  title: "İstatistik",
  type: "object",
  fields: [
    defineField({
      name: "value",
      title: "Değer",
      type: "number",
      validation: (r) => r.required(),
    }),
    defineField({
      name: "suffix",
      title: "Son Ek",
      description: "Örn. + işareti",
      type: "string",
    }),
    defineField({
      name: "label",
      title: "Etiket",
      type: "string",
      validation: (r) => r.required(),
    }),
  ],
  preview: {
    select: { title: "label", value: "value", suffix: "suffix" },
    prepare: ({ title, value, suffix }) => ({
      title: `${value ?? ""}${suffix ?? ""}`,
      subtitle: title,
    }),
  },
});
