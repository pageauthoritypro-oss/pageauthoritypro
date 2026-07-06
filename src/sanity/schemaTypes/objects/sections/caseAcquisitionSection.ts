import { defineType, defineField } from "sanity";
import { CaseIcon } from "@sanity/icons";
import React from "react";

export const caseAcquisitionSection = defineType({
  name: "caseAcquisitionSection",
  title: "Case Acquisition Section",
  type: "object",
  icon: CaseIcon,
  fields: [
    defineField({
      name: "headerSection",
      title: "Header Section",
      type: "headerSection",
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "cards",
      title: "Cards",
      type: "array",
      of: [
        {
          type: "object",
          name: "caseAcquisitionCard",
          title: "Case Acquisition Card",
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
          ],
          preview: {
            select: {
              title: "title",
              media: "icon",
            },
            prepare({ title, media }) {
              return {
                title: title || "Card",
                media: media,
              };
            },
          },
        },
      ],
      validation: (Rule) => Rule.required().min(1),
    }),
  ],
  preview: {
    select: {
      heading: "headerSection.heading",
      subtitle: "headerSection.description",
    },
    prepare({ heading, subtitle }: { heading?: Array<{ text: string }>; subtitle?: string }) {
      const title = heading?.map((h) => h.text).filter(Boolean).join(" ") || "Case Acquisition Platform Section";
      return {
        title,
        subtitle: subtitle || "Case Acquisition Section",
        media: React.createElement("img", {
          src: "/section-previews/caseAcquisitionSection.webp",
          style: { width: "100%", height: "100%", objectFit: "cover" },
          alt: "Case Acquisition Section Preview",
        }),
      };
    },
  },
});
