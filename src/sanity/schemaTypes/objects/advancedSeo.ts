import { defineType, defineField } from "sanity";

export const advancedSeo = defineType({
  name: "advancedSeo",
  title: "Advanced SEO",
  type: "object",
  fields: [
    // Basic SEO
    defineField({
      name: "metaTitle",
      title: "Meta Title",
      type: "string",
      validation: (Rule) =>
        Rule.max(60).warning("Should be under 60 characters"),
    }),
    defineField({
      name: "metaDescription",
      title: "Meta Description",
      type: "text",
      rows: 3,
      validation: (Rule) =>
        Rule.max(160).warning("Should be under 160 characters"),
    }),
    defineField({
      name: "keywords",
      title: "Focus Keywords",
      type: "array",
      of: [{ type: "string" }],
      options: {
        layout: "tags",
      },
    }),

    // Open Graph
    defineField({
      name: "ogImage",
      title: "Open Graph Image",
      type: "image",
      description: "Recommended: 1200x630px",
      options: {
        hotspot: true,
      },
    }),
    defineField({
      name: "ogTitle",
      title: "Open Graph Title",
      type: "string",
      description: "If empty, will use Meta Title",
    }),
    defineField({
      name: "ogDescription",
      title: "Open Graph Description",
      type: "text",
      rows: 2,
      description: "If empty, will use Meta Description",
    }),

    // Twitter Card
    defineField({
      name: "twitterCard",
      title: "Twitter Card Type",
      type: "string",
      options: {
        list: [
          { title: "Summary", value: "summary" },
          { title: "Summary Large Image", value: "summary_large_image" },
          { title: "App", value: "app" },
          { title: "Player", value: "player" },
        ],
      },
      initialValue: "summary_large_image",
    }),
    defineField({
      name: "twitterHandle",
      title: "Twitter Handle",
      type: "string",
      description: "@username",
      validation: (Rule) =>
        Rule.regex(/^@?(\w){1,15}$/).warning("Enter a valid Twitter handle"),
    }),

    // Canonical URL
    defineField({
      name: "canonicalUrl",
      title: "Canonical URL",
      type: "url",
      description: "Override the default canonical URL",
    }),

    // Indexing
    defineField({
      name: "noIndex",
      title: "No Index",
      type: "boolean",
      description: "Prevent search engines from indexing this page",
      initialValue: false,
    }),
    defineField({
      name: "noFollow",
      title: "No Follow",
      type: "boolean",
      description: "Prevent search engines from following links on this page",
      initialValue: false,
    }),

    // Schema.org Structured Data
    defineField({
      name: "schemaMarkup",
      title: "Schema.org Markup",
      type: "schemaMarkup",
      description: "Add structured data for rich snippets",
    }),

    // Advanced Options
    defineField({
      name: "additionalMetaTags",
      title: "Additional Meta Tags",
      type: "array",
      of: [
        {
          type: "object",
          fields: [
            { name: "name", type: "string", title: "Name" },
            { name: "content", type: "string", title: "Content" },
          ],
        },
      ],
    }),
  ],
});
