// app/ai-search/AIToolClient.tsx
// Rendered by app/ai-search/page.tsx, which owns the route's metadata.
//
// This file used to export its own `metadata` object. Next only reads that
// export from a page.tsx, so it was dead code that read as if it were the
// page's real metadata — the actual title and description come from page.tsx.

import AiSearch from "@/app/components/ai-search/ai-search";

export default function AiSearchPage() {
  return (
    <main id="main-content" className="min-h-screen bg-[#f8f9fc] pt-20">
      <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8">
        <AiSearch />
      </div>
    </main>
  );
}
 