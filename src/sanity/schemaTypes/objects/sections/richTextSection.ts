import { defineType, defineField } from "sanity";
import { DocumentTextIcon } from "@sanity/icons";

export const richTextSection = defineType({
  name: "richTextSection",
  title: "Rich Text Section",
  type: "object",
  icon: DocumentTextIcon,
  fields: [
    defineField({
      name: "content",
      title: "Content",
      type: "richText",
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "containerSize",
      title: "Container Size",
      type: "string",
      options: {
        list: [
          { title: "Default (Centered)", value: "default" },
          { title: "Narrow", value: "narrow" },
          { title: "Wide", value: "wide" },
        ],
      },
      initialValue: "default",
    }),
  ],
  preview: {
    select: {
      content: "content",
    },
    prepare({ content }) {
      const blocks = (content || []) as { _type: string; children?: { text?: string }[] }[];
      const firstBlock = blocks.find((block) => block._type === "block");
      const title = firstBlock
        ? firstBlock.children
            ?.map((c) => c.text || "")
            .join("")
        : "Empty Rich Text Content";
      return {
        title: title || "Rich Text Content",
        subtitle: "Rich Text Section",
      };
    },
  },
});
