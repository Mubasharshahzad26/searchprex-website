"use client";

import React, { useState } from "react";
import { ContentForm } from "@/components/admin/content-form";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { createMarketingResource, updateMarketingResource, deleteMarketingResource } from "../actions";

export function ResourceManager({ initialResources }: { initialResources: any[] }) {
  const [resources, setResources] = useState(initialResources);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [isCreating, setIsCreating] = useState(false);

  const activeResource = editingId ? resources.find(r => r.id === editingId) : null;

  const handleSave = async (data: any) => {
    if (isCreating) {
      const newResource = await createMarketingResource(data);
      setResources([newResource, ...resources]);
      setIsCreating(false);
    } else if (editingId) {
      const updated = await updateMarketingResource(editingId, data);
      setResources(resources.map(r => r.id === editingId ? updated : r));
      setEditingId(null);
    }
  };

  const handleDelete = async (id: string) => {
    if (confirm("Are you sure you want to delete this resource?")) {
      await deleteMarketingResource(id);
      setResources(resources.filter(r => r.id !== id));
    }
  };

  if (isCreating || editingId) {
    return (
      <Card>
        <CardHeader className="flex flex-row justify-between">
          <CardTitle>{isCreating ? "New Resource" : "Edit Resource"}</CardTitle>
          <Button variant="outline" onClick={() => { setIsCreating(false); setEditingId(null); }}>Cancel</Button>
        </CardHeader>
        <CardContent>
          <ContentForm type="resource" initialData={activeResource} onSubmit={handleSave} />
        </CardContent>
      </Card>
    );
  }

  return (
    <Card>
      <CardHeader className="flex flex-row justify-between items-center">
        <CardTitle>Resources</CardTitle>
        <Button onClick={() => setIsCreating(true)}>Add Resource</Button>
      </CardHeader>
      <CardContent>
        {resources.length === 0 ? (
          <p className="text-muted-foreground">No resources found.</p>
        ) : (
          <div className="space-y-4">
            {resources.map(item => (
              <div key={item.id} className="flex items-center justify-between p-4 border rounded-md">
                <div>
                  <h3 className="font-semibold">{item.title}</h3>
                  <p className="text-sm text-muted-foreground">{item.category} • {item.status} • {item.published ? "Published" : "Draft"}</p>
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
