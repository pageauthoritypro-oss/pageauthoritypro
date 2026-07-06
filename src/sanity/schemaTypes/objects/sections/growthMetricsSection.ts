import { defineType, defineField } from "sanity";
import { ActivityIcon } from "@sanity/icons";

export const growthMetricsSection = defineType({
  name: "growthMetricsSection",
  title: "Growth Metrics Section",
  type: "object",
  icon: ActivityIcon,
  fields: [
    defineField({
      name: "header",
      title: "Header Details",
      type: "headerSection",
      description: "Contains the heading, CTA buttons, and alignment options.",
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "metrics",
      title: "Metrics columns",
      type: "array",
      of: [{ type: "metricWithGraphItem" }],
      validation: (Rule) => Rule.required().min(1),
    }),
  ],
  preview: {
    select: {
      heading: "header.heading",
      subtitle: "header.description",
    },
    prepare({ heading, subtitle }: { heading?: Array<{ text: string }>; subtitle?: string }) {
      const title = heading?.map((h) => h.text).filter(Boolean).join(" ") || "Growth Metrics Section";
      return {
        title,
        subtitle
      };
    },
  },
});
