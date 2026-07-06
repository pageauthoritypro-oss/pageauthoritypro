// Querying with "sanityFetch" will keep content automatically updated.
// <SanityLive /> must be rendered in your root layout.
// See https://github.com/sanity-io/next-sanity#live-content-api
import { defineLive } from "next-sanity/live";
import { client } from "./client";

const token = process.env.SANITY_API_TOKEN;

if (!token && process.env.NODE_ENV === "development") {
  console.warn(
    "Warning: SANITY_API_TOKEN is not set. Live preview and draft mode features will not work.\n" +
      "Add SANITY_API_TOKEN to your .env.local file to enable these features.\n" +
      "Get your token from: https://sanity.io/manage/personal/tokens"
  );
}

export const { sanityFetch, SanityLive } = defineLive({
  /**
   * Public client — published perspective, CDN enabled.
   * Used for all regular (non-draft) fetches.
   */
  client,

  serverToken: token,
  browserToken: false,

  fetchOptions: {
    revalidate: process.env.NODE_ENV === "development" ? 0 : 60,
  },
});
