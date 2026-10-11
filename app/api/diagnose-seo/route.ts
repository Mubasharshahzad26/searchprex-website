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
  const city = body.city || 'Philadelphia';
  const state = body.state || (city.toLowerCase() === 'cleveland' ? 'Ohio' : 'Pennsylvania');
  const isPhilly = city.toLowerCase().includes('phila') || state.toLowerCase().includes('penn');
  const county = body.county || (isPhilly ? 'Philadelphia County' : 'Cuyahoga County');

  if (!query && selectedChips.length === 0) {
    return NextResponse.json({
      items: [],
      recommendation: `Please enter a search query or select at least one issue chip to diagnose your ${city} legal practice SEO.`,
      isAiGenerated: false,
    });
  }

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

  const activeRules = isPhilly ? PHILLY_FALLBACKS : FALLBACK_RULES;

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
        n: isPhilly ? 'Neighborhood Intent Fragmentation' : 'Traffic & Qualified Leads Disconnect',
        why: isPhilly
          ? `Philadelphia searchers in ${county} search by specific neighborhood (Center City, Northeast, South Philly) and Pennsylvania statutes, but single generic pages fail to convert.`
          : `Cleveland searchers in ${county} look for specific procedural guidance, but broad pages fail to satisfy search intent or convert visitors into phone calls.`,
        fix: isPhilly
          ? 'Build hyper-local practice silos anchored to the Philadelphia Court of Common Pleas and deploy Whisper call tracking.'
          : 'Publish answer-first practice silos explaining Ohio court processes, install call tracking with lead attribution, and target suburb corridors.',
        tool: 'Practice Silo & Call Tracking Suite',
      },
      {
        n: 'Local Map Pack & AI Visibility Deficit',
        why: isPhilly
          ? 'National aggregators outspend on broad legal queries while unoptimized local GBP listings miss out on local 3-pack and Google AI Overview citations.'
          : 'National directories (Justia, FindLaw) capture organic positions while unoptimized GBP listings miss out on local 3-pack and Google AI Overview citations.',
        fix: 'Restructure GBP primary categories, embed localized geo-signals (City Hall, suburban courts), and deploy LegalService structured schema.',
        tool: 'Geo-Grid Rank Tracker & AI Citation Engine',
      }
    );
  }

  // Attempt live diagnosis using Gemini Pool
  try {
    const contextPrompt = isPhilly
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
          recommendation: parsed.recommendation || `Target Cuyahoga County high-intent procedural searches and win the Map Pack before scaling ad spend.`,
          isAiGenerated: true,
        });
      }
    }
  } catch (err) {
    console.warn('[diagnose-seo] Gemini API generation fell back to rule-based engine:', (err as Error).message);
  }

  // Graceful deterministic return
  return NextResponse.json({
    items: matchedFallbacks.slice(0, 4),
    recommendation: `Focus on answering Cuyahoga County procedural questions directly and capturing high-intent suburb searches before spending more on paid ads.`,
    isAiGenerated: false,
  });
}
