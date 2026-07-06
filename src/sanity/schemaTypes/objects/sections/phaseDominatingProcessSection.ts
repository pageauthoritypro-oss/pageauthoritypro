import { defineType, defineField } from "sanity";
import { RocketIcon } from "@sanity/icons";

export const phaseDominatingProcessSection = defineType({
  name: "phaseDominatingProcessSection",
  title: "Phase Dominating Process Section",
  type: "object",
  icon: RocketIcon,
  fields: [
    defineField({
      name: "header",
      title: "Header",
      type: "headerSection",
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "phases",
      title: "Phases",
      type: "array",
      of: [{ type: "card" }],
      validation: (Rule) => Rule.required().min(1).max(6),
    }),
  ],
  preview: {
    select: {
      heading: "header.heading",
      subtitle: "header.description",
    },
    prepare({ heading, subtitle }: { heading?: Array<{ text: string }>; subtitle?: string }) {
      const title = heading?.map((h) => h.text).filter(Boolean).join(" ") || "Phase Dominating Process Section";
      return {
        title,
        subtitle: subtitle || "Phase dominating process section",
      };
    },
  },
});
