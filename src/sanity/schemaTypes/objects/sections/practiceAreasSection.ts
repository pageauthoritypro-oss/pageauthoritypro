import { defineType, defineField } from "sanity";
import { SparkleIcon } from "@sanity/icons";
import React from "react";
import { headingTagField } from "../../constants";

export const practiceAreasSection = defineType({
  name: "practiceAreasSection",
  title: "Practice Areas Section",
  type: "object",
  icon: SparkleIcon,
  fields: [
    defineField({
      name: "heading",
      title: "Heading Parts",
      description: "Create one or two heading parts with optional highlight and variant styling. Supports '\\n' inside text for line breaks.",
      type: "array",
      of: [{ type: "headingPart" }],
    }),
    headingTagField,
    defineField({
      name: "cards",
      title: "Practice Area Cards",
      type: "array",
      of: [
        {
          type: "object",
          name: "practiceAreaCard",
          title: "Practice Area Card",
          fields: [
            defineField({
              name: "icon",
              title: "Icon",
              type: "imageWithAlt",
              validation: (Rule) => Rule.required(),
            }),
            defineField({
              name: "eyebrow",
              title: "Eyebrow",
              type: "string",
              description: "Small uppercase category text (e.g., 'SEO ONLY')",
            }),
            defineField({
              name: "title",
              title: "Title",
              type: "string",
              validation: (Rule) => Rule.required(),
            }),
            defineField({
              name: "details",
              title: "Details/Description",
              type: "richText",
              description: "Details of the practice area pricing or description (e.g., '$1,000 - $3,000/month')",
            }),
          ],
          preview: {
            select: {
              title: "title",
              subtitle: "eyebrow",
              media: "icon",
            },
            prepare({ title, subtitle, media }) {
              return {
                title: title || "Card",
                subtitle: subtitle || "Practice Area Card",
                media: media,
              };
            },
          },
        },
      ],
      validation: (Rule) => Rule.required().min(1),
    }),
    defineField({
      name: "cta",
      title: "CTA Button",
      type: "ctaBtn",
      description: "Call to action button at the bottom of the section.",
    }),
  ],
  preview: {
    select: {
      heading: "heading",
    },
    prepare({ heading }: { heading?: Array<{ text: string }> }) {
      const title = heading?.map((h) => h.text).filter(Boolean).join(" ") || "Practice Areas Section";
      return {
        title,
        subtitle: "Practice Areas Grid",
        media: React.createElement("img", {
          src: "/section-previews/practiceAreasSection.webp",
          style: { width: "100%", height: "100%", objectFit: "cover" },
          alt: "Practice Areas Section Preview",
        }),
      };
    },
  },
});
