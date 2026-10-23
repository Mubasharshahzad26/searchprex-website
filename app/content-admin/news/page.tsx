import { getMarketingNews, getMarketingNewsArticles } from "../actions";
import { NewsManager } from "./news-manager";
import { NewsArticlesManager } from "./news-articles-manager";

export const dynamic = "force-dynamic";

export const metadata = {
  title: "Manage SEO News | SearchPrex Admin",
};

export default async function NewsPage() {
  let news = [];
  let newsArticles = [];
  try {
    news = await getMarketingNews();
  } catch (err) {
    // Graceful fallback if session / auth not ready at build or init
  }
  
  try {
    newsArticles = await getMarketingNewsArticles();
  } catch (err) {
    console.error("Failed to load SEO News articles", err);
  }

  return (
    <div className="space-y-6">
      <NewsArticlesManager initialArticles={newsArticles} />
      <NewsManager initialNews={news} />
    </div>
  );
}
