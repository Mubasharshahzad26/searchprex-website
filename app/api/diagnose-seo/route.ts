import { NextResponse } from 'next/server';
import { generateWithPool } from '@/lib/gemini-pool';

export const runtime = 'nodejs';
export const dynamic = 'force-dynamic';
export const maxDuration = 60;

interface DiagnoseRequest {
  query?: string;
  selectedChips?: string[];
  city?: string;
  state?: string;
  county?: string;
  practiceArea?: string;
  serviceType?: "law-firm-seo" | "ecommerce-seo" | "local-seo" | "technical-seo";
}

export interface DiagnosticItem {
  n: string;
  why: string;
  fix: string;
  tool: string;
}

export interface DiagnoseResponse {
  items: DiagnosticItem[];
  recommendation: string;
  isAiGenerated: boolean;
}

const SERVICE_FALLBACK_RULES: Record<
  "law-firm-seo" | "ecommerce-seo" | "local-seo" | "technical-seo",
  Array<{ n: string; rx: RegExp; why: string; fix: string; tool: string }>
> = {
  "law-firm-seo": [
    {
      n: "High PPC Costs & Out-of-City Directory Dominance",
      rx: /ppc|ad|expensive|directory|avvo|findlaw|justia|traffic|lead/i,
      why: "US law firms in markets like Cleveland OH, Sugar Land TX, The Woodlands TX, and Detroit MI pay $180–$340 per click on Google Ads while national directories (Avvo, FindLaw, Justia) and out-of-county firms capture page-one organic searches because local sites lack court-specific practice silos.",
      fix: "Deploy dedicated practice-area and suburb silos (Personal Injury, Family Law & High-Asset Divorce, Criminal Defense, Estate Planning & Probate) anchored to local county courts (Cuyahoga Common Pleas, Fort Bend District Court, Montgomery County Conroe courts) with ABA Rule 7.1 compliant Attorney E-E-A-T credentials.",
      tool: "US Legal Silo & Court Entity Architecture",
    },
    {
      n: "Not Ranking in the Google Map Pack Top 3",
      rx: /map|pack|local|gbp|business profile|near me|suspension|call/i,
      why: "Generic 'Law firm' primary categories, inconsistent bar directory NAP citations, or virtual-office compliance gaps prevent your firm from entering the local 3-pack where 70%+ of urgent legal calls start.",
      fix: "Realign primary GBP categories to exact high-value practices ('Personal injury attorney', 'Family law attorney', 'Criminal justice attorney'), synchronize State Bar and legal directory citations, and implement a bar-compliant client review velocity routine.",
      tool: "Geo-Grid Map Pack & Bar Citation Suite",
    },
    {
      n: "Invisible in Google AI Overviews & ChatGPT Search",
      rx: /ai|chatgpt|overview|perplexity|gemini|citation|answer|geo|aeo/i,
      why: "Generative engines skip generic marketing copy. Without 45–60 word direct Answer Capsules under semantic H2 headings, statutory citations, and LegalService + FAQPage JSON-LD schema, AI models cite competitors instead.",
      fix: "Restructure practice pages with answer-first statutory summaries, verified attorney bylines, LegalService JSON-LD graphs, and an llms.txt entity map so ChatGPT, Perplexity, and Google AI Overviews name your firm.",
      tool: "Legal AEO / GEO & llms.txt Citation Engine",
    },
    {
      n: "Unqualified Leads & After-Hours Intake Leaks",
      rx: /intake|qualif|after hours|missed|phone|convert|case/i,
      why: "High-intent family law, criminal defense, and injury prospects search at night on mobile phones; slow mobile templates or unanswered voicemails send retainers directly to competing firms.",
      fix: "Deploy sub-second mobile practice templates, Whisper call attribution, and 24/7 AI intake qualification so every consultation request is captured and scored.",
      tool: "24/7 Legal Intake & Call Attribution Stack",
    },
  ],
  "ecommerce-seo": [
    {
      n: "Products Stuck in 'Crawled – Currently Not Indexed'",
      rx: /index|crawl|not indexed|product|sku|catalog|gsc|search console/i,
      why: "Googlebot crawls your Shopify or WooCommerce catalog but declines to keep thousands of product URLs due to manufacturer duplicate descriptions, thin templates, or missing price/availability signals.",
      fix: "Run daily Sitemap-to-GSC diffing to group unindexed SKUs by exclusion cause, deploy programmatic unique product HTML and specifications in measured batches, and re-verify indexation velocity.",
      tool: "Sitemap-to-GSC Diffing & Batch Indexer",
    },
    {
      n: "Faceted Navigation & Parameter Crawl Budget Waste",
      rx: /facet|filter|sort|parameter|crawl budget|duplicate|collection|shopify|woocommerce/i,
      why: "Color, size, price, and sort filter combinations generate tens of thousands of low-value URLs (or duplicate /collections/*/products/* paths on Shopify) that exhaust Googlebot's rendering budget.",
      fix: "Enforce strict canonical tag rules, block non-commercial filter parameters via robots.txt and meta robots, and consolidate link equity into revenue-generating category and product canonicals.",
      tool: "Faceted Navigation & Crawl Budget Firewall",
    },
    {
      n: "Thin Category Pages Losing to Big-Box Retailers",
      rx: /category|collection|rank|traffic|competitor|amazon|revenue|cac/i,
      why: "A bare product grid with a single H1 gives Google and AI shopping assistants zero semantic context to rank your store for commercial buying queries.",
      fix: "Upgrade commercial collection templates with 50-word Answer Capsules, buyer comparison matrices, internal SKU clusters, and commercial FAQPage schema.",
      tool: "Commercial Category Authority Builder",
    },
    {
      n: "Missing Merchant Return Policy & Rich Product Schema",
      rx: /schema|merchant|rich|snippet|review|star|price|ai|chatgpt/i,
      why: "Incomplete Product, Offer, AggregateRating, and MerchantReturnPolicy JSON-LD prevents your store from earning price/stock rich results and AI Overview shopping citations.",
      fix: "Bind dynamic JSON-LD Product, Offer, and MerchantReturnPolicy schema directly to live store inventory data so Google Merchant Center and AI engines display verified pricing and stock.",
      tool: "Dynamic Ecommerce JSON-LD & GMC Validator",
    },
  ],
  "local-seo": [
    {
      n: "Buried Below the Google Map Pack Top 3",
      rx: /map|pack|top 3|near me|rank|local|call|competitor/i,
      why: "When US homeowners search 'near me' in markets like Cleveland OH, Sugar Land TX, The Woodlands TX, Detroit MI, or Tempe AZ, over 70% call the top 3 Map Pack results. Wrong primary categories and stale reviews keep your vans idle.",
      fix: "Align primary and secondary GBP categories against the top 3 map leaders, build hyper-local service-area pages for every city and suburb you serve, and launch a compliant customer review velocity system.",
      tool: "US Metro & Suburb Map Pack Accelerator",
    },
    {
      n: "Google Business Profile Suspension or Verification Lock",
      rx: /suspend|suspension|verify|video|disabled|edit|nap|address/i,
      why: "Service-area businesses and multi-location operators get flagged by Google's automated enforcement for address mismatches, virtual office violations, or unverified suggested edits.",
      fix: "Audit GBP guidelines compliance, synchronize website NAP and operating hours with official utility/registration records, and prepare a complete reinstatement and video-verification evidence package.",
      tool: "GBP Reinstatement & Entity Defense Protocol",
    },
    {
      n: "Missing Suburb & Service-Area Landing Pages",
      rx: /suburb|city|service area|page|location|radius|proximity/i,
      why: "A single homepage cannot rank across 10 surrounding suburbs. Without dedicated, genuinely local service-area pages, proximity compression restricts your visibility to a 2-mile radius.",
      fix: "Build distinct, non-templated city and suburb pages featuring local job proof, municipal code familiarity, and internal links back to your core trade services.",
      tool: "Suburban Service-Area Silo Engine",
    },
    {
      n: "Invisible in Local Google AI Overviews & Voice/AI Search",
      rx: /ai|overview|chatgpt|perplexity|voice|cite|named/i,
      why: "Google AI Overviews now sit above the Map Pack for local cost and contractor queries. Sites without clear pricing capsules, LocalBusiness schema, and third-party citation consensus get skipped.",
      fix: "Inject 45–60 word local Answer Capsules under H2s, deploy LocalBusiness + Service JSON-LD, and align Yelp, BBB, Apple Maps, and trade directory signals.",
      tool: "Local AI Overview Citation Suite",
    },
  ],
  "technical-seo": [
    {
      n: "Mass Pages in 'Crawled' or 'Discovered – Currently Not Indexed'",
      rx: /crawled|discovered|not indexed|index|drop|de-index|gsc/i,
      why: "Google either fetched your pages and judged the template too thin/duplicate to store, or exhausted crawl budget on junk URLs before reaching your core revenue pages.",
      fix: "Audit Google Search Console Pages exports by template, prune parameter bloat, repair internal orphan paths, upgrade template information gain, and execute batch recrawl verification.",
      tool: "Template-Level Indexation Recovery Engine",
    },
    {
      n: "Failing Core Web Vitals (INP, LCP, CLS) on Real Chrome Users",
      rx: /cwv|core web vitals|inp|lcp|cls|speed|slow|render/i,
      why: "Heavy third-party scripts, unoptimized hydration, and layout shifts fail Chrome User Experience Report (CrUX) thresholds—hurting both organic rankings and mobile conversion rates.",
      fix: "Defer non-critical main-thread JavaScript for sub-200ms INP, implement Speculative Rules API prerendering,preload hero LCP assets, and lock layout containers at the template level.",
      tool: "CrUX & INP Template Optimization Suite",
    },
    {
      n: "Broken Canonicals, Redirect Chains & Post-Migration Traffic Drops",
      rx: /canonical|redirect|migration|404|duplicate|traffic drop|architecture/i,
      why: "Conflicting canonical tags, multi-hop redirect chains, or unmapped URL changes during a site redesign split link equity and force Google to drop historical rankings.",
      fix: "Execute a full screaming-frog and server-log crawl, collapse redirect chains to single 301 hops, enforce strict self-referencing canonicals, and restore internal link depth.",
      tool: "Crawl Architecture & Migration Recovery Suite",
    },
    {
      n: "AI Crawlers (GPTBot, PerplexityBot) Blocked or Unable to Parse",
      rx: /ai|bot|gptbot|perplexity|llms|schema|json-ld|render/i,
      why: "AI answer engines have stricter timeout budgets than Googlebot and cannot parse client-side-only JavaScript or unstructured pages without clean JSON-LD graphs and an llms.txt index.",
      fix: "Ensure server-side HTML rendering for all primary content, deploy validated @graph JSON-LD schema (Service, Product, FAQPage, Organization), and configure robots.txt + llms.txt for AI crawlers.",
      tool: "AI Crawler Rendering & Schema Graph Suite",
    },
  ],
};

// Deterministic baseline library tailored to Ohio & Cuyahoga County legal markets
const FALLBACK_RULES: Array<{
  n: string;
  rx: RegExp;
  why: string;
  fix: string;
  tool: string;
}> = [
  {
    n: "Traffic is low or not growing",
    rx: /traffic|visitor|clicks|low traffic|stagnant/i,
    why: "Practice pages are thin or missing, suburban intent (Lakewood, Parma, Westlake) is neglected, or multiple pages cannibalize the same high-intent Cuyahoga County terms.",
    fix: "A technical crawl and indexing audit, dedicated suburb-silo architecture, and distinct practice-area landing pages for Cuyahoga County Court of Common Pleas jurisdictions.",
    tool: "Crawl & Indexing Monitor",
  },
  {
    n: "Low visibility on Google and AI",
    rx: /visib|invisible|not showing|\bai\b|chatgpt|gemini|overview|found|perplexity/i,
    why: "Weak entity grounding, absent LegalService and FAQPage JSON-LD schema, and copy that does not provide direct, answer-first solutions to legal questions.",
    fix: "Complete Google Business Profile tune-up, LegalService and FAQPage schema injection, an llms.txt protocol, and answer-first headers optimized for Google AI Overviews and Gemini citation.",
    tool: "AI Search & Citation Tracker",
  },
  {
    n: "Citations and mentions are not coming",
    rx: /citation|mention|cited|directory|backlink|authority|press/i,
    why: "Inconsistent NAP (Name, Address, Phone) data across Ohio legal directories, missing Cleveland Metropolitan Bar profiles, and zero local editorial backlink anchors.",
    fix: "Ohio Bar and legal directory audit, citation deduplication, and a localized outreach sprint to earn Cuyahoga County business and legal community mentions.",
    tool: "Citation & Mention Tracker",
  },
  {
    n: "Not ranking in the Map Pack",
    rx: /map|local|rank|pack|near me|3-pack|gmb/i,
    why: "Incorrect primary GBP categories, weak review velocity from local Cleveland clients, and lack of verified physical proximity signals for downtown and suburban courts.",
    fix: "GBP category realignment, automated compliant client review collection flow, court corridor geofencing, and geo-grid localized tracking across Cuyahoga County.",
    tool: "Local Rank Grid & Review Suite",
  },
  {
    n: "We target the wrong keywords",
    rx: /keyword|wrong|search term|intent|ranking for nothing/i,
    why: "Targeting vanity head terms held by national aggregators (Justia, Avvo) instead of high-intent Ohio procedural searches like 'Ohio BWC claim denied' or 'Cuyahoga Common Pleas lawsuit'.",
    fix: "Intent-first keyword mapping prioritizing procedural, statutory, and suburb-level queries that convert into consultations rather than passive research traffic.",
    tool: "Intent & Keyword Mapping Engine",
  },
  {
    n: "Leads are not qualified",
    rx: /lead|qualified|calls|consult|convert|unqualified|tire kicker|junk/i,
    why: "Pages attract non-actionable or out-of-jurisdiction traffic, phone numbers and contact forms lack source attribution, and intake doesn't pre-screen case criteria.",
    fix: "Case-type targeting with clear statutory filters, dynamic call tracking with Whisper screening, and automated lead scoring so only viable claims reach your partners.",
    tool: "Call Tracking & Lead Scoring Suite",
  },
  {
    n: "Intake is slow or leaking",
    rx: /intake|missed|follow|response|phone|receptionist|slow|leak/i,
    why: "Missed calls go to general voicemail without instant follow-up, and injured clients call the next firm within 5 minutes.",
    fix: "Instant missed-call text-back, CRM routing to on-call intake staff, automated intake form screening, and rapid consultation scheduling.",
    tool: "Intake Efficiency & Follow-Up Toolkit",
  },
];

export async function POST(req: Request) {
  let body: DiagnoseRequest;
  try {
    body = await req.json();
  } catch {
    return NextResponse.json({ error: 'Invalid JSON request' }, { status: 400 });
  }

  const query = (body.query || '').trim();
  const selectedChips = body.selectedChips || [];

  if (body.serviceType && SERVICE_FALLBACK_RULES[body.serviceType]) {
    const st = body.serviceType;
    const rules = SERVICE_FALLBACK_RULES[st];
    const combinedInput = `${query} ${selectedChips.join(' ')}`.trim();
    const matched = rules.filter((r) => r.rx.test(combinedInput));
    const finalFallback = (matched.length >= 2 ? matched : [...matched, ...rules.filter((r) => !matched.includes(r))]).slice(0, 3);

    try {
      const serviceLabels: Record<typeof st, string> = {
        "law-firm-seo": "US Law Firm SEO (Personal Injury, Family Law, Criminal Defense, Estate Planning, Workers' Comp across Cleveland OH, Sugar Land TX, The Woodlands TX, Detroit MI, Philadelphia PA, Tempe/Scottsdale AZ, San Jose CA, Baton Rouge/Shreveport LA, Albuquerque NM, and Kansas)",
        "ecommerce-seo": "US Ecommerce SEO for Shopify, WooCommerce & Custom Catalogs (Indexing Recovery, Faceted Navigation Crawl Budget, Product & Category Authority, MerchantReturnPolicy Schema, AI Shopping Overviews)",
        "local-seo": "US Local SEO & Google Business Profile Optimization (Map Pack Top 3, Multi-City Service-Area Suburb Pages, GBP Suspension Recovery, Local AI Overviews across TX, OH, MI, PA, AZ, CA, LA, NM, KS)",
        "technical-seo": "Technical SEO Audit & Template-Level Engineering (GSC Crawled/Discovered Not Indexed Recovery, Core Web Vitals INP/LCP/CLS, Crawl Budget, JSON-LD Schema Graphs & llms.txt for AI Crawlers)",
      };
      const svcPrompt = `You are Mubashar Sharif, CEO & Founder of SearchPrex (5+ years of hands-on SEO).
A US business owner or managing partner on our ${serviceLabels[st]} page submitted this diagnostic request:
User Problem Description: "${query || 'Needs predictable leads, rankings, and AI search citations without vanity metrics'}"
Selected Issue Chips: ${selectedChips.length > 0 ? selectedChips.join(', ') : 'None specified'}

Return a valid JSON object matching this exact schema:
{
  "items": [
    {
      "n": "Short Issue Title",
      "why": "Clear, specific root-cause diagnosis explaining why this bottleneck is costing them leads, cases, or revenue in the US market.",
      "fix": "SearchPrex's concrete, revenue-first engineering solution (mentioning answer-first AEO/GEO content, schema, GBP/indexing fixes, and weekly reporting).",
      "tool": "Specific SearchPrex software/methodology stack used"
    }
  ],
  "recommendation": "A direct, 1-2 sentence executive takeaway from Founder Mubashar Sharif explaining the first high-leverage fix we will execute during their 7-Day Free Trial."
}
Provide 2 to 3 highly tailored items. Output strictly JSON without markdown wrappers.`;

      const raw = await generateWithPool(svcPrompt, {
        temperature: 0.35,
        maxOutputTokens: 1600,
        json: true,
      });
      if (raw) {
        const cleaned = raw.trim().replace(/^```json\s*/i, '').replace(/```$/i, '').trim();
        const parsed = JSON.parse(cleaned);
        if (parsed.items && Array.isArray(parsed.items) && parsed.items.length > 0) {
          return NextResponse.json({
            items: parsed.items.slice(0, 3).map((item: any) => ({
              n: String(item.n || 'Diagnostic Finding'),
              why: String(item.why || ''),
              fix: String(item.fix || ''),
              tool: String(item.tool || 'SearchPrex Execution Stack'),
            })),
            recommendation: String(
              parsed.recommendation ||
                'Focus on fixing your highest-intent indexing and local entity gaps first—test our execution risk-free with our 7-Day Free Trial.'
            ),
            isAiGenerated: true,
          });
        }
      }
    } catch (err) {
      console.warn('[diagnose-seo] Service Gemini call fell back to deterministic rules:', (err as Error).message);
    }

    const defaultRecs: Record<typeof st, string> = {
      "law-firm-seo":
        "Stop overpaying for $250+ PPC clicks and directory leads—build county-court and suburb practice silos that earn Map Pack calls and AI Overview citations.",
      "ecommerce-seo":
        "Unblock 'Crawled – currently not indexed' product URLs and eliminate faceted parameter waste before spending another dollar on paid shopping ads.",
      "local-seo":
        "Align your primary Google Business Profile categories, build dedicated US suburb service-area pages, and secure top-3 Map Pack + AI Overview visibility.",
      "technical-seo":
        "Fix root-cause crawl budget, canonical, and Core Web Vitals (INP) bottlenecks at the template level so one deployment repairs thousands of URLs.",
    };

    return NextResponse.json({
      items: finalFallback,
      recommendation: defaultRecs[st],
      isAiGenerated: false,
    });
  }

  const city = body.city || 'The Woodlands';
  const state = body.state || (city.toLowerCase().includes('woodlands') || city.toLowerCase().includes('sugar') || city.toLowerCase().includes('katy') || city.toLowerCase().includes('denton') ? 'Texas' : city.toLowerCase().includes('albuquerque') ? 'New Mexico' : city.toLowerCase() === 'cleveland' ? 'Ohio' : 'Pennsylvania');
  const isWoodlands = city.toLowerCase().includes('woodlands');
  const isSugarLand = !isWoodlands && city.toLowerCase().includes('sugar');
  const isKaty = !isWoodlands && !isSugarLand && city.toLowerCase().includes('katy');
  const isDenton = !isWoodlands && !isSugarLand && !isKaty && city.toLowerCase().includes('denton');
  const isAlbuquerque = !isWoodlands && !isSugarLand && !isKaty && !isDenton && (city.toLowerCase().includes('albuquerque') || state.toLowerCase().includes('mexico'));
  const isPhilly = !isWoodlands && !isSugarLand && !isKaty && !isDenton && !isAlbuquerque && (city.toLowerCase().includes('phila') || state.toLowerCase().includes('penn'));
  const county = body.county || (isWoodlands ? 'Montgomery & Harris Counties' : isSugarLand ? 'Fort Bend County' : isKaty ? 'Harris, Fort Bend & Waller Counties' : isDenton ? 'Denton County' : isAlbuquerque ? 'Bernalillo County' : isPhilly ? 'Philadelphia County' : 'Cuyahoga County');

  if (!query && selectedChips.length === 0) {
    return NextResponse.json({
      items: [],
      recommendation: `Please enter a search query or select at least one issue chip to diagnose your ${city} legal practice SEO.`,
      isAiGenerated: false,
    });
  }

  // The Woodlands & Montgomery County fallback rules
  const WOODLANDS_FALLBACKS: Array<{
    n: string;
    rx: RegExp;
    why: string;
    fix: string;
    tool: string;
  }> = [
    {
      n: "Unincorporated Township & County Venue Split",
      rx: /township|unincorporated|conroe|montgomery|creekside|venue|jurisdiction|where to file/i,
      why: "The Woodlands is not an incorporated city. Over 90% is in Montgomery County (court in Conroe), while Creekside Park is in Harris County (court in downtown Houston). Generic Houston pages fail to guide searchers to the right bench.",
      fix: "Deploy Montgomery and Harris county venue guides detailing Conroe district court filing protocols and Creekside Park jurisdictional boundaries.",
      tool: "Montgomery & Harris Venue Silo Suite",
    },
    {
      n: "Village Search Intent Fragmentation",
      rx: /village|alden bridge|sterling ridge|creekside|cochran|panther creek|grogan/i,
      why: "Woodlands residents search by their specific village (Alden Bridge, Sterling Ridge, Creekside Park). When firms lump all queries onto a generic page, Google awards rankings to neighborhood-specific competitors.",
      fix: "Engineer dedicated village landing pages with authentic neighborhood boundaries, school district zoning (Conroe ISD vs Tomball ISD), and executive wealth topics.",
      tool: "Woodlands Village Indexer",
    },
    {
      n: "AI Search & Referral Network Invisibility",
      rx: /referral|word of mouth|ai|chatgpt|perplexity|ai overview|citation/i,
      why: "In an affluent referral-driven market like The Woodlands, prospective clients cross-reference personal attorney recommendations against Google AI Overviews and ChatGPT.",
      fix: "Author answer-first statutory content, deploy LegalService & FAQPage schemas, and publish an llms.txt file to secure generative AI recommendations.",
      tool: "AI Referral & Entity Citation Engine",
    },
    {
      n: "Overshadowed by North Houston & Mega-Firms",
      rx: /houston|mega|spring|outranked|competitor|big firm/i,
      why: "Regional Houston mega-firms dominate broad legal queries on domain authority, despite having no physical address or local community roots in The Woodlands.",
      fix: "Displace regional giants with hyper-local Woodlands Town Center entity signals, local court filing benchmarks, and verified client review workflows.",
      tool: "Local Entity Displacement Engine",
    },
    {
      n: "High-Asset Estate & Executive Wealth Intent Void",
      rx: /estate|trust|probate|executive|oil and gas|rsu|high asset|will|wealth/i,
      why: "With median household incomes exceeding $145k+, Woodlands residents seek counsel for corporate succession, Texas revocable living trusts, and muniment of title. Generic copy fails to earn their trust.",
      fix: "Deploy authoritative wealth preservation and Texas Estates Code silos addressing oil & gas royalties, business succession, and Conroe probate procedures.",
      tool: "Executive Estate & Asset Protection Suite",
    },
    {
      n: "Traffic is low or not growing",
      rx: /traffic|visitor|clicks|low traffic|stagnant/i,
      why: "Thin location pages fail to satisfy search intent for nuanced Texas estate, divorce, or commuter crash queries, suppressing organic reach.",
      fix: "Publish deep, answer-first practice silos with structured submarket linking and FAQPage schema.",
      tool: "Crawl Depth & Topical Authority Suite",
    },
    {
      n: "Intake Inefficiency & Slow Follow-Up",
      rx: /intake|lead|qualified|unqualified|calls|phone|slow/i,
      why: "Affluent executive searchers demand immediate, discrete follow-up; missed intake calls without immediate text-back go directly to competing firms.",
      fix: "Deploy Whisper call recording, automated confidential intake screening, and instant missed-call response.",
      tool: "Executive Intake & Lead Attribution Suite",
    },
  ];

  // Sugar Land & Fort Bend fallback rules
  const SUGAR_LAND_FALLBACKS: Array<{
    n: string;
    rx: RegExp;
    why: string;
    fix: string;
    tool: string;
  }> = [
    {
      n: "Trapped in Houston PPC Ad Auction",
      rx: /ppc|ad|auction|expensive|cpc|google ads|budget|overbilled/i,
      why: "Houston mega-firms bid Sugar Land and Fort Bend legal keywords up to $200-$350+ per click. Once ad budgets pause, inbound lead generation instantly vanishes.",
      fix: "Build compounding organic practice silos for Sugar Land and Fort Bend County that permanently capture local searchers without recurring per-click penalties.",
      tool: "Organic Practice Equity Engine",
    },
    {
      n: "High-Asset Divorce & Asset Division Intent Void",
      rx: /high asset|divorce|qdro|business valuation|stock|rsu|executive|prenup/i,
      why: "Sugar Land and First Colony households average $130k+ incomes with substantial retirement, executive stock, and corporate holdings. Generic family law copy fails to answer complex Texas community property and business valuation questions.",
      fix: "Deploy authoritative high-asset divorce practice hubs addressing QDROs, forensic business valuations, and premarital agreement enforceability under Texas Family Code.",
      tool: "High-Asset Intent Silo Suite",
    },
    {
      n: "Fort Bend County Court Jurisdiction Disconnect",
      rx: /fort bend|court|richmond|district court|venue|where to file/i,
      why: "Cases in Sugar Land are filed at the Fort Bend County Justice Center in Richmond, yet regional Houston competitors publish generic Harris County procedural copy.",
      fix: "Create Richmond court venue guides explaining Fort Bend district court filing timelines, local standing orders, and judicial procedures.",
      tool: "Fort Bend Venue Authority Suite",
    },
    {
      n: "Overshadowed by Houston Mega-Firms",
      rx: /houston|mega|outranked|competitor|downtown|galleria/i,
      why: "Downtown and Galleria Houston firms hold page one positions purely through legacy domain age, despite having no physical presence or localized content in Sugar Land.",
      fix: "Displace regional Houston firms using localized schema markup, verified Fort Bend entity signals, and neighborhood-specific pages (First Colony, Riverstone, Sweetwater).",
      tool: "Local Entity Displacement Suite",
    },
    {
      n: "Not Ranking in the Map Pack for Sugar Land & Suburbs",
      rx: /map|pack|local|near me|3-pack|gmb|google business/i,
      why: "Google Business Profiles fail to rank across nearby Missouri City, Stafford, and Richmond due to artificial proximity boundaries.",
      fix: "Calibrate GBP secondary legal categories, deploy localized review generation workflows, and build dedicated suburban landing pages.",
      tool: "Fort Bend Geo-Grid Tracker",
    },
    {
      n: "Traffic is low or not growing",
      rx: /traffic|visitor|clicks|low traffic|stagnant/i,
      why: "Thin practice pages fail to answer the detailed questions affluent Fort Bend searchers ask, leading to high bounce rates and poor indexation.",
      fix: "Deploy comprehensive, answer-first practice silos optimized for Google AI Overviews and traditional organic search.",
      tool: "Crawl & Content Depth Suite",
    },
    {
      n: "Intake Leaks & Unqualified Leads",
      rx: /intake|lead|qualified|unqualified|calls|phone|slow/i,
      why: "Inquiries from distant Harris County zip codes or small-claims inquiries waste attorney time without automated venue pre-qualification.",
      fix: "Implement Whisper call tracking, automated Fort Bend venue qualification, and instant missed-call SMS response.",
      tool: "Intake Routing & Qualification Suite",
    },
  ];

  // Katy tri-county fallback rules
  const KATY_FALLBACKS: Array<{
    n: string;
    rx: RegExp;
    why: string;
    fix: string;
    tool: string;
  }> = [
    {
      n: "Tri-County Venue Confusion",
      rx: /tri-county|county|venue|jurisdiction|harris|fort bend|waller|courthouse|richmond|hempstead|where to file/i,
      why: "Katy sits on the tri-border of Harris, Fort Bend, and Waller counties. Prospective clients do not know whether their case is heard in Houston, Richmond, or Hempstead, and generic Houston pages fail to clarify venue.",
      fix: "Architect dedicated county venue landing pages clarifying local filing rules (Tex. Fam. Code § 6.301 residency requirements, Richmond vs Houston vs Hempstead court procedures) to capture high-converting search intent.",
      tool: "Tri-County Venue & Practice Silo Suite",
    },
    {
      n: "Houston Mega-Firm Displacement",
      rx: /houston|mega|big firm|competitor|downtown|outranked/i,
      why: "Downtown Houston mega-firms hold broad organic rankings on generic domain authority, but lack authentic local signals for Katy, Cinco Ranch, and Fulshear.",
      fix: "Outrank downtown Houston giants with hyper-local Katy entity schemas, local court mileage benchmarks, and dedicated suburban silos that Google prioritizes for Katy IP addresses.",
      tool: "Local Entity Authority Engine",
    },
    {
      n: "Missing Master-Planned Communities (Cinco Ranch & Fulshear)",
      rx: /cinco ranch|fulshear|neighborhood|community|suburb|estate|divorce|high net|seven meadows|cross creek|firethorne/i,
      why: "High-net-worth clients in master-planned communities like Cinco Ranch ($120k+ median income) and Fulshear search by community name, but firms lump them into a generic Katy page.",
      fix: "Build dedicated community silos with unique localized content, school district geography, and asset division/probate intent for master-planned neighborhoods.",
      tool: "Master-Planned Submarket Indexer",
    },
    {
      n: "Commuter Highway Accident Corridors (I-10 & Grand Parkway)",
      rx: /highway|i-10|i10|grand parkway|sh 99|tollway|accident|crash|truck|westpark/i,
      why: "The I-10 Katy Freeway and SH 99 Grand Parkway see thousands of heavy commercial freight and commuter crashes weekly, but firms target generic 'car accident lawyer' terms instead of exact intersection searches.",
      fix: "Deploy accident corridor pages targeting 'truck accident lawyer I-10 Katy' and 'Grand Parkway crash attorney' with Texas DOT collision data and emergency response entity anchors.",
      tool: "Highway Crash Intent & Corridor Tracker",
    },
    {
      n: "Not ranking in the Map Pack",
      rx: /map|pack|local|near me|3-pack|gmb|google business/i,
      why: "Google Business Profiles located near the Grand Parkway or I-10 struggle to trigger across all three counties due to proximity drop-off past 5 miles.",
      fix: "Calibrate GBP secondary categories, launch automated client review collection from Katy residents, and syndicate verified geo-coordinates across local Texas directories.",
      tool: "Katy Geo-Grid Rank & Review Suite",
    },
    {
      n: "Traffic is low or not growing",
      rx: /traffic|visitor|clicks|low traffic|stagnant/i,
      why: "Houston firms absorb broad legal queries because your firm lacks localized topical authority across Katy, Cinco Ranch, and surrounding corridors.",
      fix: "Build answer-first legal silos with LegalService schema and llms.txt optimization to capture local organic searchers and Google AI Overviews.",
      tool: "Crawl & Topical Authority Suite",
    },
    {
      n: "Leads are not qualified or intake leaks",
      rx: /lead|qualified|unqualified|tire kicker|junk|calls|phone|slow|intake/i,
      why: "Receiving inquiries for distant courts in north Houston or unviable small claims without pre-intake venue filtering, leading to wasted consultation hours.",
      fix: "Implement Whisper call tracking, automated county jurisdiction pre-qualification, and instant missed-call SMS response.",
      tool: "Call Tracking & Venue Scoring Suite",
    },
  ];

  // Denton & Texas fallback rules
  const DENTON_FALLBACKS: Array<{
    n: string;
    rx: RegExp;
    why: string;
    fix: string;
    tool: string;
  }> = [
    {
      n: "Traffic is low or not growing",
      rx: /traffic|visitor|clicks|low traffic|stagnant/i,
      why: "Dallas-Fort Worth mega-firms sit above Denton practices on raw domain strength, while local Denton County searchers looking for courthouse and campus help bounce from generic Dallas pages.",
      fix: "Architect dedicated Denton County practice silos answering local procedural questions for UNT, TWU, and the Denton Courthouse-on-the-Square.",
      tool: "Crawl & Submarket Indexing Monitor",
    },
    {
      n: "UNT & TWU Student Demographic Void",
      rx: /student|college|unt|twu|campus|parent|worried|mip|possession/i,
      why: "Over 60,000 university students across UNT and TWU drive alcohol, minor in possession (MIP), and misdemeanors, where the actual searcher is often an anxious parent three hours away.",
      fix: "Deploy parent-targeted reassurance pages with remote consultation protocols and student defense silos addressing university disciplinary hearings.",
      tool: "Student & Parent Search Intent Engine",
    },
    {
      n: "DFW Mega-Firm Displacement",
      rx: /dfw|dallas|fort worth|mega|outranked|competitor|big firm/i,
      why: "Regional DFW firms hold page one rankings without a single sentence of genuine Denton County court or local municipal content.",
      fix: "Displace regional giants with hyper-local Denton court jurisdiction content, Denton County Bar Association alignment, and localized entity schema.",
      tool: "DFW Displacement & Geo-Entity Suite",
    },
    {
      n: "Low visibility on Google and AI",
      rx: /visib|invisible|not showing|\bai\b|chatgpt|gemini|overview|found|perplexity/i,
      why: "Missing LegalService JSON-LD schema, absent Texas statutory entity tags (Texas Penal Code, Property Code), and copy that does not provide direct, answer-first guidance.",
      fix: "Structured schema injection, answer-first headers optimized for Google AI Overviews and Gemini citation, and an llms.txt protocol.",
      tool: "AI Search & Citation Tracker",
    },
    {
      n: "Citations and mentions are not coming",
      rx: /citation|mention|cited|directory|backlink|authority|press/i,
      why: "Missing alignment with the Denton County Bar Association, inconsistent local NAP data, and zero Denton community backlink anchors.",
      fix: "Audit and build verified citations across Texas legal directories, local Denton business chambers, and community university networks.",
      tool: "Citation & Mention Tracker",
    },
    {
      n: "Not ranking in the Map Pack",
      rx: /map|local|rank|pack|near me|3-pack|gmb/i,
      why: "Google Map Pack treats Denton Square, Rayzor Ranch, Lewisville, and Flower Mound as distinct geo-grids with separate local pack results.",
      fix: "Calibrate primary GBP categories, localized photo geotagging, and compliant client review acquisition workflows.",
      tool: "Geo-Grid Local Rank Tracker",
    },
    {
      n: "Leads are not qualified",
      rx: /lead|qualified|calls|convert|unqualified|tire kicker|junk/i,
      why: "Inbound student inquiries lacking payment capacity or out-of-county calls with zero case viability filters.",
      fix: "Install Whisper call tracking with automated parental guarantor intake questions and case scoring filters.",
      tool: "Call Tracking & Lead Scoring Suite",
    },
    {
      n: "Intake is slow or leaking",
      rx: /intake|missed|follow|response|phone|receptionist|slow|leak/i,
      why: "Worried parents calling late at night after student arrests go directly to competitors if a phone call is missed without immediate response.",
      fix: "Deploy 24/7 automated missed-call instant text-back, after-hours intake routing, and mobile lead notifications.",
      tool: "24/7 Intake & Rapid Response Suite",
    },
  ];

  // Albuquerque & New Mexico fallback rules
  const ALBUQUERQUE_FALLBACKS: Array<{
    n: string;
    rx: RegExp;
    why: string;
    fix: string;
    tool: string;
  }> = [
    {
      n: "Traffic is low or not growing",
      rx: /traffic|visitor|clicks|low traffic|stagnant/i,
      why: "Albuquerque searchers in Nob Hill, Westside, Northeast Heights, and Rio Rancho search with specific municipal and suburban intent; single generic pages get outranked by national directories.",
      fix: "Build dedicated practice silos for Bernalillo County and Rio Rancho tied to Second Judicial District Court and Metropolitan Court procedures.",
      tool: "Crawl & Submarket Indexing Monitor",
    },
    {
      n: "Spanish Search Void (Bilingual Intent)",
      rx: /spanish|espanol|idioma|bilingual|latino|hispanic|mexic/i,
      why: "With a 49.8% Hispanic community across the Albuquerque metro, thousands of high-intent searches ('abogado de DWI', 'abogado de accidentes') are ignored by English-only competitor websites.",
      fix: "Deploy native-reviewed Spanish landing pages, proper hreflang tagging, and Spanish LegalService JSON-LD schema to capture untouched bilingual search demand.",
      tool: "Hispanic Search & Hreflang Engine",
    },
    {
      n: "Low visibility on Google and AI",
      rx: /visib|invisible|not showing|\bai\b|chatgpt|gemini|overview|found|perplexity/i,
      why: "Weak entity grounding, missing LegalService schema, and lack of answer-first New Mexico statutory explanations (pure comparative fault, 50/50 community property, mandatory ignition interlock).",
      fix: "Deploy structured LegalService schema, build answer-first practice guides cited by Google AI Overviews, and configure an llms.txt protocol.",
      tool: "Bilingual AI Citation & Search Tracker",
    },
    {
      n: "Citations and mentions are not coming",
      rx: /citation|mention|cited|directory|backlink|authority|press/i,
      why: "Missing alignment with the State Bar of New Mexico and Albuquerque Bar Association, inconsistent Bernalillo County NAP data, and zero local editorial backlink anchors.",
      fix: "Audit and build verified citations across New Mexico legal directories, local Hispanic business networks, and regional community entities.",
      tool: "Regional Citation & Mention Suite",
    },
    {
      n: "Not ranking in the Map Pack",
      rx: /map|local|rank|pack|near me|3-pack|gmb/i,
      why: "Google Map Pack treats Downtown Albuquerque, Westside, Northeast Heights, and Rio Rancho as distinct geo-grids with separate local 3-pack results.",
      fix: "Calibrate primary GBP categories, launch bilingual review acquisition workflows, and embed localized geo-signals for Metropolitan Court and Lomas Blvd legal corridor.",
      tool: "Geo-Grid Local Rank Tracker",
    },
    {
      n: "We target the wrong keywords",
      rx: /keyword|wrong|search term|intent|ranking for nothing/i,
      why: "Targeting high-difficulty vanity head terms dominated by national mass tort aggregators instead of urgent NM-specific queries ('abogado de DWI en Albuquerque', 'community property divorce NM', 'uninsured motorist claim Albuquerque').",
      fix: "Map intent-driven long-tail queries addressing New Mexico Tort Claims Act, MVD license revocation hearings, and Rio Rancho suburban intent.",
      tool: "Bilingual Keyword & Intent Engine",
    },
    {
      n: "Leads are not qualified",
      rx: /lead|qualified|calls|convert|unqualified|tire kicker|junk/i,
      why: "Inbound phone calls arriving without case viability filters, missing bilingual intake routing, and no lead source attribution.",
      fix: "Deploy Whisper call tracking with dual-language intake prompts, pre-qualification criteria, and CRM intake synchronization.",
      tool: "Dual-Language Call Tracking Suite",
    },
    {
      n: "Intake is slow or leaking",
      rx: /intake|missed|follow|response|phone|receptionist|slow|leak/i,
      why: "Urgent DWI arrests and collision victims call at 2 a.m.; missed calls without instant text-back or Spanish bilingual intake go straight to rival practices.",
      fix: "Deploy 24/7 automated instant text-back, bilingual intake scripts, and mobile lead dispatch.",
      tool: "24/7 Intake & Rapid Response Suite",
    },
  ];

  // Philadelphia-specific fallback rules
  const PHILLY_FALLBACKS: Array<{
    n: string;
    rx: RegExp;
    why: string;
    fix: string;
    tool: string;
  }> = [
    {
      n: "Traffic is low or not growing",
      rx: /traffic|visitor|clicks|low traffic|stagnant/i,
      why: "Philadelphia searchers in Center City, South Philly, and the Northeast search for specific localized help, but generic city-wide pages get buried by national filing-address firms.",
      fix: "Architect neighborhood-specific practice silos (Center City, Fishtown, Northeast) tied to Philadelphia Court of Common Pleas and Municipal Court procedures.",
      tool: "Crawl & Indexing Monitor",
    },
    {
      n: "Low visibility on Google and AI",
      rx: /visib|invisible|not showing|\bai\b|chatgpt|gemini|overview|found|perplexity/i,
      why: "Weak entity grounding, missing LegalService JSON-LD schema, and lack of answer-first Pennsylvania statutory coverage (e.g., limited vs full tort, 2-year statute of limitations).",
      fix: "Deploy structured LegalService schema, optimize for Google AI Overviews with direct statutory answers, and maintain an llms.txt protocol.",
      tool: "AI Search & Citation Tracker",
    },
    {
      n: "Citations and mentions are not coming",
      rx: /citation|mention|cited|directory|backlink|authority|press/i,
      why: "Missing alignment with the Philadelphia Bar Association (founded 1802) and local legal directories, causing weak local authority signals compared to entrenched competitors.",
      fix: "Audit and build verified citations across Pennsylvania legal directories, local community institutions, and regional editorial publications.",
      tool: "Citation & Mention Tracker",
    },
    {
      n: "Not ranking in the Map Pack",
      rx: /map|local|rank|pack|near me|3-pack|gmb/i,
      why: "Google Map Pack treats Center City, South Philadelphia, and suburban Delaware/Montgomery Counties as distinct geo-grids with separate local pack results.",
      fix: "Calibrate primary GBP categories, launch compliant client review generation, and embed geo-signals for Philadelphia Municipal Court and neighborhood corridors.",
      tool: "Local Rank Grid & Review Suite",
    },
    {
      n: "We target the wrong keywords",
      rx: /keyword|wrong|search term|intent|ranking for nothing/i,
      why: "Chasing ultra-competitive vanity head terms dominated by national mass tort aggregators instead of high-converting local queries like 'limited tort car accident lawyer' or 'ARD program attorney'.",
      fix: "Map intent-driven long-tail queries addressing Pennsylvania insurance rules, local court procedures, and specific suburban boroughs.",
      tool: "Intent & Keyword Mapping Engine",
    },
    {
      n: "Leads are not qualified",
      rx: /lead|qualified|calls|consult|convert|unqualified|tire kicker|junk/i,
      why: "Attracting out-of-county or unqualified inquiries without pre-screening intake criteria, and missing call source attribution.",
      fix: "Install Whisper call tracking, configure pre-intake case qualification questions, and score inbound inquiries by case viability.",
      tool: "Call Tracking & Lead Scoring Suite",
    },
    {
      n: "Intake is slow or leaking",
      rx: /intake|missed|follow|response|phone|receptionist|slow|leak/i,
      why: "Prospective clients seeking urgent legal counsel in Philadelphia call multiple attorneys; missed calls without immediate text-back go directly to competitors.",
      fix: "Implement instant missed-call text-back, route intake inquiries to mobile notifications, and deploy automated consultation scheduling.",
      tool: "Intake Efficiency & Follow-Up Toolkit",
    },
  ];

  const activeRules = isWoodlands
    ? WOODLANDS_FALLBACKS
    : isSugarLand
    ? SUGAR_LAND_FALLBACKS
    : isKaty
    ? KATY_FALLBACKS
    : isDenton
    ? DENTON_FALLBACKS
    : isAlbuquerque
    ? ALBUQUERQUE_FALLBACKS
    : isPhilly
    ? PHILLY_FALLBACKS
    : FALLBACK_RULES;

  // Fallback matching logic
  const matchedFallbacks: DiagnosticItem[] = [];

  // Match selected chips
  for (const chip of selectedChips) {
    const item = activeRules.find((r) => r.n.toLowerCase() === chip.toLowerCase());
    if (item && !matchedFallbacks.some((m) => m.n === item.n)) {
      matchedFallbacks.push({
        n: item.n,
        why: item.why,
        fix: item.fix,
        tool: item.tool,
      });
    }
  }

  // Match query regex if any
  if (query) {
    for (const rule of activeRules) {
      if (rule.rx.test(query) && !matchedFallbacks.some((m) => m.n === rule.n)) {
        matchedFallbacks.push({
          n: rule.n,
          why: rule.why,
          fix: rule.fix,
          tool: rule.tool,
        });
      }
    }
  }

  // If no specific rule matched, pick top 2 representative
  if (matchedFallbacks.length === 0) {
    matchedFallbacks.push(
      {
        n: isWoodlands
          ? 'Montgomery & Harris County Venue Disconnect & Village Search Fragmentation'
          : isSugarLand
          ? 'Houston PPC Ad Auction Treadmill & High-Asset Intent Void'
          : isKaty
          ? 'Tri-County Venue Confusion & Houston Mega-Firm Displacement'
          : isDenton
          ? 'UNT & TWU Student Intent & DFW Mega-Firm Void'
          : isAlbuquerque
          ? 'Bilingual Search Void & Rio Rancho Suburban Intent'
          : isPhilly
          ? 'Neighborhood Intent Fragmentation'
          : 'Traffic & Qualified Leads Disconnect',
        why: isWoodlands
          ? `The Woodlands spans Montgomery and Harris counties with 8 distinct villages. Prospective clients search for Conroe courts vs Houston venues, while regional mega-firms fail to address executive wealth or local village realities.`
          : isSugarLand
          ? `Houston mega-firms drive up PPC ad auctions in ${county} to unsustainable levels, while unoptimized local practices lack high-asset divorce and Fort Bend court silos.`
          : isKaty
          ? `Katy spans Harris, Fort Bend, and Waller counties. Prospective clients do not know whether their case is heard in Houston, Richmond, or Hempstead, and downtown Houston mega-firms fail to clarify venue while outspending on broad keywords.`
          : isDenton
          ? `Over 60,000 university students and anxious out-of-town parents search in ${county} for student defense, while DFW mega-firms hold page one without a single sentence of Denton County court content.`
          : isAlbuquerque
          ? `Albuquerque searchers in ${county} search heavily in both English and Spanish across Nob Hill, Westside, and Rio Rancho, but single generic pages leave bilingual legal demand completely untouched.`
          : isPhilly
          ? `Philadelphia searchers in ${county} search by specific neighborhood (Center City, Northeast, South Philly) and Pennsylvania statutes, but single generic pages fail to convert.`
          : `Cleveland searchers in ${county} look for specific procedural guidance, but broad pages fail to satisfy search intent or convert visitors into phone calls.`,
        fix: isWoodlands
          ? 'Deploy Montgomery County (Conroe) and Harris County (Creekside Park) venue silos, village landing hubs, and executive estate planning schema.'
          : isSugarLand
          ? 'Deploy compounding organic practice silos for Sugar Land, First Colony, and Richmond district court venues with LegalService schema.'
          : isKaty
          ? 'Architect hyper-local practice silos anchored to Harris, Fort Bend, and Waller County district courts, plus Cinco Ranch and Fulshear community hubs.'
          : isDenton
          ? 'Architect hyper-local practice silos anchored to the Denton County Courthouse-on-the-Square and student defense intake workflows.'
          : isAlbuquerque
          ? 'Build dedicated bilingual practice silos anchored to the Second Judicial District Court, Bernalillo County Metropolitan Court, and deploy Whisper call tracking.'
          : isPhilly
          ? 'Build hyper-local practice silos anchored to the Philadelphia Court of Common Pleas and deploy Whisper call tracking.'
          : 'Publish answer-first practice silos explaining Ohio court processes, install call tracking with lead attribution, and target suburb corridors.',
        tool: isWoodlands
          ? 'Montgomery Venue & Executive Wealth Silo Suite'
          : isSugarLand
          ? 'Fort Bend High-Asset & Organic Equity Suite'
          : isKaty
          ? 'Tri-County Venue & Community Silo Suite'
          : isDenton
          ? 'Denton Practice Silo & Parent Intake Suite'
          : 'Practice Silo & Call Tracking Suite',
      },
      {
        n: 'Local Map Pack & AI Visibility Deficit',
        why: isWoodlands
          ? 'Regional Houston mega-firms capture broad head terms while unoptimized Woodlands Town Center listings miss out on local 3-pack and Google AI Overview citations.'
          : isSugarLand
          ? 'Regional Houston directory aggregators capture broad organic positions while unoptimized Sugar Land Town Square listings miss out on local 3-pack and Google AI Overview citations.'
          : isKaty
          ? 'Downtown Houston directories and regional firms dominate broad organic queries while unoptimized Katy and Cinco Ranch GBP listings suffer from geographic radius drop-off.'
          : isDenton
          ? 'DFW regional directory aggregators capture broad organic positions while unoptimized Denton Square listings miss out on local 3-pack and Google AI Overview citations.'
          : isAlbuquerque
          ? 'National aggregators outspend on broad legal head-terms while unoptimized local Albuquerque GBP listings miss out on local 3-pack and Google AI Overview citations.'
          : isPhilly
          ? 'National aggregators outspend on broad legal queries while unoptimized local GBP listings miss out on local 3-pack and Google AI Overview citations.'
          : 'National directories (Justia, FindLaw) capture organic positions while unoptimized GBP listings miss out on local 3-pack and Google AI Overview citations.',
        fix: 'Restructure GBP primary categories, embed localized geo-signals, and deploy LegalService structured schema.',
        tool: 'Geo-Grid Rank Tracker & AI Citation Engine',
      }
    );
  }

  // Attempt live diagnosis using Gemini Pool
  try {
    const contextPrompt = isWoodlands
      ? `legal market (Unincorporated master-planned township split between Montgomery County with courts in Conroe and Harris County Creekside Park; affluent executive demographic with $145k+ median household incomes; high-asset divorce with corporate RSUs, deferred compensation, and oil & gas executive holdings; Texas revocable living trusts, pour-over wills, and muniment of title under Texas Estates Code; distinct villages like Alden Bridge, Sterling Ridge, Creekside Park, Cochran's Crossing, and Panther Creek; and nearby hubs like Conroe, Spring, Shenandoah, and Tomball)`
      : isSugarLand
      ? `legal market (Fort Bend County Justice Center in Richmond, Fort Bend County courts, affluent master-planned enclaves like First Colony, Riverstone, Sweetwater, and Avalon; high-asset divorce issues including business valuation, oil & gas executive community property, RSUs, stock options, and QDROs; estate planning and muniment of title under Texas Estates Code; competition from downtown Houston and Galleria ad bidders; and neighboring submarkets like Missouri City, Stafford, and Richmond)`
      : isKaty
      ? `legal market (Tri-county jurisdiction of Harris, Fort Bend, and Waller counties; court venues in Houston, Richmond, and Hempstead; high-intent corridors including I-10 Katy Freeway, SH 99 Grand Parkway, and Westpark Tollway; affluent master-planned communities like Cinco Ranch, Cross Creek Ranch, Firethorne, and neighboring Fulshear; Texas Family Code § 6.301 residency requirements; and competition from downtown Houston mega-firms)`
      : isDenton
      ? `legal market (Denton County Courthouse-on-the-Square, Denton County Criminal Courts, University of North Texas UNT, Texas Woman's University TWU, student offenses like minor in possession and first DWI, anxious parents searching remotely 3 hours away, Texas Penal Code, and regional DFW mega-firms)`
      : isAlbuquerque
      ? `legal market (Bernalillo County Metropolitan Court, Second Judicial District Court, New Mexico 50/50 community property rules, pure comparative fault, mandatory ignition interlock DWI statutes, bilingual Spanish search intent, and corridors like Nob Hill, North Valley, Westside, Northeast Heights, Rio Rancho, Santa Fe, and Las Cruces)`
      : isPhilly
      ? `legal market (Philadelphia Court of Common Pleas, Complex Litigation Center, Philadelphia Municipal Court, Pennsylvania 2-year statute of limitations, 51% modified comparative fault, Limited vs Full Tort auto rules, and neighborhoods like Center City, South Philly, Northeast, Fishtown, University City, and suburbs like Upper Darby, King of Prussia, Bensalem)`
      : `legal market (Cuyahoga County Court of Common Pleas, Cleveland Municipal Court, Ohio BWC for workers' comp, Ohio state statutes, suburban markets like Lakewood, Parma, Beachwood, and high-stakes injury/defense practice areas)`;

    const prompt = `You are SearchPrex's Lead Legal SEO Strategist specializing in law firms in ${city}, ${state} (${county}).
A law firm attorney or marketing director submitted this diagnosis request:
User Problem Description: "${query || 'Law firm seeks higher quality case inquiries and organic visibility'}"
Selected Issue Categories: ${selectedChips.length > 0 ? selectedChips.join(', ') : 'None specified'}

Analyze the firm's problem specifically in the context of the ${city}, ${state} ${contextPrompt}.

Return a valid JSON object matching this exact schema:
{
  "items": [
    {
      "n": "Short Issue Title (e.g. Map Pack Stagnation or Limited Tort Content Void)",
      "why": "Detailed local law firm diagnosis: why this happens in ${city} / ${county} (mention local specifics: directory dominance, court jurisdictions, suburban search fragmentation, or intent mismatch).",
      "fix": "SearchPrex's concrete actionable solution: answer-first content, LegalService schema, local geocoding, call tracking, or citation building.",
      "tool": "Specific software tool SearchPrex adds (e.g. Local Geo-Grid Rank Tracker, AI Citation Engine, Call Tracking & Lead Scoring Suite)"
    }
  ],
  "recommendation": "A sharp, 1-2 sentence executive recommendation from Founder Mubashar Sharif on the single highest-leverage move for this firm."
}

Provide between 2 and 4 highly tailored, insightful items.
Output strictly JSON without markdown wrappers or code fences.`;

    const rawResponse = await generateWithPool(prompt, {
      temperature: 0.4,
      maxOutputTokens: 2048,
      json: true,
    });

    if (rawResponse) {
      let cleaned = rawResponse.trim();
      cleaned = cleaned.replace(/^```json\s*/i, '').replace(/```$/i, '').trim();
      const parsed = JSON.parse(cleaned);

      if (parsed.items && Array.isArray(parsed.items) && parsed.items.length > 0) {
        return NextResponse.json({
          items: parsed.items.map((item: any) => ({
            n: String(item.n || 'Legal SEO Finding'),
            why: String(item.why || ''),
            fix: String(item.fix || ''),
            tool: String(item.tool || 'SearchPrex Growth Engine'),
          })),
          recommendation: parsed.recommendation || `Target ${county} high-intent procedural searches and win the Map Pack before scaling ad spend.`,
          isAiGenerated: true,
        });
      }
    }
  } catch (err) {
    console.warn('[diagnose-seo] Gemini API generation fell back to rule-based engine:', (err as Error).message);
  }

  // Graceful deterministic return
  const fallbackRecommendation = isWoodlands
    ? `Anchor your firm to Montgomery County court procedures in Conroe and executive wealth intent before losing affluent village referrals to downtown Houston firms.`
    : isSugarLand
    ? `Capture high-asset Sugar Land divorce and Fort Bend County court intent organically to escape unsustainable Houston PPC auctions.`
    : isKaty
    ? `Clarify tri-county filing venues (Harris, Fort Bend, Waller) and capture Grand Parkway & I-10 commuter accident search volume before expanding ad spend.`
    : isDenton
    ? `Capture Denton County court search intent and UNT/TWU student defense volume directly to outposition regional DFW mega-firms.`
    : isAlbuquerque
    ? `Capture Albuquerque & Rio Rancho bilingual search demand and Bernalillo County court procedures before wasting budget on broad head-terms.`
    : isPhilly
    ? `Anchor your firm to specific Philadelphia neighborhood search intent and Pennsylvania procedural statutes before competing on broad generic keywords.`
    : `Focus on answering Cuyahoga County procedural questions directly and capturing high-intent suburb searches before spending more on paid ads.`;

  return NextResponse.json({
    items: matchedFallbacks.slice(0, 4),
    recommendation: fallbackRecommendation,
    isAiGenerated: false,
  });
}
