import { NextResponse } from "next/server";
import { db } from "@/lib/db";

export async function POST(req: Request) {
  try {
    const { leads } = await req.json();
    if (!leads || !Array.isArray(leads)) {
      return NextResponse.json({ error: "Invalid payload. Expected an array of leads." }, { status: 400 });
    }

    let addedCount = 0;
    
    // We process sequentially to avoid overwhelming the Neon DB connection pool
    for (const lead of leads) {
      if (!lead.url) continue;
      
      let cleanUrl = lead.url.trim().replace(/\/$/, "");
      if (!cleanUrl.startsWith("http")) {
        cleanUrl = "https://" + cleanUrl;
      }

      try {
        const existing = await db.aiSdrLead.findUnique({ 
          where: { websiteUrl: cleanUrl } 
        });

        if (!existing) {
          await db.aiSdrLead.create({
            data: {
              websiteUrl: cleanUrl,
              companyName: lead.companyName || "Unknown",
              contactEmail: lead.email || null,
              niche: lead.niche || "CSV Import",
              location: lead.location || null,
              status: "new"
            }
          });
          addedCount++;
        }
      } catch (e) {
        console.error("Failed to insert row from CSV:", cleanUrl, e);
      }
    }

    return NextResponse.json({ success: true, added: addedCount });
  } catch (err: any) {
    console.error("Bulk Upload Error:", err);
    return NextResponse.json({ error: err.message }, { status: 500 });
  }
}
