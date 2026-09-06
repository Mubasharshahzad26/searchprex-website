import { getMarketingBlogs } from "../actions";
import { BlogManager } from "./blog-manager";

export const dynamic = "force-dynamic";

export const metadata = {
  title: "Manage Blogs | SearchPrex Admin",
};

export default async function BlogsPage() {
  let blogs = [];
  try {
    blogs = await getMarketingBlogs();
  } catch (err) {
    // Graceful fallback if session / auth not ready at build or init
  }
  
  return <BlogManager initialBlogs={blogs} />;
}

