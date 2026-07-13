import { sanityFetch } from "@/sanity/lib/live";
import { client } from "@/sanity/lib/client";
import {
  PAGE_QUERY,
  PAGE_BY_ID_QUERY,
  ALL_PAGES_QUERY,
  PAGE_PATHS_QUERY,
} from "@/sanity/queries/pages";
import type { Page } from "@/sanity/types/advanced";

export async function getPage(slug: string): Promise<Page | null> {
  try {
    const { data } = await sanityFetch({
      query: PAGE_QUERY,
      params: { slug },
    });
    return data as Page | null;
  } catch (error) {
    console.error("Error fetching page:", error);
    return null;
  }
}

/**
 * Fetch a single page by its Sanity _id (used when slug may be missing)
 */
export async function getPageById(id: string): Promise<Page | null> {
  try {
    const { data } = await sanityFetch({
      query: PAGE_BY_ID_QUERY,
      params: { id },
    });
    return data as Page | null;
  } catch (error) {
    console.error("Error fetching page by id:", error);
    return null;
  }
}

/**
 * Fetch all pages
 */
export async function getAllPages() {
  try {
    const { data } = await sanityFetch({
      query: ALL_PAGES_QUERY,
    });
    return data;
  } catch (error) {
    console.error("Error fetching all pages:", error);
    return [];
  }
}

/**
 * Fetch all page paths for static generation.
 * Uses client.fetch directly (not sanityFetch) to avoid draftMode() being
 * called during generateStaticParams, which runs at build time.
 */
export async function getPagePaths(): Promise<string[]> {
  try {
    const data = await client.fetch<string[]>(PAGE_PATHS_QUERY);
    return data || [];
  } catch (error) {
    console.error("Error fetching page paths:", error);
    return [];
  }
}
