import { sanityFetch } from "@/sanity/lib/live";
import {
  SITE_SETTINGS_QUERY,
  SEO_SETTINGS_QUERY,
  NAVIGATION_QUERY,
  ANALYTICS_QUERY,
} from "@/sanity/queries/settings";
import type { SiteSettings } from "@/sanity/types";

// Cache settings for 5 minutes
const CACHE_DURATION = 5 * 60 * 1000;
let cachedSettings: { data: SiteSettings | null; timestamp: number } | null =
  null;

/**
 * Fetch all site settings with optional caching
 * Uses Sanity Live for real-time updates
 */
export async function getSiteSettings(
  options: { cache?: boolean } = { cache: true },
): Promise<SiteSettings | null> {
  // Return cached data if valid
  if (
    options.cache &&
    process.env.NODE_ENV !== "development" &&
    cachedSettings &&
    Date.now() - cachedSettings.timestamp < CACHE_DURATION
  ) {
    return cachedSettings.data;
  }

  try {
    const { data } = await sanityFetch({
      query: SITE_SETTINGS_QUERY,
    });

    const settings = data as SiteSettings | null;

    // Update cache
    if (options.cache) {
      cachedSettings = {
        data: settings,
        timestamp: Date.now(),
      };
    }

    return settings;
  } catch (error) {
    console.error("Error fetching site settings:", error);
    return null;
  }
}

/**
 * Fetch only SEO settings
 */
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

/**
 * Fetch only navigation settings
 */
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

/**
 * Fetch only analytics settings
 */
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

/**
 * Clear the settings cache
 */
export function clearSettingsCache(): void {
  cachedSettings = null;
}

/**
 * Check if site is in maintenance mode
 */
export async function isMaintenanceMode(): Promise<boolean> {
  const settings = await getSiteSettings();
  return settings?.maintenanceMode?.enabled ?? false;
}
