import { NextResponse } from "next/server";
import { db } from "@/lib/db";
import { processLead } from "@/lib/sdr/process";

/**
 * Qualifies new SDR leads and saves drafts for review. It never sends.
 *
 * This route used to score leads with Gemini and, for any score of 70 or more,
 * have Gemini write and Resend send an email straight away — from the primary
 * domain, with a personal Gmail address as the fallback recipient when a lead
 * had no email — and then send model-written follow-ups three days later. No
 * person saw any of it. Every send now goes through /api/sdr/outreach, one
 * reviewed draft at a time.
 */

export const maxDuration = 60;
export const dynamic = "force-dynamic";

/** Stop starting new leads after this long, to finish inside maxDuration. */
const BUDGET_MS = 40_000;
const MAX_PER_RUN = 5;

export async function GET(req: Request) {
  //  Fail closed: without a secret configured there is no way to tell the
  //  scheduler from anyone else.
  const secret = process.env.CRON_SECRET;
  if (!secret || req.headers.get("authorization") !== `Bearer ${secret}`) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const started = Date.now();
  const leads = await db.aiSdrLead.findMany({
    where: { status: "new" },
    take: MAX_PER_RUN,
    orderBy: { createdAt: "asc" },
    select: { id: true, websiteUrl: true },
  });

  if (leads.length === 0) return NextResponse.json({ message: "No new leads to process." });

  const results: Array<{ url: string; status: string; error?: string }> = [];
  for (const lead of leads) {
    if (Date.now() - started > BUDGET_MS) break;
    try {
      const updated = await processLead(lead.id);
      results.push({ url: lead.websiteUrl, status: updated.status });
    } catch (err: any) {
      console.error(`Failed processing lead ${lead.websiteUrl}:`, err);
      results.push({ url: lead.websiteUrl, status: "error", error: err.message });
    }
  }

  const remaining = await db.aiSdrLead.count({ where: { status: "new" } });
  return NextResponse.json({ processed: results.length, remaining, results, sent: 0 });
}
