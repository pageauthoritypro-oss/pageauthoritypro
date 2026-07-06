import { defineField } from "sanity";

//  Shared variant options used across schema components

export const variantOptions = [
  { title: "Brand", value: "brand" },
  { title: "Secondary", value: "secondary" },
  { title: "Destructive", value: "destructive" },
  { title: "Transparent", value: "transparent" },
];

export const headingTagField = defineField({
  name: "headingTag",
  title: "Heading HTML Tag",
  description: "Select the HTML tag to use for this heading (e.g. H1 for main page title, H2 for section titles).",
  type: "string",
  options: {
    list: [
      { title: "H1", value: "h1" },
      { title: "H2", value: "h2" },
      { title: "H3", value: "h3" },
      { title: "H4", value: "h4" },
      { title: "H5", value: "h5" },
      { title: "H6", value: "h6" },
    ],
  },
  initialValue: "h2",
});

export const buttonVariants = [
  ...variantOptions,
  { title: "Outline", value: "outline" },
];

export const dropDownIconOptions = [
  { title: "Check Circle", value: "checkCircle" },
  { title: "Tick", value: "tick" },
  { title: "Cancel / Cross", value: "cross" },
]


/**
 * Variant option values for type definitions
 */
export type VariantValue =
  | "brand"
  | "secondary"
  | "destructive"
  | "transparent";
export type ButtonVariantValue =
  | "brand"
  | "secondary"
  | "destructive"
  | "transparent"
  | "outline";
