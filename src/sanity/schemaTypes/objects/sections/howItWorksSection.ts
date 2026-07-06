import { defineType, defineField } from "sanity";
import { PlayIcon } from "@sanity/icons";
import { headingTagField } from "../../constants";

export const howItWorksSection = defineType({
  name: "howItWorksSection",
  title: "How It Works Section",
  type: "object",
  icon: PlayIcon,
  fields: [
    defineField({
      name: "heading",
      title: "Heading Parts",
      description: "Create one or two heading parts with optional highlight and variant styling.",
      type: "array",
      of: [{ type: "headingPart" }],
      // validation: (Rule) => Rule.required().min(1),
    }),
    headingTagField,
    defineField({
      name: "cards",
      title: "Cards",
      type: "array",
      of: [
        {
          type: "object",
          name: "growthPhaseProcessCard",
          title: "Growth Phase Process Card",
          fields: [
            defineField({
              name: "icon",
              title: "Icon",
              type: "imageWithAlt",
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
            }),
          ],
          preview: {
            select: {
              title: "title",
              subtitle: "badgeNumber",
            },
            prepare({ title, subtitle }) {
              return {
                title: title || "Badge Card",
                subtitle: subtitle ? `Number: ${subtitle}` : "",
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
      const title = heading?.map((h) => h.text).filter(Boolean).join(" ") || "How It Works Section";
      return {
        title,
        subtitle: subtitle || "How It Works",
      };
    },
  },
});
