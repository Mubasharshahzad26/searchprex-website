import React from "react";
import PageForm from "@/components/admin/page-form";
import { getPageById } from "../../actions";
import { notFound } from "next/navigation";

export const metadata = {
  title: "Edit Page | SearchPrex Admin",
};

// Next 15+ passes route params as a Promise.
export default async function EditPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const response = await getPageById(id);

  if (!response.success || !response.data) {
    notFound();
  }

  return (
    <div className="flex-1 space-y-4">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-3xl font-bold tracking-tight">Edit Page</h2>
          <p className="text-muted-foreground">Modify SEO and content for {response.data.slug}</p>
        </div>
      </div>
      <PageForm initialData={response.data} />
    </div>
  );
}
