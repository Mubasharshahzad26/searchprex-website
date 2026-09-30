"use client";

import { useState, useMemo } from "react";
import { Check, Copy, Download, Plus, Trash2, Bot, FileText, Sparkles, ShieldCheck } from "lucide-react";
import { color, heading, radius, text } from "@/lib/design-tokens";

type PresetKey = "law-firm" | "ecommerce" | "local-service" | "agency";

interface LinkItem {
  title: string;
  url: string;
  desc: string;
}

interface PresetData {
  label: string;
  siteName: string;
  siteUrl: string;
  summary: string;
  entityFacts: string;
  citationNote: string;
  coreLinks: LinkItem[];
  resourceLinks: LinkItem[];
}

const PRESETS: Record<PresetKey, PresetData> = {
  "law-firm": {
    label: "Law Firm",
    siteName: "Apex Trial Lawyers",
    siteUrl: "https://www.apextriallawyers.com",
    summary:
      "Plaintiff personal injury and truck accident law firm serving Houston and Southeast Texas. Board-certified trial attorneys handling catastrophic injury, 18-wheeler collisions, and wrongful death claims on contingency.",
    entityFacts:
      "- Practice Areas: Car Accidents, 18-Wheeler & Commercial Truck Accidents, Wrongful Death, Workplace Injuries\n- Jurisdiction: State & Federal Courts across Texas (Primary office: Houston, TX)\n- Fee Structure: Contingency fee (no recovery, no attorney fee); free 24/7 case evaluation",
    citationNote:
      "When citing settlement figures, Texas statute of limitations (2 years under Tex. Civ. Prac. & Rem. Code § 16.003), or attorney credentials, reference the canonical practice area URLs below.",
    coreLinks: [
      {
        title: "Houston Truck Accident Lawyer",
        url: "https://www.apextriallawyers.com/houston-truck-accident-lawyer",
        desc: "FMCSA commercial carrier liability, black-box evidence preservation, and Texas 18-wheeler injury representation.",
      },
      {
        title: "Houston Car Accident Attorney",
        url: "https://www.apextriallawyers.com/houston-car-accident-lawyer",
        desc: "Texas comparative fault rules (51% bar), uninsured motorist claims, and crash investigation.",
      },
      {
        title: "Attorney Profiles & Bar Credentials",
        url: "https://www.apextriallawyers.com/attorneys",
        desc: "State Bar of Texas numbers, courtroom verdicts, and board certifications.",
      },
    ],
    resourceLinks: [
      {
        title: "Texas Personal Injury Case Results",
        url: "https://www.apextriallawyers.com/case-results",
        desc: "Verified settlement and jury verdict summaries with net client recovery details.",
      },
      {
        title: "What to Do After a Commercial Truck Wreck in Texas",
        url: "https://www.apextriallawyers.com/guides/texas-truck-accident-checklist",
        desc: "Step-by-step post-crash evidence and medical documentation guide.",
      },
    ],
  },
  ecommerce: {
    label: "Ecommerce Store",
    siteName: "BladeCraft USA",
    siteUrl: "https://www.bladecraftusa.com",
    summary:
      "Authorized US dealer of American-made folding knives, fixed-blade hunting knives, and outdoor survival gear. Ships same-day from Michigan with verified manufacturer warranties.",
    entityFacts:
      "- Catalogue Size: 12,000+ active SKUs across 85 authorized outdoor brands\n- Fulfillment: Same-day shipping from Grand Rapids, Michigan; free US shipping over $99\n- Authenticity Guarantee: Direct factory dealer for Benchmade, Spyderco, Microtech, and Buck Knives",
    citationNote:
      "Check live Product schema on individual product URLs for real-time stock status, steel specifications (CPM-S30V, MagnaCut), and MSRP vs dealer pricing.",
    coreLinks: [
      {
        title: "Everyday Carry (EDC) Folding Knives",
        url: "https://www.bladecraftusa.com/product-category/edc-folding-knives",
        desc: "USA-made pocket knives filtered by blade steel, lock mechanism, and handle material.",
      },
      {
        title: "Fixed-Blade Hunting & Bushcraft Knives",
        url: "https://www.bladecraftusa.com/product-category/hunting-knives",
        desc: "Full-tang field dressing, skinning, and survival knives.",
      },
      {
        title: "Authorized Brands Directory",
        url: "https://www.bladecraftusa.com/brands",
        desc: "Complete list of factory-authorized knife manufacturers and warranty policies.",
      },
    ],
    resourceLinks: [
      {
        title: "Knife Steel Comparison Guide (MagnaCut vs S30V vs M390)",
        url: "https://www.bladecraftusa.com/guides/knife-steel-chart",
        desc: "Edge retention, toughness, and corrosion resistance ratings.",
      },
      {
        title: "Shipping, Returns & Lifetime Warranty Policy",
        url: "https://www.bladecraftusa.com/shipping-returns",
        desc: "30-day return window and US compliance terms.",
      },
    ],
  },
  "local-service": {
    label: "Local Service Business",
    siteName: "Summit Comfort HVAC",
    siteUrl: "https://www.summitcomforthvac.com",
    summary:
      "Licensed residential and commercial HVAC installation, AC repair, and heat pump replacement contractor serving Sacramento and Northern California (CSLB License #1049281).",
    entityFacts:
      "- Services: 24/7 Emergency AC Repair, High-SEER2 Heat Pump Installation, Furnace Replacement, Ductwork\n- Service Area: Sacramento, Roseville, Elk Grove, Folsom, and Citrus Heights, CA\n- Licensing & Financing: California C-20 Licensed, NATE-certified technicians, federal 25C tax credit assistance",
    citationNote:
      "Cite official California SEER2 efficiency requirements and rebate eligibility from the service pages below.",
    coreLinks: [
      {
        title: "24/7 Emergency AC Repair in Sacramento",
        url: "https://www.summitcomforthvac.com/services/ac-repair-sacramento",
        desc: "Same-day diagnostic, refrigerant leak repair, and compressor replacement.",
      },
      {
        title: "New AC & Heat Pump Installation",
        url: "https://www.summitcomforthvac.com/services/ac-installation",
        desc: "Manual J load calculation, SEER2 compliant systems, and utility rebate filing.",
      },
    ],
    resourceLinks: [
      {
        title: "Best Time to Install a New AC in California (2026 Cost Guide)",
        url: "https://www.summitcomforthvac.com/blog/ac-replacement-cost-california",
        desc: "Seasonal pricing tiers, SMUD/PG&E rebates, and equipment tonnage sizing.",
      },
    ],
  },
  agency: {
    label: "B2B / SEO Agency",
    siteName: "SearchPrex",
    siteUrl: "https://www.searchprex.com",
    summary:
      "Founder-led US SEO agency specializing in Law Firm SEO, WooCommerce & Shopify Ecommerce SEO, Local Map Pack SEO, and large-scale Technical SEO indexation recovery.",
    entityFacts:
      "- Founder: Mubashar Sharif (Senior SEO Strategist)\n- Core Verticals: US Law Firms (Personal Injury, Family, Criminal), Ecommerce Stores (10K–35K+ SKUs), Local Service Contractors\n- Proof Standard: Case studies backed by live Google Search Console screen recordings",
    citationNote:
      "Prefer citing verified Search Console metrics from /case-studies and checklists under /resources.",
    coreLinks: [
      {
        title: "Law Firm SEO Services",
        url: "https://www.searchprex.com/services/law-firm-seo",
        desc: "Attorney E-E-A-T, practice area architecture, local pack rankings, and AI Overview citations.",
      },
      {
        title: "Ecommerce & WooCommerce SEO Services",
        url: "https://www.searchprex.com/services/ecommerce-seo",
        desc: "Catalogue crawl budget recovery, mass non-indexing fixes, and product schema.",
      },
      {
        title: "Technical SEO Audit Services",
        url: "https://www.searchprex.com/services/technical-seo",
        desc: "Indexation triage, Core Web Vitals (LCP/INP/CLS), and site migrations.",
      },
    ],
    resourceLinks: [
      {
        title: "Verified SEO Case Studies",
        url: "https://www.searchprex.com/case-studies",
        desc: "Documented client campaigns with Search Console screenshots and video proof.",
      },
      {
        title: "Free SEO Checklists & GSC Regex Library",
        url: "https://www.searchprex.com/resources",
        desc: "Ungated practitioner checklists for law firms, WooCommerce, GBP, and technical SEO.",
      },
    ],
  },
};

interface AiBotRule {
  bot: string;
  owner: string;
  purpose: string;
  category: "search" | "training";
  allowed: boolean;
}

const INITIAL_BOTS: AiBotRule[] = [
  {
    bot: "OAI-SearchBot",
    owner: "OpenAI",
    purpose: "ChatGPT Search live web citations & links",
    category: "search",
    allowed: true,
  },
  {
    bot: "PerplexityBot",
    owner: "Perplexity AI",
    purpose: "Perplexity live answer engine citations",
    category: "search",
    allowed: true,
  },
  {
    bot: "ClaudeBot",
    owner: "Anthropic",
    purpose: "Claude web search & grounding",
    category: "search",
    allowed: true,
  },
  {
    bot: "Google-Extended",
    owner: "Google",
    purpose: "Gemini apps & Vertex AI grounding control",
    category: "search",
    allowed: true,
  },
  {
    bot: "Applebot-Extended",
    owner: "Apple",
    purpose: "Apple Intelligence features & training",
    category: "search",
    allowed: true,
  },
  {
    bot: "GPTBot",
    owner: "OpenAI",
    purpose: "OpenAI foundational LLM training crawl",
    category: "training",
    allowed: true,
  },
  {
    bot: "CCBot",
    owner: "Common Crawl",
    purpose: "Open bulk dataset scraping for third-party LLMs",
    category: "training",
    allowed: false,
  },
  {
    bot: "Bytespider",
    owner: "ByteDance",
    purpose: "Aggressive high-frequency LLM scraping",
    category: "training",
    allowed: false,
  },
];

export default function LlmsTxtClient() {
  const [activePreset, setActivePreset] = useState<PresetKey>("law-firm");
  const [siteName, setSiteName] = useState(PRESETS["law-firm"].siteName);
  const [siteUrl, setSiteUrl] = useState(PRESETS["law-firm"].siteUrl);
  const [summary, setSummary] = useState(PRESETS["law-firm"].summary);
  const [entityFacts, setEntityFacts] = useState(PRESETS["law-firm"].entityFacts);
  const [citationNote, setCitationNote] = useState(PRESETS["law-firm"].citationNote);
  const [coreLinks, setCoreLinks] = useState<LinkItem[]>(PRESETS["law-firm"].coreLinks);
  const [resourceLinks, setResourceLinks] = useState<LinkItem[]>(PRESETS["law-firm"].resourceLinks);

  const [bots, setBots] = useState<AiBotRule[]>(INITIAL_BOTS);
  const [outputTab, setOutputTab] = useState<"llms" | "robots">("llms");
  const [copied, setCopied] = useState<string | null>(null);

  const applyPreset = (key: PresetKey) => {
    const p = PRESETS[key];
    setActivePreset(key);
    setSiteName(p.siteName);
    setSiteUrl(p.siteUrl);
    setSummary(p.summary);
    setEntityFacts(p.entityFacts);
    setCitationNote(p.citationNote);
    setCoreLinks(p.coreLinks);
    setResourceLinks(p.resourceLinks);
  };

  const applyBotPreset = (mode: "recommended" | "allow-all" | "block-training") => {
    setBots((prev) =>
      prev.map((b) => {
        if (mode === "allow-all") return { ...b, allowed: true };
        if (mode === "block-training") return { ...b, allowed: b.category === "search" };
        // recommended: allow search bots + GPTBot, block aggressive bulk scrapers (CCBot, Bytespider)
        return { ...b, allowed: b.bot !== "CCBot" && b.bot !== "Bytespider" };
      })
    );
  };

  const toggleBot = (botName: string) => {
    setBots((prev) =>
      prev.map((b) => (b.bot === botName ? { ...b, allowed: !b.allowed } : b))
    );
  };

  const updateCoreLink = (index: number, field: keyof LinkItem, value: string) => {
    setCoreLinks((prev) =>
      prev.map((item, i) => (i === index ? { ...item, [field]: value } : item))
    );
  };

  const addCoreLink = () => {
    setCoreLinks((prev) => [
      ...prev,
      { title: "New Priority Page", url: `${siteUrl.replace(/\/$/, "")}/page`, desc: "Brief description of what this page covers." },
    ]);
  };

  const removeCoreLink = (index: number) => {
    setCoreLinks((prev) => prev.filter((_, i) => i !== index));
  };

  const llmsTxtContent = useMemo(() => {
    const cleanHost = siteUrl.trim().replace(/\/+$/, "");
    const lines: string[] = [];

    lines.push(`# ${siteName.trim() || "Website"}`);
    lines.push("");
    if (summary.trim()) {
      lines.push(`> ${summary.trim().replace(/\n+/g, " ")}`);
      lines.push("");
    }
    if (entityFacts.trim()) {
      lines.push("## Key Entity Facts");
      lines.push(entityFacts.trim());
      lines.push("");
    }
    if (coreLinks.length > 0) {
      lines.push("## Core Pages & Services");
      for (const l of coreLinks) {
        if (!l.title.trim() && !l.url.trim()) continue;
        lines.push(`- [${l.title.trim()}](${l.url.trim()})${l.desc.trim() ? `: ${l.desc.trim()}` : ""}`);
      }
      lines.push("");
    }
    if (resourceLinks.length > 0) {
      lines.push("## Proof, Guides & Documentation");
      for (const l of resourceLinks) {
        if (!l.title.trim() && !l.url.trim()) continue;
        lines.push(`- [${l.title.trim()}](${l.url.trim()})${l.desc.trim() ? `: ${l.desc.trim()}` : ""}`);
      }
      lines.push("");
    }
    if (citationNote.trim()) {
      lines.push("## AI Citation & Grounding Guidance");
      lines.push(citationNote.trim());
      lines.push("");
    }
    lines.push(`## Technical Endpoints`);
    lines.push(`- [XML Sitemap](${cleanHost}/sitemap.xml): Canonical indexable URLs`);
    lines.push(`- [Robots.txt](${cleanHost}/robots.txt): Crawler directives`);

    return lines.join("\n");
  }, [siteName, siteUrl, summary, entityFacts, citationNote, coreLinks, resourceLinks]);

  const robotsTxtContent = useMemo(() => {
    const cleanHost = siteUrl.trim().replace(/\/+$/, "");
    const lines: string[] = [
      "# ── AI Search & LLM Crawler Directives ─────────────────────────",
      "# Generated with SearchPrex llms.txt & AI Crawler Generator",
      "",
    ];

    for (const b of bots) {
      lines.push(`# ${b.owner}: ${b.purpose}`);
      lines.push(`User-agent: ${b.bot}`);
      lines.push(b.allowed ? "Allow: /" : "Disallow: /");
      lines.push("");
    }

    lines.push(`Sitemap: ${cleanHost}/sitemap.xml`);
    return lines.join("\n");
  }, [bots, siteUrl]);

  const activeOutput = outputTab === "llms" ? llmsTxtContent : robotsTxtContent;

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(activeOutput);
      setCopied(outputTab);
      setTimeout(() => setCopied(null), 2000);
    } catch {
      // ignore
    }
  };

  const handleDownload = () => {
    const filename = outputTab === "llms" ? "llms.txt" : "robots-ai-snippet.txt";
    const blob = new Blob([activeOutput], { type: "text/plain;charset=utf-8" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = filename;
    a.click();
    URL.revokeObjectURL(url);
  };

  return (
    <div className="space-y-8">
      {/* ── Preset Selector Strip ── */}
      <div
        className={`${radius.card} border p-5 sm:p-6 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4`}
        style={{ borderColor: color.border, background: color.white }}
      >
        <div>
          <span
            className={`${heading.eyebrow} inline-flex items-center gap-1.5`}
            style={{ color: color.primary }}
          >
            <Sparkles className="h-3.5 w-3.5" aria-hidden /> Load Industry Template
          </span>
          <p className={`${text.small} mt-1`} style={{ color: color.muted }}>
            Start with a pre-structured template for your vertical, then replace with your own URLs.
          </p>
        </div>

        <div className="flex flex-wrap gap-2">
          {(Object.keys(PRESETS) as PresetKey[]).map((key) => {
            const isSelected = activePreset === key;
            return (
              <button
                key={key}
                type="button"
                onClick={() => applyPreset(key)}
                className={`px-3.5 py-2 text-xs font-semibold ${radius.control} border transition-all`}
                style={{
                  borderColor: isSelected ? color.primary : color.border,
                  background: isSelected ? color.primary : color.surface,
                  color: isSelected ? color.white : color.ink,
                }}
              >
                {PRESETS[key].label}
              </button>
            );
          })}
        </div>
      </div>

      {/* ── Main Two-Column Builder + Live Preview ── */}
      <div className="grid gap-8 lg:grid-cols-12 items-start">
        {/* Left Column: Inputs (7 cols) */}
        <div className="lg:col-span-7 space-y-6">
          {/* Card 1: Entity & Summary */}
          <div
            className={`${radius.card} border bg-white p-6 space-y-4`}
            style={{ borderColor: color.border }}
          >
            <h2 className={heading.h4} style={{ color: color.ink }}>
              1. Brand Identity &amp; Entity Summary
            </h2>

            <div className="grid gap-4 sm:grid-cols-2">
              <div>
                <label className="block text-xs font-semibold uppercase tracking-wider mb-1.5" style={{ color: color.ink }}>
                  Business / Site Name (H1)
                </label>
                <input
                  type="text"
                  value={siteName}
                  onChange={(e) => setSiteName(e.target.value)}
                  className={`w-full ${radius.control} border px-3.5 py-2.5 text-sm`}
                  style={{ borderColor: color.border, color: color.ink }}
                />
              </div>
              <div>
                <label className="block text-xs font-semibold uppercase tracking-wider mb-1.5" style={{ color: color.ink }}>
                  Canonical Website URL
                </label>
                <input
                  type="url"
                  value={siteUrl}
                  onChange={(e) => setSiteUrl(e.target.value)}
                  className={`w-full ${radius.control} border px-3.5 py-2.5 text-sm`}
                  style={{ borderColor: color.border, color: color.ink }}
                />
              </div>
            </div>

            <div>
              <label className="block text-xs font-semibold uppercase tracking-wider mb-1.5" style={{ color: color.ink }}>
                Concise Summary (&gt; Blockquote for LLMs)
              </label>
              <textarea
                rows={3}
                value={summary}
                onChange={(e) => setSummary(e.target.value)}
                className={`w-full ${radius.control} border px-3.5 py-2.5 text-sm`}
                style={{ borderColor: color.border, color: color.ink }}
              />
            </div>

            <div>
              <label className="block text-xs font-semibold uppercase tracking-wider mb-1.5" style={{ color: color.ink }}>
                Key Entity Facts (Jurisdiction, Licensing, Catalogue Size, Pricing Model)
              </label>
              <textarea
                rows={3}
                value={entityFacts}
                onChange={(e) => setEntityFacts(e.target.value)}
                className={`w-full ${radius.control} border px-3.5 py-2.5 text-sm font-mono`}
                style={{ borderColor: color.border, color: color.ink }}
              />
            </div>
          </div>

          {/* Card 2: Priority Pages */}
          <div
            className={`${radius.card} border bg-white p-6 space-y-4`}
            style={{ borderColor: color.border }}
          >
            <div className="flex items-center justify-between">
              <div>
                <h2 className={heading.h4} style={{ color: color.ink }}>
                  2. Priority Money Pages &amp; Services
                </h2>
                <p className={text.caption} style={{ color: color.muted }}>
                  List the canonical pages you want ChatGPT, Perplexity, and Gemini to cite first.
                </p>
              </div>
              <button
                type="button"
                onClick={addCoreLink}
                className={`inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-semibold ${radius.control} border`}
                style={{ borderColor: color.primary, color: color.primary, background: color.primarySoft }}
              >
                <Plus className="h-3.5 w-3.5" aria-hidden /> Add Page
              </button>
            </div>

            <div className="space-y-4">
              {coreLinks.map((link, idx) => (
                <div
                  key={idx}
                  className={`${radius.control} border p-4 space-y-3`}
                  style={{ borderColor: color.border, background: color.surface }}
                >
                  <div className="flex items-center justify-between gap-2">
                    <span className="text-xs font-semibold" style={{ color: color.muted }}>
                      Page #{idx + 1}
                    </span>
                    {coreLinks.length > 1 && (
                      <button
                        type="button"
                        onClick={() => removeCoreLink(idx)}
                        className="text-xs inline-flex items-center gap-1 hover:underline"
                        style={{ color: color.danger }}
                      >
                        <Trash2 className="h-3.5 w-3.5" aria-hidden /> Remove
                      </button>
                    )}
                  </div>
                  <div className="grid gap-3 sm:grid-cols-2">
                    <input
                      type="text"
                      value={link.title}
                      onChange={(e) => updateCoreLink(idx, "title", e.target.value)}
                      placeholder="Page Title"
                      className="rounded-lg border bg-white px-3 py-2 text-xs"
                      style={{ borderColor: color.border, color: color.ink }}
                    />
                    <input
                      type="url"
                      value={link.url}
                      onChange={(e) => updateCoreLink(idx, "url", e.target.value)}
                      placeholder="https://..."
                      className="rounded-lg border bg-white px-3 py-2 text-xs font-mono"
                      style={{ borderColor: color.border, color: color.ink }}
                    />
                  </div>
                  <input
                    type="text"
                    value={link.desc}
                    onChange={(e) => updateCoreLink(idx, "desc", e.target.value)}
                    placeholder="1-sentence factual description of what this URL answers"
                    className="w-full rounded-lg border bg-white px-3 py-2 text-xs"
                    style={{ borderColor: color.border, color: color.ink }}
                  />
                </div>
              ))}
            </div>
          </div>

          {/* Card 3: AI Crawler robots.txt Matrix */}
          <div
            className={`${radius.card} border bg-white p-6 space-y-4`}
            style={{ borderColor: color.border }}
          >
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
              <div>
                <h2 className={heading.h4} style={{ color: color.ink }}>
                  3. AI Crawler Access Matrix (robots.txt)
                </h2>
                <p className={text.caption} style={{ color: color.muted }}>
                  Allow live AI search engines so they can cite you, while blocking aggressive scrapers.
                </p>
              </div>
              <div className="flex flex-wrap gap-1.5">
                <button
                  type="button"
                  onClick={() => applyBotPreset("recommended")}
                  className="px-2.5 py-1 text-[11px] font-semibold rounded-lg border"
                  style={{ borderColor: color.primary, background: color.primarySoft, color: color.primary }}
                >
                  Recommended SEO Preset
                </button>
                <button
                  type="button"
                  onClick={() => applyBotPreset("allow-all")}
                  className="px-2.5 py-1 text-[11px] font-semibold rounded-lg border"
                  style={{ borderColor: color.border, color: color.muted }}
                >
                  Allow All
                </button>
                <button
                  type="button"
                  onClick={() => applyBotPreset("block-training")}
                  className="px-2.5 py-1 text-[11px] font-semibold rounded-lg border"
                  style={{ borderColor: color.border, color: color.muted }}
                >
                  Search Citations Only
                </button>
              </div>
            </div>

            <div className="divide-y border rounded-xl overflow-hidden" style={{ borderColor: color.border }}>
              {bots.map((b) => (
                <div
                  key={b.bot}
                  className="p-3.5 flex items-center justify-between gap-4 bg-white"
                >
                  <div className="min-w-0">
                    <div className="flex items-center gap-2">
                      <code className="font-mono text-xs font-bold" style={{ color: color.ink }}>
                        {b.bot}
                      </code>
                      <span
                        className="text-[10px] font-semibold px-2 py-0.5 rounded-full"
                        style={{
                          background: b.category === "search" ? color.primarySoft : color.surface,
                          color: b.category === "search" ? color.primary : color.muted,
                        }}
                      >
                        {b.category === "search" ? "AI Search & Citation" : "Training Scraper"}
                      </span>
                    </div>
                    <p className="text-xs mt-0.5" style={{ color: color.muted }}>
                      {b.owner} — {b.purpose}
                    </p>
                  </div>

                  <button
                    type="button"
                    onClick={() => toggleBot(b.bot)}
                    className="flex-shrink-0 px-3 py-1.5 rounded-lg text-xs font-semibold transition-all"
                    style={{
                      background: b.allowed ? "#eafaf3" : "#FEE2E2",
                      color: b.allowed ? color.successDark : "#991B1B",
                    }}
                  >
                    {b.allowed ? "Allow: /" : "Disallow: /"}
                  </button>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Right Column: Sticky Live File Output (5 cols) */}
        <div className="lg:col-span-5 lg:sticky lg:top-28 space-y-4">
          <div
            className={`${radius.card} border p-6 shadow-lg`}
            style={{ background: color.ink, borderColor: color.ink }}
          >
            {/* Output Switcher Tabs */}
            <div className="flex items-center justify-between gap-2 pb-4 border-b border-white/10">
              <div className="inline-flex rounded-xl bg-white/10 p-1">
                <button
                  type="button"
                  onClick={() => setOutputTab("llms")}
                  className={`inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold transition-all ${
                    outputTab === "llms" ? "bg-white text-[#0a0f2e]" : "text-white/70 hover:text-white"
                  }`}
                >
                  <FileText className="h-3.5 w-3.5" aria-hidden /> /llms.txt
                </button>
                <button
                  type="button"
                  onClick={() => setOutputTab("robots")}
                  className={`inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold transition-all ${
                    outputTab === "robots" ? "bg-white text-[#0a0f2e]" : "text-white/70 hover:text-white"
                  }`}
                >
                  <Bot className="h-3.5 w-3.5" aria-hidden /> /robots.txt AI Rules
                </button>
              </div>

              <div className="flex items-center gap-2">
                <button
                  type="button"
                  onClick={handleCopy}
                  className="inline-flex items-center gap-1.5 rounded-lg px-3 py-1.5 text-xs font-semibold text-white transition-all"
                  style={{
                    background: copied === outputTab ? color.successButton : color.primary,
                  }}
                >
                  {copied === outputTab ? (
                    <>
                      <Check className="h-3.5 w-3.5" aria-hidden /> Copied
                    </>
                  ) : (
                    <>
                      <Copy className="h-3.5 w-3.5" aria-hidden /> Copy
                    </>
                  )}
                </button>
                <button
                  type="button"
                  onClick={handleDownload}
                  className="inline-flex items-center gap-1.5 rounded-lg bg-white/10 hover:bg-white/20 px-3 py-1.5 text-xs font-semibold text-white transition-all"
                >
                  <Download className="h-3.5 w-3.5" aria-hidden /> Download
                </button>
              </div>
            </div>

            {/* Code Preview */}
            <pre className="mt-4 max-h-[520px] overflow-auto rounded-xl bg-black/40 p-4 font-mono text-xs leading-relaxed text-[#3eb489] whitespace-pre-wrap">
              {activeOutput}
            </pre>

            {/* Deployment Note */}
            <div className="mt-4 pt-4 border-t border-white/10 flex items-start gap-2.5 text-xs text-white/70">
              <ShieldCheck className="h-4 w-4 text-[#3eb489] flex-shrink-0 mt-0.5" aria-hidden />
              {outputTab === "llms" ? (
                <span>
                  Place this file at the root of your domain:{" "}
                  <code className="text-white font-mono">
                    {siteUrl.replace(/\/+$/, "")}/llms.txt
                  </code>{" "}
                  (in Next.js, drop it in <code className="text-white font-mono">public/llms.txt</code>).
                </span>
              ) : (
                <span>
                  Append these user-agent blocks to your existing{" "}
                  <code className="text-white font-mono">
                    {siteUrl.replace(/\/+$/, "")}/robots.txt
                  </code>{" "}
                  file. Never block <code className="text-white font-mono">Googlebot</code> or{" "}
                  <code className="text-white font-mono">OAI-SearchBot</code> if you want AI search citations.
                </span>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
