import { defineType, defineField, ValidationContext } from "sanity";
import { ImageIcon } from "@sanity/icons";

export const imageWithAlt = defineType({
  name: "imageWithAlt",
  title: "Image with Alt Text",
  type: "image",
  icon: ImageIcon,
  options: {
    hotspot: true,
  },
  fields: [
    defineField({
      name: "alt",
      title: "Alternative Text",
      type: "string",
      validation: (Rule) =>
        Rule.custom((value: string | undefined, context: ValidationContext) => {
          const parent = context.parent as { asset?: unknown; iconSvg?: string } | undefined;
          if (parent?.asset && !value) {
            return "Alternative text is required when an image is uploaded.";
          }
          return true;
        }),
    }),
    defineField({
      name: "iconSvg",
      title: "Option Icon SVG",
      type: "text",
      description: "Raw SVG string override.",
      rows: 3,
    }),
  ],
  preview: {
    select: {
      title: "alt",
      media: "asset",
    },
  },
});
