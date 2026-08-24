"use client";

import React, { useState } from "react";
import { ContentForm } from "@/components/admin/content-form";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { createMarketingCaseStudy, updateMarketingCaseStudy, deleteMarketingCaseStudy } from "../actions";

export function CaseStudyManager({ initialCaseStudies }: { initialCaseStudies: any[] }) {
  const [caseStudies, setCaseStudies] = useState(initialCaseStudies);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [isCreating, setIsCreating] = useState(false);

  const activeCaseStudy = editingId ? caseStudies.find(c => c.id === editingId) : null;

  const handleSave = async (data: any) => {
    if (isCreating) {
      const newCase = await createMarketingCaseStudy(data);
      setCaseStudies([newCase, ...caseStudies]);
      setIsCreating(false);
    } else if (editingId) {
      const updated = await updateMarketingCaseStudy(editingId, data);
      setCaseStudies(caseStudies.map(c => c.id === editingId ? updated : c));
      setEditingId(null);
    }
  };

  const handleDelete = async (id: string) => {
    if (confirm("Are you sure?")) {
      await deleteMarketingCaseStudy(id);
      setCaseStudies(caseStudies.filter(c => c.id !== id));
    }
  };

  if (isCreating || editingId) {
    return (
      <Card>
        <CardHeader className="flex flex-row justify-between">
          <CardTitle>{isCreating ? "New Case Study" : "Edit Case Study"}</CardTitle>
          <Button variant="outline" onClick={() => { setIsCreating(false); setEditingId(null); }}>Cancel</Button>
        </CardHeader>
        <CardContent>
          <ContentForm type="case-study" initialData={activeCaseStudy} onSubmit={handleSave} />
        </CardContent>
      </Card>
    );
  }

  return (
    <Card>
      <CardHeader className="flex flex-row justify-between items-center">
        <CardTitle>Case Studies</CardTitle>
        <Button onClick={() => setIsCreating(true)}>Add New</Button>
      </CardHeader>
      <CardContent>
        {caseStudies.length === 0 ? (
          <p className="text-muted-foreground">No case studies found.</p>
        ) : (
          <div className="space-y-4">
            {caseStudies.map(caseStudy => (
              <div key={caseStudy.id} className="flex items-center justify-between p-4 border rounded-md">
                <div>
                  <h3 className="font-semibold">{caseStudy.title}</h3>
                  <p className="text-sm text-muted-foreground">{caseStudy.clientName} � {caseStudy.slug} � {caseStudy.published ? "Published" : "Draft"}</p>
                </div>
                <div className="space-x-2">
                  <Button variant="secondary" size="sm" onClick={() => setEditingId(caseStudy.id)}>Edit</Button>
                  <Button variant="destructive" size="sm" onClick={() => handleDelete(caseStudy.id)}>Delete</Button>
                </div>
              </div>
            ))}
          </div>
        )}
      </CardContent>
    </Card>
  );
}

