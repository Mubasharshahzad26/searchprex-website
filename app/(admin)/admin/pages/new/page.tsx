import React from "react";
import PageForm from "@/components/admin/page-form";

export const metadata = {
  title: "Create New Page | SearchPrex Admin",
};

export default function NewPage() {
  return (
    <div className="flex-1 space-y-4">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-3xl font-bold tracking-tight">Create Page</h2>
          <p className="text-muted-foreground">Add a new page to your website.</p>
        </div>
      </div>
      <PageForm />
    </div>
  );
}
