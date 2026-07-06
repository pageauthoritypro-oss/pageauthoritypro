import { defineType, defineField } from "sanity";
import { variantOptions } from "../../constants";

export const caseStudyMetric = defineType({
  name: "caseStudyMetric",
  title: "Case Study Metric",
  type: "object",
  fields: [
    defineField({
      name: "value",
      title: "Value",
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
      name: "isHighlighted",
      title: "Is Highlighted",
      type: "boolean",
      initialValue: false,
    }),
    defineField({
      name: "variant",
      title: "Variant",
      type: "string",
      hidden: ({ parent }: { parent?: { isHighlighted?: boolean } }) => !parent?.isHighlighted,
      options: {
        list: variantOptions,
      },
      initialValue: "brand",
    }),
  ],
  preview: {
    select: {
      title: "value",
      subtitle: "label",
    },
    prepare({ title, subtitle }: { title?: string; subtitle?: string }) {
      return {
        title: title || "Metric",
        subtitle,
      };
    },
  },
});
