import { defineType, defineField } from "sanity";
import { TrendUpwardIcon } from "@sanity/icons";

export const graphSection = defineType({
  name: "graphSection",
  title: "Graph Section",
  type: "object",
  icon: TrendUpwardIcon,
  fields: [
    defineField({
      name: "header",
      title: "Header",
      type: "headerSection",
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "graph",
      title: "Growth Graph",
      type: "growthGraph",
      validation: (Rule) => Rule.required(),
    }),
  ],
  preview: {
    select: {
      heading: "header.heading",
      subtitle: "header.description",
    },
    prepare({ heading, subtitle }: { heading?: Array<{ text: string }>; subtitle?: string }) {
      const title = heading?.map((h) => h.text).filter(Boolean).join(" ") || "Graph Section";
      return {
        title,
        subtitle: subtitle || "Graph section",
      };
    },
  },
});
