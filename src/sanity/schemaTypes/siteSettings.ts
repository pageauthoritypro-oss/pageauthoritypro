import { defineType, defineField } from "sanity";
import { CogIcon } from "@sanity/icons";
import { extractGoogleMapsEmbedSrc } from "@/lib/googleMapsEmbed";

export const globalConfiguration = defineType({
  name: "globalConfiguration",
  title: "Global Configuration",
  type: "document",
  icon: CogIcon,
  groups: [
    { name: "general", title: "General", default: true },
    { name: "header", title: "Header" },
    { name: "footer", title: "Footer" },
    { name: "seo", title: "SEO" },
    { name: "social", title: "Social Media" },
    { name: "analytics", title: "Analytics" },
    { name: "scripts", title: "Scripts" },
    { name: "maintenance", title: "Maintenance" },
  ],
  fields: [
    // --- General Group ---
    defineField({
      name: "title",
      title: "Site Title",
      type: "string",
      group: "general",
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "description",
      title: "Site Description",
      type: "text",
      rows: 3,
      group: "general",
    }),
    defineField({
      name: "logo",
      title: "Logo",
      type: "imageWithAlt",
      group: "general",
    }),
    defineField({
      name: "favicon",
      title: "Favicon",
      type: "image",
      group: "general",
    }),

    // --- Header Group ---
    defineField({
      name: "headerLogo",
      title: "Header Logo",
      description: "Optional: Overrides the default site logo for the header.",
      type: "imageWithAlt",
      group: "header",
    }),
    defineField({
      name: "headerNavigation",
      title: "Header Navigation",
      type: "array",
      of: [{ type: "navigationItem" }],
      group: "header",
    }),
    defineField({
      name: "headerCta",
      title: "Header CTA Buttons",
      type: "array",
      of: [{ type: "ctaBtn" }],
      group: "header",
    }),
    defineField({
      name: "stickyHeader",
      title: "Sticky Header",
      description: "Keep the header visible while scrolling.",
      type: "boolean",
      initialValue: true,
      group: "header",
    }),
    defineField({
      name: "transparentHeader",
      title: "Transparent Header",
      description: "Make the header transparent on the home page or over hero sections.",
      type: "boolean",
      initialValue: false,
      group: "header",
    }),
    defineField({
      name: "topBanner",
      title: "Top Announcement Banner",
      type: "object",
      group: "header",
      fields: [
        { name: "enabled", title: "Enabled", type: "boolean", initialValue: false },
        { name: "text", title: "Banner Text", type: "string" },
        { name: "link", title: "Banner Link", type: "string" },
        {
          name: "variant",
          title: "Variant",
          type: "string",
          options: { list: ["primary", "secondary", "accent", "info"] },
          initialValue: "primary"
        },
      ],
    }),

    // --- Footer Group ---
    defineField({
      name: "footerLogo",
      title: "Footer Logo",
      type: "imageWithAlt",
      group: "footer",
    }),
    defineField({
      name: "footerTagline",
      title: "Footer Tagline",
      type: "string",
      group: "footer",
    }),
    defineField({
      name: "footerCta",
      title: "Footer CTA Button",
      type: "array",
      of: [{ type: "ctaBtn" }],
      group: "footer",
    }),
    defineField({
      name: "footerNavigation",
      title: "Footer Navigation",
      description: "Each item represents a column in the footer with a title and links (use 'Sub Items' for links).",
      type: "array",
      of: [{ type: "navigationItem" }],
      group: "footer",
    }),
    defineField({
      name: "footerMapEmbed",
      title: "Footer Map Embed",
      description:
        "In Google Maps: Share → Embed a map → copy the code, and paste the whole thing here. Leave empty to hide the map.",
      type: "text",
      rows: 4,
      validation: (Rule) =>
        Rule.custom((value) => {
          if (!value) return true;
          return extractGoogleMapsEmbedSrc(value)
            ? true
            : "Couldn't find a Google Maps embed link in this. Make sure you copied the embed code from Google Maps' Share → Embed a map option.";
        }),
      group: "footer",
    }),
    defineField({
      name: "footerCopyright",
      title: "Copyright Text",
      type: "string",
      group: "footer",
    }),
    defineField({
      name: "bottomDescription",
      title: "Bottom Description",
      description: "The long vision/description statement at the very bottom.",
      type: "text",
      rows: 4,
      group: "footer",
    }),

    // --- SEO Group ---
    defineField({
      name: "seo",
      title: "Default SEO",
      type: "advancedSeo",
      group: "seo",
    }),

    // --- Social Media Group ---
    defineField({
      name: "socialMedia",
      title: "Social Media Links",
      type: "array",
      of: [{ type: "social" }],
      group: "social",
    }),

    // --- Analytics Group ---
    defineField({
      name: "googleAnalyticsId",
      title: "Google Analytics ID",
      type: "string",
      description: "Format: G-XXXXXXXXXX or UA-XXXXXXXXX-X",
      group: "analytics",
    }),
    defineField({
      name: "googleTagManagerId",
      title: "Google Tag Manager ID",
      type: "string",
      description: "Format: GTM-XXXXXXX",
      group: "analytics",
    }),
    // --- Scripts Group ---
    defineField({
      name: "headerScripts",
      title: "Header Scripts",
      type: "text",
      rows: 5,
      description: "Scripts to be added in the <head> tag",
      group: "scripts",
    }),
    defineField({
      name: "footerScripts",
      title: "Footer Scripts",
      type: "text",
      rows: 5,
      description: "Scripts to be added before closing </body> tag",
      group: "scripts",
    }),

    // --- Maintenance Group ---
    defineField({
      name: "maintenanceMode",
      title: "Maintenance Mode",
      type: "object",
      group: "maintenance",
      fields: [
        {
          name: "enabled",
          title: "Enable Maintenance Mode",
          type: "boolean",
          initialValue: false,
        },
        {
          name: "message",
          title: "Maintenance Message",
          type: "text",
          rows: 3,
        },
      ],
    }),
  ],
  preview: {
    select: {
      title: "title",
      subtitle: "description",
    },
    prepare({ title, subtitle }: { title?: string; subtitle?: string }) {
      return {
        title: title || "Global Configuration",
        subtitle: subtitle,
      };
    },
  },
});
