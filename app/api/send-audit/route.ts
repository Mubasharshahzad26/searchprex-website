import { createClient } from "@supabase/supabase-js";
import { NextResponse } from "next/server";

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
);

export async function POST(req: Request) {
  const { name, email, website, business } = await req.json();
  await supabase.from("audit_requests").insert({ name, email, website, business });
  return NextResponse.json({ success: true });
}