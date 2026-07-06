import { defineType, defineField } from "sanity";
import { DashboardIcon } from "@sanity/icons";

export const card = defineType({
  name: "card",
  title: "Card",
  type: "object",
  icon: DashboardIcon,
  fields: [
    defineField({
      name: "title",
      title: "Title",
      type: "string",
      validation: (Rule) => Rule.required(),
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
    defineField({
      name: "badge",
      title: "Badge",
      type: "string",
    }),
  ],
  preview: {
    select: {
      title: "title",
      subtitle: "badge",
    },
  },
});
