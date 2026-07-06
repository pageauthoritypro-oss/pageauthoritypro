import { defineType, defineField } from "sanity";

export const serviceItem = defineType({
  name: "serviceItem",
  title: "Service Item",
  type: "object",
  fields: [
    defineField({
      name: "title",
      title: "Title",
      type: "string",
    }),
    defineField({
      name: "description",
      title: "Description",
      type: "text",
      rows: 3,
    }),
    defineField({
      name: "icon",
      title: "Icon",
      type: "imageWithAlt",
      validation: (Rule) => Rule.required(),
    }),
  ],
  preview: {
    select: {
      title: "title",
      subtitle: "description",
      media: "icon",
    },
  },
});
