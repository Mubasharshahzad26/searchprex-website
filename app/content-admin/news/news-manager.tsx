"use client";

import React, { useState } from "react";
import { ContentForm } from "@/components/admin/content-form";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { createMarketingNews, updateMarketingNews, deleteMarketingNews } from "../actions";

export function NewsManager({ initialNews, initialError = "" }: { initialNews: any[]; initialError?: string }) {
  const [news, setNews] = useState(initialNews);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [isCreating, setIsCreating] = useState(false);
  const [error, setError] = useState(initialError);

  const activeNews = editingId ? news.find(n => n.id === editingId) : null;

  const handleSave = async (data: any) => {
    setError("");
    if (isCreating) {
      const newNews = await createMarketingNews(data);
      setNews([newNews, ...news]);
      setIsCreating(false);
    } else if (editingId) {
      const updated = await updateMarketingNews(editingId, data);
      setNews(news.map(n => n.id === editingId ? updated : n));
      setEditingId(null);
    }
  };

  const handleDelete = async (id: string) => {
    if (!confirm("Are you sure you want to delete this news item?")) return;
    setError("");
    try {
      await deleteMarketingNews(id);
      setNews(news.filter(n => n.id !== id));
    } catch (err) {
      setError(err instanceof Error ? err.message : "Could not delete this news feed item.");
    }
  };

  if (isCreating || editingId) {
    return (
      <Card>
        <CardHeader className="flex flex-row justify-between">
          <CardTitle>{isCreating ? "New Feed Card" : "Edit Feed Card"}</CardTitle>
          <Button variant="outline" onClick={() => { setIsCreating(false); setEditingId(null); setError(""); }}>Cancel</Button>
        </CardHeader>
        <CardContent>
          {error && <p role="alert" className="mb-4 rounded border border-red-300 bg-red-50 p-3 text-sm text-red-700">{error}</p>}
          <ContentForm type="news" initialData={activeNews} onSubmit={handleSave} />
        </CardContent>
      </Card>
    );
  }

  return (
    <Card>
      <CardHeader className="flex flex-row justify-between items-center">
        <div><CardTitle>News Feed Cards</CardTitle><p className="mt-1 text-sm text-muted-foreground">Short source-linked updates used in the live news feed. Use SEO News Articles above for a full indexable article page.</p></div>
        <Button onClick={() => { setError(""); setIsCreating(true); }}>Add Feed Item</Button>
      </CardHeader>
      <CardContent>
        {error && <p role="alert" className="mb-4 rounded border border-red-300 bg-red-50 p-3 text-sm text-red-700">{error}</p>}
        {news.length === 0 ? (
          <p className="text-muted-foreground">No news found.</p>
        ) : (
          <div className="space-y-4">
            {news.map(item => (
              <div key={item.id} className="flex items-center justify-between p-4 border rounded-md">
                <div>
                  <h3 className="font-semibold">{item.title}</h3>
                  <p className="text-sm text-muted-foreground">{item.tag} • {new Date(item.newsDate).toLocaleDateString()} • {item.published ? "Published" : "Draft"}</p>
                </div>
                <div className="space-x-2">
                  <Button variant="secondary" size="sm" onClick={() => setEditingId(item.id)}>Edit</Button>
                  <Button variant="destructive" size="sm" onClick={() => handleDelete(item.id)}>Delete</Button>
                </div>
              </div>
            ))}
          </div>
        )}
      </CardContent>
    </Card>
  );
}
