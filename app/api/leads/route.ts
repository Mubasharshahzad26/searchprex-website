import { NextResponse } from "next/server";
import { createClient } from "@supabase/supabase-js";
 
/*
  Route handler for the homepage lead form → /api/leads
  Place this file at:  app/api/leads/route.ts
 
  Requires env vars (you already use Supabase for audit leads):
    NEXT_PUBLIC_SUPABASE_URL
    SUPABASE_SERVICE_ROLE_KEY   (server-only — never expose to client)
 
  Expects a table `leads` with columns:
    id (uuid, default gen_random_uuid), name (text), email (text),
    website (text), source (text), created_at (timestamptz default now())
 
  If you already have a leads-insert helper, swap the insert below for it.
*/
 
export async function POST(req: Request) {
  try {
    const { name, email, website, source, industry, message } = await req.json();
 
    // Basic server-side validation
    if (!email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      return NextResponse.json({ error: "Valid email required" }, { status: 400 });
    }
 
    const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
    const key = process.env.SUPABASE_SERVICE_ROLE_KEY;
    if (!url || !key) {
      return NextResponse.json({ error: "Server not configured" }, { status: 500 });
    }
 
    const supabase = createClient(url, key);

    const base = {
      name: name || null,
      email,
      website: website || null,
      source: source || "homepage-lead-form",
      industry: industry || null,
    };

    // `message` is the free-text "tell me what is happening to your business"
    // field from the homepage form. It is the most valuable thing a lead sends
    // and it must never be the reason a lead is dropped, so:
    //   1. try the insert with a dedicated `message` column;
    //   2. if the table has no such column, retry without it and carry the text
    //      in `source` instead — degraded, but the lead and its context survive.
    // Add `message text` to the `leads` table and step 2 stops being reachable.
    const text = typeof message === "string" ? message.trim() : "";

    // Built as one object with an explicit type rather than a ternary. A
    // ternary produces a union of two row shapes, which the Supabase client's
    // excess-property check rejects outright.
    type LeadRow = typeof base & { message?: string };
    const payload: LeadRow = { ...base };
    if (text) payload.message = text;

    let { error } = await supabase.from("leads").insert(payload);

    if (error && text) {
      const retry = await supabase.from("leads").insert({
        ...base,
        source: `${base.source} | issue: ${text}`.slice(0, 1000),
      });
      error = retry.error;
    }

    if (error) {
      console.error("leads insert failed:", error);
      return NextResponse.json({ error: "Could not save lead" }, { status: 500 });
    }
 
    return NextResponse.json({ ok: true }, { status: 200 });
  } catch {
    return NextResponse.json({ error: "Invalid request" }, { status: 400 });
  }
}
 































































