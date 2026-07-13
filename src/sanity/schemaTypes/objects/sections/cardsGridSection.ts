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
      title: "Manual Case Study Selection",
      type: "array",
      of: [{ type: "reference", to: [{ type: "caseStudy" }] }],
      description: "Manually select which case studies should appear. If left empty, all items will be queried dynamically by creation date. They will appear in the exact order selected below.",
    }),
    defineField({
      name: "useManualOrder",
      title: "Use Manual Case Study Order",
      type: "boolean",
      initialValue: false,
      description: "If enabled, case studies will be displayed in the exact order selected in 'Manual Case Study Selection' above. If disabled, all items will be queried dynamically by creation date.",
    }),
    defineField({
      name: "cardsPerPage",
      title: "Cards Per Page",
      type: "number",
      options: {
        list: [
          { title: "3 Cards", value: 3 },
          { title: "6 Cards", value: 6 },
          { title: "9 Cards", value: 9 },
          { title: "12 Cards", value: 12 },
          { title: "15 Cards", value: 15 },
        ],
      },
      initialValue: 6,
      validation: (Rule) => Rule.required(),
      description: "Select how many cards to show per page when paging is active.",
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
