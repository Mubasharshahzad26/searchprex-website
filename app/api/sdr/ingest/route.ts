import { NextResponse } from "next/server";
import { db } from "@/lib/db";
import { GoogleGenAI, Type } from "@google/genai";
import * as cheerio from "cheerio";

export async function POST(req: Request) {
  try {
    const { url } = await req.json();
    if (!url) return NextResponse.json({ error: "URL is required" }, { status: 400 });

    // 1. Fetch the prospect's website
    let html = "";
    try {
      const controller = new AbortController();
      const timeoutId = setTimeout(() => controller.abort(), 10000);
      const res = await fetch(url, { signal: controller.signal });
      clearTimeout(timeoutId);
      html = await res.text();
    } catch (e) {
      console.error("Failed to fetch url", e);
      return NextResponse.json({ error: "Could not reach the provided URL." }, { status: 400 });
    }

    // Parse and clean HTML to save tokens
    const $ = cheerio.load(html);
    $("script, style, img, svg, iframe, noscript").remove();
    const cleanText = $("body").text().replace(/\s+/g, " ").trim().substring(0, 15000); // Send max ~15k chars to Gemini

    // 2. Pass to Gemini for Lead Scoring
    if (!process.env.GEMINI_API_KEY) {
      return NextResponse.json({ error: "GEMINI_API_KEY is not configured in environment." }, { status: 500 });
    }

    const ai = new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY });
    
    const response = await ai.models.generateContent({
      model: "gemini-2.5-flash",
      contents: `You are an expert SEO Sales Development Representative. Analyze this business website content.
      
      Extract the following information:
      1. Company Name.
      2. Their primary niche/industry (e.g., Personal Injury Law, Plumber, Shopify Store).
      3. Their primary location (City, State) if mentioned.
      4. A brief, ruthless 2-sentence 'analysis' of their obvious SEO or content flaws based on this text (e.g., missing clear value propositions, thin content, no clear H1s). 
      5. A 'score' from 1 to 100 indicating how desperately they need professional SEO services (higher score = they need us badly).

      Website Content:
      ${cleanText}`,
      config: {
        responseMimeType: "application/json",
        responseSchema: {
          type: Type.OBJECT,
          properties: {
            companyName: { type: Type.STRING },
            niche: { type: Type.STRING },
            location: { type: Type.STRING },
            analysis: { type: Type.STRING },
            score: { type: Type.INTEGER }
          },
          required: ["companyName", "niche", "location", "analysis", "score"]
        }
      }
    });

    const data = JSON.parse(response.text || "{}");

    // 3. Save to Database
    const lead = await db.aiSdrLead.upsert({
      where: { websiteUrl: url },
      update: {
        companyName: data.companyName || "Unknown",
        niche: data.niche || "Unknown",
        location: data.location || "Unknown",
        analysis: data.analysis,
        score: data.score,
        status: "qualified", // Moving them to qualified since they were successfully analyzed
      },
      create: {
        websiteUrl: url,
        companyName: data.companyName || "Unknown",
        niche: data.niche || "Unknown",
        location: data.location || "Unknown",
        analysis: data.analysis,
        score: data.score,
        status: "qualified",
      }
    });

    return NextResponse.json({ success: true, lead });
  } catch (error: any) {
    console.error("SDR Ingest Error:", error);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
