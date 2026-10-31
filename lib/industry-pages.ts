// lib/industry-pages.ts
//
// Law firm practice-area pages — /services/law-firm-seo/[industry].
//
// Rebuilt 2026-09-26. The previous version is where most of this copy started,
// and the strongest sections are kept nearly word for word. What was removed:
//
//   - A "review funnel" that "filters positive outcomes" to the Business
//     Profile. Asking only happy clients for reviews is review gating, which
//     Google's review policies prohibit.
//   - "Case Result schema" that would make settlements "appear as rich
//     snippets". No such rich result exists.
//   - "Over 80% of criminal defense searches happen on mobile" — no source.
//   - "Dominate", "you don't exist", "the most trusted voice in your county",
//     "rank aggressively". Law firm pages answer to ABA Model Rule 7.1
//     (no false or misleading communication), and nobody can promise a
//     ranking.
//   - A "30 days free AI Intake SaaS" bonus with no terms behind it. The pages
//     link to the live intake demo on /services/law-firm-seo instead.
//   - Keyword chips and a Google Maps embed with no API key.
//
// There is no published law firm case study, and every page says so: the
// `approach` block is the plan, not a result.
//
// Only `slug` and `name` are read outside the practice-area pages
// (lib/locations.ts, the location pages, /industries).

import type { QA } from "@/lib/local-industries";

export interface IndustryPage {
  name: string;
  slug: string;
  primaryKeyword: string;
  metaTitle: string;
  metaDescription: string;
  h1: string;
  accent: string;
  heroSub: string;
  answerCapsule: string;
  keywordMap: {
    commercial: string[];
    problem: string[];
    local: string[];
    note: string;
  };
  visual: {
    src: string;
    alt: string;
    eyebrow: string;
    title: string;
    caption: string;
  };
  usp: {
    title: string;
    body: string;
    points: string[];
  };
  comparison: {
    title: string;
    intro: string;
    rows: Array<{ option: string; strength: string; tradeoff: string }>;
  };
  founderAngle: string;
  story: {
    title: string;
    leftLabel: string;
    leftBody: string;
    rightLabel: string;
    rightBody: string;
    close: string;
  };
  journeyTitle: string;
  journey: Array<{ stage: string; query: string; response: string; next: string }>;
  framework: { name: string; definition: string; source: string; date: string };
  module: {
    eyebrow: string;
    title: string;
    answer: string;
    items: Array<{ label: string; title: string; body: string }>;
    note?: string;
    link?: { href: string; label: string };
  };
  trialSteps: Array<{ when: string; title: string; body: string }>;
  priceRange: { min: number; max: number };
  primaryCta: { label: string; target: string };
  secondaryCta: { label: string; target: string; event?: string };
  lateralLink: { slug: string; anchor: string; reason: string };
  resourceLinks: Array<{ href: string; label: string; context: string }>;
  showAllLocations?: boolean;
  /** What the work looks like, in place of a case study that does not exist yet. */
  approach: { title: string; body: string };
  sections: Array<{ heading: string; body: string }>;
  capsules: QA[];
  faqs: QA[];
  /** City page slugs (lib/city-pages.ts) with demand for this practice area. */
  locationsMentioned: string[];
}

type PracticeWireframe = Pick<
  IndustryPage,
  | "primaryKeyword" | "answerCapsule" | "story" | "journeyTitle" | "journey"
  | "keywordMap" | "visual" | "usp" | "comparison" | "founderAngle" | "framework" | "module" | "trialSteps" | "priceRange" | "primaryCta"
  | "secondaryCta" | "lateralLink" | "resourceLinks" | "showAllLocations"
>;
type BaseIndustryPage = Omit<IndustryPage, keyof PracticeWireframe>;

const NO_GUARANTEE: QA = {
  q: "Can you guarantee my firm ranks first?",
  a: "No, and nobody honestly can — Google decides rankings, and bar advertising rules (ABA Model Rule 7.1) bar misleading claims about services. What I can commit to is the work: the pages, the profile, the fixes, and a plain weekly report on what moved.",
};

const ONE_FIRM: QA = {
  q: "Do you work with competing firms in my city?",
  a: "No. I take one law firm per city, so I am never ranking you against another client.",
};

const NO_CONTRACT: QA = {
  q: "Is there a contract?",
  a: "No. Month to month, with the free tear-down first so you can see what the work would focus on before paying anything.",
};

const BASE_INDUSTRY_PAGES: BaseIndustryPage[] = [
  {
    name: "Personal Injury",
    slug: "personal-injury",
    metaTitle: "Personal Injury Lawyer SEO Services | 7-Day Free Trial",
    metaDescription:
      "SEO for personal injury lawyers: injury-type pages, Map Pack and AI visibility, and after-hours intake. $1,500–$2,500/mo. 7-day free trial.",
    h1: "Personal Injury Lawyer SEO for the Next Call",
    accent: "",
    heroSub:
      "Injured people search for what just happened to them. We build the injury pages, local profile and mobile intake path that help your firm appear at that moment—and make the next step clear when they reach you.",
    approach: {
      title: "What a personal injury campaign actually looks like",
      body: "No published personal injury case study yet, so here is the plan rather than a story. Clusters of pages by injury type instead of one head term, Business Profile work tied to the roads and hospitals in your jurisdiction, and results published with the facts that produced them. Our verified results so far are in ecommerce and local services, documented with Search Console data. You can be the first law firm we publish.",
    },
    sections: [
      {
        heading: "Why “Personal Injury Lawyer” Isn't Your Only Keyword",
        body: "The head term is the most contested search in the market. Clusters built around specific injury types — traumatic brain injury, commercial trucking, rideshare accidents — reach people closer to hiring, against far less competition.",
      },
      {
        heading: "The Business Profile and the Map Pack",
        body: "Proximity matters to injured clients. The profile's categories, the practice areas it lists, current photos and genuine reviews are what put a firm in the three-pack for searches near its office. Distance is fixed; the rest is work.",
      },
      {
        heading: "The Case You Lose at 2am",
        body: "Injury searches spike at night and from the roadside, on a phone with one bar of signal. A contact form is the wrong instrument for that moment. We put a tap-to-call above the fold, keep the mobile LCP under two and a half seconds, and make sure the number is a real one that a person answers. It is unglamorous work, and it decides more cases than any keyword.",
      },
      {
        heading: "Publishing Results Without Breaching Advertising Rules",
        body: "Settlement figures convert, and most state bars regulate how you present them. A number with no case facts, no disclaimer and no note that outcomes vary is an advertising problem in several jurisdictions. We publish results with the facts that produced them, which is both compliant and more persuasive than a bare figure — a reader wants to know whether their case looks like yours.",
      },
      {
        heading: "Pages About Your Roads and Hospitals",
        body: "Injured people and their families search for the crash they were in and the hospital they were taken to. Pages on the specific highways, intersections and trauma centres in your jurisdiction answer that directly, and tell Google exactly where your firm practises.",
      },
      {
        heading: "The Referral Keyword Nobody Targets",
        body: "Attorneys search too. Terms like referring a trucking case out of state, or co-counsel for a catastrophic injury claim, carry almost no volume and enormous value, because the searcher is another lawyer with a case they cannot take. Almost nobody writes for them. A single page explaining your referral terms and the cases you accept can be worth more than a thousand consumer visits.",
      },
    ],
    capsules: [
      {
        q: "How do personal injury law firms get clients from Google?",
        a: "Through pages for each injury type rather than one practice page, a Business Profile that puts the firm in the map pack near its office, genuine reviews, and a mobile page that makes calling easy at 2am. Injury searches are specific and urgent; the firm that answers the specific question, fast, gets the call.",
      },
      {
        q: "Does SearchPrex have a personal injury case study?",
        a: "Not yet. No law firm client has been published. SearchPrex's verified results are in ecommerce and local services, documented with Search Console screenshots, and the same technical, local and content work is what a PI campaign is built on.",
      },
      NO_GUARANTEE,
    ],
    faqs: [
      {
        q: "Can we publish settlement amounts on our website?",
        a: "Many state bars regulate it. The safe pattern is to publish results with the case facts, a clear note that outcomes vary, and whatever disclaimer your state requires. Check the rules for your jurisdiction — I build the page, your firm owns the compliance call.",
      },
      ONE_FIRM,
      {
        q: "Do you handle intake?",
        a: "The SEO work covers the mobile path to your phone. SearchPrex also has an AI intake assistant you can try live on the law firm SEO page.",
      },
      NO_CONTRACT,
    ],
    locationsMentioned: ["cleveland", "katy"],
  },
  {
    name: "Family Law",
    slug: "family-law",
    metaTitle: "Family Law Attorney SEO Services | Private Written Audit",
    metaDescription:
      "Private family law SEO audit for divorce and custody firms: county-level answers, discreet conversion paths and privacy-aware marketing. No ranking promises.",
    h1: "Family Law Attorney SEO for Private Local Searches",
    accent: "",
    heroSub:
      "People often research divorce and custody questions quietly before they contact a lawyer. We build calm, useful county-level answers and a privacy-aware path to your firm, so trust can start before a consultation.",
    approach: {
      title: "Where family law rankings actually come from",
      body: "No published family law case study yet, so here is the approach. Answers to the custody and asset-division questions people actually type, county-level content rather than state-level, and a review process that respects how sensitive this work is. Ads win the top of the page; the questions underneath them are still open.",
    },
    sections: [
      {
        heading: "The Pages a Divorce and Family Law Site Needs",
        body: "Divorce lawyer SEO is not one page. People search for their specific problem, so a family law site needs a page for each matter the firm takes: contested and uncontested divorce, child custody and parenting time, child support, spousal support, property and debt division, modifications after a decree, protective orders, prenuptial agreements and adoption. Each page answers the questions for that matter, names the county courts where the firm appears and links to the attorney who handles it. A single family law page competing for all of those searches loses to firms that built them separately.",
      },
      {
        heading: "Ready to Hire, or Still Researching",
        body: "Searches like divorce attorney near me, child custody lawyer in a named county or how much a divorce lawyer costs come from people close to hiring, and belong on the practice-area and location pages. Questions like how custody is decided, whether the house has to be sold or how long a divorce takes come from people months earlier, and belong in guides that link to those pages. Family law attorney SEO works when both exist and point to each other, so the person who read your guide in March finds the same firm in June.",
      },
      {
        heading: "The Search Starts Months Before the Call",
        body: "Nobody types divorce lawyer near me on day one. They spend weeks searching what happens to the house, whether they have to move out, and what custody actually means in practice. Firms write only for the final query and miss the entire research phase, which is where trust is built. Content for the pre-decision months is why a stranger calls you rather than the firm with the bigger ad budget.",
      },
      {
        heading: "Custody Rules Are Lived at County Level",
        body: "State statutes set the framework, but parenting-time norms, mediation requirements and how a particular bench actually rules are county-level realities. Generic state content answers none of what a parent is really asking. Naming the county, the court and the local process is what separates a page that ranks from one that reads like every other firm in the state.",
      },
      {
        heading: "Pages for the Courts You Practise In",
        body: "People look for a lawyer who knows their courthouse. A page for each county family court you appear in — the process, mediation requirements, what a first hearing looks like — answers that directly.",
      },
      {
        heading: "Answering the Questions People Type at Night",
        body: "Family law clients turn to Google and AI assistants with deeply personal questions, late at night. FAQ pages written as clear, direct answers give AI Overviews something citable for questions like “Can I move out of state with my child?”.",
      },
      {
        heading: "Complex Asset Questions",
        body: "Business valuations, retirement account division and hidden assets are specific, lower-volume searches from people with complex cases. A clear page on each reaches them directly.",
      },
      {
        heading: "People Research This on a Shared Device",
        body: "Family law searches happen incognito, at work, on a phone someone else can pick up. That has practical consequences: aggressive retargeting can put a divorce ad in front of the wrong person in the same house, and it damages trust more than it earns clicks. We keep remarketing off sensitive practice areas and make page titles readable in a browser history without exposing anything.",
      },
    ],
    capsules: [
      {
        q: "How do family law firms rank on Google?",
        a: "By answering the questions people search in the weeks before they call — custody, the house, asset division — at county level, where the real answers differ. Add a Business Profile with genuine reviews and pages for the courts the firm appears in, and the firm is visible through the whole research phase, not only at the final search.",
      },
      {
        q: "How can a family law firm appear in AI Overviews?",
        a: "Nobody controls what Google's AI cites, but clear, direct answers to specific questions — written by or reviewed by the attorney, on a page about that one question — are what these answers tend to draw from.",
      },
      {
        q: "What keywords should a divorce lawyer target?",
        a: "The matters the firm takes, in the words clients use, with the place: divorce lawyer, child custody attorney, child support lawyer, each with the city or county. Then the questions people ask before hiring — how custody is decided, what happens to the house — answered in guides that link to those pages. Which of these carries the most demand in a market is something to check in keyword tools and Search Console, not to guess.",
      },
      {
        q: "Does SearchPrex have a family law case study?",
        a: "Not yet. No law firm client has been published; SearchPrex's verified results are in ecommerce and local services.",
      },
    ],
    faqs: [
      NO_GUARANTEE,
      {
        q: "Will you run retargeting ads for my family law firm?",
        a: "Not on sensitive practice areas. Following someone around the web with divorce ads can expose them to others in their home, and it costs more trust than it earns.",
      },
      ONE_FIRM,
      NO_CONTRACT,
    ],
    locationsMentioned: ["sugar-land", "plano"],
  },
  {
    name: "Criminal Defense",
    slug: "criminal-defense",
    metaTitle: "Criminal Defense Lawyer SEO Services | 7-Day Free Trial",
    metaDescription:
      "Criminal defense SEO for charge-specific searches, family callers and a clear intake path. $1,200–$2,200/mo. 7-day free trial.",
    h1: "Criminal Defense Lawyer SEO for Urgent Searches",
    accent: "",
    heroSub:
      "When an arrest or charge disrupts a family's night, relatives may search before the accused can speak with counsel. We build charge-specific explanations, a fast mobile path and a clear intake handoff for your firm's approved process.",
    approach: {
      title: "Charge-level pages, not one practice page",
      body: "No published criminal defense case study yet. The approach is charge-specific pages — underage possession, a first DWI, a probation violation — rather than one page trying to rank for everything, plus intake that answers at 2am. In a university market the person searching is often a parent, not the defendant, and that changes the query and the tone entirely.",
    },
    sections: [
      {
        heading: "A Page for Every Charge You Defend",
        body: "A generic “criminal lawyer” page answers nobody's actual question. A page for each charge — from a first DWI to federal wire fraud — matches what the person searched and explains what happens next for that charge.",
      },
      {
        heading: "The Person Searching Is Often Not the Defendant",
        body: "Many criminal defense searches come from a parent, a spouse or a partner — frequently at night, frequently from another city, and frequently before the accused has spoken to anyone. That reader needs different information: what happens in the next twelve hours, whether they can visit, what bail will cost. Content written for the defendant misses them entirely.",
      },
      {
        heading: "Booking, Jail and Bail Questions",
        body: "Families search the local booking process, visiting rules and how bail works in that county. Clear pages on each answer the most urgent questions of the first night — and bring the family to a firm that can help.",
      },
      {
        heading: "Expungement Is the Long Tail Everyone Skips",
        body: "Record-clearing searches are steady, far less contested than active-charge terms, and convert into real fee work. They also reach someone who already has a conviction and therefore already knows they need a lawyer. Most firms treat expungement as an afterthought page. Treated properly, it is a reliable stream that does not compete with the firms bidding on arrest terms.",
      },
      {
        heading: "Speed Beats Polish at 2am",
        body: "A heavy hero video and a cookie banner are the difference between a call and a back button when someone is standing outside a police station. We strip the mobile critical path to what is needed to make a decision: the charge, the process, the number. Every additional second of load on that page has a cost you can see in call volume.",
      },
      {
        heading: "Reviews, Asked For Properly",
        body: "Criminal defense clients rarely volunteer reviews. A steady process that asks every client — never only the happy ones, which Google's review policies prohibit — builds a profile that holds up.",
      },
    ],
    capsules: [
      {
        q: "How do criminal defense attorneys get clients from Google?",
        a: "With a page for each charge they defend, a Business Profile that appears for urgent searches near the office, a mobile page that loads fast and puts the phone number first, and content for the family members who are often the ones searching.",
      },
      {
        q: "Why do criminal defense firms need charge-specific pages?",
        a: "Because people search the charge, not the practice area — a first DWI, a probation violation, underage possession. A page about that charge answers what happens next; a general criminal defense page does not.",
      },
      {
        q: "Does SearchPrex have a criminal defense case study?",
        a: "Not yet. No law firm client has been published; SearchPrex's verified results are in ecommerce and local services.",
      },
    ],
    faqs: [
      NO_GUARANTEE,
      {
        q: "Who checks the legal accuracy of the pages?",
        a: "You do. I write and structure every page; nothing about the law goes live until an attorney at your firm has approved it.",
      },
      ONE_FIRM,
      NO_CONTRACT,
    ],
    locationsMentioned: ["detroit", "cleveland"],
  },
  {
    name: "Estate Planning",
    slug: "estate-planning",
    metaTitle: "Estate Planning Attorney SEO Services | Free Search Map",
    metaDescription:
      "Estate planning attorney SEO: life-event content, county probate roadmaps and a free Search Map. $1,200–$2,000/mo. No ranking promises.",
    h1: "Estate Planning Attorney SEO for Families",
    accent: "",
    heroSub:
      "Families often postpone planning until a life event makes the questions feel immediate. We build clear guides, county-aware probate information and useful next steps that help a family decide when to speak with your firm.",
    approach: {
      title: "The questions that come before hiring",
      body: "No published estate planning case study yet. The approach is content built around what people search before they are ready to hire — revocable versus irrevocable, probate timelines in their county, what happens to a business interest — with structured data that makes those answers easy for search and AI results to read.",
    },
    sections: [
      {
        heading: "Probate Attorney SEO Starts After a Death",
        body: "Probate searches come from a different person at a different moment than estate planning searches: usually an adult child or executor, after a parent has died, trying to work out what to do first. They search for the county probate court, whether probate is needed at all, how long it takes and what an executor has to do. A probate page for each county you practise in, written for that person, reaches clients an estate planning page never will — and many of them later need their own will.",
      },
      {
        heading: "The Pages an Estate Planning Site Needs",
        body: "Wills, revocable living trusts, powers of attorney and healthcare directives, trust administration, probate and estate administration, and — where the firm does this work — business succession, special needs trusts and elder law planning. Each deserves its own page with the questions for that document, the attorney who handles it and the counties served. One general estate planning page cannot rank for all of them.",
      },
      {
        heading: "Experience and Trust on a YMYL Topic",
        body: "Google's quality rater guidelines treat legal topics as “Your Money or Your Life”, judged on experience, expertise, authoritativeness and trust. Attorney bios with real credentials, a named author on every guide and citations to the statutes discussed are how an estate planning site meets that bar.",
      },
      {
        heading: "Probate Timelines Are a County Question",
        body: "How long probate takes is one of the most common estate questions, and the honest answer depends on the county — its filing backlog, its local rules, whether it requires a hearing that the county next door handles on paper. State-level content cannot answer it. A page that gives the realistic timeline for your county answers a question no national site can, and it is the kind of specific answer that gets quoted in AI results.",
      },
      {
        heading: "The Adult Children Searching for Their Parents",
        body: "Often it is the adult children who search for elder law or probate help on behalf of their parents. Content that speaks to their questions — what to do first, what power of attorney allows — reaches the person actually making the call.",
      },
      {
        heading: "The Business Owner Nobody Writes For",
        body: "An owner searching what happens to my business when I die is worth a multiple of a general will enquiry, and almost nothing is written for them. Succession, buy-sell agreements, valuation on death and how a company interest passes are complex, high-value and under-served. This is the clearest content gap in most estate planning markets.",
      },
      {
        heading: "Your Real Competitor Is a Free Template",
        body: "Most people considering a will first consider doing it themselves online. Pretending that option does not exist loses the argument by default. Content that explains plainly when a template genuinely is enough, and the specific situations where it fails — blended families, property in another state, a business interest, a beneficiary with a disability — earns more trust than any claim of expertise, and reaches the searcher at the exact moment they are deciding.",
      },
      {
        heading: "Video That Lets Clients Meet You First",
        body: "Short videos explaining trusts and probate, on YouTube and embedded on the matching page, let a client see and hear the attorney before calling. Google shows video results for many how-to searches.",
      },
    ],
    capsules: [
      {
        q: "How do estate planning firms get clients from Google?",
        a: "By answering the questions people research for months before hiring — trusts versus wills, probate in their county, what happens to a business — in plain language, with a named attorney behind every answer. Add a Business Profile with genuine reviews, and the firm is there through the whole decision.",
      },
      {
        q: "What content works best for an estate planning firm?",
        a: "County-level probate answers, honest comparisons with DIY templates, and pages for business owners and for adult children searching on a parent's behalf — the questions national sites cannot answer and most local firms never write.",
      },
      {
        q: "What is probate attorney SEO?",
        a: "Getting a probate practice found by the executors and families who search after a death — for their county's probate court, whether probate is required, and what an executor must do. It works best with a page for each county served and plain answers to those first questions, linked to the attorney who handles probate.",
      },
      {
        q: "Does SearchPrex have an estate planning case study?",
        a: "Not yet. No law firm client has been published; SearchPrex's verified results are in ecommerce and local services.",
      },
    ],
    faqs: [NO_GUARANTEE, ONE_FIRM, NO_CONTRACT],
    locationsMentioned: ["the-woodlands", "sugar-land"],
  },
  {
    name: "Mass Torts",
    slug: "mass-torts",
    metaTitle: "Mass Tort Lawyer SEO | MDL Docket Pages | 7-Day Trial",
    metaDescription:
      "Mass tort & MDL lawyer SEO: sourced docket hubs, attorney review and clear intake. $1,800–$2,500/mo. 7-day trial; no ranking promises.",
    h1: "Mass Tort Lawyer SEO for MDL Search",
    accent: "",
    heroSub:
      "When a recall or court order changes the search landscape, your firm needs a reviewed process ready to move. We prepare sourced docket pages, clear eligibility language and intake pathways so your team can publish promptly after attorney approval.",
    approach: {
      title: "Moving fast when a docket opens",
      body: "No published mass tort case study yet. The approach is speed: content ready while a docket is still new, clear answers AI results can cite about the device or drug, and intake built to filter volume rather than drown in it. Mass tort SEO is won in the first weeks or not at all.",
    },
    sections: [
      {
        heading: "The First Two Weeks Decide the Docket",
        body: "When a docket opens, the ranking order is largely settled before most firms have finished approving a content brief. Being publishable within days, not weeks, is the entire competitive advantage in mass torts. That means the templates, the medical review process and the schema are built before the news breaks, not after.",
      },
      {
        heading: "Watching the Public Signals",
        body: "FDA recalls and Judicial Panel on Multidistrict Litigation orders are public. Monitoring them means drafting can start as soon as a docket looks likely, rather than after it is in the news.",
      },
      {
        heading: "People Search Symptoms Before They Search Lawsuits",
        body: "Nobody types their device name plus lawsuit first. They type the symptom, then the device or drug name, then whether it has been recalled, and only then whether anyone is suing. Firms that only target the final query arrive after the claimant has already read someone else's explanation. Mapping the full path from symptom to claim is how you reach them while they are still deciding whether something went wrong.",
      },
      {
        heading: "Winning Google AI Overviews for Mass Tort Claimants",
        body: "When prospective plaintiffs search diagnostic questions regarding chemical exposures, defective medical devices, or recall criteria, Google AI Overviews synthesize direct answers from structured, authoritative sources. We structure eligibility dates, injury timelines, and docket milestones into clear semantic blocks that answer engines cite.",
      },
      {
        heading: "Other Firms Are Searching Too",
        body: "Much of mass tort volume moves between firms rather than direct from claimants. A page that sets out your co-counsel terms, the case types you accept and the jurisdictions you are admitted in reaches a very small audience with very high value. It also builds the topical signals that help the consumer-facing pages, because a firm other lawyers cite is a firm search engines can place.",
      },
      {
        heading: "Compliance First",
        body: "Mass tort advertising draws close scrutiny from bars and regulators: no guarantees, no medical advice, clear disclaimers. Pages are written to those rules first and approved by your firm before they publish.",
      },
      {
        heading: "Authority Without Shortcuts",
        body: "National dockets are contested by firms with large, established sites. Links earned through genuinely useful resources and digital PR — never bought, which breaks Google's spam policies — are how a smaller firm competes.",
      },
    ],
    capsules: [
      {
        q: "What makes SEO for mass tort lawyers different from standard personal injury?",
        a: "Mass tort SEO often serves national docket intent as well as local personal injury searches. A useful plan prepares a sourced docket hub, attorney review workflow, clear eligibility language and co-counsel information. Search paths should be validated against current query data rather than assumed for every claimant.",
      },
      {
        q: "How do mass tort firms compete in organic search?",
        a: "A firm can prepare page templates, source lists, review ownership and structured data before a docket changes. Publication timing then depends on source availability and attorney approval. Content can cover product notices, court status and co-counsel terms without promising a ranking or claimant volume.",
      },
      {
        q: "Why do symptom searches matter for mass torts?",
        a: "Some searches may begin with a product or safety question before a person searches for litigation. A firm can map those queries using Search Console and keyword research, then publish sourced explanations that separate regulator information from legal eligibility and medical advice.",
      },
      {
        q: "Does SearchPrex have a mass tort case study?",
        a: "Not yet. No law firm client has been published; SearchPrex's verified results are in ecommerce and local services.",
      },
    ],
    faqs: [
      NO_GUARANTEE,
      {
        q: "Who reviews the medical content?",
        a: "Medical statements are sourced to published research or regulator notices and reviewed by your firm before anything goes live. The pages never give medical advice.",
      },
      NO_CONTRACT,
    ],
    locationsMentioned: ["philadelphia"],
  },
];

const PRACTICE_WIREFRAMES: Record<string, PracticeWireframe> = {
  "personal-injury": {
    primaryKeyword: "personal injury lawyer SEO",
    keywordMap: {
      commercial: ["personal injury lawyer SEO", "car accident lawyer SEO", "truck accident lawyer SEO"],
      problem: ["what to do after a car accident", "do I need a lawyer after a truck accident", "how long do I have to file a personal injury claim"],
      local: ["personal injury lawyer near me", "car accident attorney [city]", "slip and fall lawyer [city]"],
      note: "Prioritize case-type and question-led pages before competing for the broad head term; validate demand by city in Search Console.",
    },
    visual: { src: "/images/services/law-firm/law-firm-relief-from-ppc-burnout.webp", alt: "Personal injury law firm SEO planning scene with an attorney reviewing a local search growth dashboard", eyebrow: "When the phone should feel easier to answer", title: "Turn a high-stress search into a clear next step", caption: "Illustrative visual: the page experience should help an injured person understand what the firm handles and how to make contact, without promising a legal result." },
    usp: { title: "One injury cluster, one accountable search path", body: "SearchPrex connects the injury page, local profile and mobile intake path instead of treating rankings and enquiries as separate projects.", points: ["Case-type pages before vanity head terms", "Local profile and city-page alignment", "Founder-reviewed intake and weekly reporting"] },
    comparison: { title: "Personal injury SEO vs. the usual alternatives", intro: "The right channel depends on urgency, budget and how much of the search journey your firm can own.", rows: [{ option: "PPC only", strength: "Fast visibility", tradeoff: "Stops when the budget stops; the firm owns little organic demand." }, { option: "Lead vendor", strength: "Can send enquiries", tradeoff: "Often shares the same lead and gives less control over the page or brand." }, { option: "Generic SEO", strength: "Builds a foundation", tradeoff: "Can miss injury type, local and after-hours intent." }, { option: "SearchPrex injury SEO", strength: "Maps case type → city → intake", tradeoff: "Compounds more slowly and needs attorney review before publishing." }] },
    founderAngle: "For an injury firm, I would rather show the exact page and call path we will review than sell a vague promise about rankings or signed cases.",
    answerCapsule: "Personal injury lawyer SEO helps a firm appear when people search after a crash, fall or workplace injury. It combines injury-type pages, a correctly categorized Google Business Profile, fast mobile pages and an intake path that works at night, so injured callers can understand the next step and reach the firm.",
    story: { title: "Tuesday, 2:07 a.m.", leftLabel: "Her screen", leftBody: "An emergency-room waiting room. Her phone is nearly out of battery. She searches what to do after a car accident, then whether she needs a lawyer after a truck crash. One result goes to voicemail. Another demands an eleven-field form. A third makes the call path obvious.", rightLabel: "Your firm", rightBody: "The trial lawyer is asleep, as any person would be. The website says only “Practice Areas,” and the contact form asks for details she does not have yet. The opportunity is not to promise an outcome; it is to make the next useful step easy and ensure the firm can respond.", close: "A useful injury SEO page answers the question a caller is searching, explains what the firm handles and makes the next contact step easy on a phone. This scenario is illustrative; it shows how clear content and intake can meet a moment without implying guaranteed leads or results." },
    journeyTitle: "Caller Search Timeline",
    journey: [
      { stage: "First hours", query: "what to do after a car accident", response: "A plain-language injury guide and short checklist, reviewed by the firm before publication.", next: "Tap-to-call or a low-friction case-review request." },
      { stage: "Days 2–3", query: "do I need a lawyer after a truck accident", response: "A focused truck-accident page explains what the firm handles without predicting a result.", next: "A clear review path and response expectation." },
      { stage: "Week 1–2", query: "insurance adjuster recorded statement; how long to file a claim", response: "Attorney-reviewed explainers use jurisdiction-specific sources and a visible review date.", next: "Relevant service pages for readers ready to speak with counsel." },
      { stage: "Month 1–2", query: "best truck accident lawyer near me", response: "A complete Business Profile, useful reviews, attorney bios and clear service information.", next: "Call, message or request a consultation using the firm's actual intake process." },
    ],
    framework: { name: "The 2 A.M. Intake Test", definition: "The 2 A.M. Intake Test checks whether a person with an urgent injury question can understand the next step and reach the firm on a mobile phone outside office hours. It follows the path from query to page to contact, then records where clarity or response breaks down.", source: "SearchPrex practice-page and intake review method; queries are illustrative and should be validated in Search Console or keyword research.", date: "2026-10-31" },
    module: { eyebrow: "The 2 A.M. Intake Test", title: "Call your own firm after hours, then follow the path as a caller would", answer: "The test walks through a mobile search, the matching injury page, the phone or form, and the follow-up the firm actually provides. It reveals avoidable friction without estimating legal outcomes. Compare the intake assistant demo with your own approved process.", items: [{ label: "01", title: "Search", body: "Start with an injury question, not only the firm's name." }, { label: "02", title: "Understand", body: "Confirm the page explains what the firm handles and what a caller can do next." }, { label: "03", title: "Reach", body: "Test tap-to-call, the form and after-hours routing on a phone." }, { label: "04", title: "Follow up", body: "Check that the firm receives a useful summary and responds within its stated timeframe." }], note: "Illustrative demo only; not legal advice and not a client result.", link: { href: "/intake-assistant", label: "Try the AI intake assistant" } },
    trialSteps: [{ when: "Days 1–2", title: "Injury search gap", body: "Review one injury-type cluster, local profile alignment and the mobile contact path." }, { when: "Days 3–5", title: "One page outline", body: "Prepare an attorney-reviewable outline and answer capsule for one priority injury page." }, { when: "Day 7", title: "Founder review", body: "Walk through findings and next steps before ongoing work is agreed." }],
    priceRange: { min: 1500, max: 2500 }, primaryCta: { label: "Claim my 7-day free trial", target: "#get-started" }, secondaryCta: { label: "Run the 2 A.M. Intake Test", target: "/intake-assistant", event: "intake_demo_start" },
    lateralLink: { slug: "mass-torts", anchor: "mass tort SEO for coordinated product claims", reason: "Some injury searches involve many people harmed by one product rather than a single crash." },
    resourceLinks: [{ href: "/services/law-firm-seo/google-business-profile-for-lawyers", label: "Google Business Profile for lawyers", context: "Categories, local visibility and review practices." }, { href: "/case-calculator", label: "Lost Case Calculator", context: "Explore the intake assumptions behind missed enquiries." }, { href: "/pricing", label: "Law firm SEO pricing", context: "See current scope and month-to-month terms." }, { href: "/blog/law-firm-seo-2026-guide", label: "Law firm SEO guide", context: "Read the broader search strategy." }],
  },
  "family-law": {
    primaryKeyword: "family law attorney SEO",
    keywordMap: {
      commercial: ["family law attorney SEO", "divorce lawyer SEO", "child custody lawyer SEO"],
      problem: ["how is parenting time decided in [county]", "what happens to the house if I separate", "how much does a divorce lawyer cost"],
      local: ["family law attorney near me", "divorce attorney [city]", "custody lawyer [county]"],
      note: "Build discreet, county-aware answers around the questions people ask before they are ready to call; never imply search interest reveals a person's situation.",
    },
    visual: { src: "/images/services/law-firm/searchprex-law-firm-care-representative.webp", alt: "Calm law office consultation scene representing a privacy-aware family law client journey", eyebrow: "Trust before contact", title: "Make the first search feel safe, calm and useful", caption: "Illustrative visual: family-law searchers often need control over timing and contact method before they are ready to speak with an attorney." },
    usp: { title: "Privacy-aware family law content", body: "The strategy respects that a divorce or custody search may happen privately, so useful answers and contact choices come before aggressive follow-up.", points: ["County-aware divorce and custody answers", "Private written audit option", "No pressure to call and no sensitive remarketing claims"] },
    comparison: { title: "Family law SEO vs. ads and directory dependence", intro: "A private search journey needs more than a phone number at the top of a page.", rows: [{ option: "PPC only", strength: "Immediate exposure", tradeoff: "Paid clicks do not answer the quiet questions that build trust." }, { option: "Directory profile", strength: "Comparison presence", tradeoff: "The firm is one listing among many with limited owned context." }, { option: "Generic family page", strength: "Simple to launch", tradeoff: "It rarely matches divorce, custody and county-specific intent." }, { option: "SearchPrex family SEO", strength: "Answers sensitive questions calmly", tradeoff: "Trust compounds through reviewed content and a discreet conversion path." }] },
    founderAngle: "For family law, the first conversion is often trust. I keep the audit written and private so the firm can decide what to share and when.",
    answerCapsule: "Family law attorney SEO helps a firm appear while people privately research divorce, custody, support and related questions. It combines matter-specific pages, county-aware explanations, a trusted Google Business Profile and privacy-conscious conversion paths, so people can understand the firm's services before deciding whether to make contact.",
    story: { title: "The quiet search", leftLabel: "Their screen", leftBody: "After the house is quiet, someone searches whether they can stay in the home, how parenting time is decided and what to prepare before speaking with counsel. They are not ready to call. They need a composed answer and control over when they take the next step.", rightLabel: "Your firm", rightBody: "A capable attorney may be the right fit, but a generic page or intrusive follow-up gives the searcher little reason to trust that. Clear county-level information, discreet contact choices and no pressure help your firm's experience become visible before the first conversation.", close: "Family law pages can earn trust before a call by answering sensitive questions calmly, explaining verified county processes and giving the reader control over contact. This illustrative scenario shows why privacy and clarity belong in the page experience from the first search." },
    journeyTitle: "The Four-Stage Private Journey",
    journey: [{ stage: "Recognize", query: "what happens to the house if I separate", response: "A discreet guide answers one concern in plain language and identifies when local advice matters.", next: "Offer an optional private email resource." }, { stage: "Understand", query: "how is parenting time decided in [County]", response: "A county-aware page names the local process and is reviewed by the firm's attorney.", next: "Link to the attorney and matter page that can help." }, { stage: "Compare", query: "how much does a divorce lawyer cost", response: "Explain the firm's consultation and fee approach without implying a guaranteed result.", next: "Let the reader choose email, form or call." }, { stage: "Reach out", query: "family law attorney near me", response: "A complete Business Profile, useful service pages and a calm mobile experience support the final search.", next: "Make contact optional, clear and private." }],
    framework: { name: "The Quiet Search Journey", definition: "The Quiet Search Journey maps the private research that can happen before someone contacts a family lawyer. It connects early questions, county-specific information and a low-pressure conversion choice while avoiding sensitive retargeting that could expose a person's search to others.", source: "SearchPrex privacy-aware family law content method; legal statements require attorney review in the relevant jurisdiction.", date: "2026-10-31" },
    module: { eyebrow: "The Quiet Search Journey", title: "Four stages that let the reader set the pace", answer: "A family law search can move from private question to local research, comparison and contact over days or weeks. The content should answer the immediate concern, explain what changes by county, and offer a discreet next step without pressuring the reader or exposing a sensitive search through unnecessary ad retargeting.", items: [{ label: "01", title: "Private question", body: "Answer carefully and plainly, without pressure to call." }, { label: "02", title: "Local understanding", body: "Explain the county process only where the firm can verify it." }, { label: "03", title: "Evaluate the firm", body: "Introduce the lawyer, relevant experience and consultation process." }, { label: "04", title: "Choose contact", body: "Offer a private written audit or consultation request; keep sensitive remarketing off." }], note: "Search examples are illustrative. Validate demand with Search Console and keyword research." },
    trialSteps: [{ when: "Days 1–2", title: "Private search review", body: "Review one matter cluster, county relevance and contact and privacy choices." }, { when: "Days 3–5", title: "Written opportunity map", body: "Send a private email audit with one answer capsule and page outline." }, { when: "Day 7", title: "Founder follow-up", body: "Email findings and optional next steps; no call unless you request one." }],
    priceRange: { min: 1200, max: 2200 }, primaryCta: { label: "Request a private written audit", target: "#get-started" }, secondaryCta: { label: "Review law firm SEO pricing", target: "/pricing" },
    lateralLink: { slug: "estate-planning", anchor: "estate planning SEO for blended families and post-divorce planning", reason: "Divorce, remarriage and blended-family planning can lead to new estate-planning needs." },
    resourceLinks: [{ href: "/services/law-firm-seo/google-business-profile-for-lawyers", label: "Google Business Profile for lawyers", context: "Build accurate local service and attorney information." }, { href: "/free-audit", label: "Free SEO audit", context: "Learn what a founder-reviewed audit includes." }, { href: "/pricing", label: "Law firm SEO pricing", context: "Review engagement terms and scope." }],
  },
  "criminal-defense": {
    primaryKeyword: "criminal defense lawyer SEO",
    keywordMap: {
      commercial: ["criminal defense lawyer SEO", "DUI lawyer SEO", "criminal defense attorney near me"],
      problem: ["what happens after an arrest for [charge]", "where is someone booked in [county]", "what should I ask a criminal defense lawyer"],
      local: ["DUI attorney [city]", "bond hearing lawyer [county]", "felony defense lawyer near me"],
      note: "Charge-specific and family-facing search paths are the practical starting point; local court information must be verified before publishing.",
    },
    visual: { src: "/images/services/law-firm/usa-law-firm-seo-hero-dashboard.webp", alt: "Nighttime law office dashboard representing an urgent criminal defense search path across the United States", eyebrow: "The first 72 hours", title: "Be clear when a family is searching under pressure", caption: "Illustrative visual: a charge page should orient the searcher and make the firm's approved intake path visible without predicting the case outcome." },
    usp: { title: "Charge-specific clarity when the clock feels loud", body: "Criminal defense search works best when the page speaks to the charge, the county and the next approved contact step—not a generic practice-area slogan.", points: ["Charge and court intent mapped separately", "Family-facing and accused-facing paths", "After-hours call-path review"] },
    comparison: { title: "Criminal defense SEO vs. a generic practice page", intro: "People searching after an arrest do not have time to decode a broad list of services.", rows: [{ option: "PPC only", strength: "Can reach urgent searches", tradeoff: "Every click has a cost and the page still needs to earn trust." }, { option: "Generic criminal page", strength: "Covers the practice", tradeoff: "May not match DUI, felony, warrant or court-specific intent." }, { option: "Directory listing", strength: "Adds citation presence", tradeoff: "Little room to explain process, coverage or intake." }, { option: "SearchPrex criminal SEO", strength: "Charge → county → call path", tradeoff: "Requires accurate court information and attorney review." }] },
    founderAngle: "My job is to make the first search less confusing: the charge, the location and the real way to reach the office should agree.",
    answerCapsule: "Criminal defense lawyer SEO helps a firm appear when someone or their family searches for a specific charge, court process or next step. It combines charge-specific pages, accurate local information, a complete Google Business Profile and a mobile intake path that makes it easier to reach the firm without promising a legal outcome.",
    story: { title: "The first 72 hours", leftLabel: "The family's search", leftBody: "A parent gets a call after midnight. They do not know which court handles the case or what questions to ask. One search is about the charge; another is about where their child is being held. They need orientation and a way to reach qualified counsel.", rightLabel: "Your firm's response", rightBody: "If the site has only a broad criminal-defense page and an office-hours form, it leaves immediate questions unanswered. A useful page explains the firm's process, the limits of online information and the fastest approved way to contact the office.", close: "Criminal defense pages should orient people searching a specific charge and help a family reach the firm's approved intake path. This illustrative scenario focuses on clarity and access during uncertainty; it is not a client matter or a promise of legal outcome." },
    journeyTitle: "The First-72-Hours Map",
    journey: [{ stage: "First search", query: "what happens after an arrest for [charge]", response: "A charge-specific page explains the process at a high level and is reviewed by the attorney.", next: "Offer a direct, prominent call path." }, { stage: "Confirm location", query: "where is someone booked in [County]", response: "A local resource points only to verified public agency information and current hours.", next: "Explain what the firm can and cannot advise online." }, { stage: "Find counsel", query: "[charge] defense lawyer near me", response: "An attorney bio, relevant practice page and Business Profile support comparison.", next: "Give relatives a simple way to reach intake." }, { stage: "Follow through", query: "how do I talk to a lawyer about a [charge]", response: "A short form or call path asks only for information the firm needs at this stage.", next: "Route and respond using the firm's real intake coverage." }],
    framework: { name: "The First-72-Hours Map", definition: "The First-72-Hours Map organizes the first searches a person or family may make after an arrest: understand the charge, locate reliable public information, find counsel and make contact. It is a content and intake planning framework, not legal guidance or a prediction about any case.", source: "SearchPrex criminal defense search-path framework; all charge, court and procedure copy must be reviewed by the firm's attorney.", date: "2026-10-31" },
    module: { eyebrow: "Two searchers, one clear intake path", title: "Write for the accused and for the person trying to help", answer: "The person named in a criminal search may not be the person using the phone. Charge pages should orient the accused, while family-facing information should explain practical next steps and a safe way to contact the firm. Both routes need accurate local details and attorney review before publication.", items: [{ label: "The accused", title: "Charge and process", body: "Explain the firm's scope and what information the attorney needs." }, { label: "The family", title: "Where and whom to contact", body: "Link to verified public resources and make the firm's intake number easy to find." }, { label: "The firm", title: "After-hours routing", body: "Test voicemail, call forwarding and any assistant against actual coverage." }], note: "Demonstrations are illustrative and are not legal advice.", link: { href: "/intake-assistant", label: "Test the intake assistant" } },
    trialSteps: [{ when: "Days 1–2", title: "Charge and call-path review", body: "Review one charge cluster, local search path and an after-hours contact test." }, { when: "Days 3–5", title: "One reviewed outline", body: "Prepare one charge-page outline and answer capsule for attorney review." }, { when: "Day 7", title: "Founder review", body: "Share findings and agree on the next step only if the scope fits." }],
    priceRange: { min: 1200, max: 2200 }, primaryCta: { label: "Claim the 7-day trial + call-path test", target: "#get-started" }, secondaryCta: { label: "Open the intake assistant", target: "/intake-assistant", event: "intake_demo_start" },
    lateralLink: { slug: "family-law", anchor: "family law SEO for protective-order and custody overlap", reason: "Protective orders, family safety and custody searches can overlap with criminal defense intake." },
    resourceLinks: [{ href: "/services/law-firm-seo/google-business-profile-for-lawyers", label: "Google Business Profile for lawyers", context: "Make local firm details and practice categories accurate." }, { href: "/intake-assistant", label: "AI Intake Assistant", context: "Try the sample intake conversation." }, { href: "/case-calculator", label: "Lost Case Calculator", context: "Explore intake assumptions." }, { href: "/pricing", label: "Law firm SEO pricing", context: "See current monthly terms." }],
  },
  "estate-planning": {
    primaryKeyword: "estate planning attorney SEO",
    keywordMap: {
      commercial: ["estate planning attorney SEO", "living trust lawyer SEO", "probate attorney SEO"],
      problem: ["living trust vs will", "how to avoid probate in [county]", "who will care for my children if I die"],
      local: ["estate planning attorney near me", "living trust attorney [city]", "probate lawyer [county]"],
      note: "Separate planning, document and probate intent so each family question lands on a focused, attorney-reviewed page rather than one generic services list.",
    },
    visual: { src: "/images/services/law-firm/city-the-woodlands-texas-law-firm-seo.webp", alt: "The Woodlands Texas skyline and waterway representing local estate planning and probate search visibility", eyebrow: "Local trust for life-event decisions", title: "Connect family questions to the right local next step", caption: "Illustrative visual: estate-planning and probate pages should explain local context without pretending every family follows the same timeline or document plan." },
    usp: { title: "Separate planning from probate intent", body: "A family looking for a living trust is not asking the same question as an executor searching for a probate filing. The page architecture respects that difference.", points: ["Life-event and document clusters", "County probate sources and review dates", "Plain-language answers without fear-based claims"] },
    comparison: { title: "Estate planning SEO vs. DIY and broad legal pages", intro: "The strongest page is not the one with the most documents listed; it is the one that answers the family’s actual moment.", rows: [{ option: "DIY document search", strength: "Low-friction starting point", tradeoff: "May not reflect family structure, assets or local requirements." }, { option: "Broad estate page", strength: "Easy to publish", tradeoff: "Blends wills, trusts and probate into one unclear journey." }, { option: "PPC only", strength: "Fast local visibility", tradeoff: "Pays for every visit and leaves fewer lasting answers." }, { option: "SearchPrex estate SEO", strength: "Life event → service → local next step", tradeoff: "Needs current sources and attorney review for accuracy." }] },
    founderAngle: "Estate planning marketing should reduce confusion, not manufacture urgency. I build the map so the attorney can review each life-event path before it goes live.",
    answerCapsule: "Estate planning attorney SEO helps a firm appear when families research wills, trusts, probate and life changes. It combines life-event content, county-specific probate information, attorney-reviewed answers and a trusted local profile, so people can understand the firm's services while deciding whether to plan or seek help administering an estate.",
    story: { title: "The letter they keep meaning to write", leftLabel: "The family's moment", leftBody: "A folder marked “wills” sits on a desk. A new child, a home purchase or a parent's passing brings the questions back. A late-night search for the difference between a will and a trust is not just a keyword; it is a first step toward a difficult conversation.", rightLabel: "Your firm's opportunity", rightBody: "The family may find a template seller before a local attorney. Helpful explanations can show when a simple document may be enough and when circumstances call for individualized advice—without fear-based claims or disparaging alternatives.", close: "Estate-planning pages can make a hard conversation easier to begin by answering life-event questions plainly, explaining when individual advice matters and offering a useful next step. This illustrative scenario shows how a family might move from postponement to a search without fear-based claims." },
    journeyTitle: "The Life-Event Trigger Map",
    journey: [{ stage: "New child", query: "who will care for my children if I die", response: "A guardianship and wills guide introduces the questions a parent may want to discuss with counsel.", next: "Offer a planning checklist." }, { stage: "Home or wealth milestone", query: "living trust vs will; how to avoid probate", response: "A plain-language comparison explains the documents and when individual facts matter.", next: "Link to the firm's estate-planning service." }, { stage: "Marriage, divorce or remarriage", query: "update estate plan after divorce", response: "A blended-family guide shows why old documents may need review after a life change.", next: "Connect to family law where useful." }, { stage: "Retirement or aging parent", query: "elder law attorney; Medicaid planning", response: "An attorney-reviewed overview clarifies what the firm handles and what needs tailored advice.", next: "Invite a Search Map request." }, { stage: "A loved one passes", query: "how to start probate in [County]; executor duties", response: "A county probate roadmap uses current court sources and avoids unsupported day counts.", next: "Offer a probate consultation path." }],
    framework: { name: "The Life-Event Trigger Map", definition: "The Life-Event Trigger Map connects common changes—new child, home purchase, marriage, retirement or a death—to estate-planning and probate questions people may search. It separates planning from administration, then points each search to a relevant attorney-reviewed guide and a proportionate next step.", source: "SearchPrex estate-planning content framework; probate timelines and legal explanations require county and attorney verification.", date: "2026-10-31" },
    module: { eyebrow: "County probate roadmap", title: "Explain the local steps without guessing at the timeline", answer: "A probate roadmap helps an executor understand the broad sequence from filing a petition to closing an estate. The page should cite the county court's current instructions, distinguish general information from legal advice and carry an attorney review date. Publish timing only when the firm can source and maintain it.", items: [{ label: "01", title: "Petition and filing", body: "Link the correct county forms and current filing instructions." }, { label: "02", title: "Notice and administration", body: "Explain the general steps and identify where local rules apply." }, { label: "03", title: "Inventory and claims", body: "Describe the process at a high level; attorney verifies details." }, { label: "04", title: "Distribution and closing", body: "Show what an executor may need to confirm before closing." }], note: "Do not publish day counts until verified against current county sources and reviewed by the firm's attorney.", link: { href: "/services/law-firm-seo/family-law", label: "Family law SEO for divorce and remarriage planning" } },
    trialSteps: [{ when: "Days 1–2", title: "Planning and probate gap", body: "Separate life-event planning searches from probate administration and review local fit." }, { when: "Days 3–5", title: "One Search Map", body: "Prepare a free search map with one trigger-page or county-roadmap outline." }, { when: "Day 7", title: "Founder review", body: "Email the map and discuss priorities if you want to continue." }],
    priceRange: { min: 1200, max: 2000 }, primaryCta: { label: "Get my free Search Map", target: "#get-started" }, secondaryCta: { label: "See the 7-day trial steps", target: "#trial", event: "trial_click" },
    lateralLink: { slug: "family-law", anchor: "family law SEO for divorce, remarriage and blended-family questions", reason: "Divorce and remarriage often prompt a family to review its estate plan." },
    resourceLinks: [{ href: "/services/law-firm-seo/google-business-profile-for-lawyers", label: "Google Business Profile for lawyers", context: "Strengthen local trust and accurate firm information." }, { href: "/tools/keyword-research", label: "Law firm keyword research", context: "Validate demand behind life-event searches." }, { href: "/free-audit", label: "Free SEO audit", context: "See the existing written audit option." }, { href: "/pricing", label: "Law firm SEO pricing", context: "Review scope and month-to-month terms." }],
  },
  "mass-torts": {
    primaryKeyword: "mass tort lawyer SEO",
    keywordMap: {
      commercial: ["mass tort lawyer SEO", "MDL attorney SEO", "mass tort lead generation"],
      problem: ["do I qualify for [product] lawsuit", "[product] recall and lawsuit", "what is the status of [MDL]"],
      local: ["mass tort attorney near me", "[state] [product] lawsuit lawyer", "mass tort case evaluation"],
      note: "Map awareness, eligibility and contact-ready terms to a sourced docket hub; national product and MDL intent matters more than a single city page.",
    },
    visual: { src: "/images/services/law-firm/usa-served-cities-cleveland-sugarland-woodlands.webp", alt: "Three United States city scenes representing national mass tort and MDL search coverage", eyebrow: "National reach, source-first publishing", title: "Be ready when a new docket changes the search", caption: "Illustrative visual: mass-tort search is national and matter-led, so the page needs a source, reviewer and update date before it needs more words." },
    usp: { title: "Source-first docket readiness", body: "Mass tort search changes with recalls, filings and court orders. SearchPrex builds a repeatable workflow so a firm can move quickly without letting speed outrun sourcing or attorney review.", points: ["Awareness → eligibility → intake mapping", "Primary-source and update-date discipline", "Matter-specific disclosures and attorney approval"] },
    comparison: { title: "Mass tort SEO vs. lead buying and generic content", intro: "A mass tort search is national and matter-led; it needs a docket workflow, not a recycled local law firm page.", rows: [{ option: "Lead buying", strength: "Can add volume quickly", tradeoff: "Less control over source, exclusivity and the claimant experience." }, { option: "News-only content", strength: "Can capture awareness", tradeoff: "May not explain eligibility or provide a compliant intake path." }, { option: "Generic PI SEO", strength: "Shares some foundations", tradeoff: "Misses MDL, product and procedural intent." }, { option: "SearchPrex docket SEO", strength: "Source → status → eligibility → intake", tradeoff: "Requires a current matter, primary sources and attorney review." }] },
    founderAngle: "A new docket creates pressure to publish. My differentiator is a reviewable workflow that lets the firm move with the facts, not ahead of them.",
    answerCapsule: "Mass tort SEO helps a firm appear early in searches about a drug, device or product-liability docket. It combines sourced docket hubs, plain-language eligibility criteria, court and regulator timelines, an attorney-reviewed intake path and clear advertising disclosures. Publication speed depends on source availability and how quickly the firm's attorney reviews the draft.",
    story: { title: "Friday, 5:40 p.m.", leftLabel: "The search begins", leftBody: "A device maker posts a recall notice. By Saturday, people are searching the product name and what the notice means. Information is developing, and readers need a sourced explanation that distinguishes known facts from questions still under review.", rightLabel: "Your firm's readiness", rightBody: "A team with a prepared sourcing, review and publishing workflow can start a careful draft sooner. The page goes live only when relevant facts and attorney approval are in place; speed cannot replace accuracy or clear disclosure.", close: "A docket-ready SEO workflow pairs each new search need with a primary source, reviewer and update date. This illustrative scenario shows how a firm can prepare to move promptly when facts are verified, while keeping eligibility language and advertising disclosures under attorney review." },
    journeyTitle: "Recall-to-Retainer Timeline: The Docket Clock",
    journey: [{ stage: "Symptom concern", query: "[product] side effects", response: "A sourced explainer separates regulator and label information from medical advice.", next: "Link to the primary source and date the update." }, { stage: "Recall or safety notice", query: "[product] recall; FDA warning", response: "State what the notice says, what it does not establish and when it was checked.", next: "Cite the FDA notice and avoid unsupported injury claims." }, { stage: "JPML petition or MDL", query: "[product] lawsuit; [MDL] docket", response: "A docket hub gives the court, docket number and verified procedural milestones.", next: "Link to public court records and explain status." }, { stage: "Eligibility", query: "do I qualify for [product] lawsuit", response: "Criteria come from reviewed filings or the firm's attorney, with uncertainty stated plainly.", next: "Do not promise eligibility or compensation." }, { stage: "Intake", query: "[product] lawyer", response: "Explain the requested information and include required attorney-advertising disclosures.", next: "Route enquiries using the firm's approved process." }],
    framework: { name: "The Docket Clock", definition: "The Docket Clock tracks a public signal from early product or symptom questions through a recall, court action, eligibility review and intake. Each step pairs a search need with a primary source, a review owner and an update date so speed does not outrun accuracy.", source: "SearchPrex mass-tort publishing workflow; sources begin with FDA notices, product labeling, JPML orders and court dockets.", date: "2026-10-31" },
    module: { eyebrow: "Docket Hub template", title: "A source-first page structure ready for review under deadline", answer: "A docket hub keeps facts, sources, procedural timeline, eligibility language and intake together for a specific matter. Each section should identify its source and review date, and a qualified attorney should approve legal interpretations and advertising language before publication.", items: [{ label: "Overview", title: "What happened", body: "Concise sourced summary with a visible last-checked date." }, { label: "Eligibility", title: "Who may qualify", body: "Criteria based on public filings or attorney review; no guarantee of a claim." }, { label: "Timeline", title: "Docket status", body: "Court, docket number and dated events linked to the source." }, { label: "Next steps", title: "What a reader can do", body: "General, non-medical information and a clear contact path." }, { label: "Questions", title: "FAQ and intake", body: "Direct answers, firm-specific instructions and required disclosures." }], note: "A template is a planning aid. Each real docket page needs matter-specific sources and attorney review.", link: { href: "/tools/schema-generator", label: "Preview structured data with the schema tool" } },
    trialSteps: [{ when: "Days 1–2", title: "Docket-readiness audit", body: "Review sourcing, review ownership, page structure and schema for a representative docket." }, { when: "Days 3–5", title: "Sample hub outline", body: "Prepare one sourced outline and intake checklist for attorney review." }, { when: "Day 7", title: "Founder review", body: "Walk through the workflow and agree what an engagement would require." }],
    priceRange: { min: 1800, max: 2500 }, primaryCta: { label: "Request a docket-readiness audit", target: "#get-started" }, secondaryCta: { label: "See the 7-day trial steps", target: "#trial", event: "trial_click" },
    lateralLink: { slug: "personal-injury", anchor: "personal injury SEO for single-incident cases", reason: "Some product-liability enquiries concern one person's injury rather than a coordinated docket." },
    resourceLinks: [{ href: "/resources/news?category=Law%20Firm%20SEO%20News", label: "Law firm SEO news desk", context: "Follow relevant legal search developments." }, { href: "/tools/keyword-research", label: "Law firm keyword research", context: "Map search language across a docket." }, { href: "/tools/schema-generator", label: "Schema Markup Generator", context: "Review structured data options for a real hub." }, { href: "/pricing", label: "Law firm SEO pricing", context: "See monthly terms and scope." }],
    showAllLocations: true,
  },
};

export const INDUSTRY_PAGES: IndustryPage[] = BASE_INDUSTRY_PAGES.map((page) => ({
  ...page,
  ...PRACTICE_WIREFRAMES[page.slug],
}));

// A cost question on every practice-area page, from the page-specific range.
const COST_SUBJECT: Record<string, string> = {
  "personal-injury": "personal injury law firm SEO",
  "family-law": "family law SEO",
  "criminal-defense": "criminal defense SEO",
  "estate-planning": "estate planning SEO",
  "mass-torts": "mass tort SEO",
};
for (const p of INDUSTRY_PAGES) {
  const cost = {
    q: `How much does ${COST_SUBJECT[p.slug] ?? `${p.name} SEO`} cost?`,
    a: `${p.name} SEO is scoped at $${p.priceRange.min.toLocaleString()}–$${p.priceRange.max.toLocaleString()} per month for the plan described on this page. Final scope depends on practice areas, locations and content volume. Work is month to month; see the pricing page for the current general plan and terms.`,
  };
  p.faqs.splice(Math.max(0, p.faqs.length - 1), 0, cost);
}
