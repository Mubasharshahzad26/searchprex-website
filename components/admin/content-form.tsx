"use client";

import React, { useState, useRef } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { createClient } from "@/supabase/client";

function MarkdownToolbar({ onInsert }: { onInsert: (prefix: string, suffix?: string) => void }) {
  return (
    <div className="flex flex-wrap items-center gap-1.5 mb-0 p-2 border border-b-0 border-[#e5e7eb] rounded-t-md bg-[#f8f9fc]">
      <Button type="button" variant="outline" size="sm" className="h-8 px-2 text-xs" onClick={() => onInsert("**", "**")}>Bold</Button>
      <Button type="button" variant="outline" size="sm" className="h-8 px-2 text-xs" onClick={() => onInsert("*", "*")}>Italic</Button>
      <div className="w-px h-4 bg-gray-300 mx-1" />
      <Button type="button" variant="outline" size="sm" className="h-8 px-2 text-xs" onClick={() => onInsert("\n# ", "\n")}>H1</Button>
      <Button type="button" variant="outline" size="sm" className="h-8 px-2 text-xs" onClick={() => onInsert("\n## ", "\n")}>H2</Button>
      <Button type="button" variant="outline" size="sm" className="h-8 px-2 text-xs" onClick={() => onInsert("\n### ", "\n")}>H3</Button>
      <div className="w-px h-4 bg-gray-300 mx-1" />
      <Button type="button" variant="outline" size="sm" className="h-8 px-2 text-xs" onClick={() => onInsert("[", "](https://)")}>Link</Button>
      <Button type="button" variant="outline" size="sm" className="h-8 px-2 text-xs" onClick={() => onInsert("![Alt text](", ")")}>Image</Button>
      <Button type="button" variant="outline" size="sm" className="h-8 px-2 text-xs" onClick={() => onInsert("\n- ")}>Bullet List</Button>
    </div>
  );
}

export function ContentForm({ initialData, onSubmit, type }: { initialData?: any, onSubmit: (data: any) => void, type: "page" | "blog" | "case-study" | "news" | "resource" }) {
  const [formData, setFormData] = useState(initialData || {});
  const [uploading, setUploading] = useState(false);
  const [showAdvancedSEO, setShowAdvancedSEO] = useState(false);
  const contentRef = useRef<HTMLTextAreaElement>(null);
  const supabase = createClient();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
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

  const insertMarkdown = (prefix: string, suffix: string = "") => {
    const textarea = contentRef.current;
    if (!textarea) return;

    const start = textarea.selectionStart;
    const end = textarea.selectionEnd;
    const text = formData.content || "";
    
    const before = text.substring(0, start);
    const selected = text.substring(start, end);
    const after = text.substring(end);
    
    const newText = before + prefix + selected + suffix + after;
    setFormData({ ...formData, content: newText });
    
    setTimeout(() => {
      textarea.focus();
      textarea.setSelectionRange(start + prefix.length, end + prefix.length);
    }, 0);
  };

  return (
    <form className="space-y-6" onSubmit={(e) => { e.preventDefault(); onSubmit(formData); }}>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
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
      </div>

      {type === "case-study" && (
        <div className="space-y-2">
          <Label>Client Name</Label>
          <Input name="clientName" value={formData.clientName || ""} onChange={handleChange} required />
        </div>
      )}

      {type === "news" && (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="space-y-2 md:col-span-2">
            <Label>Summary</Label>
            <Textarea name="summary" value={formData.summary || ""} onChange={handleChange} rows={3} required />
          </div>
          <div className="space-y-2">
            <Label>Tag (e.g., Core Update, AI Search)</Label>
            <Input name="tag" value={formData.tag || ""} onChange={handleChange} />
          </div>
          <div className="space-y-2">
            <Label>Source Label (e.g., Search Engine Land)</Label>
            <Input name="sourceLabel" value={formData.sourceLabel || ""} onChange={handleChange} />
          </div>
          <div className="space-y-2 md:col-span-2">
            <Label>Source URL</Label>
            <Input name="sourceHref" value={formData.sourceHref || ""} onChange={handleChange} />
          </div>
        </div>
      )}

      {type === "blog" && (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="space-y-2">
            <Label>Category</Label>
            <Input name="category" value={formData.category || ""} onChange={handleChange} placeholder="e.g. SEO News, Technical SEO" />
          </div>
          <div className="space-y-2">
            <Label>Author</Label>
            <Input name="author" value={formData.author || ""} onChange={handleChange} />
          </div>
        </div>
      )}

      {(type === "blog" || type === "case-study") && (
        <div className="space-y-2 p-4 bg-gray-50 border border-gray-100 rounded-lg">
          <Label>Cover Image</Label>
          <Input type="file" accept="image/*" onChange={(e) => handleImageUpload(e, "coverImage")} disabled={uploading} className="bg-white" />
          {uploading && <p className="text-xs text-blue-600 mt-1 font-medium">Uploading to secure storage...</p>}
          {formData.coverImage && <img src={formData.coverImage} alt="Cover" className="h-32 w-auto object-cover rounded-md mt-3 border shadow-sm" />}
        </div>
      )}

      {/* Basic SEO Section */}
      {type !== "news" && type !== "resource" && (
        <div className="space-y-4 p-4 border border-gray-200 rounded-lg bg-white">
          <div className="flex items-center justify-between">
            <h3 className="font-semibold text-gray-900">SEO & Metadata</h3>
            <Button type="button" variant="ghost" size="sm" onClick={() => setShowAdvancedSEO(!showAdvancedSEO)}>
              {showAdvancedSEO ? "Hide Advanced SEO" : "Show Advanced SEO"}
            </Button>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label>Meta Title</Label>
              <Input name="metaTitle" value={formData.metaTitle || ""} onChange={handleChange} placeholder="Keep under 60 characters" />
            </div>
            <div className="space-y-2">
              <Label>Meta Description</Label>
              <Input name="metaDescription" value={formData.metaDescription || ""} onChange={handleChange} placeholder="Keep under 160 characters" />
            </div>
          </div>

          {/* Advanced SEO Section */}
          {showAdvancedSEO && (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 pt-4 border-t mt-4">
              <div className="space-y-2 md:col-span-2">
                <Label>Canonical URL</Label>
                <Input name="canonicalUrl" value={formData.canonicalUrl || ""} onChange={handleChange} placeholder="https://www.searchprex.com/..." />
              </div>
              <div className="space-y-2 md:col-span-2">
                <Label>Schema Markup Type</Label>
                <select 
                  name="schemaType" 
                  value={formData.schemaType || "BlogPosting"} 
                  onChange={handleChange}
                  className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background"
                >
                  <option value="BlogPosting">BlogPosting</option>
                  <option value="NewsArticle">NewsArticle</option>
                  <option value="Article">Article</option>
                </select>
              </div>
              <div className="space-y-2">
                <Label>OpenGraph Title (og:title)</Label>
                <Input name="ogTitle" value={formData.ogTitle || ""} onChange={handleChange} />
              </div>
              <div className="space-y-2">
                <Label>OpenGraph Description (og:description)</Label>
                <Input name="ogDescription" value={formData.ogDescription || ""} onChange={handleChange} />
              </div>
              <div className="space-y-2">
                <Label>Twitter Title</Label>
                <Input name="twitterTitle" value={formData.twitterTitle || ""} onChange={handleChange} />
              </div>
              <div className="space-y-2">
                <Label>Twitter Description</Label>
                <Input name="twitterDescription" value={formData.twitterDescription || ""} onChange={handleChange} />
              </div>
            </div>
          )}
        </div>
      )}

      {type !== "news" && type !== "resource" && type !== "case-study" && (
        <div className="space-y-0">
          <Label className="mb-2 block">Content Editor</Label>
          <MarkdownToolbar onInsert={insertMarkdown} />
          <Textarea 
            ref={contentRef}
            name="content" 
            value={formData.content || ""} 
            onChange={handleChange} 
            rows={15} 
            className="font-mono text-sm rounded-t-none border-t-0 focus-visible:ring-0 focus-visible:ring-offset-0"
            placeholder="Write your content here in Markdown..."
          />
        </div>
      )}
      
      <div className="flex items-center gap-3 pt-4 border-t">
        <input 
          type="checkbox" 
          id="published" 
          name="published" 
          checked={formData.published || false} 
          onChange={(e) => setFormData({...formData, published: e.target.checked})} 
          className="h-4 w-4 rounded border-gray-300 text-blue-600 focus:ring-blue-600"
        />
        <Label htmlFor="published" className="font-semibold cursor-pointer">Published to Live Site</Label>
      </div>

      <div className="pt-2">
        <Button type="submit" size="lg" className="w-full sm:w-auto px-8">Save Content</Button>
      </div>
    </form>
  );
}

