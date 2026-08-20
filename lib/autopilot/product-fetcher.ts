// File: lib/autopilot/product-fetcher.ts
// FIXED VERSION - Proper WooCommerce REST API v3
 
import type { NextResponse } from 'next/server';
 
export interface WPCredentials {
  baseUrl: string;
  username: string;
  appPassword: string;
}
 
export interface ProductData {
  id: number;
  title: string;
  name: string;
  slug: string;
  description: string;
  short_description: string;
  price: string;
  regular_price: string;
  sale_price: string;
  stock_quantity: number;
  stock_status: 'instock' | 'outofstock' | 'onbackorder';
  images: Array<{
    id: number;
    src: string;
    alt: string;
  }>;
  categories: Array<{
    id: number;
    name: string;
  }>;
  sku: string;
  permalink: string;
  type: string;
  status: string;
  // ✅ MISSING FIELDS ADDED
  attributes?: Record<string, string>;
  categorySlugs?: string[];
  brand?: string;
  existingContent?: string;
  excerpt?: string;
  currentMetaTitle?: string;
  currentMetaDescription?: string;
}
 
/**
 * Get Basic Auth header
 */
function getBasicAuth(username: string, password: string): string {
  return Buffer.from(`${username}:${password}`).toString('base64');
}
 
/**
 * Extract product slug from URL
 * Examples:
 *   - https://example.com/product/my-product-name/ → my-product-name
 *   - https://example.com/shop/product/my-product/ → my-product
 */
function extractSlugFromUrl(url: string): string | null {
  try {
    const urlObj = new URL(url);
    const pathname = urlObj.pathname;
    
    // Match /product/slug or /products/slug or /shop/product/slug
    const match = pathname.match(/\/(?:product|products|shop\/product|item)\/([^\/]+)/);
    return match ? match[1] : null;
  } catch (e) {
    console.error('Error extracting slug from URL:', url, e);
    return null;
  }
}
 
/**
 * Fetch product from WooCommerce REST API
 * 
 * This function:
 * 1. Extracts slug from URL
 * 2. Queries WooCommerce /wc/v3/products endpoint
 * 3. Returns complete product data
 * 4. Handles errors gracefully with detailed logging
 */
export async function fetchProductData(
  productUrl: string,
  credentials: WPCredentials,
  options: { timeout?: number; retries?: number } = {}
): Promise<ProductData | null> {
  const runId = `fetch-${Date.now()}`;
  const { timeout = 10000, retries = 2 } = options;
 
  try {
    console.log(`[${runId}] Fetching product from URL:`, productUrl);
 
    // Step 1: Extract slug from URL
    const slug = extractSlugFromUrl(productUrl);
    if (!slug) {
      console.error(`[${runId}] Could not extract product slug from URL:`, productUrl);
      return null;
    }
    console.log(`[${runId}] Extracted slug:`, slug);
 
    // Step 2: Build API endpoint
    const endpoint = `${credentials.baseUrl}/wp-json/wc/v3/products?slug=${encodeURIComponent(slug)}&per_page=1`;
    console.log(`[${runId}] API endpoint:`, endpoint);
 
    // Step 3: Fetch with retries
    let lastError: Error | null = null;
    
    for (let attempt = 0; attempt <= retries; attempt++) {
      try {
        if (attempt > 0) {
          console.log(`[${runId}] Retry attempt ${attempt}/${retries}...`);
          await new Promise(resolve => setTimeout(resolve, 1000 * attempt)); // Exponential backoff
        }
 
        const auth = getBasicAuth(credentials.username, credentials.appPassword);
        const controller = new AbortController();
        const timeoutId = setTimeout(() => controller.abort(), timeout);
 
        const response = await fetch(endpoint, {
          method: 'GET',
          headers: {
            'Authorization': `Basic ${auth}`,
            'Content-Type': 'application/json',
            'User-Agent': 'MSO-Autopilot/1.0',
            'Accept': 'application/json',
          },
          signal: controller.signal,
        });
 
        clearTimeout(timeoutId);
 
        // Step 4: Handle response
        const responseText = await response.text();
        
        if (!response.ok) {
          console.error(`[${runId}] API error - Status ${response.status}:`, responseText.substring(0, 300));
          
          // Check if it's an auth error (worth retrying) vs not-found (won't be fixed by retry)
          if (response.status === 404) {
            console.error(`[${runId}] Product not found with slug:`, slug);
            return null;
          }
          
          if (response.status === 401 || response.status === 403) {
            console.error(`[${runId}] Authentication failed - check credentials`);
            return null;
          }
          
          // Server error or timeout - retry
          lastError = new Error(`HTTP ${response.status}: ${responseText.substring(0, 100)}`);
          if (attempt < retries) continue;
          throw lastError;
        }
 
        // Step 5: Parse response
        let products: ProductData[];
        try {
          products = JSON.parse(responseText);
          
          if (!Array.isArray(products)) {
            console.error(`[${runId}] Response is not an array:`, typeof products);
            return null;
          }
          
          if (products.length === 0) {
            console.warn(`[${runId}] No products found with slug:`, slug);
            return null;
          }
 
          const product = products[0];
          
          //  Same field mismatch as the by-ID path: WooCommerce sends
          //  `name`, not `title`. Fixed in both so the two callers cannot
          //  disagree about what a product is called.
          const name: string = (product as any).name ?? product.title ?? '';

          const enrichedProduct: ProductData = {
            ...product,
            title: name,
            name,
            categorySlugs:
              product.categories?.map((c: any) => c.slug ?? c.name?.toLowerCase().replace(/\s+/g, '-')).filter(Boolean) || [],
            brand: product.brand || extractBrandFromTitle(name),
            existingContent: product.description || '',
            excerpt: product.short_description || '',
            currentMetaTitle: name,
            currentMetaDescription: product.short_description?.slice(0, 160) || '',
            attributes: extractAttributesFromProduct(product),
          };

          console.log(`[${runId}] ✅ Product found: ID ${product.id}`);
          return enrichedProduct;
          
        } catch (parseError) {
          console.error(`[${runId}] Failed to parse JSON response:`, parseError);
          console.error(`[${runId}] Response text:`, responseText.substring(0, 200));
          
          lastError = new Error('Invalid JSON response from API');
          if (attempt < retries) continue;
          throw lastError;
        }
 
      } catch (fetchError) {
        lastError = fetchError instanceof Error ? fetchError : new Error(String(fetchError));
        
        if (fetchError instanceof Error && fetchError.name === 'AbortError') {
          console.error(`[${runId}] Request timeout after ${timeout}ms`);
        } else {
          console.error(`[${runId}] Fetch error:`, fetchError);
        }
        
        if (attempt < retries) continue;
        throw lastError;
      }
    }
 
    throw lastError || new Error('Failed to fetch product after retries');
 
  } catch (error) {
    console.error(`[${runId}] Fatal error in fetchProductData:`, error);
    return null;
  }
}
 
/**
 * Extract brand from product title (heuristic)
 * Example: "Kershaw Leek Assisted" → "Kershaw"
 */
function extractBrandFromTitle(title: string | undefined | null): string | undefined {
  //  Guarded because it was not, and the caller passed product.title, which
  //  WooCommerce does not send — the field is `name`. Every product threw
  //  here, the enclosing catch turned the throw into null, and the pipeline
  //  reported "Product not found in WP" for a catalogue that was entirely
  //  present. A missing title is a missing brand, not a crash.
  if (!title) return undefined;
  const knownBrands = ['Kershaw', 'Benchmade', 'Spyderco', 'Cold Steel', 'Boker', 'CRKT', 'SOG', 'Mora', 'Opinel'];
  for (const brand of knownBrands) {
    if (title.toLowerCase().includes(brand.toLowerCase())) {
      return brand;
    }
  }
  return undefined;
}
 
/**
 * Extract attributes from WooCommerce product
 */
function extractAttributesFromProduct(product: any): Record<string, string> {
  const attributes: Record<string, string> = {};
  
  if (Array.isArray(product.attributes)) {
    for (const attr of product.attributes) {
      if (attr.name && attr.options) {
        attributes[attr.name] = Array.isArray(attr.options) ? attr.options.join(', ') : String(attr.options);
      }
    }
  }
  
  return attributes;
}
 
/**
 * Fetch multiple products by slug array
 */
export async function fetchMultipleProducts(
  productUrls: string[],
  credentials: WPCredentials,
  options?: { timeout?: number; retries?: number }
): Promise<Array<{ url: string; product: ProductData | null; error?: string }>> {
  const results = await Promise.all(
    productUrls.map(async (url) => {
      try {
        const product = await fetchProductData(url, credentials, options);
        return { url, product, error: product ? undefined : 'Product not found' };
      } catch (error) {
        return {
          url,
          product: null,
          error: error instanceof Error ? error.message : 'Unknown error',
        };
      }
    })
  );
 
  return results;
}
 
/**
 * Fetch product by ID directly (faster, no slug extraction needed)
 *
 * Retries transient failures. This function used to accept `timeout` and
 * `retries` and then use neither: one fetch, no AbortController, and
 * `if (!response.ok) return null`. The origin returns 521 and 502 under the
 * batch's request rate — intermittently, not because anything is wrong with
 * the product — and a single blip killed that product for good. 7,112 pages
 * failed that way between 17 July and 20 August while WooCommerce had every
 * one of them at status=publish.
 *
 * The status is kept on the way out for the same reason. `null` told the
 * caller "no such product", which is what it reported to the operator, and
 * five weeks went into looking for missing products that were never missing.
 */
export class ProductFetchError extends Error {
  constructor(message: string, readonly status: number, readonly productId: number) {
    super(message);
    this.name = 'ProductFetchError';
  }
}

/** 404 means gone. Everything else here means "ask again in a moment". */
const TRANSIENT = new Set([408, 425, 429, 500, 502, 503, 504, 520, 521, 522, 523, 524]);

export async function fetchProductById(
  productId: number,
  credentials: WPCredentials,
  options?: { timeout?: number; retries?: number }
): Promise<ProductData | null> {
  const runId = `fetch-id-${Date.now()}`;
  const { timeout = 10000, retries = 2 } = options || {};

  let product: any;

  for (let attempt = 0; ; attempt++) {
    const endpoint = `${credentials.baseUrl}/wp-json/wc/v3/products/${productId}`;
    const controller = new AbortController();
    const timer = setTimeout(() => controller.abort(), timeout);

    try {
      if (attempt > 0) {
        //  1s, then 2s. Long enough for an overloaded origin to catch up,
        //  short enough that a batch does not stall on one product.
        await new Promise((r) => setTimeout(r, 1000 * attempt));
        console.log(`[${runId}] Retry ${attempt}/${retries} for product ${productId}...`);
      } else {
        console.log(`[${runId}] Fetching product ${productId}...`);
      }

      const auth = getBasicAuth(credentials.username, credentials.appPassword);
      const response = await fetch(endpoint, {
        method: 'GET',
        headers: {
          'Authorization': `Basic ${auth}`,
          'Content-Type': 'application/json',
          'User-Agent': 'MSO-Autopilot/1.0',
        },
        signal: controller.signal,
      });

      if (response.ok) {
        product = await response.json();
        break;
      }

      //  404 is the only status that actually means the product is not
      //  there. 401 and 403 are our credentials and will not improve on
      //  a second try either. Both are final, and both say which it was.
      if (!TRANSIENT.has(response.status) || attempt >= retries) {
        const detail = await response.text().catch(() => '');
        console.error(`[${runId}] Product ${productId} failed: HTTP ${response.status}`);
        throw new ProductFetchError(
          response.status === 404
            ? `Product ${productId} does not exist in WooCommerce`
            : `WooCommerce returned ${response.status} for product ${productId}` +
              (detail ? `: ${detail.slice(0, 120).replace(/\s+/g, ' ')}` : ''),
          response.status,
          productId
        );
      }
    } catch (error: any) {
      if (error instanceof ProductFetchError) throw error;

      //  A timeout or a dropped connection is the same kind of problem as
      //  a 521 and gets the same treatment.
      const reason = error?.name === 'AbortError' ? `timed out after ${timeout}ms` : error?.message;
      if (attempt >= retries) {
        console.error(`[${runId}] Product ${productId} unreachable: ${reason}`);
        throw new ProductFetchError(
          `Could not reach WooCommerce for product ${productId} (${reason})`,
          0,
          productId
        );
      }
      console.warn(`[${runId}] Product ${productId} attempt ${attempt + 1} failed: ${reason}`);
    } finally {
      clearTimeout(timer);
    }
  }

    //  WooCommerce calls it `name`; `title` is a WP-posts field and is not
    //  in this payload at all. ProductData declares both, so `title` is
    //  filled from `name` here rather than left undefined for every
    //  downstream reader — the prompt builder is one of them, and a product
    //  with no title generates copy about nothing.
    const name: string = product.name ?? product.title ?? '';

    const enrichedProduct: ProductData = {
      ...product,
      title: name,
      name,
      categorySlugs:
        product.categories?.map((c: any) => c.slug ?? c.name?.toLowerCase().replace(/\s+/g, '-')).filter(Boolean) || [],
      brand: product.brand || extractBrandFromTitle(name),
      existingContent: product.description || '',
      excerpt: product.short_description || '',
      currentMetaTitle: name,
      currentMetaDescription: product.short_description?.slice(0, 160) || '',
      attributes: extractAttributesFromProduct(product),
    };

    console.log(`[${runId}] ✅ Product fetched: ${name}`);
    return enrichedProduct;
}

import { getProductIdFromUrl } from './csv-loader';

/**
 * Look the product up by URL via the CSV export, then fetch it.
 *
 * Two failures live here and they are not the same. A URL missing from the
 * CSV is a lookup miss — the CSV is a snapshot, and blog posts and category
 * pages are not in it at all. A ProductFetchError is the shop failing to
 * answer. Both used to come back as `null` and be reported as "Product not
 * found in WP", which is why an unhealthy origin looked like a missing
 * catalogue for five weeks. The fetch error is rethrown so it survives.
 */
export async function fetchProductDataFromCsv(
  productUrl: string,
  credentials: WPCredentials
): Promise<ProductData | null> {
  console.log(`[fetchProductDataFromCsv] Fetching: ${productUrl}`);

  const postId = await getProductIdFromUrl(productUrl);
  if (!postId) {
    console.error(`[fetchProductDataFromCsv] URL not found in CSV:`, productUrl);
    return null;
  }

  console.log(`[fetchProductDataFromCsv] Found post_id: ${postId}`);
  return await fetchProductById(postId, credentials);
}
