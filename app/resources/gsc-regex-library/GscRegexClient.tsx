"use client";

import { useState, useMemo } from "react";
import { Check, Copy, Search, Sparkles, Terminal, Filter, SlidersHorizontal } from "lucide-react";
import { color, heading, radius, text } from "@/lib/design-tokens";
import {
  GSC_REGEX_PATTERNS,
  REGEX_CATEGORIES,
  type RegexCategory,
} from "@/lib/gsc-regex-data";

function escapeRe2(input: string): string {
  return input.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
}

export default function GscRegexClient() {
  const [selectedCategory, setSelectedCategory] = useState<RegexCategory | "all">("all");
  const [targetFilter, setTargetFilter] = useState<"All" | "Query" | "Page">("All");
  const [searchQuery, setSearchQuery] = useState("");
  const [copiedId, setCopiedId] = useState<string | null>(null);

  // Custom Brand & Folder Regex Builder state
  const [builderMode, setBuilderMode] = useState<"brand" | "folder">("brand");
  const [brandInput, setBrandInput] = useState("searchprex, search prex, nicheseopro");
  const [folderInput, setFolderInput] = useState("services, case-studies, locations");

  const customRegex = useMemo(() => {
    if (builderMode === "brand") {
      const terms = brandInput
        .split(",")
        .map((t) => escapeRe2(t.trim().toLowerCase()))
        .filter(Boolean);
      if (terms.length === 0) return "(?i)\\b(yourbrand)\\b";
      return `(?i)\\b(${terms.join("|")})\\b`;
    } else {
      const folders = folderInput
        .split(",")
        .map((f) => escapeRe2(f.trim().replace(/^\/+|\/+$/g, "")))
        .filter(Boolean);
      if (folders.length === 0) return "/(blog|services)/";
      return `/(${folders.join("|")})/`;
    }
  }, [builderMode, brandInput, folderInput]);

  const filteredPatterns = useMemo(() => {
    return GSC_REGEX_PATTERNS.filter((item) => {
      if (selectedCategory !== "all" && item.category !== selectedCategory) return false;
      if (targetFilter !== "All" && item.filterTarget !== targetFilter) return false;
      if (searchQuery.trim()) {
        const q = searchQuery.toLowerCase();
        return (
          item.title.toLowerCase().includes(q) ||
          item.whatItFinds.toLowerCase().includes(q) ||
          item.actionToTake.toLowerCase().includes(q) ||
          item.regex.toLowerCase().includes(q) ||
          item.exampleMatch.toLowerCase().includes(q)
        );
      }
      return true;
    });
  }, [selectedCategory, targetFilter, searchQuery]);

  const copyToClipboard = async (id: string, value: string) => {
    try {
      await navigator.clipboard.writeText(value);
      setCopiedId(id);
      setTimeout(() => setCopiedId((prev) => (prev === id ? null : prev)), 2000);
    } catch {
      // Fallback for older browsers
    }
  };

  return (
    <div className="space-y-10">
      {/* ── 1. Interactive Custom Brand / Folder Regex Builder ── */}
      <div
        className={`${radius.card} border p-6 sm:p-8 shadow-sm`}
        style={{ borderColor: color.border, background: color.white }}
      >
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 pb-6 border-b" style={{ borderColor: color.border }}>
          <div>
            <span
              className={`${heading.eyebrow} inline-flex items-center gap-1.5 rounded-full px-3 py-1 mb-2`}
              style={{ background: color.primarySoft, color: color.primary }}
            >
              <Sparkles className="h-3.5 w-3.5" aria-hidden /> Instant Custom Builder
            </span>
            <h2 className={heading.h3} style={{ color: color.ink }}>
              Build Your Brand or URL Folder Regex
            </h2>
            <p className={`${text.small} mt-1`} style={{ color: color.muted }}>
              Type your brand variations or URL folders separated by commas to generate a valid RE2 expression for Search Console.
            </p>
          </div>

          <div className="inline-flex rounded-xl p-1 border self-start" style={{ borderColor: color.border, background: color.surface }}>
            <button
              type="button"
              onClick={() => setBuilderMode("brand")}
              className={`px-3.5 py-2 text-xs font-semibold rounded-lg transition-all ${
                builderMode === "brand" ? "bg-white shadow-sm" : ""
              }`}
              style={{ color: builderMode === "brand" ? color.primary : color.muted }}
            >
              Brand vs Non-Brand
            </button>
            <button
              type="button"
              onClick={() => setBuilderMode("folder")}
              className={`px-3.5 py-2 text-xs font-semibold rounded-lg transition-all ${
                builderMode === "folder" ? "bg-white shadow-sm" : ""
              }`}
              style={{ color: builderMode === "folder" ? color.primary : color.muted }}
            >
              URL Folder Filter
            </button>
          </div>
        </div>

        <div className="grid gap-6 pt-6 lg:grid-cols-2 lg:items-center">
          <div>
            <label
              htmlFor="custom-regex-input"
              className="block text-xs font-semibold uppercase tracking-wider mb-2"
              style={{ color: color.ink }}
            >
              {builderMode === "brand"
                ? "Your Brand Name, Misspellings & Founder Names (comma-separated)"
                : "Your URL Folders / Slugs (comma-separated)"}
            </label>
            <input
              id="custom-regex-input"
              type="text"
              value={builderMode === "brand" ? brandInput : folderInput}
              onChange={(e) =>
                builderMode === "brand"
                  ? setBrandInput(e.target.value)
                  : setFolderInput(e.target.value)
              }
              placeholder={
                builderMode === "brand"
                  ? "e.g. smith law, smith & associates, john smith"
                  : "e.g. product, product-category, brand"
              }
              className={`w-full ${radius.control} border px-4 py-3 text-sm focus:outline-none focus:ring-2`}
              style={{ borderColor: color.border, color: color.ink }}
            />
            <p className={`${text.caption} mt-2`} style={{ color: color.subtle }}>
              {builderMode === "brand" ? (
                <>
                  In GSC: <strong>Query → Custom (regex)</strong>. Choose{" "}
                  <strong>Doesn&apos;t match regex</strong> to see pure Non-Branded SEO traffic, or{" "}
                  <strong>Matches regex</strong> for Branded demand.
                </>
              ) : (
                <>
                  In GSC: <strong>Page → Custom (regex) → Matches regex</strong> to isolate traffic across these specific site sections.
                </>
              )}
            </p>
          </div>

          <div
            className={`${radius.control} p-4 sm:p-5 border flex flex-col justify-between gap-3`}
            style={{ background: color.ink, borderColor: color.ink }}
          >
            <div className="flex items-center justify-between gap-2">
              <span className="text-xs font-mono uppercase tracking-wider text-white/60 flex items-center gap-1.5">
                <Terminal className="h-3.5 w-3.5 text-[#3eb489]" aria-hidden />
                Generated RE2 Expression
              </span>
              <span className="text-[11px] font-medium px-2 py-0.5 rounded bg-white/10 text-white/80">
                GSC Filter: {builderMode === "brand" ? "Query" : "Page"}
              </span>
            </div>

            <code className="block font-mono text-sm sm:text-base text-[#3eb489] break-all py-1">
              {customRegex}
            </code>

            <div className="flex items-center justify-end">
              <button
                type="button"
                onClick={() => copyToClipboard("custom-builder", customRegex)}
                className={`inline-flex items-center gap-2 ${radius.control} px-4 py-2 text-xs font-semibold text-white transition-all`}
                style={{
                  background: copiedId === "custom-builder" ? color.successButton : color.primary,
                }}
              >
                {copiedId === "custom-builder" ? (
                  <>
                    <Check className="h-3.5 w-3.5" aria-hidden /> Copied to Clipboard
                  </>
                ) : (
                  <>
                    <Copy className="h-3.5 w-3.5" aria-hidden /> Copy Custom Regex
                  </>
                )}
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* ── 2. Filter Bar (Category Pills + Search + Target Toggle) ── */}
      <div className="space-y-4">
        <div className="flex flex-col md:flex-row gap-3 md:items-center md:justify-between">
          {/* Search Input */}
          <div className="relative flex-1 max-w-md">
            <Search
              className="h-4 w-4 absolute left-3.5 top-1/2 -translate-y-1/2 pointer-events-none"
              style={{ color: color.subtle }}
              aria-hidden
            />
            <input
              type="search"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search patterns (e.g. AI Overviews, near me, parameters, SKU)…"
              aria-label="Search GSC regex patterns"
              className={`w-full ${radius.control} border pl-10 pr-4 py-2.5 text-sm bg-white focus:outline-none focus:ring-2`}
              style={{ borderColor: color.border, color: color.ink }}
            />
          </div>

          {/* Query vs Page Filter */}
          <div className="flex items-center gap-2">
            <span className="text-xs font-semibold flex items-center gap-1" style={{ color: color.muted }}>
              <SlidersHorizontal className="h-3.5 w-3.5" aria-hidden /> GSC Dimension:
            </span>
            {(["All", "Query", "Page"] as const).map((t) => (
              <button
                key={t}
                type="button"
                onClick={() => setTargetFilter(t)}
                className={`px-3 py-1.5 text-xs font-semibold rounded-lg border transition-all`}
                style={{
                  borderColor: targetFilter === t ? color.primary : color.border,
                  background: targetFilter === t ? color.primarySoft : color.white,
                  color: targetFilter === t ? color.primary : color.muted,
                }}
              >
                {t}
              </button>
            ))}
          </div>
        </div>

        {/* Category Pills */}
        <div className="flex flex-wrap gap-2">
          {REGEX_CATEGORIES.map((cat) => {
            const active = selectedCategory === cat.id;
            const count =
              cat.id === "all"
                ? GSC_REGEX_PATTERNS.length
                : GSC_REGEX_PATTERNS.filter((p) => p.category === cat.id).length;

            return (
              <button
                key={cat.id}
                type="button"
                onClick={() => setSelectedCategory(cat.id)}
                className={`inline-flex items-center gap-2 px-3.5 py-2 text-xs font-semibold ${radius.control} border transition-all`}
                style={{
                  borderColor: active ? color.primary : color.border,
                  background: active ? color.primary : color.white,
                  color: active ? color.white : color.ink,
                }}
              >
                <span>{cat.label}</span>
                <span
                  className="px-1.5 py-0.5 rounded text-[10px]"
                  style={{
                    background: active ? "rgba(255,255,255,0.2)" : color.surface,
                    color: active ? color.white : color.muted,
                  }}
                >
                  {count}
                </span>
              </button>
            );
          })}
        </div>
      </div>

      {/* ── 3. Pattern Cards Grid ── */}
      {filteredPatterns.length === 0 ? (
        <div
          className={`${radius.card} border p-10 text-center`}
          style={{ borderColor: color.border, background: color.white }}
        >
          <p className={heading.h4} style={{ color: color.ink }}>
            No regex patterns matched &ldquo;{searchQuery}&rdquo;
          </p>
          <p className={`${text.small} mt-1`} style={{ color: color.muted }}>
            Try clearing your search or switching the category filter above.
          </p>
        </div>
      ) : (
        <div className="grid gap-5 md:grid-cols-2">
          {filteredPatterns.map((item) => {
            const isCopied = copiedId === item.id;
            const isNegative = item.matchMode === "Doesn't match regex";

            return (
              <article
                key={item.id}
                className={`${radius.card} border bg-white p-6 flex flex-col justify-between transition-all hover:shadow-md`}
                style={{ borderColor: color.border }}
              >
                <div>
                  {/* Badges row */}
                  <div className="flex flex-wrap items-center justify-between gap-2 mb-3">
                    <div className="flex flex-wrap items-center gap-2">
                      <span
                        className="inline-flex items-center gap-1 rounded-full px-2.5 py-0.5 text-[11px] font-semibold"
                        style={{
                          background: item.filterTarget === "Query" ? color.primarySoft : "#E6F1FB",
                          color: item.filterTarget === "Query" ? color.primary : "#185FA5",
                        }}
                      >
                        <Filter className="h-3 w-3" aria-hidden />
                        GSC {item.filterTarget}
                      </span>
                      <span
                        className="inline-flex items-center rounded-full px-2.5 py-0.5 text-[11px] font-semibold"
                        style={{
                          background: isNegative ? "#FEE2E2" : "#eafaf3",
                          color: isNegative ? "#991B1B" : color.successDark,
                        }}
                      >
                        {item.matchMode}
                      </span>
                    </div>
                  </div>

                  {/* Title */}
                  <h3 className={`${heading.h4} mb-2`} style={{ color: color.ink }}>
                    {item.title}
                  </h3>

                  {/* Regex Code Box */}
                  <div
                    className={`${radius.control} p-3.5 my-3 flex items-center justify-between gap-3 border`}
                    style={{ background: color.ink, borderColor: color.ink }}
                  >
                    <code className="font-mono text-xs sm:text-sm text-[#3eb489] break-all select-all">
                      {item.regex}
                    </code>
                    <button
                      type="button"
                      onClick={() => copyToClipboard(item.id, item.regex)}
                      className="flex-shrink-0 inline-flex items-center gap-1.5 rounded-lg px-3 py-1.5 text-xs font-semibold text-white transition-all"
                      style={{
                        background: isCopied ? color.successButton : color.primary,
                      }}
                      aria-label={`Copy regex for ${item.title}`}
                    >
                      {isCopied ? (
                        <>
                          <Check className="h-3.5 w-3.5" aria-hidden /> Copied
                        </>
                      ) : (
                        <>
                          <Copy className="h-3.5 w-3.5" aria-hidden /> Copy
                        </>
                      )}
                    </button>
                  </div>

                  {/* What it finds */}
                  <p className={`${text.small} mb-2.5`} style={{ color: color.muted }}>
                    <strong style={{ color: color.ink }}>What it finds: </strong>
                    {item.whatItFinds}
                  </p>

                  {/* Action to take */}
                  <p className={`${text.small} mb-3`} style={{ color: color.muted }}>
                    <strong style={{ color: color.ink }}>SEO action: </strong>
                    {item.actionToTake}
                  </p>
                </div>

                {/* Example match footer */}
                <div
                  className="pt-3 mt-2 border-t flex items-center justify-between gap-2 text-xs"
                  style={{ borderColor: color.border, color: color.subtle }}
                >
                  <span className="truncate">
                    <strong style={{ color: color.ink }}>Example:</strong>{" "}
                    <code className="font-mono">{item.exampleMatch}</code>
                  </span>
                </div>
              </article>
            );
          })}
        </div>
      )}
    </div>
  );
}
