import { defineType, defineField } from "sanity";
import { BlockquoteIcon } from "@sanity/icons";

export const testimonial = defineType({
  name: "testimonial",
  title: "Testimonial",
  type: "document",
  icon: BlockquoteIcon,
  fields: [
    defineField({
      name: "author",
      title: "Author / Client Name",
      type: "string",
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "designation",
      title: "Designation / Company",
      type: "string",
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "rating",
      title: "Rating (0 to 5)",
      type: "number",
      initialValue: 5,
      validation: (Rule) => Rule.min(0).max(5),
    }),
    defineField({
      name: "quote",
      title: "Quote / Testimonial Text",
      type: "text",
      rows: 4,
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "avatar",
      title: "Author Avatar / Image",
      type: "image",
      options: {
        hotspot: true,
      },
    }),
  ],
  preview: {
    select: {
      title: "author",
      subtitle: "designation",
      media: "avatar",
    },
  },
});
