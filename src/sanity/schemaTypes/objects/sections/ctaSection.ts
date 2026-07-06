import { defineType, defineField } from "sanity";
import { ArrowRightIcon } from "@sanity/icons";

export const ctaSection = defineType({
  name: "ctaSection",
  title: "CTA Section",
  type: "object",
  icon: ArrowRightIcon,
  fields: [
    defineField({
      name: "header",
      title: "Header",
      type: "headerSection",
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "features",
      title: "Feature Items",
      description: "Small icon plus text blocks shown in the CTA area.",
      type: "array",
      of: [{ type: "iconTextItem" }],
      validation: (Rule) => Rule.max(6),
    }),
    defineField({
      name: "supportingText",
      title: "Supporting Text",
      type: "richText",
    }),
    defineField({
      name: "backgroundImage",
      title: "Background Image",
      type: "imageWithAlt",
    }),
  ],
  preview: {
    select: {
      heading: "header.heading",
      subtitle: "header.description",
      media: "backgroundImage",
    },
    prepare({ heading, subtitle, media }: { heading?: Array<{ text: string }>; subtitle?: string; media?: unknown }) {
      const title = heading?.map((h) => h.text).filter(Boolean).join(" ") || "CTA Section";
      return {
        title,
        subtitle: subtitle || "CTA Section",
        media: media as React.ReactNode,
      };
    },
  },
});
