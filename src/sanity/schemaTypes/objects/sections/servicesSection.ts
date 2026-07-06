import { defineType, defineField } from "sanity";
import { CaseIcon } from "@sanity/icons";

export const servicesSection = defineType({
  name: "servicesSection",
  title: "Services Section",
  type: "object",
  icon: CaseIcon,
  fields: [
    defineField({
      name: "header",
      title: "Header Details",
      type: "headerSection",
      description: "Contains the heading, description, and CTA buttons.",
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "bullets",
      title: "Bullet Items",
      description: "Small icon plus text blocks shown below the heading (e.g. 'SEO compounds over time.').",
      type: "array",
      of: [{ type: "iconTextItem" }],
      validation: (Rule) => Rule.max(6),
    }),
    defineField({
      name: "services",
      title: "Services List",
      type: "array",
      of: [{ type: "serviceItem" }],
      validation: (Rule) => Rule.required().min(1),
    }),
    defineField({
      name: "columns",
      title: "Desktop Columns",
      type: "number",
      options: {
        list: [
          { title: "Two", value: 2 },
          { title: "Three", value: 3 },
          { title: "Four", value: 4 },
        ],
      },
      initialValue: 3,
    }),
  ],
  preview: {
    select: {
      heading: "header.heading",
      subtitle: "header.description",
    },
    prepare({ heading, suttitle }: { heading?: Array<{ text: string }>; suttitle?: string }) {
      const title = heading?.map((h) => h.text).filter(Boolean).join(" ") || "Services Section";
      return {
        title,
        subtitle: suttitle || "Services Grid",
      };
    },
  },
});
