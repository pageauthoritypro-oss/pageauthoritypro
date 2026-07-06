import { defineType, defineField } from "sanity";
import { TrendUpwardIcon } from "@sanity/icons";

export const stage = defineType({
  name: "stage",
  title: "Stage",
  type: "object",
  icon: TrendUpwardIcon,
  fields: [
    defineField({
      name: "name",
      title: "Name",
      type: "string",
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "barHeight",
      title: "Bar Height",
      type: "number",
      description: "Set the bar height as a percentage (0-100).",
      validation: (Rule) => Rule.required().min(0).max(100),
    }),
    // defineField({
    //   name: "highlight",
    //   title: "Highlight",
    //   type: "boolean",
    //   description: "Enable this to visually emphasize the bar.",
    //   initialValue: false,
    // }),
    defineField({
      name: "description",
      title: "Description",
      type: "text",
      rows: 3,
    }),
  ],
  preview: {
    select: {
      title: "name",
      barHeight: "barHeight",
      highlight: "highlight",
    },
    prepare({ title, barHeight, highlight }) {
      const subtitleParts = [`${barHeight ?? 0}%`];
      if (highlight) subtitleParts.push("Highlighted");

      return {
        title,
        subtitle: subtitleParts.join(" | "),
      };
    },
  },
});
