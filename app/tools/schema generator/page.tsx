"use client";
 
import { useState } from "react";
import Link from "next/link";
import {
  Code2, Copy, CheckCircle, ChevronDown, Zap,
  Building2, Scale, ShoppingCart, HelpCircle,
  FileText, Star, ArrowRight, Sparkles, RefreshCw
} from "lucide-react";
 
// ── Schema Types ────────────────────────────────────────────────────────
const schemaTypes = [
  {
    id: "local-business",
    label: "Local Business",
    icon: Building2,
    color: "#534AB7",
    bg: "#EEEDFE",
    desc: "For any local service business",
    fields: [
      { key: "name", label: "Business Name", placeholder: "SearchPrex SEO Agency", required: true },
      { key: "description", label: "Description", placeholder: "Founder-led SEO agency specializing in...", required: true, textarea: true },
      { key: "url", label: "Website URL", placeholder: "https://searchprex.com", required: true },
      { key: "telephone", label: "Phone Number", placeholder: "+1-800-555-1234", required: true },
      { key: "email", label: "Email", placeholder: "contact@searchprex.com" },
      { key: "streetAddress", label: "Street Address", placeholder: "1250 Executive Place, Suite 450" },
      { key: "city", label: "City", placeholder: "Chicago" },
      { key: "state", label: "State", placeholder: "IL" },
      { key: "zip", label: "ZIP Code", placeholder: "60134" },
      { key: "priceRange", label: "Price Range", placeholder: "$$$$" },
      { key: "openingHours", label: "Opening Hours", placeholder: "Mon-Fri 09:00-18:00" },
    ],
  },
  {
    id: "law-firm",
    label: "Law Firm",
    icon: Scale,
    color: "#185FA5",
    bg: "#E6F1FB",
    desc: "For attorneys & law firms",
    fields: [
      { key: "name", label: "Law Firm Name", placeholder: "Smith & Associates Law Firm", required: true },
      { key: "description", label: "Description", placeholder: "Personal injury law firm serving Chicago...", required: true, textarea: true },
      { key: "url", label: "Website URL", placeholder: "https://smithlawfirm.com", required: true },
      { key: "telephone", label: "Phone Number", placeholder: "+1-312-555-0100", required: true },
      { key: "email", label: "Email", placeholder: "contact@smithlaw.com" },
      { key: "streetAddress", label: "Street Address", placeholder: "123 LaSalle Street" },
      { key: "city", label: "City", placeholder: "Chicago" },
      { key: "state", label: "State", placeholder: "IL" },
      { key: "zip", label: "ZIP Code", placeholder: "60601" },
      { key: "practiceArea", label: "Practice Area", placeholder: "Personal Injury, Family Law" },
      { key: "attorney", label: "Lead Attorney Name", placeholder: "John Smith, Esq." },
    ],
  },
  {
    id: "product",
    label: "Product",
    icon: ShoppingCart,
    color: "#0F6E56",
    bg: "#E1F5EE",
    desc: "For e-commerce product pages",
    fields: [
      { key: "name", label: "Product Name", placeholder: "CIVIVI Elementum Pocket Knife", required: true },
      { key: "description", label: "Description", placeholder: "Premium EDC pocket knife with D2 steel blade...", required: true, textarea: true },
      { key: "brand", label: "Brand", placeholder: "CIVIVI", required: true },
      { key: "sku", label: "SKU", placeholder: "C907A-1", required: true },
      { key: "price", label: "Price", placeholder: "49.99", required: true },
      { key: "currency", label: "Currency", placeholder: "USD" },
      { key: "availability", label: "Availability", placeholder: "InStock" },
      { key: "rating", label: "Average Rating", placeholder: "4.8" },
      { key: "reviewCount", label: "Review Count", placeholder: "247" },
      { key: "image", label: "Product Image URL", placeholder: "https://example.com/product.jpg" },
      { key: "url", label: "Product Page URL", placeholder: "https://smkstore.com/product/civivi-elementum" },
    ],
  },
  {
    id: "faq",
    label: "FAQ",
    icon: HelpCircle,
    color: "#854F0B",
    bg: "#FAEEDA",
    desc: "For FAQ sections — get rich results",
    fields: [
      { key: "faq1q", label: "Question 1", placeholder: "How long does SEO take to show results?", required: true },
      { key: "faq1a", label: "Answer 1", placeholder: "SEO typically shows meaningful results in 3-6 months...", required: true, textarea: true },
      { key: "faq2q", label: "Question 2", placeholder: "How much does SEO cost?" },
      { key: "faq2a", label: "Answer 2", placeholder: "SEO pricing varies based on...", textarea: true },
      { key: "faq3q", label: "Question 3", placeholder: "Do you guarantee rankings?" },
      { key: "faq3a", label: "Answer 3", placeholder: "We do not guarantee specific rankings...", textarea: true },
      { key: "faq4q", label: "Question 4", placeholder: "What industries do you serve?" },
      { key: "faq4a", label: "Answer 4", placeholder: "We specialize in law firms, ecommerce...", textarea: true },
    ],
  },
  {
    id: "article",
    label: "Article / Blog",
    icon: FileText,
    color: "#534AB7",
    bg: "#EEEDFE",
    desc: "For blog posts & articles",
    fields: [
      { key: "headline", label: "Article Title", placeholder: "Crawl Budget Optimization: The Complete 2026 Guide", required: true },
      { key: "description", label: "Description/Excerpt", placeholder: "If Google isn't crawling your pages, they won't rank...", required: true, textarea: true },
      { key: "author", label: "Author Name", placeholder: "Mubashar Shahzad", required: true },
      { key: "authorUrl", label: "Author Profile URL", placeholder: "https://searchprex.com/experts" },
      { key: "publishDate", label: "Publish Date", placeholder: "2026-05-20" },
      { key: "modifiedDate", label: "Last Modified Date", placeholder: "2026-05-20" },
      { key: "url", label: "Article URL", placeholder: "https://searchprex.com/blog/crawl-budget-guide" },
      { key: "image", label: "Featured Image URL", placeholder: "https://searchprex.com/blog/crawl-budget.jpg" },
      { key: "publisher", label: "Publisher Name", placeholder: "SearchPrex" },
      { key: "publisherLogo", label: "Publisher Logo URL", placeholder: "https://searchprex.com/logo.png" },
    ],
  },
  {
    id: "review",
    label: "Review / Rating",
    icon: Star,
    color: "#BA7517",
    bg: "#FAEEDA",
    desc: "For review/testimonial pages",
    fields: [
      { key: "itemName", label: "Item Being Reviewed", placeholder: "SearchPrex SEO Services", required: true },
      { key: "itemType", label: "Item Type", placeholder: "LocalBusiness" },
      { key: "reviewBody", label: "Review Text", placeholder: "SearchPrex transformed our law firm's online presence...", required: true, textarea: true },
      { key: "reviewAuthor", label: "Reviewer Name", placeholder: "John Smith", required: true },
      { key: "ratingValue", label: "Rating (1-5)", placeholder: "5", required: true },
      { key: "datePublished", label: "Date Published", placeholder: "2026-05-15" },
      { key: "itemUrl", label: "Item URL", placeholder: "https://searchprex.com" },
    ],
  },
];
 
// ── Schema Generators ────────────────────────────────────────────────────
function generateSchema(type: string, data: Record<string, string>): string {
  switch (type) {
    case "local-business":
      return JSON.stringify({
        "@context": "https://schema.org",
        "@type": "LocalBusiness",
        "name": data.name || "",
        "description": data.description || "",
        "url": data.url || "",
        "telephone": data.telephone || "",
        ...(data.email && { "email": data.email }),
        ...(data.priceRange && { "priceRange": data.priceRange }),
        ...(data.openingHours && { "openingHours": data.openingHours }),
        "address": {
          "@type": "PostalAddress",
          "streetAddress": data.streetAddress || "",
          "addressLocality": data.city || "",
          "addressRegion": data.state || "",
          "postalCode": data.zip || "",
          "addressCountry": "US"
        }
      }, null, 2);
 
    case "law-firm":
      return JSON.stringify({
        "@context": "https://schema.org",
        "@type": "LegalService",
        "name": data.name || "",
        "description": data.description || "",
        "url": data.url || "",
        "telephone": data.telephone || "",
        ...(data.email && { "email": data.email }),
        ...(data.practiceArea && { "areaServed": data.practiceArea }),
        ...(data.attorney && {
          "employee": {
            "@type": "Person",
            "name": data.attorney,
            "jobTitle": "Attorney"
          }
        }),
        "address": {
          "@type": "PostalAddress",
          "streetAddress": data.streetAddress || "",
          "addressLocality": data.city || "",
          "addressRegion": data.state || "",
          "postalCode": data.zip || "",
          "addressCountry": "US"
        }
      }, null, 2);
 
    case "product":
      return JSON.stringify({
        "@context": "https://schema.org",
        "@type": "Product",
        "name": data.name || "",
        "description": data.description || "",
        "brand": { "@type": "Brand", "name": data.brand || "" },
        "sku": data.sku || "",
        ...(data.image && { "image": data.image }),
        ...(data.url && { "url": data.url }),
        "offers": {
          "@type": "Offer",
          "price": data.price || "",
          "priceCurrency": data.currency || "USD",
          "availability": `https://schema.org/${data.availability || "InStock"}`
        },
        ...(data.rating && {
          "aggregateRating": {
            "@type": "AggregateRating",
            "ratingValue": data.rating,
            "reviewCount": data.reviewCount || "1"
          }
        })
      }, null, 2);
 
    case "faq":
      const faqItems = [];
      for (let i = 1; i <= 4; i++) {
        if (data[`faq${i}q`] && data[`faq${i}a`]) {
          faqItems.push({
            "@type": "Question",
            "name": data[`faq${i}q`],
            "acceptedAnswer": {
              "@type": "Answer",
              "text": data[`faq${i}a`]
            }
          });
        }
      }
      return JSON.stringify({
        "@context": "https://schema.org",
        "@type": "FAQPage",
        "mainEntity": faqItems
      }, null, 2);
 
    case "article":
      return JSON.stringify({
        "@context": "https://schema.org",
        "@type": "Article",
        "headline": data.headline || "",
        "description": data.description || "",
        "url": data.url || "",
        ...(data.image && { "image": data.image }),
        "datePublished": data.publishDate || new Date().toISOString().split("T")[0],
        "dateModified": data.modifiedDate || new Date().toISOString().split("T")[0],
        "author": {
          "@type": "Person",
          "name": data.author || "",
          ...(data.authorUrl && { "url": data.authorUrl })
        },
        "publisher": {
          "@type": "Organization",
          "name": data.publisher || "",
          ...(data.publisherLogo && {
            "logo": {
              "@type": "ImageObject",
              "url": data.publisherLogo
            }
          })
        }
      }, null, 2);
 
    case "review":
      return JSON.stringify({
        "@context": "https://schema.org",
        "@type": "Review",
        "itemReviewed": {
          "@type": data.itemType || "LocalBusiness",
          "name": data.itemName || "",
          ...(data.itemUrl && { "url": data.itemUrl })
        },
        "reviewBody": data.reviewBody || "",
        "author": {
          "@type": "Person",
          "name": data.reviewAuthor || ""
        },
        "reviewRating": {
          "@type": "Rating",
          "ratingValue": data.ratingValue || "5",
          "bestRating": "5"
        },
        "datePublished": data.datePublished || new Date().toISOString().split("T")[0]
      }, null, 2);
 
    default:
      return "{}";
  }
}
 
export default function SchemaGeneratorPage() {
  const [selectedType, setSelectedType] = useState("local-business");
  const [formData, setFormData] = useState<Record<string, string>>({});
  const [output, setOutput] = useState("");
  const [copied, setCopied] = useState(false);
  const [generated, setGenerated] = useState(false);
 
  const currentSchema = schemaTypes.find(s => s.id === selectedType)!;
 
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
    <main className="bg-[#f8f9fc] min-h-screen">
 
      {/* ── Hero ── */}
      <section className="bg-[#eeeef5] pt-28 pb-14 relative overflow-hidden">
        <div className="absolute inset-0 opacity-10" style={{
          backgroundImage: `radial-gradient(circle at 1px 1px, #4a6cf7 1px, transparent 0)`,
          backgroundSize: "40px 40px",
        }} />
        <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="flex items-center gap-2 mb-4">
            <Link href="/tools" className="text-blue-300 text-sm hover:text-white transition-colors">Tools</Link>
            <span className="text-blue-400/50">›</span>
            <span className="text-[#534AB7] text-sm font-semibold">Schema Generator</span>
          </div>
          <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-6">
            <div>
              <div className="inline-flex items-center gap-2 bg-[#EEEDFE]/20 border border-[#534AB7]/40 rounded-full px-4 py-2 mb-4">
                <Code2 className="h-3.5 w-3.5 text-[#534AB7]" />
                <span className="text-xs font-bold text-[#534AB7] uppercase tracking-widest">Free Tool</span>
              </div>
              <h1 className="text-4xl sm:text-5xl font-black text-white mb-3 leading-tight">
                Schema Markup <span className="text-[#534AB7]">Generator</span>
              </h1>
              <p className="text-blue-200 text-lg max-w-2xl">
                Generate JSON-LD schema markup instantly — Local Business, Law Firm, Product, FAQ, Article, and Review schemas. Free, no signup required.
              </p>
            </div>
            <div className="flex-shrink-0">
              <div className="bg-white/5 border border-white/10 rounded-2xl p-5 text-center">
                <p className="text-3xl font-black text-white mb-1">6</p>
                <p className="text-blue-300 text-xs">Schema types</p>
                <div className="w-px h-4 bg-white/20 mx-auto my-3" />
                <p className="text-3xl font-black text-white mb-1">100%</p>
                <p className="text-blue-300 text-xs">Free forever</p>
              </div>
            </div>
          </div>
        </div>
      </section>
 
      {/* ── Main Tool ── */}
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
 
          {/* LEFT: Input */}
          <div className="space-y-6">
 
            {/* Schema Type Selector */}
            <div className="bg-white rounded-2xl border border-[#e5e7eb] p-6">
              <h2 className="text-sm font-bold text-[#0a0f2e] uppercase tracking-widest mb-4">
                1. Select Schema Type
              </h2>
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
                {schemaTypes.map((type) => (
                  <button
                    key={type.id}
                    onClick={() => {
                      setSelectedType(type.id);
                      setFormData({});
                      setOutput("");
                      setGenerated(false);
                    }}
                    className={`flex flex-col items-center gap-2 p-3 rounded-xl border transition-all text-center
                      ${selectedType === type.id
                        ? "border-[#534AB7] bg-[#EEEDFE]"
                        : "border-[#e5e7eb] bg-white hover:border-[#534AB7]/40"
                      }`}
                  >
                    <div
                      className="h-9 w-9 rounded-lg flex items-center justify-center"
                      style={{ background: type.bg }}
                    >
                      <type.icon className="h-4 w-4" style={{ color: type.color }} />
                    </div>
                    <span className={`text-xs font-semibold leading-tight ${selectedType === type.id ? "text-[#534AB7]" : "text-[#374151]"}`}>
                      {type.label}
                    </span>
                  </button>
                ))}
              </div>
              <p className="text-xs text-[#64748b] mt-3 flex items-center gap-1.5">
                <CheckCircle className="h-3.5 w-3.5 text-emerald-500" />
                {currentSchema.desc}
              </p>
            </div>
 
            {/* Form Fields */}
            <div className="bg-white rounded-2xl border border-[#e5e7eb] p-6">
              <h2 className="text-sm font-bold text-[#0a0f2e] uppercase tracking-widest mb-4">
                2. Fill in Your Details
              </h2>
              <div className="space-y-4">
                {currentSchema.fields.map((field) => (
                  <div key={field.key}>
                    <label className="block text-xs font-semibold text-[#374151] mb-1.5">
                      {field.label}
                      {field.required && <span className="text-red-400 ml-1">*</span>}
                    </label>
                    {field.textarea ? (
                      <textarea
                        rows={3}
                        value={formData[field.key] || ""}
                        onChange={(e) => setFormData(prev => ({ ...prev, [field.key]: e.target.value }))}
                        placeholder={field.placeholder}
                        className="w-full px-3 py-2.5 text-sm border border-[#e5e7eb] rounded-lg focus:outline-none focus:border-[#534AB7] transition-colors text-[#374151] placeholder-[#94a3b8] resize-none"
                      />
                    ) : (
                      <input
                        type="text"
                        value={formData[field.key] || ""}
                        onChange={(e) => setFormData(prev => ({ ...prev, [field.key]: e.target.value }))}
                        placeholder={field.placeholder}
                        className="w-full px-3 py-2.5 text-sm border border-[#e5e7eb] rounded-lg focus:outline-none focus:border-[#534AB7] transition-colors text-[#374151] placeholder-[#94a3b8]"
                      />
                    )}
                  </div>
                ))}
              </div>
 
              {/* Generate Button */}
              <div className="flex gap-3 mt-6">
                <button
                  onClick={handleGenerate}
                  className="flex-1 flex items-center justify-center gap-2 bg-[#534AB7] hover:bg-[#3d35a0] text-white font-bold py-3 rounded-xl transition-colors text-sm"
                >
                  <Zap className="h-4 w-4" />
                  Generate Schema
                </button>
                {generated && (
                  <button
                    onClick={handleReset}
                    className="flex items-center gap-2 border border-[#e5e7eb] hover:border-[#0a0f2e] text-[#374151] font-semibold py-3 px-4 rounded-xl transition-colors text-sm"
                  >
                    <RefreshCw className="h-4 w-4" />
                    Reset
                  </button>
                )}
              </div>
            </div>
          </div>
 
          {/* RIGHT: Output */}
          <div className="space-y-6">
 
            {/* Output Box */}
            <div className="bg-white rounded-2xl border border-[#e5e7eb] overflow-hidden">
              <div className="flex items-center justify-between px-6 py-4 border-b border-[#e5e7eb]">
                <div className="flex items-center gap-2">
                  <Code2 className="h-4 w-4 text-[#534AB7]" />
                  <h2 className="text-sm font-bold text-[#0a0f2e] uppercase tracking-widest">
                    Generated JSON-LD
                  </h2>
                </div>
                {output && (
                  <button
                    onClick={handleCopy}
                    className={`flex items-center gap-2 px-4 py-2 rounded-lg text-xs font-bold transition-all ${
                      copied
                        ? "bg-emerald-50 text-emerald-700 border border-emerald-200"
                        : "bg-[#EEEDFE] text-[#534AB7] hover:bg-[#534AB7] hover:text-white"
                    }`}
                  >
                    {copied ? <CheckCircle className="h-3.5 w-3.5" /> : <Copy className="h-3.5 w-3.5" />}
                    {copied ? "Copied!" : "Copy with script tags"}
                  </button>
                )}
              </div>
 
              {output ? (
                <div className="relative">
                  <pre className="p-6 text-xs text-[#374151] bg-[#f8f9fc] overflow-x-auto leading-relaxed font-mono min-h-[400px] max-h-[600px] overflow-y-auto">
                    {`<script type="application/ld+json">\n${output}\n</script>`}
                  </pre>
                </div>
              ) : (
                <div className="flex flex-col items-center justify-center py-20 px-6 text-center min-h-[400px]">
                  <div className="h-16 w-16 rounded-2xl bg-[#EEEDFE] flex items-center justify-center mb-4">
                    <Code2 className="h-8 w-8 text-[#534AB7]" />
                  </div>
                  <p className="text-[#0a0f2e] font-bold mb-2">Schema code will appear here</p>
                  <p className="text-[#64748b] text-sm">Fill in your details and click "Generate Schema"</p>
                </div>
              )}
            </div>
 
            {/* How to Use */}
            {output && (
              <div className="bg-white rounded-2xl border border-[#e5e7eb] p-6">
                <h3 className="text-sm font-bold text-[#0a0f2e] mb-3">How to add this to your website</h3>
                <div className="space-y-3">
                  {[
                    "Copy the generated code above",
                    "Paste it inside your <head> tag or before </body>",
                    "Test it using Google's Rich Results Test tool",
                    "Submit updated URL to Google Search Console",
                  ].map((step, i) => (
                    <div key={i} className="flex items-start gap-3">
                      <div className="h-6 w-6 rounded-full bg-[#EEEDFE] flex items-center justify-center flex-shrink-0 mt-0.5">
                        <span className="text-[10px] font-bold text-[#534AB7]">{i + 1}</span>
                      </div>
                      <p className="text-sm text-[#64748b]">{step}</p>
                    </div>
                  ))}
                </div>
                <a
                  href="https://search.google.com/test/rich-results"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="mt-4 flex items-center gap-2 text-[#534AB7] text-sm font-semibold hover:underline"
                >
                  Test on Google Rich Results Tool
                  <ArrowRight className="h-3.5 w-3.5" />
                </a>
              </div>
            )}
 
            {/* NicheSEO Pro CTA */}
            <div className="bg-[#0a0f2e] rounded-2xl p-6">
              <div className="flex items-center gap-2 mb-3">
                <Sparkles className="h-4 w-4 text-[#534AB7]" />
                <span className="text-xs font-bold text-[#534AB7] uppercase tracking-widest">NicheSEO Pro</span>
              </div>
              <h3 className="text-white font-black text-lg mb-2">
                Need schema for 1,000+ pages?
              </h3>
              <p className="text-blue-300 text-sm mb-4 leading-relaxed">
                NicheSEO Pro generates schema markup in bulk — product pages, brand pages, blog posts — all at once. Plus GSC integration, content rewriting, and indexing automation.
              </p>
              <div className="space-y-2 mb-5">
                {[
                  "Bulk schema generation (1,000+ pages)",
                  "Auto-inject schema via script",
                  "GSC integration + indexing API",
                  "Content rewriting at scale",
                ].map((f) => (
                  <div key={f} className="flex items-center gap-2 text-xs text-blue-200">
                    <CheckCircle className="h-3.5 w-3.5 text-emerald-400 flex-shrink-0" />
                    {f}
                  </div>
                ))}
              </div>
              <Link
                href="/nicheseopro"
                className="flex items-center justify-center gap-2 bg-[#534AB7] hover:bg-[#3d35a0] text-white font-bold px-6 py-3 rounded-xl transition-colors text-sm w-full"
              >
                Try NicheSEO Pro Free
                <ArrowRight className="h-4 w-4" />
              </Link>
            </div>
 
          </div>
        </div>
 
        {/* ── Related Tools ── */}
        <div className="mt-12 border-t border-[#e5e7eb] pt-12">
          <h2 className="text-xl font-black text-[#0a0f2e] mb-6">More Free SEO Tools</h2>
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
            {[
              { label: "SERP Simulator", desc: "Preview Google listing", href: "/tools/serp-simulator", icon: "🔍", soon: true },
              { label: "Meta Tag Analyzer", desc: "Audit title & description", href: "/tools/meta-tag-analyzer", icon: "📊", soon: true },
              { label: "Robots.txt Tester", desc: "Check crawl rules", href: "/tools/robots-txt-tester", icon: "🤖", soon: true },
              { label: "Keyword Difficulty", desc: "Estimate KD score", href: "/tools/keyword-difficulty", icon: "📈", soon: true },
            ].map((tool) => (
              <div
                key={tool.label}
                className="bg-white border border-[#e5e7eb] rounded-xl p-4 relative"
              >
                {tool.soon && (
                  <span className="absolute top-3 right-3 text-[10px] font-bold bg-[#EEEDFE] text-[#534AB7] px-2 py-0.5 rounded-full">
                    Soon
                  </span>
                )}
                <div className="text-2xl mb-2">{tool.icon}</div>
                <p className="text-sm font-bold text-[#0a0f2e] mb-1">{tool.label}</p>
                <p className="text-xs text-[#64748b]">{tool.desc}</p>
              </div>
            ))}
          </div>
        </div>
 
      </div>
    </main>
  );
}
 