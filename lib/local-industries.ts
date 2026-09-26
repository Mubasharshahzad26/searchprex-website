// lib/local-industries.ts
//
// Local SEO industry pages — /services/local-seo/[industry].
//
// One page per local business type SearchPrex has actually worked in, and no
// others. Each is built around that trade's own search behaviour and the case
// studies that back it; figures come from app/case-studies/data.ts (read by
// client slug, never retyped) and captions from app/case-studies/details.ts.
//
// Deliberately NOT a city x industry grid ("HVAC SEO Plano", "Roofing SEO
// Detroit"). Pages that differ only by the city name are what Google's spam
// policies call doorway pages, the penalty can reach the whole site, and those
// searches have next to no volume. A city page for a trade gets built when
// Search Console shows real impressions for it.
//
// Industries with no client yet (plumbing, dental...) are left out until there
// is something true to show.

export interface QA {
  q: string;
  a: string;
}

export interface LocalIndustry {
  slug: string;
  /** Trade name as it appears in headings, e.g. "HVAC". */
  name: string;
  /** Primary keyword for the H1 and title, e.g. "HVAC SEO Services". */
  h1: string;
  accent: string;
  metaTitle: string;
  metaDescription: string;
  heroSub: string;
  /** Case study `client` slugs whose metrics, links and screenshots this page uses. */
  caseClients: string[];
  problems: Array<{ title: string; check: string; costs: string }>;
  capsules: QA[];
  included: Array<{ title: string; body: string }>;
  faqs: QA[];
}

export const LOCAL_INDUSTRIES: LocalIndustry[] = [
  {
    slug: "hvac",
    name: "HVAC",
    h1: "HVAC SEO Services",
    accent: "for the calls that come in a heatwave",
    metaTitle: "HVAC SEO Services | Map Pack & AI Overviews for HVAC Companies",
    metaDescription:
      "SEO for HVAC companies: Business Profile, service-area pages and AI Overview visibility. One HVAC client is now named in Google's AI Overview for AC installation.",
    heroSub:
      "When the AC fails in July, people search once and call whoever is at the top. I get HVAC companies into the map pack and named in AI Overviews — with the case studies to show it.",
    caseClients: ["local-hvac-services", "hvac-team"],
    problems: [
      {
        title: "No page for each service",
        check: "Search “AC installation [your city]”. Is there a page on your site built for exactly that?",
        costs: "One “Services” page cannot rank for installation, repair, maintenance and furnace work in every town you cover.",
      },
      {
        title: "A profile set up as a shop, not a service area",
        check: "Does your Business Profile list the towns you drive to, and the right categories — “HVAC contractor”, “Air conditioning contractor”?",
        costs: "Service-area and category settings decide which searches the profile is even eligible for.",
      },
      {
        title: "Content that ignores the seasons",
        check: "Do you publish anything before summer and winter rushes, or only after?",
        costs: "Demand spikes with the weather. The pages already ranking when it turns hot are the ones that take the calls.",
      },
      {
        title: "Ads and profiles above you",
        check: "Look at what shows above the map pack for “AC repair near me”.",
        costs: "Local Services Ads sit above the pack on many HVAC searches, so organic and map visibility has to work harder for the clicks left.",
      },
    ],
    capsules: [
      {
        q: "How does an HVAC company rank in Google Maps?",
        a: "By matching the search, being close enough, and being well known. For HVAC that means the right primary category, the towns you serve listed on the profile, a page on your site for each service, and a steady flow of recent reviews. Distance you cannot change; the rest you can.",
      },
      {
        q: "What results has SearchPrex got for HVAC companies?",
        a: "HVAC Services Team is named by Google's AI Overview for a free-estimate AC installation search in Simi Valley, has a blog post ranking first organically, and ranks on page one for “local ac installation Simi Valley”. A second HVAC client, HVAC Team, moved up 40 positions to page one for its primary service keywords.",
      },
      {
        q: "Is SEO worth it for HVAC compared with ads?",
        a: "Ads buy calls this week and stop when the budget does. SEO takes longer to build and keeps bringing calls in the seasons after. Most HVAC companies do best running both, then leaning on organic for the services it covers.",
      },
    ],
    included: [
      { title: "Business Profile for service areas", body: "Categories, services, service areas, photos and weekly posts, set up for the searches that bring calls." },
      { title: "A page per service and area", body: "Installation, repair, maintenance and heating — each with its own page, written for the people searching for it." },
      { title: "Seasonal content", body: "Answers to the questions people ask before each rush, published ahead of it — one such post now ranks first." },
      { title: "AI Overview readiness", body: "Clear, direct answers and structured data so Google can name your company when it answers an HVAC question." },
      { title: "Reviews", body: "A steady, policy-safe way to ask real customers for reviews after each job." },
      { title: "Monday reporting", body: "Calls, map positions and what changed, in plain English." },
    ],
    faqs: [
      {
        q: "How long does HVAC SEO take to work?",
        a: "The HVAC client in the case study reached the top three in the map pack and an AI Overview placement within 60 days; a crowded market or a suspended profile takes longer. The free tear-down gives you a realistic read for your area.",
      },
      {
        q: "Can you help with emergency “near me” searches?",
        a: "Yes. Those depend mostly on the Business Profile — categories, service areas, hours and reviews — plus a page that answers the emergency directly.",
      },
      {
        q: "Do you write the seasonal content?",
        a: "Yes, written for your area and your services, and published before demand arrives rather than after.",
      },
      {
        q: "Is there a contract?",
        a: "No. Month to month, with the free tear-down first so you know what the work would focus on.",
      },
    ],
  },
  {
    slug: "roofing",
    name: "Roofing",
    h1: "Roofing SEO Services",
    accent: "for jobs worth thousands",
    metaTitle: "Roofing SEO Services | Rank for Roof Repair & Replacement",
    metaDescription:
      "SEO for roofing contractors: service pages, Business Profile and statewide visibility. Mammoth Roofing ranks seventh for “Local Residential Roof Repair in Texas”.",
    heroSub:
      "A roof is one of the biggest purchases a homeowner makes, and they research before they call. I get roofing contractors found for repair and replacement searches — backed by a Texas roofing client's results.",
    caseClients: ["mammoth-roofing"],
    problems: [
      {
        title: "Repair and replacement on one page",
        check: "Do you have separate pages for roof repair, roof replacement and storm damage?",
        costs: "They are different searches from people at different stages; one page answers none of them well.",
      },
      {
        title: "No proof of the work",
        check: "Does your site and profile show recent job photos with the town named?",
        costs: "Homeowners judge a roofer on finished work. Photos and reviews that name the area are also what Google reads as local relevance.",
      },
      {
        title: "Invisible when the storm comes",
        check: "After the last storm in your area, did anything on your site answer “roof damage [your city]”?",
        costs: "Storm-driven searches spike overnight; the firms with a page ready take those jobs.",
      },
      {
        title: "Only competing city by city",
        check: "Search your service plus your state, not just your city.",
        costs: "Broader, statewide searches carry volume and are winnable — Mammoth Roofing ranks seventh for one.",
      },
    ],
    capsules: [
      {
        q: "How do roofing companies get more leads from Google?",
        a: "Separate pages for repair, replacement and storm damage, a Business Profile with the right category and real job photos, and reviews that name the towns you work in. Roofing jobs are expensive, so homeowners compare — the contractor with the clearest answers and visible proof gets the call.",
      },
      {
        q: "What results has SearchPrex got for a roofing company?",
        a: "Mammoth Roofing, in Texas, ranks seventh for the statewide search “Local Residential Roof Repair in Texas” and reached top-six positions for competitive roofing terms, with 210 more monthly clicks and 45K impressions in Search Console.",
      },
      {
        q: "Should a roofer target the city or the whole state?",
        a: "Both, in that order. City pages win the local, ready-to-hire searches; broader state searches carry more volume and bring in jobs from towns you did not write a page for.",
      },
    ],
    included: [
      { title: "Service pages", body: "Repair, replacement, storm damage and inspections — each its own page, answering what homeowners ask before they call." },
      { title: "Business Profile", body: "“Roofing contractor” category, service areas, and job photos that name the town." },
      { title: "Storm-ready content", body: "Pages that answer storm and insurance questions, live before the weather hits." },
      { title: "Statewide visibility", body: "Pages targeting broader state searches, the kind Mammoth Roofing now ranks for." },
      { title: "Reviews and proof", body: "Reviews and project photos that do double duty: they convince homeowners and they tell Google where you work." },
      { title: "Monday reporting", body: "Calls, rankings and what changed." },
    ],
    faqs: [
      {
        q: "How long does roofing SEO take?",
        a: "Local rankings usually start moving within weeks of the pages and profile being fixed; competitive and statewide terms take longer. The free tear-down shows what is realistic in your market.",
      },
      {
        q: "Do you handle storm-damage searches?",
        a: "Yes — pages written in advance for storm and insurance questions, so they are ranking when demand arrives.",
      },
      {
        q: "Can you help us rank outside our city?",
        a: "Yes. Broader state searches are winnable with the right pages; Mammoth Roofing ranks seventh for a statewide Texas search.",
      },
      {
        q: "Is there a contract?",
        a: "No. Month to month, with the free tear-down first.",
      },
    ],
  },
  {
    slug: "cleaning",
    name: "Cleaning",
    h1: "SEO for Cleaning Companies",
    accent: "named first in AI Overviews",
    metaTitle: "SEO for Cleaning Companies | Map Pack & AI Overviews",
    metaDescription:
      "SEO for residential, commercial and specialist cleaning companies. D.O.L.L.S. Cleaning is named first in Google's AI Overview and ranks #1 below it.",
    heroSub:
      "Carpet, post-construction, move-out, commercial — each is a different search from a different customer. I build cleaning companies a page for each, and one client is now named first in Google's AI Overview.",
    caseClients: ["dolls-cleaning", "carpet-cleaning"],
    problems: [
      {
        title: "Every service on one page",
        check: "Search “post construction cleaning [your city]”. Do you have a page for exactly that?",
        costs: "Carpet, deep, move-out and post-construction cleaning are separate searches; a single services page wins none of them.",
      },
      {
        title: "Losing to directories",
        check: "Who ranks for “cleaning services [your city]” — cleaning companies, or directories and marketplaces?",
        costs: "Directories take the clicks when no local company has a page that answers the search better.",
      },
      {
        title: "Few recent reviews",
        check: "Count your reviews from the last 90 days against the top three in the map pack.",
        costs: "Recency moves the map pack as much as the star rating does, and cleaning is a trust purchase.",
      },
      {
        title: "Not answering the question",
        check: "Does your site say what a service includes, how long it takes and what it costs, in plain words?",
        costs: "Those answers are what AI Overviews lift — D.O.L.L.S. Cleaning is named first because its page answers the question.",
      },
    ],
    capsules: [
      {
        q: "How do cleaning companies rank higher on Google?",
        a: "A page for each cleaning service in each area you serve, a complete Business Profile with the right categories, and steady recent reviews. Answering what a service includes and costs, in plain words, is also what gets a cleaning company named in Google's AI Overviews.",
      },
      {
        q: "What results has SearchPrex got for cleaning companies?",
        a: "D.O.L.L.S. Cleaning is named first in Google's AI Overview for “post construction cleaning in Chesterfield, MI” and ranks first organically below it. It also holds the first and second positions for “carpet cleaning services in Clawson, MI”, and reached #1 local rankings with 106K impressions in Search Console.",
      },
      {
        q: "Residential or commercial cleaning — which is easier to rank for?",
        a: "Specialist and residential services usually have clearer searches and less competition — “post construction cleaning [city]”, “move out cleaning [city]”. Commercial cleaning is often decided by fewer, larger buyers and benefits from case-study style pages.",
      },
    ],
    included: [
      { title: "A page per cleaning service", body: "Carpet, deep, move-out, post-construction and commercial — each with its own page and area." },
      { title: "Business Profile", body: "Categories, services, service areas and photos, set up for the searches that bring bookings." },
      { title: "Answer-first content", body: "What each service includes, how long it takes and what drives the price — the lines AI Overviews quote." },
      { title: "Reviews", body: "A steady, policy-safe review program after each job." },
      { title: "Beating directories", body: "Pages that answer the search better than the marketplace listing above you." },
      { title: "Monday reporting", body: "Bookings, calls, rankings and what changed." },
    ],
    faqs: [
      {
        q: "How long does SEO take for a cleaning company?",
        a: "Specialist service pages can start ranking within weeks in a less crowded town; broader “cleaning services” searches take longer. The free tear-down gives you a realistic read.",
      },
      {
        q: "Can you get us into AI Overviews?",
        a: "No one controls what Google's AI names, but clear, direct answers make it much more likely. D.O.L.L.S. Cleaning is named first for a post-construction cleaning search.",
      },
      {
        q: "Do you work with commercial cleaning companies?",
        a: "Yes — commercial cleaning gets its own pages, written for the facility managers and business owners who hire it.",
      },
      {
        q: "Is there a contract?",
        a: "No. Month to month, with the free tear-down first.",
      },
    ],
  },
  {
    slug: "home-services",
    name: "Home Services",
    h1: "SEO for Home Service Businesses",
    accent: "where the call comes from the profile",
    metaTitle: "SEO for Home Service Businesses | Garage Door, Door Repair & More",
    metaDescription:
      "Local SEO for garage door, door repair and other home service businesses. Door Doctor reached 490+ monthly Business Profile interactions and 78% more profile views.",
    heroSub:
      "For garage door and door repair companies, most customers never reach your website — they call straight from the Business Profile. I make the profile, and the pages behind it, do that job.",
    caseClients: ["door-doctor"],
    problems: [
      {
        title: "A profile nobody maintains",
        check: "When did your Business Profile last get new photos, a post or an updated service list?",
        costs: "For urgent home repairs the profile is the storefront; a stale one loses the call to a competitor's active one.",
      },
      {
        title: "The wrong or missing categories",
        check: "Is your primary category the specific trade — “Garage door supplier”, “Door supplier” — rather than a generic one?",
        costs: "Category decides which searches the profile appears for at all.",
      },
      {
        title: "No page for the urgent searches",
        check: "Search “garage door repair near me” and “broken garage door spring [your city]”.",
        costs: "Urgent searches need a page that answers the emergency directly, with the phone number first.",
      },
      {
        title: "Details that disagree",
        check: "Are your phone, hours and address identical on Google, Yelp, Apple Maps and your site?",
        costs: "Inconsistent details weaken the profile — and Google now uses your website to judge suggested edits to it.",
      },
    ],
    capsules: [
      {
        q: "How do home service businesses get more calls from Google?",
        a: "Mostly through the Business Profile: the specific trade category, service areas, current photos, regular posts and recent reviews. Behind it, a page for each urgent job — broken springs, off-track doors, lock repairs — with the phone number first.",
      },
      {
        q: "What results has SearchPrex got for a home service business?",
        a: "Door Doctor reached more than 490 monthly Business Profile interactions — calls, direction requests and website visits — and 78% more profile views after the profile and its supporting pages were rebuilt.",
      },
      {
        q: "Do I still need a website if customers call from the profile?",
        a: "Yes. Google checks your site to decide how relevant the profile is and to judge suggested edits, and a page per service is what the profile links to when someone wants to know more before calling.",
      },
    ],
    included: [
      { title: "Business Profile rebuild", body: "Trade-specific categories, services, service areas, photos and weekly posts." },
      { title: "Urgent-job pages", body: "A page for each emergency repair, with the phone number and service area first." },
      { title: "Consistent details everywhere", body: "Name, address, phone and hours identical across Google, Bing, Apple Maps and Yelp." },
      { title: "Reviews", body: "A steady, policy-safe way to ask for reviews after each job." },
      { title: "Profile monitoring", body: "Suggested edits caught inside Google's four-day window, before they publish themselves." },
      { title: "Monday reporting", body: "Profile calls, direction requests and what changed." },
    ],
    faqs: [
      {
        q: "How fast can a home service profile improve?",
        a: "Profile changes can move interactions within weeks; rankings for competitive “near me” searches take longer. The free tear-down shows where your profile stands against the businesses above it.",
      },
      {
        q: "Which home services do you work with?",
        a: "Garage door and door repair so far, with the same approach for other urgent home trades — locksmiths, appliance repair and similar.",
      },
      {
        q: "What happens if someone suggests a wrong edit to my profile?",
        a: "Google gives owners four days to reject it once notified, and may publish it otherwise. Monitoring the profile is part of the work.",
      },
      {
        q: "Is there a contract?",
        a: "No. Month to month, with the free tear-down first.",
      },
    ],
  },
  {
    slug: "remodeling",
    name: "Remodeling",
    h1: "SEO for Remodeling Contractors",
    accent: "for kitchen and bath projects",
    metaTitle: "SEO for Remodeling Contractors | Kitchen & Bath Remodel Leads",
    metaDescription:
      "SEO for kitchen, bath and home remodeling contractors: project pages, cost answers and local rankings. A kitchen cabinets client reached top-10 rankings for high-intent remodel searches.",
    heroSub:
      "Remodeling customers take weeks to decide and read everything first. I get kitchen, bath and remodeling contractors found while they are researching — and remembered when they are ready.",
    caseClients: ["kitchen-cabinets"],
    problems: [
      {
        title: "No answer to “how much does it cost?”",
        check: "Does your site give a realistic cost range for a kitchen or bath remodel, and what changes it?",
        costs: "Cost is the first question homeowners search. The contractor who answers it honestly is the one they call.",
      },
      {
        title: "A gallery with no words",
        check: "Do your project photos have a page each, naming the room, the town and what was done?",
        costs: "Photos alone tell Google nothing; a short write-up per project is what ranks and what convinces.",
      },
      {
        title: "One page for every project type",
        check: "Are kitchens, bathrooms, cabinets and full remodels on separate pages?",
        costs: "They are separate searches from homeowners with separate budgets.",
      },
      {
        title: "Nothing for the long research phase",
        check: "Is there anything on your site for someone who is months away from hiring?",
        costs: "Remodels are researched for weeks. Being useful early is how you are on the shortlist later.",
      },
    ],
    capsules: [
      {
        q: "How do remodeling contractors get leads from Google?",
        a: "By answering the questions homeowners search while they plan — cost ranges, timelines, materials — on pages for each project type, backed by project write-ups that name the town. The contractor who is useful during the research is the one on the shortlist when the homeowner is ready.",
      },
      {
        q: "What results has SearchPrex got for a remodeling business?",
        a: "A kitchen cabinets client reached top-10 rankings for high-intent kitchen remodel keywords, with five more keywords ranking, verified in Search Console.",
      },
      {
        q: "Should a remodeling company publish prices?",
        a: "Ranges, yes. Homeowners search for cost first, and a realistic range with what changes it builds more trust than “contact us for a quote” — and it is the answer AI Overviews look for.",
      },
    ],
    included: [
      { title: "Project-type pages", body: "Kitchens, bathrooms, cabinets and full remodels — each with its own page." },
      { title: "Cost and timeline answers", body: "Honest ranges and what changes them, the first thing homeowners search." },
      { title: "Project write-ups", body: "Each finished project as a short page naming the room, town and work done." },
      { title: "Business Profile", body: "Categories, services, service areas and project photos." },
      { title: "Research-phase content", body: "Materials, layouts and planning guides for homeowners months from hiring." },
      { title: "Monday reporting", body: "Leads, rankings and what changed." },
    ],
    faqs: [
      {
        q: "How long does SEO take for a remodeling contractor?",
        a: "Project and cost pages can start ranking within weeks in a less crowded area; broad “kitchen remodel [city]” searches take longer. The free tear-down shows what is realistic.",
      },
      {
        q: "Do you write the project pages?",
        a: "Yes, from your photos and a short note on each job — room, town, what was done and what the homeowner wanted.",
      },
      {
        q: "Do you work with cabinet and countertop companies too?",
        a: "Yes — the kitchen cabinets client in the case study is exactly that.",
      },
      {
        q: "Is there a contract?",
        a: "No. Month to month, with the free tear-down first.",
      },
    ],
  },
];

export function getLocalIndustry(slug: string): LocalIndustry | undefined {
  return LOCAL_INDUSTRIES.find((i) => i.slug === slug);
}
