import { defineType, defineField } from "sanity";
import { BarChartIcon } from "@sanity/icons";

export const numbersSection = defineType({
  name: "numbersSection",
  title: "Numbers Section",
  type: "object",
  icon: BarChartIcon,
  fields: [
    defineField({
      name: "heading",
      title: "Heading",
      type: "text",
      rows: 1,
    }),
    defineField({
      name: "statItems",
      title: "Statistics",
      type: "array",
      of: [{ type: "numberStatItem" }],
      validation: (Rule) => Rule.required().min(1),
    }),
    defineField({
      name: "extraSpacingBottom",
      title: "Extra Spacing Bottom",
      type: "boolean",
      description: "If enabled, adds extra spacing at the bottom of the numbers section.",
      initialValue: false,
    }),
  ],
  preview: {
    select: {
      title: "heading",
      subtitle: "statItems.0.label",
    },
    prepare({ title, subtitle }: { title?: string; subtitle?: string }) {
      return {
        title: title || "Numbers Section",
        subtitle: subtitle ? `Example stat: ${subtitle}` : undefined,
      };
    },
  },
});
