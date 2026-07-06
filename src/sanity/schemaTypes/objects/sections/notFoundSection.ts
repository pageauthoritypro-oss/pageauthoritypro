import { defineType, defineField } from "sanity";
import { WarningOutlineIcon } from "@sanity/icons";

export const notFoundSection = defineType({
  name: "notFoundSection",
  title: "Not Found Section (404)",
  type: "object",
  icon: WarningOutlineIcon,
  fields: [
    defineField({
      name: "title",
      title: "Title",
      type: "string",
      initialValue: "404",
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "description",
      title: "Description",
      type: "text",
      rows: 3,
      initialValue: "The page you are looking for cannot be found.",
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "ctaButtons",
      title: "CTA Buttons",
      type: "array",
      of: [{ type: "ctaBtn" }],

    }),
  ],
  preview: {
    select: {
      title: "title",
      subtitle: "description",
    },
    prepare({ title, subtitle }) {
      return {
        title: title || "404 Not Found Section",
        subtitle: subtitle || "Not Found Section",
      };
    },
  },
});
