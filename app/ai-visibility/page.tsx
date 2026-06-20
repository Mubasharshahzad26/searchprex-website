import AiVisibility from "@/components/ai-visibility/ai-visibility";
 
export const metadata = {
  title: "AI Visibility Checker for Law Firms — SearchPrex",
  description:
    "See if your law firm shows up when potential clients ask AI (ChatGPT, Perplexity, Google AI Overviews) for the best lawyers in your city. Free instant check.",
};
 
export default function AiVisibilityPage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 pt-20">
      <div className="mx-auto max-w-4xl">
        <AiVisibility />
      </div>
    </div>
  );
}
 