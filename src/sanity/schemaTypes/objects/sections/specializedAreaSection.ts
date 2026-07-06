import { defineType, defineField } from "sanity";
import { SparkleIcon } from "@sanity/icons";

export const specializedAreaSection = defineType({
  name: "specializedAreaSection",
  title: "Specialized Area Section",
  type: "object",
  icon: SparkleIcon,
  fields: [
    defineField({
      name: "header",
      title: "Header",
      type: "headerSection",
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "areas",
      title: "Specialized Areas",
      type: "array",
      of: [{ type: "card" }],
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
      initialValue: 4,
    }),
  ],
  preview: {
    select: {
      heading: "header.heading",
      subtitle: "header.description",
    },
    prepare({ heading, subtitle }: { heading?: Array<{ text: string }>; subtitle?: string }) {
      const title = heading?.map((h) => h.text).filter(Boolean).join(" ") || "Specialized Area Section";
      return {
        title,
        subtitle: subtitle || "Specialized area section",
      };
    },
  },
});
