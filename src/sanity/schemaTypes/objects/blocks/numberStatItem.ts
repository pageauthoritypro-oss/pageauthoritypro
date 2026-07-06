import { defineType, defineField } from "sanity";
import { variantOptions } from "../../constants";

export const numberStatItem = defineType({
  name: "numberStatItem",
  title: "Number Stat Item",
  type: "object",
  fields: [
    defineField({
      name: "number",
      title: "Number",
      type: "string",
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "label",
      title: "Label",
      type: "string",
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "variant",
      title: "Variant",
      type: "string",
      options: {
        list: variantOptions,
      },
      initialValue: "brand",
    }),
  ],
  preview: {
    select: {
      title: "number",
      subtitle: "label",
    },
    prepare({ title, subtitle }: { title?: string; subtitle?: string }) {
      return {
        title: title || "Number Stat Item",
        subtitle,
      };
    },
  },
});
