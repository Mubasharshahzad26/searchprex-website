import type { Metadata } from "next";
import { getPageSEO } from "@/lib/admin-seo";
import SchemaGeneratorClient from "./SchemaGeneratorClient";

/**
 * The working generator used to live at `app/tools/schema generator/` — a
 * directory name with a space, which Next served as `/tools/schema%20generator`
 * while this route held an eight-line "Coming soon" placeholder. So the real
 * tool sat on an unlinked, un-sitemapped URL and the advertised one was empty.
 *
 * The implementation now lives here, split into a client component so this file
 * can stay a Server Component and export metadata — a "use client" module
 * cannot, which is why the placeholder had none and fell back to the root
 * layout's homepage title and canonical.
 */
const baseMetadata: Metadata = {
  title: "Free JSON-LD Schema Markup Generator",
  description:
    "Generate valid JSON-LD schema markup for local businesses, law firms, ecommerce products and FAQs. Free, no signup — copy the output straight into your site.",
  alternates: { canonical: "https://www.searchprex.com/tools/schema-generator" },
};

export async function generateMetadata(): Promise<Metadata> {
  return getPageSEO("/tools/schema-generator", baseMetadata);
}

export default function SchemaGeneratorPage() {
  return <SchemaGeneratorClient />;
}
