import type { Metadata } from "next";
import { NEWS_CATEGORIES } from "@/lib/news-categories";
import NewsCategoryFeed from "@/components/news/NewsCategoryFeed";

export const revalidate = 3600;

const config = NEWS_CATEGORIES["tools"];
const SITE = "https://www.searchprex.com";
const PAGE_URL = `${SITE}/resources/news/tools`;

export const metadata: Metadata = {
  title: config.title,
  description: config.desc,
  alternates: {
    canonical: PAGE_URL,
    languages: {
      "en-US": PAGE_URL,
      "x-default": PAGE_URL,
    },
  },
  openGraph: {
    title: config.title,
    description: config.desc,
    url: PAGE_URL,
    siteName: "SearchPrex",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: config.title,
    description: config.desc,
  },
};

export default function ToolsNewsPage() {
  return <NewsCategoryFeed categoryConfig={config} />;
}
