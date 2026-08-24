import { getMarketingNews } from "../actions";
import { NewsManager } from "./news-manager";

export const metadata = {
  title: "Manage SEO News | SearchPrex Admin",
};

export default async function NewsPage() {
  const news = await getMarketingNews();
  
  return <NewsManager initialNews={news} />;
}
