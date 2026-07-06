import { NextResponse } from "next/server";
import { clearSettingsCache } from "@/sanity/helpers/settings";

/**
 * POST /api/settings/clear-cache
 * Clear the site settings cache
 */
export async function POST() {
  try {
    clearSettingsCache();

    return NextResponse.json({
      success: true,
      message: "Settings cache cleared successfully",
    });
  } catch (error) {
    console.error("Error clearing cache:", error);
    return NextResponse.json(
      { error: "Failed to clear cache" },
      { status: 500 },
    );
  }
}
