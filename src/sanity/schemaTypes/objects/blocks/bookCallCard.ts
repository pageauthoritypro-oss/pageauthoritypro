import { defineType, defineField } from "sanity";
import { CalendarIcon } from "@sanity/icons";

export const bookCallCard = defineType({
  name: "bookCallCard",
  title: "Book Call Card",
  type: "object",
  icon: CalendarIcon,
  fields: [
    defineField({
      name: "icon",
      title: "Icon",
      type: "imageWithAlt",
    }),
    defineField({
      name: "heading",
      title: "Heading",
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
      name: "ctas",
      title: "CTAs",
      type: "array",
      of: [{ type: "ctaBtn" }],
      validation: (Rule) => Rule.min(1),
    }),
  ],
});
