import { NextResponse } from "next/server";
import { db } from "@/lib/db";
import { Resend } from "resend";
import { coldOutreachSender, complianceFooter, primaryDomain } from "@/lib/email-identity";
import { sdrAdminGuard } from "@/lib/sdr/guard";

/**
 * Approve and send one lead's draft — the only place the SDR sends email.
 *
 * It used to have Gemini write a fresh email from model-generated "flaws" and
 * send it in the same request, so what went out was never seen by a person and
 * its claims were never checked. Now it sends the stored draft (built from
 * verified findings in lib/sdr/draft.ts), optionally as edited by the admin in
 * the review panel, and nothing else.
 */

/** Sends per UTC day. A new sending domain at volume is a spam signal. */
const DAILY_CAP = Math.max(1, Number(process.env.SDR_DAILY_CAP) || 12);

export async function POST(req: Request) {
  const denied = await sdrAdminGuard();
  if (denied) return denied;

  try {
    const { leadId, subject: editedSubject, body: editedBody } = await req.json();
    if (!leadId) return NextResponse.json({ error: "leadId is required" }, { status: 400 });

    const lead = await db.aiSdrLead.findUnique({ where: { id: leadId } });
    if (!lead) return NextResponse.json({ error: "Lead not found" }, { status: 404 });

    const draft = await db.aiSdrEmailLog.findFirst({
      where: { leadId: lead.id, status: "draft" },
      orderBy: { sentAt: "desc" },
    });
    if (!draft) {
      return NextResponse.json({ error: "This lead has no draft to approve. Run qualification first." }, { status: 400 });
    }

    const recipientEmail = lead.contactEmail?.trim();
    if (!recipientEmail) {
      return NextResponse.json({ error: "This lead has no contact email, so it cannot be emailed." }, { status: 400 });
    }

    //  Do-not-contact list, shared with the link-building outreach module.
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

    //  CAN-SPAM: a valid postal address and a working opt-out, or no send.
    const footer = complianceFooter();
    if (!footer) {
      return NextResponse.json(
        { error: "COMPANY_POSTAL_ADDRESS is not set. Commercial email must carry a postal address and an opt-out." },
        { status: 500 }
      );
    }

    //  Cold outreach never goes out from the primary domain: complaints there
    //  land client reports and invoices in spam. coldOutreachSender() only
    //  warns about that; this route refuses.
    const sender = coldOutreachSender();
    if (sender.domain === primaryDomain()) {
      return NextResponse.json(
        { error: `Refusing to send cold email from ${sender.domain}. Set SDR_FROM_EMAIL to an address on the outreach subdomain.` },
        { status: 500 }
      );
    }

    const startOfDay = new Date();
    startOfDay.setUTCHours(0, 0, 0, 0);
    const sentToday = await db.aiSdrEmailLog.count({
      where: { status: { not: "draft" }, sentAt: { gte: startOfDay } },
    });
    if (sentToday >= DAILY_CAP) {
      return NextResponse.json(
        { error: `Daily cap reached (${DAILY_CAP} sent today). Send the rest tomorrow.` },
        { status: 429 }
      );
    }

    if (!process.env.RESEND_API_KEY) {
      return NextResponse.json({ error: "RESEND_API_KEY is missing." }, { status: 500 });
    }

    const subject = typeof editedSubject === "string" && editedSubject.trim() ? editedSubject.trim() : draft.subject;
    const body = typeof editedBody === "string" && editedBody.trim() ? editedBody.trim() : draft.body;
    const text = `${body}\n\n${footer.postalAddress}\n${footer.optOutText}`;

    const resend = new Resend(process.env.RESEND_API_KEY);
    const { error } = await resend.emails.send({
      from: sender.from,
      to: [recipientEmail],
      replyTo: sender.email,
      subject,
      //  Plain text: no tracking pixel, no HTML — what a person writing by hand sends.
      text,
      headers: {
        "List-Unsubscribe": `<mailto:${sender.email}?subject=unsubscribe>`,
        "List-Unsubscribe-Post": "List-Unsubscribe=One-Click",
      },
      tags: [{ name: "lead_id", value: lead.id }],
    });

    if (error) return NextResponse.json({ error: error.message }, { status: 400 });

    //  The log keeps what the recipient actually received, footer included.
    await db.aiSdrEmailLog.update({
      where: { id: draft.id },
      data: { subject, body: text, status: "sent", sentAt: new Date() },
    });

    const updatedLead = await db.aiSdrLead.update({
      where: { id: lead.id },
      data: { status: "emailed", emailCount: { increment: 1 }, lastEmailedAt: new Date() },
      include: { emailLogs: true },
    });

    return NextResponse.json({ success: true, lead: updatedLead, sentToday: sentToday + 1, dailyCap: DAILY_CAP });
  } catch (error: any) {
    console.error("Outreach Error:", error);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
