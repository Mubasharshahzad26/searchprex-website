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
    const { name, email, website, source } = await req.json();
 
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
    const { error } = await supabase.from("leads").insert({
      name: name || null,
      email,
      website: website || null,
      source: source || "homepage-lead-form",
    });
 
    if (error) {
      return NextResponse.json({ error: "Could not save lead" }, { status: 500 });
    }
 
    return NextResponse.json({ ok: true }, { status: 200 });
  } catch {
    return NextResponse.json({ error: "Invalid request" }, { status: 400 });
  }
}
 































































