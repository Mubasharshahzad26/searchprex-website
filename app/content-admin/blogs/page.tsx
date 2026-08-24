import { getMarketingBlogs } from "../actions";
import { BlogManager } from "./blog-manager";

export const metadata = {
  title: "Manage Blogs | SearchPrex Admin",
};

export default async function BlogsPage() {
  const blogs = await getMarketingBlogs();
  
  return <BlogManager initialBlogs={blogs} />;
}

