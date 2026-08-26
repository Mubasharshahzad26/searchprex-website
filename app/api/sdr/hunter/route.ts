import { NextResponse } from "next/server";
import { db } from "@/lib/db";

export async function POST(req: Request) {
  try {
    const { query } = await req.json();
    
    if (!query) {
      return NextResponse.json({ error: "Search query is required." }, { status: 400 });
    }

    if (!process.env.GOOGLE_MAPS_API_KEY) {
      return NextResponse.json({ 
        error: "GOOGLE_MAPS_API_KEY is missing. Please add it to Vercel to enable the Lead Hunter." 
      }, { status: 500 });
    }

    // Call Google Places API (New)
    const response = await fetch("https://places.googleapis.com/v1/places:searchText", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "X-Goog-Api-Key": process.env.GOOGLE_MAPS_API_KEY,
        // Request only the data we need to save costs
        "X-Goog-FieldMask": "places.displayName,places.websiteUri,places.formattedAddress"
      },
      body: JSON.stringify({ 
        textQuery: query,
        pageSize: 20 // Google max is usually 20 per page for text search
      })
    });

    if (!response.ok) {
      const errText = await response.text();
      console.error("Google Places API Error:", errText);
      return NextResponse.json({ error: "Failed to fetch from Google Places API." }, { status: 500 });
    }

    const data = await response.json();
    const places = data.places || [];

    let addedCount = 0;

    for (const place of places) {
      // Only process places that actually have a website
      if (place.websiteUri) {
        // Clean URL (remove trailing slashes, etc.)
        const cleanUrl = place.websiteUri.replace(/\/$/, "");
        
        try {
          // Attempt to insert without overwriting existing leads
          const existing = await db.aiSdrLead.findUnique({
            where: { websiteUrl: cleanUrl }
          });

          if (!existing) {
            await db.aiSdrLead.create({
              data: {
                websiteUrl: cleanUrl,
                companyName: place.displayName?.text || "Unknown",
                location: place.formattedAddress || "Unknown",
                status: "new",
                niche: query // Temporarily store the search query as the niche hint
              }
            });
            addedCount++;
          }
        } catch (e) {
          console.error("Error inserting lead:", e);
        }
      }
    }

    return NextResponse.json({ 
      success: true, 
      found: places.length, 
      added: addedCount,
      message: `Found ${places.length} businesses. Added ${addedCount} new URLs with websites to the pipeline.`
    });

  } catch (error: any) {
    console.error("Hunter Error:", error);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
