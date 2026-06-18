import GenerationEngine from "@/app/components/generator/generation-engine";
 
export const metadata = {
  title: "AI Content Suite — Searchprex",
  description:
    "Generate original, E-E-A-T-driven, HCU-compliant SEO content at scale — meta, headings, full HTML body, FAQs, links, and JSON-LD schema.",
};
 
export default function ContentGeneratorPage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 pt-20">
      <div className="mx-auto max-w-5xl">
        <GenerationEngine />
      </div>
    </div>
  );
}
 