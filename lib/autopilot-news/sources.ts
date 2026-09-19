// lib/autopilot-news/sources.ts
import * as cheerio from "cheerio";

export interface NewsSourceConfig {
  id: string;
  name: string;
  url: string;
  type: "rss" | "atom" | "rdf";
  defaultCategory: string;
  enabled: boolean;
}

export interface RawNewsItem {
  guid: string;
  title: string;
  link: string;
  sourceName: string;
  sourceId: string;
  publishedAt: Date;
  summary: string;
  contentHtml?: string;
  defaultCategory: string;
}

export const SEO_NEWS_SOURCES: NewsSourceConfig[] = [
  {
    id: "seroundtable",
    name: "Search Engine Roundtable",
    url: "https://www.seroundtable.com/index.rdf",
    type: "rdf",
    defaultCategory: "SEO News — Technical",
    enabled: true,
  },
  {
    id: "searchenginejournal",
    name: "Search Engine Journal",
    url: "https://www.searchenginejournal.com/feed/",
    type: "rss",
    defaultCategory: "SEO News — AI SEO",
    enabled: true,
  },
];

const FETCH_HEADERS = {
  "User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36",
  Accept: "application/rss+xml, application/rdf+xml, application/atom+xml, application/xml, text/xml, */*",
};

export async function fetchFeedItems(source: NewsSourceConfig): Promise<RawNewsItem[]> {
  try {
    const controller = new AbortController();
    const timeout = setTimeout(() => controller.abort(), 8000); // 8s fast timeout

    const res = await fetch(source.url, {
      headers: FETCH_HEADERS,
      signal: controller.signal,
      cache: "no-store",
    });
    clearTimeout(timeout);

    if (!res.ok) {
      console.warn(`[news-sources] Failed to fetch ${source.name} (${res.status} ${res.statusText})`);
      return [];
    }

    const xml = await res.text();
    const $ = cheerio.load(xml, { xmlMode: true });
    const items: RawNewsItem[] = [];

    // RSS 2.0 / RDF / Atom parsing
    const entries = $("item, entry");
    entries.each((_, el) => {
      const $el = $(el);
      const title = $el.find("title").first().text().trim();
      let link = $el.find("link").attr("href") || $el.find("link").text().trim() || $el.find("guid").text().trim();
      const guid = $el.find("guid, id").first().text().trim() || link;
      const pubDate = $el.find("pubDate, dc\\:date, published, updated").first().text().trim();
      const description = $el.find("description, summary").first().text().trim();
      const contentEncoded = $el.find("content\\:encoded, content").first().text().trim();

      if (title && link) {
        items.push({
          guid: guid || link,
          title: cleanText(title),
          link: link.trim(),
          sourceName: source.name,
          sourceId: source.id,
          publishedAt: parseDate(pubDate),
          summary: cleanText(description || contentEncoded).slice(0, 600),
          contentHtml: contentEncoded || description,
          defaultCategory: source.defaultCategory,
        });
      }
    });

    return items;
  } catch (err: any) {
    console.error(`[news-sources] Error parsing ${source.name}:`, err.message);
    return [];
  }
}

function cleanText(text: string): string {
  if (!text) return "";
  return text
    .replace(/<!\[CDATA\[([\s\S]*?)\]\]>/g, "$1")
    .replace(/<[^>]+>/g, " ")
    .replace(/&amp;/g, "&")
    .replace(/&lt;/g, "<")
    .replace(/&gt;/g, ">")
    .replace(/&quot;/g, '"')
    .replace(/&#039;/g, "'")
    .replace(/&apos;/g, "'")
    .replace(/\s+/g, " ")
    .trim();
}

function parseDate(dateStr: string): Date {
  if (!dateStr) return new Date();
  const d = new Date(dateStr);
  return isNaN(d.getTime()) ? new Date() : d;
}
