import { NextResponse } from "next/server";
import { db } from "@/lib/db";
import { sdrAdminGuard } from "@/lib/sdr/guard";
import { processLead } from "@/lib/sdr/process";

/**
 * Adds one store by URL and qualifies it immediately, so the admin sees the
 * findings and the draft (or the reason there is none) straight away.
 *
 * It used to ask Gemini for a "ruthless" analysis of the site's flaws and a
 * need-for-SEO score from the page text alone, and mark every lead qualified.
 * Qualification is now the deterministic checks in lib/sdr/qualify.ts.
 */

export const maxDuration = 60;

export async function POST(req: Request) {
  const denied = await sdrAdminGuard();
  if (denied) return denied;

  try {
    const { url } = await req.json();
    if (!url || typeof url !== "string") return NextResponse.json({ error: "URL is required" }, { status: 400 });

    let clean = url.trim().replace(/\/$/, "");
    if (!/^https?:\/\//.test(clean)) clean = `https://${clean}`;
    try {
      new URL(clean);
    } catch {
      return NextResponse.json({ error: "That isn't a valid URL." }, { status: 400 });
    }

    const lead = await db.aiSdrLead.upsert({
      where: { websiteUrl: clean },
      update: {},
      create: { websiteUrl: clean, companyName: "Unknown", niche: "Manual", status: "new" },
    });

    const processed = await processLead(lead.id);
    return NextResponse.json({ success: true, lead: processed });
  } catch (error: any) {
    console.error("SDR Ingest Error:", error);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
