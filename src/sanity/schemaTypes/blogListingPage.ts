import { defineType, defineField, defineArrayMember } from "sanity";
import { UlistIcon } from "@sanity/icons";

export const blogListingPage = defineType({
  name: "blogListingPage",
  title: "Blog Listing Page",
  type: "document",
  icon: UlistIcon,
  groups: [
    { name: "content", title: "Content" },
    { name: "seo", title: "SEO" },
  ],
  fields: [
    defineField({
      name: "sections",
      title: "Sections",
      type: "array",
      group: "content",
      options: {
        insertMenu: {
          views: [
            {
              name: "grid",
              previewImageUrl: (schemaTypeName: string) =>
                `/section-previews/${schemaTypeName}.webp`,
            },
          ],
        },
      },
      of: [
        defineArrayMember({ type: "heroSection" }),
        defineArrayMember({ type: "featuredArticlesCategory" }),
        defineArrayMember({ type: "ctaSection" }),
        defineArrayMember({ type: "faqSection" }),
      ],
    }),
    defineField({
      name: "seo",
      title: "SEO Settings",
      type: "advancedSeo",
      group: "seo",
    }),
  ],
  preview: {
    prepare() {
      return {
        title: "Blog Listing Page",
        subtitle: "Static dynamic listing page",
      };
    },
  },
});
