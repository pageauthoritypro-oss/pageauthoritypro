import { defineType, defineField } from "sanity";
import { UsersIcon } from "@sanity/icons";

export const companyLogoSection = defineType({
  name: "companyLogoSection",
  title: "Company Logo Section",
  type: "object",
  icon: UsersIcon,
  fields: [
    defineField({
      name: "partnerText",
      title: "Partner Text",
      type: "string",
      description: "Small label above the partner logos.",
    }),
    defineField({
      name: "partnerLogos",
      title: "Partner Logos",
      type: "partnerLogos",
    }),
  ],
  preview: {
    select: {
      title: "partnerText"
    },
    prepare({ title }: { title?: string }) {
      return {
        title
      };
    },
  },
});
