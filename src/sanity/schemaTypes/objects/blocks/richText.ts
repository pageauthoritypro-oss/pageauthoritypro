import { defineType, defineArrayMember } from "sanity";
import { BlockElementIcon } from "@sanity/icons";
import React from "react";

// Toolbar icon components
const AlignLeftIcon = () =>
  React.createElement(
    "svg",
    { width: "1em", height: "1em", viewBox: "0 0 24 24", fill: "currentColor" },
    React.createElement("path", {
      d: "M3 5h18v2H3zm0 4h12v2H3zm0 4h18v2H3zm0 4h12v2H3z",
    })
  );

const AlignCenterIcon = () =>
  React.createElement(
    "svg",
    { width: "1em", height: "1em", viewBox: "0 0 24 24", fill: "currentColor" },
    React.createElement("path", {
      d: "M3 5h18v2H3zm3 4h12v2H6zm-3 4h18v2H3zm3 4h12v2H6z",
    })
  );

const AlignRightIcon = () =>
  React.createElement(
    "svg",
    { width: "1em", height: "1em", viewBox: "0 0 24 24", fill: "currentColor" },
    React.createElement("path", {
      d: "M3 5h18v2H3zm6 4h12v2H9zm-6 4h18v2H3zm6 4h12v2H9z",
    })
  );

export const richText = defineType({
  name: "richText",
  title: "Rich Text",
  type: "array",
  icon: BlockElementIcon,
  of: [
    defineArrayMember({
      title: "Block",
      type: "block",
      styles: [
        { title: "Normal", value: "normal" },
        { title: "H1", value: "h1" },
        { title: "H2", value: "h2" },
        { title: "H3", value: "h3" },
        { title: "H4", value: "h4" },
        { title: "H5", value: "h5" },
        { title: "H6", value: "h6" },
        { title: "Quote", value: "blockquote" },
      ],
      lists: [{ title: "Bullet", value: "bullet" }],
      marks: {
        decorators: [
          { title: "Strong", value: "strong" },
          { title: "Emphasis", value: "em" },
          {
            title: "Align Left",
            value: "align-left",
            icon: AlignLeftIcon,
            component: ({ children }: { children: React.ReactNode }) =>
              React.createElement(
                "span",
                { style: { display: "block", textAlign: "left", width: "100%" } },
                children
              ),
          },
          {
            title: "Align Center",
            value: "align-center",
            icon: AlignCenterIcon,
            component: ({ children }: { children: React.ReactNode }) =>
              React.createElement(
                "span",
                { style: { display: "block", textAlign: "center", width: "100%" } },
                children
              ),
          },
          {
            title: "Align Right",
            value: "align-right",
            icon: AlignRightIcon,
            component: ({ children }: { children: React.ReactNode }) =>
              React.createElement(
                "span",
                { style: { display: "block", textAlign: "right", width: "100%" } },
                children
              ),
          },
        ],
        annotations: [
          {
            title: "URL",
            name: "link",
            type: "object",
            fields: [
              {
                title: "URL",
                name: "href",
                type: "url",
              },
            ],
          },
        ],
      },
    }),
    defineArrayMember({
      type: "imageWithAlt",
    }),
    defineArrayMember({
      type: "checklistBlock",
    }),
    defineArrayMember({
      type: "detailedCardsGrid",
    }),
    defineArrayMember({
      type: "iconCardList",
    }),
    defineArrayMember({
      type: "resultsBlock",
    }),
    defineArrayMember({
      type: "testimonialBlock",
    }),
  ],
});
