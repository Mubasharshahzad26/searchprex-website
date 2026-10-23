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
      {/* No H1 button: the page template already renders the title as the
          page's only h1, so an h1 in the body is a duplicate. H2 is the
          correct top level for body headings. */}
      <Button type="button" variant="outline" size="sm" className="h-8 px-2 text-xs" onClick={() => onInsert("\n## ", "\n")}>H2</Button>
      <Button type="button" variant="outline" size="sm" className="h-8 px-2 text-xs" onClick={() => onInsert("\n### ", "\n")}>H3</Button>
      <div className="w-px h-4 bg-gray-300 mx-1" />
      <Button type="button" variant="outline" size="sm" className="h-8 px-2 text-xs" onClick={() => onInsert("[", "](https://)")}>Link</Button>
      <Button type="button" variant="outline" size="sm" className="h-8 px-2 text-xs" onClick={() => onInsert("![Alt text](", ")")}>Image</Button>
      <Button type="button" variant="outline" size="sm" className="h-8 px-2 text-xs" onClick={() => onInsert("\n- ")}>Bullet List</Button>
      <Button type="button" variant="outline" size="sm" className="h-8 px-2 text-xs" onClick={() => onInsert("\n1. ")}>Numbered</Button>
      <div className="w-px h-4 bg-gray-300 mx-1" />
      <Button type="button" variant="outline" size="sm" className="h-8 px-2 text-xs" onClick={() => onInsert("\n| Column | Column |\n| --- | --- |\n| Cell | Cell |\n")}>Table</Button>
      <Button type="button" variant="outline" size="sm" className="h-8 px-2 text-xs" onClick={() => onInsert('\n<div class="callout"><strong>Note:</strong> ', "</div>\n")}>Callout</Button>
    </div>
  );
}

/**
 * Spoke categories drive both the SEO News hub and its subnav. The hub matches
 * `contains "SEO News"`; each subnav item matches `contains "AI SEO"`, "LLMs",
 * "Tools", "Ecommerce" or "Technical". A combined "SEO News — Tools" satisfies
 * both, so the article appears on the hub AND on its subcategory page. A bare
 * "SEO News" shows on the hub only -- which is how the subnav pages ended up
 * with no articles on them.
 */
const CATEGORY_SUGGESTIONS = [
  "SEO News",
  "SEO News — AI SEO",
  "SEO News — LLMs",
  "SEO News — Tools",
  "SEO News — Ecommerce",
  "SEO News — Technical",
];

export function ContentForm({ initialData, onSubmit, type }: { initialData?: any, onSubmit: (data: any) => void, type: "page" | "blog" | "case-study" | "news" | "news-article" | "resource" }) {
  const [formData, setFormData] = useState(() => type === "news-article" ? { category: "SEO News — AI SEO", author: "Mubashar Sharif", schemaType: "NewsArticle", ...(initialData || {}) } : (initialData || {}));
  const [uploading, setUploading] = useState(false);
  const [showAdvancedSEO, setShowAdvancedSEO] = useState(type === "blog" || type === "news-article");
  const [galleryOpen, setGalleryOpen] = useState(false);
  const [galleryLoading, setGalleryLoading] = useState(false);
  const [galleryError, setGalleryError] = useState("");
  const [galleryItems, setGalleryItems] = useState<string[]>([]);
  const [linkText, setLinkText] = useState("");
  const [linkUrl, setLinkUrl] = useState("");
  const contentRef = useRef<HTMLTextAreaElement>(null);
  const supabase = createClient();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    setFormData((current: any) => ({ ...current, [e.target.name]: e.target.value }));
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
      setFormData((current: any) => ({ ...current, [fieldName]: data.publicUrl }));
    } catch (error: any) {
      alert("Error uploading image: " + error.message);
    } finally {
      setUploading(false);
    }
  };

  const openGallery = async () => {
    setGalleryOpen(true);
    setGalleryError("");
    setGalleryLoading(true);
    try {
      const { data, error } = await supabase.storage.from("marketing").list("", {
        limit: 100,
        sortBy: { column: "updated_at", order: "desc" },
      });
      if (error) throw error;
      const urls = (data || [])
        .filter((item: any) => item.id && /\.(avif|gif|jpe?g|png|webp|svg)$/i.test(item.name))
        .map((item: any) => supabase.storage.from("marketing").getPublicUrl(item.name).data.publicUrl);
      setGalleryItems(urls);
      if (urls.length === 0) setGalleryError("No images were found in the marketing gallery. You can use an image URL or upload from your computer.");
    } catch (error: any) {
      setGalleryError(error?.message || "Could not load the marketing gallery. Check Supabase Storage access.");
    } finally {
      setGalleryLoading(false);
    }
  };

  const insertLink = () => {
    const label = linkText.trim();
    const href = linkUrl.trim();
    if (!label || !href) return;
    insertTextAtCursor("[" + label + "](" + href + ")");
    setLinkText("");
    setLinkUrl("");
  };

  const insertTextAtCursor = (inserted: string) => {
    const textarea = contentRef.current;
    const text = formData.content || "";
    const start = textarea?.selectionStart ?? text.length;
    const end = textarea?.selectionEnd ?? text.length;
    const next = text.slice(0, start) + inserted + text.slice(end);
    setFormData((current: any) => ({ ...current, content: next }));
    setTimeout(() => {
      textarea?.focus();
      textarea?.setSelectionRange(start + inserted.length, start + inserted.length);
    }, 0);
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
    setFormData((current: any) => ({ ...current, content: newText }));

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
          <Input name="title" value={formData.title || ""} onChange={(e) => { handleChange(e); if ((type === "blog" || type === "news-article") && !formData.slug) setFormData((current: any) => ({ ...current, slug: e.target.value.toLowerCase().trim().replace(/[^a-z0-9]+/g, "-").replace(/^-|-$/g, "") })); }} required />
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

      {(type === "blog" || type === "news-article") && (
        <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
          <div className="space-y-2">
            <Label>{type === "news-article" ? "News category" : "Category"}</Label>
            <Input name="category" value={formData.category || ""} onChange={handleChange} list="category-suggestions" placeholder={type === "news-article" ? "SEO News — AI SEO" : "e.g. Technical SEO"} />
            <datalist id="category-suggestions">
              {CATEGORY_SUGGESTIONS.map((c) => <option key={c} value={c} />)}
            </datalist>
            <p className="text-xs text-muted-foreground">For news subcategories, use <code className="font-mono">SEO News — Subcategory</code>. The news editor always assigns NewsArticle schema.</p>
          </div>
          <div className="space-y-2">
            <Label>Author</Label>
            <Input name="author" value={formData.author || ""} onChange={handleChange} />
          </div>
          <div className="space-y-2 md:col-span-2">
            <Label>Excerpt / Article Summary</Label>
            <Textarea name="excerpt" value={formData.excerpt || ""} onChange={handleChange} rows={3} placeholder="Short summary shown on the listing and used as a fallback meta description" />
          </div>
        </div>
      )}
      {(type === "blog" || type === "news-article" || type === "case-study") && (
        <div className="space-y-3 rounded-lg border border-gray-200 bg-gray-50 p-4">
          <div>
            <Label>Featured Image</Label>
            <p className="mt-1 text-xs text-muted-foreground">Used on the article page and as the default Open Graph/Twitter share image. Image alt text defaults to the article title.</p>
          </div>
          <div className="grid grid-cols-1 gap-3 md:grid-cols-[1fr_auto_auto]">
            <Input name="coverImage" value={formData.coverImage || ""} onChange={handleChange} placeholder="Paste an image URL, e.g. https://… or /images/…" />
            <label className="inline-flex h-10 cursor-pointer items-center justify-center rounded-md border bg-white px-4 text-sm font-medium hover:bg-gray-100">
              {uploading ? "Uploading…" : "Upload from computer"}
              <Input type="file" accept="image/*" onChange={(e) => handleImageUpload(e, "coverImage")} disabled={uploading} className="sr-only" />
            </label>
            <Button type="button" variant="outline" onClick={() => galleryOpen ? setGalleryOpen(false) : void openGallery()}>{galleryOpen ? "Close gallery" : "Choose from gallery"}</Button>
          </div>
          {uploading && <p className="text-xs font-medium text-blue-600">Uploading to the marketing image library…</p>}
          {galleryOpen && (
            <div className="rounded-md border bg-white p-3">
              {galleryLoading && <p className="text-sm text-muted-foreground">Loading gallery…</p>}
              {galleryError && <p className="text-sm text-amber-700">{galleryError}</p>}
              {galleryItems.length > 0 && <div className="grid grid-cols-2 gap-3 sm:grid-cols-4">{galleryItems.map((url) => <button key={url} type="button" onClick={() => { setFormData((current: any) => ({ ...current, coverImage: url })); setGalleryOpen(false); }} className={"overflow-hidden rounded border p-1 text-left " + (formData.coverImage === url ? "border-emerald-600 ring-2 ring-emerald-200" : "border-gray-200")}><img src={url} alt="Select featured image" className="h-24 w-full object-cover" /><span className="block truncate px-1 py-1 text-xs">{url.split("/").pop()}</span></button>)}</div>}
            </div>
          )}
          {formData.coverImage && <img src={formData.coverImage} alt={formData.title || "Featured image preview"} className="mt-3 h-36 max-w-full rounded-md border object-contain shadow-sm" />}
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
                  value={type === "news-article" ? "NewsArticle" : (formData.schemaType || "BlogPosting")}
                  onChange={handleChange}
                  className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background"
                >
                  {type === "news-article" ? (
                    <option value="NewsArticle">NewsArticle (fixed for SEO News)</option>
                  ) : (
                    <>
                      <option value="BlogPosting">BlogPosting</option>
                      <option value="Article">Article</option>
                    </>
                  )}
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

      {(type === "blog" || type === "news-article") && (
        <div className="space-y-0">
          <Label className="mb-2 block">Content Editor</Label>
          <MarkdownToolbar onInsert={insertMarkdown} />
          <div className="grid grid-cols-1 gap-2 border-x border-gray-200 bg-white p-3 md:grid-cols-[1fr_1fr_auto]">
            <Input value={linkText} onChange={(e) => setLinkText(e.target.value)} placeholder="Link text" aria-label="Link text" />
            <Input value={linkUrl} onChange={(e) => setLinkUrl(e.target.value)} placeholder="URL: /services/… or https://…" aria-label="Link URL" />
            <Button type="button" variant="outline" onClick={insertLink} disabled={!linkText.trim() || !linkUrl.trim()}>Insert link</Button>
          </div>
          <Textarea
            ref={contentRef}
            name="content"
            value={formData.content || ""}
            onChange={handleChange}
            rows={15}
            className="font-mono text-sm rounded-t-none border-t-0 focus-visible:ring-0 focus-visible:ring-offset-0"
            placeholder="Write your content here in Markdown..."
          />
          <p className="text-xs text-muted-foreground mt-2">
            Markdown, rendered on the live page. Start headings at{" "}
            <code className="font-mono">##</code>{" "}— the article title is already the
            page&apos;s h1. Raw HTML is allowed for anything Markdown can&apos;t express (the
            Callout button inserts some).
          </p>
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

