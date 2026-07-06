import { defineType, defineField } from "sanity";
import { DocumentIcon } from "@sanity/icons";

export const caseStudy = defineType({
  name: "caseStudy",
  title: "Case Study",
  type: "document",
  icon: DocumentIcon,
  groups: [
    { name: "content", title: "Content" },
    { name: "meta", title: "Metadata" },
    { name: "sidebar", title: "Right Sidebar" },
    { name: "seo", title: "SEO" },
  ],
  fields: [
    defineField({
      name: "title",
      title: "Title (Heading)",
      description: "Create one or two heading parts with optional highlight and variant styling. Supports '\\n' inside text for line breaks.",
      type: "array",
      of: [{ type: "headingPart" }],
      group: "content",
      validation: (Rule) => Rule.required().min(1),
    }),
    defineField({
      name: "slug",
      title: "Slug",
      type: "slug",
      group: "content",
      options: {
        source: (doc: Record<string, unknown>) => {
          const parts = doc.title as Array<{ text?: string }> | string | undefined;
          if (Array.isArray(parts)) return parts.map((p) => p.text || "").join(" ").replace(/\\n/g, "").trim();
          return typeof parts === "string" ? parts : "";
        },
        maxLength: 96,
      },
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "backLabel",
      title: "Back Link Label",
      description: "Text shown in the back navigation link. Defaults to 'Back Case Study' if empty.",
      type: "string",
      group: "content",
    }),
    defineField({
      name: "description",
      title: "Description",
      type: "text",
      rows: 3,
      group: "content",
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "image",
      title: "Featured Image",
      type: "image",
      group: "content",
      options: {
        hotspot: true,
      },
    }),
    defineField({
      name: "location",
      title: "Location Selector",
      type: "reference",
      to: [{ type: "location" }],
      group: "meta",
      description: "Select the location (e.g. Iowa) and area.",
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "tags",
      title: "Tags",
      type: "array",
      of: [{ type: "reference", to: [{ type: "caseStudyTag" }] }],
      group: "meta",
    }),
    defineField({
      name: "publishedAt",
      title: "Published At",
      type: "datetime",
      group: "meta",
    }),
    defineField({
      name: "body",
      title: "Body Content",
      type: "richText",
      group: "content",
    }),
    defineField({
      name: "caseStudyMetrics",
      title: "Case Study Metrics",
      type: "array",
      of: [{ type: "caseStudyMetric" }],
      group: "meta",
      validation: (Rule) =>
        Rule.custom((metrics) => {
          if (!Array.isArray(metrics)) return true;
          const highlightedCount = metrics.filter(
            (metric: unknown) => {
              if (metric && typeof metric === "object" && "isHighlighted" in metric) {
                return (metric as { isHighlighted: boolean }).isHighlighted;
              }
              return false;
            }
          ).length;
          if (highlightedCount > 1) {
            return "Only one metric can be highlighted.";
          }
          return true;
        }),
    }),
    defineField({
      name: "hideSidebar",
      title: "Hide Sidebar Widgets",
      type: "boolean",
      description: "If checked, the right sidebar widgets will be hidden.",
      initialValue: false,
      group: "sidebar",
    }),
    defineField({
      name: "aboutAuthorTitle",
      title: "About Author Widget Title",
      type: "string",
      initialValue: "About Author",
      group: "sidebar",
    }),
    defineField({
      name: "showViewAllBlogs",
      title: "Show View All Blogs Link",
      type: "boolean",
      initialValue: true,
      group: "sidebar",
    }),
    defineField({
      name: "author",
      title: "Author",
      type: "reference",
      to: [{ type: "author" }],
      group: "sidebar",
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "authorBottomText",
      title: "Author Bottom Text",
      type: "text",
      rows: 3,
      description: "Short text shown below author details. E.g., 'Eliminate plugin bloat and unnecessary scripts...'",
      group: "sidebar",
    }),
    defineField({
      name: "bookCallCard",
      title: "Book Call Card",
      type: "bookCallCard",
      group: "sidebar",
    }),
    defineField({
      name: "sharePost",
      title: "Share Post Options",
      type: "sharePost",
      group: "sidebar",
    }),
    defineField({
      name: "seo",
      title: "SEO Settings",
      type: "advancedSeo",
      group: "seo",
    }),
  ],
  preview: {
    select: {
      title: "title",
      location: "location.name",
      media: "image",
    },
    prepare({ title, location, media }) {
      const titleStr = Array.isArray(title)
        ? title.map((p: { text?: string }) => p.text || "").join(" ").trim()
        : String(title || "");
      return {
        title: titleStr || "Untitled Case Study",
        subtitle: location ? `Location: ${location}` : "No location selected",
        media: media,
      };
    },
  },
});
