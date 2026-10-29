"use client";

import { useEffect, useMemo, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { ArrowRight, CalendarDays, Search, SlidersHorizontal, TrendingUp } from "lucide-react";
import type { LocalSeoNewsPost } from "@/components/news/LocalSeoNewsPosts";
import type { LocalSeoNewsUpdate } from "@/components/news/LocalSeoNewsTimeline";

const INTERESTS = ["Google Business Profile", "Google Maps", "Reviews", "Local rankings", "AI search"] as const;
type Interest = (typeof INTERESTS)[number];
type FeedItem = {
  id: string;
  title: string;
  summary: string;
  date: string;
  href: string;
  source: string;
  kind: "SearchPrex article" | "Sourced update";
  topics: string[];
  image: string;
  imageAlt: string;
  trending: boolean;
  external: boolean;
};

const PREFERENCES_KEY = "searchprex-local-seo-news-interests-v1";
const toTimestamp = (date: string) => new Date(/^\d{4}-\d{2}-\d{2}$/.test(date) ? `${date}T12:00:00` : date).getTime();
const formatDate = (date: string) => {
  const timestamp = toTimestamp(date);
  return Number.isFinite(timestamp) ? new Date(timestamp).toLocaleDateString("en-US", { month: "short", day: "numeric", year: "numeric" }) : date;
};

function articleTopics(post: LocalSeoNewsPost): string[] {
  const text = `${post.title} ${post.excerpt} ${post.slug}`.toLowerCase();
  return [
    ...(text.includes("profile") || text.includes("suggested edit") || text.includes("gbp") ? ["Google Business Profile"] : []),
    ...(text.includes("maps") || text.includes("map pack") ? ["Google Maps"] : []),
    ...(text.includes("review") ? ["Reviews"] : []),
    ...(text.includes("rank") || text.includes("local seo") ? ["Local rankings"] : []),
    ...(text.includes("ai overview") || text.includes("chatgpt") || text.includes("gemini") || text.includes("ai search") ? ["AI search"] : []),
  ];
}

export default function LocalSeoNewsExplorer({ posts, updates }: { posts: LocalSeoNewsPost[]; updates: LocalSeoNewsUpdate[] }) {
  const [query, setQuery] = useState("");
  const [sort, setSort] = useState<"latest" | "oldest">("latest");
  const [dateRange, setDateRange] = useState("all");
  const [mode, setMode] = useState<"all" | "trending" | "forYou">("all");
  const [interests, setInterests] = useState<Interest[]>([]);
  const [preferencesReady, setPreferencesReady] = useState(false);

  useEffect(() => {
    try {
      const saved = JSON.parse(localStorage.getItem(PREFERENCES_KEY) || "[]");
      if (Array.isArray(saved)) setInterests(saved.filter((item): item is Interest => INTERESTS.includes(item)));
    } catch {
      setInterests([]);
    } finally {
      setPreferencesReady(true);
    }
  }, []);

  useEffect(() => {
    if (!preferencesReady) return;
    try { localStorage.setItem(PREFERENCES_KEY, JSON.stringify(interests)); } catch {}
  }, [interests, preferencesReady]);

  const items = useMemo<FeedItem[]>(() => {
    const articleItems: FeedItem[] = posts.map((post) => ({
      id: `article:${post.slug}`,
      title: post.title,
      summary: post.excerpt,
      date: post.date,
      href: `/resources/news/${post.slug}`,
      source: "SearchPrex",
      kind: "SearchPrex article",
      topics: articleTopics(post),
      image: post.image,
      imageAlt: post.imageAlt,
      trending: post.slug.includes("fake-review"),
      external: false,
    }));
    const articleHrefs = new Set(articleItems.map((item) => item.href));
    const updateItems: FeedItem[] = updates
      .filter((update) => !articleHrefs.has(update.href))
      .map((update) => ({
        id: `source:${update.title}`,
        title: update.title,
        summary: update.summary,
        date: update.date,
        href: update.href,
        source: update.source,
        kind: "Sourced update",
        topics: update.topics,
        image: update.image,
        imageAlt: update.imageAlt,
        trending: Boolean(update.trending),
        external: /^https?:\/\//i.test(update.href),
      }));
    return [...articleItems, ...updateItems];
  }, [posts, updates]);

  const filteredItems = useMemo(() => {
    const now = new Date();
    const cutoff = new Date(now);
    if (dateRange === "7d") cutoff.setDate(cutoff.getDate() - 7);
    if (dateRange === "30d") cutoff.setDate(cutoff.getDate() - 30);
    if (dateRange === "year") cutoff.setMonth(0, 1);
    cutoff.setHours(0, 0, 0, 0);
    const normalizedQuery = query.trim().toLowerCase();
    return items
      .filter((item) => {
        const timestamp = toTimestamp(item.date);
        const matchesDate = dateRange === "all" || (Number.isFinite(timestamp) && timestamp >= cutoff.getTime());
        const matchesQuery = !normalizedQuery || `${item.title} ${item.summary} ${item.topics.join(" ")} ${item.source}`.toLowerCase().includes(normalizedQuery);
        const matchesTrend = mode !== "trending" || item.trending;
        const matchesInterest = mode !== "forYou" || item.topics.some((topic) => interests.includes(topic as Interest));
        return matchesDate && matchesQuery && matchesTrend && matchesInterest;
      })
      .sort((a, b) => sort === "latest" ? toTimestamp(b.date) - toTimestamp(a.date) : toTimestamp(a.date) - toTimestamp(b.date));
  }, [dateRange, interests, items, mode, query, sort]);

  const toggleInterest = (interest: Interest) => {
    setInterests((current) => current.includes(interest) ? current.filter((item) => item !== interest) : [...current, interest]);
  };

  return (
    <section aria-labelledby="local-seo-news-feed" className="mb-10 scroll-mt-24">
      <div className="mb-5">
        <p className="mb-2 text-xs font-bold uppercase tracking-[0.16em] text-emerald-800">Updated as Google changes local search</p>
        <h2 id="local-seo-news-feed" className="text-2xl font-bold leading-tight text-slate-950 sm:text-3xl">Latest local SEO news and updates</h2>
        <p className="mt-2 max-w-3xl text-sm leading-6 text-slate-600">Every Google Business Profile, Maps and local pack change we have checked, newest first, with its date and source. Search, filter by date, or save topics in this browser for a personal feed.</p>
      </div>

      <label htmlFor="local-seo-news-search" className="sr-only">Search local SEO news</label>
      <div className="relative mb-4">
        <Search className="pointer-events-none absolute left-4 top-1/2 h-5 w-5 -translate-y-1/2 text-slate-400" aria-hidden="true" />
        <input id="local-seo-news-search" type="search" value={query} onChange={(event) => setQuery(event.target.value)} placeholder="Search Google Business Profile, Maps, reviews, or a topic…" className="w-full rounded-xl border border-slate-300 bg-white py-3 pl-12 pr-4 text-sm text-slate-900 shadow-sm outline-none transition focus:border-emerald-700 focus:ring-4 focus:ring-emerald-700/10" />
      </div>

      <div className="mb-4 flex flex-wrap items-center gap-2" role="group" aria-label="News feed filters">
        <button type="button" aria-pressed={mode === "all" && sort === "latest"} onClick={() => { setMode("all"); setSort("latest"); }} className={`rounded-full border px-3.5 py-2 text-sm font-semibold transition ${mode === "all" && sort === "latest" ? "border-slate-950 bg-slate-950 text-white" : "border-slate-300 bg-white text-slate-700 hover:border-slate-500"}`}><SlidersHorizontal className="mr-1.5 inline h-4 w-4" />Latest</button>
        <button type="button" aria-pressed={mode === "trending"} onClick={() => setMode(mode === "trending" ? "all" : "trending")} className={`rounded-full border px-3.5 py-2 text-sm font-semibold transition ${mode === "trending" ? "border-emerald-800 bg-emerald-800 text-white" : "border-slate-300 bg-white text-slate-700 hover:border-slate-500"}`}><TrendingUp className="mr-1.5 inline h-4 w-4" />Trending picks</button>
        <button type="button" aria-pressed={mode === "forYou"} onClick={() => setMode(mode === "forYou" ? "all" : "forYou")} className={`rounded-full border px-3.5 py-2 text-sm font-semibold transition ${mode === "forYou" ? "border-emerald-800 bg-emerald-800 text-white" : "border-slate-300 bg-white text-slate-700 hover:border-slate-500"}`}>For you</button>
        <label className="ml-auto inline-flex items-center gap-2 text-sm font-medium text-slate-600">
          <CalendarDays className="h-4 w-4" aria-hidden="true" />
          <span className="sr-only">Filter by date</span>
          <select value={dateRange} onChange={(event) => setDateRange(event.target.value)} className="rounded-lg border border-slate-300 bg-white px-3 py-2 text-sm text-slate-800 outline-none focus:border-emerald-700 focus:ring-2 focus:ring-emerald-700/10">
            <option value="all">Any date</option><option value="7d">Past 7 days</option><option value="30d">Past 30 days</option><option value="year">This year</option>
          </select>
        </label>
      </div>

      <div className="mb-5 rounded-xl border border-slate-200 bg-slate-50 p-4">
        <div className="mb-2 flex flex-wrap items-baseline justify-between gap-2">
          <p className="text-sm font-semibold text-slate-900">Choose topics for your feed</p>
          <p className="text-xs text-slate-500">Saved only in this browser</p>
        </div>
        <div className="flex flex-wrap gap-2">
          {INTERESTS.map((interest) => (
            <button key={interest} type="button" aria-pressed={interests.includes(interest)} onClick={() => toggleInterest(interest)} className={`rounded-full border px-3 py-1.5 text-xs font-semibold transition ${interests.includes(interest) ? "border-emerald-800 bg-emerald-50 text-emerald-900" : "border-slate-300 bg-white text-slate-600 hover:border-slate-500"}`}>{interest}</button>
          ))}
          {interests.length > 0 && <button type="button" onClick={() => setInterests([])} className="px-2 py-1.5 text-xs font-semibold text-slate-600 underline underline-offset-2">Clear interests</button>}
        </div>
        {mode === "trending" && <p className="mt-3 text-xs leading-5 text-slate-500">Trending picks are selected by the SearchPrex editorial team; they are not a live popularity or click-count ranking.</p>}
      </div>

      <div className="mb-3 flex items-center justify-between gap-3">
        <p className="text-sm font-semibold text-slate-600" aria-live="polite">{filteredItems.length} {filteredItems.length === 1 ? "result" : "results"}</p>
        {mode === "forYou" && interests.length === 0 && <p className="text-xs text-slate-500">Choose at least one topic above to personalize this feed.</p>}
      </div>

      {filteredItems.length ? (
        <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
          {filteredItems.map((item) => {
            const cardContent = (
              <>
                <div className="relative aspect-[16/9] overflow-hidden bg-slate-100">
                  <Image src={item.image} alt={item.imageAlt} fill sizes="(max-width: 767px) 100vw, (max-width: 1279px) 50vw, 33vw" className="object-cover transition duration-500 group-hover:scale-[1.03]" />
                  <span className="absolute left-3 top-3 rounded-full border border-white/70 bg-white/95 px-2.5 py-1 text-[10px] font-bold uppercase tracking-wide text-slate-700 shadow-sm">{item.kind}</span>
                </div>
                <div className="flex flex-1 flex-col p-5">
                  <div className="mb-3 flex flex-wrap items-center gap-x-3 gap-y-1 text-xs font-medium text-slate-500"><time dateTime={new Date(toTimestamp(item.date)).toISOString().slice(0, 10)}>{formatDate(item.date)}</time>{item.trending && <span className="rounded-full bg-amber-50 px-2 py-0.5 font-semibold text-amber-900">Trending pick</span>}</div>
                  <h3 className="text-lg font-bold leading-snug text-slate-950">{item.title}</h3>
                  <p className="mt-3 flex-1 text-sm leading-6 text-slate-600">{item.summary}</p>
                  <div className="mt-4 flex flex-wrap gap-1.5">{item.topics.slice(0, 3).map((topic) => <span key={topic} className="rounded-full bg-slate-100 px-2.5 py-1 text-[11px] font-medium text-slate-600">{topic}</span>)}</div>
                  <span className="mt-4 inline-flex items-center gap-1.5 text-sm font-semibold text-emerald-900">{item.external ? `Source: ${item.source}` : "Read the full update"}<ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" aria-hidden="true" /></span>
                </div>
              </>
            );
            return item.external ? (
              <a key={item.id} href={item.href} target="_blank" rel="noopener noreferrer" className="group flex h-full flex-col overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm transition hover:-translate-y-0.5 hover:border-emerald-800/40 hover:shadow-lg focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-emerald-700">{cardContent}</a>
            ) : (
              <Link key={item.id} href={item.href} className="group flex h-full flex-col overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm transition hover:-translate-y-0.5 hover:border-emerald-800/40 hover:shadow-lg focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-emerald-700">{cardContent}</Link>
            );
          })}
        </div>
      ) : (
        <div className="rounded-2xl border border-dashed border-slate-300 bg-slate-50 px-5 py-12 text-center">
          <p className="font-semibold text-slate-900">No updates match these filters</p>
          <p className="mt-1 text-sm text-slate-600">Try another date range or topic, or clear your search.</p>
          <button type="button" onClick={() => { setQuery(""); setDateRange("all"); setMode("all"); }} className="mt-4 rounded-lg bg-slate-950 px-4 py-2 text-sm font-semibold text-white">Clear filters</button>
        </div>
      )}
    </section>
  );
}
