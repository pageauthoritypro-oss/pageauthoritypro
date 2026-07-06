import { defineType, defineField } from "sanity";
import { ImagesIcon } from "@sanity/icons";

export const imageSlider = defineType({
  name: "imageSlider",
  title: "Image Slider",
  type: "object",
  icon: ImagesIcon,
  fields: [
    defineField({
      name: "title",
      title: "Title",
      type: "string",
    }),
    defineField({
      name: "company_logo",
      title: "Company Logos",
      type: "array",
      of: [{ type: "image", options: { hotspot: true } }],
      validation: (Rule) => Rule.required().min(1),
    }),
    defineField({
      name: "auto_play",
      title: "Auto Play",
      type: "boolean",
      initialValue: true,
    }),
  ],
  preview: {
    select: {
      title: "title",
      media: "company_logo.0",
    },
    prepare({ title, media }) {
      return {
        title: title || "Image Slider",
        media: media,
      };
    },
  },
});
