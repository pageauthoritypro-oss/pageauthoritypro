import { defineType, defineField } from "sanity";
import { ComponentIcon } from "@sanity/icons";
import { headingTagField } from "../../constants";

export const headerSection = defineType({
  name: "headerSection",
  title: "Header Section",
  type: "object",
  icon: ComponentIcon,
  fields: [
    defineField({
      name: "eyebrow",
      title: "Eyebrow",
      description: "small text above main heading",
      type: "object",
      options: {
        collapsible: false,
      },
      fields: [
        defineField({
          name: "text",
          title: "Text",
          type: "string",
        }),
        defineField({
          name: "position",
          title: "Position",
          type: "string",
          options: {
            list: [
              { title: "Top", value: "top" },
              { title: "Center", value: "center" },
              { title: "Bottom", value: "bottom" },
            ],
          },
        })
      ]
    }),
    defineField({
      name: "heading",
      title: "Heading Parts",
      description: "Create one or two heading parts with optional highlight and variant styling. Supports '\\n' inside text for line breaks.",
      type: "array",
      of: [{ type: "headingPart" }],
      // validation: (Rule) => Rule.required().min(1),
    }),
    headingTagField,
    defineField({
      name: "description",
      title: "Description",
      type: "text",
      rows: 3,
    }),
    defineField({
      name: "cta_btn",
      title: "CTA Buttons",
      type: "array",
      of: [{ type: "ctaBtn" }],
    }),
    defineField({
      name: "cta_button_position",
      title: "CTA Button Position",
      type: "string",
      options: {
        list: [
          { title: "Top", value: "top" },
          { title: "Center", value: "center" },
          { title: "Bottom", value: "bottom" },
        ],
      },
    }),
  ],
  preview: {
    select: {
      heading: "heading",
    },
    prepare({ heading }: { heading?: Array<{ text: string }> }) {
      const title = heading?.map((h) => h.text).filter(Boolean).join(" ") || "Header Section";
      return {
        title,
      };
    },
  },
});
