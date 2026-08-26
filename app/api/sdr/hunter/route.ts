import { NextResponse } from "next/server";
import { db } from "@/lib/db";

export async function POST(req: Request) {
  try {
    const { query } = await req.json();
    
    if (!query) {
      return NextResponse.json({ error: "Search query is required." }, { status: 400 });
    }

    if (!process.env.GOOGLE_MAPS_API_KEY && !process.env.SERPAPI_API_KEY) {
      return NextResponse.json({ 
        error: "Missing API Key. Please add either GOOGLE_MAPS_API_KEY or SERPAPI_API_KEY to Vercel." 
      }, { status: 500 });
    }

    let placesToProcess = [];

    // --- OPTION A: Google Maps API (Preferred) ---
    if (process.env.GOOGLE_MAPS_API_KEY) {
      const response = await fetch("https://places.googleapis.com/v1/places:searchText", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "X-Goog-Api-Key": process.env.GOOGLE_MAPS_API_KEY,
          "X-Goog-FieldMask": "places.displayName,places.websiteUri,places.formattedAddress"
        },
        body: JSON.stringify({ 
          textQuery: query,
          pageSize: 20 
        })
      });

      if (response.ok) {
        const data = await response.json();
        const googlePlaces = data.places || [];
        placesToProcess = googlePlaces.map((p: any) => ({
          websiteUri: p.websiteUri,
          displayName: p.displayName?.text,
          address: p.formattedAddress
        }));
      } else {
        console.error("Google Places Error:", await response.text());
      }
    } 
    // --- OPTION B: SerpApi (Free Fallback) ---
    else if (process.env.SERPAPI_API_KEY) {
      const response = await fetch(`https://serpapi.com/search.json?engine=google_local&q=${encodeURIComponent(query)}&api_key=${process.env.SERPAPI_API_KEY}`);
      if (response.ok) {
        const data = await response.json();
        const localResults = data.local_results || [];
        placesToProcess = localResults.map((p: any) => ({
          websiteUri: p.links?.website || p.website,
          displayName: p.title,
          address: p.address
        }));
      } else {
        console.error("SerpApi Error:", await response.text());
      }
    }

    if (placesToProcess.length === 0) {
      return NextResponse.json({ error: "Failed to fetch leads or no leads found." }, { status: 500 });
    }

    let addedCount = 0;

    for (const place of placesToProcess) {
      if (place.websiteUri) {
        const cleanUrl = place.websiteUri.replace(/\/$/, "");
        
        try {
          const existing = await db.aiSdrLead.findUnique({
            where: { websiteUrl: cleanUrl }
          });

          if (!existing) {
            await db.aiSdrLead.create({
              data: {
                websiteUrl: cleanUrl,
                companyName: place.displayName || "Unknown",
                location: place.address || "Unknown",
                status: "new",
                niche: query 
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
      found: placesToProcess.length, 
      added: addedCount,
      message: `Found ${placesToProcess.length} businesses. Added ${addedCount} new URLs with websites to the pipeline.`
    });

  } catch (error: any) {
    console.error("Hunter Error:", error);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
