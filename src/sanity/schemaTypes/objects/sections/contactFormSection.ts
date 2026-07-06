import { defineType, defineField } from "sanity";
import { EnvelopeIcon } from "@sanity/icons";

export const contactFormSection = defineType({
  name: "contactFormSection",
  title: "Contact Form Section",
  type: "object",
  icon: EnvelopeIcon,
  fields: [
    defineField({
      name: "header",
      title: "Header Details",
      type: "headerSection",
      description: "Left side title, description and eyebrow.",
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "contactInfo",
      title: "Contact Info List",
      type: "array",
      description: "List of contact details shown below the description (e.g. Email, Phone).",
      of: [
        {
          type: "object",
          name: "contactInfoItem",
          title: "Contact Info Item",
          fields: [
            defineField({
              name: "label",
              title: "Label",
              type: "string",
              description: "e.g. EMAIL US, CALL US",
              validation: (Rule) => Rule.required(),
            }),
            defineField({
              name: "value",
              title: "Value",
              type: "string",
              description: "e.g. info@pap.com, 9999999999",
              validation: (Rule) => Rule.required(),
            }),
            defineField({
              name: "icon",
              title: "Icon Image",
              type: "imageWithAlt",
              validation: (Rule) => Rule.required(),
            }),
          ],
          preview: {
            select: {
              title: "label",
              subtitle: "value",
              media: "icon",
            },
          },
        },
      ],
    }),
    defineField({
      name: "formFields",
      title: "Form Input Fields",
      type: "array",
      description: "Define the input fields of the contact form.",
      of: [
        {
          type: "object",
          name: "formFieldItem",
          title: "Form Field",
          fields: [
            defineField({
              name: "name",
              title: "Field Name / Key",
              type: "string",
              description: "e.g. name, email, phone, message",
              validation: (Rule) => Rule.required(),
            }),
            defineField({
              name: "label",
              title: "Label Text",
              type: "string",
              description: "e.g. Full Name, Email Address",
              validation: (Rule) => Rule.required(),
            }),
            defineField({
              name: "placeholder",
              title: "Placeholder Text",
              type: "string",
              description: "e.g. Enter your name",
            }),
            defineField({
              name: "type",
              title: "Field Type",
              type: "string",
              options: {
                list: [
                  { title: "Text Input", value: "text" },
                  { title: "Email Input", value: "email" },
                  { title: "Phone Number Input", value: "tel" },
                  { title: "Text Area (Multi-line)", value: "textarea" },
                ],
              },
              initialValue: "text",
              validation: (Rule) => Rule.required(),
            }),
            defineField({
              name: "required",
              title: "Required",
              type: "boolean",
              initialValue: true,
            }),
          ],
          preview: {
            select: {
              title: "label",
              subtitle: "type",
            },
          },
        },
      ],
    }),
    defineField({
      name: "submitButtonText",
      title: "Submit Button Text",
      type: "string",
      initialValue: "Send Message",
      validation: (Rule) => Rule.required(),
    }),
  ],
  preview: {
    select: {
      heading: "header.heading",
      subtitle: "header.description",
    },
    prepare({ heading, subtitle }: { heading?: Array<{ text: string }>; subtitle?: string }) {
      const title = heading?.map((h) => h.text).filter(Boolean).join(" ") || "Contact Form Section";
      return {
        title,
        subtitle: subtitle || "Contact Form & Left Side Info List",
      };
    },
  },
});
