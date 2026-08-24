import React from "react";
import Link from "next/link";
import { FileText, Edit3, Briefcase } from "lucide-react";

export default function ContentAdminLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex flex-col space-y-6">
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
      </div>

      <div className="pt-2">
        {children}
      </div>
    </div>
  );
}

