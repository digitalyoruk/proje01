import { defineArrayMember, defineField, defineType } from "sanity";

export const siteSettings = defineType({
  name: "siteSettings",
  title: "Site Ayarları",
  type: "document",
  groups: [
    { name: "brand", title: "Marka", default: true },
    { name: "contact", title: "İletişim" },
    { name: "nav", title: "Menü" },
    { name: "social", title: "Sosyal Medya" },
    { name: "seo", title: "SEO" },
  ],
  fields: [
    defineField({
      name: "wordmark",
      title: "Logo Yazısı",
      description: "Üst menüde görünen marka adı (ör. proje01)",
      type: "string",
      group: "brand",
    }),
    defineField({
      name: "logo",
      title: "Logo Görseli",
      type: "image",
      options: { hotspot: true },
      group: "brand",
    }),
    defineField({
      name: "email",
      title: "E-posta",
      type: "string",
      group: "contact",
    }),
    defineField({
      name: "phone",
      title: "Telefon",
      type: "string",
      group: "contact",
    }),
    defineField({
      name: "address",
      title: "Adres",
      type: "text",
      rows: 2,
      group: "contact",
    }),
    defineField({
      name: "legal",
      title: "Telif Metni",
      type: "string",
      group: "brand",
    }),
    defineField({
      name: "builtBy",
      title: "Yapımcı",
      type: "string",
      group: "brand",
    }),
    defineField({
      name: "footerBlurb",
      title: "Footer Açıklaması",
      type: "text",
      rows: 3,
      group: "brand",
    }),
    defineField({
      name: "nav",
      title: "Ana Menü",
      description: "Üst menüde görünen öğeler (sırayla).",
      type: "array",
      group: "nav",
      of: [defineArrayMember({ type: "navItem" })],
    }),
    defineField({
      name: "socials",
      title: "Sosyal Medya",
      description:
        "Bağlantısı boş bırakılan platformlar sitede hiçbir yerde gösterilmez.",
      type: "array",
      group: "social",
      of: [defineArrayMember({ type: "socialLink" })],
    }),
    defineField({
      name: "defaultSeo",
      title: "Varsayılan SEO & Paylaşım",
      description:
        "Bir sayfada özel SEO girilmediğinde kullanılacak varsayılan değerler. Paylaşım görseli boş bırakılırsa otomatik markalı görsel devreye girer.",
      type: "seo",
      group: "seo",
    }),
  ],
  preview: { prepare: () => ({ title: "Site Ayarları" }) },
});
