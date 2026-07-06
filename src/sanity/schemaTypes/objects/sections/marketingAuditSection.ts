import { defineType, defineField } from "sanity";
import { ClipboardIcon } from "@sanity/icons";
import React from "react";
import { headingTagField } from "../../constants";

export const marketingAuditSection = defineType({
  name: "marketingAuditSection",
  title: "Marketing Audit Section",
  type: "object",
  icon: ClipboardIcon,
  fields: [
    defineField({
      name: "eyebrow",
      title: "Eyebrow",
      type: "string",
      description: "Additional context above the heading (e.g. 'Not sure where to begin?')",
    }),
    defineField({
      name: "heading",
      title: "Heading Parts",
      description: "Create one or two heading parts with optional highlight and variant styling. Supports '\\n' inside text for line breaks.",
      type: "array",
      of: [{ type: "headingPart" }],
    }),
    headingTagField,
    defineField({
      name: "description",
      title: "Description",
      type: "text",
      rows: 3,
      description: "The main text description below the heading.",
    }),
    defineField({
      name: "auditItems",
      title: "Audit Checklist Items",
      description: "List of digital marketing audits offered.",
      type: "array",
      of: [{ type: "checklistCheckpoint" }],
      validation: (Rule) => Rule.required().min(1),
    }),
    defineField({
      name: "pricing",
      title: "Pricing Block",
      type: "object",
      fields: [
        defineField({
          name: "label",
          title: "Label",
          type: "string",
        }),
        defineField({
          name: "price",
          title: "Price",
          type: "string",
        }),
      ],
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
      description: "description",
    },
    prepare({ heading, description }: { heading?: Array<{ text: string }>; description?: string }) {
      const title = heading?.map((h) => h.text).filter(Boolean).join(" ") || "Marketing Audit Section";
      return {
        title,
        subtitle: description || "Digital Marketing Audits",
        media: React.createElement("img", {
          src: "/section-previews/marketingAuditSection.webp",
          style: { width: "100%", height: "100%", objectFit: "cover" },
          alt: "Marketing Audit Section Preview",
        }),
      };
    },
  },
});
