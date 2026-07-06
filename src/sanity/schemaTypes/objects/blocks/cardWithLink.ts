import { defineType, defineField } from "sanity";
import { DashboardIcon } from "@sanity/icons";

export const cardWithLink = defineType({
  name: "cardWithLink",
  title: "Card with Link",
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
      name: "link",
      title: "Action Link",
      type: "link",
      description: "Optional CTA or Learn More link for the card.",
    }),
  ],
  preview: {
    select: {
      title: "title",
      subtitle: "link.url",
      media: "icon",
    },
    prepare({ title, subtitle, media }: { title?: string; subtitle?: string; media?: unknown }) {
      return {
        title: title || "Card with Link",
        subtitle: subtitle ? `Link: ${subtitle}` : "No link set",
        media: media as React.ReactNode,
      };
    },
  },
});
