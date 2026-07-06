import { defineType, defineField } from "sanity";
import { MasterDetailIcon } from "@sanity/icons";

export const growthSystemSection = defineType({
  name: "growthSystemSection",
  title: "Growth System Section",
  type: "object",
  icon: MasterDetailIcon,
  fields: [
    defineField({
      name: "header",
      title: "Header Details",
      type: "headerSection",
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "image",
      title: "Side Image",
      type: "imageWithAlt",
      validation: (Rule) => Rule.required(),
    }),
  ],
  preview: {
    select: {
      heading: "header.heading",
    },
    prepare({ heading }: { heading?: Array<{ text: string }> }) {
      const title = heading?.map((h) => h.text).filter(Boolean).join(" ") || "Growth System Section";
      return {
        title,
        subtitle: "Growth System (Image + Content)",
      };
    },
  },
});
