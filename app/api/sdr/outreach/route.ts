import { NextResponse } from "next/server";
import { db } from "@/lib/db";
import { GoogleGenAI, Type } from "@google/genai";
import { Resend } from "resend";
import { appendComplianceHtml, coldOutreachSender, complianceFooter } from "@/lib/email-identity";

export async function POST(req: Request) {
  try {
    const { leadId } = await req.json();
    if (!leadId) return NextResponse.json({ error: "leadId is required" }, { status: 400 });

    const lead = await db.aiSdrLead.findUnique({ where: { id: leadId } });
    if (!lead) return NextResponse.json({ error: "Lead not found" }, { status: 404 });

    if (lead.status === "emailed" || lead.status === "responded") {
        return NextResponse.json({ error: "Lead has already been emailed." }, { status: 400 });
    }

    //  There used to be a fallback here to a personal Gmail address when a lead
    //  had no contact email. It sent the pitch to that inbox and then marked the
    //  lead `emailed` with emailCount incremented — so leads nobody had ever
    //  contacted were recorded as contacted, and the pipeline's numbers counted
    //  mail sent to ourselves. A lead with no address cannot be emailed; the
    //  honest outcome is to say so and record it.
    const recipientEmail = lead.contactEmail?.trim();
    if (!recipientEmail) {
      await db.aiSdrLead.update({
        where: { id: lead.id },
        data: { status: "no_contact" },
      });
      return NextResponse.json(
        { error: "This lead has no contact email, so it cannot be emailed." },
        { status: 400 }
      );
    }

    //  Do-not-contact list, shared with the link-building outreach module. An
    //  unsubscribe is a statement to the business and has to hold across every
    //  system that sends on its behalf, not just the one that received it.
    const suppressed = await db.outreachSuppression.findFirst({
      where: {
        value: { in: [recipientEmail.toLowerCase(), recipientEmail.split("@")[1]?.toLowerCase() ?? ""] },
      },
    });
    if (suppressed) {
      await db.aiSdrLead.update({ where: { id: lead.id }, data: { status: "suppressed" } });
      return NextResponse.json(
        { error: `${recipientEmail} is on the do-not-contact list (${suppressed.reason}).` },
        { status: 400 }
      );
    }

    //  A postal address and a working opt-out are legal requirements for
    //  commercial email under CAN-SPAM, not presentation. Without one
    //  configured the correct behaviour is to refuse the send.
    const footer = complianceFooter();
    if (!footer) {
      return NextResponse.json(
        {
          error:
            "COMPANY_POSTAL_ADDRESS is not set. Commercial email must carry a valid " +
            "physical address and an opt-out; refusing to send without them.",
        },
        { status: 500 }
      );
    }

    let sender;
    try {
      sender = coldOutreachSender();
    } catch (err) {
      return NextResponse.json(
        { error: err instanceof Error ? err.message : String(err) },
        { status: 500 }
      );
    }
    for (const warning of sender.warnings) console.warn(`[sdr-outreach] ${warning}`);

    // 1. Generate Email with Gemini
    if (!process.env.GEMINI_API_KEY) {
      return NextResponse.json({ error: "GEMINI_API_KEY is not configured in environment." }, { status: 500 });
    }

    const ai = new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY });
    
    const response = await ai.models.generateContent({
      model: "gemini-3.7-flash",
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
    
    const htmlBody = appendComplianceHtml(data.body, footer);

    const { data: emailData, error } = await resend.emails.send({
      from: sender.from,
      to: [recipientEmail],
      subject: data.subject,
      html: htmlBody,
      //  Lets a recipient opt out from their mail client without replying, which
      //  is both a courtesy and one of the strongest signals against being
      //  filtered as spam.
      headers: {
        'List-Unsubscribe': `<mailto:${sender.email}?subject=unsubscribe>`,
        'List-Unsubscribe-Post': 'List-Unsubscribe=One-Click',
      },
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
        //  The body as actually sent, footer included — the log is the record
        //  of what the recipient received, not of what the model wrote.
        body: htmlBody,
        status: "sent"
      }
    });

    const updatedLead = await db.aiSdrLead.update({
      where: { id: lead.id },
      data: { 
        status: "emailed",
        emailCount: { increment: 1 },
        lastEmailedAt: new Date()
      },
      include: { emailLogs: true }
    });

    return NextResponse.json({ success: true, lead: updatedLead });
  } catch (error: any) {
    console.error("Outreach Error:", error);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
