import React from "react";
import Link from "next/link";
import { Plus, Edit2, CheckCircle2 } from "lucide-react";

import { getPages } from "../actions";
import PagesFilter from "@/components/admin/pages-filter";
import DeletePageButton from "@/components/admin/delete-page-button";
import { seoIssues } from "@/lib/validations/page-seo";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";

export const metadata = {
  title: "Pages CMS | SearchPrex Admin",
};

/**
 * `getPages()` returns `{ success: true, data }` / `{ success: false, error }`
 * without an explicit union annotation, so TypeScript widens `success` to
 * `boolean` and refuses to narrow `data`. Describing the row shape here keeps
 * the table typed without touching the action's signature.
 */
type PageRow = {
  id: string;
  slug: string;
  title: string | null;
  metaDescription: string | null;
  ogImage: string | null;
  robots: string | null;
  status: string | null;
  updatedAt: Date | string;
};

const STATUS_VARIANT: Record<string, "default" | "secondary" | "outline"> = {
  published: "default",
  draft: "secondary",
  archived: "outline",
};

/** Missing things are errors; over-long things are only warnings. */
function issueVariant(issue: string): "destructive" | "secondary" {
  return issue.startsWith("No ") || issue.startsWith("Set to") ? "destructive" : "secondary";
}

function formatDate(value: Date | string) {
  // Pinned locale: the server and the browser can otherwise disagree and
  // trigger a hydration mismatch.
  return new Date(value).toLocaleDateString("en-US", {
    month: "short",
    day: "numeric",
    year: "numeric",
  });
}

// Next 16 passes searchParams as a Promise.
export default async function PagesAdmin({
  searchParams,
}: {
  searchParams: Promise<{ q?: string; status?: string }>;
}) {
  const { q = "", status = "" } = await searchParams;

  const response = await getPages();
  const pages = (response.success ? (response.data as PageRow[]) : []) ?? [];

  const needle = q.trim().toLowerCase();
  const filtered = pages.filter((page) => {
    if (needle) {
      const haystack = `${page.slug} ${page.title ?? ""}`.toLowerCase();
      if (!haystack.includes(needle)) return false;
    }
    // "issues" is a pseudo-status derived from the SEO audit, not a column value.
    if (status === "issues") return seoIssues(page).length > 0;
    if (status) return page.status === status;
    return true;
  });

  const isFiltered = Boolean(needle || status);

  return (
    <div className="flex-1 space-y-4">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-3xl font-bold tracking-tight">Pages CMS</h2>
          <p className="text-muted-foreground">Manage your website pages, SEO tags, and content.</p>
        </div>
        <Button asChild>
          <Link href="/admin/pages/new">
            <Plus className="w-4 h-4 mr-2" />
            Create Page
          </Link>
        </Button>
      </div>

      <PagesFilter query={q} status={status} total={pages.length} shown={filtered.length} />

      <div className="border rounded-md bg-white dark:bg-slate-900 shadow-sm">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Slug (URL)</TableHead>
              <TableHead>Meta Title</TableHead>
              <TableHead>Status</TableHead>
              <TableHead>SEO health</TableHead>
              <TableHead>Last Updated</TableHead>
              <TableHead className="text-right">Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {filtered.length > 0 ? (
              filtered.map((page) => {
                const issues = seoIssues(page);

                return (
                  <TableRow key={page.id}>
                    <TableCell className="font-mono font-medium">{page.slug}</TableCell>
                    <TableCell className="max-w-xs truncate whitespace-normal">
                      {page.title || <span className="text-muted-foreground">Untitled</span>}
                    </TableCell>
                    <TableCell>
                      <Badge variant={STATUS_VARIANT[page.status ?? "published"] ?? "outline"}>
                        {page.status ?? "published"}
                      </Badge>
                    </TableCell>
                    <TableCell className="whitespace-normal">
                      {issues.length === 0 ? (
                        <span className="inline-flex items-center gap-1 text-sm text-emerald-600 dark:text-emerald-400">
                          <CheckCircle2 className="h-4 w-4" />
                          Good
                        </span>
                      ) : (
                        <div className="flex flex-wrap gap-1">
                          {issues.map((issue) => (
                            <Badge key={issue} variant={issueVariant(issue)}>
                              {issue}
                            </Badge>
                          ))}
                        </div>
                      )}
                    </TableCell>
                    <TableCell className="text-muted-foreground">
                      {formatDate(page.updatedAt)}
                    </TableCell>
                    <TableCell className="text-right space-x-2">
                      <Button variant="outline" size="sm" asChild>
                        <Link href={`/admin/pages/${page.id}`}>
                          <Edit2 className="w-4 h-4 mr-1" />
                          Edit
                        </Link>
                      </Button>
                      <DeletePageButton id={page.id} slug={page.slug} />
                    </TableCell>
                  </TableRow>
                );
              })
            ) : (
              <TableRow>
                <TableCell colSpan={6} className="text-center h-24 text-muted-foreground">
                  {isFiltered ? (
                    <span className="inline-flex flex-wrap items-center justify-center gap-2">
                      No pages match this filter.
                      <Link href="/admin/pages" className="underline underline-offset-4">
                        Clear filters
                      </Link>
                    </span>
                  ) : (
                    "No pages found. Create one to get started."
                  )}
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>
    </div>
  );
}
