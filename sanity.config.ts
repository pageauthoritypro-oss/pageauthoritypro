"use client";

import { defineConfig } from "sanity";
import { structureTool } from "sanity/structure";
import { visionTool } from "@sanity/vision";
import { presentationTool } from "sanity/presentation";
import { schemaMarkup } from "@operationnation/sanity-plugin-schema-markup";

import { apiVersion, dataset, projectId } from "./src/sanity/env";
import { schema } from "./src/sanity/schemaTypes";
import { structure } from "./src/sanity/structure";

const previewUrl =
  process.env.SANITY_STUDIO_PREVIEW_URL ||
  process.env.NEXT_PUBLIC_SITE_URL ||
  "http://localhost:3000";

  // 1. Fetch the env variable
const envOrigins = process.env.SANITY_STUDIO_ALLOWED_ORIGINS;

// 2. Fallback to a default if the env variable is missing
const allowedOrigins = envOrigins 
  ? envOrigins.split(',') 
  : ['http://localhost:3000'];

export default defineConfig({
  name: "default",
  title: "Page Authority Pro Sanity Studio",
  basePath: "/studio",

  projectId,
  dataset,

  schema,

  plugins: [
    structureTool({ structure }),

    visionTool({
      defaultApiVersion: apiVersion,
    }),

    schemaMarkup(),

    presentationTool({
      previewUrl: {
        initial: previewUrl,

        previewMode: {
          enable: "/api/draft-mode/enable",
          disable: "/api/draft-mode/disable",
        },

        allowOrigins: allowedOrigins
      },
    }),
  ],
});



