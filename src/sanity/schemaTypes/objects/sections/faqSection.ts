import { defineType, defineField } from "sanity";
import { HelpCircleIcon } from "@sanity/icons";

export const faqSection = defineType({
  name: "faqSection",
  title: "FAQ Section",
  type: "object",
  icon: HelpCircleIcon,
  fields: [
    defineField({
      name: "header",
      title: "Header",
      type: "headerSection",
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "items",
      title: "FAQ Items",
      type: "array",
      of: [{ type: "faq" }],
      validation: (Rule) => Rule.required().min(1),
    }),
    defineField({
      name: "allowMultipleOpen",
      title: "Allow Multiple Open",
      type: "boolean",
      initialValue: false,
    }),
    defineField({
      name: "footerText",
      title: "Footer Text",
      type: "richText",
    })
  ],
  preview: {
    select: {
      heading: "header.heading",
      subtitle: "header.description",
    },
    prepare({ heading, subtitle }: { heading?: Array<{ text: string }>; subtitle?: string }) {
      const title = heading?.map((h) => h.text).filter(Boolean).join(" ") || "FAQ Section";
      return {
        title,
        subtitle: subtitle || "Faq section",
      };
    },
  },
});
