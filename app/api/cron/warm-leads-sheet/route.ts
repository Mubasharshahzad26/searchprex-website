// app/api/cron/warm-leads-sheet/route.ts
//
// Keeps the lead-capture Apps Script warm.
//
// THE PROBLEM THIS SOLVES
//
// Google Apps Script containers go cold. The first request after an idle period
// takes well over ten seconds, and measured on production that is long enough
// for the serverless function to give up while Google goes on to write the row:
//
//     POST /api/reality-check  ->  500 "Could not save your request"
//     sheet leadsStored        ->  8 -> 10   (the row was written anyway)
//     immediate retry, warm    ->  200 {"ok":true}
//
// The lead is not lost — it is in the sheet. What the visitor sees is an error
// telling them it failed, so they submit again and the sheet gets a duplicate.
// On the site's primary CTA that is not acceptable, and it happens precisely
// when traffic is thin, which is exactly the situation now.
//
// NOT SCHEDULED. This project is on Vercel's Hobby plan, where a cron can only
// run once a day, and a daily warm-up warms nothing. The entry was in
// vercel.json for a while at */10 and — together with a `_comment` key that the
// cron schema does not accept — it made the file invalid, so every deployment
// after it was rejected. Several commits looked like they were not working when
// in fact they were never deployed.
//
// It is kept because the real fix made it unnecessary rather than wrong: the
// sheet write now retries with an idempotency key (lib/leads-store.ts), so a
// cold start costs a few seconds instead of a false failure, and a retry that
// follows a write which already succeeded cannot duplicate the row.
//
// Call it by hand to check reachability and latency from the deployment, or
// schedule it if the project ever moves to a plan with sub-daily crons.
//
// The GET is the script's own health check: it reads the sheet and returns a
// row count. It writes nothing.

import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export const dynamic = "force-dynamic";
export const maxDuration = 30;

export async function GET(req: NextRequest) {
  // Vercel signs its cron invocations. Without this the endpoint is a free
  // outbound request for anyone who finds it.
  const secret = process.env.CRON_SECRET;
  if (secret) {
    const auth = req.headers.get("authorization");
    if (auth !== `Bearer ${secret}`) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }
  }

  const url = process.env.LEADS_SHEET_WEBHOOK_URL;
  if (!url) {
    return NextResponse.json({ ok: false, reason: "LEADS_SHEET_WEBHOOK_URL not set" }, { status: 200 });
  }

  const started = Date.now();
  try {
    const res = await fetch(url, {
      method: "GET",
      signal: AbortSignal.timeout(25_000),
      redirect: "follow",
      cache: "no-store",
    });
    const text = await res.text();
    const ms = Date.now() - started;

    // A slow warm-up is the signal worth having: if this regularly takes more
    // than ten seconds, the interval is too long or the script is doing too
    // much in doGet.
    if (ms > 10_000) console.warn(`[warm-leads-sheet] slow: ${ms}ms`);

    let leadsStored: number | null = null;
    try {
      leadsStored = JSON.parse(text)?.leadsStored ?? null;
    } catch {
      /* the script returned something unexpected; ms is still the useful part */
    }

    return NextResponse.json({ ok: res.ok, ms, leadsStored });
  } catch (err) {
    const ms = Date.now() - started;
    console.error(`[warm-leads-sheet] failed after ${ms}ms:`, String(err).slice(0, 200));
    return NextResponse.json({ ok: false, ms, error: String(err).slice(0, 200) }, { status: 200 });
  }
}
