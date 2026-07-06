import { defineType, defineField } from "sanity";
import { ChartUpwardIcon } from "@sanity/icons";

export const resultsBlock = defineType({
  name: "resultsBlock",
  title: "Results Metrics Block",
  type: "object",
  icon: ChartUpwardIcon,
  fields: [
    defineField({
      name: "metrics",
      title: "Metrics Cards",
      type: "array",
      of: [
        {
          type: "object",
          name: "metricCard",
          title: "Metric Card",
          fields: [
            defineField({
              name: "value",
              title: "Value Label (e.g. +387%, $120k)",
              type: "string",
              validation: (Rule) => Rule.required(),
            }),
            defineField({
              name: "label",
              title: "Label / Description",
              type: "string",
              validation: (Rule) => Rule.required(),
            }),
          ],
          preview: {
            select: {
              title: "value",
              subtitle: "label",
            },
            prepare({ title, subtitle }) {
              return {
                title: title || "Metric",
                subtitle: subtitle || "Label",
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
      metrics: "metrics",
    },
    prepare({ metrics }) {
      const count = Array.isArray(metrics) ? metrics.length : 0;
      return {
        title: "Results Metrics",
        subtitle: `${count} metric card${count !== 1 ? "s" : ""}`,
      };
    },
  },
});
