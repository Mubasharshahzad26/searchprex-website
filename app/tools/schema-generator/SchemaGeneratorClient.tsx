"use client";

import { useState } from "react";
import Link from "next/link";
import {
  Code2,
  Copy,
  CheckCircle,
  Zap,
  Building2,
  Scale,
  ShoppingCart,
  HelpCircle,
  FileText,
  Star,
  ArrowRight,
  Sparkles,
  RefreshCw,
  ExternalLink,
} from "lucide-react";

// ── Schema Types & Field Configurations ─────────────────────────────────
interface FieldConfig {
  key: string;
  label: string;
  placeholder: string;
  required?: boolean;
  textarea?: boolean;
  colSpan?: 1 | 2;
}

interface SchemaTypeConfig {
  id: string;
  label: string;
  icon: React.ComponentType<{ className?: string; style?: React.CSSProperties }>;
  color: string;
  bg: string;
  desc: string;
  fields: FieldConfig[];
}

const schemaTypes: SchemaTypeConfig[] = [
  {
    id: "local-business",
    label: "Local Business",
    icon: Building2,
    color: "#534AB7",
    bg: "#EEEDFE",
    desc: "For US local service businesses, contractors & stores",
    fields: [
      { key: "name", label: "Business Name", placeholder: "Acme Plumbing & Heating", required: true, colSpan: 2 },
      { key: "description", label: "Business Description", placeholder: "Licensed plumbing & HVAC contractor serving Chicago and surrounding suburbs...", required: true, textarea: true, colSpan: 2 },
      { key: "url", label: "Website URL", placeholder: "https://acmeplumbingchicago.com", required: true, colSpan: 1 },
      { key: "telephone", label: "Phone Number", placeholder: "+1-312-555-0199", required: true, colSpan: 1 },
      { key: "email", label: "Email Address", placeholder: "contact@acmeplumbingchicago.com", colSpan: 1 },
      { key: "priceRange", label: "Price Range", placeholder: "$$", colSpan: 1 },
      { key: "streetAddress", label: "Street Address", placeholder: "123 N Michigan Ave", colSpan: 2 },
      { key: "city", label: "City", placeholder: "Chicago", colSpan: 1 },
      { key: "state", label: "State (Abbr)", placeholder: "IL", colSpan: 1 },
      { key: "zip", label: "ZIP Code", placeholder: "60601", colSpan: 1 },
      { key: "openingHours", label: "Opening Hours", placeholder: "Mo-Fr 08:00-18:00", colSpan: 1 },
      { key: "image", label: "Business Logo / Image URL", placeholder: "https://acmeplumbingchicago.com/logo.png", colSpan: 2 },
      { key: "sameAs", label: "Social / GBP URLs (comma-separated)", placeholder: "https://facebook.com/acme, https://maps.google.com/...", colSpan: 2 },
    ],
  },
  {
    id: "law-firm",
    label: "Law Firm",
    icon: Scale,
    color: "#185FA5",
    bg: "#E6F1FB",
    desc: "For US attorneys, legal practices & law firms",
    fields: [
      { key: "name", label: "Law Firm Name", placeholder: "Smith & Sterling Law Firm", required: true, colSpan: 2 },
      { key: "description", label: "Firm Overview", placeholder: "Premier personal injury and criminal defense attorneys in Dallas, TX...", required: true, textarea: true, colSpan: 2 },
      { key: "url", label: "Website URL", placeholder: "https://smithsterlinglaw.com", required: true, colSpan: 1 },
      { key: "telephone", label: "Phone Number", placeholder: "+1-214-555-0144", required: true, colSpan: 1 },
      { key: "email", label: "Email", placeholder: "intake@smithsterlinglaw.com", colSpan: 1 },
      { key: "attorney", label: "Lead Attorney Name", placeholder: "Robert Smith, Esq.", colSpan: 1 },
      { key: "streetAddress", label: "Street Address", placeholder: "400 Main Street, Suite 500", colSpan: 2 },
      { key: "city", label: "City", placeholder: "Dallas", colSpan: 1 },
      { key: "state", label: "State (Abbr)", placeholder: "TX", colSpan: 1 },
      { key: "zip", label: "ZIP Code", placeholder: "75201", colSpan: 1 },
      { key: "practiceArea", label: "Practice Areas (comma-separated)", placeholder: "Personal Injury, Car Accidents, Wrongful Death", colSpan: 1 },
      { key: "image", label: "Firm Logo URL", placeholder: "https://smithsterlinglaw.com/logo.jpg", colSpan: 2 },
    ],
  },
  {
    id: "product",
    label: "Product",
    icon: ShoppingCart,
    color: "#0F6E56",
    bg: "#E1F5EE",
    desc: "For Shopify, WooCommerce & eCommerce products",
    fields: [
      { key: "name", label: "Product Name", placeholder: "UltraComfort Ergonomic Office Chair", required: true, colSpan: 2 },
      { key: "description", label: "Product Description", placeholder: "High-density foam ergonomic chair with lumbar support and adjustable armrests...", required: true, textarea: true, colSpan: 2 },
      { key: "brand", label: "Brand Name", placeholder: "ErgoPro USA", required: true, colSpan: 1 },
      { key: "sku", label: "SKU / Model Number", placeholder: "EP-CHAIR-BLK", required: true, colSpan: 1 },
      { key: "price", label: "Price", placeholder: "299.00", required: true, colSpan: 1 },
      { key: "currency", label: "Currency (e.g. USD)", placeholder: "USD", colSpan: 1 },
      { key: "availability", label: "Availability", placeholder: "InStock", colSpan: 1 },
      { key: "rating", label: "Average Rating (1-5)", placeholder: "4.9", colSpan: 1 },
      { key: "reviewCount", label: "Review Count", placeholder: "148", colSpan: 1 },
      { key: "url", label: "Product Page URL", placeholder: "https://ergopro.com/products/chair", colSpan: 1 },
      { key: "image", label: "Product Image URL", placeholder: "https://ergopro.com/images/chair.jpg", colSpan: 2 },
    ],
  },
  {
    id: "faq",
    label: "FAQ",
    icon: HelpCircle,
    color: "#854F0B",
    bg: "#FAEEDA",
    desc: "For FAQ sections, support pages & AI Overviews",
    fields: [
      { key: "faq1q", label: "Question 1", placeholder: "How long does local SEO take to produce results in the US?", required: true, colSpan: 2 },
      { key: "faq1a", label: "Answer 1", placeholder: "Most US businesses see initial rank improvements within 60 to 90 days...", required: true, textarea: true, colSpan: 2 },
      { key: "faq2q", label: "Question 2", placeholder: "What is the difference between LocalBusiness and LegalService schema?", colSpan: 2 },
      { key: "faq2a", label: "Answer 2", placeholder: "LegalService is a specialized subtype of LocalBusiness that includes...", textarea: true, colSpan: 2 },
      { key: "faq3q", label: "Question 3", placeholder: "Does schema markup guarantee Google rich results?", colSpan: 2 },
      { key: "faq3a", label: "Answer 3", placeholder: "No, schema makes your page eligible, but Google determines display based on quality...", textarea: true, colSpan: 2 },
      { key: "faq4q", label: "Question 4", placeholder: "Can I use multiple schema types on one page?", colSpan: 2 },
      { key: "faq4a", label: "Answer 4", placeholder: "Yes, you can combine multiple schemas via an @graph array or nested objects...", textarea: true, colSpan: 2 },
    ],
  },
  {
    id: "article",
    label: "Article / Blog",
    icon: FileText,
    color: "#534AB7",
    bg: "#EEEDFE",
    desc: "For blog posts, news & thought leadership",
    fields: [
      { key: "headline", label: "Article Headline", placeholder: "How to Build a High-Converting Law Firm Website in 2026", required: true, colSpan: 2 },
      { key: "description", label: "Summary / Excerpt", placeholder: "A step-by-step guide to client acquisition, technical SEO, and conversion optimization...", required: true, textarea: true, colSpan: 2 },
      { key: "author", label: "Author Name", placeholder: "Mubashar Sharif", required: true, colSpan: 1 },
      { key: "authorUrl", label: "Author Bio URL", placeholder: "https://searchprex.com/experts", colSpan: 1 },
      { key: "publishDate", label: "Publish Date (YYYY-MM-DD)", placeholder: "2026-06-15", colSpan: 1 },
      { key: "modifiedDate", label: "Last Modified Date (YYYY-MM-DD)", placeholder: "2026-06-18", colSpan: 1 },
      { key: "url", label: "Article URL", placeholder: "https://searchprex.com/blog/law-firm-seo", colSpan: 1 },
      { key: "publisher", label: "Publisher Name", placeholder: "SearchPrex", colSpan: 1 },
      { key: "image", label: "Featured Image URL", placeholder: "https://searchprex.com/images/blog-cover.jpg", colSpan: 1 },
      { key: "publisherLogo", label: "Publisher Logo URL", placeholder: "https://searchprex.com/logo.png", colSpan: 1 },
    ],
  },
  {
    id: "review",
    label: "Review / Rating",
    icon: Star,
    color: "#BA7517",
    bg: "#FAEEDA",
    desc: "For third-party reviews of products, books or software",
    fields: [
      { key: "itemName", label: "Item Being Reviewed", placeholder: "Sony WH-1000XM5 Wireless Headphones", required: true, colSpan: 2 },
      { key: "itemType", label: "Item Type", placeholder: "Product", colSpan: 1 },
      { key: "itemUrl", label: "Item Official URL", placeholder: "https://sony.com/headphones", colSpan: 1 },
      { key: "reviewAuthor", label: "Reviewer / Critic Name", placeholder: "Alex Johnson", required: true, colSpan: 1 },
      { key: "ratingValue", label: "Rating (1 to 5)", placeholder: "5", required: true, colSpan: 1 },
      { key: "datePublished", label: "Date Published (YYYY-MM-DD)", placeholder: "2026-05-10", colSpan: 1 },
      { key: "reviewBody", label: "Review Summary", placeholder: "Class-leading active noise cancellation, lightweight ergonomic fit, but lacks folding hinges...", required: true, textarea: true, colSpan: 2 },
    ],
  },
];

// ── Schema Generation Logic ─────────────────────────────────────────────
function generateSchema(type: string, data: Record<string, string>): string {
  switch (type) {
    case "local-business":
      return JSON.stringify(
        {
          "@context": "https://schema.org",
          "@type": "LocalBusiness",
          name: data.name || "",
          description: data.description || "",
          url: data.url || "",
          telephone: data.telephone || "",
          ...(data.email && { email: data.email }),
          ...(data.image && { image: data.image }),
          ...(data.priceRange && { priceRange: data.priceRange }),
          ...(data.openingHours && { openingHours: data.openingHours }),
          ...(data.sameAs && {
            sameAs: data.sameAs
              .split(",")
              .map((s) => s.trim())
              .filter(Boolean),
          }),
          address: {
            "@type": "PostalAddress",
            streetAddress: data.streetAddress || "",
            addressLocality: data.city || "",
            addressRegion: data.state || "",
            postalCode: data.zip || "",
            addressCountry: "US",
          },
        },
        null,
        2
      );

    case "law-firm":
      return JSON.stringify(
        {
          "@context": "https://schema.org",
          "@type": "LegalService",
          name: data.name || "",
          description: data.description || "",
          url: data.url || "",
          telephone: data.telephone || "",
          ...(data.email && { email: data.email }),
          ...(data.image && { image: data.image }),
          ...(data.city && { areaServed: data.state ? `${data.city}, ${data.state}` : data.city }),
          ...(data.practiceArea && {
            knowsAbout: data.practiceArea
              .split(",")
              .map((p) => p.trim())
              .filter(Boolean),
          }),
          ...(data.attorney && {
            employee: {
              "@type": "Person",
              name: data.attorney,
              jobTitle: "Attorney",
            },
          }),
          address: {
            "@type": "PostalAddress",
            streetAddress: data.streetAddress || "",
            addressLocality: data.city || "",
            addressRegion: data.state || "",
            postalCode: data.zip || "",
            addressCountry: "US",
          },
        },
        null,
        2
      );

    case "product":
      return JSON.stringify(
        {
          "@context": "https://schema.org",
          "@type": "Product",
          name: data.name || "",
          description: data.description || "",
          brand: { "@type": "Brand", name: data.brand || "" },
          sku: data.sku || "",
          ...(data.image && { image: data.image }),
          ...(data.url && { url: data.url }),
          offers: {
            "@type": "Offer",
            price: data.price || "",
            priceCurrency: data.currency || "USD",
            availability: `https://schema.org/${data.availability || "InStock"}`,
          },
          ...(data.rating &&
            data.reviewCount && {
              aggregateRating: {
                "@type": "AggregateRating",
                ratingValue: data.rating,
                reviewCount: data.reviewCount,
              },
            }),
        },
        null,
        2
      );

    case "faq": {
      const faqItems = [];
      for (let i = 1; i <= 4; i++) {
        if (data[`faq${i}q`] && data[`faq${i}a`]) {
          faqItems.push({
            "@type": "Question",
            name: data[`faq${i}q`],
            acceptedAnswer: {
              "@type": "Answer",
              text: data[`faq${i}a`],
            },
          });
        }
      }
      return JSON.stringify(
        {
          "@context": "https://schema.org",
          "@type": "FAQPage",
          mainEntity: faqItems,
        },
        null,
        2
      );
    }

    case "article":
      return JSON.stringify(
        {
          "@context": "https://schema.org",
          "@type": "Article",
          headline: data.headline || "",
          description: data.description || "",
          url: data.url || "",
          ...(data.image && { image: data.image }),
          ...(data.publishDate && { datePublished: data.publishDate }),
          ...(data.modifiedDate && { dateModified: data.modifiedDate }),
          author: {
            "@type": "Person",
            name: data.author || "",
            ...(data.authorUrl && { url: data.authorUrl }),
          },
          publisher: {
            "@type": "Organization",
            name: data.publisher || "",
            ...(data.publisherLogo && {
              logo: {
                "@type": "ImageObject",
                url: data.publisherLogo,
              },
            }),
          },
        },
        null,
        2
      );

    case "review":
      return JSON.stringify(
        {
          "@context": "https://schema.org",
          "@type": "Review",
          itemReviewed: {
            "@type": data.itemType || "Product",
            name: data.itemName || "",
            ...(data.itemUrl && { url: data.itemUrl }),
          },
          reviewBody: data.reviewBody || "",
          author: {
            "@type": "Person",
            name: data.reviewAuthor || "",
          },
          reviewRating: {
            "@type": "Rating",
            ratingValue: data.ratingValue || "5",
            bestRating: "5",
          },
          ...(data.datePublished && { datePublished: data.datePublished }),
        },
        null,
        2
      );

    default:
      return "{}";
  }
}

export default function SchemaGeneratorClient() {
  const [selectedType, setSelectedType] = useState("local-business");
  const [formData, setFormData] = useState<Record<string, string>>({});
  const [output, setOutput] = useState("");
  const [copied, setCopied] = useState(false);
  const [generated, setGenerated] = useState(false);

  const currentSchema = schemaTypes.find((s) => s.id === selectedType) || schemaTypes[0];

  const handleGenerate = () => {
    const schema = generateSchema(selectedType, formData);
    setOutput(schema);
    setGenerated(true);
  };

  const handleCopy = () => {
    navigator.clipboard.writeText(`<script type="application/ld+json">\n${output}\n</script>`);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleReset = () => {
    setFormData({});
    setOutput("");
    setGenerated(false);
  };

  return (
    <div className="w-full">
      {/* ── Main Tool Workspace ── */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        {/* LEFT COLUMN: Controls & Input Form (7 cols on lg) */}
        <div className="lg:col-span-7 space-y-6">
          {/* 1. Schema Type Selector */}
          <div className="bg-white rounded-2xl border border-[#e5e7eb] p-5 sm:p-6 shadow-sm">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-xs sm:text-sm font-bold text-[#0a0f2e] uppercase tracking-wider">
                1. Select Schema Type
              </h2>
              <span className="text-[11px] font-medium text-[#566070] bg-[#f8f9fc] px-2.5 py-1 rounded-full border border-[#e5e7eb]">
                Schema.org Standard
              </span>
            </div>

            <div className="grid grid-cols-2 sm:grid-cols-3 gap-2.5 sm:gap-3">
              {schemaTypes.map((type) => {
                const IconComponent = type.icon;
                const isSelected = selectedType === type.id;
                return (
                  <button
                    key={type.id}
                    type="button"
                    onClick={() => {
                      setSelectedType(type.id);
                      setFormData({});
                      setOutput("");
                      setGenerated(false);
                    }}
                    className={`flex flex-col items-center justify-center gap-2 p-3 rounded-xl border text-center transition-all min-h-[78px] ${
                      isSelected
                        ? "border-[#534AB7] bg-[#EEEDFE] shadow-sm ring-1 ring-[#534AB7]"
                        : "border-[#e5e7eb] bg-white hover:border-[#534AB7]/40 hover:bg-[#f8f9fc]"
                    }`}
                  >
                    <div
                      className="h-8 w-8 rounded-lg flex items-center justify-center shrink-0 transition-transform"
                      style={{ background: type.bg }}
                    >
                      <IconComponent className="h-4 w-4" style={{ color: type.color }} />
                    </div>
                    <span
                      className={`text-xs font-semibold leading-tight text-center break-words ${
                        isSelected ? "text-[#534AB7]" : "text-[#374151]"
                      }`}
                    >
                      {type.label}
                    </span>
                  </button>
                );
              })}
            </div>

            <div className="mt-4 pt-3.5 border-t border-[#f1f3f7] flex items-center gap-2 text-xs text-[#566070]">
              <CheckCircle className="h-4 w-4 text-emerald-600 shrink-0" />
              <span>{currentSchema.desc}</span>
            </div>
          </div>

          {/* 2. Dynamic Form Fields */}
          <div className="bg-white rounded-2xl border border-[#e5e7eb] p-5 sm:p-6 shadow-sm">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-xs sm:text-sm font-bold text-[#0a0f2e] uppercase tracking-wider">
                2. Fill in {currentSchema.label} Details
              </h2>
              <span className="text-[11px] text-[#566070]">
                <span className="text-red-500 font-bold">*</span> required
              </span>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5 sm:gap-4">
              {currentSchema.fields.map((field) => (
                <div
                  key={field.key}
                  className={field.colSpan === 2 || field.textarea ? "sm:col-span-2" : "sm:col-span-1"}
                >
                  <label className="block text-xs font-semibold text-[#374151] mb-1.5">
                    {field.label}
                    {field.required && <span className="text-red-500 ml-1">*</span>}
                  </label>
                  {field.textarea ? (
                    <textarea
                      rows={3}
                      value={formData[field.key] || ""}
                      onChange={(e) =>
                        setFormData((prev) => ({ ...prev, [field.key]: e.target.value }))
                      }
                      placeholder={field.placeholder}
                      className="w-full px-3 py-2.5 text-base sm:text-sm border border-[#e5e7eb] rounded-lg focus:outline-none focus:border-[#534AB7] focus:ring-2 focus:ring-[#534AB7]/10 transition-all text-[#0a0f2e] placeholder-[#94a3b8] resize-none bg-white"
                    />
                  ) : (
                    <input
                      type="text"
                      value={formData[field.key] || ""}
                      onChange={(e) =>
                        setFormData((prev) => ({ ...prev, [field.key]: e.target.value }))
                      }
                      placeholder={field.placeholder}
                      className="w-full px-3 py-2.5 text-base sm:text-sm border border-[#e5e7eb] rounded-lg focus:outline-none focus:border-[#534AB7] focus:ring-2 focus:ring-[#534AB7]/10 transition-all text-[#0a0f2e] placeholder-[#94a3b8] bg-white"
                    />
                  )}
                </div>
              ))}
            </div>

            {/* Action Buttons */}
            <div className="flex flex-col sm:flex-row gap-3 mt-6 pt-5 border-t border-[#f1f3f7]">
              <button
                type="button"
                onClick={handleGenerate}
                className="flex-1 flex items-center justify-center gap-2 bg-[#534AB7] hover:bg-[#3C3489] text-white font-bold py-3 px-5 rounded-xl transition-all shadow-sm hover:shadow text-sm active:scale-[0.99]"
              >
                <Zap className="h-4 w-4" />
                Generate JSON-LD Schema
              </button>
              {generated && (
                <button
                  type="button"
                  onClick={handleReset}
                  className="flex items-center justify-center gap-2 border border-[#e5e7eb] hover:border-[#0a0f2e] text-[#374151] hover:text-[#0a0f2e] font-semibold py-3 px-4 rounded-xl transition-all text-sm bg-white"
                >
                  <RefreshCw className="h-4 w-4" />
                  Reset
                </button>
              )}
            </div>
          </div>
        </div>

        {/* RIGHT COLUMN: Output, Copy & Verification (5 cols on lg) */}
        <div className="lg:col-span-5 space-y-6">
          {/* Generated Output Box */}
          <div className="bg-white rounded-2xl border border-[#e5e7eb] overflow-hidden shadow-sm flex flex-col">
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 px-4 sm:px-6 py-3.5 sm:py-4 border-b border-[#e5e7eb] bg-white">
              <div className="flex items-center gap-2">
                <Code2 className="h-4 w-4 text-[#534AB7]" />
                <h2 className="text-xs sm:text-sm font-bold text-[#0a0f2e] uppercase tracking-wider">
                  Generated JSON-LD
                </h2>
              </div>
              {output && (
                <div className="flex items-center gap-2">
                  <button
                    type="button"
                    onClick={handleCopy}
                    className={`flex items-center justify-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-bold transition-all ${
                      copied
                        ? "bg-emerald-50 text-emerald-700 border border-emerald-200"
                        : "bg-[#EEEDFE] text-[#534AB7] hover:bg-[#534AB7] hover:text-white"
                    }`}
                  >
                    {copied ? <CheckCircle className="h-3.5 w-3.5" /> : <Copy className="h-3.5 w-3.5" />}
                    {copied ? "Copied!" : "Copy Code"}
                  </button>
                  <a
                    href="https://search.google.com/test/rich-results"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1 px-2.5 py-1.5 rounded-lg text-xs font-semibold border border-[#e5e7eb] text-[#374151] hover:border-[#534AB7] hover:text-[#534AB7] transition-all bg-white"
                    title="Validate on Google Rich Results Test"
                  >
                    <ExternalLink className="h-3 w-3" />
                    <span className="hidden sm:inline">Test on Google</span>
                  </a>
                </div>
              )}
            </div>

            {output ? (
              <div className="relative">
                <pre className="p-4 sm:p-5 text-xs text-[#0a0f2e] bg-[#f8f9fc] overflow-x-auto leading-relaxed font-mono min-h-[300px] sm:min-h-[380px] max-h-[500px] overflow-y-auto">
                  {`<script type="application/ld+json">\n${output}\n</script>`}
                </pre>
              </div>
            ) : (
              <div className="flex flex-col items-center justify-center py-16 sm:py-20 px-4 sm:px-6 text-center min-h-[300px] sm:min-h-[380px]">
                <div className="h-14 w-14 rounded-2xl bg-[#EEEDFE] flex items-center justify-center mb-3">
                  <Code2 className="h-7 w-7 text-[#534AB7]" />
                </div>
                <p className="text-[#0a0f2e] font-bold text-sm sm:text-base mb-1">
                  Ready to generate your schema
                </p>
                <p className="text-[#566070] text-xs max-w-xs">
                  Select your schema type on the left, enter your details, and click &ldquo;Generate JSON-LD Schema&rdquo;.
                </p>
              </div>
            )}
          </div>

          {/* Quick Implementation Card */}
          <div className="bg-white rounded-2xl border border-[#e5e7eb] p-5 sm:p-6 shadow-sm">
            <h3 className="text-xs sm:text-sm font-bold text-[#0a0f2e] uppercase tracking-wider mb-3.5">
              Quick Implementation (4 Steps)
            </h3>
            <div className="space-y-3">
              {[
                { title: "Copy the Code", desc: "Click 'Copy Code' above with the script tags included." },
                { title: "Paste into HTML", desc: "Place it inside your <head> or right before the closing </body> tag." },
                { title: "Run Rich Results Test", desc: "Validate the live URL with Google's official testing tool." },
                { title: "Inspect in GSC", desc: "Check Search Console's Enhancement reports after Google crawls the page." },
              ].map((step, idx) => (
                <div key={step.title} className="flex items-start gap-3">
                  <div className="h-5 w-5 rounded-full bg-[#EEEDFE] text-[#534AB7] flex items-center justify-center text-[10px] font-bold shrink-0 mt-0.5">
                    {idx + 1}
                  </div>
                  <div>
                    <p className="text-xs font-bold text-[#0a0f2e]">{step.title}</p>
                    <p className="text-xs text-[#566070] leading-relaxed">{step.desc}</p>
                  </div>
                </div>
              ))}
            </div>

            <div className="mt-4 pt-3.5 border-t border-[#f1f3f7] flex items-center justify-between text-xs">
              <a
                href="https://search.google.com/test/rich-results"
                target="_blank"
                rel="noopener noreferrer"
                className="font-semibold text-[#534AB7] hover:underline flex items-center gap-1.5"
              >
                Google Rich Results Tool
                <ArrowRight className="h-3 w-3" />
              </a>
              <a
                href="https://validator.schema.org/"
                target="_blank"
                rel="noopener noreferrer"
                className="font-semibold text-[#566070] hover:text-[#0a0f2e] hover:underline flex items-center gap-1.5"
              >
                Schema.org Validator
                <ExternalLink className="h-3 w-3" />
              </a>
            </div>
          </div>

          {/* NicheSEO Pro Promo Banner */}
          <div className="bg-[#0a0f2e] rounded-2xl p-5 sm:p-6 text-white shadow-md">
            <div className="flex items-center gap-2 mb-2.5">
              <Sparkles className="h-4 w-4 text-[#534AB7]" />
              <span className="text-[11px] font-bold text-[#EEEDFE] uppercase tracking-wider">
                Automate Structured Data
              </span>
            </div>
            <h3 className="font-bold text-base text-white mb-2 leading-snug">
              Need Schema & Meta Tags Across 1,000+ Pages?
            </h3>
            <p className="text-slate-300 text-xs mb-4 leading-relaxed">
              Manually writing JSON-LD for every product or location page is slow. NicheSEO Pro audits thin content, optimizes title tags, and detects pages Google crawls without indexing.
            </p>
            <div className="space-y-2 mb-4">
              {[
                "Bulk product copy and meta tag optimization",
                "Identifies crawled but unindexed URL bloat",
                "Includes 3 free monthly deep site audits",
              ].map((feat) => (
                <div key={feat} className="flex items-center gap-2 text-xs text-slate-300">
                  <CheckCircle className="h-3.5 w-3.5 text-emerald-400 shrink-0" />
                  <span>{feat}</span>
                </div>
              ))}
            </div>
            <a
              href="https://nicheseopro.com/"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center justify-center gap-2 bg-[#534AB7] hover:bg-[#3C3489] text-white font-bold py-2.5 px-4 rounded-xl transition-all text-xs w-full text-center"
            >
              Explore NicheSEO Pro Free
              <ArrowRight className="h-3.5 w-3.5" />
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}
