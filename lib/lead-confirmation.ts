// lib/lead-confirmation.ts
//
// An immediate "your request is in" email to anyone who submits a free audit
// or check form. Before this, a lead heard nothing until the founder replied,
// up to 24 hours later, which is when people go and fill in a competitor's
// form instead. It repeats only promises the site already makes (founder
// review, reply within 24 hours) and offers the booking link.
//
// Sent from the verified primary domain. It never blocks or fails the lead:
// callers run it after the response, and every error is logged and swallowed.

import { Resend } from "resend";
import { primaryDomain } from "@/lib/email-identity";
import { CALL_HREF } from "@/lib/offer";
import type { Lead } from "@/lib/leads-store";

const esc = (s: string) =>
  s.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;").replace(/"/g, "&quot;");

export async function sendLeadConfirmation(lead: Lead): Promise<void> {
  const apiKey = process.env.RESEND_API_KEY?.trim();
  if (!apiKey || !lead.email) return;

  const domain = primaryDomain();
  const replyTo = `contact@${domain}`;
  const from = `Mubashar Sharif <contact@${domain}>`;
  const firstName = (lead.name || "").trim().split(/\s+/)[0] || "";
  const subject = (lead.website || lead.business || "").trim();
  const what = subject ? subject : "your site";

  const text = [
    `Hi${firstName ? " " + firstName : ""},`,
    "",
    `Thanks, your request is in. I'll look at ${what} myself and email you what I find within 24 hours.`,
    "",
    "If you'd rather talk it through, you can book a free 30-minute call here:",
    CALL_HREF,
    "",
    "Mubashar Sharif",
    "Founder, SearchPrex",
    `https://www.${domain}`,
  ].join("\n");

  const html = `<div style="font-family:Arial,sans-serif;font-size:15px;line-height:1.6;color:#111">
<p>Hi${firstName ? " " + esc(firstName) : ""},</p>
<p>Thanks, your request is in. I'll look at <strong>${esc(what)}</strong> myself and email you what I find within 24 hours.</p>
<p>If you'd rather talk it through, <a href="${CALL_HREF}">book a free 30-minute call</a>.</p>
<p>Mubashar Sharif<br>Founder, SearchPrex<br><a href="https://www.${domain}">www.${domain}</a></p>
</div>`;

  try {
    const resend = new Resend(apiKey);
    const { error } = await resend.emails.send({
      from,
      to: lead.email,
      replyTo,
      subject: "Your SearchPrex request is in",
      text,
      html,
    });
    if (error) console.error("[lead-confirmation] send failed:", error.message);
  } catch (err) {
    console.error("[lead-confirmation] send threw:", err instanceof Error ? err.message : err);
  }
}
