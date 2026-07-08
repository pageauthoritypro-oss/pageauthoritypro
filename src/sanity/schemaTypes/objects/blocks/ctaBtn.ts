import { defineType, defineField } from "sanity";
import { LinkIcon } from "@sanity/icons";
import { buttonVariants } from "../../constants";
import { linkFields } from "../link";

export const ctaBtn = defineType({
  name: "ctaBtn",
  title: "CTA Button",
  type: "object",
  icon: LinkIcon,
  fields: [
    defineField({
      name: "cta_text",
      title: "Button Text",
      type: "string",
      validation: (Rule) => Rule.required(),
    }),
    ...linkFields,
    defineField({
      name: "variant",
      title: "Variant",
      type: "string",
      options: {
        list: buttonVariants,
      },
      initialValue: "primary",
    }),
    defineField({
      name: "target",
      title: "Target",
      description: "Choose whether the CTA link opens in the current tab or a new browser tab.",
      type: "string",
      options: {
        list: [
          { title: "Same page", value: "_self" },
          { title: "New tab", value: "_blank" },
        ],
      },
      initialValue: "_self",
    }),
    defineField({
      name: "icon",
      title: "CTA Icon",
      type: "imageWithAlt",
      description: "Optional icon/SVG for the CTA button. Leave empty to show no icon.",
      options: {
        collapsible: false,
      },
    }),
  ],
  preview: {
    select: {
      title: "cta_text",
      linkType: "linkType",
      url: "url",
      internalPageTitle: "internalPage.title",
    },
    prepare({ title, linkType, url, internalPageTitle }) {
      const dest = linkType === "internal" ? `Page: ${internalPageTitle || "Selected Reference"}` : `URL: ${url || ""}`;
      return {
        title: title || "CTA Button",
        subtitle: dest,
      };
    },
  },
});
