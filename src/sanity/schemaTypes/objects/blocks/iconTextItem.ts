import { defineType, defineField } from "sanity";

export const iconTextItem = defineType({
  name: "iconTextItem",
  title: "Icon Text Item",
  type: "object",
  fields: [
    defineField({
      name: "icon",
      title: "Icon",
      type: "imageWithAlt",
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "label",
      title: "Label",
      type: "string",
      description: "Short text shown next to the icon.",
    }),
  ],
  preview: {
    select: {
      title: "label",
      media: "icon",
    },
    prepare({ title, media }) {
      return {
        title: title || "Icon Text Item",
        media: media,
      };
    },
  },
});
