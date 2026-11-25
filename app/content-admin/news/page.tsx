import { getMarketingNews, getMarketingNewsArticles } from "../actions";
import { NewsManager } from "./news-manager";
import { NewsArticlesManager } from "./news-articles-manager";

export const dynamic = "force-dynamic";

export const metadata = {
  title: "Manage SEO News | SearchPrex Admin",
};

export default async function NewsPage() {
  let news: any[] = [];
  let newsError = "";
  let newsArticles: any[] = [];
  try {
    news = await getMarketingNews();
  } catch (err) {
    console.error("Failed to load News Feed cards", err);
    newsError = err instanceof Error ? err.message : "Could not load news feed items.";
  }

  try {
    newsArticles = await getMarketingNewsArticles();
  } catch (err) {
    console.error("Failed to load SEO News articles", err);
  }

  return (
    <div className="space-y-6">
      <NewsArticlesManager initialArticles={newsArticles} />
      <NewsManager initialNews={news} initialError={newsError} />
    </div>
  );
}
