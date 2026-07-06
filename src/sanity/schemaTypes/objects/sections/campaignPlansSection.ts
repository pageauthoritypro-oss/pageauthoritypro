import { defineType, defineField } from "sanity";
import { ThListIcon } from "@sanity/icons";
import React from "react";

export const campaignPlansSection = defineType({
  name: "campaignPlansSection",
  title: "Campaign Plans Section",
  type: "object",
  icon: ThListIcon,
  fields: [
    defineField({
      name: "plans",
      title: "Campaign Plans",
      type: "array",
      of: [
        {
          type: "object",
          name: "campaignPlan",
          title: "Campaign Plan",
          fields: [
            defineField({
              name: "badgeNumber",
              title: "Badge Number",
              type: "string",
              description: "Leave the badge empty to auto-assign numbers by plan order, or explicitly override it with a custom value such as '01', '02'.",
              validation: (Rule) => Rule.required(),
            }),
            defineField({
              name: "title",
              title: "Title",
              type: "string",
              validation: (Rule) => Rule.required(),
            }),
            defineField({
              name: "subtitle",
              title: "Subtitle",
              type: "string",
              description: "Additional title context (e.g. 'Monthly SEO Sales')",
            }),
            defineField({
              name: "price",
              title: "Price",
              type: "string",
              description: "e.g., '$1,000 - $3,000'",
            }),
            defineField({
              name: "description",
              title: "Description",
              type: "text",
              rows: 3,
            }),
            defineField({
              name: "checklistLabel",
              title: "Checklist Label",
              type: "string",
              description: "e.g., 'INCLUDED' or 'INCLUDES'",
              initialValue: "INCLUDED",
            }),
            defineField({
              name: "checklist",
              title: "Checklist",
              type: "array",
              of: [{ type: "checklistCheckpoint" }],
              validation: (Rule) => Rule.required().min(1),
            }),
            defineField({
              name: "pricingBlock",
              title: "Custom Pricing Block",
              description: "Use this to add a custom pricing callout at the bottom of the card (e.g., Custom Ads Pricing).",
              type: "object",
              fields: [
                defineField({
                  name: "label",
                  title: "Label",
                  type: "string",
                  description: "e.g., 'PRICING'",
                }),
                defineField({
                  name: "title",
                  title: "Title",
                  type: "string",
                  description: "e.g., 'Custom Pricing Based On Advertising Spend'",
                }),
                defineField({
                  name: "description",
                  title: "Description",
                  type: "text",
                  rows: 2,
                  description: "e.g., 'Most law firms combine SEO and Google Ads...'",
                }),
              ],
            }),
          ],
          preview: {
            select: {
              title: "title",
              badge: "badgeNumber",
              price: "price",
            },
            prepare({ title, badge, price }) {
              const displayPrice = price ? ` (${price})` : "";
              return {
                title: `${badge || ""}. ${title || "Plan"}${displayPrice}`,
              };
            },
          },
        },
      ],
      validation: (Rule) => Rule.required().min(1),
    }),
  ],
  preview: {
    select: {
      plans: "plans",
    },
    prepare({ plans }) {
      const planCount = plans ? plans.length : 0;
      return {
        title: "Campaign Plans Section",
        subtitle: `${planCount} Plan(s) configured`,
        media: React.createElement("img", {
          src: "/section-previews/campaignPlansSection.webp",
          style: { width: "100%", height: "100%", objectFit: "cover" },
          alt: "Campaign Plans Section Preview",
        }),
      };
    },
  },
});
