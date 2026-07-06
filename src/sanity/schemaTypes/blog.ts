import { defineType, defineField } from "sanity";
import { DocumentTextIcon } from "@sanity/icons";

export const blog = defineType({
  name: "blog",
  title: "Blog Post",
  type: "document",
  icon: DocumentTextIcon,
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
      description: "Text shown in the back navigation link. Defaults to 'Back' if empty.",
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
      name: "category",
      title: "Category",
      type: "reference",
      to: [{ type: "blogCategory" }],
      group: "meta",
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "publishedAt",
      title: "Published At",
      type: "datetime",
      group: "meta",
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "body",
      title: "Body Content",
      type: "richText",
      group: "content",
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
      author: "author.name",
      media: "image",
    },
    prepare({ title, author, media }) {
      const titleStr = Array.isArray(title)
        ? title.map((p: { text?: string }) => p.text || "").join(" ").trim()
        : String(title || "");
      return {
        title: titleStr || "Untitled Blog Post",
        subtitle: author ? `by ${author}` : "No author",
        media: media,
      };
    },
  },
});
