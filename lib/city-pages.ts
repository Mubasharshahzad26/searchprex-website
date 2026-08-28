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
  solutionPoints: string[];
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

const SHARED_SOLUTION: string[] = [
  "A page for every practice area × neighbourhood combination that gets searched — not one page trying to rank for all of them",
  "Google Business Profile built for the map pack: correct categories, service areas, weekly posts, and photos with real EXIF location data",
  "Attorney bios that satisfy YMYL E-E-A-T — bar admission year, jurisdictions, reported cases, and a named author on every page",
  "Answers written so Google's AI Overview can quote them directly, in the first sentence under each question",
  "Review velocity from real clients, because the map pack weighs recency as much as star count",
  "Plain-English reporting every Monday: rankings, calls, form fills, and what changed",
];

export const CITY_PAGES: CityPage[] = [
  /* ─────────────── MICHIGAN ─────────────── */
  {
    stateSlug: "michigan",
    citySlug: "detroit",
    city: "Detroit",
    state: "Michigan",
    stateAbbr: "MI",
    county: "Wayne County",
    metaTitle: "Law Firm SEO Detroit, MI — Rank for No-Fault & Injury Cases",
    metaDescription:
      "SEO for Detroit law firms. Rank in the Wayne County map pack for car accident, no-fault and criminal defense searches. Founder-led, GSC-verified, no contracts.",
    h1: "Law Firm SEO in Detroit, Michigan",
    heroSub:
      "Detroit injury searches are dominated by four firms with television budgets and a decade of backlinks. You do not out-spend them. You out-specify them — by owning the searches they treat as too small to bother with.",
    problem:
      "A Detroit attorney searching their own name sees themselves at the top and assumes things are fine. That result is personalised. On a clean SERP for the searches that actually produce cases, the same firm is usually nowhere.",
    problemPoints: [
      "Wayne County injury keywords are held by four firms with heavy TV spend and years of accumulated links",
      "Directories — Avvo, FindLaw, Justia, Yelp — occupy most of the first page before a single firm appears",
      "Most Detroit firm sites have one 'Personal Injury' page trying to rank for car accident, truck accident, slip and fall and no-fault simultaneously",
      "Michigan's no-fault rules changed how PIP claims work, and almost no firm site explains the current position clearly",
      "Google Business Profiles list a downtown address but no service area, so the map pack never shows them in Dearborn, Livonia or Warren",
    ],
    solutionPoints: SHARED_SOLUTION,
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
        q: "How long does law firm SEO take to work in Detroit?",
        a: "Expect map pack movement in 60–90 days and meaningful organic rankings in 4–6 months. Detroit injury keywords are among the most competitive in the Midwest because several firms have spent a decade building links, so anyone promising first-page results in 30 days is either targeting keywords nobody searches or is not being straight with you.",
      },
      {
        q: "Why does my firm not show in the Google map pack for Detroit?",
        a: "Almost always one of three things: your Google Business Profile has no service area set, your primary category is wrong, or your review velocity has stalled. Google ranks the map pack largely on proximity, relevance and prominence — a downtown address with no service area will not surface for someone searching from Livonia.",
      },
      {
        q: "Should a Detroit firm target 'car accident lawyer' or 'no-fault attorney'?",
        a: "Both, on separate pages. They are different searches with different intent: 'car accident lawyer Detroit' is someone looking to hire, while 'no-fault attorney Michigan' is often someone in a benefits dispute with an insurer. One page cannot serve both well, and Google will rank neither.",
      },
      {
        q: "How much does law firm SEO cost in Detroit?",
        a: "For a Detroit firm competing on injury keywords, budget $2,500–$5,000 per month. That reflects the link acquisition and content volume the market demands. Smaller practice areas or suburban targeting can work at a lower spend — the free audit tells you which bracket you are actually in.",
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
    metaTitle: "Law Firm SEO Grand Rapids, MI — Kent County Attorney SEO",
    metaDescription:
      "SEO for Grand Rapids law firms. Win the Kent County map pack for family law, injury and business litigation searches. Founder-led, GSC-verified results.",
    h1: "Law Firm SEO in Grand Rapids, Michigan",
    heroSub:
      "Grand Rapids is competitive enough to matter and small enough to win. Firms here still rank on genuine local relevance rather than raw link budget — which means the window is open, and it will not stay open.",
    problem:
      "West Michigan firms often assume Detroit-level competition applies to them and either overspend or give up. Kent County is materially less contested, and the firms that recognise that now will hold those positions for years.",
    problemPoints: [
      "Most Grand Rapids firms have no city page at all — they rely on a homepage that mentions 'West Michigan' once",
      "Family law searches here skew toward high-asset division because of the region's manufacturing and furniture wealth, and generic divorce pages miss that intent entirely",
      "Suburban searches — Wyoming, Kentwood, Walker, Grandville — are treated as one market when Google treats them as four",
      "Firms compete on 'best lawyer' terms while ignoring the question-shaped searches that feed AI Overviews",
    ],
    solutionPoints: SHARED_SOLUTION,
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
      "17th Circuit Court (Kent County)",
      "61st District Court",
      "U.S. District Court, Western District of Michigan",
    ],
    barAssociation: "State Bar of Michigan · Grand Rapids Bar Association",
    neighborhoods: ["Downtown", "East Grand Rapids", "Wyoming", "Kentwood", "Walker", "Grandville"],
    nearbyCities: ["Detroit", "Lansing", "Kalamazoo", "Holland"],
    legalContext: {
      heading: "Why Kent County is a genuinely winnable market right now",
      body:
        "Keyword difficulty for Grand Rapids law firm searches sits far below Detroit's, and the reason is structural rather than temporary: fewer firms here have invested in content at all, so the first page is still populated largely by directories. A directory result is beatable in a way that an established competitor's page is not — Avvo and FindLaw rank on domain strength, not on answering the specific question, so a page that genuinely addresses a Kent County searcher's situation can displace them. That advantage disappears the moment local firms start publishing seriously, which is why timing matters more here than budget.",
    },
    faqs: [
      {
        q: "Is SEO easier for a Grand Rapids firm than a Detroit firm?",
        a: "Yes, measurably. Kent County keyword difficulty runs well below Wayne County because fewer local firms have invested in content, so directories still hold most first-page positions. Directories are easier to displace than established competitors, since they rank on domain authority rather than on answering the specific question.",
      },
      {
        q: "Do I need separate pages for Wyoming, Kentwood and Grandville?",
        a: "If you want to appear for those searches, yes. Google treats them as distinct local markets even though they sit minutes apart, and someone searching 'divorce lawyer Kentwood' will not reliably see a page optimised for Grand Rapids. Each page needs genuinely different content, not the city name swapped out.",
      },
      {
        q: "What is the best practice area to target first in Grand Rapids?",
        a: "Usually high-asset family law. West Michigan's closely held businesses and manufacturing wealth create demand for asset-valuation and business-interest division that generic divorce pages do not serve, and the competition for those specific terms is thin.",
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
    metaTitle: "Law Firm SEO Cleveland, OH — Cuyahoga County Attorney SEO",
    metaDescription:
      "SEO for Cleveland law firms. Rank in the Cuyahoga County map pack for injury, workers' comp and criminal defence searches. Founder-led, no contracts.",
    h1: "Law Firm SEO in Cleveland, Ohio",
    heroSub:
      "Search page one for most Cleveland attorney terms and you will find national directories, not Cleveland firms. That is not a competitive market. That is an open one — and it is open because almost nobody local has published anything worth ranking.",
    problem:
      "Cleveland legal searches return national directories and firms from other cities. Local firms are absent not because they are outranked, but because they have nothing on the page that says they practise here.",
    problemPoints: [
      "Cleveland attorney searches are far less contested than a metro this size suggests — page one is held largely by national directories, not local firms",
      "The first page is directories: Avvo, FindLaw, Justia, Super Lawyers, and Yelp before any firm appears",
      "Firms list a Downtown or Beachwood address but never build pages for Parma, Lakewood, Euclid or Westlake",
      "Ohio workers' compensation is a state-run monopoly system with its own procedures, and almost no site explains it",
      "Question-shaped searches — 'how long do I have to file', 'what is my case worth' — go entirely unanswered locally",
    ],
    solutionPoints: SHARED_SOLUTION,
    practiceDemand: [
      { area: "Workers' compensation", why: "Ohio runs a state-fund system rather than private insurance, so the process differs from most states and searchers research it heavily." },
      { area: "Personal injury", why: "I-90 and I-77 corridor collisions plus premises liability across an older housing stock." },
      { area: "Criminal defence", why: "Cuyahoga County Common Pleas is among the busiest court systems in Ohio." },
      { area: "Medical malpractice", why: "A dense hospital and research corridor makes Cleveland a centre for malpractice claims." },
    ],
    localSignals: [
      { label: "Suburb coverage", detail: "Parma, Lakewood, Euclid, Westlake and Beachwood searched independently" },
      { label: "Justice Center", detail: "Naming the actual Cuyahoga County venue signals real local practice" },
      { label: "Ohio BWC content", detail: "The state-fund workers' comp process, explained properly" },
      { label: "Ohio State Bar", detail: "Citation consistency across the directories that carry weight in Ohio" },
    ],
    courts: [
      "Cuyahoga County Court of Common Pleas",
      "Cleveland Municipal Court",
      "U.S. District Court, Northern District of Ohio",
    ],
    barAssociation: "Ohio State Bar Association · Cleveland Metropolitan Bar Association",
    neighborhoods: ["Downtown", "Ohio City", "Tremont", "Lakewood", "Parma", "Beachwood"],
    nearbyCities: ["Columbus", "Akron", "Toledo", "Canton"],
    legalContext: {
      heading: "Why Ohio workers' compensation is the content gap nobody is filling",
      body:
        "Ohio is one of a small number of states that runs workers' compensation as a state fund through the Bureau of Workers' Compensation rather than through private insurers. That means the claim process, the appeal path through the Industrial Commission, and the role of an attorney all work differently from the general advice a national directory publishes. Someone injured at work in Cuyahoga County who searches for guidance gets results written for states with private carriers — advice that is confidently wrong for them. A Cleveland firm that explains the actual BWC process step by step is not competing with the directories on authority; it is answering a question they cannot answer at all.",
    },
    faqs: [
      {
        q: "How competitive is law firm SEO in Cleveland?",
        a: "Less than you would expect for a metro of this size. Keyword difficulty for many Cleveland attorney searches sits at 2–5 out of 100, because the first page is held by national directories rather than local firms. Directories rank on domain authority, so a page that actually answers the searcher's question can displace them.",
      },
      {
        q: "Why do directories outrank my Cleveland firm?",
        a: "Avvo, FindLaw and Justia have domain authority built across hundreds of thousands of pages, which lets them rank on almost any legal query. You do not beat them on authority — you beat them on specificity, by answering the exact question a Cuyahoga County searcher has in a way a national template never will.",
      },
      {
        q: "Do Cleveland suburbs need their own pages?",
        a: "Yes. Parma, Lakewood, Euclid and Westlake are searched as distinct markets, and a page optimised for 'Cleveland' will not reliably surface for them. Each needs its own content covering that community specifically, not the city name find-and-replaced.",
      },
      {
        q: "What does workers' compensation SEO involve in Ohio?",
        a: "Explaining the state-fund system properly. Ohio runs workers' comp through the Bureau of Workers' Compensation rather than private insurers, so the claim and appeal process differs from most states — and national directory content gets it wrong. That gap is the opportunity.",
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
    metaTitle: "Law Firm SEO Philadelphia, PA — Attorney SEO That Wins Cases",
    metaDescription:
      "SEO for Philadelphia law firms. Compete in one of the country's toughest legal markets with practice-area pages, map pack visibility and AI Overview citations.",
    h1: "Law Firm SEO in Philadelphia, Pennsylvania",
    heroSub:
      "Philadelphia is a mass tort centre with a bar association older than the Constitution. The competition is real. What is also real is that most Philadelphia firms still publish one page per practice area and wonder why they do not rank for neighbourhood searches.",
    problem:
      "Philadelphia firms compete against national plaintiff practices that treat the city as a venue rather than a home. Those firms have budget. They do not have genuine neighbourhood relevance, and that is the gap.",
    problemPoints: [
      "National mass tort firms target Philadelphia's Court of Common Pleas as a favourable venue, bringing budgets local firms cannot match",
      "First-page results are dominated by firms with no Philadelphia office and no Philadelphia knowledge",
      "Neighbourhood searches — Center City, Northeast Philly, South Philly, Fishtown — go almost entirely unserved",
      "Pennsylvania's comparative negligence rule and two-year limitation period are rarely explained clearly on local sites",
      "Firms chase 'best personal injury lawyer Philadelphia' and ignore the long-tail questions that actually convert",
    ],
    solutionPoints: SHARED_SOLUTION,
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
      "U.S. District Court, Eastern District of Pennsylvania",
    ],
    barAssociation: "Pennsylvania Bar Association · Philadelphia Bar Association",
    neighborhoods: ["Center City", "Northeast Philadelphia", "South Philadelphia", "Fishtown", "Manayunk", "University City"],
    nearbyCities: ["Pittsburgh", "Allentown", "Camden", "Wilmington"],
    legalContext: {
      heading: "What Philadelphia's Complex Litigation Center means for your visibility",
      body:
        "Philadelphia's Court of Common Pleas operates a Complex Litigation Center that consolidates mass tort programs, which has made the city a national destination for pharmaceutical and medical device claims. The practical consequence for a local firm is that your search competition includes national practices with no Philadelphia presence beyond a filing address. They will outspend you on generic injury terms. What they cannot do is write credibly about practising in this city — about the actual venue, the local rules, the neighbourhoods their supposed clients live in. Local relevance is the one advantage that budget does not buy, and it is the one most Philadelphia firms leave unused.",
    },
    faqs: [
      {
        q: "How competitive is law firm SEO in Philadelphia?",
        a: "Very, and for a specific reason: Philadelphia's Complex Litigation Center draws national mass tort firms that target the city as a favourable venue. They bring budgets local firms cannot match. Your advantage is genuine local relevance — neighbourhood pages and Pennsylvania-specific content that a firm with only a filing address here cannot credibly write.",
      },
      {
        q: "Should a Philadelphia firm build neighbourhood pages?",
        a: "Yes, and it is the most underused tactic in the market. Center City, Northeast Philadelphia, South Philly and Fishtown are searched as distinct places, and almost no firm has pages for them. That is a first-page opportunity sitting unclaimed while everyone fights over the citywide term.",
      },
      {
        q: "How long do I have to file a personal injury claim in Pennsylvania?",
        a: "Two years from the date of injury in most cases. Pennsylvania also applies modified comparative negligence, meaning you can recover damages only if you are 50% or less at fault, and your award is reduced by your share. Explaining this clearly on your site answers a question thousands of people search every month.",
      },
      {
        q: "What does law firm SEO cost in Philadelphia?",
        a: "Budget $3,000–$6,000 per month to compete on injury keywords, reflecting the link acquisition and content volume the market requires. Narrower practice areas or neighbourhood-focused strategies work at lower spend — the free audit identifies which applies to your firm.",
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
    metaTitle: "Law Firm SEO Albuquerque, NM — Attorney SEO for New Mexico",
    metaDescription:
      "SEO for Albuquerque law firms. Rank across Bernalillo County for injury, DWI and family law searches. Founder-led, GSC-verified, no long-term contracts.",
    h1: "Law Firm SEO in Albuquerque, New Mexico",
    heroSub:
      "New Mexico attorney searches carry real volume at low difficulty — a combination that rarely survives long. Albuquerque is the largest legal market in the state and the least contested relative to its size.",
    problem:
      "Albuquerque firms compete against out-of-state directories and a handful of local practices with strong brands. Beneath those, the search results are thin — which means the questions New Mexicans actually ask are going unanswered.",
    problemPoints: [
      "Statewide attorney searches carry meaningful volume while page one is held by national directories rather than New Mexico firms",
      "The first page is national directories, not Albuquerque firms",
      "New Mexico's DWI framework is among the strictest in the country and generates constant search demand that local sites barely address",
      "Firms target 'Albuquerque' alone and miss Rio Rancho, Santa Fe and Las Cruces entirely",
      "Spanish-language search demand across the metro is almost universally ignored",
    ],
    solutionPoints: SHARED_SOLUTION,
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
      "Second Judicial District Court (Bernalillo County)",
      "Bernalillo County Metropolitan Court",
      "U.S. District Court, District of New Mexico",
    ],
    barAssociation: "State Bar of New Mexico · Albuquerque Bar Association",
    neighborhoods: ["Downtown", "Nob Hill", "North Valley", "Westside", "Rio Rancho", "Northeast Heights"],
    nearbyCities: ["Santa Fe", "Rio Rancho", "Las Cruces", "Roswell"],
    legalContext: {
      heading: "Why community property changes what a New Mexico divorce page must say",
      body:
        "New Mexico is one of nine community property states, which means property acquired during a marriage is generally owned equally by both spouses regardless of whose name is on it or who earned it. This is fundamentally different from the equitable distribution rule that applies in most of the country, and it is the single most common source of confusion for people researching divorce here. National directory content — written for equitable distribution states — gives advice that is simply wrong in Bernalillo County. A page that explains what community property actually means for a house, a business or a retirement account in New Mexico answers a question that has high search volume and almost no accurate local competition.",
    },
    faqs: [
      {
        q: "Is New Mexico a community property state?",
        a: "Yes. Property acquired during a marriage is generally owned equally by both spouses, regardless of whose name is on the title or who earned the income. This differs from the equitable distribution rule used in most states, which is why national legal content is often wrong for New Mexico residents.",
      },
      {
        q: "How competitive is attorney SEO in Albuquerque?",
        a: "Lower than the market size suggests. Statewide attorney searches carry real volume, and the first page is held by national directories rather than local firms — which is a far softer thing to displace than an established local competitor. That combination does not usually last long once local firms start publishing. Pull current difficulty figures for your own practice area before committing a budget; they move.",
      },
      {
        q: "Should an Albuquerque firm target Santa Fe and Rio Rancho too?",
        a: "If you serve them, yes, on separate pages. Google treats them as distinct markets, and a page built for Albuquerque will not reliably rank for a Rio Rancho search. Each needs content about that community specifically.",
      },
      {
        q: "Does Spanish-language content help a New Mexico law firm rank?",
        a: "It can, substantially, and almost nobody is doing it. There is genuine Spanish-language search demand across the Albuquerque metro that competitors leave untouched. Properly translated pages with hreflang markup capture searches your English-only competitors never see.",
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
    metaTitle: "Law Firm SEO Sugar Land, TX — Fort Bend County Attorney SEO",
    metaDescription:
      "SEO for Sugar Land law firms. Rank in Fort Bend County for high-asset family law, business and injury searches. Founder-led, GSC-verified, no contracts.",
    h1: "Law Firm SEO in Sugar Land, Texas",
    heroSub:
      "Sugar Land sits inside Houston's shadow, and that is exactly why it is winnable. Firms optimise for 'Houston' and leave one of the wealthiest counties in Texas to whoever bothers to name it.",
    problem:
      "Fort Bend County residents do not search for 'Houston lawyer'. They search for Sugar Land, Missouri City, Katy and Richmond — and the firms ranking for those terms are usually Houston practices with no local page at all.",
    problemPoints: [
      "Sugar Land attorney searches carry real volume, yet page one is mostly directories and Houston firms rather than Fort Bend County practices",
      "Houston firms dominate by domain strength while having no Fort Bend-specific content",
      "Fort Bend is among the most ethnically diverse counties in the United States, and firms ignore the multilingual search demand entirely",
      "High household income makes this a high-asset family law market, but pages are written for standard divorce",
      "Missouri City, Katy, Richmond and Rosenberg are searched separately and served by nobody",
    ],
    solutionPoints: SHARED_SOLUTION,
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
      "Fort Bend County District Courts (240th, 268th, 328th, 400th, 434th, 458th)",
      "Fort Bend County Courts at Law",
      "U.S. District Court, Southern District of Texas",
    ],
    barAssociation: "State Bar of Texas · Fort Bend County Bar Association",
    neighborhoods: ["First Colony", "Telfair", "Riverstone", "New Territory", "Missouri City", "Greatwood"],
    nearbyCities: ["Houston", "Katy", "Richmond", "Pearland"],
    legalContext: {
      heading: "Why Fort Bend County is a high-asset market disguised as a suburb",
      body:
        "Fort Bend County has one of the highest median household incomes in Texas and is consistently ranked among the most ethnically diverse counties in the United States. Both facts change what a law firm page here needs to do. A divorce in Sugar Land more often involves business interests, executive compensation, stock awards and multiple properties than a divorce twenty miles away — so content written for a standard uncontested filing simply does not speak to the searcher. And the diversity means significant search demand in languages other than English, which almost no local firm addresses. Houston firms rank here on domain strength alone; they have no page that demonstrates they understand either characteristic.",
    },
    faqs: [
      {
        q: "Why does my Sugar Land firm rank below Houston firms?",
        a: "Because those firms have more domain authority, not more relevance. They rank on general strength while having no Fort Bend-specific content at all. A page that names Fort Bend County courts, covers Missouri City and Katy, and speaks to the actual income profile of the market beats a generic Houston page on relevance.",
      },
      {
        q: "Is high-asset family law worth targeting in Sugar Land?",
        a: "It is usually the strongest opening. Fort Bend household income runs well above the Texas median, so divorces here routinely involve business interests, executive compensation and multiple properties. Competition for those specific terms is much thinner than for general divorce terms.",
      },
      {
        q: "Should a Sugar Land firm also target Missouri City and Katy?",
        a: "Yes, on separate pages. They are distinct searches, and a Sugar Land page will not reliably rank for them. Each needs its own content about that community — the same page with the city name changed is exactly the thin-content pattern Google demotes.",
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
    metaTitle: "Law Firm SEO Plano, TX — Collin County Attorney SEO",
    metaDescription:
      "SEO for Plano law firms. Rank in Collin County for family law, business and injury searches. Founder-led, GSC-verified results, no long-term contracts.",
    h1: "Law Firm SEO in Plano, Texas",
    heroSub:
      "Corporate relocations turned Collin County into one of the wealthiest legal markets in Texas. Most firms here still optimise for 'Dallas' and leave the county's own searches to whoever claims them.",
    problem:
      "Plano is not a Dallas suburb in search terms. It is its own market with its own courts, its own bar, and residents who search by their own city name — and firms that fold it into a Dallas page never appear.",
    problemPoints: [
      "Dallas firms outrank Plano practices on domain strength while having no Collin County content",
      "Corporate headquarters relocations created a concentration of executive compensation and equity-heavy divorce matters that generic pages miss",
      "Frisco, McKinney, Allen and Richardson are separate searches, and almost nobody has pages for them",
      "Collin County's own court system and bar association go unmentioned on most firm sites",
      "Business immigration demand from corporate transfers is almost entirely unserved locally",
    ],
    solutionPoints: SHARED_SOLUTION,
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
      "Collin County District Courts (199th, 219th, 380th, 401st, 416th, 429th)",
      "Collin County Courts at Law",
      "U.S. District Court, Eastern District of Texas",
    ],
    barAssociation: "State Bar of Texas · Collin County Bar Association",
    neighborhoods: ["West Plano", "Legacy West", "Willow Bend", "Frisco", "Allen", "Richardson"],
    nearbyCities: ["Dallas", "Frisco", "McKinney", "Denton"],
    legalContext: {
      heading: "What corporate relocation did to Collin County's legal demand",
      body:
        "A decade of corporate headquarters relocations into the Legacy and Frisco corridors changed the composition of legal work in Collin County. Divorces here involve restricted stock units, deferred compensation and equity awards far more often than in neighbouring counties, because a large share of the population is employed in senior corporate roles. The same relocations drive sustained business immigration demand — H-1B transfers, L-1 intracompany moves, employment-based green cards — from employees who arrived with their employer. Neither pattern is served by a page written for general Dallas-Fort Worth searches, and a firm that addresses either one specifically is competing against almost nobody.",
    },
    faqs: [
      {
        q: "Should a Plano firm target Dallas keywords?",
        a: "Usually not first. Dallas terms are far more competitive and less relevant to your actual client base — Collin County residents search by their own city. Win Plano, Frisco, McKinney and Allen first, then expand outward once those positions hold.",
      },
      {
        q: "What practice area has the least competition in Plano?",
        a: "Business immigration is the clearest gap. Corporate relocations into the Legacy corridor generate sustained H-1B, L-1 and employment-based green card demand, and almost no Collin County firm has built content for it.",
      },
      {
        q: "How does executive compensation change a Plano divorce page?",
        a: "It changes what the page needs to explain. Divorces here routinely involve restricted stock units, deferred compensation and equity awards, and someone facing that searches very differently from someone with a house and a pension. A page addressing equity division specifically competes against almost nothing.",
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
    metaTitle: "Law Firm SEO Denton, TX — Denton County Attorney SEO",
    metaDescription:
      "SEO for Denton law firms. Rank in Denton County for criminal defence, family law and injury searches. Founder-led, GSC-verified, no long-term contracts.",
    h1: "Law Firm SEO in Denton, Texas",
    heroSub:
      "Two universities, a fast-growing county, and a first page held by Dallas-Fort Worth firms with no Denton County content. Denton is the kind of market where a firm that publishes properly for six months is still holding position three years later.",
    problem:
      "Denton firms are squeezed between Dallas-Fort Worth domain authority above them and directories beside them. Neither has anything specific to say about practising in Denton County.",
    problemPoints: [
      "Denton attorney searches carry real volume, but page one is DFW firms ranking on domain strength with no Denton County content",
      "A student population near 60,000 across UNT and TWU drives constant criminal defence and landlord-tenant demand",
      "DFW firms rank on domain strength with no Denton County content whatsoever",
      "Lewisville, Flower Mound, Frisco and Little Elm are separate searches nobody is serving",
      "Rapid county growth means new residents searching without any existing firm relationship",
    ],
    solutionPoints: SHARED_SOLUTION,
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
      "Denton County District Courts (16th, 158th, 211th, 362nd, 367th, 393rd, 431st)",
      "Denton County Courts at Law",
      "U.S. District Court, Eastern District of Texas",
    ],
    barAssociation: "State Bar of Texas · Denton County Bar Association",
    neighborhoods: ["Downtown Denton", "Southridge", "Robson Ranch", "Lewisville", "Flower Mound", "Little Elm"],
    nearbyCities: ["Dallas", "Fort Worth", "Plano", "Frisco"],
    legalContext: {
      heading: "What 60,000 students do to a legal market",
      body:
        "The University of North Texas and Texas Woman's University together bring close to 60,000 students into Denton, and that changes the search profile of the entire county. Criminal defence demand skews toward alcohol offences, possession and misdemeanours, and crucially the person searching is frequently a parent rather than the defendant — which means the query, the tone and the reassurance required are all different. Landlord–tenant disputes over deposits, habitability and eviction run continuously through a rental market built for short tenancies. Neither pattern appears in content written for Dallas-Fort Worth generally, and a Denton firm that writes for the actual searcher — often an anxious parent three hours away — is answering a question nobody else has addressed.",
    },
    faqs: [
      {
        q: "How competitive is law firm SEO in Denton?",
        a: "Less contested than the county’s size suggests. Denton attorney searches carry real volume, but page one is DFW firms ranking on domain strength without a line of Denton County content between them. That is a position a local firm can take and hold. Check current difficulty for your own practice area before you budget — these figures move.",
      },
      {
        q: "Does the student population change what a Denton firm should publish?",
        a: "Substantially. Close to 60,000 students across UNT and TWU drive alcohol, possession and misdemeanour defence demand — and the person searching is often a parent, not the defendant. Content written for a worried parent converts very differently from content written for the accused.",
      },
      {
        q: "Should a Denton firm target Lewisville and Flower Mound?",
        a: "Yes, on their own pages. They are distinct searches within Denton County, and a Denton page will not reliably surface for them. Each needs content specific to that community.",
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
    metaTitle: "Law Firm SEO Tempe, AZ — Maricopa County Attorney SEO",
    metaDescription:
      "SEO for Tempe law firms. Rank in Maricopa County for DUI, criminal defence and injury searches. Founder-led, GSC-verified, no long-term contracts.",
    h1: "Law Firm SEO in Tempe, Arizona",
    heroSub:
      "Arizona has some of the strictest DUI penalties in the country and a university city at the centre of Maricopa County. The search demand is constant. The local content answering it is close to nonexistent.",
    problem:
      "Tempe firms compete against Phoenix practices with larger budgets and directories with larger domains. Neither says anything specific about Tempe, ASU, or how Arizona DUI law actually works.",
    problemPoints: [
      "Phoenix firms outrank Tempe practices on domain strength while having no Tempe-specific content",
      "Arizona's mandatory jail terms and interlock requirements for DUI generate urgent, continuous search demand",
      "Arizona State University's student population drives criminal defence searches with a distinct profile",
      "Mesa, Chandler, Scottsdale and Gilbert are separate searches served by nobody locally",
      "'DUI lawyer near me' searches happen late at night on phones, and most local sites are not built for that moment",
    ],
    solutionPoints: SHARED_SOLUTION,
    practiceDemand: [
      { area: "DUI defence", why: "Arizona imposes mandatory jail time even for first offences and requires ignition interlock — searchers act immediately and research heavily." },
      { area: "Criminal defence", why: "ASU's student population produces steady possession, alcohol and misdemeanour demand." },
      { area: "Personal injury", why: "The Loop 101, Loop 202 and I-10 interchange carries heavy volume through Tempe." },
      { area: "Landlord–tenant", why: "A large student rental market generates continuous deposit and eviction disputes." },
    ],
    localSignals: [
      { label: "East Valley coverage", detail: "Mesa, Chandler, Scottsdale and Gilbert searched independently" },
      { label: "Maricopa County venue", detail: "Naming the actual court separates you from national directories" },
      { label: "Arizona DUI content", detail: "Mandatory minimums and interlock requirements, explained plainly" },
      { label: "Mobile-first urgency", detail: "DUI searches happen at night on a phone — speed and click-to-call decide the outcome" },
    ],
    courts: [
      "Maricopa County Superior Court",
      "Tempe Municipal Court",
      "U.S. District Court, District of Arizona",
    ],
    barAssociation: "State Bar of Arizona · Maricopa County Bar Association",
    neighborhoods: ["Downtown Tempe", "Tempe Town Lake", "South Tempe", "Mesa", "Chandler", "Scottsdale"],
    nearbyCities: ["Phoenix", "Mesa", "Chandler", "Scottsdale"],
    legalContext: {
      heading: "Why Arizona DUI searches convert faster than almost any other legal query",
      body:
        "Arizona imposes mandatory jail time for a first DUI conviction and requires an ignition interlock device on conviction — penalties that are stricter than most states. The practical effect on search behaviour is unusual: someone arrested on a Friday night begins researching immediately, from a phone, and is looking to call rather than read. This compresses the entire funnel into hours. A page that loads fast, answers the first question — what actually happens now — in its opening sentence, and puts a tappable phone number above the fold will convert traffic that a slower, denser competitor page loses. Most Tempe firm sites are built for desktop readers with time to spare, which is precisely the wrong assumption for this practice area.",
    },
    faqs: [
      {
        q: "Why is DUI defence the strongest SEO opportunity in Tempe?",
        a: "Because Arizona's penalties are severe enough to make searchers act immediately. Mandatory jail time for a first offence and required ignition interlock mean someone arrested at the weekend starts researching within hours, from a phone, ready to call. That is the shortest funnel in legal search.",
      },
      {
        q: "Does Arizona require ignition interlock for a first DUI?",
        a: "Yes. Arizona requires an ignition interlock device on conviction, including for first offences, and imposes mandatory jail time. These penalties are stricter than most states, which is why Arizona DUI searchers research far more heavily than the national average.",
      },
      {
        q: "Should a Tempe firm target Phoenix searches?",
        a: "Not first. Phoenix terms are more competitive and less relevant to your actual client base. Win Tempe, Mesa, Chandler and Gilbert — the East Valley searches where you have genuine local relevance — and expand once those hold.",
      },
      {
        q: "How important is site speed for a DUI law firm?",
        a: "Decisive. These searches happen at night on mobile connections, and the visitor is not browsing — they want a phone number. A page that takes four seconds to load loses to one that takes one, regardless of which ranks higher.",
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
    metaTitle: "Law Firm SEO San Jose, CA — Santa Clara County Attorney SEO",
    metaDescription:
      "SEO for San Jose law firms. Rank in Santa Clara County for employment, high-asset family law and injury searches. Founder-led, GSC-verified results.",
    h1: "Law Firm SEO in San Jose, California",
    heroSub:
      "Equity compensation, non-compete disputes and community property collide in Santa Clara County in ways they do nowhere else. The firms that explain that collision clearly are the ones that get found.",
    problem:
      "San Jose firms compete against San Francisco practices and national directories. What neither offers is content that understands what a stock option grant does to a divorce, or what California law actually says about a non-compete.",
    problemPoints: [
      "San Francisco firms outrank San Jose practices on domain strength while ignoring Santa Clara County specifics",
      "Equity compensation — RSUs, options, vesting schedules — makes local divorce matters unusually complex, and pages are written for simple cases",
      "California voids most non-compete agreements, and employees searching about them get advice written for states where they are enforceable",
      "Sunnyvale, Santa Clara, Mountain View, Cupertino and Palo Alto are separate searches nobody covers",
      "Multilingual search demand across the county is substantial and almost entirely unserved",
    ],
    solutionPoints: SHARED_SOLUTION,
    practiceDemand: [
      { area: "Employment law", why: "California's ban on most non-competes, plus wage-and-hour and discrimination claims, drives continuous demand." },
      { area: "High-asset family law", why: "Equity compensation and community property together make asset division uniquely technical here." },
      { area: "Business & startup", why: "Formation, founder disputes and equity agreements from a dense startup base." },
      { area: "Personal injury", why: "US-101, I-280 and I-880 carry heavy commuter volume through the county." },
    ],
    localSignals: [
      { label: "South Bay coverage", detail: "Sunnyvale, Santa Clara, Mountain View, Cupertino and Palo Alto searched separately" },
      { label: "Santa Clara County venue", detail: "Naming the actual court separates you from San Francisco firms" },
      { label: "Equity compensation content", detail: "RSUs, options and vesting in divorce — written for this market specifically" },
      { label: "Multilingual demand", detail: "Substantial non-English search volume that competitors ignore entirely" },
    ],
    courts: [
      "Santa Clara County Superior Court",
      "Santa Clara County Hall of Justice",
      "U.S. District Court, Northern District of California",
    ],
    barAssociation: "State Bar of California · Santa Clara County Bar Association",
    neighborhoods: ["Downtown San Jose", "Willow Glen", "Almaden Valley", "Sunnyvale", "Santa Clara", "Cupertino"],
    nearbyCities: ["San Francisco", "Oakland", "Fremont", "Palo Alto"],
    legalContext: {
      heading: "Why equity compensation and community property make San Jose different",
      body:
        "California is a community property state, meaning assets acquired during a marriage are generally owned equally. Layer that over Santa Clara County's compensation structure — where a substantial share of household wealth arrives as restricted stock units and options with multi-year vesting schedules — and asset division becomes genuinely technical. Whether unvested equity granted during the marriage but vesting after separation is community or separate property is a question with real money attached, and it is one that national divorce content never addresses. Separately, California voids most non-compete agreements, so employees here searching about a restrictive covenant they signed are routinely reading advice written for states where such agreements are enforceable. Both gaps are wide, and both are worth more per client than almost any general legal keyword.",
    },
    faqs: [
      {
        q: "Are non-compete agreements enforceable in California?",
        a: "Generally no. California voids most non-compete agreements as a matter of public policy, with narrow exceptions such as the sale of a business. This is the opposite of the position in most states, which means employees searching for guidance frequently find advice that does not apply to them.",
      },
      {
        q: "How does equity compensation affect a California divorce?",
        a: "Considerably. California is a community property state, and restricted stock units or options granted during the marriage are generally community property even if they vest later. Apportioning equity that straddles the separation date is technical, high-value, and almost never explained on general divorce pages.",
      },
      {
        q: "Should a San Jose firm target San Francisco searches?",
        a: "Rarely worth it first. San Francisco terms are more competitive and serve a different client base. Santa Clara County searches — San Jose, Sunnyvale, Santa Clara, Cupertino — are where you have genuine relevance and far less competition.",
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
    metaTitle: "Law Firm SEO Baton Rouge, LA — East Baton Rouge Attorney SEO",
    metaDescription:
      "SEO for Baton Rouge law firms. Rank in East Baton Rouge Parish for injury, family law and criminal defence searches. Founder-led, GSC-verified results.",
    h1: "Law Firm SEO in Baton Rouge, Louisiana",
    heroSub:
      "Louisiana is the only state in the country that does not run on English common law. That single fact makes almost every piece of national legal content wrong here — and it is the widest content gap in the state.",
    problem:
      "Baton Rouge searchers get advice written for the other forty-nine states. Terms, deadlines and procedures that are correct in Texas are simply incorrect in Louisiana, and almost nobody local is fixing that.",
    problemPoints: [
      "Louisiana's civil law system uses different terminology and different deadlines from every other state",
      "National directories publish common-law advice that does not apply in East Baton Rouge Parish",
      "Louisiana's prescription period for most injury claims is one year, not the two or three most people assume",
      "New Orleans firms rank on domain strength with no Baton Rouge content",
      "Parish-level searches — Ascension, Livingston, West Baton Rouge — are served by nobody",
    ],
    solutionPoints: SHARED_SOLUTION,
    practiceDemand: [
      { area: "Personal injury", why: "I-10 and I-12 corridor collisions, plus industrial incidents along the petrochemical corridor." },
      { area: "Maritime & industrial injury", why: "Mississippi River commerce and refinery employment produce Jones Act and industrial claims." },
      { area: "Family law", why: "Louisiana's community property regime and covenant marriage option differ from most states." },
      { area: "Criminal defence", why: "The 19th Judicial District Court handles the parish's substantial criminal docket." },
    ],
    localSignals: [
      { label: "Parish coverage", detail: "Ascension, Livingston and West Baton Rouge searched separately" },
      { label: "19th Judicial District", detail: "Naming the actual venue signals genuine Louisiana practice" },
      { label: "Civil law content", detail: "Prescription periods and Louisiana terminology, explained correctly" },
      { label: "Industrial corridor", detail: "Refinery and river commerce injury work specific to this stretch of the Mississippi" },
    ],
    courts: [
      "19th Judicial District Court (East Baton Rouge Parish)",
      "Baton Rouge City Court",
      "U.S. District Court, Middle District of Louisiana",
    ],
    barAssociation: "Louisiana State Bar Association · Baton Rouge Bar Association",
    neighborhoods: ["Downtown", "Mid City", "Garden District", "Shenandoah", "Zachary", "Baker"],
    nearbyCities: ["New Orleans", "Shreveport", "Lafayette", "Gonzales"],
    legalContext: {
      heading: "Why Louisiana's civil law system is the biggest content gap in the state",
      body:
        "Louisiana is the only US state whose legal system derives from French and Spanish civil law rather than English common law. The consequences are not academic. Louisiana uses prescription rather than statute of limitations, and the prescriptive period for most personal injury claims is one year from the date of injury — not the two or three years that applies in most states and that national content confidently states. Counties are parishes. Succession replaces probate. A resident of East Baton Rouge Parish researching their claim will read national advice, believe they have two years, and lose the claim entirely. A firm that explains the actual Louisiana position clearly is not just ranking for a keyword; it is correcting information that is actively harming the people searching.",
    },
    faqs: [
      {
        q: "How long do I have to file an injury claim in Louisiana?",
        a: "One year from the date of injury for most personal injury claims. Louisiana calls this prescription rather than a statute of limitations, and one year is significantly shorter than the two or three years that applies in most states — which is why national legal content routinely misleads Louisiana residents.",
      },
      {
        q: "Why is Louisiana law different from other states?",
        a: "Louisiana is the only US state whose legal system derives from French and Spanish civil law rather than English common law. Terminology and procedure differ throughout: parishes instead of counties, succession instead of probate, prescription instead of limitations. National legal content is frequently wrong here.",
      },
      {
        q: "Is Baton Rouge a competitive market for law firm SEO?",
        a: "Moderately, and the content gap outweighs the competition. New Orleans firms rank on domain strength without Baton Rouge relevance, and almost nobody publishes accurate Louisiana civil law content. Correcting that is a defensible position competitors cannot copy quickly.",
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
    metaTitle: "Law Firm SEO Shreveport, LA — Caddo Parish Attorney SEO",
    metaDescription:
      "SEO for Shreveport law firms. Rank in Caddo Parish for injury, family law and criminal defence searches. Founder-led, GSC-verified, no long-term contracts.",
    h1: "Law Firm SEO in Shreveport, Louisiana",
    heroSub:
      "North Louisiana is far enough from New Orleans and Baton Rouge that their firms have no relevance here — and small enough that almost nobody has claimed the searches. That combination does not last.",
    problem:
      "Shreveport searchers get results from firms three hundred miles away and directories that publish common-law advice wrong for Louisiana. Local firms are absent because they have not published.",
    problemPoints: [
      "Caddo Parish attorney searches face little genuine local competition",
      "Louisiana's one-year prescription period for injury claims is almost never stated correctly in national results",
      "The Texas and Arkansas borders create cross-jurisdiction questions nobody addresses locally",
      "Bossier City, Minden and Ruston are separate searches with no local coverage",
      "New Orleans and Baton Rouge firms rank on domain strength with zero North Louisiana relevance",
    ],
    solutionPoints: SHARED_SOLUTION,
    practiceDemand: [
      { area: "Personal injury", why: "I-20 and I-49 intersect at Shreveport, and Louisiana's one-year prescription period makes timing urgent." },
      { area: "Family law", why: "Louisiana community property and covenant marriage rules differ from neighbouring Texas and Arkansas." },
      { area: "Criminal defence", why: "Caddo Parish District Court handles North Louisiana's heaviest criminal docket." },
      { area: "Workers' compensation", why: "Regional healthcare, gaming and manufacturing employment sustain claim volume." },
    ],
    localSignals: [
      { label: "Ark-La-Tex coverage", detail: "Bossier City, Minden and Ruston searched independently" },
      { label: "Caddo Parish venue", detail: "Naming the actual court signals genuine North Louisiana practice" },
      { label: "Cross-border content", detail: "Texas and Arkansas proximity raises jurisdiction questions nobody answers" },
      { label: "Civil law accuracy", detail: "Prescription periods stated correctly, unlike national results" },
    ],
    courts: [
      "First Judicial District Court (Caddo Parish)",
      "Shreveport City Court",
      "U.S. District Court, Western District of Louisiana",
    ],
    barAssociation: "Louisiana State Bar Association · Shreveport Bar Association",
    neighborhoods: ["Downtown", "Highland", "Broadmoor", "South Highlands", "Bossier City", "Southern Hills"],
    nearbyCities: ["Baton Rouge", "Monroe", "Bossier City", "Texarkana"],
    legalContext: {
      heading: "Why the Ark-La-Tex border creates questions nobody is answering",
      body:
        "Shreveport sits close enough to both Texas and Arkansas that residents routinely work in one state, live in another, and are injured in a third. That produces a genuinely difficult and frequently searched question: which state's law applies, and which deadline governs. It matters enormously here, because Louisiana's one-year prescription period for injury claims is roughly half of what applies in Texas and Arkansas. Someone injured across the state line who assumes Louisiana's clock applies, or the reverse, can lose a claim on timing alone. No national directory addresses this, and no firm in New Orleans has reason to. For a Shreveport practice it is both the clearest content gap and the most useful thing it can publish.",
    },
    faqs: [
      {
        q: "Is law firm SEO competitive in Shreveport?",
        a: "Not particularly, which is the opportunity. Caddo Parish searches face little genuine local competition — most results come from New Orleans and Baton Rouge firms with no North Louisiana relevance, or from national directories publishing advice that is wrong for Louisiana.",
      },
      {
        q: "Which state's law applies if I was injured near the Texas border?",
        a: "It depends on where the injury occurred and where the parties reside, and the difference matters a great deal. Louisiana's prescription period for injury claims is one year, while Texas and Arkansas allow longer — so an incorrect assumption about which applies can end a claim on timing alone.",
      },
      {
        q: "Should a Shreveport firm target Bossier City separately?",
        a: "Yes. Bossier City is a distinct search with its own intent, and a Shreveport page will not reliably rank for it. The same applies to Minden and Ruston — each needs content specific to that community rather than the city name substituted.",
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
