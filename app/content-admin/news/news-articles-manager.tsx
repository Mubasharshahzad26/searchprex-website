"use client";

import { useState } from "react";
import { ContentForm } from "@/components/admin/content-form";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  createMarketingNewsArticle,
  deleteMarketingNewsArticle,
  updateMarketingNewsArticle,
} from "../actions";

export function NewsArticlesManager({ initialArticles }: { initialArticles: any[] }) {
  const [articles, setArticles] = useState(initialArticles);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [creating, setCreating] = useState(false);
  const [error, setError] = useState("");
  const activeArticle = editingId ? articles.find((article) => article.id === editingId) : null;

  async function save(data: any) {
    setError("");
    try {
      if (creating) {
        const article = await createMarketingNewsArticle(data);
        setArticles((current) => [article, ...current]);
      } else if (editingId) {
        const article = await updateMarketingNewsArticle(editingId, data);
        setArticles((current) => current.map((item) => item.id === editingId ? article : item));
      }
      setCreating(false);
      setEditingId(null);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Could not save the news article.");
    }
  }

  async function remove(id: string) {
    if (!confirm("Delete this SEO News article? This removes its live article record.")) return;
    try {
      await deleteMarketingNewsArticle(id);
      setArticles((current) => current.filter((article) => article.id !== id));
    } catch (err) {
      setError(err instanceof Error ? err.message : "Could not delete the news article.");
    }
  }

  if (creating || editingId) {
    return (
      <Card>
        <CardHeader className="flex flex-row items-center justify-between gap-3">
          <div>
            <CardTitle>{creating ? "New SEO News Article" : "Edit SEO News Article"}</CardTitle>
            <p className="mt-1 text-sm text-muted-foreground">Creates an indexable NewsArticle page under /resources/news/.</p>
          </div>
          <Button variant="outline" onClick={() => { setCreating(false); setEditingId(null); setError(""); }}>Cancel</Button>
        </CardHeader>
        <CardContent>
          {error && <p role="alert" className="mb-4 rounded border border-red-300 bg-red-50 p-3 text-sm text-red-700">{error}</p>}
          <ContentForm type="news-article" initialData={activeArticle} onSubmit={save} />
        </CardContent>
      </Card>
    );
  }

  return (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between gap-3">
        <div>
          <CardTitle>SEO News Articles</CardTitle>
          <p className="mt-1 text-sm text-muted-foreground">Full articles with NewsArticle schema, search metadata, share previews, images, and in-article links.</p>
        </div>
        <Button onClick={() => { setError(""); setCreating(true); }}>Add News Article</Button>
      </CardHeader>
      <CardContent>
        {error && <p role="alert" className="mb-4 rounded border border-red-300 bg-red-50 p-3 text-sm text-red-700">{error}</p>}
        {articles.length === 0 ? <p className="text-sm text-muted-foreground">No full SEO News articles yet. News feed cards are managed separately below.</p> : (
          <div className="space-y-3">
            {articles.map((article) => (
              <div key={article.id} className="flex flex-wrap items-center justify-between gap-3 rounded-md border p-4">
                <div className="min-w-0">
                  <h3 className="font-semibold">{article.title}</h3>
                  <p className="text-sm text-muted-foreground">{article.slug} · {article.published ? "Published" : "Draft"} · {article.category}</p>
                </div>
                <div className="flex gap-2">
                  <Button variant="secondary" size="sm" onClick={() => setEditingId(article.id)}>Edit</Button>
                  <Button variant="destructive" size="sm" onClick={() => void remove(article.id)}>Delete</Button>
                </div>
              </div>
            ))}
          </div>
        )}
      </CardContent>
    </Card>
  );
}
