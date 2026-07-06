import { defineType, defineField } from "sanity";
import { TrendUpwardIcon } from "@sanity/icons";

export const growthGraph = defineType({
  name: "growthGraph",
  title: "Growth Graph",
  type: "object",
  icon: TrendUpwardIcon,
  fields: [
    defineField({
      name: "stages",
      title: "Stages",
      type: "array",
      of: [{ type: "stage" }],
      validation: (Rule) => Rule.required().min(1),
    }),
  ],
  preview: {
    prepare() {
      return {
        title: "Growth Graph",
      };
    },
  },
});
