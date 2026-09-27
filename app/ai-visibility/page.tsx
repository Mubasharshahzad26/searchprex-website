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
  // noindex: a thin utility/tool page that should not compete in search (SEO audit,
  // Sept 2026). Applied after getPageSEO so a published CMS row cannot reset it.
  const meta = await getPageSEO("/ai-visibility", baseMetadata);
  return { ...meta, robots: { index: false, follow: true } };
}
 
export default function AiVisibilityPage() {
  return (
    <main id="main-content" className="min-h-screen bg-[#f8f9fc] pt-20">
      <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8">
        <AiVisibility />
      </div>
    </main>
  );
}
 