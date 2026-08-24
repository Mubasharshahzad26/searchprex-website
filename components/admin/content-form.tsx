"use client";

import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { createClient } from "@/supabase/client";

export function ContentForm({ initialData, onSubmit, type }: { initialData?: any, onSubmit: (data: any) => void, type: "page" | "blog" | "case-study" | "news" | "resource" }) {
  const [formData, setFormData] = useState(initialData || {});
  const [uploading, setUploading] = useState(false);
  const supabase = createClient();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleImageUpload = async (e: React.ChangeEvent<HTMLInputElement>, fieldName: string) => {
    if (!e.target.files || e.target.files.length === 0) return;
    const file = e.target.files[0];
    
    setUploading(true);
    try {
      const fileExt = file.name.split(".").pop();
      const fileName = `${Math.random()}.${fileExt}`;
      const filePath = `${fileName}`;

      const { error: uploadError } = await supabase.storage.from("marketing").upload(filePath, file);

      if (uploadError) {
        throw uploadError;
      }
      
      const { data } = supabase.storage.from("marketing").getPublicUrl(filePath);
      setFormData({ ...formData, [fieldName]: data.publicUrl });
    } catch (error: any) {
      alert("Error uploading image: " + error.message);
    } finally {
      setUploading(false);
    }
  };

  return (
    <form className="space-y-4" onSubmit={(e) => { e.preventDefault(); onSubmit(formData); }}>
      {type === "case-study" && (
        <div className="space-y-2">
          <Label>Client Name</Label>
          <Input name="clientName" value={formData.clientName || ""} onChange={handleChange} required />
        </div>
      )}
      
      <div className="space-y-2">
        <Label>Title</Label>
        <Input name="title" value={formData.title || ""} onChange={handleChange} required />
      </div>

      {type !== "news" && (
        <div className="space-y-2">
          <Label>Slug</Label>
          <Input name="slug" value={formData.slug || ""} onChange={handleChange} required />
        </div>
      )}

      {type === "news" && (
        <>
          <div className="space-y-2">
            <Label>Summary</Label>
            <Textarea name="summary" value={formData.summary || ""} onChange={handleChange} rows={4} required />
          </div>
          <div className="space-y-2">
            <Label>Tag (e.g., Core Update, AI Search)</Label>
            <Input name="tag" value={formData.tag || ""} onChange={handleChange} />
          </div>
          <div className="space-y-2">
            <Label>Source Label (e.g., Google Search Status Dashboard)</Label>
            <Input name="sourceLabel" value={formData.sourceLabel || ""} onChange={handleChange} />
          </div>
          <div className="space-y-2">
            <Label>Source URL</Label>
            <Input name="sourceHref" value={formData.sourceHref || ""} onChange={handleChange} />
          </div>
        </>
      )}

      {type === "resource" && (
        <>
          <div className="space-y-2">
            <Label>Description</Label>
            <Textarea name="description" value={formData.description || ""} onChange={handleChange} rows={3} />
          </div>
          <div className="space-y-2">
            <Label>Icon (e.g., FileText, BookOpen)</Label>
            <Input name="icon" value={formData.icon || ""} onChange={handleChange} />
          </div>
          <div className="space-y-2">
            <Label>Category</Label>
            <Input name="category" value={formData.category || ""} onChange={handleChange} />
          </div>
          <div className="space-y-2">
            <Label>File URL (Optional external link or upload)</Label>
            <Input name="fileUrl" value={formData.fileUrl || ""} onChange={handleChange} />
          </div>
          <div className="space-y-2">
            <Label>Status</Label>
            <Input name="status" value={formData.status || "active"} onChange={handleChange} />
          </div>
        </>
      )}

      {type === "blog" && (
        <>
          <div className="space-y-2">
            <Label>Category</Label>
            <Input name="category" value={formData.category || ""} onChange={handleChange} placeholder="e.g. SEO News, Technical SEO" />
          </div>
          <div className="space-y-2">
            <Label>Author</Label>
            <Input name="author" value={formData.author || ""} onChange={handleChange} />
          </div>
        </>
      )}

      {(type === "blog" || type === "case-study") && (
        <div className="space-y-2">
          <Label>Cover Image</Label>
          <Input type="file" accept="image/*" onChange={(e) => handleImageUpload(e, "coverImage")} disabled={uploading} />
          {uploading && <p className="text-xs text-muted-foreground">Uploading...</p>}
          {formData.coverImage && <img src={formData.coverImage} alt="Cover" className="h-32 object-cover rounded-md mt-2" />}
        </div>
      )}

      {type !== "news" && type !== "resource" && (
        <div className="grid grid-cols-2 gap-4">
          <div className="space-y-2">
            <Label>Meta Title</Label>
            <Input name="metaTitle" value={formData.metaTitle || ""} onChange={handleChange} />
          </div>
          <div className="space-y-2">
            <Label>Meta Description</Label>
            <Input name="metaDescription" value={formData.metaDescription || ""} onChange={handleChange} />
          </div>
        </div>
      )}

      {type === "case-study" && (
        <>
          <div className="space-y-2">
            <Label>Challenge (Markdown)</Label>
            <Textarea name="challenge" value={formData.challenge || ""} onChange={handleChange} rows={3} />
          </div>
          <div className="space-y-2">
            <Label>Solution (Markdown)</Label>
            <Textarea name="solution" value={formData.solution || ""} onChange={handleChange} rows={3} />
          </div>
          <div className="space-y-2">
            <Label>Results (Markdown)</Label>
            <Textarea name="results" value={formData.results || ""} onChange={handleChange} rows={3} />
          </div>
        </>
      )}

      {type !== "news" && type !== "resource" && type !== "case-study" && (
        <div className="space-y-2">
          <Label>Content (Markdown)</Label>
          <Textarea 
            name="content" 
            value={formData.content || ""} 
            onChange={handleChange} 
            rows={12} 
            placeholder="Write your content here in Markdown..."
          />
        </div>
      )}
      
      <div className="flex items-center gap-2">
        <input 
          type="checkbox" 
          id="published" 
          name="published" 
          checked={formData.published || false} 
          onChange={(e) => setFormData({...formData, published: e.target.checked})} 
        />
        <Label htmlFor="published">Published</Label>
      </div>

      <Button type="submit">Save</Button>
    </form>
  );
}

