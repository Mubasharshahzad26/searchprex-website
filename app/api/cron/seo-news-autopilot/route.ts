// app/api/cron/seo-news-autopilot/route.ts
import { NextRequest, NextResponse } from "next/server";
import { harvestLatestNews } from "@/lib/autopilot-news/harvester";
import { generateSEOArticle } from "@/lib/autopilot-news/generator";
import {
  getAutopilotSettings,
  saveNewsArticleAction,
} from "@/app/content-admin/news-autopilot/actions";
import { db } from "@/lib/db";

export const dynamic = "force-dynamic";
export const maxDuration = 180;

function authorize(req: NextRequest): boolean {
  const secret = process.env.CRON_SECRET;
  if (!secret) return false;

  if (req.headers.get("authorization") === `Bearer ${secret}`) return true;
  return req.nextUrl.searchParams.get("key") === secret;
}

export async function GET(req: NextRequest) {
  if (!authorize(req)) {
    return NextResponse.json({ error: "unauthorized" }, { status: 401 });
  }

  const settings = await getAutopilotSettings();
  if (!settings.enabled) {
    return NextResponse.json({
      ok: true,
      status: "disabled",
      message: "News Autopilot background cron is currently disabled in admin settings.",
    });
  }

  // Check daily limit
  const today = new Date();
  today.setHours(0, 0, 0, 0);

  const publishedToday = await db.marketingBlog.count({
    where: {
      category: { contains: "SEO News", mode: "insensitive" },
      published: true,
      publishedAt: { gte: today },
    },
  });

  if (publishedToday >= settings.dailyLimit) {
    return NextResponse.json({
      ok: true,
      status: "daily_limit_reached",
      publishedToday,
      dailyLimit: settings.dailyLimit,
    });
  }

  // Harvest news
  const items = await harvestLatestNews();
  const candidate = items.find((i) => !i.alreadyCovered && i.relevanceScore >= 6);

  if (!candidate) {
    return NextResponse.json({
      ok: true,
      status: "no_candidates",
      message: "No fresh uncovered SEO news found at this time.",
    });
  }

  try {
    const article = await generateSEOArticle(candidate);
    const saveResult = await saveNewsArticleAction(article, settings.autoPublish);

    return NextResponse.json({
      ok: true,
      status: "processed",
      candidate: candidate.title,
      source: candidate.sourceName,
      slug: saveResult.slug,
      liveUrl: saveResult.url,
      published: settings.autoPublish,
      publishedToday: publishedToday + (settings.autoPublish ? 1 : 0),
    });
  } catch (err: any) {
    console.error("[cron-seo-news] Processing error:", err);
    return NextResponse.json(
      { ok: false, error: err.message },
      { status: 500 }
    );
  }
}
