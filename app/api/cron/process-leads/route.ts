import { NextResponse } from "next/server";
import { db } from "@/lib/db";
import { GoogleGenAI, Type } from "@google/genai";
import { Resend } from "resend";
import * as cheerio from "cheerio";

// Next.js config to allow cron job to run for up to max duration (Pro/Hobby limits apply)
export const maxDuration = 60;
export const dynamic = "force-dynamic";

export async function GET(req: Request) {
  try {
    // 1. Security Check
    const authHeader = req.headers.get("authorization");
    if (process.env.CRON_SECRET && authHeader !== `Bearer ${process.env.CRON_SECRET}`) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    // 2. Fetch a small batch of unprocessed leads (e.g., 3 at a time to avoid timeouts)
    const leads = await db.aiSdrLead.findMany({
      where: { status: "new" },
      take: 3,
      orderBy: { createdAt: "asc" }
    });

    if (leads.length === 0) {
      return NextResponse.json({ message: "No new leads to process." });
    }

    const ai = process.env.GEMINI_API_KEY ? new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY }) : null;
    const resend = process.env.RESEND_API_KEY ? new Resend(process.env.RESEND_API_KEY) : null;
    
    if (!ai) return NextResponse.json({ error: "Gemini API key missing" }, { status: 500 });

    const results = [];

    // 3. Process Each Lead
    for (const lead of leads) {
      try {
        // Step A: Fetch & Scrape Website
        const controller = new AbortController();
        const timeoutId = setTimeout(() => controller.abort(), 8000);
        const res = await fetch(lead.websiteUrl, { signal: controller.signal });
        clearTimeout(timeoutId);
        
        const html = await res.text();
        const $ = cheerio.load(html);
        $("script, style, img, svg, iframe, noscript").remove();
        const cleanText = $("body").text().replace(/\s+/g, " ").trim().substring(0, 15000);

        // Step B: AI Scoring
        const analysisResponse = await ai.models.generateContent({
          model: "gemini-2.5-flash",
          contents: `Analyze this business website content.
          Extract:
          1. Company Name.
          2. Primary niche.
          3. Primary location.
          4. 2-sentence 'analysis' of SEO/content flaws.
          5. Score (1-100) indicating need for SEO services.
          Content: ${cleanText}`,
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

        const analysisData = JSON.parse(analysisResponse.text || "{}");
        const score = analysisData.score || 0;

        // Step C: If qualified (> 70), send email
        if (score >= 70 && resend) {
          const emailResponse = await ai.models.generateContent({
            model: "gemini-2.5-flash",
            contents: `You are an expert SEO Sales Representative for "SearchPrex".
            Write a short, highly personalized cold email to:
            Company: ${analysisData.companyName}
            Niche: ${analysisData.niche}
            Flaws: ${analysisData.analysis}
            Output JSON with 'subject' and 'body' (HTML allowed).`,
            config: {
              responseMimeType: "application/json",
              responseSchema: {
                type: Type.OBJECT,
                properties: { subject: { type: Type.STRING }, body: { type: Type.STRING } },
                required: ["subject", "body"]
              }
            }
          });

          const emailData = JSON.parse(emailResponse.text || "{}");
          const recipientEmail = lead.contactEmail || "mubasharshahzad726@gmail.com";

          const { error } = await resend.emails.send({
            from: "SearchPrex SDR <onboarding@resend.dev>",
            to: [recipientEmail],
            subject: emailData.subject,
            html: emailData.body,
          });

          if (!error) {
            await db.aiSdrEmailLog.create({
              data: { leadId: lead.id, subject: emailData.subject, body: emailData.body, status: "sent" }
            });

            await db.aiSdrLead.update({
              where: { id: lead.id },
              data: { ...analysisData, status: "emailed" }
            });
          }
        } else {
          // Score too low or no resend key -> just mark qualified or rejected
          await db.aiSdrLead.update({
            where: { id: lead.id },
            data: { ...analysisData, status: score >= 70 ? "qualified" : "rejected" }
          });
        }

        // Step D: Google Sheets Webhook Sync (Optional)
        if (process.env.GOOGLE_SHEETS_WEBHOOK_URL) {
          await fetch(process.env.GOOGLE_SHEETS_WEBHOOK_URL, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ ...lead, ...analysisData, action: score >= 70 ? "Emailed" : "Rejected" })
          });
        }

        results.push({ url: lead.websiteUrl, score, status: "success" });

      } catch (err: any) {
        console.error(`Failed processing lead ${lead.websiteUrl}:`, err);
        results.push({ url: lead.websiteUrl, status: "error", error: err.message });
        // Mark as rejected so we don't infinitely retry broken URLs
        await db.aiSdrLead.update({ where: { id: lead.id }, data: { status: "rejected" } });
      }
    }

    return NextResponse.json({ message: "Batch processed", results });
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
