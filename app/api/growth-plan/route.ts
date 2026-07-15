import { NextRequest, NextResponse } from "next/server";
import { Resend } from "resend";
 
const resend = new Resend(process.env.RESEND_API_KEY);
 
const NOTIFY_TO = "mubasharshahzad726@gmail.com";
const NOTIFY_FROM = "SearchPrex Growth Plan <noreply@searchprex.com>";
 
interface LeadPayload {
  websiteUrl: string;
  industry: string;
  monthlyTraffic: string;
  fullName: string;
  companyName: string;
  email: string;
  phone: string;
  primaryGoal: string;
  currentSeoStatus: string;
  cmsType: string;
  gscConnected: string;
  message: string;
}
 
/* Label map for prettier email display */
const INDUSTRY_LABELS: Record<string, string> = {
  ecommerce: "Ecommerce / Online Store",
  law_firm: "Law Firm / Legal Services",
  local_service: "Local Service Business",
  saas: "SaaS / Software",
  content: "Content / Publisher / Blog",
  other: "Other",
};
 
const TRAFFIC_LABELS: Record<string, string> = {
  under_1k: "Under 1,000 / month",
  "1k_10k": "1,000 – 10,000 / month",
  "10k_50k": "10,000 – 50,000 / month",
  "50k_plus": "50,000+ / month",
  unsure: "Not sure",
};
 
const GOAL_LABELS: Record<string, string> = {
  rankings: "Improve keyword rankings",
  traffic: "Grow organic traffic",
  conversions: "Increase leads / sales",
  technical: "Fix technical SEO issues",
  indexing: "Fix indexing problems at scale",
  recovery: "Recover from Google algorithm update",
};
 
const STATUS_LABELS: Record<string, string> = {
  none: "No SEO yet — starting fresh",
  diy: "Doing SEO myself / in-house",
  agency: "Working with another agency",
  past_agency: "Left previous agency, need better results",
};
 
const CMS_LABELS: Record<string, string> = {
  wordpress: "WordPress / WooCommerce",
  shopify: "Shopify",
  webflow: "Webflow",
  custom: "Custom / Headless",
  other: "Other",
};
 
const GSC_LABELS: Record<string, string> = {
  yes: "Yes — active",
  no: "No — needs setup",
  unsure: "Not sure",
};
 
function label(map: Record<string, string>, val: string): string {
  return map[val] || val || "Not provided";
}
 
function isValidUrl(u: string): boolean {
  try {
    const url = new URL(u);
    return url.protocol === "http:" || url.protocol === "https:";
  } catch {
    return false;
  }
}
 
function isValidEmail(e: string): boolean {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(e);
}
 
/* Build admin notification email (rich HTML) */
function buildAdminEmail(lead: LeadPayload): { subject: string; html: string } {
  const subject = `Growth Plan Request — ${lead.companyName} (${label(INDUSTRY_LABELS, lead.industry)})`;
 
  const html = `<!DOCTYPE html>
<html>
<head>
<meta charset="utf-8"/>
<title>${subject}</title>
</head>
<body style="margin:0;padding:0;background:#f7f7f8;font-family:-apple-system,BlinkMacSystemFont,'Segoe UI',Roboto,sans-serif;color:#191a1f;">
<table role="presentation" width="100%" cellspacing="0" cellpadding="0" border="0" style="background:#f7f7f8;padding:32px 16px;">
<tr><td align="center">
<table role="presentation" width="600" cellspacing="0" cellpadding="0" border="0" style="max-width:600px;background:#ffffff;border-radius:12px;border:1px solid #e6e7eb;overflow:hidden;">
 
<tr><td style="padding:24px 32px;border-bottom:1px solid #e6e7eb;background:#191a1f;">
<h1 style="margin:0;font-size:20px;font-weight:700;color:#ffffff;">New Growth Plan Request</h1>
<p style="margin:4px 0 0;font-size:13px;color:rgba(255,255,255,0.7);">SearchPrex · ${new Date().toLocaleString("en-US", { timeZone: "Asia/Karachi", dateStyle: "full", timeStyle: "short" })}</p>
</td></tr>
 
<tr><td style="padding:24px 32px;">
<h2 style="margin:0 0 4px;font-size:22px;font-weight:700;color:#191a1f;">${lead.fullName}</h2>
<p style="margin:0 0 16px;font-size:14px;color:#65676e;">${lead.companyName}</p>
 
<table role="presentation" width="100%" cellspacing="0" cellpadding="0" border="0" style="border-collapse:collapse;">
  <tr>
    <td style="padding:10px 0;border-bottom:1px solid #f1f1f2;width:140px;font-size:12px;font-weight:600;text-transform:uppercase;letter-spacing:0.5px;color:#65676e;">Email</td>
    <td style="padding:10px 0;border-bottom:1px solid #f1f1f2;font-size:14px;color:#191a1f;">
      <a href="mailto:${lead.email}" style="color:#2f9670;text-decoration:none;font-weight:600;">${lead.email}</a>
    </td>
  </tr>
  ${lead.phone ? `<tr>
    <td style="padding:10px 0;border-bottom:1px solid #f1f1f2;font-size:12px;font-weight:600;text-transform:uppercase;letter-spacing:0.5px;color:#65676e;">Phone</td>
    <td style="padding:10px 0;border-bottom:1px solid #f1f1f2;font-size:14px;color:#191a1f;">
      <a href="tel:${lead.phone}" style="color:#191a1f;text-decoration:none;">${lead.phone}</a>
    </td>
  </tr>` : ""}
  <tr>
    <td style="padding:10px 0;border-bottom:1px solid #f1f1f2;font-size:12px;font-weight:600;text-transform:uppercase;letter-spacing:0.5px;color:#65676e;">Website</td>
    <td style="padding:10px 0;border-bottom:1px solid #f1f1f2;font-size:14px;">
      <a href="${lead.websiteUrl}" target="_blank" style="color:#2f9670;text-decoration:none;font-weight:600;">${lead.websiteUrl}</a>
    </td>
  </tr>
  <tr>
    <td style="padding:10px 0;border-bottom:1px solid #f1f1f2;font-size:12px;font-weight:600;text-transform:uppercase;letter-spacing:0.5px;color:#65676e;">Industry</td>
    <td style="padding:10px 0;border-bottom:1px solid #f1f1f2;font-size:14px;color:#191a1f;">${label(INDUSTRY_LABELS, lead.industry)}</td>
  </tr>
  ${lead.monthlyTraffic ? `<tr>
    <td style="padding:10px 0;border-bottom:1px solid #f1f1f2;font-size:12px;font-weight:600;text-transform:uppercase;letter-spacing:0.5px;color:#65676e;">Traffic</td>
    <td style="padding:10px 0;border-bottom:1px solid #f1f1f2;font-size:14px;color:#191a1f;">${label(TRAFFIC_LABELS, lead.monthlyTraffic)}</td>
  </tr>` : ""}
</table>
 
<h3 style="margin:24px 0 12px;font-size:14px;font-weight:700;color:#191a1f;text-transform:uppercase;letter-spacing:0.5px;">Goals &amp; Setup</h3>
<table role="presentation" width="100%" cellspacing="0" cellpadding="0" border="0" style="border-collapse:collapse;">
  <tr>
    <td style="padding:10px 0;border-bottom:1px solid #f1f1f2;width:140px;font-size:12px;font-weight:600;text-transform:uppercase;letter-spacing:0.5px;color:#65676e;">Primary goal</td>
    <td style="padding:10px 0;border-bottom:1px solid #f1f1f2;font-size:14px;color:#191a1f;font-weight:600;">${label(GOAL_LABELS, lead.primaryGoal)}</td>
  </tr>
  <tr>
    <td style="padding:10px 0;border-bottom:1px solid #f1f1f2;font-size:12px;font-weight:600;text-transform:uppercase;letter-spacing:0.5px;color:#65676e;">SEO status</td>
    <td style="padding:10px 0;border-bottom:1px solid #f1f1f2;font-size:14px;color:#191a1f;">${label(STATUS_LABELS, lead.currentSeoStatus)}</td>
  </tr>
  <tr>
    <td style="padding:10px 0;border-bottom:1px solid #f1f1f2;font-size:12px;font-weight:600;text-transform:uppercase;letter-spacing:0.5px;color:#65676e;">CMS</td>
    <td style="padding:10px 0;border-bottom:1px solid #f1f1f2;font-size:14px;color:#191a1f;">${label(CMS_LABELS, lead.cmsType)}</td>
  </tr>
  <tr>
    <td style="padding:10px 0;border-bottom:1px solid #f1f1f2;font-size:12px;font-weight:600;text-transform:uppercase;letter-spacing:0.5px;color:#65676e;">GSC</td>
    <td style="padding:10px 0;border-bottom:1px solid #f1f1f2;font-size:14px;color:#191a1f;">${label(GSC_LABELS, lead.gscConnected)}</td>
  </tr>
</table>
 
${lead.message ? `<div style="margin-top:24px;padding:16px;background:#f7f7f8;border-left:3px solid #3eb489;border-radius:4px;">
  <p style="margin:0 0 6px;font-size:12px;font-weight:600;text-transform:uppercase;letter-spacing:0.5px;color:#65676e;">Message</p>
  <p style="margin:0;font-size:14px;line-height:1.6;color:#191a1f;white-space:pre-wrap;">${lead.message.replace(/</g, "&lt;").replace(/>/g, "&gt;")}</p>
</div>` : ""}
 
<div style="margin-top:32px;padding-top:20px;border-top:1px solid #e6e7eb;">
  <a href="mailto:${lead.email}" style="display:inline-block;padding:12px 24px;background:#191a1f;color:#ffffff;text-decoration:none;border-radius:9999px;font-size:14px;font-weight:600;">Reply to ${lead.fullName.split(" ")[0]}</a>
</div>
 
</td></tr></table>
</td></tr></table>
</body>
</html>`;
 
  return { subject, html };
}
 
/* Build user confirmation email */
function buildUserEmail(lead: LeadPayload): { subject: string; html: string } {
  const firstName = lead.fullName.split(" ")[0];
  const subject = "Your SearchPrex Growth Plan request received";
 
  const html = `<!DOCTYPE html>
<html>
<head><meta charset="utf-8"/><title>${subject}</title></head>
<body style="margin:0;padding:0;background:#f7f7f8;font-family:-apple-system,BlinkMacSystemFont,'Segoe UI',Roboto,sans-serif;color:#191a1f;">
<table role="presentation" width="100%" cellspacing="0" cellpadding="0" border="0" style="background:#f7f7f8;padding:32px 16px;">
<tr><td align="center">
<table role="presentation" width="600" cellspacing="0" cellpadding="0" border="0" style="max-width:600px;background:#ffffff;border-radius:12px;border:1px solid #e6e7eb;overflow:hidden;">
 
<tr><td style="padding:32px;border-bottom:1px solid #e6e7eb;">
<h1 style="margin:0 0 8px;font-size:24px;font-weight:700;color:#191a1f;">Hi ${firstName},</h1>
<p style="margin:0;font-size:16px;line-height:1.6;color:#65676e;">Thanks for requesting your SearchPrex Growth Plan. We've got your details and our team is on it.</p>
</td></tr>
 
<tr><td style="padding:24px 32px;">
<h2 style="margin:0 0 16px;font-size:16px;font-weight:700;color:#191a1f;">What happens next</h2>
 
<table role="presentation" width="100%" cellspacing="0" cellpadding="0" border="0">
<tr>
<td style="padding-bottom:16px;vertical-align:top;width:32px;">
<div style="width:24px;height:24px;background:#3eb489;color:#ffffff;border-radius:50%;text-align:center;line-height:24px;font-size:12px;font-weight:700;">1</div>
</td>
<td style="padding-bottom:16px;padding-left:12px;font-size:14px;line-height:1.6;color:#191a1f;">
<strong>Site audit + competitor benchmark.</strong> We'll analyze your technical SEO, content gaps, and compare you against 2 direct competitors.
</td></tr>
 
<tr>
<td style="padding-bottom:16px;vertical-align:top;">
<div style="width:24px;height:24px;background:#3eb489;color:#ffffff;border-radius:50%;text-align:center;line-height:24px;font-size:12px;font-weight:700;">2</div>
</td>
<td style="padding-bottom:16px;padding-left:12px;font-size:14px;line-height:1.6;color:#191a1f;">
<strong>Growth plan delivered — within 24 hours.</strong> A founder-reviewed PDF with prioritized 90-day action items, sent to this email.
</td></tr>
 
<tr>
<td style="vertical-align:top;">
<div style="width:24px;height:24px;background:#3eb489;color:#ffffff;border-radius:50%;text-align:center;line-height:24px;font-size:12px;font-weight:700;">3</div>
</td>
<td style="padding-left:12px;font-size:14px;line-height:1.6;color:#191a1f;">
<strong>Optional walkthrough call.</strong> If you'd like to discuss the findings, we'll offer a free 30-min call.
</td></tr>
</table>
 
<div style="margin:32px 0;padding:20px;background:#f7f7f8;border-radius:8px;">
<p style="margin:0 0 8px;font-size:13px;font-weight:600;text-transform:uppercase;letter-spacing:0.5px;color:#65676e;">Quick note about credentials</p>
<p style="margin:0;font-size:14px;line-height:1.6;color:#191a1f;">
We never ask for passwords by email. If your growth plan requires access to Google Search Console or your CMS, we'll walk you through secure credential setup on your onboarding call.
</p>
</div>
 
<p style="margin:24px 0 0;font-size:14px;line-height:1.6;color:#65676e;">
In the meantime, feel free to browse our <a href="https://www.searchprex.com/case-studies" style="color:#2f9670;font-weight:600;text-decoration:none;">case studies</a> or reply to this email if you have any questions.
</p>
 
<p style="margin:32px 0 0;font-size:14px;line-height:1.6;color:#191a1f;">
Talk soon,<br/>
<strong>Mubashar Shahzad</strong><br/>
<span style="color:#65676e;">Founder, SearchPrex</span>
</p>
 
</td></tr>
 
<tr><td style="padding:20px 32px;border-top:1px solid #e6e7eb;background:#f7f7f8;">
<p style="margin:0;font-size:12px;color:#65676e;">
SearchPrex · <a href="https://www.searchprex.com" style="color:#65676e;text-decoration:none;">searchprex.com</a> · This email was sent because you requested a growth plan.
</p>
</td></tr>
 
</table>
</td></tr></table>
</body>
</html>`;
 
  return { subject, html };
}
 
/* ── Main handler ── */
export async function POST(req: NextRequest) {
  try {
    const lead = (await req.json()) as LeadPayload;
 
    // ── Validation ──
    if (!lead.websiteUrl || !isValidUrl(lead.websiteUrl)) {
      return NextResponse.json(
        { error: "Please provide a valid website URL (starting with https://)." },
        { status: 400 },
      );
    }
    if (!lead.email || !isValidEmail(lead.email)) {
      return NextResponse.json(
        { error: "Please provide a valid email address." },
        { status: 400 },
      );
    }
    if (!lead.fullName || !lead.companyName || !lead.industry || !lead.primaryGoal) {
      return NextResponse.json(
        { error: "Please fill in all required fields." },
        { status: 400 },
      );
    }
 
    // ── Send admin notification ──
    const admin = buildAdminEmail(lead);
    const adminEmailResult = await resend.emails.send({
      from: NOTIFY_FROM,
      to: NOTIFY_TO,
      replyTo: lead.email,
      subject: admin.subject,
      html: admin.html,
    });
 
    if (adminEmailResult.error) {
      console.error("Admin email send failed:", adminEmailResult.error);
      // Continue anyway — user still gets confirmation, lead is not lost silently
    }
 
    // ── Send user confirmation (best-effort) ──
    const user = buildUserEmail(lead);
    try {
      await resend.emails.send({
        from: NOTIFY_FROM,
        to: lead.email,
        replyTo: "hello@searchprex.com",
        subject: user.subject,
        html: user.html,
      });
    } catch (userEmailErr) {
      console.error("User confirmation email failed (non-critical):", userEmailErr);
    }
 
    return NextResponse.json({
      success: true,
      message: "Growth plan request received. Check your email for confirmation.",
    });
  } catch (err) {
    console.error("Growth plan API error:", err);
    return NextResponse.json(
      {
        error: "Something went wrong. Please try again, or email hello@searchprex.com directly.",
      },
      { status: 500 },
    );
  }
}
 