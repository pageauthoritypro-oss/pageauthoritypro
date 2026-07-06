import { defineType, defineField } from "sanity";
import { MenuIcon } from "@sanity/icons";

export const navLink = defineType({
  name: "navLink",
  title: "Navigation Link",
  type: "object",
  icon: MenuIcon,
  fields: [
    defineField({
      name: "text",
      title: "Link Text",
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
      name: "isDefault",
      title: "Default Link",
      type: "boolean",
      initialValue: false,
    }),
    defineField({
      name: "target",
      title: "Target",
      type: "string",
      options: {
        list: [
          { title: "Self", value: "_self" },
          { title: "Blank", value: "_blank" },
        ],
      },
      initialValue: "_self",
    }),
  ],
  preview: {
    select: {
      title: "text",
      subtitle: "url",
    },
  },
});
