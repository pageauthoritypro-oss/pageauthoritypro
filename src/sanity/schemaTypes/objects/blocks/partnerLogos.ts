import { defineType, defineField } from "sanity";
import { ImagesIcon } from "@sanity/icons";

export const partnerLogos = defineType({
  name: "partnerLogos",
  title: "Partner Logos",
  type: "object",
  icon: ImagesIcon,
  fields: [
    defineField({
      name: "logos",
      title: "Company Logos",
      type: "array",
      of: [{ type: "imageWithAlt" }],
      // validation: (Rule) => Rule.required().min(1),
    }),
    defineField({
      name: "autoPlay",
      title: "Auto Play",
      type: "boolean",
      initialValue: true,
    }),
    defineField({
      name: "autoPlaySpeed",
      title: "Scroll Duration (s)",
      description: "Seconds for one full scroll cycle (5–60). Fast: 10, Normal: 20, Slow: 40.",
      type: "number",
      initialValue: 20,
      hidden: ({ parent }) => !parent?.autoPlay,
      validation: (Rule) => Rule.min(5).max(60).integer(),
    }),
  ],
});
