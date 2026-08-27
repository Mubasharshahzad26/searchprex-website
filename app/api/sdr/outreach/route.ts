import { NextResponse } from "next/server";
import { db } from "@/lib/db";
import { GoogleGenAI, Type } from "@google/genai";
import { Resend } from "resend";

export async function POST(req: Request) {
  try {
    const { leadId } = await req.json();
    if (!leadId) return NextResponse.json({ error: "leadId is required" }, { status: 400 });

    const lead = await db.aiSdrLead.findUnique({ where: { id: leadId } });
    if (!lead) return NextResponse.json({ error: "Lead not found" }, { status: 404 });

    if (lead.status === "emailed" || lead.status === "responded") {
        return NextResponse.json({ error: "Lead has already been emailed." }, { status: 400 });
    }
    
    // Fallback to a placeholder email for testing if they didn't provide one
    const recipientEmail = lead.contactEmail || "mubasharshahzad726@gmail.com"; 

    // 1. Generate Email with Gemini
    if (!process.env.GEMINI_API_KEY) {
      return NextResponse.json({ error: "GEMINI_API_KEY is not configured in environment." }, { status: 500 });
    }

    const ai = new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY });
    
    const response = await ai.models.generateContent({
      model: "gemini-2.5-flash",
      contents: `You are an expert SEO Sales Representative for an agency called "SearchPrex".
      Write a highly personalized, converting cold email to a prospect.
      
      Prospect Data:
      - Company Name: ${lead.companyName}
      - Website: ${lead.websiteUrl}
      - Niche: ${lead.niche}
      - Flaws found by our AI: ${lead.analysis}
      
      Requirements:
      - If they are a **Law Firm**, pitch Local SEO Map Pack rankings AND our new "AI Intake Efficiency Software" that qualifies their legal leads 24/7.
      - If they are an **Ecommerce Store**, pitch Technical SEO, Product Schema, and organic revenue growth.
      - If they are **Local/Home Services**, pitch Google Business Profile dominance.
      - Keep it short, punchy, and conversational (under 100 words).
      - Do not sound like a robot. Do not use corporate jargon.
      - Mention their specific website flaw naturally.
      - End with a soft call-to-action (e.g., "Open to a quick audit video?").
      - Output a JSON object with a 'subject' line and the 'body' of the email (HTML formatting allowed).`,
      config: {
        responseMimeType: "application/json",
        responseSchema: {
          type: Type.OBJECT,
          properties: {
            subject: { type: Type.STRING },
            body: { type: Type.STRING } // HTML string
          },
          required: ["subject", "body"]
        }
      }
    });

    const data = JSON.parse(response.text || "{}");

    // 2. Send via Resend
    if (!process.env.RESEND_API_KEY) {
      return NextResponse.json({ error: "RESEND_API_KEY is missing." }, { status: 500 });
    }

    const resend = new Resend(process.env.RESEND_API_KEY);
    
    const { data: emailData, error } = await resend.emails.send({
      from: "SearchPrex SDR <contact@searchprex.com>",
      to: [recipientEmail],
      subject: data.subject,
      html: data.body,
      tags: [
        {
          name: 'lead_id',
          value: lead.id
        }
      ]
    });

    if (error) {
      return NextResponse.json({ error: error.message }, { status: 400 });
    }

    // 3. Log it
    await db.aiSdrEmailLog.create({
      data: {
        leadId: lead.id,
        subject: data.subject,
        body: data.body,
        status: "sent"
      }
    });

    const updatedLead = await db.aiSdrLead.update({
      where: { id: lead.id },
      data: { status: "emailed" },
      include: { emailLogs: true }
    });

    return NextResponse.json({ success: true, lead: updatedLead });
  } catch (error: any) {
    console.error("Outreach Error:", error);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
