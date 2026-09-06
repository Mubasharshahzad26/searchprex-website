import { getMarketingNews } from "../actions";
import { NewsManager } from "./news-manager";

export const dynamic = "force-dynamic";

export const metadata = {
  title: "Manage SEO News | SearchPrex Admin",
};

export default async function NewsPage() {
  let news = [];
  try {
    news = await getMarketingNews();
  } catch (err) {
    // Graceful fallback if session / auth not ready at build or init
  }
  
  return <NewsManager initialNews={news} />;
}
