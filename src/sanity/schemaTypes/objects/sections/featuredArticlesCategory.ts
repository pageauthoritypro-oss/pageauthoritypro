import { defineType, defineField } from "sanity";
import { DocumentIcon } from "@sanity/icons";

export const featuredArticlesCategory = defineType({
  name: "featuredArticlesCategory",
  title: "Featured Articles & Category Section",
  type: "object",
  icon: DocumentIcon,
  fields: [
    defineField({
      name: "heading",
      title: "Section Heading",
      description: "Create one or two heading parts with optional highlight and variant styling. Supports '\\n' inside text for line breaks.",
      type: "array",
      of: [{ type: "headingPart" }],
      validation: (Rule) => Rule.required().min(1),
    }),
    defineField({
      name: "featuredPost",
      title: "Featured Article",
      type: "reference",
      to: [{ type: "blog" }],
      description: "Select the main article to feature at the top.",
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "showFilter",
      title: "Show Category Filter Tabs",
      type: "boolean",
      initialValue: true,
      description: "Toggle to show or hide the category filter navigation tabs.",
    }),
    defineField({
      name: "enabledCategories",
      title: "Filter Categories",
      type: "array",
      of: [{ type: "reference", to: [{ type: "blogCategory" }] }],
      description: "Select specific categories to show in the filter tabs. Leave empty to display all categories.",
      hidden: ({ parent }) => !parent?.showFilter,
    }),
    defineField({
      name: "blogs",
      title: "Manual Blog List Selection",
      type: "array",
      of: [{ type: "reference", to: [{ type: "blog" }] }],
      description: "Manually select which blogs should appear below the filters. If left empty, all blogs will be queried dynamically by creation date. They will appear in the exact order selected below.",
    }),
    defineField({
      name: "useManualOrder",
      title: "Use Manual Blog Order",
      type: "boolean",
      initialValue: false,
      description: "If enabled, blogs will be displayed in the exact order selected in the 'Manual Blog List Selection' above. If disabled, all blogs will be queried dynamically by creation date.",
    }),
    defineField({
      name: "blogsPerPage",
      title: "Blogs Per Page / Limit",
      type: "number",
      options: {
        list: [
          { title: "3 Blogs", value: 3 },
          { title: "6 Blogs", value: 6 },
          { title: "9 Blogs", value: 9 },
          { title: "12 Blogs", value: 12 },
          { title: "15 Blogs", value: 15 },
        ],
      },
      initialValue: 6,
      validation: (Rule) => Rule.required(),
      description: "Select how many blogs to show per page.",
    }),
  ],
  preview: {
    select: {
      heading: "heading",
      featuredTitle: "featuredPost.title",
    },
    prepare({ heading, featuredTitle }) {
      const headingStr = Array.isArray(heading)
        ? heading.map((p: { text?: string }) => p.text || "").join(" ").trim()
        : String(heading || "");
      const featuredTitleStr = Array.isArray(featuredTitle)
        ? featuredTitle.map((p: { text?: string }) => p.text || "").join(" ").trim()
        : String(featuredTitle || "");
      return {
        title: headingStr || "Featured Articles & Category",
        subtitle: featuredTitleStr ? `Featured: ${featuredTitleStr}` : "No featured article selected",
      };
    },
  },
});
