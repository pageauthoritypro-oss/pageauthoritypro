import { sanityFetch } from "@/sanity/lib/live";
import {
  SITE_SETTINGS_QUERY,
  SEO_SETTINGS_QUERY,
  NAVIGATION_QUERY,
  ANALYTICS_QUERY,
} from "@/sanity/queries/settings";
import type { SiteSettings } from "@/sanity/types";

// `options.cache` is accepted for backward compatibility with existing call
// sites but no longer changes behavior - sanityFetch's own revalidate window
// (see src/sanity/lib/live.ts) already provides Next's shared Data Cache. A
// separate in-memory cache here doesn't work reliably across serverless
// instances and was causing settings (including maintenance mode) to serve
// stale data for far longer than intended.
export async function getSiteSettings(
  _options: { cache?: boolean } = { cache: true },
): Promise<SiteSettings | null> {
  try {
    const { data } = await sanityFetch({
      query: SITE_SETTINGS_QUERY,
    });
    return data as SiteSettings | null;
  } catch (error) {
    console.error("Error fetching site settings:", error);
    return null;
  }
}

export async function getSeoSettings() {
  try {
    const { data } = await sanityFetch({
      query: SEO_SETTINGS_QUERY,
    });
    return data;
  } catch (error) {
    console.error("Error fetching SEO settings:", error);
    return null;
  }
}

export async function getNavigationSettings() {
  try {
    const { data } = await sanityFetch({
      query: NAVIGATION_QUERY,
    });
    return data;
  } catch (error) {
    console.error("Error fetching navigation settings:", error);
    return null;
  }
}

export async function getAnalyticsSettings() {
  try {
    const { data } = await sanityFetch({
      query: ANALYTICS_QUERY,
    });
    return data;
  } catch (error) {
    console.error("Error fetching analytics settings:", error);
    return null;
  }
}

export async function isMaintenanceMode(): Promise<boolean> {
  const maintenance = await getMaintenanceMode();
  return maintenance?.enabled ?? false;
}

export async function getMaintenanceMode(): Promise<
  SiteSettings["maintenanceMode"] | null
> {
  const settings = await getSiteSettings();
  return settings?.maintenanceMode ?? null;
}
