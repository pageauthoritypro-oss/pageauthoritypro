import { defineType, defineField } from "sanity";
import { DocumentIcon } from "@sanity/icons";

export const resultsMattersSection = defineType({
  name: "resultsMattersSection",
  title: "Results Matters Section",
  type: "object",
  icon: DocumentIcon,
  fields: [
    defineField({
      name: "header",
      title: "Header Details",
      type: "headerSection",
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "cards",
      title: "Results Cards",
      type: "array",
      of: [{ type: "serviceItem" }],
      validation: (Rule) => Rule.required().min(1),
    }),
  ],
  preview: {
    select: {
      heading: "header.heading",
    },
    prepare({ heading }: { heading?: Array<{ text: string }> }) {
      const title = heading?.map((h) => h.text).filter(Boolean).join(" ") || "Results Matters Section";
      return {
        title,
        subtitle: "Results Matters Grid",
      };
    },
  },
});
