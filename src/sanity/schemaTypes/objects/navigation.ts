import { defineType, defineField } from "sanity";
import { linkFields } from "./link";

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
    ...linkFields,
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
          name: "navigationChild",
          fields: [
            {
              name: "label",
              type: "string",
              validation: (Rule) => Rule.required(),
            },
            ...linkFields,
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
      linkType: "linkType",
      url: "url",
      internalPageTitle: "internalPage.title",
    },
    prepare({ title, linkType, url, internalPageTitle }) {
      const dest = linkType === "internal" ? `Page: ${internalPageTitle || "Selected Reference"}` : `URL: ${url || ""}`;
      return {
        title: title || "Navigation Item",
        subtitle: dest,
      };
    },
  },
});
