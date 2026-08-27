import { NextResponse } from "next/server";
import { db } from "@/lib/db";

export async function POST(req: Request) {
  try {
    const data = await req.json();
    
    // Support multiple field names to be flexible with Zapier/Make
    const url = data.url || data.website || data.websiteUrl;
    
    if (!url) {
      return NextResponse.json({ error: "Missing 'url' field in payload" }, { status: 400 });
    }

    let cleanUrl = url.trim().replace(/\/$/, "");
    if (!cleanUrl.startsWith("http")) {
      cleanUrl = "https://" + cleanUrl;
    }

    const existing = await db.aiSdrLead.findUnique({ where: { websiteUrl: cleanUrl } });
    
    if (!existing) {
      await db.aiSdrLead.create({
        data: {
          websiteUrl: cleanUrl,
          companyName: data.companyName || data.company || "Unknown",
          contactEmail: data.email || data.contactEmail || null,
          niche: data.niche || "Webhook Import",
          location: data.location || null,
          status: "new"
        }
      });
      return NextResponse.json({ success: true, message: "Lead captured successfully via Webhook" });
    }
    
    return NextResponse.json({ success: true, message: "Lead already exists" });
  } catch(e: any) {
    console.error("Webhook Error:", e);
    return NextResponse.json({ error: e.message }, { status: 500 });
  }
}
