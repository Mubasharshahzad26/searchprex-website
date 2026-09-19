"use server";

// Every export here is a Server Action that anyone can POST to by its ID, so
// each one calls requireAdmin() itself; see lib/auth/require-admin.ts. The
// work lives in lib/autopilot-news so the cron route can call it without
// pretending to be an admin session.

import { requireAdmin } from "@/lib/auth/require-admin";
import { harvestLatestNews, EnrichedNewsItem } from "@/lib/autopilot-news/harvester";
import { generateSEOArticle, GeneratedNewsArticle } from "@/lib/autopilot-news/generator";
import { saveNewsArticle, SaveNewsOptions, SaveNewsResult } from "@/lib/autopilot-news/publisher";
import {
  AutopilotSettings,
  countNewsPublishedToday,
  readAutopilotSettings,
  writeAutopilotSettings,
} from "@/lib/autopilot-news/settings";
import { getPoolStatus } from "@/lib/gemini-pool";

export async function getNewsFeedItems(): Promise<{
  items: EnrichedNewsItem[];
  poolStatus: any;
  settings: AutopilotSettings;
  publishedToday: number;
}> {
  await requireAdmin();
  const [items, poolStatus, settings, publishedToday] = await Promise.all([
    harvestLatestNews(),
    getPoolStatus().catch(() => null),
    readAutopilotSettings(),
    countNewsPublishedToday(),
  ]);

  return { items, poolStatus, settings, publishedToday };
}

export async function generateNewsArticleAction(item: EnrichedNewsItem): Promise<GeneratedNewsArticle> {
  await requireAdmin();
  return await generateSEOArticle(item);
}

export async function saveNewsArticleAction(
  article: GeneratedNewsArticle,
  opts: SaveNewsOptions
): Promise<SaveNewsResult> {
  await requireAdmin();
  return await saveNewsArticle(article, opts);
}

export async function getAutopilotSettings(): Promise<AutopilotSettings> {
  await requireAdmin();
  return await readAutopilotSettings();
}

export async function updateAutopilotSettings(settings: AutopilotSettings): Promise<boolean> {
  await requireAdmin();
  return await writeAutopilotSettings(settings);
}
