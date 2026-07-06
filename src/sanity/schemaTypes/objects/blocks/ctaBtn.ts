import { defineType, defineField } from "sanity";
import { LinkIcon } from "@sanity/icons";
import { buttonVariants } from "../../constants";

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
    defineField({
      name: "linkType",
      title: "Link Type",
      type: "string",
      options: {
        list: [
          { title: "Internal Page", value: "internal" },
          { title: "External URL", value: "external" },
        ],
        layout: "radio",
      },
      initialValue: "external",
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "internalPage",
      title: "Internal Page Reference",
      type: "reference",
      to: [{ type: "pages" }],
      hidden: ({ parent }) => parent?.linkType !== "internal",
      validation: (Rule) =>
        Rule.custom((value, context) => {
          const parent = context.parent as { linkType?: string } | undefined;
          if (parent?.linkType === "internal" && !value) {
            return "Internal Page Reference is required";
          }
          return true;
        }),
    }),
    defineField({
      name: "url",
      title: "External URL",
      type: "string",
      hidden: ({ parent }) => parent?.linkType !== "external",
      validation: (Rule) =>
        Rule.custom((value, context) => {
          const parent = context.parent as { linkType?: string } | undefined;
          if (parent?.linkType === "external" && !value) {
            return "External URL is required";
          }
          return true;
        }),
    }),
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
