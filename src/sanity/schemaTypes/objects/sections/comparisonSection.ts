import { defineType, defineField } from "sanity";
import { SplitVerticalIcon } from "@sanity/icons";

export const comparisonSection = defineType({
  name: "comparisonSection",
  title: "Comparison Section",
  type: "object",
  icon: SplitVerticalIcon,
  fields: [
    defineField({
      name: "header",
      title: "Header",
      type: "headerSection",
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "columns",
      title: "Comparison Columns",
      type: "array",
      of: [{ type: "comparisonItem" }],
      validation: (Rule) => Rule.required().min(2).max(3),
    }),
    defineField({
      name: "bottomText",
      title: "Bottom Text",
      type: "text",
    })
    // defineField({
    //   name: "highlightedColumn",
    //   title: "Highlighted Column",
    //   type: "string",
    //   options: {
    //     list: [
    //       { title: "Left", value: "left" },
    //       { title: "Center", value: "center" },
    //       { title: "Right", value: "right" },
    //     ],
    //   },
    //   initialValue: "center",
    // }),
  ],
  preview: {
    select: {
      heading: "header.heading",
      subtitle: "header.description",
    },
    prepare({ heading, subtitle }: { heading?: Array<{ text: string }>; subtitle?: string }) {
      const title = heading?.map((h) => h.text).filter(Boolean).join(" ") || "Comparison Section";
      return {
        title,
        subtitle: subtitle || "Comparison section",
      };
    },
  },
});
