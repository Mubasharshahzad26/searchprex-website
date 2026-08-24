"use client";

import React, { useState } from "react";
import { ContentForm } from "@/components/admin/content-form";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { createMarketingNews, updateMarketingNews, deleteMarketingNews } from "../actions";

export function NewsManager({ initialNews }: { initialNews: any[] }) {
  const [news, setNews] = useState(initialNews);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [isCreating, setIsCreating] = useState(false);

  const activeNews = editingId ? news.find(n => n.id === editingId) : null;

  const handleSave = async (data: any) => {
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
    if (confirm("Are you sure you want to delete this news item?")) {
      await deleteMarketingNews(id);
      setNews(news.filter(n => n.id !== id));
    }
  };

  if (isCreating || editingId) {
    return (
      <Card>
        <CardHeader className="flex flex-row justify-between">
          <CardTitle>{isCreating ? "New SEO News" : "Edit SEO News"}</CardTitle>
          <Button variant="outline" onClick={() => { setIsCreating(false); setEditingId(null); }}>Cancel</Button>
        </CardHeader>
        <CardContent>
          <ContentForm type="news" initialData={activeNews} onSubmit={handleSave} />
        </CardContent>
      </Card>
    );
  }

  return (
    <Card>
      <CardHeader className="flex flex-row justify-between items-center">
        <CardTitle>SEO News</CardTitle>
        <Button onClick={() => setIsCreating(true)}>Add News</Button>
      </CardHeader>
      <CardContent>
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
