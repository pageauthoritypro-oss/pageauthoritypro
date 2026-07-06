import { defineType, defineField } from "sanity";
import { BlockquoteIcon } from "@sanity/icons";

export const testimonialBlock = defineType({
  name: "testimonialBlock",
  title: "Testimonial Block",
  type: "object",
  icon: BlockquoteIcon,
  fields: [
    defineField({
      name: "title",
      title: "Title",
      type: "string",
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "testimonials",
      title: "Testimonials",
      type: "array",
      of: [
        {
          type: "reference",
          to: [{ type: "testimonial" }],
        },
      ],
      validation: (Rule) => Rule.required().min(1),
    }),
  ],
  preview: {
    select: {
      title: "title",
      items: "testimonials",
    },
    prepare({ title, items }) {
      const count = Array.isArray(items) ? items.length : 0;
      return {
        title: title || "Testimonials Block",
        subtitle: `${count} testimonial reference${count !== 1 ? "s" : ""}`,
      };
    },
  },
});
