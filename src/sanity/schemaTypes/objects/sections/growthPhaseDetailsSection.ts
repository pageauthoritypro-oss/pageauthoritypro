import { defineType, defineField } from "sanity";
import { DocumentTextIcon } from "@sanity/icons";

export const growthPhaseDetailsSection = defineType({
  name: "growthPhaseDetailsSection",
  title: "Growth Phase Details Section",
  type: "object",
  icon: DocumentTextIcon,
  fields: [
    defineField({
      name: "cards",
      title: "Phase Detailed Cards",
      type: "array",
      of: [
        {
          type: "object",
          name: "growthPhaseDetailsCard",
          title: "Growth Phase Details Card",
          fields: [
            defineField({
              name: "badgeNumber",
              title: "Badge Number",
              type: "string",
              description: "Leave the badge empty to auto-assign numbers by card order, or explicitly override it with a custom value such as '01', '02', '03'.",
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
              name: "checklistTitle",
              title: "Checklist Title",
              type: "string",
              description: "Title above the checkpoints list, e.g., 'What\\'s Included'.",
            }),
            defineField({
              name: "checkpoints",
              title: "Checkpoints",
              type: "array",
              of: [
                {
                  type: "object",
                  name: "checkpointItem",
                  title: "Checkpoint Item",
                  fields: [
                    defineField({
                      name: "icon",
                      title: "Icon",
                      type: "imageWithAlt",
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
                      media: "icon",
                    },
                    prepare({ title, media }) {
                      return {
                        title: title || "Checkpoint",
                        media: media,
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
                subtitle: subtitle ? `Number: ${subtitle}` : "",
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
      card0: "cards.0.title",
      card1: "cards.1.title",
    },
    prepare({ card0, card1 }: { card0?: string; card1?: string }) {
      const cardsList = [card0, card1].filter(Boolean).join(", ");
      return {
        title: "Growth Phase Details Section",
        subtitle: cardsList ? `Cards: ${cardsList}` : "Growth Phase Details",
      };
    },
  },
});
