// app/api/newsletter/subscribe/route.ts
import { NextRequest, NextResponse } from "next/server";
import { subscribeToNewsletter } from "@/lib/newsletter";

export const dynamic = "force-dynamic";
export const maxDuration = 60;

export async function POST(req: NextRequest) {
  let body: Record<string, unknown>;
  try {
    body = await req.json();
  } catch {
    return NextResponse.json({ ok: false, error: "Invalid request payload" }, { status: 400 });
  }

  const email = typeof body.email === "string" ? body.email.trim() : "";
  const source =
    typeof body.source === "string" && body.source.trim()
      ? body.source.trim()
      : req.headers.get("referer") || "blog-newsletter";
  const categories = Array.isArray(body.categories)
    ? body.categories.filter((c): c is string => typeof c === "string")
    : [];

  const result = await subscribeToNewsletter({ email, source, categories });

  if (!result.ok) {
    return NextResponse.json(
      { ok: false, error: result.error || "Subscription failed. Please try again." },
      { status: 400 }
    );
  }

  return NextResponse.json({
    ok: true,
    alreadySubscribed: result.alreadySubscribed ?? false,
    welcomeEmailSent: result.welcomeEmailSent ?? false,
  });
}

export async function GET() {
  return NextResponse.json({
    route: "newsletter/subscribe",
    resendConfigured: Boolean(process.env.RESEND_API_KEY),
    databaseConfigured: Boolean(process.env.DATABASE_URL),
  });
}
