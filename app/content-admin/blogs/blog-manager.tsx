"use client";

import React, { useState } from "react";
import { ContentForm } from "@/components/admin/content-form";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { createMarketingBlog, updateMarketingBlog, deleteMarketingBlog } from "../actions";

export function BlogManager({ initialBlogs }: { initialBlogs: any[] }) {
  const [blogs, setBlogs] = useState(initialBlogs);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [isCreating, setIsCreating] = useState(false);
  const [error, setError] = useState("");

  const activeBlog = editingId ? blogs.find(b => b.id === editingId) : null;

  const handleSave = async (data: any) => {
    setError("");
    if (isCreating) {
      const newBlog = await createMarketingBlog(data);
      setBlogs([newBlog, ...blogs]);
      setIsCreating(false);
    } else if (editingId) {
      const updated = await updateMarketingBlog(editingId, data);
      setBlogs(blogs.map(b => b.id === editingId ? updated : b));
      setEditingId(null);
    }
  };

  const handleDelete = async (id: string) => {
    if (!confirm("Are you sure?")) return;
    setError("");
    try {
      await deleteMarketingBlog(id);
      setBlogs(blogs.filter(b => b.id !== id));
    } catch (err) {
      setError(err instanceof Error ? err.message : "Could not delete the blog post.");
    }
  };

  if (isCreating || editingId) {
    return (
      <Card>
        <CardHeader className="flex flex-row justify-between">
          <CardTitle>{isCreating ? "New Blog Post" : "Edit Blog Post"}</CardTitle>
          <Button variant="outline" onClick={() => { setIsCreating(false); setEditingId(null); setError(""); }}>Cancel</Button>
        </CardHeader>
        <CardContent>
          {error && <p role="alert" className="mb-4 rounded border border-red-300 bg-red-50 p-3 text-sm text-red-700">{error}</p>}
          <ContentForm type="blog" initialData={activeBlog} onSubmit={handleSave} />
        </CardContent>
      </Card>
    );
  }

  return (
    <Card>
      <CardHeader className="flex flex-row justify-between items-center">
        <div>
          <CardTitle>Blog Posts</CardTitle>
          <p className="mt-1 text-sm text-muted-foreground">Published under /blog/. Use the SEO News tab for NewsArticle stories.</p>
        </div>
        <Button onClick={() => { setError(""); setIsCreating(true); }}>Add New</Button>
      </CardHeader>
      <CardContent>
        {error && <p role="alert" className="mb-4 rounded border border-red-300 bg-red-50 p-3 text-sm text-red-700">{error}</p>}
        {blogs.length === 0 ? (
          <p className="text-muted-foreground">No blog posts found.</p>
        ) : (
          <div className="space-y-4">
            {blogs.map(blog => (
              <div key={blog.id} className="flex items-center justify-between p-4 border rounded-md">
                <div>
                  <h3 className="font-semibold">{blog.title}</h3>
                  <p className="text-sm text-muted-foreground">{blog.slug} · {blog.category || "Blog"} · {blog.published ? "Published" : "Draft"}</p>
                </div>
                <div className="space-x-2">
                  <Button variant="secondary" size="sm" onClick={() => setEditingId(blog.id)}>Edit</Button>
                  <Button variant="destructive" size="sm" onClick={() => handleDelete(blog.id)}>Delete</Button>
                </div>
              </div>
            ))}
          </div>
        )}
      </CardContent>
    </Card>
  );
}

