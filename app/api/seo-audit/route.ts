// app/api/seo-audit/route.ts
// Install: npm install resend
// Add to .env.local: RESEND_API_KEY=re_xxxxxxxx (get from resend.com — free 3000 emails/month)

import { NextRequest, NextResponse } from "next/server";
import { Resend } from "resend";

export const dynamic = 'force-dynamic'

export async function POST(req: NextRequest) {
  const resend = new Resend(process.env.RESEND_API_KEY);
  try {
    const body = await req.json();
    const { businessType, problems, fullName, email, phone, websiteUrl } = body;

    // Validation
    if (!businessType || !fullName || !email || !websiteUrl) {
      return NextResponse.json(
        { error: "Missing required fields" },
        { status: 400 }
      );
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      return NextResponse.json(
        { error: "Invalid email address" },
        { status: 400 }
      );
    }

    // Send notification to Mubashar
    await resend.emails.send({
      from: "SearchPrex Leads <leads@searchprex.com>",
      to: ["contact@searchprex.com"],
      subject: `🔥 New SEO Audit Request — ${businessType} | ${websiteUrl}`,
      html: `
        <div style="font-family: -apple-system, sans-serif; max-width: 600px; margin: 0 auto; padding: 32px; background: #f8fafc; border-radius: 12px;">
          
          <div style="background: #0f172a; padding: 24px; border-radius: 10px; margin-bottom: 24px;">
            <h1 style="color: #fff; font-size: 22px; margin: 0 0 4px;">🎯 New SEO Audit Lead</h1>
            <p style="color: #94a3b8; margin: 0; font-size: 14px;">Submitted via searchprex.com</p>
          </div>

          <div style="background: #fff; border: 1px solid #e2e8f0; border-radius: 10px; padding: 24px; margin-bottom: 16px;">
            <h2 style="color: #0f172a; font-size: 16px; margin: 0 0 16px; padding-bottom: 12px; border-bottom: 1px solid #f1f5f9;">
              👤 Contact Details
            </h2>
            <table style="width: 100%; border-collapse: collapse;">
              <tr>
                <td style="padding: 8px 0; color: #64748b; font-size: 14px; width: 140px;">Full Name</td>
                <td style="padding: 8px 0; color: #0f172a; font-size: 14px; font-weight: 600;">${fullName}</td>
              </tr>
              <tr style="background: #f8fafc;">
                <td style="padding: 8px 0; color: #64748b; font-size: 14px;">Email</td>
                <td style="padding: 8px 0;"><a href="mailto:${email}" style="color: #2563eb; font-size: 14px;">${email}</a></td>
              </tr>
              <tr>
                <td style="padding: 8px 0; color: #64748b; font-size: 14px;">Phone</td>
                <td style="padding: 8px 0; color: #0f172a; font-size: 14px;">${phone || "Not provided"}</td>
              </tr>
              <tr style="background: #f8fafc;">
                <td style="padding: 8px 0; color: #64748b; font-size: 14px;">Website</td>
                <td style="padding: 8px 0;"><a href="${websiteUrl}" style="color: #2563eb; font-size: 14px;">${websiteUrl}</a></td>
              </tr>
            </table>
          </div>

          <div style="background: #fff; border: 1px solid #e2e8f0; border-radius: 10px; padding: 24px; margin-bottom: 16px;">
            <h2 style="color: #0f172a; font-size: 16px; margin: 0 0 16px; padding-bottom: 12px; border-bottom: 1px solid #f1f5f9;">
              🏢 Business Info
            </h2>
            <p style="margin: 0 0 8px;"><span style="color: #64748b; font-size: 14px;">Business Type: </span><strong style="color: #2563eb;">${businessType}</strong></p>
          </div>

          <div style="background: #fff; border: 1px solid #e2e8f0; border-radius: 10px; padding: 24px; margin-bottom: 24px;">
            <h2 style="color: #0f172a; font-size: 16px; margin: 0 0 16px; padding-bottom: 12px; border-bottom: 1px solid #f1f5f9;">
              🎯 Their SEO Problems / Goals
            </h2>
            <div style="display: flex; flex-wrap: wrap; gap: 8px;">
              ${problems && problems.length > 0
                ? problems.map((p: string) => `<span style="background: #eff6ff; color: #2563eb; padding: 6px 14px; border-radius: 20px; font-size: 13px; font-weight: 600; display: inline-block; margin: 4px;">${p}</span>`).join("")
                : '<span style="color: #94a3b8; font-size: 14px;">Not specified</span>'
              }
            </div>
          </div>

          <div style="text-align: center;">
            <a href="mailto:${email}" style="background: #2563eb; color: #fff; padding: 14px 32px; border-radius: 8px; text-decoration: none; font-weight: 700; font-size: 15px; display: inline-block;">
              Reply to ${fullName} →
            </a>
          </div>

          <p style="text-align: center; color: #94a3b8; font-size: 12px; margin-top: 24px;">
            SearchPrex · contact@searchprex.com · searchprex.com
          </p>
        </div>
      `,
    });

    // Send confirmation to lead
    await resend.emails.send({
      from: "Mubashar @ SearchPrex <contact@searchprex.com>",
      to: [email],
      subject: "Your Free SEO Audit Request — Received! ✅",
      html: `
        <div style="font-family: -apple-system, sans-serif; max-width: 600px; margin: 0 auto; padding: 32px;">
          
          <div style="background: #0f172a; padding: 28px; border-radius: 12px; margin-bottom: 24px; text-align: center;">
            <h1 style="color: #fff; font-size: 24px; margin: 0 0 8px;">Got it, ${fullName.split(" ")[0]}! ✅</h1>
            <p style="color: #94a3b8; margin: 0; font-size: 15px;">Your SEO audit request is confirmed</p>
          </div>

          <p style="color: #475569; font-size: 15px; line-height: 1.7;">
            Hey ${fullName.split(" ")[0]}, this is Mubashar — founder of SearchPrex. I personally review every audit request and will have your comprehensive SEO analysis ready within <strong>48 hours</strong>.
          </p>

          <div style="background: #f0fdf4; border: 1px solid #bbf7d0; border-radius: 10px; padding: 20px; margin: 24px 0;">
            <p style="color: #166534; font-size: 14px; margin: 0 0 8px; font-weight: 700;">✅ What happens next:</p>
            <ul style="color: #166534; font-size: 14px; margin: 0; padding-left: 20px; line-height: 2;">
              <li>I'll audit <strong>${websiteUrl}</strong> personally</li>
              <li>Full technical + content + competitor analysis</li>
              <li>You'll receive the report within 48 hours</li>
              <li>I'll reach out to walk you through it — no sales pitch</li>
            </ul>
          </div>

          <p style="color: #475569; font-size: 14px;">
            Questions? Just reply to this email — I read every message personally.
          </p>

          <p style="color: #0f172a; font-size: 15px; margin-top: 32px;">
            — Mubashar Shahzad<br>
            <span style="color: #64748b; font-size: 13px;">Founder & SEO Lead, SearchPrex</span>
          </p>

          <hr style="border: none; border-top: 1px solid #e2e8f0; margin: 24px 0;" />
          <p style="color: #94a3b8; font-size: 12px; text-align: center;">
            SearchPrex · US-Focused SEO Agency · searchprex.com
          </p>
        </div>
      `,
    });

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("Email send error:", error);
    return NextResponse.json(
      { error: "Failed to send email" },
      { status: 500 }
    );
  }
}