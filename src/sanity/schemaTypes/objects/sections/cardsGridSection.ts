import { defineType, defineField } from "sanity";
import { ThLargeIcon } from "@sanity/icons";

export const cardsGridSection = defineType({
  name: "cardsGrid",
  title: "Cards Grid Section",
  type: "object",
  icon: ThLargeIcon,
  fields: [
    defineField({
      name: "headerSection",
      title: "Header Section",
      type: "headerSection",
    }),
    defineField({
      name: "caseStudies",
      title: "Case Studies",
      type: "array",
      of: [{ type: "reference", to: [{ type: "caseStudy" }] }],
      description: "Select specific case studies to display. Leave empty to fetch latest items automatically.",
    }),
    defineField({
      name: "maxCardToShow",
      title: "Max Cards to Show",
      type: "number",
      description: "Limit the maximum number of cards to display.",
      validation: (Rule) => Rule.min(1),
    }),
    defineField({
      name: "cardVariant",
      title: "Card Variant",
      type: "string",
      options: {
        list: [
          { title: "Primary (Home Page Style)", value: "primary" },
          { title: "Secondary (Blogs Page Style)", value: "secondary" },
        ],
      },
      initialValue: "primary",
    }),
  ],
  preview: {
    select: {
      heading: "headerSection.heading",
      subtitle: "headerSection.description"
    },
    prepare({ heading, subtitle }: { heading?: Array<{ text: string }>; subtitle?: string }) {
      const title = heading?.map((h) => h.text).filter(Boolean).join(" ") || "Cards Grid Section";
      return {
        title,
        subtitle: subtitle || "Cards Grid",
      };
    },
  },
});
