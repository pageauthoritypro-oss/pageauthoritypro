import { defineType, defineField } from "sanity";
import { ShareIcon } from "@sanity/icons";

export const sharePost = defineType({
  name: "sharePost",
  title: "Share Post Block",
  type: "object",
  icon: ShareIcon,
  fields: [
    defineField({
      name: "heading",
      title: "Heading",
      type: "string",
      initialValue: "Share post",
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "platforms",
      title: "Platforms",
      type: "array",
      of: [{ type: "string" }],
      options: {
        list: [
          { title: "Twitter/X", value: "twitter" },
          { title: "Facebook", value: "facebook" },
          { title: "LinkedIn", value: "linkedin" },
          { title: "Copy Link", value: "copyLink" },
        ],
      },
      initialValue: ["twitter", "facebook", "linkedin", "copyLink"],
    }),
  ],
});
