import { defineType, defineField } from "sanity";
import { ThLargeIcon } from "@sanity/icons";

export const iconCardList = defineType({
  name: "iconCardList",
  title: "SEO Health Overview",
  type: "object",
  icon: ThLargeIcon,
  fields: [
    defineField({
      name: "cards",
      title: "Cards",
      type: "array",
      of: [
        {
          type: "object",
          name: "iconCardItem",
          title: "Card Item",
          fields: [
            defineField({
              name: "icon",
              title: "Icon Image",
              type: "imageWithAlt",
              validation: (Rule) => Rule.required(),
            }),
            defineField({
              name: "title",
              title: "Title",
              type: "string",
              validation: (Rule) => Rule.required(),
            }),
            defineField({
              name: "subtitle",
              title: "Subtitle / Description",
              type: "text",
              rows: 3,
            }),
          ],
          preview: {
            select: {
              title: "title",
              media: "icon",
            },
            prepare({ title, media }) {
              return {
                title: title || "Card Item",
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
      cards: "cards",
    },
    prepare({ cards }) {
      const count = Array.isArray(cards) ? cards.length : 0;
      return {
        title: "Icon, Title & Subtitle Cards Grid",
        subtitle: `${count} card${count !== 1 ? "s" : ""}`,
      };
    },
  },
});
