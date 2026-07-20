import AiSearch from "@/app/components/ai-search/ai-search";
 
export const metadata = {
  title: "SearchPrex AI — SEO Answer Engine",
  description:
    "Instant, AI-grounded SEO answers for law firms, ecommerce stores, and local businesses. Ask anything and get a tailored free 30-day SEO roadmap.",
};
 
export default function AiSearchPage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 pt-20">
      <div className="mx-auto max-w-4xl">
        <AiSearch />
      </div>
    </div>
  );
}
 