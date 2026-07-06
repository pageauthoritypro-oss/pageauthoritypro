import { defineType, defineField } from "sanity";
import { TrendUpwardIcon } from "@sanity/icons";

export const metricWithGraphItem = defineType({
  name: "metricWithGraphItem",
  title: "Metric with Graph Item",
  type: "object",
  icon: TrendUpwardIcon,
  fields: [
    defineField({
      name: "number",
      title: "Number / Percentage",
      type: "string",
      description: "e.g., '+387%' or '10x'",
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "label",
      title: "Label / Description",
      type: "string",
      description: "e.g., 'ORGANIC LEAD GROWTH'",
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "graphImage",
      title: "Graph/Illustration Image",
      type: "imageWithAlt",
      description: "The upward trending line chart/graph image shown under the metric.",
      validation: (Rule) => Rule.required(),
    }),
  ],
  preview: {
    select: {
      title: "number",
      subtitle: "label",
      media: "graphImage",
    },
    prepare({ title, subtitle, media }: { title?: string; subtitle?: string; media?: unknown }) {
      return {
        title: title || "Metric with Graph",
        subtitle: subtitle,
        media: media as React.ReactNode,
      };
    },
  },
});
