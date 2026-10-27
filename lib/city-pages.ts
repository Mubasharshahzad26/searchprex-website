// lib/city-pages.ts
//
// Data for /locations/[state]/[city] — law firm SEO landing pages.
//
// Every city here was chosen from evidence, not guessed: either Search Console
// already shows impressions for "[city] law firm seo" style queries at position
// 15–20, or Semrush reports real volume at KD 2–9 while a generic /services
// page is ranking 64–99 for it. One page cannot rank for Philadelphia AND
// Sugar Land AND Cleveland; that is an architecture problem, and this is the
// architecture.
//
// The duplicate-content risk with templated city pages is real, and it is the
// reason each entry carries `legalContext` — a fact true of THIS jurisdiction
// and nowhere else. Michigan's no-fault statute, Louisiana's Napoleonic civil
// code, Philadelphia's mass tort program: these are what make the pages
// genuinely different rather than a find-and-replace of the city name.
//
// FAQs are phrased as questions people actually type, and answered in the first
// sentence. That is what gets lifted into an AI Overview — the answer has to be
// extractable without reading the paragraph around it.

import { costFaq } from "@/lib/pricing";

export interface CityFaq {
  q: string;
  a: string;
}

export interface PracticeDemand {
  area: string;
  why: string;
}

export interface LocalSignal {
  label: string;
  detail: string;
}

export interface CityPage {
  stateSlug: string;
  citySlug: string;
  city: string;
  state: string;
  stateAbbr: string;
  county: string;
  metaTitle: string;
  metaDescription: string;
  h1: string;
  heroSub: string;
  /** The situation an attorney in this city recognises. */
  problem: string;
  problemPoints: string[];
  practiceDemand: PracticeDemand[];
  localSignals: LocalSignal[];
  courts: string[];
  barAssociation: string;
  neighborhoods: string[];
  nearbyCities: string[];
  /** The jurisdiction-specific anchor. Never templated. */
  legalContext: { heading: string; body: string };
  faqs: CityFaq[];
}

/** The cost answer from the published retainer range, so no city page can quote a price /pricing doesn't. */
function lawCost(city: string): CityFaq {
  return (
    costFaq("Law Firm SEO", `law firm SEO in ${city}`) ?? {
      q: `How much does law firm SEO cost in ${city}?`,
      a: "It depends on the practice areas and cities the plan covers. The free tear-down comes first, so you see the scope before paying anything.",
    }
  );
}

export const CITY_PAGES: CityPage[] = [
  /* ─────────────── MICHIGAN ─────────────── */
  {
    stateSlug: "michigan",
    citySlug: "detroit",
    city: "Detroit",
    state: "Michigan",
    stateAbbr: "MI",
    county: "Wayne County",
    metaTitle: "Law Firm SEO Detroit, MI | From $1,200/mo",
    metaDescription:
      "Law firm SEO in Detroit for injury, no-fault and criminal defense firms: Map Pack, AI Overviews and call tracking. Month-to-month, 7-day free trial.",
    h1: "Law Firm SEO in Detroit, Michigan: A Revenue-First Approach",
    heroSub:
      "SearchPrex is a law firm SEO company for Detroit attorneys who want signed cases, not vanity traffic. We help personal injury, no-fault, criminal defense, family and employment firms rank in the Google Map Pack, appear in AI Overviews and turn searches into phone calls across Wayne, Oakland and Macomb counties.",
    problem:
      "Not Getting Qualified Leads From Your Detroit Law Firm Website?",
    problemPoints: [
      "Wayne County injury keywords are held by four firms with heavy TV spend and years of accumulated links",
      "Directories — Avvo, FindLaw, Justia, Yelp — occupy most of the first page before a single firm appears",
      "Most Detroit firm sites have one 'Personal Injury' page trying to rank for car accident, truck accident, slip and fall and no-fault simultaneously",
      "Michigan's no-fault rules changed how PIP claims work, and almost no firm site explains the current position clearly",
      "Google Business Profiles list a downtown address but no service area, so the map pack never shows them in Dearborn, Livonia or Warren",
    ],
    practiceDemand: [
      {
        area: "Auto accident & no-fault",
        why: "Michigan's no-fault system generates a steady stream of PIP benefit disputes that searchers research before they ever call a firm.",
      },
      {
        area: "Truck accident",
        why: "I-75, I-94 and I-96 freight corridors converge on Wayne County, and commercial-vehicle cases carry far higher value than passenger claims.",
      },
      {
        area: "Criminal defence",
        why: "36th District Court is one of the busiest in the country. These searches happen at night, on a phone, with urgency.",
      },
      {
        area: "Workers' compensation",
        why: "Manufacturing and warehouse employment across the metro keeps repetitive-injury and plant-injury claims constant.",
      },
    ],
    localSignals: [
      { label: "Service-area pages", detail: "Dearborn, Livonia, Warren, Southfield and Grosse Pointe searched separately from 'Detroit'" },
      { label: "Court familiarity", detail: "Pages that name the actual venue read as local to both readers and Google" },
      { label: "Legal directories", detail: "State Bar of Michigan, Avvo, Justia and Martindale in the order that matters" },
      { label: "Michigan-specific content", detail: "No-fault, PIP and mini-tort explained in the current state of the law" },
    ],
    courts: [
      "Third Judicial Circuit Court of Michigan (Wayne County)",
      "36th District Court",
      "U.S. District Court, Eastern District of Michigan",
    ],
    barAssociation: "State Bar of Michigan · Detroit Bar Association",
    neighborhoods: ["Downtown", "Midtown", "Corktown", "Grosse Pointe", "Dearborn", "Southfield"],
    nearbyCities: ["Grand Rapids", "Lansing", "Ann Arbor", "Warren"],
    legalContext: {
      heading: "Why Michigan no-fault changes what your pages need to say",
      body:
        "Michigan is a no-fault state, and the 2019 reforms let drivers choose their level of Personal Injury Protection rather than receiving unlimited lifetime medical benefits by default. That single change created a whole class of searches — people trying to work out what coverage they actually selected, who pays their medical bills, and when they can step outside no-fault to sue. Most Detroit firm sites still describe the pre-reform position or skip it entirely. A page that explains the current rules in plain language answers a question thousands of Wayne County residents are typing every month, and it is the kind of page Google's AI Overview quotes because the answer is specific and checkable.",
    },
    faqs: [
      {
        q: "How long does law firm SEO take in Detroit?",
        a: "Map Pack improvements often start within 60 to 90 days as Business Profile and citation signals update. Competitive organic terms like \"Detroit car accident lawyer\" usually take longer, commonly four to six months or more depending on the competition and your starting point. We agree on milestones up front, and results are never guaranteed.",
      },
      {
        q: "How much does law firm SEO cost in Detroit?",
        a: "It depends on your practice area, the competition and the scope. Law firm plans run $1,200 to $2,500/month depending on how many practice areas and counties across Wayne, Oakland, and Macomb the plan covers. Plans are month-to-month, and we quote after reviewing your site and the firms you compete with.",
      },
      {
        q: "Do you work with firms outside Detroit?",
        a: "Yes. We also build location pages and campaigns for firms in Grand Rapids, Ann Arbor, Lansing, Warren, and other Midwest markets. Every territory receives the same one-firm-per-niche exclusivity.",
      },
      {
        q: "Is your content compliant with Michigan legal advertising rules?",
        a: "We write with Michigan Rule of Professional Conduct 7 (MRPC Rule 7) in mind, covering testimonials, past results and disclaimers, and your attorneys approve every page before it goes live. The firm remains responsible for its own advertising.",
      },
      {
        q: "How does Michigan no-fault insurance law affect law firm SEO?",
        a: "Injured drivers search with very specific questions about PIP benefits, claim deadlines and when they can sue under the serious impairment threshold (MCL § 500.3135). Michigan's 2019 no-fault reforms changed coverage choices and provider reimbursement, so outdated content loses trust fast. We build and refresh no-fault pages with attorney review.",
      },
      {
        q: "What makes AI visibility (AEO/GEO) different from traditional SEO?",
        a: "Traditional SEO targets rankings in blue links. AI visibility focuses on being cited in Google AI Overviews, ChatGPT and Perplexity answers, which depends on clear entity signals, answer-first content and trusted mentions. We track your AI citation rate alongside Map Pack rankings.",
      },
      {
        q: "Do you require a long-term contract?",
        a: "No. We work month-to-month and earn the renewal through calls and signed cases.",
      },
      {
        q: "Can you help my firm rank in the Google Map Pack for \"car accident lawyer Detroit\"?",
        a: "Map Pack rankings depend on proximity, relevance and prominence. We optimize the controllable parts (profile, reviews, citations, practice-area pages) and measure progress with geo-grid tracking. We do not guarantee a specific position.",
      },
      {
        q: "What does one firm per practice area mean?",
        a: "We take on a single firm per practice area in your Detroit territory, so we will never run your strategy against another client of ours.",
      },
      {
        q: "Do you guarantee rankings or signed cases?",
        a: "No. No honest agency can. We commit to a transparent process, monthly reporting and agreed milestones with a 90-day milestone review.",
      },
    ],
  },

  {
    stateSlug: "michigan",
    citySlug: "grand-rapids",
    city: "Grand Rapids",
    state: "Michigan",
    stateAbbr: "MI",
    county: "Kent County",
    metaTitle: "Law Firm SEO Grand Rapids, MI | From $1,200/mo",
    metaDescription:
      "Law firm SEO in Grand Rapids for solo and mid-size firms: Map Pack, AI answers and Kent County pages. Month-to-month, 7-day free trial.",
    h1: "Law Firm SEO in Grand Rapids, Michigan: Qualified Leads Without the PPC Bill",
    heroSub:
      "West Michigan clients check reviews, then call. We build the Map Pack, Kent County pages and AI-answer visibility that keep working after the ad budget stops.",
    problem:
      "West Michigan firms often assume Detroit-level competition applies to them and either overspend or give up. Kent County is materially less contested, and the firms that recognise that now will hold those positions for years.",
    problemPoints: [
      "Most Grand Rapids firms have no city page at all — they rely on a homepage that mentions 'West Michigan' once",
      "Family law searches here skew toward high-asset division because of the region's manufacturing and furniture wealth, and generic divorce pages miss that intent entirely",
      "Suburban searches — Wyoming, Kentwood, Walker, Grandville — are treated as one market when Google treats them as four",
      "Firms compete on 'best lawyer' terms while ignoring the question-shaped searches that feed AI Overviews",
    ],
    practiceDemand: [
      { area: "Family law & high-asset divorce", why: "Closely held family businesses and manufacturing wealth make asset valuation a recurring issue." },
      { area: "Personal injury", why: "US-131 and I-96 corridor collisions, plus Michigan no-fault benefit disputes." },
      { area: "Business & employment", why: "A dense mid-market employer base produces contract and non-compete work." },
      { area: "Estate planning", why: "Generational transfer of family-owned businesses drives sustained trust and probate demand." },
    ],
    localSignals: [
      { label: "Suburb pages", detail: "Wyoming, Kentwood, Walker and Grandville each searched on their own" },
      { label: "Kent County venue", detail: "Naming the actual court signals genuine local practice" },
      { label: "West Michigan framing", detail: "The regional term locals use, which national firms never do" },
      { label: "Review recency", detail: "A smaller market means review velocity moves rankings faster" },
    ],
    courts: [
      "Kent County Circuit Court (17th Circuit)",
      "61st District Court, Grand Rapids",
      "Friend of the Court, Kent County",
      "Ottawa County courts (Holland)",
      "Muskegon County courts",
    ],
    barAssociation: "Grand Rapids Bar Association",
    neighborhoods: ["Downtown", "East Grand Rapids", "Wyoming", "Kentwood", "Walker", "Grandville"],
    nearbyCities: ["Detroit", "Lansing", "Kalamazoo", "Holland"],
    legalContext: {
      heading: "Why Kent County is a genuinely winnable market right now",
      body:
        "Keyword difficulty for Grand Rapids law firm searches sits far below Detroit's, and the reason is structural rather than temporary: fewer firms here have invested in content at all, so the first page is still populated largely by directories. A directory result is beatable in a way that an established competitor's page is not — Avvo and FindLaw rank on domain strength, not on answering the specific question, so a page that genuinely addresses a Kent County searcher's situation can displace them. That advantage disappears the moment local firms start publishing seriously, which is why timing matters more here than budget.",
    },
    faqs: [
      {
        q: "What is law firm SEO in Grand Rapids?",
        a: "Law firm SEO in Grand Rapids makes your firm visible in Google's Map Pack, organic results and AI answers for West Michigan legal searches. It combines a tuned Business Profile, Kent County practice pages, local citations and tracking.",
      },
      {
        q: "Can SEO replace PPC for a Grand Rapids law firm?",
        a: "SEO can reduce your dependence on PPC over time, but it starts slower, so we keep ads running until your numbers show organic can carry the load. You trim spend only where the data supports it.",
      },
      {
        q: "Which court handles a divorce for someone who lives in Grand Rapids?",
        a: "It is generally filed in the Kent County Circuit Court, with the Friend of the Court handling support and parenting time matters. Michigan generally requires 180 days in the state and 10 days in the county before filing.",
      },
      {
        q: "How much does law firm SEO cost in Grand Rapids?",
        a: "Pricing depends on your practice areas and how many Kent County communities you cover. Plans are month-to-month, and the free audit comes first.",
      },
      {
        q: "How long does law firm SEO take in Grand Rapids?",
        a: "Map Pack improvements can begin within a few months, while competitive organic terms often take longer. Results are never guaranteed, so we agree on milestones up front.",
      },
      {
        q: "Do you cover Holland, Muskegon, Wyoming and Kentwood?",
        a: "Yes, each area gets its own page where you serve it, because Google treats them as separate local searches. We also name the county courts that apply to each.",
      },
      {
        q: "Can SEO help my firm appear in ChatGPT and Google AI Overviews?",
        a: "It can improve the odds, because AI tools quote clear, trusted, well-structured pages. We write answer-first content, add schema and an llms.txt file, and track your citation rate. No platform's output can be guaranteed.",
      },
      {
        q: "What are low-hanging keywords for a Grand Rapids law firm?",
        a: "Long-tail searches that combine a legal topic with a suburb or court, such as \"OWI lawyer Walker MI\" or \"Friend of the Court Kent County help\". They have less competition and attract people closer to hiring.",
      },
    ],
  },

  /* ─────────────── OHIO ─────────────── */
  {
    stateSlug: "ohio",
    citySlug: "cleveland",
    city: "Cleveland",
    state: "Ohio",
    stateAbbr: "OH",
    county: "Cuyahoga County",
    metaTitle: "Law Firm SEO Cleveland, OH | From $1,200/mo",
    metaDescription:
      "Law firm SEO in Cleveland: Map Pack, AI answers and Cuyahoga County pages. $1,200–$2,500/mo, month-to-month, 7-day free trial.",
    h1: "Law Firm SEO in Cleveland, Ohio: Predictable Leads, Measured in Signed Cases",
    heroSub:
      "Cleveland attorneys do not buy hype. We build search and AI visibility that earns signed cases, then show every number behind it.",
    problem:
      "Cleveland law firms compete for visibility across organic results, local listings, and legal directories. A clear local strategy starts by checking which firms appear for the practice areas and locations the firm actually serves.",
    problemPoints: [
      "Review the live search results for each priority practice area; the mix of firms, directories, and local listings varies by query",
      "Compare the firm's Google Business Profile and website with the firms currently visible for relevant Cuyahoga County searches",
      "Use neighborhood or suburb pages only when the firm serves that area and can provide distinct, useful information",
      "Ohio workers' compensation has state-specific procedures through the Ohio Bureau of Workers' Compensation and Industrial Commission",
      "Answer common client questions with accurate, current information reviewed by the firm",
    ],
    practiceDemand: [
      { area: "Workers' compensation", why: "Ohio runs a state-fund system rather than private insurance, so the process differs from most states and searchers research it heavily." },
      { area: "Personal injury", why: "I-90 and I-77 corridor collisions plus premises liability across an older housing stock." },
      { area: "Criminal defence", why: "Cuyahoga County Common Pleas is among the busiest court systems in Ohio." },
      { area: "Medical malpractice", why: "A dense hospital and research corridor makes Cleveland a centre for malpractice claims." },
    ],
    localSignals: [
      { label: "Service areas", detail: "Describe only the Cleveland-area communities the firm genuinely serves" },
      { label: "Court information", detail: "Use accurate Cuyahoga County court and venue details where relevant" },
      { label: "Ohio BWC content", detail: "Explain Ohio-specific workers' compensation information with current sources" },
      { label: "Business details", detail: "Keep firm name, address, phone, and profile information consistent" },
    ],
    courts: [
      "Cuyahoga County Court of Common Pleas",
      "Cleveland Municipal Court",
      "Eighth District Court of Appeals",
      "Ohio BWC and the Industrial Commission",
      "Summit County courts (Akron)",
    ],
    barAssociation: "Cleveland Metropolitan Bar Association",
    neighborhoods: ["Downtown", "Ohio City", "Tremont", "University Circle", "Lakewood", "Parma", "Euclid", "Beachwood", "Westlake"],
    nearbyCities: ["Lakewood", "Parma", "Beachwood", "Shaker Heights", "Westlake", "Akron"],
    legalContext: {
      heading: "Ohio workers' compensation requires state-specific information",
      body:
        "Ohio workers' compensation is administered through the Ohio Bureau of Workers' Compensation, and appeals may involve the Industrial Commission. Because procedures and eligibility depend on the facts and current rules, law firm content should cite current Ohio sources and be reviewed by the firm's attorney before publication.",
    },
    faqs: [
      {
        q: "What is law firm SEO in Cleveland?",
        a: "Law firm SEO in Cleveland makes your firm visible in Google's Map Pack, organic results and AI answers for Cuyahoga County legal searches. It combines a tuned Business Profile, practice and suburb pages, citations and a ledger of calls and signed cases.",
      },
      {
        q: "Which court handles a divorce for someone who lives in Cleveland?",
        a: "It is generally filed in the Cuyahoga County Court of Common Pleas, Domestic Relations Division. Ohio generally requires six months in the state and 90 days in the county, and dissolution is an option when both spouses agree.",
      },
      {
        q: "How does Ohio workers' compensation affect law firm SEO?",
        a: "Ohio uses a state fund through the BWC, so pages must explain the Ohio claim and appeal process rather than generic advice. Clear local explanations earn trust and calls.",
      },
      {
        q: "How much does law firm SEO cost in Cleveland?",
        a: "Pricing depends on practice areas and suburbs covered. Plans are month-to-month, and you see the scope in the free reality check first.",
      },
      {
        q: "How long before law firm SEO produces cases in Cleveland?",
        a: "Map Pack movement often begins within a few months, with compounding growth after. PPC is faster at first, and results are never guaranteed. We agree on milestones up front.",
      },
      {
        q: "Do I need separate pages for Lakewood, Parma and Beachwood?",
        a: "Yes, if you want to appear in those searches, because Google treats them as distinct local markets. Each page needs genuinely different local content.",
      },
      {
        q: "Can SEO help my firm appear in ChatGPT and Google AI Overviews?",
        a: "It can improve the odds, because AI tools quote clear, trusted pages. We add answer-first content, schema and an llms.txt file, and track your citation rate. We cannot guarantee any platform's output.",
      },
      {
        q: "What keywords are low-hanging for a Cleveland law firm?",
        a: "Searches that combine a legal topic with a suburb or Ohio term, such as \"BWC claim denied attorney Cuyahoga County\" or \"OVI lawyer Cleveland\". Less competition, higher intent.",
      },
    ],
  },

  /* ─────────────── PENNSYLVANIA ─────────────── */
  {
    stateSlug: "pennsylvania",
    citySlug: "philadelphia",
    city: "Philadelphia",
    state: "Pennsylvania",
    stateAbbr: "PA",
    county: "Philadelphia County",
    metaTitle: "Law Firm SEO Philadelphia, PA | From $1,200/mo",
    metaDescription:
      "Law firm SEO in Philadelphia built on neighborhoods: Map Pack, AI answers and Pennsylvania-specific pages. Month-to-month, 7-day free trial.",
    h1: "Law Firm SEO in Philadelphia: You Cannot Outspend Them. Out-Local Them.",
    heroSub:
      "National firms treat Philadelphia as a venue. You live here. We turn neighborhood knowledge into Map Pack, page-one and AI-answer visibility that budget alone cannot buy.",
    problem:
      "Philadelphia firms compete against national plaintiff practices that treat the city as a venue rather than a home. Those firms have budget. They do not have genuine neighbourhood relevance, and that is the gap.",
    problemPoints: [
      "National mass tort firms target Philadelphia's Court of Common Pleas as a favourable venue, bringing budgets local firms cannot match",
      "First-page results are dominated by firms with no Philadelphia office and no Philadelphia knowledge",
      "Neighbourhood searches — Center City, Northeast Philly, South Philly, Fishtown — go almost entirely unserved",
      "Pennsylvania's comparative negligence rule and two-year limitation period are rarely explained clearly on local sites",
      "Firms chase 'best personal injury lawyer Philadelphia' and ignore the long-tail questions that actually convert",
    ],
    practiceDemand: [
      { area: "Personal injury & mass tort", why: "Philadelphia's Complex Litigation Center makes the city a national venue for coordinated pharmaceutical and device claims." },
      { area: "Criminal defence", why: "One of the busiest municipal court systems in the country generates constant, urgent search demand." },
      { area: "Workers' compensation", why: "A large healthcare, logistics and construction workforce keeps claim volume high." },
      { area: "Family law", why: "Dense population and a wide income range produce both high-asset and standard custody matters." },
    ],
    localSignals: [
      { label: "Neighbourhood pages", detail: "Center City, Northeast, South Philly, Fishtown and Manayunk searched separately" },
      { label: "City Hall venue", detail: "Naming the Court of Common Pleas signals genuine local practice, not venue shopping" },
      { label: "Pennsylvania law content", detail: "Comparative negligence and the two-year limitation period, explained plainly" },
      { label: "Philadelphia Bar", detail: "Founded 1802 — the oldest association in the United States, and a trust signal locals recognise" },
    ],
    courts: [
      "Philadelphia Court of Common Pleas",
      "Philadelphia Municipal Court",
      "Criminal Justice Center",
      "Delaware, Montgomery and Bucks county courts",
      "Philadelphia Bar Association",
    ],
    barAssociation: "Philadelphia Bar Association",
    neighborhoods: ["Center City", "Northeast Philadelphia", "South Philadelphia", "Fishtown", "Manayunk", "University City"],
    nearbyCities: ["Pittsburgh", "Allentown", "Camden", "Wilmington"],
    legalContext: {
      heading: "What Philadelphia's Complex Litigation Center means for your visibility",
      body:
        "Philadelphia's Court of Common Pleas operates a Complex Litigation Center that consolidates mass tort programs, which has made the city a national destination for pharmaceutical and medical device claims. The practical consequence for a local firm is that your search competition includes national practices with no Philadelphia presence beyond a filing address. They will outspend you on generic injury terms. What they cannot do is write credibly about practising in this city — about the actual venue, the local rules, the neighbourhoods their supposed clients live in. Local relevance is the one advantage that budget does not buy, and it is the one most Philadelphia firms leave unused.",
    },
    faqs: [
      {
        q: "What is law firm SEO in Philadelphia?",
        a: "Law firm SEO in Philadelphia makes your firm visible in Google's Map Pack, organic results and AI answers for Philadelphia legal searches, neighborhood by neighborhood. It combines a tuned Business Profile, neighborhood pages, Pennsylvania-specific content and tracking.",
      },
      {
        q: "Which court handles a divorce for someone who lives in Philadelphia?",
        a: "It is generally filed in the Philadelphia Court of Common Pleas, Family Court division. Pennsylvania generally requires six months of residence before filing.",
      },
      {
        q: "What is limited tort versus full tort?",
        a: "Limited tort is an auto insurance choice that can restrict the right to sue for pain and suffering, while full tort preserves it. Pages that explain this plainly earn trust and calls.",
      },
      {
        q: "How much does law firm SEO cost in Philadelphia?",
        a: "Plans run from to per month depending on practice areas and neighborhoods covered. Month-to-month, and the free reality check comes first.",
      },
      {
        q: "How long does law firm SEO take in Philadelphia?",
        a: "Map Pack movement can begin within a few months, with compounding growth after. Results are never guaranteed. We agree on a 90-day milestone review.",
      },
      {
        q: "Should I build neighborhood pages?",
        a: "Usually yes, because Google treats Center City, South Philly and the Northeast as distinct searches. Each page needs genuinely different local content, not a swapped neighborhood name.",
      },
      {
        q: "Can SEO help my firm appear in ChatGPT and Google AI Overviews?",
        a: "It can improve the odds, because AI tools quote clear, trusted, well-structured pages. AI answers now act like a digital referral. We add answer-first content, schema and an llms.txt file, and track citation rate. No platform's output is guaranteed.",
      },
      {
        q: "What are low-hanging keywords for a Philadelphia law firm?",
        a: "Neighborhood and Pennsylvania-term searches such as \"limited tort attorney Philadelphia\" or \"DUI lawyer Center City\". Lower competition and higher intent than \"Philadelphia lawyer\".",
      },
    ],
  },

  /* ─────────────── NEW MEXICO ─────────────── */
  {
    stateSlug: "new-mexico",
    citySlug: "albuquerque",
    city: "Albuquerque",
    state: "New Mexico",
    stateAbbr: "NM",
    county: "Bernalillo County",
    metaTitle: "Law Firm SEO Albuquerque, NM | From $1,200/mo",
    metaDescription:
      "Law firm SEO in Albuquerque in English and Spanish: Map Pack, AI answers and Bernalillo County pages. Month-to-month, 7-day free trial.",
    h1: "Law Firm SEO in Albuquerque, New Mexico: Be the Lawyer Your Community Trusts",
    heroSub:
      "Your reputation was built face to face. We carry it to Google, the Map Pack and AI answers, in English and Spanish, so the right people find you when they need you most.",
    problem:
      "Albuquerque firms compete against out-of-state directories and a handful of local practices with strong brands. Beneath those, the search results are thin — which means the questions New Mexicans actually ask are going unanswered.",
    problemPoints: [
      "Statewide attorney searches carry meaningful volume while page one is held by national directories rather than New Mexico firms",
      "The first page is national directories, not Albuquerque firms",
      "New Mexico's DWI framework is among the strictest in the country and generates constant search demand that local sites barely address",
      "Firms target 'Albuquerque' alone and miss Rio Rancho, Santa Fe and Las Cruces entirely",
      "Spanish-language search demand across the metro is almost universally ignored",
    ],
    practiceDemand: [
      { area: "DWI defence", why: "New Mexico enforces strict DWI penalties including mandatory interlock, producing urgent and continuous search demand." },
      { area: "Personal injury", why: "I-25 and I-40 intersect in Albuquerque, and the state's crash rates keep injury claim volume high." },
      { area: "Family law", why: "New Mexico is a community property state, which changes how marital assets divide and what searchers need explained." },
      { area: "Criminal defence", why: "Bernalillo County's Second Judicial District handles the state's heaviest criminal docket." },
    ],
    localSignals: [
      { label: "Metro coverage", detail: "Rio Rancho, Santa Fe and Las Cruces searched separately from Albuquerque" },
      { label: "Second Judicial District", detail: "Naming the venue signals genuine local practice" },
      { label: "Community property content", detail: "New Mexico's marital property rules, explained in plain language" },
      { label: "Bilingual consideration", detail: "Spanish-language demand across the metro that competitors leave untouched" },
    ],
    courts: [
      "Bernalillo County Metropolitan Court",
      "Second Judicial District Court",
      "Sandoval County (Rio Rancho)",
      "First Judicial District (Santa Fe)",
      "Third Judicial District (Las Cruces)",
    ],
    barAssociation: "Albuquerque Bar Association",
    neighborhoods: ["Downtown", "Nob Hill", "North Valley", "Westside", "Rio Rancho", "Northeast Heights"],
    nearbyCities: ["Santa Fe", "Rio Rancho", "Las Cruces", "Roswell"],
    legalContext: {
      heading: "Why community property changes what a New Mexico divorce page must say",
      body:
        "New Mexico is one of nine community property states, which means property acquired during a marriage is generally owned equally by both spouses regardless of whose name is on it or who earned it. This is fundamentally different from the equitable distribution rule that applies in most of the country, and it is the single most common source of confusion for people researching divorce here. National directory content — written for equitable distribution states — gives advice that is simply wrong in Bernalillo County. A page that explains what community property actually means for a house, a business or a retirement account in New Mexico answers a question that has high search volume and almost no accurate local competition.",
    },
    faqs: [
      {
        q: "What is law firm SEO in Albuquerque?",
        a: "Law firm SEO in Albuquerque makes your firm visible in Google's Map Pack, organic results and AI answers, in English and Spanish, for Bernalillo County legal searches. It combines a tuned Business Profile, bilingual practice pages and tracking.",
      },
      {
        q: "You are not in New Mexico. Why should I trust you?",
        a: "Fair question. We are a remote team, we say so openly, and we earn trust through month-to-month terms, monthly numbers, founder access and references. You bring the community, we bring the tools.",
      },
      {
        q: "Which court handles a divorce for someone who lives in Albuquerque?",
        a: "It is generally filed in the Second Judicial District Court, and New Mexico calls divorce dissolution of marriage. New Mexico is a community property state.",
      },
      {
        q: "Does Spanish content really help?",
        a: "It can, because many people search in Spanish and fewer firms answer them well. We use native-speaker review and correct language tagging.",
      },
      {
        q: "How much does law firm SEO cost in Albuquerque?",
        a: "Pricing depends on practice areas, languages and communities covered. Month-to-month, and the free reality check comes first.",
      },
      {
        q: "How long does law firm SEO take in Albuquerque?",
        a: "Map Pack movement can begin within a few months, with steady growth after. Results are never guaranteed. We agree on milestones up front.",
      },
      {
        q: "Can SEO help my firm appear in ChatGPT and Google AI Overviews?",
        a: "It can improve the odds, because AI tools quote clear, trusted, well-structured pages, in English and Spanish. We add schema, answer-first content and an llms.txt file, and track citation rate. No platform's output is guaranteed.",
      },
      {
        q: "What are low-hanging keywords for an Albuquerque law firm?",
        a: "Searches that combine a legal topic with a town or a Spanish phrase, such as \"abogado de DWI en Albuquerque\" or \"DWI attorney Rio Rancho\". Lower competition and high intent.",
      },
    ],
  },

  /* ─────────────── TEXAS ─────────────── */
  {
    stateSlug: "texas",
    citySlug: "sugar-land",
    city: "Sugar Land",
    state: "Texas",
    stateAbbr: "TX",
    county: "Fort Bend County",
    metaTitle: "Law Firm SEO Sugar Land, TX | From $1,200/mo",
    metaDescription:
      "Law firm SEO in Sugar Land and Fort Bend County: Map Pack, AI answers and local pages that compete with Houston firms. 7-day free trial.",
    h1: "Law Firm SEO in Sugar Land, Texas: Rescue Your Practice From Houston's Ad Auction",
    heroSub:
      "Fort Bend families search for a lawyer they can trust close to home. We lift your firm out of Houston's shadow and out of the click-by-click spending race.",
    problem:
      "Fort Bend County residents do not search for 'Houston lawyer'. They search for Sugar Land (often typed as one word, Sugarland), Missouri City, Katy and Richmond — and the firms ranking for those terms are usually Houston practices with no local page at all.",
    problemPoints: [
      "Sugar Land attorney searches carry real volume, yet page one is mostly directories and Houston firms rather than Fort Bend County practices",
      "Houston firms dominate by domain strength while having no Fort Bend-specific content",
      "Fort Bend is among the most ethnically diverse counties in the United States, and firms ignore the multilingual search demand entirely",
      "High household income makes this a high-asset family law market, but pages are written for standard divorce",
      "Missouri City, Katy, Richmond and Rosenberg are searched separately and served by nobody",
    ],
    practiceDemand: [
      { area: "High-asset family law", why: "Fort Bend household income is well above the state median, making asset valuation, business interests and executive compensation routine issues." },
      { area: "Business & corporate", why: "Energy sector professionals and a dense small-business base generate contract and formation work." },
      { area: "Estate planning", why: "Significant accumulated wealth drives sustained trust, probate and succession demand." },
      { area: "Personal injury", why: "US-59 and the Grand Parkway carry heavy commuter traffic through the county." },
    ],
    localSignals: [
      { label: "Fort Bend coverage", detail: "Missouri City, Katy, Richmond and Rosenberg each searched on their own" },
      { label: "County venue", detail: "Naming Fort Bend County courts separates you from Houston firms" },
      { label: "High-asset framing", detail: "Content pitched at the actual income profile of the market" },
      { label: "Multilingual demand", detail: "One of the most diverse counties in the country, and nobody is serving it" },
    ],
    courts: [
      "Fort Bend County district courts, Richmond",
      "Fort Bend County courts at law",
      "Sugar Land Municipal Court",
      "Harris County district courts (Houston) for some addresses",
      "Fort Bend County Bar Association",
    ],
    barAssociation: "Fort Bend County Bar Association",
    neighborhoods: ["First Colony", "Telfair", "Riverstone", "New Territory", "Missouri City", "Greatwood"],
    nearbyCities: ["Houston", "Katy", "Richmond", "Pearland"],
    legalContext: {
      heading: "Why Fort Bend County is a high-asset market disguised as a suburb",
      body:
        "Fort Bend County has one of the highest median household incomes in Texas and is consistently ranked among the most ethnically diverse counties in the United States. Both facts change what a law firm page here needs to do. A divorce in Sugar Land more often involves business interests, executive compensation, stock awards and multiple properties than a divorce twenty miles away — so content written for a standard uncontested filing simply does not speak to the searcher. And the diversity means significant search demand in languages other than English, which almost no local firm addresses. Houston firms rank here on domain strength alone; they have no page that demonstrates they understand either characteristic.",
    },
    faqs: [
      {
        q: "What is law firm SEO in Sugar Land?",
        a: "Law firm SEO in Sugar Land makes your firm visible in Google's Map Pack, organic results and AI answers for Fort Bend legal searches. It combines a tuned Business Profile, Fort Bend County pages, local citations and tracking.",
      },
      {
        q: "Why does my Sugar Land firm rank below Houston firms?",
        a: "Often domain strength rather than relevance, and many Houston firms have no Fort Bend page. Local pages that name the Richmond courts and Sugar Land communities can compete.",
      },
      {
        q: "Which court handles a divorce for someone who lives in Sugar Land?",
        a: "It is generally filed in the Fort Bend County district courts in Richmond. Texas requires six months in the state and 90 days in the county (Tex. Fam. Code § 6.301).",
      },
      {
        q: "How much does law firm SEO in Sugar Land cost?",
        a: "Plans run $1,200 to $2,500 per month depending on practice areas and communities covered. Month-to-month, and the free rescue plan comes first.",
      },
      {
        q: "How long does law firm SEO take in Sugar Land?",
        a: "Map Pack improvements can begin within a few months, while competitive organic terms often take longer. Results are never guaranteed. We agree on a milestone review.",
      },
      {
        q: "Will you cover Missouri City, Katy and Richmond?",
        a: "Yes, on separate pages, because Google treats them as distinct searches. We avoid overlapping with other city pages we run, such as Katy.",
      },
      {
        q: "Can SEO help my firm appear in ChatGPT and Google AI Overviews?",
        a: "It can improve the odds, because AI tools quote clear, trusted, well-structured pages. We add schema, answer-first content and an llms.txt file, and track citation rate. No platform's output is guaranteed.",
      },
      {
        q: "What are low-hanging keywords for a Sugar Land law firm?",
        a: "Fort Bend phrases such as \"probate attorney Richmond TX\" or \"family lawyer Missouri City TX\", and the \"Sugarland\" spelling. Lower competition and higher intent than \"Houston lawyer\".",
      },
    ],
  },

  {
    stateSlug: "texas",
    citySlug: "plano",
    city: "Plano",
    state: "Texas",
    stateAbbr: "TX",
    county: "Collin County",
    metaTitle: "Law Firm SEO Plano, TX | From $1,200/mo",
    metaDescription:
      "Law firm SEO in Plano for divorce, business immigration and estate firms: Collin County pages, Map Pack and AI answers. 7-day free trial.",
    h1: "Law Firm SEO in Plano, Texas: Be the Firm Newcomers Find in Week One",
    heroSub:
      "Many professionals move to Plano with no local lawyer and no one to ask. Google and AI assistants are their referral network. We make sure your firm is the answer.",
    problem:
      "Plano is not a Dallas suburb in search terms. It is its own market with its own courts, its own bar, and residents who search by their own city name — and firms that fold it into a Dallas page never appear.",
    problemPoints: [
      "Dallas firms outrank Plano practices on domain strength while having no Collin County content",
      "Corporate headquarters relocations created a concentration of executive compensation and equity-heavy divorce matters that generic pages miss",
      "Frisco, McKinney, Allen and Richardson are separate searches, and almost nobody has pages for them",
      "Collin County's own court system and bar association go unmentioned on most firm sites",
      "Business immigration demand from corporate transfers is almost entirely unserved locally",
    ],
    practiceDemand: [
      { area: "High-asset & executive divorce", why: "Corporate headquarters concentration means stock awards, deferred compensation and equity division are routine." },
      { area: "Business & corporate", why: "A dense corporate base drives contract, formation and commercial dispute work." },
      { area: "Business immigration", why: "Corporate relocations generate sustained H-1B, L-1 and green card demand." },
      { area: "Personal injury", why: "The Dallas North Tollway and US-75 corridor carry heavy commuter volume." },
    ],
    localSignals: [
      { label: "Collin County coverage", detail: "Frisco, McKinney, Allen and Richardson searched independently" },
      { label: "County venue", detail: "Naming Collin County courts separates you from Dallas firms" },
      { label: "Executive compensation content", detail: "Equity, RSUs and deferred comp in divorce — written for this market" },
      { label: "Corporate relocation angle", detail: "Immigration and employment demand that follows headquarters moves" },
    ],
    courts: [
      "Collin County district and county courts, McKinney",
      "Plano Municipal Court",
      "Denton County courts for some addresses",
      "U.S. District Court, Eastern District of Texas",
      "Collin County Bar Association",
    ],
    barAssociation: "Collin County Bar Association",
    neighborhoods: ["West Plano", "Legacy West", "Willow Bend", "Frisco", "Allen", "Richardson"],
    nearbyCities: ["Dallas", "Frisco", "McKinney", "Denton"],
    legalContext: {
      heading: "What corporate relocation did to Collin County's legal demand",
      body:
        "A decade of corporate headquarters relocations into the Legacy and Frisco corridors changed the composition of legal work in Collin County. Divorces here involve restricted stock units, deferred compensation and equity awards far more often than in neighbouring counties, because a large share of the population is employed in senior corporate roles. The same relocations drive sustained business immigration demand — H-1B transfers, L-1 intracompany moves, employment-based green cards — from employees who arrived with their employer. Neither pattern is served by a page written for general Dallas-Fort Worth searches, and a firm that addresses either one specifically is competing against almost nobody.",
    },
    faqs: [
      {
        q: "What is law firm SEO in Plano?",
        a: "Law firm SEO in Plano makes your firm visible in Google's Map Pack, organic results and AI answers for Collin County legal searches, especially from newcomers. It combines a tuned Business Profile, Collin County pages, local citations and tracking.",
      },
      {
        q: "Why is Google the referral network for Plano newcomers?",
        a: "Many Plano residents recently moved and have no local lawyer to ask, so they search and ask AI tools first. The firm that answers clearly and shows credentials becomes their pick.",
      },
      {
        q: "Which court handles a divorce for someone who lives in Plano?",
        a: "It is generally filed in the Collin County district courts in McKinney. Texas requires six months in the state and 90 days in the county before filing.",
      },
      {
        q: "How much does law firm SEO in Plano cost?",
        a: "Pricing depends on practice areas and cities covered. Month-to-month, and the free reality check comes first.",
      },
      {
        q: "How long does law firm SEO take in Plano?",
        a: "Map Pack improvements can begin within a few months, while competitive organic terms often take longer. Results are never guaranteed. We agree on milestones up front.",
      },
      {
        q: "Do you cover Frisco, Allen and McKinney?",
        a: "Yes, each gets its own page where you serve it, because Google treats them as separate local searches. We keep Frisco distinct from our Denton work.",
      },
      {
        q: "Can SEO help my firm appear in ChatGPT and Google AI Overviews?",
        a: "It can improve the odds, because AI tools quote clear, trusted, well-structured pages. We add schema, answer-first content and an llms.txt file, and track citation rate. No platform's output is guaranteed.",
      },
      {
        q: "What are low-hanging keywords for a Plano law firm?",
        a: "Life-event and corridor searches such as \"executive divorce lawyer Plano TX\" or \"H-1B attorney Plano TX\". Lower competition and high intent.",
      },
    ],
  },

  {
    stateSlug: "texas",
    citySlug: "denton",
    city: "Denton",
    state: "Texas",
    stateAbbr: "TX",
    county: "Denton County",
    metaTitle: "Law Firm SEO Denton, TX | From $1,200/mo",
    metaDescription:
      "Law firm SEO in Denton for solo and small firms: Map Pack, AI answers and Denton County pages. Month-to-month, 7-day free trial.",
    h1: "Law Firm SEO in Denton, Texas: You Do Not Have to Carry This Alone",
    heroSub:
      "I know the ad bills, the quiet Mondays and the Dallas-Fort Worth firms above you on Google. I am Mubashar, and I will take this off your shoulders with qualified leads that come to you organically.",
    problem:
      "Denton firms are squeezed between Dallas-Fort Worth domain authority above them and directories beside them. Neither has anything specific to say about practising in Denton County.",
    problemPoints: [
      "Denton attorney searches carry real volume, but page one is DFW firms ranking on domain strength with no Denton County content",
      "A student population near 60,000 across UNT and TWU drives constant criminal defence and landlord-tenant demand",
      "DFW firms rank on domain strength with no Denton County content whatsoever",
      "Lewisville, Flower Mound, Frisco and Little Elm are separate searches nobody is serving",
      "Rapid county growth means new residents searching without any existing firm relationship",
    ],
    practiceDemand: [
      { area: "Criminal defence & DWI", why: "Two large universities produce steady demand for alcohol, drug and misdemeanour defence." },
      { area: "Family law", why: "One of the fastest-growing counties in Texas, with a young family demographic." },
      { area: "Landlord–tenant", why: "A large student rental market generates deposit, eviction and habitability disputes." },
      { area: "Personal injury", why: "I-35E and I-35W split at Denton, carrying heavy through traffic." },
    ],
    localSignals: [
      { label: "County coverage", detail: "Lewisville, Flower Mound, Frisco and Little Elm searched independently" },
      { label: "University demand", detail: "Content pitched at students and parents, who search differently" },
      { label: "Denton County venue", detail: "Naming local courts separates you from DFW firms" },
      { label: "New-resident targeting", detail: "Rapid growth means searchers with no existing firm relationship" },
    ],
    courts: [
      "Denton County district and county courts",
      "Denton Municipal Court and justice courts",
      "Eastern District of Texas, Sherman Division",
      "Denton County Bar Association",
      "UNT and TWU campus communities",
    ],
    barAssociation: "Denton County Bar Association",
    neighborhoods: ["Downtown Denton", "Southridge", "Robson Ranch", "Lewisville", "Flower Mound", "Little Elm"],
    nearbyCities: ["Dallas", "Fort Worth", "Plano", "Frisco"],
    legalContext: {
      heading: "What 60,000 students do to a legal market",
      body:
        "The University of North Texas and Texas Woman's University together bring close to 60,000 students into Denton, and that changes the search profile of the entire county. Criminal defence demand skews toward alcohol offences, possession and misdemeanours, and crucially the person searching is frequently a parent rather than the defendant — which means the query, the tone and the reassurance required are all different. Landlord–tenant disputes over deposits, habitability and eviction run continuously through a rental market built for short tenancies. Neither pattern appears in content written for Dallas-Fort Worth generally, and a Denton firm that writes for the actual searcher — often an anxious parent three hours away — is answering a question nobody else has addressed.",
    },
    faqs: [
      {
        q: "What is law firm SEO in Denton?",
        a: "Law firm SEO in Denton makes your firm visible in Google's Map Pack, organic results and AI answers for Denton County legal searches. It combines a tuned Business Profile, Denton County pages, local citations and tracking.",
      },
      {
        q: "How does the 90-day money-back guarantee work?",
        a: "We agree on milestones in writing before we start, and if they are not met by Day 90 we refund. It is not a ranking guarantee, because nobody controls Google.",
      },
      {
        q: "Which court handles a divorce for someone who lives in Denton?",
        a: "It is generally filed in the Denton County district courts. Texas requires six months in the state and 90 days in the county before filing.",
      },
      {
        q: "I was burned by an agency before. Why is this different?",
        a: "You deal with me, not a junior, you get weekly updates, and you own your site and content. Your fees are also protected by the guarantee.",
      },
      {
        q: "Is law firm SEO affordable for a small Denton firm?",
        a: "Plans start at per month, month-to-month. One signed case can cover many months of service.",
      },
      {
        q: "How long before SEO produces cases in Denton?",
        a: "Map Pack movement can begin within a few months, with growth after. Results are never guaranteed. We review milestones at Day 30, 60 and 90.",
      },
      {
        q: "Can SEO help my firm appear in ChatGPT and Google AI Overviews?",
        a: "It can improve the odds, because AI tools quote clear, trusted, well-structured pages. We add schema, answer-first content and an llms.txt file, and track citation rate. No platform's output is guaranteed.",
      },
      {
        q: "What are low-hanging keywords for a Denton law firm?",
        a: "Searches that combine a legal topic with a city or campus, such as \"minor in possession attorney Denton\" or \"security deposit lawyer Denton\". Lower competition and high intent.",
      },
    ],
  },

  {
    stateSlug: "texas",
    citySlug: "katy",
    city: "Katy",
    state: "Texas",
    stateAbbr: "TX",
    county: "Harris, Fort Bend & Waller Counties",
    metaTitle: "Law Firm SEO Katy, TX | From $1,200/mo",
    metaDescription:
      "Law firm SEO in Katy: county-correct pages for Harris, Fort Bend and Waller, plus Map Pack and AI answers. Month-to-month, 7-day free trial.",
    h1: "Law Firm SEO in Katy, Texas: Be the Firm at the Crossroads",
    heroSub:
      "Harris, Fort Bend and Waller counties meet in Katy. Clients search for a lawyer close to home and nobody tells them which courthouse is theirs. We make your firm the one that does.",
    problem:
      "Katy clients search for Katy — and for Cinco Ranch, Fulshear and Brookshire — but the firms that appear are mostly Houston practices with no page about the Katy area, and none of them say which county courthouse a Katy case actually goes to.",
    problemPoints: [
      "Page one for Katy legal searches is mostly Houston firms and directories rather than practices based in the Katy area",
      "Three counties meet in Katy, and few firm sites explain which courthouse a client's case will be heard in",
      "Families moving into new master-planned communities search for family law and estate planning and find no local page",
      "I-10, the Grand Parkway and the Westpark Tollway carry heavy commuter traffic, yet injury pages rarely name them",
      "Cinco Ranch, Fulshear and Brookshire are searched separately and served by almost nobody",
    ],
    practiceDemand: [
      { area: "Family law", why: "A large, young family population across the Katy area — and the county a family lives in decides where a divorce is filed." },
      { area: "Personal injury", why: "Commuter traffic on I-10, the Grand Parkway (SH 99) and the Westpark Tollway." },
      { area: "Estate planning", why: "New homeowners in master-planned communities putting first wills and trusts in place." },
      { area: "Business law", why: "A growing base of small businesses and franchises along the I-10 corridor." },
    ],
    localSignals: [
      { label: "Three-county coverage", detail: "Harris, Fort Bend and Waller county courts named where each applies" },
      { label: "Community pages", detail: "Cinco Ranch, Fulshear and Brookshire each searched on their own" },
      { label: "Corridor relevance", detail: "I-10 and the Grand Parkway named on injury pages, because people search them" },
      { label: "Katy, not Houston", detail: "Katy content for Katy searchers, not a downtown page with Katy in the footer" },
    ],
    courts: [
      "Harris County district courts, Houston",
      "Fort Bend County district courts, Richmond",
      "Waller County district court, Hempstead",
      "U.S. District Court, Southern District of Texas",
      "Houston and Fort Bend County bar associations",
    ],
    barAssociation: "Houston Bar Association",
    neighborhoods: ["Old Town Katy", "Cinco Ranch", "Cross Creek Ranch", "Firethorne", "Seven Meadows", "Grand Lakes"],
    nearbyCities: ["Houston", "Fulshear", "Brookshire", "Sugar Land", "Cypress"],
    legalContext: {
      heading: "Why three counties meet in Katy — and why it matters for your pages",
      body:
        "Katy sits at the point where Harris, Fort Bend and Waller counties meet, and the county line decides where a case is heard. A family in Cinco Ranch, on the Fort Bend side, files for divorce in the Fort Bend County district courts in Richmond; a family on the Harris County side files in Houston; the Waller County side goes to Hempstead. Texas also requires one spouse to have lived in the state for six months and in the county for 90 days before filing (Tex. Fam. Code § 6.301). People search with exactly this confusion — which court, which county — and almost no firm page answers it. A page that explains it for each part of Katy is useful to the reader and specific enough for an AI Overview to quote.",
    },
    faqs: [
      {
        q: "What is law firm SEO in Katy, Texas?",
        a: "Law firm SEO in Katy makes a firm visible in Google's Map Pack, organic results and AI answers for Katy-area legal searches. It combines a tuned Business Profile, county-specific practice pages, local citations and tracking.",
      },
      {
        q: "Which court handles a divorce for someone who lives in Katy?",
        a: "It is filed in the district court of the county where the spouse lives: Houston for Harris, Richmond for Fort Bend and Hempstead for Waller. Texas requires six months in the state and 90 days in the county (Tex. Fam. Code § 6.301).",
      },
      {
        q: "How much does law firm SEO in Katy cost?",
        a: "It runs $1,200 to $2,500 per month depending on practice areas and communities covered. Month-to-month, and the free tear-down comes first.",
      },
      {
        q: "How long does law firm SEO take in Katy?",
        a: "Map Pack improvements can begin within a few months, while competitive organic terms often take longer. Results are never guaranteed. We agree on a 90-day milestone review.",
      },
      {
        q: "Should a Katy firm target Houston keywords?",
        a: "Not first, because Houston-wide terms are held by large firms on domain strength. Pages for Katy, Cinco Ranch, Fulshear and the county courts rank sooner and reach clients closer to your office.",
      },
      {
        q: "Can SEO help my firm appear in ChatGPT and Google AI Overviews?",
        a: "It can improve the odds, because AI tools quote clear, trusted, well-structured pages. We write answer-first content, add schema and an llms.txt file, and track your citation rate. No platform's output can be guaranteed.",
      },
      {
        q: "Do I need separate pages for Cinco Ranch, Fulshear and Brookshire?",
        a: "Yes, if you want to appear in those searches, because they are searched separately. Each page needs genuinely different local content, not the city name swapped out.",
      },
      {
        q: "What are low-hanging keywords for a Katy law firm?",
        a: "County and road phrases such as \"Waller County divorce Brookshire\" or \"truck accident lawyer I-10 Katy\". Less competition and higher intent than \"Houston lawyer\".",
      },
    ],
  },

  {
    stateSlug: "texas",
    citySlug: "the-woodlands",
    city: "The Woodlands",
    state: "Texas",
    stateAbbr: "TX",
    county: "Montgomery County",
    metaTitle: "Law Firm SEO The Woodlands, TX | From $1,200/mo",
    metaDescription:
      "Law firm SEO in The Woodlands: Montgomery and Harris County pages, reviews and AI answers. Month-to-month, 7-day free trial, free audit in 24 hours.",
    h1: "Law Firm SEO in The Woodlands, Texas: Be the Name Your Clients Already Hear",
    heroSub:
      "Behind every estate plan, probate and divorce search is a family trying to protect what matters. We make sure that when they check you out on Google or ask an AI, your firm earns their trust and their call.",
    problem:
      "People in The Woodlands search for their village — Alden Bridge, Sterling Ridge, Creekside Park — and for Spring and Conroe, but the firms that appear are mostly Houston practices with no page about The Woodlands or the Montgomery County courts.",
    problemPoints: [
      "Houston firms and directories hold most of page one for legal searches in The Woodlands",
      "Few firm pages explain that The Woodlands is not a city, or which county court a case goes to",
      "Creekside Park lies mostly in Harris County, so its cases can go to different courts from the rest of The Woodlands",
      "An established, high-income population searches for estate planning and high-asset family law and finds little local content",
      "Spring, Conroe and Tomball are separate searches most firms never address",
    ],
    practiceDemand: [
      { area: "Estate planning", why: "An established, high-income population with property and business interests to pass on." },
      { area: "High-asset family law", why: "Divorces involving business interests, retirement accounts and more than one property." },
      { area: "Personal injury", why: "Commuter traffic on I-45 and the Grand Parkway into and around Houston." },
      { area: "Business law", why: "Corporate and energy-sector employers along the I-45 corridor." },
    ],
    localSignals: [
      { label: "Montgomery County venue", detail: "Naming the Conroe courts separates you from Houston firms" },
      { label: "Village pages", detail: "Alden Bridge, Sterling Ridge, Cochran's Crossing and the other villages searched on their own" },
      { label: "Creekside Park", detail: "Harris County courts named for the village that lies mostly in Harris County" },
      { label: "Spring and Conroe", detail: "Neighbouring communities covered on their own pages, where you serve them" },
    ],
    courts: [
      "Montgomery County district courts and courts at law, Conroe",
      "Harris County district courts, Houston (Creekside Park)",
      "U.S. District Court, Southern District of Texas",
      "Montgomery County Bar Association",
      "The Woodlands Township (no city court)",
    ],
    barAssociation: "Montgomery County Bar Association",
    neighborhoods: ["Alden Bridge", "Sterling Ridge", "Cochran's Crossing", "Panther Creek", "Grogan's Mill", "Creekside Park"],
    nearbyCities: ["Spring", "Conroe", "Tomball", "Magnolia", "Shenandoah"],
    legalContext: {
      heading: "The Woodlands is not a city — and that changes where cases are heard",
      body:
        "The Woodlands is an unincorporated, master-planned community governed by The Woodlands Township, not a city with its own municipal court. Most of it lies in Montgomery County, so family, civil and criminal cases generally go to the Montgomery County courts in Conroe. The exception is the village of Creekside Park, which lies mostly in Harris County and is served by Harris County's courts. Texas also requires one spouse to have lived in the state for six months and in the county for 90 days before filing for divorce (Tex. Fam. Code § 6.301), so which county a family lives in matters from day one. Firm pages that simply say 'serving The Woodlands' answer none of this; a page that does is what searchers and AI Overviews can use.",
    },
    faqs: [
      {
        q: "What is law firm SEO in The Woodlands, Texas?",
        a: "Law firm SEO in The Woodlands makes a firm visible in Google's Map Pack, organic results and AI answers for Woodlands-area legal searches. It combines a tuned Business Profile, venue-correct practice pages, village pages and tracking.",
      },
      {
        q: "Which court handles a case for someone who lives in The Woodlands?",
        a: "Most cases generally go to the Montgomery County courts in Conroe, while Creekside Park, which lies mostly in Harris County, goes to Harris County courts. For divorce, Texas requires six months in the state and 90 days in the county.",
      },
      {
        q: "Is The Woodlands a city?",
        a: "No, The Woodlands is an unincorporated, master-planned community governed by The Woodlands Township. That is why there is no city municipal court, and why pages that say only \"serving The Woodlands\" miss the venue question.",
      },
      {
        q: "How much does law firm SEO in The Woodlands cost?",
        a: "It runs $1,200 to $2,500 per month depending on practice areas and villages covered. Month-to-month, and the complimentary review comes first.",
      },
      {
        q: "What is included in the complimentary review?",
        a: "It covers your Montgomery and Harris venue gaps, missing village pages, Business Profile health and an AI citation baseline. You receive a short summary and video walkthrough with no obligation.",
      },
      {
        q: "How long does law firm SEO take in The Woodlands?",
        a: "Map Pack improvements can begin within a few months, while competitive organic terms often take longer. Results are never guaranteed. We agree on a milestone review.",
      },
      {
        q: "Can SEO help my firm appear in ChatGPT and Google AI Overviews?",
        a: "It can improve the odds, because AI tools quote clear, trusted, well-structured pages. We write answer-first content, add schema and an llms.txt file, and track your citation rate. No platform's output can be guaranteed.",
      },
      {
        q: "Should a Woodlands firm target Houston keywords?",
        a: "Not first, because Houston-wide terms are held by large firms on domain strength. Pages for The Woodlands, its villages, Conroe and Spring rank sooner and reach clients closer to your office.",
      },
    ],
  },

  /* ─────────────── ARIZONA ─────────────── */
  {
    stateSlug: "arizona",
    citySlug: "tempe",
    city: "Tempe",
    state: "Arizona",
    stateAbbr: "AZ",
    county: "Maricopa County",
    metaTitle: "Law Firm SEO Tempe, AZ | From $1,200/mo",
    metaDescription:
      "Law firm SEO in Tempe for DUI, criminal defense and injury attorneys: Maricopa County Map Pack and AI answers. Month-to-month, 7-day free trial.",
    h1: "Tempe Law Firm SEO: Dominate East Valley Search",
    heroSub:
      "Capture high-intent Maricopa County legal retainers before Phoenix conglomerates overspend on broad keywords. We deploy technical Map Pack authority, statutory court silos, and AI answer engine optimization tailored specifically for Tempe attorneys.",
    problem:
      "Struggling to Sign Quality Retainers Against High-Budget Phoenix Law Firms?",
    problemPoints: [
      "Phoenix multi-office mega-firms dominate broad organic SERPs while providing zero hyper-local relevance to East Valley clients",
      "Arizona's strict DUI penalties (A.R.S. § 28-1381 & § 28-1382 Extreme DUI) spark immediate mobile searches that traditional desktop sites fail to convert",
      "ASU's 75,000+ student campus creates continuous demand for student defense, underage alcohol violations, and drug misdemeanors that requires dedicated statutory landing pages",
      "High-value East Valley suburbs including Chandler, Gilbert, Mesa, and South Scottsdale remain untargeted by generic Phoenix legal websites",
      "Cost-per-click on Google Ads for local personal injury and DUI exceeds $280 per click, exhausting marketing budgets without guaranteed retained clients",
    ],
    practiceDemand: [
      { area: "DUI & Extreme DUI defense", why: "Arizona imposes mandatory jail time even for first-time BAC 0.08% offenses, escalating dramatically for Extreme DUI (0.15%+) under A.R.S. § 28-1382. Clients make urgent same-night calls." },
      { area: "ASU student & criminal defense", why: "Arizona State University's student body generates relentless misdemeanor, MIP, Title IX, and drug possession cases requiring discrete local counsel." },
      { area: "Personal injury & collision", why: "High-speed arterial corridors (Loop 101, Loop 202, and US-60 interchange) produce complex multi-vehicle collisions requiring swift representation under Arizona's pure comparative fault rule." },
      { area: "Family law & community property", why: "Tech corridor relocations and ASU faculty generate high-asset divorce cases navigating Arizona community property statutes (A.R.S. § 25-211) and asset division." },
    ],
    localSignals: [
      { label: "East Valley geographic authority", detail: "Dominating hyper-localized search clusters across Tempe, Mesa, Chandler, and Gilbert" },
      { label: "Maricopa County court silos", detail: "Direct statutory alignment with Tempe Municipal Court and Southeast Regional Superior Court" },
      { label: "A.R.S. statutory depth", detail: "Authoritative citation of Arizona Revised Statutes answering client queries before competitors" },
      { label: "Mobile-first conversion UX", detail: "Sub-second mobile speed and one-tap emergency retainer call funnels for urgent legal needs" },
    ],
    courts: [
      "Tempe Municipal Court (505 S. Forest Ave)",
      "Southeast Regional Superior Court Complex (Mesa)",
      "Kyrene Justice Court & University Lakes Justice Court",
      "U.S. District Court for the District of Arizona (Phoenix)",
    ],
    barAssociation: "State Bar of Arizona · Maricopa County Bar Association · East Valley Bar Association",
    neighborhoods: ["Downtown Tempe & Mill Ave", "Tempe Town Lake", "South Tempe & Warner", "Kyrene Corridor", "ASU Campus District", "Alameda & McClintock"],
    nearbyCities: ["Scottsdale", "Mesa", "Chandler", "Gilbert", "Phoenix"],
    legalContext: {
      heading: "Why Arizona statutory precision wins Map Pack rankings and signed retainers in Tempe",
      body:
        "Arizona DUI and criminal laws are among the most unforgiving in the United States. Under A.R.S. § 28-1381, a standard first offense carries mandatory jail time and certified ignition interlock installation, while A.R.S. § 28-1382 (Extreme DUI for BAC 0.150% or higher) mandates a minimum of 30 consecutive days in jail. Prospective clients and panicked parents searching late at night do not trust generic national marketing copy. They retain attorneys whose web presence accurately explains Tempe Municipal Court arraignments, MVD driver's license suspension hearings, and county diversion protocols in the opening sentence. SearchPrex builds authoritative legal silos that answer these urgent questions immediately, establishing undeniable local relevance for Google's local algorithm and AI search engines alike.",
    },
    faqs: [
      {
        q: "Why is Tempe law firm SEO more cost-effective than Google Ads?",
        a: "Tempe law firm SEO delivers compounding organic retainers at a fixed monthly cost, whereas Google Ads for Tempe DUI or personal injury keywords cost $180 to $320 per individual click with zero residual equity.",
      },
      {
        q: "How does SearchPrex help Tempe attorneys outrank large Phoenix legal conglomerates?",
        a: "We outrank large Phoenix law firms by building hyper-localized East Valley content silos, earning local citations, and mapping your practice directly to Tempe Municipal Court and Maricopa County venues that national directories overlook.",
      },
      {
        q: "What practice areas yield the highest organic search return in Tempe?",
        a: "DUI defense (standard and Extreme DUI under A.R.S. § 28-1382), ASU student criminal defense, and motor vehicle accidents along the Loop 101/202 corridors generate the highest search velocity and fastest client conversion in Tempe.",
      },
      {
        q: "How does Arizona's Extreme DUI statute impact legal search intent?",
        a: "Extreme DUI charges trigger immediate high-intent mobile searches because Arizona imposes mandatory 30-day jail sentences at 0.15% BAC, forcing defendants to search for specialized counsel within hours of release from custody.",
      },
      {
        q: "Can my law firm rank across Mesa, Chandler, and Gilbert from a Tempe office?",
        a: "Yes. By engineering dedicated East Valley submarket pages with unique jurisdictional signals, localized case studies, and localized Schema markup, your Tempe office can rank across neighboring municipal boundaries.",
      },
      {
        q: "How does SearchPrex optimize for Google AI Overviews and ChatGPT?",
        a: "We format legal insights with direct, answer-first opening sentences, clear bulleted legal standards, and structured FAQPage schema that AI synthesis models extract directly as primary authoritative sources.",
      },
      {
        q: "Do you lock Tempe law firms into long-term contracts?",
        a: "No. SearchPrex operates strictly on a month-to-month retainer with zero long-term contracts and provides full geographic practice area exclusivity so we never work with your direct competitors.",
      },
      {
        q: "How quickly can a Tempe law firm expect to see improved Map Pack rankings?",
        a: "Most Tempe law firms see measurable Google Map Pack movement and improved local keyword visibility within 60 to 90 days following our technical GBP overhaul and localized citation cleanup.",
      },
    ],
  },

  {
    stateSlug: "arizona",
    citySlug: "scottsdale",
    city: "Scottsdale",
    state: "Arizona",
    stateAbbr: "AZ",
    county: "Maricopa County",
    metaTitle: "Law Firm SEO Scottsdale, AZ | From $1,200/mo",
    metaDescription:
      "Law firm SEO in Scottsdale for divorce, DUI and estate planning attorneys: Map Pack and AI answers. Month-to-month, 7-day free trial.",
    h1: "Scottsdale Law Firm SEO: High-Asset Client Acquisition",
    heroSub:
      "Capture high-net-worth Maricopa County legal retainers before Phoenix conglomerates overspend on broad keywords. We deploy technical Map Pack authority, statutory court silos, and AI answer engine optimization tailored specifically for Scottsdale attorneys.",
    problem:
      "Struggling to Sign High-Value Retainers Against Mega-Agencies and Out-of-Market Aggregators?",
    problemPoints: [
      "Phoenix multi-office conglomerates dominate generic legal SERPs while offering zero hyper-local relevance to Scottsdale's high-net-worth demographics",
      "High-asset divorce cases involving business valuations, executive RSUs, and multiple properties require sophisticated Arizona community property (A.R.S. § 25-211) statutory landing pages",
      "Old Town Scottsdale nightlife generates urgent weekend DUI and Extreme DUI arrests where defendants search on mobile phones for immediate counsel",
      "North Scottsdale, DC Ranch, Silverleaf, and Paradise Valley affluent residents search independently for bespoke trust, probate, and wealth preservation counsel",
      "Pay-per-click Google Ads costs in Scottsdale for family law and injury exceed $310 per click, rapidly consuming budgets without guaranteed retained clients",
    ],
    practiceDemand: [
      { area: "High-asset family law & divorce", why: "Scottsdale's affluent demographic demands sophisticated counsel navigating complex community property division (A.R.S. § 25-211), private equity interests, and executive deferred compensation." },
      { area: "Old Town DUI & Extreme DUI", why: "Weekend nightlife clusters along Scottsdale Road produce urgent DUI and Extreme DUI (0.15%+ BAC under A.R.S. § 28-1382) cases requiring immediate mobile representation before Scottsdale City Court." },
      { area: "Estate planning & asset protection", why: "Retirees, tech entrepreneurs, and seasonal winter residents with multi-state real estate portfolios actively seek bespoke trust administration and probate litigation." },
      { area: "Catastrophic personal injury", why: "High-speed multi-vehicle collisions along Loop 101 Pima Freeway and Scottsdale Road luxury corridors require aggressive trial representation under Arizona's comparative fault rules." },
    ],
    localSignals: [
      { label: "High-net-worth entity relevance", detail: "Dominating affluent search clusters across North Scottsdale, DC Ranch, and Paradise Valley" },
      { label: "Scottsdale City Court integration", detail: "Direct statutory alignment with Scottsdale City Court arraignments and diversion procedures" },
      { label: "Community property depth", detail: "Authoritative citation of A.R.S. § 25-211 explaining business splits and stock option divisions" },
      { label: "Mobile emergency intake UX", detail: "Instant click-to-call mobile funnels designed for night-time Old Town arrests and accident victims" },
    ],
    courts: [
      "Scottsdale City Court (3700 N. 75th St)",
      "McDowell Mountain Justice Court (18380 N. 40th St)",
      "Maricopa County Superior Court (Downtown Phoenix)",
      "U.S. District Court for the District of Arizona (Phoenix)",
    ],
    barAssociation: "State Bar of Arizona · Maricopa County Bar Association · Scottsdale Bar Association",
    neighborhoods: ["Old Town Scottsdale", "North Scottsdale & DC Ranch", "McCormick Ranch", "Gainey Ranch", "Troon North & Silverleaf", "Grayhawk"],
    nearbyCities: ["Phoenix", "Paradise Valley", "Fountain Hills", "Tempe", "Cave Creek"],
    legalContext: {
      heading: "Community property: the critical question every Scottsdale high-asset divorce begins with",
      body:
        "Arizona is one of nine community property states. Under A.R.S. § 25-211, all assets acquired by either spouse during the marriage are presumed community property, excluding inheritances and gifts. In Scottsdale, where marital estates routinely encompass closely held LLCs, carried interest, venture capital stock options, and multi-state real estate holdings, prospective clients do not respond to generic marketing templates. They retain attorneys whose web presence clearly answers how business goodwill is valued, how separate property commingling is analyzed, and which Maricopa County Superior Court commissioner will oversee their preliminary injunction. SearchPrex engineers authoritative legal silos that answer these complex statutory questions in the opening sentence, positioning your firm as the definitive authority for high-asset legal consumers.",
    },
    faqs: [
      {
        q: "Why is Scottsdale law firm SEO more lucrative than advertising in Phoenix?",
        a: "Scottsdale law firm SEO targets high-net-worth clients with substantially higher retainer values and case sizes for high-asset divorce, estate planning, and injury, yielding far greater ROI than competing for lower-value broad Phoenix traffic.",
      },
      {
        q: "How does SearchPrex position Scottsdale firms for high-asset divorce retainers?",
        a: "We engineer deep statutory content silos addressing Arizona community property laws (A.R.S. § 25-211), executive stock option valuation, and business asset division that educate affluent clients and secure top AI Overview citations.",
      },
      {
        q: "What makes Old Town Scottsdale DUI search intent distinct from general traffic?",
        a: "Old Town DUI searches occur primarily between 11 PM and 4 AM on mobile devices following arrests near the entertainment district, requiring sub-second mobile page loads and instant click-to-call intake.",
      },
      {
        q: "How does SearchPrex capture searches from North Scottsdale and Paradise Valley?",
        a: "We develop dedicated submarket landing pages optimized for affluent residential pockets such as DC Ranch, Silverleaf, Troon, and Paradise Valley, capturing local searchers seeking discrete, premium representation.",
      },
      {
        q: "Can a Scottsdale law firm rank in Google's local 3-Pack without long-term contracts?",
        a: "Yes. SearchPrex operates on a 100% month-to-month basis with zero long-term contracts, delivering verified Google Map Pack placement through technical Google Business Profile optimization and localized citation authority.",
      },
      {
        q: "How do you optimize Scottsdale legal content for ChatGPT and Google Gemini?",
        a: "We structure legal insights with answer-first opening sentences, clear statutory definitions, and verified FAQPage Schema that generative search engines extract directly as trusted legal citations.",
      },
      {
        q: "Do you guarantee practice area exclusivity in Scottsdale?",
        a: "Yes. SearchPrex strictly enforces a 1-firm-per-practice exclusivity policy in Scottsdale, guaranteeing that we will never partner with or optimize a direct competitor in your primary legal specialty.",
      },
      {
        q: "How does Arizona's 60-day divorce waiting period influence search behavior?",
        a: "Under A.R.S. § 25-329, no divorce decree may be entered until 60 days after service, creating extended informational search journeys where clients continuously research temporary orders, custody, and asset disclosures.",
      },
    ],
  },

  /* ─────────────── CALIFORNIA ─────────────── */
  {
    stateSlug: "california",
    citySlug: "san-jose",
    city: "San Jose",
    state: "California",
    stateAbbr: "CA",
    county: "Santa Clara County",
    metaTitle: "Law Firm SEO San Jose, CA | From $1,200/mo",
    metaDescription:
      "Law firm SEO in San Jose for employment, divorce and IP attorneys: Santa Clara County Map Pack and AI answers. Month-to-month, 7-day free trial.",
    h1: "San Jose Law Firm SEO: Silicon Valley Retainer Engine",
    heroSub:
      "Capture high-value Santa Clara County retainers before San Francisco mega-firms outspend you on generic keywords. We deploy technical Map Pack authority, Silicon Valley equity silos, and AI answer engine optimization tailored specifically for South Bay attorneys.",
    problem:
      "Struggling to Sign High-Value Silicon Valley Clients Against San Francisco Mega-Firms?",
    problemPoints: [
      "San Francisco multi-office conglomerates dominate generic regional SERPs while offering zero hyper-local relevance to Santa Clara County tech professionals",
      "Executive tech divorces involving complex RSU vesting schedules, founder stock, and multi-million-dollar real estate require California community property depth that generic content fails to convey",
      "California's strict ban on non-compete agreements (Cal. Bus. & Prof. Code § 16600) drives massive search volume from tech employees reading outdated out-of-state advice",
      "High-value South Bay tech hubs—including Sunnyvale, Mountain View, Cupertino, Palo Alto, and Santa Clara—are searched independently and neglected by competitors",
      "PPC Google Ads costs for employment and personal injury in San Jose frequently exceed $320 per click, exhausting marketing budgets with low conversion",
    ],
    practiceDemand: [
      { area: "Tech employment & executive severance", why: "California's voiding of non-competes (Cal. Bus. & Prof. Code § 16600), wage disputes, tech layoffs, and whistleblower claims generate massive high-income search volume." },
      { area: "High-asset divorce & RSU division", why: "Silicon Valley's equity compensation structures make California community property division uniquely technical, requiring specialized Huggins/Nelson formula apportionment." },
      { area: "Startup IP & founder disputes", why: "Dense startup ecosystems across San Jose and the South Bay create ongoing demand for trade secret defense, partnership dissolutions, and breach of fiduciary duty litigation." },
      { area: "Catastrophic personal injury", why: "Heavy commuter arteries (US-101, I-280, I-880, and SR-85) produce severe multi-vehicle collisions requiring swift, aggressive representation." },
    ],
    localSignals: [
      { label: "Silicon Valley entity authority", detail: "Dominating search clusters across San Jose, Cupertino, Sunnyvale, and Mountain View" },
      { label: "Santa Clara County venue silos", detail: "Direct statutory alignment with Santa Clara County Superior Court and Hall of Justice" },
      { label: "Equity compensation depth", detail: "Authoritative citation of California community property formulas for unvested RSUs and stock options" },
      { label: "Executive privacy conversion UX", detail: "Sub-second mobile speed and discreet intake funnels tailored for high-profile tech professionals" },
    ],
    courts: [
      "Santa Clara County Superior Court (191 N. 1st St, San Jose)",
      "Santa Clara County Hall of Justice (190 W. Hedding St, San Jose)",
      "U.S. District Court, Northern District of California (San Jose Division)",
      "California 6th District Court of Appeal (San Jose)",
    ],
    barAssociation: "State Bar of California · Santa Clara County Bar Association · Silicon Valley Bar Association",
    neighborhoods: ["Downtown San Jose", "Willow Glen", "Almaden Valley", "Rose Garden", "Santana Row & Valley Fair", "Silver Creek"],
    nearbyCities: ["Santa Clara", "Sunnyvale", "Cupertino", "Mountain View", "Palo Alto", "Fremont"],
    legalContext: {
      heading: "Why equity compensation and California community property make San Jose unique",
      body:
        "California is a pure community property state. Under California Family Code, assets acquired during marriage are owned 50/50. When applied to Silicon Valley tech compensation—where the overwhelming majority of executive net worth consists of restricted stock units (RSUs), incentive stock options (ISOs), and multi-year vesting schedules—asset division becomes extraordinarily complex. Questions regarding whether unvested grants constitute community or separate property under the Huggins or Nelson formulas represent millions of dollars in dispute. National directories and generalist agencies produce surface-level copy that wealthy tech executives instantly dismiss. SearchPrex engineers authoritative legal silos that answer these precise statutory questions in the first sentence, establishing undeniable local authority for prospective clients and AI search algorithms alike.",
    },
    faqs: [
      {
        q: "Why is San Jose law firm SEO more cost-effective than Google Ads in Silicon Valley?",
        a: "San Jose law firm SEO builds permanent organic equity and generates high-value retainers at a fixed monthly cost, whereas Google Ads for Silicon Valley employment or injury terms cost $240 to $340 per click with zero compounding value.",
      },
      {
        q: "How does SearchPrex help San Jose firms outrank San Francisco mega-agencies?",
        a: "We outrank San Francisco firms by engineering hyper-localized Santa Clara County content silos, optimizing for South Bay municipal entities, and structuring venue pages directly mapped to Santa Clara County Superior Court.",
      },
      {
        q: "Are non-compete agreements enforceable against tech employees in California?",
        a: "No. Under California Business and Professions Code § 16600, non-compete agreements are void as a matter of public policy, creating continuous search demand from tech workers seeking severance and trade secret counsel.",
      },
      {
        q: "How are unvested RSUs and stock options divided in a San Jose divorce?",
        a: "Unvested stock options and RSUs are apportioned between community and separate property using judicial time-rule formulas such as the Huggins or Nelson standards, depending on whether the grant was awarded for past performance or future retention.",
      },
      {
        q: "Can a San Jose law firm capture clients across Sunnyvale, Cupertino, and Mountain View?",
        a: "Yes. By establishing localized South Bay submarket pages with unique jurisdictional signals, localized case studies, and Schema markup, your San Jose office can rank across neighboring municipal boundaries.",
      },
      {
        q: "How does SearchPrex optimize for Google AI Overviews and ChatGPT in Silicon Valley?",
        a: "We structure legal insights with answer-first opening sentences, clear statutory definitions, and verified FAQPage Schema that generative search models extract directly as primary authoritative sources.",
      },
      {
        q: "Do you lock San Jose law firms into annual contracts?",
        a: "No. SearchPrex operates on a month-to-month retainer with zero long-term contracts and provides full geographic practice area exclusivity so we never work with your direct competitors.",
      },
      {
        q: "How quickly can a San Jose law firm expect to see improved Map Pack rankings?",
        a: "Most San Jose law firms see measurable Google Map Pack movement and improved local keyword visibility within 60 to 90 days following our technical GBP overhaul and localized citation cleanup.",
      },
    ],
  },
  
  /* ─────────────── LOUISIANA ─────────────── */
  {
    stateSlug: "louisiana",
    citySlug: "baton-rouge",
    city: "Baton Rouge",
    state: "Louisiana",
    stateAbbr: "LA",
    county: "East Baton Rouge Parish",
    metaTitle: "Law Firm SEO Baton Rouge, LA | From $1,200/mo",
    metaDescription:
      "Law firm SEO in Baton Rouge for injury, maritime and family law attorneys: Map Pack and AI answers. Month-to-month, 7-day free trial.",
    h1: "Baton Rouge Law Firm SEO: Dominate Parish Legal Search",
    heroSub:
      "Capture high-value East Baton Rouge Parish retainers before New Orleans firms overspend on broad keywords. We deploy technical Map Pack authority, Louisiana Civil Code silos, and AI answer engine optimization tailored specifically for Capital Area attorneys.",
    problem:
      "Struggling to Sign Quality Retainers Against High-Spending Out-of-Parish Aggregators?",
    problemPoints: [
      "New Orleans mega-firms dominate generic Louisiana organic SERPs while having zero physical presence or community relevance in East Baton Rouge Parish",
      "Louisiana's unique Civil Code system (prescription vs. statute of limitations, successions vs. probate) makes generic national marketing templates dangerously inaccurate",
      "The landmark 2024 prescription change (two years under Civil Code art. 3493.1 for post-July 1, 2024 injuries) and the 2026 modified comparative fault rule (art. 2323 51% bar) require precise statutory content that competitors neglect",
      "High-density industrial and petrochemical corridors along the Mississippi River generate severe Jones Act maritime, refinery explosion, and toxic tort claims searched independently across Ascension and West Baton Rouge Parishes",
      "Google Ads auction costs for Baton Rouge car accident keywords exceed $260 per click, rapidly depleting advertising budgets without guaranteeing retained cases",
    ],
    practiceDemand: [
      { area: "Personal injury & freeway collisions", why: "The treacherous junction of I-10 and I-12 and the Mississippi River bridge bottleneck generate severe commercial trucking and multi-vehicle crashes governed by Louisiana's evolving prescription and fault statutes." },
      { area: "Maritime & industrial refinery injury", why: "Baton Rouge's deepwater port, petrochemical plants (ExxonMobil corridor), and Mississippi River barge traffic produce high-value Jones Act, Longshore, and industrial chemical exposure claims." },
      { area: "Family law & covenant marriage", why: "Louisiana's civil law community property regime (Civil Code art. 2338) and distinct covenant marriage statutes create intricate asset division and separation procedures." },
      { area: "Criminal defense & 19th JDC", why: "The 19th Judicial District Court presides over East Baton Rouge Parish's heavy felony and DWI docket, generating continuous urgent search demand." },
    ],
    localSignals: [
      { label: "Capital Area parish authority", detail: "Dominating local search clusters across East Baton Rouge, Ascension, Livingston, and West Baton Rouge" },
      { label: "19th Judicial District Court silos", detail: "Direct statutory alignment with the 19th JDC at 300 North Boulevard" },
      { label: "Civil Code precision", detail: "Authoritative citation of Louisiana Civil Code articles explaining prescription deadlines and fault rules" },
      { label: "Sub-second emergency mobile UX", detail: "Rapid mobile loading and click-to-call consultation routing tailored for highway and industrial accident victims" },
    ],
    courts: [
      "19th Judicial District Court (300 North Blvd, Baton Rouge)",
      "Baton Rouge City Court (233 St. Louis St, Baton Rouge)",
      "U.S. District Court, Middle District of Louisiana (777 Florida St)",
      "Louisiana 1st Circuit Court of Appeal (Baton Rouge)",
    ],
    barAssociation: "Louisiana State Bar Association · Baton Rouge Bar Association",
    neighborhoods: ["Downtown & Riverfront", "Mid City", "Garden District", "Shenandoah", "Bocage", "Zachary & Central"],
    nearbyCities: ["New Orleans", "Lafayette", "Gonzales", "Denham Springs", "Port Allen"],
    legalContext: {
      heading: "Why Louisiana Civil Code accuracy is the greatest ranking advantage in Baton Rouge",
      body:
        "Louisiana is the only state in the United States operating on a civil law system rooted in the Napoleonic and Spanish codes. Counties are parishes. Probate is succession. Statutes of limitations are prescription periods. Crucially, recent legislative changes have rewritten Louisiana personal injury practice: claims arising after July 1, 2024 are subject to a two-year prescriptive period (Civil Code art. 3493.1), while prior injuries remain bound by the legacy one-year rule. Furthermore, effective January 1, 2026, Louisiana enacts a modified comparative fault standard (art. 2323) barring recovery for plaintiffs 51% or more at fault. National legal aggregators and generic marketing agencies routinely publish English common-law templates that provide completely incorrect legal information. SearchPrex engineers authoritative Louisiana Civil Code silos that state the exact law in the first sentence, earning top positions in Google's local 3-Pack and citation dominance across Google AI Overviews and ChatGPT.",
    },
    faqs: [
      {
        q: "What is the prescriptive period for personal injury claims in Baton Rouge?",
        a: "Under Louisiana Civil Code art. 3493.1, personal injury claims arising after July 1, 2024 have a prescriptive period of two years from the date of injury, whereas injuries occurring prior to that date are governed by the previous one-year prescriptive period.",
      },
      {
        q: "How does Louisiana's 2026 comparative fault reform impact injury claims?",
        a: "Effective January 1, 2026, Louisiana Civil Code art. 2323 bars an injured plaintiff from recovering damages if they are found to be 51% or more at fault for the accident, shifting Louisiana from a pure comparative fault system to a modified comparative fault regime.",
      },
      {
        q: "Why is Louisiana civil law critical for local legal SEO in Baton Rouge?",
        a: "Louisiana's legal system derives from civil law rather than English common law, meaning search terms like 'succession lawyer' and 'prescription deadline' represent distinct local intent that national legal directories fail to address accurately.",
      },
      {
        q: "How does SearchPrex help Baton Rouge law firms outrank New Orleans competitors?",
        a: "We outrank out-of-parish New Orleans firms by building hyper-localized East Baton Rouge Parish content silos, earning local Capital Area citations, and aligning your firm directly with the 19th Judicial District Court.",
      },
      {
        q: "Can my Baton Rouge firm rank across Ascension, Livingston, and West Baton Rouge Parishes?",
        a: "Yes. By deploying dedicated Capital Region submarket pages with unique parish jurisdictional signals, highway corridor case studies (I-10 and I-12), and localized Schema markup, your office can capture cross-parish clients.",
      },
      {
        q: "How does SearchPrex optimize Baton Rouge legal content for Google AI Overviews and ChatGPT?",
        a: "We format legal insights with direct, answer-first opening sentences, precise Civil Code article citations, and verified FAQPage Schema that AI synthesis engines extract directly as primary authoritative sources.",
      },
      {
        q: "Do you lock Baton Rouge attorneys into long-term contracts?",
        a: "No. SearchPrex operates strictly on a month-to-month retainer with zero long-term contracts and guarantees 1-firm-per-practice exclusivity so we never work with your direct Baton Rouge competitors.",
      },
      {
        q: "What practice areas yield the fastest ROI in East Baton Rouge Parish?",
        a: "Commercial trucking collisions along the I-10/I-12 corridor, industrial plant chemical exposure claims, and contested succession litigation generate the fastest caseload conversions and highest lifetime client values.",
      },
    ],
  },

  {
    stateSlug: "louisiana",
    citySlug: "shreveport",
    city: "Shreveport",
    state: "Louisiana",
    stateAbbr: "LA",
    county: "Caddo Parish",
    metaTitle: "Law Firm SEO Shreveport, LA | From $1,200/mo",
    metaDescription:
      "Law firm SEO in Shreveport for injury, family and criminal defense attorneys: Caddo Parish Map Pack and AI answers. Month-to-month, 7-day free trial.",
    h1: "Shreveport Law Firm SEO: Ark-La-Tex Retainer Engine",
    heroSub:
      "Capture high-value Caddo Parish retainers and Ark-La-Tex cross-border cases before New Orleans and Baton Rouge firms overspend on broad keywords. We deploy technical Map Pack authority, Louisiana Civil Code silos, and AI answer engine optimization tailored specifically for Northwest Louisiana attorneys.",
    problem:
      "Struggling to Sign Quality Retainers Against Distant Louisiana Mega-Firms and Out-of-State Confusion?",
    problemPoints: [
      "New Orleans and Baton Rouge billboard firms dominate statewide generic searches despite having zero physical presence or community relevance in Caddo Parish",
      "Shreveport's position at the Ark-La-Tex border (tri-state intersection of Louisiana, Texas, and Arkansas) creates cross-jurisdiction conflict questions that national legal directories completely ignore",
      "Louisiana's landmark 2024 prescription change (two years under Civil Code art. 3493.1 for post-July 1, 2024 injuries) contrasts with Texas (2 years) and Arkansas (3 years), confusing searchers who live and work across state lines",
      "Effective January 1, 2026, Louisiana enacts a modified comparative fault standard (Civil Code art. 2323 51% bar), requiring precise statutory explanation that competing directories neglect",
      "High-volume freight traffic along the I-20 and I-49 corridors generates catastrophic trucking crashes searched across Bossier City, Minden, and Ruston with zero localized organic coverage",
    ],
    practiceDemand: [
      { area: "Personal injury & freeway collisions", why: "The major junction of I-20 and I-49 generates severe commercial trucking and interstate collisions governed by Louisiana's prescription and modified fault statutes." },
      { area: "Ark-La-Tex cross-border litigation", why: "Residents routinely live in Bossier Parish, work in Caddo Parish, and commute from East Texas or South Arkansas, creating complex multi-state choice-of-law and venue disputes." },
      { area: "Family law & covenant marriage", why: "Louisiana's distinct civil law community property regime (Civil Code art. 2338) and covenant marriage requirements differ fundamentally from adjacent common-law Texas and Arkansas." },
      { area: "Criminal defense & 1st JDC", why: "The 1st Judicial District Court at the Caddo Parish Courthouse presides over North Louisiana's heaviest felony and interstate drug interdiction docket along I-20." },
    ],
    localSignals: [
      { label: "Ark-La-Tex regional authority", detail: "Dominating local search clusters across Caddo, Bossier, Webster, and Lincoln Parishes" },
      { label: "1st Judicial District Court silos", detail: "Direct statutory alignment with the 1st JDC at 501 Texas Street in downtown Shreveport" },
      { label: "Civil Code precision", detail: "Authoritative explanation of Louisiana prescription deadlines and 2026 comparative fault rules" },
      { label: "Cross-border interstate UX", detail: "Clear statutory guidance addressing multi-state accident jurisdiction and choice-of-law questions" },
    ],
    courts: [
      "1st Judicial District Court (501 Texas St, Shreveport)",
      "Shreveport City Court (1244 Texas Ave, Shreveport)",
      "U.S. District Court, Western District of Louisiana (300 Fannin St, Shreveport)",
      "Louisiana 2nd Circuit Court of Appeal (430 Fannin St, Shreveport)",
    ],
    barAssociation: "Louisiana State Bar Association · Shreveport Bar Association",
    neighborhoods: ["Downtown & Riverfront", "Highland & South Highlands", "Broadmoor", "Anderson Island", "Southern Hills", "Bossier City & East Bank"],
    nearbyCities: ["Bossier City", "Monroe", "Ruston", "Minden", "Texarkana"],
    legalContext: {
      heading: "Why the Ark-La-Tex border creates the greatest legal content gap in North Louisiana",
      body:
        "Shreveport sits at the crossroads of three distinct legal jurisdictions: Louisiana civil law, Texas common law, and Arkansas statutory law. Residents and commercial truck drivers routinely cross state borders daily along I-20 and I-49. When an accident occurs near the state line, searchers desperately need to know which state's deadlines and liability rules apply. Louisiana enforces a two-year prescriptive period for injuries after July 1, 2024 (Civil Code art. 3493.1), but previous injuries remain bound by the legacy one-year deadline. Furthermore, since January 1, 2026, Louisiana bars recovery for plaintiffs 51% or more at fault (art. 2323), whereas Arkansas applies a 50% modified comparative fault rule and a three-year statute of limitations. National aggregators publish generic advice that misleads clients. SearchPrex engineers authoritative Ark-La-Tex legal silos that state the exact cross-border rules in the first sentence, securing top positions in Google's local 3-Pack and citation dominance across Google AI Overviews and ChatGPT.",
    },
    faqs: [
      {
        q: "What is the prescriptive period for personal injury claims in Shreveport?",
        a: "Under Louisiana Civil Code art. 3493.1, personal injury claims arising after July 1, 2024 have a prescriptive period of two years from the date of injury, whereas claims for injuries occurring prior to that date are governed by the legacy one-year prescriptive period.",
      },
      {
        q: "How do cross-border Ark-La-Tex injuries affect applicable law and filing deadlines?",
        a: "Applicable law depends on the location of the collision, the residency of the parties, and interstate choice-of-law rules. Louisiana allows two years for post-July 2024 claims, Texas allows two years, and Arkansas allows three years, making immediate local jurisdictional analysis essential.",
      },
      {
        q: "How does Louisiana's 2026 comparative fault reform impact Shreveport injury claims?",
        a: "Effective January 1, 2026, Louisiana Civil Code art. 2323 bars an injured party from recovering damages if they are determined to be 51% or more at fault, transitioning Louisiana from a pure comparative fault system to a modified comparative fault standard.",
      },
      {
        q: "Should a Shreveport law firm target Bossier City separately in organic search?",
        a: "Yes. Bossier City represents an independent search market in Bossier Parish with distinct municipal search intent; deploying dedicated submarket pages captures clients across the Red River without cannibalizing Shreveport rankings.",
      },
      {
        q: "How does SearchPrex help Shreveport firms outrank New Orleans and Baton Rouge competitors?",
        a: "We build hyper-localized Caddo Parish entity signals, earn Ark-La-Tex citations, and align your practice directly with the 1st Judicial District Court to dominate the Google Map Pack where distant competitors cannot compete.",
      },
      {
        q: "How does SearchPrex optimize Shreveport content for Google AI Overviews and ChatGPT?",
        a: "We structure legal insights with direct, answer-first opening sentences, verified Civil Code citations, and complete LegalService Schema markup that AI search models extract directly as primary sources.",
      },
      {
        q: "Do you lock Shreveport law firms into long-term contracts?",
        a: "No. SearchPrex operates strictly month-to-month with zero long-term contracts and guarantees 1-firm-per-practice exclusivity across Caddo Parish so we never work with your direct local competitors.",
      },
      {
        q: "What practice areas generate the highest caseload return in Caddo Parish?",
        a: "Commercial trucking collisions along the I-20 and I-49 corridors, multi-state Ark-La-Tex dispute litigation, and high-conflict succession cases generate the fastest caseload conversions and highest lifetime case value.",
      },
    ],
  },
];

/* ── Lookups ── */

export function getCityPage(stateSlug: string, citySlug: string): CityPage | undefined {
  return CITY_PAGES.find((c) => c.stateSlug === stateSlug && c.citySlug === citySlug);
}

/** Every state/city pair, for generateStaticParams and the sitemap. */
export function getAllCityParams(): Array<{ state: string; city: string }> {
  return CITY_PAGES.map((c) => ({ state: c.stateSlug, city: c.citySlug }));
}

/** Cities grouped by state, for hub pages and internal linking. */
export function getCitiesByState(): Map<string, CityPage[]> {
  const map = new Map<string, CityPage[]>();
  for (const c of CITY_PAGES) {
    const list = map.get(c.stateSlug) ?? [];
    list.push(c);
    map.set(c.stateSlug, list);
  }
  return map;
}

/** Other cities in the same state — genuine internal links, not a link farm. */
export function getSiblingCities(city: CityPage): CityPage[] {
  return CITY_PAGES.filter((c) => c.stateSlug === city.stateSlug && c.citySlug !== city.citySlug);
}
