"use client";

import React from "react";
import { useRouter } from "next/navigation";
import { Search, X } from "lucide-react";

import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

const STATUS_FILTERS = [
  { value: "", label: "All" },
  { value: "published", label: "Published" },
  { value: "draft", label: "Draft" },
  { value: "archived", label: "Archived" },
  { value: "issues", label: "Needs attention" },
] as const;

/**
 * Filter controls for the pages list.
 *
 * Filter state lives in the URL, and the *server* component reads it — this
 * component only writes it. That keeps the table itself server-rendered (no
 * shipping every row to the browser) and makes a filtered view linkable, so the
 * dashboard's SEO health panel can deep-link to `?status=issues`.
 *
 * Current values arrive as props rather than via `useSearchParams()` so this
 * component never forces a Suspense boundary on the route. Typing is debounced
 * so a search doesn't fire one navigation per keystroke.
 */
export default function PagesFilter({
  query,
  status,
  total,
  shown,
}: {
  query: string;
  status: string;
  total: number;
  shown: number;
}) {
  const router = useRouter();
  const [draft, setDraft] = React.useState(query);

  // Resync when the URL changes from outside this component (back button, deep link).
  React.useEffect(() => {
    setDraft(query);
  }, [query]);

  const push = React.useCallback(
    (next: { q?: string; status?: string }) => {
      const params = new URLSearchParams();
      const q = next.q ?? query;
      const nextStatus = next.status ?? status;
      if (q) params.set("q", q);
      if (nextStatus) params.set("status", nextStatus);

      const qs = params.toString();
      router.replace(qs ? `/admin/pages?${qs}` : "/admin/pages", { scroll: false });
    },
    [router, query, status]
  );

  React.useEffect(() => {
    if (draft === query) return;
    const timer = setTimeout(() => push({ q: draft }), 250);
    return () => clearTimeout(timer);
  }, [draft, query, push]);

  return (
    <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
      <div className="relative w-full sm:max-w-sm">
        <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
        <Input
          value={draft}
          onChange={(event) => setDraft(event.target.value)}
          placeholder="Search by slug or title…"
          aria-label="Search pages"
          className="pl-9 pr-9"
        />
        {draft ? (
          <Button
            type="button"
            variant="ghost"
            size="icon"
            aria-label="Clear search"
            onClick={() => setDraft("")}
            className="absolute right-1 top-1/2 h-7 w-7 -translate-y-1/2"
          >
            <X className="h-4 w-4" />
          </Button>
        ) : null}
      </div>

      <div className="flex flex-wrap items-center gap-3">
        <div className="flex flex-wrap gap-1">
          {STATUS_FILTERS.map((filter) => (
            <Button
              key={filter.value || "all"}
              type="button"
              size="sm"
              variant={status === filter.value ? "default" : "outline"}
              onClick={() => push({ status: filter.value })}
            >
              {filter.label}
            </Button>
          ))}
        </div>
        <p className="whitespace-nowrap text-sm text-muted-foreground">
          {shown === total ? `${total} pages` : `${shown} of ${total}`}
        </p>
      </div>
    </div>
  );
}
