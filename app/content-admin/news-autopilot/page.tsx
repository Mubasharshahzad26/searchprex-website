// app/content-admin/news-autopilot/page.tsx
import React from "react";
import type { Metadata } from "next";
import { getNewsFeedItems } from "./actions";
import { NewsAutopilotClient } from "./news-autopilot-client";

export const metadata: Metadata = {
  title: "SEO News Autopilot & Quality Lab | SearchPrex Admin",
};

export const dynamic = "force-dynamic";

export default async function NewsAutopilotPage() {
  const { items, poolStatus, settings, publishedToday } = await getNewsFeedItems();

  return (
    <div className="space-y-6">
      <div className="flex flex-col gap-1">
        <h1 className="text-2xl font-bold tracking-tight">SEO News Autopilot & Quality Lab</h1>
        <p className="text-sm text-muted-foreground">
          Real-time SEO news aggregator, Gemini 30-key AI synthesis, quality inspection lab, and 1-click publishing.
        </p>
      </div>

      <NewsAutopilotClient
        initialItems={items}
        initialPoolStatus={poolStatus}
        initialSettings={settings}
        initialPublishedToday={publishedToday}
      />
    </div>
  );
}
