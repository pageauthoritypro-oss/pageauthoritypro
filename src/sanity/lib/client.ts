import { createClient } from "next-sanity";

import { apiVersion, dataset, projectId } from "../env";

export const client = createClient({
  projectId,
  dataset,
  apiVersion,
  useCdn: true,
  perspective: "published",
  stega: {
    enabled: true,
    studioUrl: "/studio",
  },
});

/**
 * Server-side write client — previewDrafts perspective, no CDN, stega enabled.
 * Used by defineLive when draft mode cookie is present.
 */
export const writeClient = createClient({
  projectId,
  dataset,
  apiVersion,
  useCdn: false,
  token: process.env.SANITY_API_TOKEN,
  perspective: "previewDrafts",
  stega: {
    enabled: true,
    studioUrl: "/studio",
  },
});
