import { defineType, defineField } from "sanity";
import { LinkIcon } from "@sanity/icons";

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
    defineField({
      name: "url",
      title: "URL",
      type: "string",
    }),
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
      subtitle: "url",
    },
  },
});
