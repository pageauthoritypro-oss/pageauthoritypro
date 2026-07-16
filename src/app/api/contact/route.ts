import { NextRequest, NextResponse } from "next/server";
import { contactFormSchema, formatPhoneNumber } from "@/lib/validations/contact";
import { getPrisma } from "@/lib/prisma";

const TURNSTILE_TIMEOUT_MS = 8000;

async function verifyTurnstile(token: string, secretKey: string) {
  try {
    const response = await fetch(
      "https://challenges.cloudflare.com/turnstile/v0/siteverify",
      {
        method: "POST",
        headers: { "Content-Type": "application/x-www-form-urlencoded" },
        body: new URLSearchParams({ secret: secretKey, response: token }),
        signal: AbortSignal.timeout(TURNSTILE_TIMEOUT_MS),
      },
    );
    const data: unknown = await response.json();
    return typeof data === "object" && data !== null && "success" in data
      ? Boolean((data as { success: unknown }).success)
      : false;
  } catch (error) {
    console.error("Turnstile verification request failed:", error);
    return false;
  }
}

export async function POST(request: NextRequest) {
  const body = await request.json().catch(() => null);
  const parsed = contactFormSchema.safeParse(body);

  if (!parsed.success) {
    return NextResponse.json(
      { error: "Please check the form and try again." },
      { status: 400 },
    );
  }

  const { hp_check, turnstileToken, ...fieldValues } = parsed.data;

  if (fieldValues.phone) {
    fieldValues.phone = formatPhoneNumber(fieldValues.phone);
  }

  if (hp_check) {
    return NextResponse.json({ success: true });
  }

  const turnstileSecret = process.env.TURNSTILE_SECRET_KEY;
  if (!turnstileSecret) {
    console.error("TURNSTILE_SECRET_KEY is not configured — rejecting submission.");
    return NextResponse.json(
      { error: "Something went wrong. Please try again later." },
      { status: 500 },
    );
  }

  if (
    !turnstileToken ||
    !(await verifyTurnstile(turnstileToken, turnstileSecret))
  ) {
    return NextResponse.json(
      { error: "Verification failed. Please try again." },
      { status: 400 },
    );
  }

  const fields = Object.entries(fieldValues).map(([name, value]) => ({
    name,
    label: name,
    value,
  }));

  const ip =
    request.headers.get("x-forwarded-for")?.split(",")[0]?.trim() || null;
  const userAgent = request.headers.get("user-agent");

  try {
    const prisma = getPrisma();
    await prisma.contactSubmission.create({
      data: { fields, ip, userAgent },
    });
  } catch (error) {
    console.error("Failed to save contact submission:", error);
    return NextResponse.json(
      { error: "Something went wrong. Please try again." },
      { status: 500 },
    );
  }

  return NextResponse.json({ success: true });
}
