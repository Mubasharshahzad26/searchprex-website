import type { Metadata } from "next";
import AiVisibility from "@/components/ai-visibility/ai-visibility";
 
import { getPageSEO } from "@/lib/admin-seo";
const baseMetadata: Metadata = {
  title: "AI Visibility Checker for Law Firms",
  description:
    "See if your law firm shows up when potential clients ask AI (ChatGPT, Perplexity, Google AI Overviews) for the best lawyers in your city. Free instant check.",
};

// Metadata comes from the CMS row for this route; the object above is the
// fallback when that row is missing, unpublished, or the database is down.
export async function generateMetadata(): Promise<Metadata> {
  return getPageSEO("/ai-visibility", baseMetadata);
}
 
export default function AiVisibilityPage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 pt-20">
      <div className="mx-auto max-w-4xl">
        <AiVisibility />
      </div>
    </div>
  );
}
 