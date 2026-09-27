import type { Metadata } from "next";
import GenerationEngine from "@/app/components/generator/generation-engine";
 
import { getPageSEO } from "@/lib/admin-seo";
const baseMetadata: Metadata = {
  title: "AI Content Suite",
  description:
    "Generate original, E-E-A-T-driven, HCU-compliant SEO content at scale — meta, headings, full HTML body, FAQs, links, and JSON-LD schema.",
};

// Metadata comes from the CMS row for this route; the object above is the
// fallback when that row is missing, unpublished, or the database is down.
export async function generateMetadata(): Promise<Metadata> {
  // noindex: a thin utility/tool page that should not compete in search (SEO audit,
  // Sept 2026). Applied after getPageSEO so a published CMS row cannot reset it.
  const meta = await getPageSEO("/content-generator", baseMetadata);
  return { ...meta, robots: { index: false, follow: true } };
}
 
export default function ContentGeneratorPage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 pt-20">
      <div className="mx-auto max-w-5xl">
        <GenerationEngine />
      </div>
    </div>
  );
}
 