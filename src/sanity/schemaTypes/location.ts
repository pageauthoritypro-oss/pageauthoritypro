import { defineType, defineField } from "sanity";
import { PinIcon } from "@sanity/icons";

export const location = defineType({
  name: "location",
  title: "Location",
  type: "document",
  icon: PinIcon,
  fields: [
    defineField({
      name: "name",
      title: "Location Name",
      type: "string",
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "slug",
      title: "Slug",
      type: "slug",
      options: {
        source: "name",
        maxLength: 96,
      },
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "area",
      title: "Area / State / Region",
      type: "string",
      validation: (Rule) => Rule.required(),
    }),
  ],
  preview: {
    select: {
      title: "name",
      subtitle: "area",
    },
  },
});
