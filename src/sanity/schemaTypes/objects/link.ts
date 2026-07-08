import { defineType, defineField } from "sanity";
import { LinkIcon } from "@sanity/icons";

export const linkFields = [
  defineField({
    name: "linkType",
    title: "Link Type",
    type: "string",
    options: {
      list: [
        { title: "Internal Page", value: "internal" },
        { title: "External URL", value: "external" },
      ],
      layout: "radio",
    },
    initialValue: "internal",
  }),
  defineField({
    name: "internalPage",
    title: "Internal Page Reference",
    type: "reference",
    to: [{ type: "pages" }],
    hidden: ({ parent }) => (parent as any)?.linkType !== "internal",
    validation: (Rule) =>
      Rule.custom((value, context) => {
        const parent = context.parent as { linkType?: string } | undefined;
        if (parent?.linkType === "internal" && !value) {
          return "Internal Page Reference is required";
        }
        return true;
      }),
  }),
  defineField({
    name: "url",
    title: "External URL",
    type: "string",
    hidden: ({ parent }) => (parent as any)?.linkType !== "external",
    validation: (Rule) =>
      Rule.custom((value, context) => {
        const parent = context.parent as { linkType?: string } | undefined;
        if (parent?.linkType === "external" && !value) {
          return "External URL is required";
        }
        return true;
      }),
  }),
];

export const link = defineType({
  name: "link",
  title: "Link",
  type: "object",
  icon: LinkIcon,
  fields: [
    defineField({
      name: "label",
      title: "Label",
      type: "string",
    }),
    ...linkFields,
    defineField({
      name: "target",
      title: "Target",
      type: "string",
      options: {
        list: [
          { value: "_self", title: "Self" },
          { value: "_blank", title: "Blank" },
        ],
      },
      initialValue: "_self",
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
        title: title || "Link",
        subtitle: dest,
      };
    },
  },
});
