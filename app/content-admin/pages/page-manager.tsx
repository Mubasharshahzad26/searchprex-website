"use client";

import React, { useState } from "react";
import { ContentForm } from "@/components/admin/content-form";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { createMarketingPage, updateMarketingPage, deleteMarketingPage } from "../actions";

export function PageManager({ initialPages }: { initialPages: any[] }) {
  const [pages, setPages] = useState(initialPages);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [isCreating, setIsCreating] = useState(false);

  const activePage = editingId ? pages.find(p => p.id === editingId) : null;

  const handleSave = async (data: any) => {
    if (isCreating) {
      const newPage = await createMarketingPage(data);
      setPages([newPage, ...pages]);
      setIsCreating(false);
    } else if (editingId) {
      const updated = await updateMarketingPage(editingId, data);
      setPages(pages.map(p => p.id === editingId ? updated : p));
      setEditingId(null);
    }
  };

  const handleDelete = async (id: string) => {
    if (confirm("Are you sure?")) {
      await deleteMarketingPage(id);
      setPages(pages.filter(p => p.id !== id));
    }
  };

  if (isCreating || editingId) {
    return (
      <Card>
        <CardHeader className="flex flex-row justify-between">
          <CardTitle>{isCreating ? "New Page" : "Edit Page"}</CardTitle>
          <Button variant="outline" onClick={() => { setIsCreating(false); setEditingId(null); }}>Cancel</Button>
        </CardHeader>
        <CardContent>
          <ContentForm type="page" initialData={activePage} onSubmit={handleSave} />
        </CardContent>
      </Card>
    );
  }

  return (
    <Card>
      <CardHeader className="flex flex-row justify-between items-center">
        <CardTitle>Standard Pages (Home, Locations, Resources)</CardTitle>
        <Button onClick={() => setIsCreating(true)}>Add New</Button>
      </CardHeader>
      <CardContent>
        {pages.length === 0 ? (
          <p className="text-muted-foreground">No pages found.</p>
        ) : (
          <div className="space-y-4">
            {pages.map(page => (
              <div key={page.id} className="flex items-center justify-between p-4 border rounded-md">
                <div>
                  <h3 className="font-semibold">{page.title}</h3>
                  <p className="text-sm text-muted-foreground">{page.slug} � {page.published ? "Published" : "Draft"}</p>
                </div>
                <div className="space-x-2">
                  <Button variant="secondary" size="sm" onClick={() => setEditingId(page.id)}>Edit</Button>
                  <Button variant="destructive" size="sm" onClick={() => handleDelete(page.id)}>Delete</Button>
                </div>
              </div>
            ))}
          </div>
        )}
      </CardContent>
    </Card>
  );
}

