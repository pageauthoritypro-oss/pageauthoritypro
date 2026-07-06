import { defineType, defineField } from "sanity";
import { dropDownIconOptions } from "../../constants";

export const checklistCheckpoint = defineType({
  name: "checklistCheckpoint",
  title: "Checkpoint Item",
  type: "object",
  fields: [
    defineField({
      name: "icon",
      title: "Icon Type",
      type: "string",
      options: {
        list: dropDownIconOptions,
      },
      initialValue: "checkCircle",
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "text",
      title: "Text",
      type: "string",
      validation: (Rule) => Rule.required(),
    }),
  ],
  preview: {
    select: {
      title: "text",
      subtitle: "icon",
    },
    prepare({ title, subtitle }) {
      return {
        title: title || "Checkpoint Item",
        subtitle: `Icon: ${subtitle || "checkCircle"}`,
      };
    },
  },
});
