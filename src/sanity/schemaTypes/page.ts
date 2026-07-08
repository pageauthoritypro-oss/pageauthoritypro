import { defineType, defineField, defineArrayMember } from "sanity";
import { DocumentsIcon } from "@sanity/icons";
import { PageUrlHelper } from "../components/PageUrlHelper";

// 1. Centralized registry of sections and their associated groups
const SECTION_REGISTRY = [
  { type: "heroSection", groups: ["home", "case-studies", "process", "seo", "blog", "contact", "shared", "about"] },
  { type: "companyLogoSection", groups: ["home", "case-studies", "shared"] },
  { type: "numbersSection", groups: ["home", "case-studies", "shared"] },
  { type: "comparisonSection", groups: ["home"] },
  { type: "vsComparisonSection", groups: ["attorney"] },
  { type: "graphSection", groups: ["home"] },
  { type: "specializedAreaSection", groups: [] }, // Orphaned or ungrouped
  { type: "phaseDominatingProcessSection", groups: ["home", "case-studies", "google-ads"] },
  { type: "faqSection", groups: ["seo", "contact", "shared"] },
  { type: "ctaSection", groups: ["home", "case-studies", "process", "seo", "blog", "shared","about"] },
  { type: "cardsGrid", groups: ["home", "case-studies"] },
  { type: "growthPhaseProcessSection", groups: ["process", "seo"] },
  { type: "growthPhaseDetailsSection", groups: ["process"] },
  { type: "howItWorksSection", groups: ["home", "process"] },
  { type: "growthMetricsSection", groups: ["seo"] },
  { type: "servicesSection", groups: ["seo", "attorney", "about", "google-ads"] },
  { type: "seoFeaturesSection", groups: ["seo", "contact"] },
  { type: "websitesUnderperformSection", groups: ["attorney"] },
  { type: "seoFoundationSection", groups: ["attorney"] },
  { type: "caseAcquisitionSection", groups: ["attorney"] },
  { type: "marketingAuditSection", groups: ["pricing"] },
  { type: "practiceAreasSection", groups: ["pricing"] },
  { type: "growthServicesSection", groups: ["pricing"] },
  { type: "campaignPlansSection", groups: ["pricing"] },
  { type: "legalMarketingSection", groups: ["about", "shared"] },
  { type: "builtAroundDataSection", groups: ["about", "shared"] },
  { type: "growthSystemSection", groups: ["google-ads", "shared"] },
  { type: "resultsMattersSection", groups: ["google-ads", "shared"] },
  { type: "featuredArticlesCategory", groups: ["blog", "shared"] },
  { type: "richTextSection", groups: ["legal", "shared"] },
  { type: "contactFormSection", groups: ["contact", "shared"] },
  { type: "notFoundSection", groups: ["shared"] },
];

// 2. Define the static menu groups
const MENU_GROUPS = [
  { name: "home", title: "Home" },
  { name: "case-studies", title: "Case Studies" },
  { name: "blog", title: "Blog" },
  { name: "process", title: "Process" },
  { name: "seo", title: "SEO" },
  { name: "pricing", title: "Pricing" },
  { name: "attorney", title: "Attorney" },
  { name: "about", title: "About" },
  { name: "google-ads", title: "Google Ads" },
  { name: "contact", title: "Contact" },
  { name: "legal", title: "Legal" },
  { name: "shared", title: "Shared / Common" },
];

export const pages = defineType({
  name: "pages",
  title: "Pages",
  type: "document",
  icon: DocumentsIcon,
  groups: [
    { name: "basic", title: "Basic Info" },
    { name: "content", title: "Content" },
    { name: "seo", title: "SEO" },
  ],
  fields: [
    defineField({
      name: "title",
      title: "Page Title",
      type: "string",
      group: "basic",
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "slug",
      title: "Slug",
      type: "slug",
      group: "basic",
      options: {
        source: "title",
        maxLength: 96,
      },
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "pageUrl",
      title: "Page URL Helper",
      type: "string",
      group: "basic",
      components: {
        input: PageUrlHelper,
      },
    }),
    defineField({
      name: "enableSmoothScroll",
      title: "Enable Smooth Scroll",
      type: "boolean",
      group: "basic",
      description: "Enable premium momentum smooth scrolling on this page.",
      initialValue: false,
    }),
    defineField({
      name: "sections",
      title: "Sections",
      type: "array",
      group: "content",
      options: {
        insertMenu: {
          // Dynamically map groups based on the registry
          groups: MENU_GROUPS.map((g) => ({
            name: g.name,
            title: g.title,
            of: SECTION_REGISTRY.filter((s) => s.groups.includes(g.name)).map((s) => s.type),
          })),
          views: [
            {
              name: "grid",
              previewImageUrl: (schemaTypeName: string) =>
                `/section-previews/${schemaTypeName}.webp`,
            },
          ],
        },
      },
      // Dynamically register array types
      of: SECTION_REGISTRY.map((s) => defineArrayMember({ type: s.type })),
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
      subtitle: "slug.current",
    },
  },
});
