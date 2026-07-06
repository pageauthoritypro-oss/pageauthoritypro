import { defineType, defineField } from "sanity";

export const navigationItem = defineType({
  name: "navigationItem",
  title: "Navigation Item",
  type: "object",
  fields: [
    defineField({
      name: "label",
      title: "Label",
      type: "string",
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "url",
      title: "URL",
      type: "string",
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "openInNewTab",
      title: "Open in New Tab",
      type: "boolean",
      initialValue: false,
    }),
    defineField({
      name: "children",
      title: "Sub Items",
      type: "array",
      of: [
        {
          type: "object",
          fields: [
            {
              name: "label",
              type: "string",
              validation: (Rule) => Rule.required(),
            },
            {
              name: "url",
              type: "string",
              validation: (Rule) => Rule.required(),
            },
            { name: "openInNewTab", type: "boolean", initialValue: false },
            {
              name: "logo",
              title: "Logo/Icon",
              type: "imageWithAlt",
            },
          ],
        },
      ],
    }),
  ],
  preview: {
    select: {
      title: "label",
      subtitle: "url",
    },
  },
});
