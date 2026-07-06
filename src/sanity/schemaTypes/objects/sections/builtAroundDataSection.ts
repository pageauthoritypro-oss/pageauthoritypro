import { defineType, defineField } from "sanity";
import { ChartUpwardIcon } from "@sanity/icons";

export const builtAroundDataSection = defineType({
  name: "builtAroundDataSection",
  title: "Built Around Data Section",
  type: "object",
  icon: ChartUpwardIcon,
  fields: [
    defineField({
      name: "header",
      title: "Header Details",
      type: "headerSection",
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "checkpoints",
      title: "Checklist Items",
      type: "array",
      of: [{ type: "checklistCheckpoint" }],
      validation: (Rule) => Rule.required().min(1),
    }),
    defineField({
      name: "numberOfCheckPoints",
      title: "Number of Checkpoints",
      type: "number",
      options: {
        list: [
          { title: "Two", value: 2 },
          { title: "Three", value: 3 },
          { title: "Four", value: 4 },
        ],
      },
      initialValue: 3,
      description: "Number of checkpoints to display in a row",
    })
  ],
  preview: {
    select: {
      heading: "header.heading",
      subtitle: "header.description",
    },
    prepare({ heading, subtitle }: { heading?: Array<{ text: string }>; subtitle?: string }) {
      const title = heading?.map((h) => h.text).filter(Boolean).join(" ") || "Built Around Data Section";
      return {
        title,
        subtitle: subtitle || "Built Around Data Checklist",
      };
    },
  },
});
