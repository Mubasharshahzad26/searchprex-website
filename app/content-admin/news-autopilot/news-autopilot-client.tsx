// app/content-admin/news-autopilot/news-autopilot-client.tsx
"use client";

import React, { useMemo, useState, useTransition } from "react";
import MarkdownIt from "markdown-it";
import {
  Sparkles,
  RefreshCw,
  ExternalLink,
  CheckCircle2,
  Save,
  Send,
  Sliders,
  Radio,
  FileText,
  Clock,
  Tag,
  Search,
  ShieldCheck,
  Check,
  AlertTriangle,
  X,
  Eye,
  Layers,
  ShieldAlert,
  CircleX,
} from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import {
  getNewsFeedItems,
  generateNewsArticleAction,
  saveNewsArticleAction,
  updateAutopilotSettings,
} from "./actions";
import type { AutopilotSettings } from "@/lib/autopilot-news/settings";
import type { EnrichedNewsItem } from "@/lib/autopilot-news/harvester";
import type { GeneratedNewsArticle } from "@/lib/autopilot-news/generator";
import { checkArticleQuality } from "@/lib/autopilot-news/quality";
import { MAX_NEWS_AGE_HOURS } from "@/lib/autopilot-news/config";

const md = new MarkdownIt({ html: true, linkify: true, breaks: true });

function formatAge(ageHours: number | null): string {
  if (ageHours === null) return "Date unknown";
  if (ageHours < 1) return "Just now";
  if (ageHours < 48) return `${Math.round(ageHours)}h ago`;
  return `${Math.round(ageHours / 24)}d ago`;
}

/** Fresh, dated, not covered and not a repeat — what the cron would consider. */
function isActionable(item: EnrichedNewsItem): boolean {
  return !item.alreadyCovered && !item.isStale && !item.similarCoverage;
}

interface Props {
  initialItems: EnrichedNewsItem[];
  initialPoolStatus: any;
  initialSettings: AutopilotSettings;
  initialPublishedToday: number;
}

export function NewsAutopilotClient({
  initialItems,
  initialPoolStatus,
  initialSettings,
  initialPublishedToday,
}: Props) {
  const [items, setItems] = useState<EnrichedNewsItem[]>(initialItems);
  const [poolStatus, setPoolStatus] = useState<any>(initialPoolStatus);
  const [settings, setSettings] = useState<AutopilotSettings>(initialSettings);
  const [publishedToday, setPublishedToday] = useState(initialPublishedToday);

  const [filterUncovered, setFilterUncovered] = useState(true);
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedItem, setSelectedItem] = useState<EnrichedNewsItem | null>(null);
  const [generatedArticle, setGeneratedArticle] = useState<GeneratedNewsArticle | null>(null);
  const [activeTab, setActiveTab] = useState<"preview" | "seo" | "raw">("preview");

  const [isRefreshing, startRefresh] = useTransition();
  const [isGenerating, setIsGenerating] = useState(false);
  const [isSaving, setIsSaving] = useState(false);
  const [saveSuccess, setSaveSuccess] = useState<{
    url: string;
    slug: string;
    live: boolean;
    requestedSlug?: string;
  } | null>(null);
  const [errorMsg, setErrorMsg] = useState<string | null>(null);
  // The slug this article was last saved under; only that row may be overwritten.
  const [savedSlug, setSavedSlug] = useState<string | null>(null);
  // Overridable quality checks the editor has verified by hand.
  const [overrides, setOverrides] = useState<string[]>([]);

  const quality = useMemo(
    () => (generatedArticle ? checkArticleQuality(generatedArticle, { overrides }) : null),
    [generatedArticle, overrides]
  );

  // Filtered feed items
  const displayedItems = items.filter((item) => {
    if (filterUncovered && !isActionable(item)) return false;
    if (!searchQuery) return true;
    const q = searchQuery.toLowerCase();
    return item.title.toLowerCase().includes(q) || item.summary.toLowerCase().includes(q);
  });

  const handleRefreshFeeds = () => {
    startRefresh(async () => {
      try {
        setErrorMsg(null);
        const data = await getNewsFeedItems();
        setItems(data.items);
        if (data.poolStatus) setPoolStatus(data.poolStatus);
        setSettings(data.settings);
        setPublishedToday(data.publishedToday);
      } catch (err: any) {
        setErrorMsg("Failed to refresh news feeds: " + err.message);
      }
    });
  };

  const handleGenerate = async (item: EnrichedNewsItem) => {
    setIsGenerating(true);
    setSelectedItem(item);
    setGeneratedArticle(null);
    setSaveSuccess(null);
    setErrorMsg(null);
    setSavedSlug(null);
    setOverrides([]);

    try {
      const article = await generateNewsArticleAction(item);
      setGeneratedArticle(article);
    } catch (err: any) {
      setErrorMsg("Generation error: " + err.message);
    } finally {
      setIsGenerating(false);
    }
  };

  const handleSaveArticle = async (publishLive: boolean) => {
    if (!generatedArticle) return;
    setIsSaving(true);
    setErrorMsg(null);

    try {
      const res = await saveNewsArticleAction(generatedArticle, {
        publishLive,
        replaceSlug: savedSlug,
        overrides,
      });
      if (res.success) {
        setSaveSuccess({ url: res.url, slug: res.slug, live: publishLive, requestedSlug: res.requestedSlug });
        setSavedSlug(res.slug);
        if (res.slug !== generatedArticle.slug) setGeneratedArticle({ ...generatedArticle, slug: res.slug });
        // Re-publishing an already-live article doesn't add to today's count.
        if (publishLive && !saveSuccess?.live) setPublishedToday((prev) => prev + 1);

        // Mark item as covered in UI list
        setItems((prev) =>
          prev.map((i) =>
            i.link === generatedArticle.sourceUrl ? { ...i, alreadyCovered: true, existingSlug: res.slug } : i
          )
        );
      } else {
        setErrorMsg("Save failed: " + (res.error || "Unknown error"));
      }
    } catch (err: any) {
      setErrorMsg("Save failed: " + err.message);
    } finally {
      setIsSaving(false);
    }
  };

  const handleToggleSetting = async (key: keyof AutopilotSettings, value: any) => {
    const updated = { ...settings, [key]: value };
    setSettings(updated);
    await updateAutopilotSettings(updated);
  };

  return (
    <div className="space-y-6">
      {/* Top Banner & Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card className="border-border bg-card">
          <CardContent className="pt-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-muted-foreground">Fresh News Candidates</p>
                <h3 className="text-2xl font-bold mt-1">
                  {items.filter(isActionable).length}{" "}
                  <span className="text-xs text-muted-foreground font-normal">/ {items.length} total</span>
                </h3>
              </div>
              <Radio className="w-8 h-8 text-blue-500 opacity-80" />
            </div>
          </CardContent>
        </Card>

        <Card className="border-border bg-card">
          <CardContent className="pt-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-muted-foreground">Gemini Key Pool</p>
                <h3 className="text-2xl font-bold mt-1 text-emerald-500">
                  {poolStatus?.activeKeys ?? 30}{" "}
                  <span className="text-xs text-muted-foreground font-normal">
                    / {poolStatus?.totalKeys ?? 30} Active
                  </span>
                </h3>
              </div>
              <ShieldCheck className="w-8 h-8 text-emerald-500 opacity-80" />
            </div>
          </CardContent>
        </Card>

        <Card className="border-border bg-card">
          <CardContent className="pt-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-muted-foreground">Published Today</p>
                <h3 className="text-2xl font-bold mt-1">
                  {publishedToday}{" "}
                  <span className="text-xs text-muted-foreground font-normal">/ {settings.dailyLimit} cap</span>
                </h3>
              </div>
              <FileText className="w-8 h-8 text-purple-500 opacity-80" />
            </div>
          </CardContent>
        </Card>

        <Card className="border-border bg-card">
          <CardContent className="pt-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-muted-foreground">Autopilot Mode</p>
                <h3 className="text-lg font-bold mt-1 flex items-center gap-1.5">
                  {settings.enabled ? (
                    <span className="text-emerald-500 flex items-center gap-1 text-sm font-semibold">
                      <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
                      Active ({settings.autoPublish ? "Auto-Live" : "Draft-Queue"})
                    </span>
                  ) : (
                    <span className="text-amber-500 text-sm font-semibold">Manual Review Mode</span>
                  )}
                </h3>
              </div>
              <Sliders className="w-8 h-8 text-amber-500 opacity-80" />
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Autopilot Engine Settings Drawer */}
      <Card className="border-border bg-muted/40">
        <CardContent className="pt-4 pb-4">
          <div className="flex flex-wrap items-center justify-between gap-4">
            <div className="flex items-center gap-3">
              <Sparkles className="w-5 h-5 text-indigo-500" />
              <div>
                <h4 className="text-sm font-semibold">Autopilot Guardrails</h4>
                <p className="text-xs text-muted-foreground">
                  Safely control how breaking news is harvested, synthesized, and scheduled.
                </p>
              </div>
            </div>

            <div className="flex flex-wrap items-center gap-6 text-sm">
              <label className="flex items-center gap-2 cursor-pointer font-medium">
                <input
                  type="checkbox"
                  checked={settings.enabled}
                  onChange={(e) => handleToggleSetting("enabled", e.target.checked)}
                  className="rounded border-gray-300 text-indigo-600 focus:ring-indigo-500 h-4 w-4"
                />
                Enable Background Cron
              </label>

              <label className="flex items-center gap-2 cursor-pointer font-medium">
                <input
                  type="checkbox"
                  checked={settings.autoPublish}
                  onChange={(e) => handleToggleSetting("autoPublish", e.target.checked)}
                  className="rounded border-gray-300 text-emerald-600 focus:ring-emerald-500 h-4 w-4"
                />
                Auto-Publish (Unchecked = Save as Draft)
              </label>

              <div className="flex items-center gap-2">
                <Label htmlFor="dailyLimit" className="text-xs text-muted-foreground whitespace-nowrap">
                  Daily Cap:
                </Label>
                <select
                  id="dailyLimit"
                  value={settings.dailyLimit}
                  onChange={(e) => handleToggleSetting("dailyLimit", parseInt(e.target.value))}
                  className="h-8 rounded-md border border-input bg-background px-2 text-xs"
                >
                  <option value={1}>1 article/day</option>
                  <option value={2}>2 articles/day</option>
                  <option value={3}>3 articles/day (Recommended)</option>
                  <option value={5}>5 articles/day</option>
                </select>
              </div>

              <Button
                variant="outline"
                size="sm"
                onClick={handleRefreshFeeds}
                disabled={isRefreshing}
                className="h-8 gap-1.5"
              >
                <RefreshCw className={`w-3.5 h-3.5 ${isRefreshing ? "animate-spin" : ""}`} />
                Refresh Feeds
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Error Alert */}
      {errorMsg && (
        <div className="p-4 rounded-lg bg-red-50 dark:bg-red-950/40 border border-red-200 dark:border-red-900 text-red-700 dark:text-red-300 text-sm flex items-center justify-between">
          <div className="flex items-center gap-2">
            <AlertTriangle className="w-5 h-5 flex-shrink-0" />
            <span>{errorMsg}</span>
          </div>
          <Button variant="ghost" size="sm" onClick={() => setErrorMsg(null)}>
            <X className="w-4 h-4" />
          </Button>
        </div>
      )}

      {/* Save Success Banner */}
      {saveSuccess && (
        <div className="p-4 rounded-lg bg-emerald-50 dark:bg-emerald-950/40 border border-emerald-200 dark:border-emerald-900 text-emerald-800 dark:text-emerald-200 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <CheckCircle2 className="w-6 h-6 text-emerald-600 flex-shrink-0" />
            <div>
              <p className="font-semibold text-sm">
                {saveSuccess.live ? "🚀 Article Published Live to Searchprex!" : "💾 Article Saved as Draft!"}
              </p>
              <p className="text-xs text-muted-foreground mt-0.5">
                Slug: <code className="font-mono">{saveSuccess.slug}</code>
                {saveSuccess.live && " • Queued for Google Indexing"}
              </p>
              {saveSuccess.requestedSlug && (
                <p className="text-xs text-amber-700 dark:text-amber-400 mt-0.5">
                  <code className="font-mono">{saveSuccess.requestedSlug}</code> already belongs to another post, so
                  this was saved under a new slug instead of replacing it.
                </p>
              )}
            </div>
          </div>
          {saveSuccess.live && (
            <Button asChild size="sm" variant="default" className="bg-emerald-600 hover:bg-emerald-700">
              <a href={`/resources/news/${saveSuccess.slug}`} target="_blank" rel="noreferrer" className="gap-1.5">
                <Eye className="w-4 h-4" /> View Live Page
              </a>
            </Button>
          )}
        </div>
      )}

      {/* Main Split Layout: Left Feed List vs Right Test Lab */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* LEFT COLUMN: Breaking News Feeds */}
        <div className="lg:col-span-5 space-y-4">
          <Card className="border-border">
            <CardHeader className="pb-3 flex flex-row items-center justify-between space-y-0">
              <div>
                <CardTitle className="text-lg flex items-center gap-2">
                  <Radio className="w-4 h-4 text-red-500 animate-pulse" /> Live SEO Feeds
                </CardTitle>
                <p className="text-xs text-muted-foreground mt-1">
                  SERoundtable & Search Engine Journal live updates
                </p>
              </div>
              <Badge variant="outline" className="text-xs">
                {displayedItems.length} Available
              </Badge>
            </CardHeader>
            <CardContent className="space-y-3">
              <div className="flex items-center gap-2">
                <div className="relative flex-1">
                  <Search className="w-4 h-4 absolute left-2.5 top-2.5 text-muted-foreground" />
                  <Input
                    placeholder="Search news..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="pl-8 text-xs h-9"
                  />
                </div>
                <Button
                  variant={filterUncovered ? "default" : "outline"}
                  size="sm"
                  onClick={() => setFilterUncovered(!filterUncovered)}
                  className="text-xs h-9"
                >
                  {filterUncovered ? `Fresh & Uncovered (≤${MAX_NEWS_AGE_HOURS}h)` : "Show All"}
                </Button>
              </div>

              {/* Feed items list */}
              <div className="space-y-2.5 max-h-[700px] overflow-y-auto pr-1">
                {displayedItems.length === 0 ? (
                  <div className="text-center py-12 text-sm text-muted-foreground">
                    No news items match your filter.
                  </div>
                ) : (
                  displayedItems.map((item) => {
                    const isSelected = selectedItem?.link === item.link;
                    return (
                      <div
                        key={item.link}
                        className={`p-3.5 rounded-lg border transition-all ${
                          isSelected
                            ? "border-primary bg-primary/5 shadow-sm"
                            : "border-border hover:border-gray-300 dark:hover:border-gray-700 bg-card"
                        }`}
                      >
                        <div className="flex items-start justify-between gap-2">
                          <div className="space-y-1">
                            <div className="flex items-center gap-2 flex-wrap">
                              <span className="text-[11px] font-semibold px-2 py-0.5 rounded bg-muted text-foreground">
                                {item.sourceName}
                              </span>
                              <span
                                className={`text-[11px] flex items-center gap-1 ${item.isStale ? "text-amber-600 dark:text-amber-400 font-medium" : "text-muted-foreground"}`}
                                title={item.publishedAt ? new Date(item.publishedAt).toLocaleString() : "The feed gave no publish date"}
                              >
                                <Clock className="w-3 h-3" />
                                {formatAge(item.ageHours)}
                              </span>
                              {item.isStale && !item.alreadyCovered && (
                                <Badge variant="outline" className="text-[10px] border-amber-400 text-amber-700 dark:text-amber-400">
                                  {item.ageHours === null ? "Undated" : "Stale"}
                                </Badge>
                              )}
                              {item.alreadyCovered && (
                                <Badge variant="secondary" className="text-[10px] bg-emerald-100 text-emerald-800 dark:bg-emerald-950 dark:text-emerald-300">
                                  Covered
                                </Badge>
                              )}
                              {item.relevanceScore >= 8 && (
                                <Badge variant="outline" className="text-[10px] border-amber-400 text-amber-600">
                                  High Impact
                                </Badge>
                              )}
                            </div>

                            <h4 className="text-sm font-semibold leading-snug line-clamp-2">
                              {item.title}
                            </h4>
                            <p className="text-xs text-muted-foreground line-clamp-2">
                              {item.summary}
                            </p>
                            {item.similarCoverage && (
                              <p className="text-[11px] text-amber-700 dark:text-amber-400 flex items-start gap-1 pt-0.5">
                                <AlertTriangle className="w-3 h-3 mt-0.5 flex-shrink-0" />
                                <span>
                                  Possibly the same story as{" "}
                                  {item.similarCoverage.slug ? (
                                    <a
                                      href={`/resources/news/${item.similarCoverage.slug}`}
                                      target="_blank"
                                      rel="noreferrer"
                                      className="underline"
                                    >
                                      {item.similarCoverage.title}
                                    </a>
                                  ) : (
                                    <>&ldquo;{item.similarCoverage.title}&rdquo;</>
                                  )}
                                  . Consider updating that article instead.
                                </span>
                              </p>
                            )}
                          </div>
                        </div>

                        <div className="flex items-center justify-between pt-3 mt-2 border-t border-border/60">
                          <a
                            href={item.link}
                            target="_blank"
                            rel="noreferrer"
                            className="text-xs text-muted-foreground hover:text-foreground flex items-center gap-1"
                          >
                            Source Link <ExternalLink className="w-3 h-3" />
                          </a>

                          <div className="flex items-center gap-2">
                            {item.alreadyCovered && item.existingSlug && (
                              <Button asChild variant="ghost" size="sm" className="h-7 text-xs">
                                <a href={`/resources/news/${item.existingSlug}`} target="_blank" rel="noreferrer">
                                  View Live
                                </a>
                              </Button>
                            )}

                            <Button
                              size="sm"
                              disabled={isGenerating}
                              onClick={() => handleGenerate(item)}
                              className="h-7 text-xs gap-1 bg-indigo-600 hover:bg-indigo-700 text-white"
                            >
                              <Sparkles className="w-3 h-3" />
                              {isSelected && isGenerating ? "Generating..." : "⚡ Test Generate"}
                            </Button>
                          </div>
                        </div>
                      </div>
                    );
                  })
                )}
              </div>
            </CardContent>
          </Card>
        </div>

        {/* RIGHT COLUMN: Quality Testing & Inspection Bench */}
        <div className="lg:col-span-7 space-y-4">
          <Card className="border-border">
            <CardHeader className="pb-3 border-b">
              <div className="flex flex-wrap items-center justify-between gap-2">
                <div>
                  <CardTitle className="text-lg flex items-center gap-2">
                    <Sparkles className="w-4 h-4 text-indigo-500" />
                    SEO Article Quality Test Bench
                  </CardTitle>
                  <p className="text-xs text-muted-foreground mt-0.5">
                    Inspect factual accuracy, Information Gain, headings, and schema before going live.
                  </p>
                </div>

                {generatedArticle && (
                  <div className="flex items-center gap-2">
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => handleSaveArticle(false)}
                      disabled={isSaving}
                      className="gap-1 text-xs"
                    >
                      <Save className="w-3.5 h-3.5" />
                      Save Draft
                    </Button>

                    <Button
                      size="sm"
                      onClick={() => handleSaveArticle(true)}
                      disabled={isSaving || !quality?.canPublish}
                      title={
                        quality?.canPublish
                          ? undefined
                          : `Blocked by the quality gate: ${quality?.blocking.map((c) => c.label).join(", ")}`
                      }
                      className="gap-1 text-xs bg-emerald-600 hover:bg-emerald-700 text-white"
                    >
                      <Send className="w-3.5 h-3.5" />
                      🚀 Publish to Live Site
                    </Button>
                  </div>
                )}
              </div>

              {/* Sub tabs */}
              {generatedArticle && (
                <div className="flex gap-2 pt-3">
                  <Button
                    variant={activeTab === "preview" ? "default" : "ghost"}
                    size="sm"
                    onClick={() => setActiveTab("preview")}
                    className="h-7 text-xs gap-1"
                  >
                    <Eye className="w-3.5 h-3.5" /> Reader Preview
                  </Button>
                  <Button
                    variant={activeTab === "seo" ? "default" : "ghost"}
                    size="sm"
                    onClick={() => setActiveTab("seo")}
                    className="h-7 text-xs gap-1"
                  >
                    <Layers className="w-3.5 h-3.5" /> SEO & Schema
                  </Button>
                  <Button
                    variant={activeTab === "raw" ? "default" : "ghost"}
                    size="sm"
                    onClick={() => setActiveTab("raw")}
                    className="h-7 text-xs gap-1"
                  >
                    <FileText className="w-3.5 h-3.5" /> Editable Markdown
                  </Button>
                </div>
              )}
            </CardHeader>

            <CardContent className="pt-4 min-h-[600px]">
              {isGenerating ? (
                <div className="flex flex-col items-center justify-center py-24 space-y-4 text-center">
                  <div className="w-12 h-12 rounded-full border-4 border-indigo-600 border-t-transparent animate-spin" />
                  <div className="space-y-1">
                    <h4 className="font-semibold text-base">Synthesizing SEO News Article...</h4>
                    <p className="text-xs text-muted-foreground max-w-sm">
                      Rotating Gemini keys, enforcing factual bounds, generating &quot;SearchPrex Take&quot;, and structuring FAQ schema.
                    </p>
                  </div>
                </div>
              ) : !generatedArticle ? (
                <div className="flex flex-col items-center justify-center py-28 text-center space-y-3">
                  <div className="w-14 h-14 rounded-2xl bg-indigo-50 dark:bg-indigo-950/60 flex items-center justify-center text-indigo-600">
                    <Sparkles className="w-7 h-7" />
                  </div>
                  <div className="space-y-1">
                    <h3 className="font-semibold text-base">Select a Breaking News Item</h3>
                    <p className="text-xs text-muted-foreground max-w-md">
                      Click <strong>&quot;⚡ Test Generate&quot;</strong> on any item from the left panel to test its quality, check headings, and inspect SEO schema on this page.
                    </p>
                  </div>
                  {displayedItems.length > 0 && (
                    <Button
                      size="sm"
                      onClick={() => handleGenerate(displayedItems[0])}
                      className="mt-2 text-xs bg-indigo-600 hover:bg-indigo-700"
                    >
                      ⚡ Test Top Breaking Item
                    </Button>
                  )}
                </div>
              ) : (
                <div className="space-y-4">
                  {/* Quality gate: recomputed on every edit, enforced again on the server at save */}
                  {quality && (
                    <div
                      className={`p-3.5 rounded-lg border space-y-2 ${
                        quality.canPublish
                          ? "border-emerald-200 bg-emerald-50/60 dark:border-emerald-900 dark:bg-emerald-950/30"
                          : "border-red-200 bg-red-50/60 dark:border-red-900 dark:bg-red-950/30"
                      }`}
                    >
                      <div className="flex items-center justify-between gap-2">
                        <span className="text-xs font-semibold flex items-center gap-1.5">
                          {quality.canPublish ? (
                            <ShieldCheck className="w-4 h-4 text-emerald-600" />
                          ) : (
                            <ShieldAlert className="w-4 h-4 text-red-600" />
                          )}
                          Quality Gate
                        </span>
                        <span className="text-[11px] text-muted-foreground">
                          {quality.canPublish
                            ? "Ready to publish"
                            : `${quality.blocking.length} blocking — drafts can still be saved`}
                        </span>
                      </div>
                      <ul className="grid grid-cols-1 sm:grid-cols-2 gap-x-4 gap-y-1.5">
                        {quality.checks.map((check) => (
                          <li key={check.id} className="text-xs flex items-start gap-1.5">
                            {check.status === "pass" || check.overridden ? (
                              <Check className="w-3.5 h-3.5 text-emerald-600 mt-0.5 flex-shrink-0" />
                            ) : check.status === "warn" ? (
                              <AlertTriangle className="w-3.5 h-3.5 text-amber-500 mt-0.5 flex-shrink-0" />
                            ) : (
                              <CircleX className="w-3.5 h-3.5 text-red-600 mt-0.5 flex-shrink-0" />
                            )}
                            <div className="min-w-0">
                              <span className="font-medium">{check.label}</span>
                              {check.overridden && (
                                <span className="text-emerald-700 dark:text-emerald-400"> (verified by editor)</span>
                              )}
                              {check.detail && (
                                <p className="text-[11px] text-muted-foreground break-words">{check.detail}</p>
                              )}
                              {check.status === "fail" && check.overridable && (
                                <label className="flex items-center gap-1.5 text-[11px] mt-1 cursor-pointer">
                                  <input
                                    type="checkbox"
                                    checked={overrides.includes(check.id)}
                                    onChange={(e) =>
                                      setOverrides((prev) =>
                                        e.target.checked ? [...prev, check.id] : prev.filter((id) => id !== check.id)
                                      )
                                    }
                                    className="h-3.5 w-3.5"
                                  />
                                  I checked this against the original source
                                </label>
                              )}
                            </div>
                          </li>
                        ))}
                      </ul>
                    </div>
                  )}

                  {/* TAB 1: VISUAL READER PREVIEW */}
                  {activeTab === "preview" && (
                    <div className="space-y-6">
                      {/* Hero preview */}
                      <div className="space-y-3 border-b pb-4">
                        {generatedArticle.coverImage && (
                          <div className="relative w-full h-64 sm:h-72 rounded-xl overflow-hidden border border-border shadow-sm mb-4 bg-muted">
                            <img
                              src={generatedArticle.coverImage}
                              alt={generatedArticle.title}
                              className="w-full h-full object-cover"
                            />
                            <span className="absolute bottom-2 right-2 bg-black/75 backdrop-blur-sm text-[10px] text-white px-2 py-0.5 rounded font-mono">
                              WebP • Optimized (&lt;50kb)
                            </span>
                          </div>
                        )}

                        <div className="flex items-center gap-2 flex-wrap">
                          <Badge variant="secondary" className="text-xs font-semibold">
                            {generatedArticle.category}
                          </Badge>
                          <span className="text-xs text-muted-foreground">{generatedArticle.readTime}</span>
                          <span className="text-xs text-emerald-600 dark:text-emerald-400 font-medium">
                            • By {generatedArticle.author || "Mubashar Sharif"} (Verified SEO Expert)
                          </span>
                        </div>
                        <h1 className="text-2xl font-bold tracking-tight text-foreground">
                          {generatedArticle.title}
                        </h1>
                        <p className="text-sm text-muted-foreground italic">
                          {generatedArticle.excerpt}
                        </p>
                      </div>

                      {/* Rendered HTML/Markdown */}
                      <div
                        className="prose prose-sm dark:prose-invert max-w-none space-y-4 text-foreground/90"
                        dangerouslySetInnerHTML={{ __html: md.render(generatedArticle.content) }}
                      />

                      {/* Author E-E-A-T Bio Card */}
                      <div className="p-4 rounded-xl border bg-muted/40 flex items-start gap-4 mt-8 border-border">
                        <div className="w-12 h-12 rounded-full bg-gradient-to-tr from-emerald-600 to-teal-700 flex items-center justify-center text-white font-bold text-lg flex-shrink-0 shadow-sm">
                          MS
                        </div>
                        <div className="space-y-1 flex-1">
                          <div className="flex items-center gap-2 flex-wrap">
                            <h4 className="font-bold text-sm text-foreground">Mubashar Sharif</h4>
                            <Badge variant="outline" className="text-[10px] border-emerald-500 text-emerald-600 bg-emerald-50 dark:bg-emerald-950/40">
                              ✓ Verified SEO Expert
                            </Badge>
                          </div>
                          <p className="text-xs text-muted-foreground">
                            {generatedArticle.authorBio || "Senior SEO Analyst & Algorithm Strategist at SearchPrex, specializing in Google search volatility, technical architecture, and Generative Engine Optimization (GEO)."}
                          </p>
                          <a
                            href={generatedArticle.authorLinkedIn || "https://www.linkedin.com/in/mubashar-sharif-senior-seo-analyst/"}
                            target="_blank"
                            rel="noreferrer"
                            className="inline-flex items-center gap-1.5 text-xs text-blue-600 hover:underline pt-1 font-medium"
                          >
                            View LinkedIn Profile ↗
                          </a>
                        </div>
                      </div>
                    </div>
                  )}

                  {/* TAB 2: SEO & SCHEMA INSPECTION */}
                  {activeTab === "seo" && (
                    <div className="space-y-6">
                      {/* SERP Preview Simulator */}
                      <div className="p-4 rounded-lg bg-gray-50 dark:bg-gray-900 border space-y-2">
                        <span className="text-xs font-semibold text-muted-foreground uppercase tracking-wider">
                          Google SERP Preview (Desktop)
                        </span>
                        <div className="space-y-1">
                          <p className="text-xs text-[#202124] dark:text-gray-400">
                            https://www.searchprex.com › resources › news › {generatedArticle.slug}
                          </p>
                          <h4 className="text-lg font-medium text-[#1a0dab] dark:text-[#8ab4f8] hover:underline cursor-pointer">
                            {generatedArticle.metaTitle}
                          </h4>
                          <p className="text-xs text-[#4d5156] dark:text-gray-300 line-clamp-2">
                            {generatedArticle.metaDescription}
                          </p>
                        </div>
                      </div>

                      {/* Field Editors */}
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div className="space-y-1.5">
                          <div className="flex justify-between">
                            <Label className="text-xs">Meta Title</Label>
                            <span className={`text-[10px] ${generatedArticle.metaTitle.length > 60 ? "text-red-500" : "text-muted-foreground"}`}>
                              {generatedArticle.metaTitle.length}/60 chars
                            </span>
                          </div>
                          <Input
                            value={generatedArticle.metaTitle}
                            onChange={(e) =>
                              setGeneratedArticle({ ...generatedArticle, metaTitle: e.target.value })
                            }
                            className="text-xs"
                          />
                        </div>

                        <div className="space-y-1.5">
                          <div className="flex justify-between">
                            <Label className="text-xs">URL Slug</Label>
                            <span className="text-[10px] text-muted-foreground">/resources/news/{generatedArticle.slug}</span>
                          </div>
                          <Input
                            value={generatedArticle.slug}
                            onChange={(e) =>
                              setGeneratedArticle({ ...generatedArticle, slug: e.target.value })
                            }
                            className="text-xs font-mono"
                          />
                        </div>

                        <div className="space-y-1.5 md:col-span-2">
                          <div className="flex justify-between">
                            <Label className="text-xs">Meta Description</Label>
                            <span className={`text-[10px] ${generatedArticle.metaDescription.length > 155 ? "text-red-500" : "text-muted-foreground"}`}>
                              {generatedArticle.metaDescription.length}/155 chars
                            </span>
                          </div>
                          <Textarea
                            value={generatedArticle.metaDescription}
                            onChange={(e) =>
                              setGeneratedArticle({ ...generatedArticle, metaDescription: e.target.value })
                            }
                            rows={2}
                            className="text-xs"
                          />
                        </div>

                        <div className="space-y-1.5">
                          <Label className="text-xs">Category Tag</Label>
                          <Input
                            value={generatedArticle.category}
                            onChange={(e) =>
                              setGeneratedArticle({ ...generatedArticle, category: e.target.value as any })
                            }
                            className="text-xs"
                          />
                        </div>

                        <div className="space-y-1.5">
                          <Label className="text-xs">Author Byline</Label>
                          <Input
                            value={generatedArticle.author}
                            onChange={(e) =>
                              setGeneratedArticle({ ...generatedArticle, author: e.target.value })
                            }
                            className="text-xs"
                          />
                        </div>

                        <div className="space-y-1.5 md:col-span-2">
                          <div className="flex justify-between">
                            <Label className="text-xs">Cover Image URL (WebP &lt;50kb)</Label>
                            <span className="text-[10px] text-emerald-600 font-medium">Auto-Optimized CDN WebP</span>
                          </div>
                          <Input
                            value={generatedArticle.coverImage}
                            onChange={(e) =>
                              setGeneratedArticle({ ...generatedArticle, coverImage: e.target.value })
                            }
                            className="text-xs font-mono"
                          />
                        </div>
                      </div>

                      {/* Schema Markup Readiness */}
                      <div className="p-3.5 rounded-lg border bg-muted/30 space-y-2">
                        <div className="flex items-center justify-between">
                          <span className="text-xs font-semibold flex items-center gap-1.5">
                            <Check className="w-4 h-4 text-emerald-500" /> Schema.org Integration
                          </span>
                          <Badge variant="outline" className="text-[10px]">Auto-Emitted</Badge>
                        </div>
                        <ul className="text-xs space-y-1 text-muted-foreground">
                          <li>• <strong>NewsArticle:</strong> Emitted with headline, datePublished, dateModified, and E-E-A-T author.</li>
                          <li>• <strong>BreadcrumbList:</strong> Emitted for Home › Resources › SEO News › Article.</li>
                          <li>• <strong>FAQPage:</strong> Auto-extracted from the <code className="font-mono">## Quick answers</code> section in markdown.</li>
                        </ul>
                      </div>
                    </div>
                  )}

                  {/* TAB 3: RAW EDITABLE MARKDOWN */}
                  {activeTab === "raw" && (
                    <div className="space-y-2">
                      <Label className="text-xs text-muted-foreground">
                        Direct Markdown Editor (Edit headings, add custom notes, or fine-tune phrasing before saving):
                      </Label>
                      <Textarea
                        value={generatedArticle.content}
                        onChange={(e) =>
                          setGeneratedArticle({ ...generatedArticle, content: e.target.value })
                        }
                        rows={22}
                        className="font-mono text-xs"
                      />
                    </div>
                  )}
                </div>
              )}
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
