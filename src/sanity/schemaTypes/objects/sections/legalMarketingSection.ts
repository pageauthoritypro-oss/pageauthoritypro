import { defineType, defineField } from "sanity";
import { DocumentIcon } from "@sanity/icons";

export const legalMarketingSection = defineType({
  name: "legalMarketingSection",
  title: "Legal Marketing Section",
  type: "object",
  icon: DocumentIcon,
  fields: [
    defineField({
      name: "header",
      title: "Header Details",
      type: "headerSection",
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "services",
      title: "Services / Cards List",
      type: "array",
      of: [{ type: "serviceItem" }],
      validation: (Rule) => Rule.required().min(1),
    }),
  ],
  preview: {
    select: {
      heading: "header.heading",
      subtitle: "header.description",
    },
    prepare({ heading, subtitle }: { heading?: Array<{ text: string }>; subtitle?: string }) {
      const title = heading?.map((h) => h.text).filter(Boolean).join(" ") || "Legal Marketing Section";
      return {
        title,
        subtitle: subtitle || "Legal Marketing Grid",
      };
    },
  },
});
