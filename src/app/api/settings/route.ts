import { NextRequest, NextResponse } from "next/server";
import {
  getSiteSettings,
  getSeoSettings,
  getNavigationSettings,
  getAnalyticsSettings,
} from "@/sanity/helpers/settings";

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
