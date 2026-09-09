export type QualityResult = {
  passed: boolean;
  score: number;
  reasons: string[];
};

const MIN_WORDS = 350;
const MIN_FAQS = 3;
const MIN_INTERNAL_LINKS = 2;
const MIN_UNIQUE_RATIO = 0.55;

//  The only outbound destinations a product page may cite. Everything else is
//  treated as a leak, because the realistic alternatives here are competing
//  retailers — this scorer used to *require* an external link and the prompt
//  offered KnifeCenter and Bladeforums as candidates, which is a competitor
//  link on every product page in the catalogue.
//
//  Wikipedia is allowed because a steel or lock-type reference is a genuine
//  citation and carries no commercial pull. Brand sites are allowed because
//  they are suppliers of products sold here, not rivals for the sale.
//
//  NicheSEO Pro enforces the same rule on the same storefront; keep the two
//  lists in step.
export const ALLOWED_EXTERNAL_HOSTS = [
  'wikipedia.org',
  'srmknives.com',
  'civivi.com',
  'weknife.com',
  'benchmade.com',
  'spyderco.com',
  'kershaw.kaiusaltd.com',
  'buckknives.com',
  'coldsteel.com',
  'gerbergear.com',
  'leatherman.com',
  'victorinox.com',
  'morakniv.se',
  'esee-knives.com',
  'ontarioknife.com',
];

export function scoreContent(html: string, opts: {
  templateBoilerplate?: string;
}): QualityResult {
  const reasons: string[] = [];
  let score = 100;

  const text = html.replace(/<[^>]+>/g, ' ').replace(/\s+/g, ' ').trim();
  const words = text.split(' ').filter(Boolean);
  const wordCount = words.length;

  if (wordCount < MIN_WORDS) {
    score -= 30;
    reasons.push(`word_count_${wordCount}_below_${MIN_WORDS}`);
  }

  const faqMatches = (html.match(/<h[23][^>]*>.*?\?<\/h[23]>/gi) || []).length;
  if (faqMatches < MIN_FAQS) {
    score -= 20;
    reasons.push(`faq_count_${faqMatches}_below_${MIN_FAQS}`);
  }

  const internalLinks = (html.match(/href="https?:\/\/(www\.)?michigansportsoutdoor\.com/gi) || []).length;
  if (internalLinks < MIN_INTERNAL_LINKS) {
    score -= 15;
    reasons.push(`internal_links_${internalLinks}_below_${MIN_INTERNAL_LINKS}`);
  }

  //  An outbound citation is welcome but never required. Requiring one is what
  //  pushed the model to reach for whatever authority site it could find, and
  //  the nearest ones in this niche sell knives too.
  const allLinks = html.match(/href="https?:\/\/[^"]+"/gi) || [];
  const external = allLinks.filter((l) => !/michigansportsoutdoor\.com/i.test(l));
  const leaked = external.filter(
    (l) => !ALLOWED_EXTERNAL_HOSTS.some((host) => new RegExp(`//([^/"]*\\.)?${host.replace(/\./g, '\\.')}`, 'i').test(l))
  );
  if (leaked.length > 0) {
    score -= 50;
    reasons.push(`external_link_not_allowed: ${leaked.slice(0, 2).join(' ')}`);
  }

  if (opts.templateBoilerplate) {
    const boilerTokens = new Set(opts.templateBoilerplate.toLowerCase().split(/\W+/));
    const contentTokens = words.map(w => w.toLowerCase());
    const unique = contentTokens.filter(t => !boilerTokens.has(t)).length;
    const ratio = unique / contentTokens.length;
    if (ratio < MIN_UNIQUE_RATIO) {
      score -= 25;
      reasons.push(`uniqueness_${ratio.toFixed(2)}_below_${MIN_UNIQUE_RATIO}`);
    }
  }

  const paragraphs = html.match(/<p[^>]*>(.*?)<\/p>/gi) || [];
  const uniqueParagraphs = new Set(paragraphs);
  if (paragraphs.length > 3 && uniqueParagraphs.size / paragraphs.length < 0.8) {
    score -= 20;
    reasons.push('duplicate_paragraphs_detected');
  }

  if (/<!DOCTYPE|<html[\s>]|<body[\s>]/i.test(html)) {
    score -= 30;
    reasons.push('full_html_wrapper_detected');
  }

  const fluffPhrases = [
    'premium quality', 'pinnacle', 'discerning', 'meticulously', 'unparalleled',
    'best-in-class', 'cutting-edge', 'state-of-the-art', 'top-tier',
    'notable addition', 'ongoing commitment', 'distinguished piece',
    'refined presence', 'aesthetically pleasing', 'hard-wearing character',
    'commitment to crafting', 'reliable and well-built', 'sturdy yet refined',
    'reflects current trends', 'embodies a blend',
  ];
  const lowerHtml = html.toLowerCase();
  const fluffFound = fluffPhrases.filter(p => lowerHtml.includes(p));
  if (fluffFound.length > 0) {
    score -= 5 * fluffFound.length;
    reasons.push(`fluff_phrases_${fluffFound.length}: ${fluffFound.slice(0, 3).join(',')}`);
  }

  return {
    passed: score >= 70,
    score,
    reasons,
  };
}