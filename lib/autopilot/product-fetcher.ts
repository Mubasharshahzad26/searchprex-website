type WpCreds = {
  baseUrl: string;
  username: string;
  appPassword: string;
};

export type ProductData = {
  id: number;
  title: string;
  slug: string;
  existingContent: string;
  shortDescription: string;
  excerpt: string;
  currentMetaTitle: string | null;
  currentMetaDescription: string | null;
  categories: string[];
  categorySlugs: string[];
  brand: string | null;
  price: string | null;
  sku: string | null;
  attributes: Record<string, string>;
  images: string[];
  permalink: string;
};

export async function fetchProductData(
  url: string,
  wpCreds: WpCreds
): Promise<ProductData | null> {
  const slug = url.split('/').filter(Boolean).pop()?.replace(/\.(html|php)$/, '');
  if (!slug) return null;

  const auth = Buffer
    .from(`${wpCreds.username}:${wpCreds.appPassword}`)
    .toString('base64');
  const headers = { Authorization: `Basic ${auth}` };

  const productEndpoint = `${wpCreds.baseUrl}/wp-json/wp/v2/product?slug=${encodeURIComponent(slug)}&_embed=true`;

  try {
    const res = await fetch(productEndpoint, { headers });
    if (!res.ok) return null;

    const data = await res.json();
    if (!Array.isArray(data) || data.length === 0) return null;

    const p = data[0];

    // Categories
    const categories: string[] = [];
    const categorySlugs: string[] = [];
    const embeddedTerms = p._embedded?.['wp:term'] ?? [];

    for (const termGroup of embeddedTerms) {
      if (!Array.isArray(termGroup)) continue;
      for (const term of termGroup) {
        if (term.taxonomy === 'product_cat' || term.taxonomy === 'category') {
          categories.push(term.name);
          categorySlugs.push(term.slug);
        }
      }
    }

    // Brand
    const brand = p.acf?.brand
      ?? p.meta?.brand
      ?? extractBrandFromTitle(p.title?.rendered ?? '')
      ?? extractBrandFromCategories(categories)
      ?? null;

    // Attributes
    const attributes: Record<string, string> = {};
    if (p.acf && typeof p.acf === 'object') {
      for (const [key, val] of Object.entries(p.acf)) {
        if (typeof val === 'string' && val.trim()) {
          attributes[key] = val;
        }
      }
    }

    // Images
    const images: string[] = [];
    if (p.featured_media && p._embedded?.['wp:featuredmedia']) {
      const media = p._embedded['wp:featuredmedia'][0];
      if (media?.source_url) images.push(media.source_url);
    }

    // Rank Math SEO fields
const currentMetaTitle = p.meta?.rank_math_title ?? null;
const currentMetaDescription = p.meta?.rank_math_description ?? null;

    // WooCommerce short_description (product-specific)
    const shortDescription = stripHtml(
      p.short_description ?? p.acf?.short_description ?? ''
    );

    return {
      id: p.id,
      title: stripHtml(p.title?.rendered ?? slug),
      slug: p.slug ?? slug,
      existingContent: stripHtml(p.content?.rendered ?? ''),
      shortDescription,
      excerpt: stripHtml(p.excerpt?.rendered ?? ''),
      currentMetaTitle,
      currentMetaDescription,
      categories,
      categorySlugs,
      brand,
      price: p.meta?.price ?? p.acf?.price ?? null,
      sku: p.meta?.sku ?? p.acf?.sku ?? null,
      attributes,
      images,
      permalink: p.link ?? url,
    };
  } catch (err) {
    console.error(`[product-fetcher] Error fetching ${url}:`, err);
    return null;
  }
}

function stripHtml(html: string): string {
  return html.replace(/<[^>]+>/g, ' ').replace(/\s+/g, ' ').trim();
}

function extractBrandFromTitle(title: string): string | null {
  const knownBrands = [
    'Cold Steel', 'Benchmade', 'Spyderco', 'Reate', 'Remette', 'North Mountain',
    'CJRB', 'Kizer', 'WE Knife', 'Civivi', 'Bestech', 'Kansept', 'Olight',
    'Rike Knife', 'Real Steel', 'Steel Will', 'CRKT', 'Kershaw',
    'ZT', 'Zero Tolerance', 'Microtech', 'Protech', 'Emerson',
  ];
  for (const brand of knownBrands) {
    if (title.toLowerCase().includes(brand.toLowerCase())) return brand;
  }
  return null;
}

function extractBrandFromCategories(categories: string[]): string | null {
  const knownBrands = [
    'Cold Steel', 'Benchmade', 'Spyderco', 'Reate', 'Remette', 'North Mountain',
    'CJRB', 'Kizer', 'WE Knife', 'Civivi', 'Bestech', 'Kansept', 'Olight',
  ];
  for (const cat of categories) {
    for (const brand of knownBrands) {
      if (cat.toLowerCase().includes(brand.toLowerCase())) return brand;
    }
  }
  return null;
}