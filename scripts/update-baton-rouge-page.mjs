import fs from 'fs';
import path from 'path';

const filePath = path.resolve('lib/city-pages.ts');
let content = fs.readFileSync(filePath, 'utf8');

const startIdx = content.indexOf('citySlug: "baton-rouge"');
if (startIdx === -1) {
  console.error("Could not find citySlug: 'baton-rouge'");
  process.exit(1);
}

const objStart = content.lastIndexOf('{', startIdx);
const nextCityMarker = 'citySlug: "shreveport"';
const nextCityIdx = content.indexOf(nextCityMarker, objStart);

if (nextCityIdx === -1) {
  console.error("Could not find next city 'shreveport'");
  process.exit(1);
}

const objEnd = content.lastIndexOf('{', nextCityIdx);

const batonRougeNewEntry = `{
    stateSlug: "louisiana",
    citySlug: "baton-rouge",
    city: "Baton Rouge",
    state: "Louisiana",
    stateAbbr: "LA",
    county: "East Baton Rouge Parish",
    metaTitle: "Baton Rouge Law Firm SEO | 19th JDC Map Pack & Retainers",
    metaDescription:
      "Baton Rouge law firm SEO for personal injury, maritime, and family law attorneys. Dominate East Baton Rouge Parish Map Pack and AI search visibility. Month-to-month.",
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

  `;

content = content.slice(0, objStart) + batonRougeNewEntry + content.slice(objEnd);
fs.writeFileSync(filePath, content, 'utf8');
console.log("Successfully updated Baton Rouge in lib/city-pages.ts");
