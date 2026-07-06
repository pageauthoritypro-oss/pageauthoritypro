import { defineType, defineField } from "sanity";
import { CheckmarkCircleIcon } from "@sanity/icons";
import { variantOptions } from "../../constants";

export const comparisonItem = defineType({
  name: "comparisonItem",
  title: "Comparison Item",
  type: "object",
  icon: CheckmarkCircleIcon,
  fields: [
    defineField({
      name: "position",
      title: "Position",
      type: "string",
      options: {
        list: [
          { title: "Left", value: "left" },
          { title: "Center", value: "center" },
          { title: "Right", value: "right" },
        ],
        layout: "radio",
        direction: "horizontal",
      },
      initialValue: "center",
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "heading",
      title: "Heading",
      type: "string",
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "icon",
      title: "Logo/Icon",
      type: "imageWithAlt",
      description: "Optional logo/icon to show at the top of the column.",
    }),
    defineField({
      name: "items",
      title: "Items",
      type: "array",
      description: "Add multiple lines to show under this heading.",
      of: [
        {
          type: "object",
          name: "comparisonFeature",
          title: "Comparison Feature",
          fields: [
            defineField({
              name: "name",
              title: "Name",
              type: "string",
              validation: (Rule) => Rule.required(),
            }),
            defineField({
              name: "icon",
              title: "Icon",
              type: "string",
              options: {
                list: [
                  { title: "Tick", value: "tick" },
                  { title: "Cross", value: "cross" },
                  { title: "CircleCheck", value: "circle-check" },
                ],
              },
            }),
          ],
        },
      ],
      validation: (Rule) => Rule.required().min(1),
    }),
    defineField({
      name: "type",
      title: "Type",
      type: "string",
      options: {
        list: variantOptions,
      },
      initialValue: "brand",
    }),
  ],
  preview: {
    select: {
      title: "heading",
      firstItem: "items.0.name",
      type: "type",
      position: "position",
    },
    prepare({ title, firstItem, type, position }) {
      return {
        title: title || firstItem,
        subtitle: [position, type].filter(Boolean).join(" | "),
      };
    },
  },
});
