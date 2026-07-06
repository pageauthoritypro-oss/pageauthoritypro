import { defineType, defineField } from "sanity";
import { TagIcon } from "@sanity/icons";

export const caseStudyTag = defineType({
  name: "caseStudyTag",
  title: "Case Study Tag",
  type: "document",
  icon: TagIcon,
  fields: [
    defineField({
      name: "title",
      title: "Title",
      type: "string",
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "slug",
      title: "Slug",
      type: "slug",
      options: {
        source: "title",
        maxLength: 96,
      },
      validation: (Rule) => Rule.required(),
    }),
  ],
});
