import { defineType, defineField } from "sanity";

export const seoObject = defineType({
  name: "seo",
  title: "SEO",
  type: "object",
  fields: [
    defineField({
      name: "metaTitle",
      title: "Meta Title",
      type: "string",
      validation: (Rule) =>
        Rule.max(60).warning("Should be under 60 characters"),
    }),
    defineField({
      name: "metaDescription",
      title: "Meta Description",
      type: "text",
      rows: 3,
      validation: (Rule) =>
        Rule.max(160).warning("Should be under 160 characters"),
    }),
    defineField({
      name: "ogImage",
      title: "Open Graph Image",
      type: "image",
      options: {
        hotspot: true,
      },
    }),
    defineField({
      name: "keywords",
      title: "Keywords",
      type: "array",
      of: [{ type: "string" }],
      options: {
        layout: "tags",
      },
    }),
  ],
});
