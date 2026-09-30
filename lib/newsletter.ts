// lib/newsletter.ts
//
// End-to-end blog newsletter engine:
// 1. Stores subscribers in Postgres (NewsletterSubscriber) + Google Sheet/Supabase backup (storeLead)
// 2. Sends an immediate Welcome Email via Resend when a reader subscribes
// 3. Automatically emails all active subscribers when a new blog post is published
// 4. Provides 1-click RFC-8058 & link-based Unsubscribe support

import crypto from "crypto";
import { Resend } from "resend";
import { db } from "@/lib/db";
import { looksLikeEmail, storeLead } from "@/lib/leads-store";
import { primaryDomain, RESEND_SANDBOX_DOMAIN } from "@/lib/email-identity";

const SITE_URL = (process.env.NEXT_PUBLIC_SITE_URL || "https://www.searchprex.com").replace(/\/$/, "");

let schemaEnsured = false;

/**
 * Ensures the NewsletterSubscriber table exists in Postgres even if `prisma migrate`
 * has not been run manually against the production Neon database yet.
 */
export async function ensureNewsletterTable(): Promise<boolean> {
  if (schemaEnsured) return true;
  try {
    await db.$executeRawUnsafe(`
      CREATE TABLE IF NOT EXISTS "NewsletterSubscriber" (
        "id" TEXT NOT NULL,
        "email" TEXT NOT NULL,
        "status" TEXT NOT NULL DEFAULT 'active',
        "unsubscribeToken" TEXT NOT NULL,
        "source" TEXT NOT NULL DEFAULT 'blog',
        "categories" TEXT[] DEFAULT ARRAY[]::TEXT[],
        "lastNotifiedSlug" TEXT,
        "lastNotifiedAt" TIMESTAMP(3),
        "unsubscribedAt" TIMESTAMP(3),
        "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
        "updatedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
        CONSTRAINT "NewsletterSubscriber_pkey" PRIMARY KEY ("id")
      );
    `);
    await db.$executeRawUnsafe(`
      CREATE UNIQUE INDEX IF NOT EXISTS "NewsletterSubscriber_email_key" ON "NewsletterSubscriber"("email");
    `);
    await db.$executeRawUnsafe(`
      CREATE UNIQUE INDEX IF NOT EXISTS "NewsletterSubscriber_unsubscribeToken_key" ON "NewsletterSubscriber"("unsubscribeToken");
    `);
    await db.$executeRawUnsafe(`
      CREATE INDEX IF NOT EXISTS "NewsletterSubscriber_status_idx" ON "NewsletterSubscriber"("status");
    `);
    schemaEnsured = true;
    return true;
  } catch (err) {
    console.warn("[newsletter] Could not auto-ensure NewsletterSubscriber table:", err);
    return false;
  }
}

function resolveNewsletterSender(): { from: string; canSend: boolean; reason?: string } {
  const apiKey = process.env.RESEND_API_KEY?.trim();
  if (!apiKey) {
    return { from: "", canSend: false, reason: "RESEND_API_KEY not set" };
  }

  const domain = primaryDomain();
  const rawEmail =
    process.env.NEWSLETTER_FROM_EMAIL?.trim() ||
    process.env.REPORTS_FROM_EMAIL?.trim() ||
    `insights@${domain}`;
  const fromName =
    process.env.NEWSLETTER_FROM_NAME?.trim() ||
    "SearchPrex Editorial";

  const emailDomain = rawEmail.split("@")[1]?.toLowerCase().trim() ?? "";
  if (emailDomain === RESEND_SANDBOX_DOMAIN) {
    return {
      from: `${fromName} <${rawEmail}>`,
      canSend: false,
      reason: `Refusing sandbox sender ${rawEmail}`,
    };
  }

  return {
    from: `${fromName} <${rawEmail}>`,
    canSend: true,
  };
}

function escapeHtml(str: string): string {
  return str
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;");
}

function buildWelcomeEmailHtml(unsubscribeUrl: string): string {
  return `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="utf-8" />
  <meta name="viewport" content="width=device-width,initial-scale=1" />
  <title>Welcome to SearchPrex SEO Insights</title>
</head>
<body style="margin:0;padding:0;background-color:#f4f6fb;font-family:-apple-system,BlinkMacSystemFont,'Segoe UI',Roboto,Helvetica,Arial,sans-serif;color:#0a0f2e;">
  <div style="max-width:600px;margin:0 auto;padding:32px 16px;">
    <!-- Top Editorial Header -->
    <div style="background:linear-gradient(135deg,#0a0f2e 0%,#1e1b4b 100%);border-top:4px solid #3eb489;border-radius:12px 12px 0 0;padding:32px 36px;">
      <p style="margin:0 0 8px;color:#3eb489;font-size:11px;font-weight:800;letter-spacing:2px;text-transform:uppercase;">
        SEARCHPREX EDITORIAL · VERIFIED SEO INSIGHTS
      </p>
      <h1 style="margin:0;color:#ffffff;font-size:24px;font-weight:800;line-height:1.3;">
        You&rsquo;re on the list. Welcome to the SearchPrex Briefing.
      </h1>
    </div>

    <!-- Body -->
    <div style="background:#ffffff;padding:36px;border:1px solid #e5e7eb;border-top:none;border-radius:0 0 12px 12px;">
      <p style="margin:0 0 16px;font-size:15px;line-height:1.7;color:#334155;">
        Thanks for subscribing to the <strong>SearchPrex SEO Blog</strong>. Whenever we publish a new practitioner-grade guide on Technical SEO, E-commerce Indexation, Local SEO, or AI Search Visibility, we&rsquo;ll send it straight to your inbox.
      </p>
      <p style="margin:0 0 24px;font-size:15px;line-height:1.7;color:#334155;">
        No fluff, no recycled beginner tips — only field-tested playbooks from audits across 10,000+ SKU stores and competitive local markets.
      </p>

      <!-- Featured Guides Box -->
      <div style="background:#f8f9fc;border:1px solid #e2e8f0;border-left:4px solid #534AB7;border-radius:8px;padding:20px 24px;margin-bottom:28px;">
        <p style="margin:0 0 12px;font-size:11px;font-weight:800;letter-spacing:1.5px;text-transform:uppercase;color:#534AB7;">
          START WITH OUR MOST-READ GUIDES
        </p>
        <ul style="margin:0;padding-left:18px;color:#0a0f2e;font-size:14px;line-height:1.8;">
          <li style="margin-bottom:8px;">
            <a href="${SITE_URL}/blog/fix-discovered-currently-not-indexed-ecommerce" style="color:#0a0f2e;font-weight:700;text-decoration:underline;">
              How to Fix &lsquo;Discovered – Currently Not Indexed&rsquo; on E-commerce Stores
            </a>
          </li>
          <li style="margin-bottom:8px;">
            <a href="${SITE_URL}/blog/crawl-budget-optimization-guide" style="color:#0a0f2e;font-weight:700;text-decoration:underline;">
              Crawl Budget Optimization: The 2026 Practitioner Guide
            </a>
          </li>
          <li>
            <a href="${SITE_URL}/blog/keyword-research-for-law-firms" style="color:#0a0f2e;font-weight:700;text-decoration:underline;">
              Keyword Research for Lawyers and Law Firms
            </a>
          </li>
        </ul>
      </div>

      <div style="text-align:center;margin:28px 0 12px;">
        <a href="${SITE_URL}/blog" style="display:inline-block;background:#0a0f2e;color:#ffffff;font-size:14px;font-weight:700;text-decoration:none;padding:14px 28px;border-radius:8px;">
          Explore All SEO Guides &rarr;
        </a>
      </div>

      <hr style="border:none;border-top:1px solid #e5e7eb;margin:28px 0 20px;" />

      <p style="margin:0;font-size:12px;line-height:1.6;color:#94a3b8;text-align:center;">
        You received this email because you subscribed at <a href="${SITE_URL}/blog" style="color:#64748b;">searchprex.com/blog</a>.<br />
        <a href="${escapeHtml(unsubscribeUrl)}" style="color:#64748b;text-decoration:underline;">Unsubscribe with one click</a> at any time.
      </p>
    </div>
  </div>
</body>
</html>`;
}

export interface NewPostNotificationPayload {
  slug: string;
  title: string;
  excerpt?: string | null;
  category?: string | null;
  readTime?: string | null;
  author?: string | null;
  coverImage?: string | null;
  published?: boolean;
}

function buildNewPostEmailHtml(
  post: NewPostNotificationPayload,
  unsubscribeUrl: string
): string {
  const postUrl = `${SITE_URL}/blog/${encodeURIComponent(post.slug)}`;
  const category = escapeHtml(post.category || "Technical SEO");
  const readTime = escapeHtml(post.readTime || "8-minute read");
  const title = escapeHtml(post.title);
  const excerpt = escapeHtml(
    post.excerpt ||
      "Read our newest practitioner guide covering actionable SEO frameworks, diagnostics, and implementation steps."
  );
  const author = escapeHtml(post.author || "Mubashar Sharif");

  return `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="utf-8" />
  <meta name="viewport" content="width=device-width,initial-scale=1" />
  <title>${title}</title>
</head>
<body style="margin:0;padding:0;background-color:#f4f6fb;font-family:-apple-system,BlinkMacSystemFont,'Segoe UI',Roboto,Helvetica,Arial,sans-serif;color:#0a0f2e;">
  <div style="max-width:600px;margin:0 auto;padding:32px 16px;">
    <!-- Editorial Header -->
    <div style="background:linear-gradient(135deg,#0a0f2e 0%,#1e1b4b 100%);border-top:4px solid #3eb489;border-radius:12px 12px 0 0;padding:28px 36px;">
      <table style="width:100%;border-collapse:collapse;">
        <tr>
          <td>
            <span style="color:#3eb489;font-size:11px;font-weight:800;letter-spacing:2px;text-transform:uppercase;">
              NEW GUIDE PUBLISHED
            </span>
          </td>
          <td style="text-align:right;">
            <span style="background:rgba(255,255,255,0.12);color:#e2e8f0;font-size:11px;font-weight:700;padding:4px 10px;border-radius:4px;">
              ${category}
            </span>
          </td>
        </tr>
      </table>
    </div>

    <!-- Article Card -->
    <div style="background:#ffffff;padding:36px;border:1px solid #e5e7eb;border-top:none;border-radius:0 0 12px 12px;">
      <p style="margin:0 0 10px;font-size:12px;font-weight:700;color:#534AB7;text-transform:uppercase;letter-spacing:1px;">
        ${category} &nbsp;&middot;&nbsp; ${readTime}
      </p>

      <h1 style="margin:0 0 16px;font-size:24px;font-weight:800;line-height:1.35;color:#0a0f2e;">
        <a href="${postUrl}" style="color:#0a0f2e;text-decoration:none;">${title}</a>
      </h1>

      <p style="margin:0 0 24px;font-size:15px;line-height:1.75;color:#475569;border-left:3px solid #534AB7;padding-left:16px;">
        ${excerpt}
      </p>

      <!-- Author Byline -->
      <table style="width:100%;border-collapse:collapse;margin-bottom:28px;background:#f8f9fc;border-radius:8px;padding:12px 16px;">
        <tr>
          <td style="padding:12px 16px;">
            <p style="margin:0;font-size:13px;font-weight:700;color:#0a0f2e;">
              By ${author}
              <span style="display:inline-block;margin-left:6px;background:#EEEDFE;color:#534AB7;font-size:10px;font-weight:800;padding:2px 8px;border-radius:999px;">
                &#10003; Verified SEO Expert
              </span>
            </p>
          </td>
        </tr>
      </table>

      <div style="margin:0 0 28px;">
        <a href="${postUrl}" style="display:inline-block;background:#3eb489;color:#ffffff;font-size:14px;font-weight:800;text-decoration:none;padding:14px 28px;border-radius:8px;">
          Read the Full Guide &rarr;
        </a>
      </div>

      <hr style="border:none;border-top:1px solid #e5e7eb;margin:28px 0 20px;" />

      <p style="margin:0;font-size:12px;line-height:1.6;color:#94a3b8;text-align:center;">
        You are receiving this alert because you subscribed to the SearchPrex SEO Blog.<br />
        <a href="${escapeHtml(unsubscribeUrl)}" style="color:#64748b;text-decoration:underline;">Unsubscribe instantly</a>
      </p>
    </div>
  </div>
</body>
</html>`;
}

export interface SubscribeResult {
  ok: boolean;
  alreadySubscribed?: boolean;
  welcomeEmailSent?: boolean;
  error?: string;
}

export async function subscribeToNewsletter(params: {
  email: string;
  source?: string;
  categories?: string[];
}): Promise<SubscribeResult> {
  const email = (params.email || "").trim().toLowerCase();
  if (!email || !looksLikeEmail(email)) {
    return { ok: false, error: "Please enter a valid email address." };
  }

  const source = params.source || "blog-newsletter";
  const categories = params.categories || [];
  let dbStored = false;
  let alreadySubscribed = false;
  let unsubscribeToken = crypto.randomBytes(24).toString("hex");

  // 1. Store in Postgres NewsletterSubscriber table
  try {
    await ensureNewsletterTable();
    const existing = await (db as any).newsletterSubscriber.findUnique({
      where: { email },
    });

    if (existing) {
      unsubscribeToken = existing.unsubscribeToken || unsubscribeToken;
      if (existing.status === "active") {
        alreadySubscribed = true;
      } else {
        await (db as any).newsletterSubscriber.update({
          where: { email },
          data: {
            status: "active",
            unsubscribedAt: null,
            source,
            updatedAt: new Date(),
          },
        });
      }
      dbStored = true;
    } else {
      await (db as any).newsletterSubscriber.create({
        data: {
          email,
          status: "active",
          unsubscribeToken,
          source,
          categories,
        },
      });
      dbStored = true;
    }
  } catch (err) {
    console.error("[newsletter] DB subscriber write failed:", err);
  }

  // 2. Also record in shared lead store (Google Sheet / Supabase) in background/parallel
  let leadStored = false;
  try {
    const leadRes = await storeLead(
      {
        email,
        source,
        message: "Subscribed to SearchPrex Blog Newsletter (new post email alerts)",
      },
      "leads"
    );
    leadStored = leadRes.stored;
  } catch (err) {
    console.warn("[newsletter] Backup lead store write failed:", err);
  }

  if (!dbStored && !leadStored) {
    return {
      ok: false,
      error: "Could not complete your subscription right now. Please try again.",
    };
  }

  // 3. Send Welcome Email via Resend (if newly subscribed or re-activated)
  let welcomeEmailSent = false;
  if (!alreadySubscribed) {
    const sender = resolveNewsletterSender();
    if (sender.canSend && process.env.RESEND_API_KEY) {
      try {
        const resend = new Resend(process.env.RESEND_API_KEY);
        const unsubUrl = `${SITE_URL}/api/newsletter/unsubscribe?token=${encodeURIComponent(unsubscribeToken)}`;
        const { error } = await resend.emails.send({
          from: sender.from,
          to: [email],
          subject: "Welcome to SearchPrex SEO Insights — You're Subscribed",
          html: buildWelcomeEmailHtml(unsubUrl),
          headers: {
            "List-Unsubscribe": `<${unsubUrl}>`,
            "List-Unsubscribe-Post": "List-Unsubscribe=One-Click",
          },
        });
        if (!error) {
          welcomeEmailSent = true;
        } else {
          console.warn("[newsletter] Welcome email Resend error:", error.message);
        }
      } catch (err) {
        console.warn("[newsletter] Failed to send welcome email:", err);
      }
    }
  }

  return {
    ok: true,
    alreadySubscribed,
    welcomeEmailSent,
  };
}

export async function unsubscribeFromNewsletter(tokenOrEmail: string): Promise<boolean> {
  const clean = (tokenOrEmail || "").trim();
  if (!clean) return false;

  try {
    await ensureNewsletterTable();
    const where = clean.includes("@")
      ? { email: clean.toLowerCase() }
      : { unsubscribeToken: clean };

    const existing = await (db as any).newsletterSubscriber.findUnique({ where });
    if (!existing) return false;

    await (db as any).newsletterSubscriber.update({
      where: { id: existing.id },
      data: {
        status: "unsubscribed",
        unsubscribedAt: new Date(),
        updatedAt: new Date(),
      },
    });
    return true;
  } catch (err) {
    console.error("[newsletter] Unsubscribe error:", err);
    return false;
  }
}

/**
 * Sends an email alert to all active blog subscribers when a new blog post is published.
 * Safe to call from server actions, webhooks, or cron routes — never throws to break publishing.
 */
export async function notifySubscribersOfNewPost(
  post: NewPostNotificationPayload
): Promise<{ attempted: number; sent: number; skippedReason?: string }> {
  try {
    if (post.published === false) {
      return { attempted: 0, sent: 0, skippedReason: "post is not published" };
    }
    if (!post.slug || !post.title) {
      return { attempted: 0, sent: 0, skippedReason: "missing slug or title" };
    }
    // Exclude SEO News items so blog subscribers only get actual blog guides
    if (post.category && post.category.toLowerCase().includes("seo news")) {
      return { attempted: 0, sent: 0, skippedReason: "SEO News category excluded from blog alert" };
    }

    const sender = resolveNewsletterSender();
    if (!sender.canSend || !process.env.RESEND_API_KEY) {
      return {
        attempted: 0,
        sent: 0,
        skippedReason: sender.reason || "RESEND_API_KEY not configured",
      };
    }

    await ensureNewsletterTable();

    const subscribers: Array<{ id: string; email: string; unsubscribeToken: string }> =
      await (db as any).newsletterSubscriber.findMany({
        where: {
          status: "active",
          OR: [
            { lastNotifiedSlug: null },
            { lastNotifiedSlug: { not: post.slug } },
          ],
        },
        select: {
          id: true,
          email: true,
          unsubscribeToken: true,
        },
      });

    if (!subscribers || subscribers.length === 0) {
      return { attempted: 0, sent: 0, skippedReason: "no unnotified active subscribers" };
    }

    const resend = new Resend(process.env.RESEND_API_KEY);
    let sentCount = 0;
    const batchSize = 50;

    for (let i = 0; i < subscribers.length; i += batchSize) {
      const chunk = subscribers.slice(i, i + batchSize);
      const emails = chunk.map((sub) => {
        const unsubUrl = `${SITE_URL}/api/newsletter/unsubscribe?token=${encodeURIComponent(sub.unsubscribeToken)}`;
        return {
          from: sender.from,
          to: [sub.email],
          subject: `New SEO Guide: ${post.title}`,
          html: buildNewPostEmailHtml(post, unsubUrl),
          headers: {
            "List-Unsubscribe": `<${unsubUrl}>`,
            "List-Unsubscribe-Post": "List-Unsubscribe=One-Click",
          },
        };
      });

      const { error } = await resend.batch.send(emails);
      if (error) {
        console.error("[newsletter] Batch send error:", error.message);
        continue;
      }

      sentCount += chunk.length;
      const notifiedIds = chunk.map((s) => s.id);
      await (db as any).newsletterSubscriber.updateMany({
        where: { id: { in: notifiedIds } },
        data: {
          lastNotifiedSlug: post.slug,
          lastNotifiedAt: new Date(),
          updatedAt: new Date(),
        },
      });
    }

    console.log(`[newsletter] Notified ${sentCount}/${subscribers.length} subscribers for post "${post.slug}"`);
    return { attempted: subscribers.length, sent: sentCount };
  } catch (err) {
    console.error("[newsletter] notifySubscribersOfNewPost failed:", err);
    return { attempted: 0, sent: 0, skippedReason: String(err) };
  }
}
