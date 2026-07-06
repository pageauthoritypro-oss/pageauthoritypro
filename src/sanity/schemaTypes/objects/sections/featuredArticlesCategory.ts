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
      description: "Manually select which blogs should appear below the filters. If left empty, all blogs will be queried dynamically.",
      validation: (Rule) =>
        Rule.custom((blogs, context) => {
          if (!blogs || !Array.isArray(blogs)) return true;
          const parent = context.parent as { featuredPost?: { _ref: string } };
          const featuredRef = parent?.featuredPost?._ref;
          if (!featuredRef) return true;

          const duplicate = blogs.some(
            (blog: unknown) =>
              typeof blog === "object" &&
              blog !== null &&
              "_ref" in blog &&
              (blog as { _ref: string })._ref === featuredRef
          );
          if (duplicate) {
            return "A blog post selected as 'Featured Article' cannot also be included in the manual selection list.";
          }
          return true;
        }),
    }),
    defineField({
      name: "blogsPerPage",
      title: "Blogs Per Page / Limit",
      type: "number",
      initialValue: 6,
      validation: (Rule) => Rule.min(1),
      description: "Maximum number of blogs to display in the grid.",
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
