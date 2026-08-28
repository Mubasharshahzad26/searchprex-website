export interface IndustryPage {
  name: string;
  slug: string;
  metaTitle: string;
  metaDescription: string;
  h1: string;
  heroSub: string;
  semanticKeywords: string[];
  caseStudy: {
    title: string;
    description: string;
    mapQuery: string; // Used for Google Maps embed
  };
  aiIntakeOffer: string;
  usps: string[];
  uniqueSections: {
    heading: string;
    body: string;
  }[];
  locationsMentioned: string[]; // slugs
}

export const INDUSTRY_PAGES: IndustryPage[] = [
  {
    name: "Personal Injury",
    slug: "personal-injury",
    metaTitle: "Personal Injury SEO Services",
    metaDescription: "Dominate the highest-CPC keywords in your market. We help personal injury law firms rank for car accident and catastrophic injury terms locally.",
    h1: "Stop Losing Six-Figure Car Accident Cases to Billboard Lawyers",
    heroSub: "You know you're a better trial lawyer. Let's make sure injured plaintiffs find you first when they search. Advanced Personal Injury SEO with semantic clustering and local authority building.",
    semanticKeywords: ["Car Accident Attorney SEO", "Catastrophic Injury Lawyer Marketing", "MVA Law Firm SEO", "Workers Comp SEO Strategy", "Wrongful Death Attorney Marketing", "TBI Lawyer Near Me", "Rideshare Accident Lawyer SEO"],
    caseStudy: {
      title: "What a Personal Injury Campaign Actually Looks Like",
      description: "We have not published a personal injury case study yet, so here is the plan rather than a story. Semantic clusters by injury type instead of one head term, Google Business Profile work tied to the hospitals and highways in your jurisdiction, and case-result schema. Our verified results so far are in ecommerce and local services, documented with Search Console data. You can be the first law firm we publish.",
      mapQuery: "Detroit, MI",
    },
    aiIntakeOffer: "Bonus: Get 30 Days of our AI Intake Efficiency SaaS for FREE when you sign up for any Personal Injury SEO package. Qualify leads instantly while you're in court.",
    usps: [
      "Weekly SEO Reports (No guessing where your money goes)",
      "Fair, transparent communication",
      "Budget-friendly, high-ROI packages tailored for PI firms",
      "You communicate directly with me (Mubashar Shahzad, Founder)",
    ],
    uniqueSections: [
      {
        heading: "Why 'Personal Injury Lawyer' Isn't Your Only Keyword",
        body: "Most agencies chase the single highest volume keyword and fail. We build semantic clusters around specific injury types (TBI, commercial trucking, rideshare accidents) to capture high-intent users who are ready to hire.",
      },
      {
        heading: "Local Map Pack Domination",
        body: "Proximity matters for injured clients. We optimize your Google Business Profile with localized schema, driving directions, and local link building to ensure you dominate the Local 3-Pack in your zip code.",
      },
      {
        heading: "Geo-Fenced Content Silos",
        body: "We map out the exact hospital zones and major highways in your jurisdiction. By writing highly specific content about local accident hotspots and emergency rooms, we send massive local relevancy signals to Google."
      },
      {
        heading: "Authoritative Case Result Schema",
        body: "Personal injury clients want to see winning verdicts. We implement specific Legal Service and Case Result schema markup so your multi-million dollar settlements appear as rich snippets directly in the search results, instantly building trust."
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
        heading: "The Referral Keyword Nobody Targets",
        body: "Attorneys search too. Terms like referring a trucking case out of state, or co-counsel for a catastrophic injury claim, carry almost no volume and enormous value, because the searcher is another lawyer with a case they cannot take. Almost nobody writes for them. A single page explaining your referral terms and the cases you accept can be worth more than a thousand consumer visits.",
      },
    ],
    locationsMentioned: ["detroit", "baton-rouge", "philadelphia"],
  },
  {
    name: "Family Law",
    slug: "family-law",
    metaTitle: "Family Law SEO | Divorce Attorney Marketing",
    metaDescription: "Connect with high-net-worth clients during their most vulnerable times. Specialized family law and divorce SEO strategies.",
    h1: "Connect With Clients When They Need You Most: Family Law SEO",
    heroSub: "Divorce and custody clients don't want a salesman, they want an advocate. We position your firm as the most trusted, authoritative voice in your county.",
    semanticKeywords: ["Divorce Lawyer SEO", "High Net Worth Divorce Marketing", "Child Custody Attorney SEO", "Alimony Lawyer SEO", "Family Law Marketing Agency", "Mediation Attorney SEO", "Prenuptial Agreement Lawyer SEO"],
    caseStudy: {
      title: "Where Family Law Rankings Actually Come From",
      description: "No published family law case study yet, so here is the approach. Answer Engine Optimization around the custody and asset-division questions people actually type, county-level content rather than state-level, and a review strategy that respects how sensitive this work is. Ads win the top of the page; the questions underneath them are still open.",
      mapQuery: "Grand Rapids, MI",
    },
    aiIntakeOffer: "Bonus: Get 30 Days of our AI Intake Efficiency SaaS for FREE with your Family Law SEO package. Automate sensitive initial client consultations 24/7.",
    usps: [
      "Weekly, easy-to-read SEO Reports",
      "Fair communication with no agency jargon",
      "Budget-friendly solutions for growing family practices",
      "Communicate directly with the Founder, Mubashar Shahzad",
    ],
    uniqueSections: [
      {
        heading: "Empathy-Driven Content Strategy",
        body: "Family law requires a delicate tone. We write high-empathy, legally accurate content that answers complex questions about asset division and custody, building trust before they even call.",
      },
      {
        heading: "Targeting High-Net-Worth Divorces",
        body: "We don't just drive traffic; we drive the right traffic. By targeting long-tail, semantic keywords around business valuations, 401(k) divisions, and hidden assets, we attract clients with substantial estates.",
      },
      {
        heading: "Answering the Unasked Questions (AEO)",
        body: "Family law clients turn to AI and Google to ask deeply personal questions late at night. We structure your FAQ pages with Answer Engine Optimization (AEO) so your firm is cited as the source in AI Overviews for questions like 'Can I move out of state with my child?'."
      },
      {
        heading: "Hyper-Local Court Venue Targeting",
        body: "People search for lawyers familiar with their specific judge and courthouse. We create localized pages detailing your experience in specific county family courts, establishing you as the local insider."
      },
      {
        heading: "The Search Starts Months Before the Call",
        body: "Nobody types divorce lawyer near me on day one. They spend weeks searching what happens to the house, whether they have to move out, and what custody actually means in practice. Firms write only for the final query and miss the entire research phase, which is where trust is built. Content for the pre-decision months is why a stranger calls you rather than the firm with the bigger ad budget.",
      },
      {
        heading: "People Research This on a Shared Device",
        body: "Family law searches happen incognito, at work, on a phone someone else can pick up. That has practical consequences: aggressive retargeting can put a divorce ad in front of the wrong person in the same house, and it damages trust more than it earns clicks. We keep remarketing off sensitive practice areas and make page titles readable in a browser history without exposing anything.",
      },
      {
        heading: "Custody Rules Are Lived at County Level",
        body: "State statutes set the framework, but parenting-time norms, mediation requirements and how a particular bench actually rules are county-level realities. Generic state content answers none of what a parent is really asking. Naming the county, the court and the local process is what separates a page that ranks from one that reads like every other firm in the state.",
      },
    ],
    locationsMentioned: ["grand-rapids", "sugar-land", "plano"],
  },
  {
    name: "Criminal Defense",
    slug: "criminal-defense",
    metaTitle: "Criminal Defense SEO Agency",
    metaDescription: "Urgent cases require instant visibility. We help criminal defense attorneys dominate local search for DUI, felonies, and federal charges.",
    h1: "When They Get One Phone Call, Make Sure It's To Your Firm",
    heroSub: "Criminal defense is the most urgent search in the legal industry. If you aren't in the top 3 on Google Maps, you don't exist. Let's fix that.",
    semanticKeywords: ["DUI Attorney SEO", "Federal Criminal Defense Marketing", "Misdemeanor Lawyer SEO", "Domestic Violence Attorney SEO", "Criminal Law Firm Marketing", "White Collar Crime SEO", "Drug Possession Lawyer Marketing"],
    caseStudy: {
      title: "Charge-Level Pages, Not One Practice Page",
      description: "No published criminal defence case study yet. The approach is charge-specific pages — underage possession, a first DWI, a probation violation — rather than one page trying to rank for everything, plus intake that answers at 2am. In a university market the person searching is often a parent, not the defendant, and that changes the query and the tone entirely.",
      mapQuery: "Denton, TX",
    },
    aiIntakeOffer: "Bonus: Include our AI Intake Efficiency SaaS FREE for 30 Days. Let the AI handle 2AM jail calls and qualify urgency while you sleep.",
    usps: [
      "Weekly transparent SEO Reports",
      "Fair, honest communication",
      "Budget-friendly pricing that makes sense",
      "Direct line to the Founder",
    ],
    uniqueSections: [
      {
        heading: "Urgency and Mobile Optimization",
        body: "Over 80% of criminal defense searches happen on mobile devices in moments of panic. We ensure your site is lightning-fast, mobile-first, and optimized for 'near me' searches with click-to-call functionality front and center.",
      },
      {
        heading: "Granular Charge-Specific Pages",
        body: "Generic 'criminal lawyer' pages don't convert. We build dedicated, highly optimized pages for every specific charge you defend—from federal wire fraud to local DWIs—matching the exact intent of the searcher.",
      },
      {
        heading: "County Jail and Bail Bond Integrations",
        body: "We target secondary searchers: family members trying to get a loved one out of jail. By creating content around local booking processes and bail bonds, we capture high-intent leads who need immediate representation."
      },
      {
        heading: "Reputation Management & Review Funnels",
        body: "In criminal defense, bad reviews from angry opposing parties or stressed clients can tank your rankings. We implement automated review generation strategies that filter positive outcomes to your Google Business Profile, proving your reliability."
      },
      {
        heading: "The Person Searching Is Often Not the Defendant",
        body: "A large share of criminal defence searches come from a parent, a spouse or a partner — frequently at night, frequently from another city, and frequently before the accused has spoken to anyone. That reader needs different information: what happens in the next twelve hours, whether they can visit, what bail will cost. Content written for the defendant misses them entirely.",
      },
      {
        heading: "Expungement Is the Long Tail Everyone Skips",
        body: "Record-clearing searches are steady, far less contested than active-charge terms, and convert into real fee work. They also reach someone who already has a conviction and therefore already knows they need a lawyer. Most firms treat expungement as an afterthought page. Treated properly, it is a reliable stream that does not compete with the firms bidding on arrest terms.",
      },
      {
        heading: "Speed Beats Polish at 2am",
        body: "A heavy hero video and a cookie banner are the difference between a call and a back button when someone is standing outside a police station. We strip the mobile critical path to what is needed to make a decision: the charge, the process, the number. Every additional second of load on that page has a measurable cost you can see in call volume.",
      },
    ],
    locationsMentioned: ["denton", "tempe", "albuquerque"],
  },
  {
    name: "Estate Planning",
    slug: "estate-planning",
    metaTitle: "Estate Planning SEO Services",
    metaDescription: "Build long-term trust and attract high-value clients with specialized Estate Planning and Probate SEO strategies.",
    h1: "Become the Most Trusted Estate Planning Authority in Your City",
    heroSub: "Estate planning clients are searching for peace of mind, not just a lawyer. We use semantic SEO and E-E-A-T principles to position you as the definitive local expert.",
    semanticKeywords: ["Probate Lawyer SEO", "Wills and Trusts Marketing", "Elder Law Attorney SEO", "Asset Protection Lawyer SEO", "Estate Administration Marketing", "Business Succession SEO", "Special Needs Trust Attorney Marketing"],
    caseStudy: {
      title: "The Questions That Come Before Hiring",
      description: "No published estate planning case study yet. The approach is content built around what people search before they are ready to hire — revocable versus irrevocable, probate timelines in their county, what happens to a business interest — with schema that makes those answers extractable into AI results.",
      mapQuery: "Sugar Land, TX",
    },
    aiIntakeOffer: "Bonus: Get 30 Days of our AI Intake Efficiency SaaS FREE with your Estate Planning SEO package. Qualify leads and gather initial asset details automatically.",
    usps: [
      "Weekly SEO Reports (Watch your traffic grow)",
      "Fair communication (We tell you what works)",
      "Budget-friendly pricing for steady growth",
      "Communicate directly with Founder Mubashar Shahzad",
    ],
    uniqueSections: [
      {
        heading: "Mastering E-E-A-T for Estate Law",
        body: "Google heavily scrutinizes 'Your Money or Your Life' (YMYL) pages. We optimize your author bios, schema markup, and external citations to prove your Experience, Expertise, Authoritativeness, and Trustworthiness.",
      },
      {
        heading: "Educational Content that Converts",
        body: "Estate planning is a long sales cycle. We create comprehensive guides on probate processes, tax implications, and trust structures that capture top-of-funnel traffic and nurture them into clients.",
      },
      {
        heading: "Targeting the 'Sandwich Generation'",
        body: "Often, it's the adult children searching for elder law or probate attorneys on behalf of their aging parents. Our semantic keyword strategy targets the specific anxieties of this demographic, driving multi-generational client relationships."
      },
      {
        heading: "Video SEO & Trust Building",
        body: "Estate planning requires immense personal trust. We help you optimize your YouTube and embedded website videos explaining complex trusts. Video snippets often rank at the top of Google for 'how-to' queries, putting your face directly in front of the client."
      },
      {
        heading: "Probate Timelines Are a County Question",
        body: "How long probate takes is the single most searched estate question, and the honest answer depends on the county — its filing backlog, its local rules, whether it requires a hearing that the county next door handles on paper. State-level content cannot answer it. A page that gives the realistic timeline for your county answers a question no national site can, and it is the kind of specific answer that gets quoted in AI results.",
      },
      {
        heading: "The Business Owner Nobody Writes For",
        body: "An owner searching what happens to my business when I die is worth a multiple of a general will enquiry, and almost nothing is written for them. Succession, buy-sell agreements, valuation on death and how a company interest passes are complex, high-value and under-served. This is the clearest content gap in most estate planning markets.",
      },
      {
        heading: "Your Real Competitor Is a Free Template",
        body: "Most people considering a will first consider doing it themselves online. Pretending that option does not exist loses the argument by default. Content that explains plainly when a template genuinely is enough, and the specific situations where it fails — blended families, property in another state, a business interest, a beneficiary with a disability — earns more trust than any claim of expertise, and reaches the searcher at the exact moment they are deciding.",
      },
    ],
    locationsMentioned: ["sugar-land", "grand-rapids"],
  },
  {
    name: "Mass Torts",
    slug: "mass-torts",
    metaTitle: "Mass Torts SEO & Law Firm Marketing",
    metaDescription: "Compete nationally for high-value mass tort leads. Advanced SEO for class actions, dangerous drugs, and defective products.",
    h1: "National Reach, Local Authority: Advanced Mass Torts SEO",
    heroSub: "Stop relying solely on expensive TV buys and paid lead gen. Build a sustainable organic pipeline for the most competitive dockets in the country.",
    semanticKeywords: ["Camp Lejeune SEO", "Class Action Lawyer Marketing", "Defective Product Attorney SEO", "Dangerous Drug Law Firm SEO", "Mass Tort Lead Generation", "Paraquat Parkinson's SEO", "Talcum Powder Lawsuit Marketing"],
    caseStudy: {
      title: "Moving Fast When a Docket Opens",
      description: "No published mass tort case study yet. The approach is speed: content deployed while a docket is still new, Generative Engine Optimization so the firm is cited in AI answers about the device or drug, and intake built to filter volume rather than drown in it. Mass tort SEO is won in the first weeks or not at all.",
      mapQuery: "Philadelphia, PA",
    },
    aiIntakeOffer: "Bonus: Mass torts mean massive volume. Get 30 Days of our AI Intake Efficiency SaaS FREE to automatically filter out unqualified claimants and fast-track the best cases.",
    usps: [
      "Weekly SEO Reports to track national rankings",
      "Fair, honest communication on competitive dockets",
      "Budget-friendly compared to $500+ CPCs",
      "Communicate directly with me, Mubashar Shahzad",
    ],
    uniqueSections: [
      {
        heading: "Agile SEO for Breaking Dockets",
        body: "When a new tort drops, speed is everything. We monitor FDA recalls and judicial panel consolidations to deploy highly optimized, compliant content before your competitors even know about the docket.",
      },
      {
        heading: "National Authority Building",
        body: "Ranking for national mass torts requires immense domain authority. We execute high-tier digital PR and contextual link building to ensure your firm can compete with the mega-firms.",
      },
      {
        heading: "Symptom-to-Lawsuit Mapping",
        body: "Plaintiffs rarely search for the name of a complex litigation. They search for their symptoms and the drug they took. We build informational silos connecting these medical queries directly to your legal representation."
      },
      {
        heading: "Compliance-First Content Architecture",
        body: "Mass tort advertising is heavily scrutinized by state bars. We ensure all SEO content ranks aggressively while strictly adhering to advertising rules regarding guarantees and medical advice."
      },
      {
        heading: "The First Two Weeks Decide the Docket",
        body: "When a docket opens, the ranking order is largely settled before most firms have finished approving a content brief. Being publishable within days, not weeks, is the entire competitive advantage in mass torts. That means the templates, the medical review process and the schema are built before the news breaks, not after.",
      },
      {
        heading: "People Search Symptoms Before They Search Lawsuits",
        body: "Nobody types their device name plus lawsuit first. They type the symptom, then the device or drug name, then whether it has been recalled, and only then whether anyone is suing. Firms that only target the final query arrive after the claimant has already read someone else's explanation. Mapping the full path from symptom to claim is how you reach them while they are still deciding whether something went wrong.",
      },
      {
        heading: "Other Firms Are Searching Too",
        body: "Much of mass tort volume moves between firms rather than direct from claimants. A page that sets out your co-counsel terms, the case types you accept and the jurisdictions you are admitted in reaches a very small audience with very high value. It also builds the topical signals that help the consumer-facing pages, because a firm other lawyers cite is a firm search engines can place.",
      },
    ],
    locationsMentioned: ["philadelphia", "detroit", "baton-rouge"],
  }
];
