// lib/autopilot-news/settings.ts
//
// Unguarded on purpose: the cron route authenticates with CRON_SECRET and calls
// these directly. The admin UI reaches them only through the guarded actions in
// app/content-admin/news-autopilot/actions.ts.

import { db } from "@/lib/db";

export interface AutopilotSettings {
  enabled: boolean;
  autoPublish: boolean;
  dailyLimit: number;
}

const CONFIG_KEY = "news_autopilot_config";

const DEFAULT_SETTINGS: AutopilotSettings = {
  enabled: false,
  autoPublish: false,
  dailyLimit: 3,
};

export async function readAutopilotSettings(): Promise<AutopilotSettings> {
  try {
    const rows = await db.$queryRaw<Array<{ value: string }>>`
      SELECT value FROM mso_cloud_config WHERE key = ${CONFIG_KEY}
    `;
    if (rows?.[0]?.value) {
      return { ...DEFAULT_SETTINGS, ...JSON.parse(rows[0].value) };
    }
  } catch {
    // fallback defaults
  }
  return DEFAULT_SETTINGS;
}

export async function writeAutopilotSettings(settings: AutopilotSettings): Promise<boolean> {
  const clean: AutopilotSettings = {
    enabled: Boolean(settings.enabled),
    autoPublish: Boolean(settings.autoPublish),
    dailyLimit: Math.min(10, Math.max(1, Math.floor(Number(settings.dailyLimit)) || DEFAULT_SETTINGS.dailyLimit)),
  };
  try {
    const value = JSON.stringify(clean);
    await db.$executeRaw`
      INSERT INTO mso_cloud_config (key, value, updated_at)
      VALUES (${CONFIG_KEY}, ${value}, NOW())
      ON CONFLICT (key) DO UPDATE
      SET value = ${value}, updated_at = NOW()
    `;
    return true;
  } catch (err) {
    console.error("[news-settings] Update config failed:", err);
    return false;
  }
}

export async function countNewsPublishedToday(): Promise<number> {
  try {
    const today = new Date();
    today.setHours(0, 0, 0, 0);

    return await db.marketingBlog.count({
      where: {
        category: { contains: "SEO News", mode: "insensitive" },
        published: true,
        publishedAt: { gte: today },
      },
    });
  } catch {
    return 0;
  }
}
