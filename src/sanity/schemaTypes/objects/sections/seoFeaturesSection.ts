import { defineType, defineField } from "sanity";
import { ThLargeIcon } from "@sanity/icons";

export const seoFeaturesSection = defineType({
  name: "seoFeaturesSection",
  title: "Seo Features Section",
  type: "object",
  icon: ThLargeIcon,
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
      title: "Feature Cards",
      type: "array",
      of: [{ type: "cardWithLink" }],
      validation: (Rule) => Rule.required().min(1),
    }),
    defineField({
      name: "columns",
      title: "Desktop Columns",
      type: "number",
      options: {
        list: [
          { title: "Two", value: 2 },
          { title: "Three", value: 3 },
          { title: "Four", value: 4 },
        ],
      },
      initialValue: 2,
    }),
  ],
  preview: {
    select: {
      heading: "header.heading",
      subtitle: "header.description",
    },
    prepare({ heading, subtitle }: { heading?: Array<{ text: string }>; subtitle?: string }) {
      const title = heading?.map((h) => h.text).filter(Boolean).join(" ") || "Seo Features Section";
      return {
        title,
        subtitle: subtitle || "Features Grid",
      };
    },
  },
});
