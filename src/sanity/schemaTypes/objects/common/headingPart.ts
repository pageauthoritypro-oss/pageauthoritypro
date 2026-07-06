import { defineType, defineField } from "sanity";
import { variantOptions } from "../../constants";

export const headingPart = defineType({
  name: "headingPart",
  title: "Heading Part",
  type: "object",
  fields: [
    defineField({
      name: "text",
      title: "Text",
      description: "Supports '\\n' to insert line breaks.",
      type: "string",
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "isHighlighted",
      title: "Highlight",
      type: "boolean",
      initialValue: false,
    }),
    defineField({
      name: "variant",
      title: "Variant",
      type: "string",
      hidden: ({ parent }) => !parent?.isHighlighted,
      options: {
        list: variantOptions,
      },
      initialValue: "brand",
    }),
  ],
  preview: {
    select: {
      title: "text",
      variant: "variant",
      isHighlighted: "isHighlighted",
    },
    prepare({
      title,
      variant,
      isHighlighted,
    }: {
      title?: string;
      variant?: string;
      isHighlighted?: boolean;
    }) {
      const parts = [];
      if (isHighlighted && variant) parts.push(`Variant: ${variant}`);
      return {
        title: title || "Heading Part",
        subtitle: parts.length > 0 ? parts.join(" | ") : "",
      };
    },
  },
});
