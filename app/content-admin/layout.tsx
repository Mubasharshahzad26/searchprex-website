// app/content-admin/layout.tsx
//
// The `robots` block below is load-bearing. This is a second CMS surface,
// parallel to /admin, and it was fully open to crawlers: no page under it
// exported a robots directive, so every one inherited the root layout's
// "index, follow". robots.ts now disallows /content-admin too, but a Disallow
// only stops crawling, not indexing: Google will still list a URL it was
// linked to. The meta tag is what keeps these out of the index.
//
// It lives on the layout rather than on each page so a new tab added to the nav
// above is covered by default. The child pages export only `title`, and Next
// merges metadata field by field, so their `robots` still resolves to this one.
//
// Access is a separate concern, handled in two other places: middleware.ts
// requires an admin session for /content-admin/:path*, and actions.ts guards
// each Server Action itself, because Next dispatches those by ID rather than
// by URL and they would otherwise bypass the matcher entirely.

import React from "react";
import type { Metadata } from "next";
import Link from "next/link";
import { FileText, Edit3, Briefcase } from "lucide-react";

export const metadata: Metadata = {
  robots: {
    index: false,
    follow: false,
    googleBot: { index: false, follow: false },
  },
};

export default function ContentAdminLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex flex-col space-y-6 max-w-[1600px] mx-auto w-full pt-32 md:pt-40 px-4 sm:px-6 lg:px-8 pb-12">
      <div className="flex items-center justify-between">
        <h2 className="text-3xl font-bold tracking-tight">Content Management</h2>
      </div>
      
      <div className="flex gap-4 border-b border-border pb-4 flex-wrap">
        <Link href="/content-admin/pages" className="flex items-center gap-2 hover:text-primary px-3 py-2 rounded-md hover:bg-muted transition-colors">
          <FileText className="w-4 h-4" /> Standard Pages
        </Link>
        <Link href="/content-admin/blogs" className="flex items-center gap-2 hover:text-primary px-3 py-2 rounded-md hover:bg-muted transition-colors">
          <Edit3 className="w-4 h-4" /> Blog Posts
        </Link>
        <Link href="/content-admin/case-studies" className="flex items-center gap-2 hover:text-primary px-3 py-2 rounded-md hover:bg-muted transition-colors">
          <Briefcase className="w-4 h-4" /> Case Studies
        </Link>
        <Link href="/content-admin/news" className="flex items-center gap-2 hover:text-primary px-3 py-2 rounded-md hover:bg-muted transition-colors">
          <FileText className="w-4 h-4" /> SEO News
        </Link>
        <Link href="/content-admin/resources" className="flex items-center gap-2 hover:text-primary px-3 py-2 rounded-md hover:bg-muted transition-colors">
          <Briefcase className="w-4 h-4" /> Resources
        </Link>
        <Link href="/content-admin/ai-sdr" className="flex items-center gap-2 font-bold text-[#534AB7] bg-[#EEEDFE] px-3 py-2 rounded-md hover:bg-[#dcd9fa] transition-colors border border-[#534AB7]/20">
          <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M12 2a10 10 0 1 0 10 10H12V2Z"/><path d="M22 12A10 10 0 0 0 12 2v10l8.66 5"/></svg> AI SDR Engine
        </Link>
      </div>

      <div className="pt-2">
        {children}
      </div>
    </div>
  );
}

