import { defineType, defineField } from "sanity";
import { WarningFilledIcon } from "@sanity/icons";
import React from "react";

export const websitesUnderperformSection = defineType({
  name: "websitesUnderperformSection",
  title: "Websites Underperform Section",
  type: "object",
  icon: WarningFilledIcon,
  fields: [
    defineField({
      name: "heading",
      title: "Heading",
      type: "headerSection",
      description: "Section title (e.g. 'Why Most Law Firm Websites Underperform')",
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "cards",
      title: "Cards",
      type: "array",
      of: [
        {
          type: "object",
          name: "underperformCard",
          title: "Underperform Card",
          fields: [
            defineField({
              name: "title",
              title: "Title",
              type: "string",
              validation: (Rule) => Rule.required(),
            }),
            defineField({
              name: "icon",
              title: "Icon",
              type: "imageWithAlt",
              validation: (Rule) => Rule.required(),
            }),
          ],
        },
      ],
      validation: (Rule) => Rule.required().min(1).max(6),
      description: "Exactly 6 cards are required (4 for Row 1, 2 for Row 2).",
    }),
    defineField({
      name: "footerText",
      title: "Footer Text",
      type: "string",
      description: "Centered text at the bottom (e.g. 'A better foundation creates better results.')",
    }),
  ],
  preview: {
    select: {
      heading: "heading.heading",
      subtitle: "heading.description",
    },
    prepare({ heading, subtitle }: { heading?: Array<{ text: string }>; subtitle?: string }) {
      const title = heading?.map((h) => h.text).filter(Boolean).join(" ") || "Websites Underperform Section";
      return {
        title,
        subtitle: subtitle || "Section showing underperforming website elements",
        media: React.createElement("img", {
          src: "/section-previews/websitesUnderperformSection.webp",
          style: { width: "100%", height: "100%", objectFit: "cover" },
          alt: "Websites Underperform Section Preview",
        }),
      };
    },
  },
});
