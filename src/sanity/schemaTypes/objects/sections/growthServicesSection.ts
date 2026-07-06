import { defineType, defineField } from "sanity";
import { SparkleIcon } from "@sanity/icons";
import React from "react";
import { headingTagField } from "../../constants";

export const growthServicesSection = defineType({
  name: "growthServicesSection",
  title: "Growth Services Section",
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
      title: "Service Cards",
      type: "array",
      of: [
        {
          type: "object",
          name: "growthServiceCard",
          title: "Service Card",
          fields: [
            defineField({
              name: "icon",
              title: "Icon",
              type: "imageWithAlt",
              validation: (Rule) => Rule.required(),
            }),
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
              description: "Short text description (optional).",
            }),
            defineField({
              name: "features",
              title: "Checklist Features",
              type: "array",
              of: [{ type: "checklistCheckpoint" }],
              description: "Bullet point checklist features (optional).",
            }),
          ],
          preview: {
            select: {
              title: "title",
              subtitle: "description",
              media: "icon",
            },
            prepare({ title, subtitle, media }) {
              return {
                title: title || "Card",
                subtitle: subtitle || "Service Card",
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
      const title = heading?.map((h) => h.text).filter(Boolean).join(" ") || "Growth Services Section";
      return {
        title,
        subtitle: "Growth Services Grid",
        media: React.createElement("img", {
          src: "/section-previews/growthServicesSection.webp",
          style: { width: "100%", height: "100%", objectFit: "cover" },
          alt: "Growth Services Section Preview",
        }),
      };
    },
  },
});
