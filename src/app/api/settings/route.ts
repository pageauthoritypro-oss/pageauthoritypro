import { NextRequest, NextResponse } from "next/server";
import {
  getSiteSettings,
  getSeoSettings,
  getNavigationSettings,
  getAnalyticsSettings,
  clearSettingsCache,
} from "@/sanity/helpers/settings";

/**
 * GET /api/settings
 * Fetch site settings with optional type parameter
 * Query params:
 *   - type: 'all' | 'seo' | 'navigation' | 'analytics' (default: 'all')
 *   - cache: 'true' | 'false' (default: 'true')
 */
export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const type = searchParams.get("type") || "all";
    const useCache = searchParams.get("cache") !== "false";

    let data;

    switch (type) {
      case "seo":
        data = await getSeoSettings();
        break;
      case "navigation":
        data = await getNavigationSettings();
        break;
      case "analytics":
        data = await getAnalyticsSettings();
        break;
      case "all":
      default:
        data = await getSiteSettings({ cache: useCache });
        break;
    }

    if (!data) {
      return NextResponse.json(
        { error: "Settings not found" },
        { status: 404 },
      );
    }

    return NextResponse.json(data, {
      headers: {
        "Cache-Control": useCache ? "public, s-maxage=300" : "no-store",
      },
    });
  } catch (error) {
    console.error("Error in settings API:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 },
    );
  }
}

/**
 * POST /api/settings/clear-cache
 * Clear the settings cache
 */
export async function POST(request: NextRequest) {
  try {
    const { pathname } = new URL(request.url);

    if (pathname.endsWith("/clear-cache")) {
      clearSettingsCache();
      return NextResponse.json({ success: true, message: "Cache cleared" });
    }

    return NextResponse.json({ error: "Invalid endpoint" }, { status: 404 });
  } catch (error) {
    console.error("Error clearing cache:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 },
    );
  }
}
