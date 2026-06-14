import { defineArrayMember, defineField, defineType } from "sanity";

const childItem = defineArrayMember({
  name: "navChild",
  title: "Alt Menü Öğesi",
  type: "object",
  fields: [
    defineField({
      name: "label",
      title: "Etiket",
      type: "string",
      validation: (r) => r.required(),
    }),
    defineField({
      name: "href",
      title: "Bağlantı",
      description: "Örn. /hakkinda veya https://...",
      type: "string",
      validation: (r) => r.required(),
    }),
  ],
  preview: { select: { title: "label", subtitle: "href" } },
});

export const navItem = defineType({
  name: "navItem",
  title: "Menü Öğesi",
  type: "object",
  fields: [
    defineField({
      name: "label",
      title: "Etiket",
      type: "string",
      validation: (r) => r.required(),
    }),
    defineField({
      name: "href",
      title: "Bağlantı",
      description: "Örn. / veya /hizmetler veya https://...",
      type: "string",
      validation: (r) => r.required(),
    }),
    defineField({
      name: "autoChildrenFromServices",
      title: "Alt menüyü hizmetlerden oluştur",
      description:
        "Açılırsa bu menünün altına tüm hizmetler otomatik eklenir (Hizmetler için kullanın).",
      type: "boolean",
      initialValue: false,
    }),
    defineField({
      name: "children",
      title: "Alt Menü",
      type: "array",
      of: [childItem],
    }),
  ],
  preview: {
    select: { title: "label", subtitle: "href" },
  },
});
