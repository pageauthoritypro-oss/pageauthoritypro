import { defineType, defineField } from "sanity";
import { CheckmarkCircleIcon } from "@sanity/icons";

export const checklistBlock = defineType({
  name: "checklistBlock",
  title: "Checklist Block",
  type: "object",
  icon: CheckmarkCircleIcon,
  fields: [
    defineField({
      name: "checklist",
      title: "Checklist",
      type: "array",
      of: [{ type: "checklistCheckpoint" }],
      validation: (Rule) => Rule.required().min(1),
    }),
  ],
  preview: {
    select: {
      checklist: "checklist",
    },
    prepare({ checklist }) {
      const count = Array.isArray(checklist) ? checklist.length : 0;
      return {
        title: "Checklist Block",
        subtitle: `${count} item${count !== 1 ? "s" : ""}`,
      };
    },
  },
});
