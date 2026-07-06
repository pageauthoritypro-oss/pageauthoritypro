import { defineType, defineField } from "sanity";
import { CheckmarkCircleIcon } from "@sanity/icons";

export const whySeoMatters = defineType({
  name: "whySeoMatters",
  title: "Why SEO Matters Block",
  type: "object",
  icon: CheckmarkCircleIcon,
  fields: [
    defineField({
      name: "title",
      title: "Title",
      type: "string",
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "description",
      title: "Description",
      type: "text",
      rows: 4,
    }),
    defineField({
      name: "checklist",
      title: "Checklist",
      type: "array",
      of: [
        {
          type: "object",
          name: "whySeoCheckpoint",
          title: "Checkpoint Item",
          fields: [
            defineField({
              name: "icon",
              title: "Icon Type",
              type: "string",
              options: {
                list: [
                  { title: "Check Circle", value: "checkCircle" },
                  { title: "Checkmark", value: "check" },
                  { title: "Cancel / Close", value: "cancel" },
                ],
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
        },
      ],
      validation: (Rule) => Rule.required().min(1),
    }),
  ],
  preview: {
    select: {
      title: "title",
      subtitle: "description",
    },
    prepare({ title, subtitle }) {
      return {
        title: title || "Why SEO Matters",
        subtitle: subtitle || "Checklist Block",
      };
    },
  },
});
