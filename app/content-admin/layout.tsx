import React from "react";
import Link from "next/link";
import { FileText, Edit3, Briefcase } from "lucide-react";

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

