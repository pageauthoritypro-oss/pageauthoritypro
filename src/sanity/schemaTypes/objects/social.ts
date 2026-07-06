import { defineType, defineField } from "sanity";

export const socialObject = defineType({
  name: "social",
  title: "Social Media",
  type: "object",
  fields: [
    defineField({
      name: "platform",
      title: "Platform",
      type: "string",
      options: {
        list: [
          { title: "Facebook", value: "facebook" },
          { title: "Twitter/X", value: "twitter" },
          { title: "Instagram", value: "instagram" },
          { title: "LinkedIn", value: "linkedin" },
          { title: "YouTube", value: "youtube" },
          { title: "TikTok", value: "tiktok" },
          { title: "GitHub", value: "github" },
        ],
      },
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "url",
      title: "URL",
      type: "url",
      validation: (Rule) => Rule.required().uri({ scheme: ["http", "https"] }),
    }),
  ],
  preview: {
    select: {
      title: "platform",
      subtitle: "url",
    },
  },
});
