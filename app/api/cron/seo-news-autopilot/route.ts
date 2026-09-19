// app/api/cron/seo-news-autopilot/route.ts
import { NextRequest, NextResponse } from "next/server";
import { harvestLatestNews } from "@/lib/autopilot-news/harvester";
import { generateSEOArticle } from "@/lib/autopilot-news/generator";
import { checkArticleQuality } from "@/lib/autopilot-news/quality";
import { saveNewsArticle } from "@/lib/autopilot-news/publisher";
import { countNewsPublishedToday, readAutopilotSettings } from "@/lib/autopilot-news/settings";

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

  const settings = await readAutopilotSettings();
  if (!settings.enabled) {
    return NextResponse.json({
      ok: true,
      status: "disabled",
      message: "News Autopilot background cron is currently disabled in admin settings.",
    });
  }

  const publishedToday = await countNewsPublishedToday();
  if (publishedToday >= settings.dailyLimit) {
    return NextResponse.json({
      ok: true,
      status: "daily_limit_reached",
      publishedToday,
      dailyLimit: settings.dailyLimit,
    });
  }

  // Unattended, so only stories that are fresh, dated, and not already covered
  // under another headline qualify. Anything borderline waits for a human.
  const items = await harvestLatestNews();
  const skipped = {
    covered: items.filter((i) => i.alreadyCovered).length,
    similar: items.filter((i) => !i.alreadyCovered && i.similarCoverage).length,
    stale: items.filter((i) => !i.alreadyCovered && !i.similarCoverage && i.isStale).length,
  };
  const candidate = items.find(
    (i) => !i.alreadyCovered && !i.similarCoverage && !i.isStale && i.relevanceScore >= 6
  );

  if (!candidate) {
    return NextResponse.json({
      ok: true,
      status: "no_candidates",
      message: "No fresh uncovered SEO news found at this time.",
      skipped,
    });
  }

  try {
    const article = await generateSEOArticle(candidate);

    // No overrides here: a figure the source doesn't back, or any other failing
    // check, sends the article to the draft queue for an editor.
    const quality = checkArticleQuality(article);
    const publishLive = settings.autoPublish && quality.canPublish;
    const saveResult = await saveNewsArticle(article, { publishLive });

    if (!saveResult.success) {
      return NextResponse.json(
        { ok: false, status: "save_failed", candidate: candidate.title, error: saveResult.error },
        { status: 500 }
      );
    }

    return NextResponse.json({
      ok: true,
      status: publishLive ? "published" : settings.autoPublish ? "draft_quality_gate" : "draft",
      candidate: candidate.title,
      source: candidate.sourceName,
      slug: saveResult.slug,
      liveUrl: saveResult.url,
      published: publishLive,
      failedChecks: quality.blocking.map((c) => ({ id: c.id, detail: c.detail })),
      publishedToday: publishedToday + (publishLive ? 1 : 0),
      skipped,
    });
  } catch (err: any) {
    console.error("[cron-seo-news] Processing error:", err);
    return NextResponse.json(
      { ok: false, error: err.message },
      { status: 500 }
    );
  }
}
