import { defineType, defineField } from "sanity";
import { StarIcon } from "@sanity/icons";

export const heroSection = defineType({
  name: "heroSection",
  title: "Hero Section",
  type: "object",
  icon: StarIcon,
  fields: [
    defineField({
      name: "header",
      title: "Header",
      type: "headerSection",
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "eyebrow",
      title: "Eyebrow",
      type: "string",
      description: "Small label above the main heading.",
    }),
    defineField({
      name: "heroImage",
      title: "Hero Image",
      type: "imageWithAlt",
    }),
    defineField({
      name: "backgroundScript",
      title: "Background Script",
      type: "text",
      description:
        "Optional script tag content for adding background animations or effects. Ensure the script is safe and does not contain malicious code.",
      rows: 10,
    }),
  ],
  preview: {
    select: {
      heading: "header.heading",
      subtitle: "header.description",
      media: "heroImage",
    },
    prepare({ heading, subtitle, media }: { heading?: Array<{ text: string }>; subtitle?: string; media?: unknown }) {
      const title = heading?.map((h) => h.text).filter(Boolean).join(" ") || "Hero Section";
      return {
        title,
        subtitle,
        media: media as React.ReactNode,
      };
    },
  },
});
