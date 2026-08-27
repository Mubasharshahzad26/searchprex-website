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
    metaTitle: "Personal Injury SEO Services | SearchPrex",
    metaDescription: "Dominate the highest-CPC keywords in your market. We help personal injury law firms rank for car accident and catastrophic injury terms locally.",
    h1: "Stop Losing Six-Figure Car Accident Cases to Billboard Lawyers",
    heroSub: "You know you're a better trial lawyer. Let's make sure injured plaintiffs find you first when they search. Advanced Personal Injury SEO with semantic clustering and local authority building.",
    semanticKeywords: ["Car Accident Attorney SEO", "Catastrophic Injury Lawyer Marketing", "MVA Law Firm SEO", "Workers Comp SEO Strategy", "Wrongful Death Attorney Marketing"],
    caseStudy: {
      title: "Taking over the Dallas PI Market",
      description: "We helped a boutique personal injury firm in Dallas capture top 3 rankings for 'truck accident lawyer dallas' within 7 months, leading to a 300% increase in qualified case leads. Become our next first-page success story in your city.",
      mapQuery: "Dallas, TX",
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
      }
    ],
    locationsMentioned: ["dallas", "fort-worth", "sugar-land"],
  },
  {
    name: "Family Law",
    slug: "family-law",
    metaTitle: "Family Law SEO | Divorce Attorney Marketing by SearchPrex",
    metaDescription: "Connect with high-net-worth clients during their most vulnerable times. Specialized family law and divorce SEO strategies.",
    h1: "Connect With Clients When They Need You Most: Family Law SEO",
    heroSub: "Divorce and custody clients don't want a salesman, they want an advocate. We position your firm as the most trusted, authoritative voice in your county.",
    semanticKeywords: ["Divorce Lawyer SEO", "High Net Worth Divorce Marketing", "Child Custody Attorney SEO", "Alimony Lawyer SEO", "Family Law Marketing Agency"],
    caseStudy: {
      title: "Owning the Local Market in Grand Rapids",
      description: "A mid-sized family law practice struggled against massive ad budgets. By focusing on Answer Engine Optimization (AEO) for complex custody questions, we bypassed ads and ranked them organically. Become our next major case study.",
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
        body: "We don't just drive traffic; we drive the right traffic. By targeting long-tail, semantic keywords around business valuations and hidden assets, we attract clients with substantial estates.",
      }
    ],
    locationsMentioned: ["grand-rapids", "detroit"],
  },
  {
    name: "Criminal Defense",
    slug: "criminal-defense",
    metaTitle: "Criminal Defense SEO Agency | SearchPrex",
    metaDescription: "Urgent cases require instant visibility. We help criminal defense attorneys dominate local search for DUI, felonies, and federal charges.",
    h1: "When They Get One Phone Call, Make Sure It's To Your Firm",
    heroSub: "Criminal defense is the most urgent search in the legal industry. If you aren't in the top 3 on Google Maps, you don't exist. Let's fix that.",
    semanticKeywords: ["DUI Attorney SEO", "Federal Criminal Defense Marketing", "Misdemeanor Lawyer SEO", "Domestic Violence Attorney SEO", "Criminal Law Firm Marketing"],
    caseStudy: {
      title: "Dominating the Denton University Market",
      description: "By targeting specific university-related charges (underage drinking, possession), we helped a Denton firm capture the student demographic, bypassing generic DFW competitors. Let us make you our next success story.",
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
        body: "Over 80% of criminal defense searches happen on mobile devices in moments of panic. We ensure your site is lightning-fast, mobile-first, and optimized for 'near me' searches.",
      },
      {
        heading: "Granular Charge-Specific Pages",
        body: "Generic 'criminal lawyer' pages don't convert. We build dedicated, highly optimized pages for every specific charge you defend—from federal wire fraud to local DWIs—matching the exact intent of the searcher.",
      }
    ],
    locationsMentioned: ["denton", "cleveland"],
  },
  {
    name: "Estate Planning",
    slug: "estate-planning",
    metaTitle: "Estate Planning SEO Services | SearchPrex",
    metaDescription: "Build long-term trust and attract high-value clients with specialized Estate Planning and Probate SEO strategies.",
    h1: "Become the Most Trusted Estate Planning Authority in Your City",
    heroSub: "Estate planning clients are searching for peace of mind, not just a lawyer. We use semantic SEO and E-E-A-T principles to position you as the definitive local expert.",
    semanticKeywords: ["Probate Lawyer SEO", "Wills and Trusts Marketing", "Elder Law Attorney SEO", "Asset Protection Lawyer SEO", "Estate Administration Marketing"],
    caseStudy: {
      title: "Capturing High-Value Estates in Philadelphia",
      description: "We optimized a local firm's content for complex probate and irrevocable trust queries, generating consistent leads from high-net-worth families. You can be our next local SEO case study.",
      mapQuery: "Philadelphia, PA",
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
      }
    ],
    locationsMentioned: ["philadelphia", "albuquerque"],
  },
  {
    name: "Mass Torts",
    slug: "mass-torts",
    metaTitle: "Mass Torts SEO & Law Firm Marketing | SearchPrex",
    metaDescription: "Compete nationally for high-value mass tort leads. Advanced SEO for class actions, dangerous drugs, and defective products.",
    h1: "National Reach, Local Authority: Advanced Mass Torts SEO",
    heroSub: "Stop relying solely on expensive TV buys and paid lead gen. Build a sustainable organic pipeline for the most competitive dockets in the country.",
    semanticKeywords: ["Camp Lejeune SEO", "Class Action Lawyer Marketing", "Defective Product Attorney SEO", "Dangerous Drug Law Firm SEO", "Mass Tort Lead Generation"],
    caseStudy: {
      title: "Breaking into the National Top 10",
      description: "We utilized advanced Generative Engine Optimization (GEO) and rapid content deployment to rank a mid-sized firm nationally for a newly announced defective medical device docket. Partner with us and become our next major case study.",
      mapQuery: "United States",
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
      }
    ],
    locationsMentioned: ["plano", "dallas"],
  }
];
