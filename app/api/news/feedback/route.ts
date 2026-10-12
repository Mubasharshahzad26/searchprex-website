// app/api/news/feedback/route.ts
import { NextRequest, NextResponse } from "next/server";
import { saveNewsFeedback } from "@/lib/news-interactions";

export const dynamic = "force-dynamic";

export async function POST(req: NextRequest) {
  let body: any = {};
  try {
    body = await req.json();
  } catch {
    return NextResponse.json({ ok: false, error: "Invalid JSON payload" }, { status: 400 });
  }

  // Honeypot: bots fill hidden "website" field
  if (body.website) return NextResponse.json({ ok: true });

  try {
    const res = await saveNewsFeedback({
      name: body.name,
      email: body.email,
      industry: body.industry,
      lookingFor: body.lookingFor,
      likes: body.likes,
      page: body.page,
    });
    if (!res.ok) return NextResponse.json(res, { status: 400 });
    return NextResponse.json({ ok: true });
  } catch (error) {
    console.error("[api/news/feedback] POST error:", error);
    return NextResponse.json({ ok: false, error: "Server processing error" }, { status: 500 });
  }
}
