import { defineType, defineField } from "sanity";
import { ThLargeIcon } from "@sanity/icons";
import { dropDownIconOptions } from "../../constants";

export const detailedCardsGrid = defineType({
  name: "detailedCardsGrid",
  title: "Key Law Firm SEO Strategies",
  type: "object",
  icon: ThLargeIcon,
  fields: [
    defineField({
      name: "cards",
      title: "Detailed Cards",
      type: "array",
      of: [
        {
          type: "object",
          name: "detailedCardItem",
          title: "Detailed Card Item",
          fields: [
            defineField({
              name: "badgeNumber",
              title: "Badge Number",
              type: "string",
              description: "Leave the badge empty to auto-assign numbers by item order, or explicitly override it with a custom value such as '01', '02', '03'."
            }),
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
              rows: 3,
            }),
            defineField({
              name: "checkpoints",
              title: "Checkpoints",
              type: "array",
              of: [
                {
                  type: "object",
                  name: "detailedCheckpointItem",
                  title: "Checkpoint Item",
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
                },
              ],
              validation: (Rule) => Rule.required().min(1),
            }),
          ],
          preview: {
            select: {
              title: "title",
              subtitle: "badgeNumber",
            },
            prepare({ title, subtitle }) {
              return {
                title: title || "Detailed Card",
                subtitle: subtitle ? `Badge: ${subtitle}` : "",
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
      cards: "cards",
    },
    prepare({ cards }) {
      const count = Array.isArray(cards) ? cards.length : 0;
      return {
        title: "Detailed Cards Grid",
        subtitle: `${count} card${count !== 1 ? "s" : ""}`,
      };
    },
  },
});
