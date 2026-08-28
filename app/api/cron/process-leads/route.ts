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

    // 2. Fetch a small batch of unprocessed leads (e.g., 1 at a time to avoid timeouts)
    const leads = await db.aiSdrLead.findMany({
      where: { status: "new" },
      take: 1,
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

        // Step B: Fetch Lighthouse Score
        let lighthouseScore = null;
        try {
          // Use Google PageSpeed Insights API
          const psRes = await fetch(`https://www.googleapis.com/pagespeedonline/v5/runPagespeed?url=${encodeURIComponent(lead.websiteUrl)}&strategy=mobile`);
          if (psRes.ok) {
            const psData = await psRes.json();
            // Score is a fraction 0-1, so multiply by 100
            lighthouseScore = Math.round((psData.lighthouseResult?.categories?.performance?.score || 0) * 100);
          }
        } catch (err) {
          console.error("Lighthouse fetch failed:", err);
        }

        // Step C: AI Scoring
        const analysisResponse = await ai.models.generateContent({
          model: "gemini-3.7-flash",
          contents: `Analyze this business website content.
          ${lighthouseScore !== null ? `I also ran a Google Lighthouse mobile performance test on this site and it scored a ${lighthouseScore}/100. If this score is below 75, highlight their slow mobile load times and poor Core Web Vitals as a critical flaw.` : ""}
          Extract:
          1. Company Name.
          2. Primary niche.
          3. Primary location.
          4. 2-sentence 'analysis' of SEO/content flaws (incorporating the Lighthouse score if provided and low).
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
            model: "gemini-3.7-flash",
            contents: `You are an expert SEO Sales Representative for "SearchPrex".
            Write a short, highly personalized cold email to:
            Company: ${analysisData.companyName}
            Niche: ${analysisData.niche}
            Flaws: ${analysisData.analysis}
            
            CRITICAL INSTRUCTIONS BASED ON NICHE:
            - If they are a **Law Firm**, pitch Local SEO Map Pack rankings AND our new "AI Intake Efficiency Software" that qualifies their legal leads 24/7.
            - If they are an **Ecommerce Store**, pitch Technical SEO, Product Schema, and organic revenue growth.
            - If they are **Local/Home Services**, pitch Google Business Profile dominance.
            
            Format:
            - Keep it short, punchy, and conversational (under 100 words).
            - Do not sound like a robot. No corporate jargon.
            - Mention their specific website flaw naturally.
            - End with a soft call-to-action (e.g., "Open to a quick audit video?").
            - Output JSON with 'subject' and 'body' (HTML allowed).`,
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
            from: "SearchPrex SDR <contact@searchprex.com>",
            to: [recipientEmail],
            subject: emailData.subject,
            html: emailData.body,
            tags: [{ name: 'lead_id', value: lead.id }]
          });

          if (!error) {
            await db.aiSdrEmailLog.create({
              data: { leadId: lead.id, subject: emailData.subject, body: emailData.body, status: "sent" }
            });

            await db.aiSdrLead.update({
              where: { id: lead.id },
              data: { 
                ...analysisData, 
                lighthouseScore,
                status: "emailed",
                emailCount: 1,
                lastEmailedAt: new Date()
              }
            });
          }
        } else {
          // Score too low or no resend key -> just mark qualified or rejected
          await db.aiSdrLead.update({
            where: { id: lead.id },
            data: { ...analysisData, lighthouseScore, status: score >= 70 ? "qualified" : "rejected" }
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
        await db.aiSdrLead.update({ where: { id: lead.id }, data: { status: "rejected" } });
      }
    }

    // 4. Follow-up Logic (Drip Campaign)
    const threeDaysAgo = new Date(Date.now() - 3 * 24 * 60 * 60 * 1000);
    const followupLeads = await db.aiSdrLead.findMany({
      where: {
        status: { in: ["emailed", "opened", "clicked"] },
        emailCount: { lt: 3, gt: 0 },
        lastEmailedAt: { lt: threeDaysAgo }
      },
      take: 1, // process 1 follow-up per cron tick to avoid timeouts
      include: { emailLogs: { orderBy: { sentAt: 'desc' }, take: 1 } }
    });

    for (const fLead of followupLeads) {
      try {
        const lastEmail = fLead.emailLogs[0];
        if (!lastEmail || !ai || !resend) continue;

        const followupResponse = await ai.models.generateContent({
          model: "gemini-3.7-flash",
          contents: `You are an expert SEO Sales Rep for "SearchPrex".
          3 days ago, you sent this cold email to ${fLead.companyName || 'this company'}:
          
          SUBJECT: ${lastEmail.subject}
          BODY: ${lastEmail.body}
          
          They did not reply. Write a short, casual 2-sentence follow-up email bumping the thread.
          No corporate jargon. Keep it incredibly brief and human.
          
          Output JSON with 'subject' (e.g. "Re: " + previous subject) and 'body' (HTML allowed).`,
          config: {
            responseMimeType: "application/json",
            responseSchema: {
              type: Type.OBJECT,
              properties: { subject: { type: Type.STRING }, body: { type: Type.STRING } },
              required: ["subject", "body"]
            }
          }
        });

        const emailData = JSON.parse(followupResponse.text || "{}");
        const recipientEmail = fLead.contactEmail || "mubasharshahzad726@gmail.com";

        const { error } = await resend.emails.send({
          from: "SearchPrex SDR <contact@searchprex.com>",
          to: [recipientEmail],
          subject: emailData.subject,
          html: emailData.body,
          tags: [{ name: 'lead_id', value: fLead.id }]
        });

        if (!error) {
          await db.aiSdrEmailLog.create({
            data: { leadId: fLead.id, subject: emailData.subject, body: emailData.body, status: "sent" }
          });
          await db.aiSdrLead.update({
            where: { id: fLead.id },
            data: { 
              emailCount: { increment: 1 },
              lastEmailedAt: new Date()
            }
          });
          results.push({ url: fLead.websiteUrl, action: "Follow-up Sent" });
        }
      } catch (err: any) {
        console.error("Failed follow-up", err);
      }
    }

    return NextResponse.json({ message: "Batch processed", results });
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
