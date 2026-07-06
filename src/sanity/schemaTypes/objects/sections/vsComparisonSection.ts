import { defineType, defineField } from "sanity";
import { SplitVerticalIcon } from "@sanity/icons";
import React from "react";

export const vsComparisonSection = defineType({
  name: "vsComparisonSection",
  title: "VS Comparison Section",
  type: "object",
  icon: SplitVerticalIcon,
  fields: [
    defineField({
      name: "eyebrow",
      title: "Eyebrow Text",
      type: "string",
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "columns",
      title: "Comparison Columns",
      type: "array",
      of: [{ type: "comparisonItem" }],
      validation: (Rule) => Rule.required().min(2).max(2), // strictly 2 columns for VS card design
    }),
    defineField({
      name: "cta_btn",
      title: "CTA Buttons",
      type: "array",
      of: [{ type: "ctaBtn" }],
    }),
  ],
  preview: {
    select: {
      eyebrow: "eyebrow",
    },
    prepare({ eyebrow }: { eyebrow?: string }) {
      return {
        title: eyebrow || "VS Comparison Section",
        subtitle: "VS comparison section (Next.js vs WordPress)",
        media: React.createElement("img", {
          src: "/section-previews/vsComparisonSection.webp",
          style: { width: "100%", height: "100%", objectFit: "cover" },
          alt: "VS Comparison Section Preview",
        }),
      };
    },
  },
});
