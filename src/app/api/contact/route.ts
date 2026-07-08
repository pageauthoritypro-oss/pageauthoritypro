import { NextRequest, NextResponse } from "next/server";
import { contactFormSchema } from "@/lib/validations/contact";
import { getPrisma } from "@/lib/prisma";

async function verifyTurnstile(token: string, secretKey: string) {
  const response = await fetch(
    "https://challenges.cloudflare.com/turnstile/v0/siteverify",
    {
      method: "POST",
      headers: { "Content-Type": "application/x-www-form-urlencoded" },
      body: new URLSearchParams({ secret: secretKey, response: token }),
    },
  );
  const data = (await response.json()) as { success: boolean };
  return data.success;
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

  if (hp_check) {
    return NextResponse.json({ success: true });
  }

  const turnstileSecret = process.env.TURNSTILE_SECRET_KEY;
  if (turnstileSecret) {
    if (
      !turnstileToken ||
      !(await verifyTurnstile(turnstileToken, turnstileSecret))
    ) {
      return NextResponse.json(
        { error: "Verification failed. Please try again." },
        { status: 400 },
      );
    }
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
