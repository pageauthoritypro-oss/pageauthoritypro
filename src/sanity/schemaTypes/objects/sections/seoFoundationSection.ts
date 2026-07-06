import { defineType, defineField } from "sanity";
import { CheckmarkCircleIcon } from "@sanity/icons";
import React from "react";

export const seoFoundationSection = defineType({
  name: "seoFoundationSection",
  title: "SEO Foundation Section",
  type: "object",
  icon: CheckmarkCircleIcon,
  fields: [
    defineField({
      name: "header",
      title: "Header Details",
      type: "headerSection",
      description: "Contains the heading, description, and CTA buttons.",
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "cards",
      title: "Cards",
      type: "array",
      of: [
        {
          type: "object",
          name: "seoFoundationCard",
          title: "SEO Foundation Card",
          fields: [
            defineField({
              name: "items",
              title: "Items",
              type: "array",
              of: [
                {
                  type: "object",
                  name: "seoFoundationCardItem",
                  title: "SEO Foundation Card Item",
                  fields: [
                    defineField({
                      name: "icon",
                      title: "Icon",
                      type: "string",
                      options: {
                        list: [
                          { title: "Tick", value: "tick" },
                          { title: "Cross", value: "cross" },
                          { title: "CircleCheck", value: "circle-check" },
                        ],
                      },
                      validation: (Rule) => Rule.required(),
                    }),
                    defineField({
                      name: "text",
                      title: "Text",
                      type: "string",
                      validation: (Rule) => Rule.required(),
                    }),
                  ],
                  preview: {
                    select: {
                      firstItemText: "text",
                    },
                    prepare({ firstItemText }: { firstItemText?: string }) {
                      return {
                        title: firstItemText || "SEO Foundation Card Item",
                      };
                    },
                  },
                },
              ],
              validation: (Rule) => Rule.required().min(1),
            }),
          ],
          preview: {
            prepare() {
              return {
                title: "SEO Foundation Card",
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
      heading: "header.heading",
      subtitle: "header.description",
    },
    prepare({ heading, subtitle }: { heading?: Array<{ text: string }>; subtitle?: string }) {
      const title = heading?.map((h) => h.text).filter(Boolean).join(" ") || "SEO Foundation Section";
      return {
        title,
        subtitle: subtitle || "SEO Foundation Grid",
        media: React.createElement("img", {
          src: "/section-previews/seoFoundationSection.webp",
          style: { width: "100%", height: "100%", objectFit: "cover" },
          alt: "SEO Foundation Section Preview",
        }),
      };
    },
  },
});
