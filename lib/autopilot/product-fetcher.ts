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
          
          console.log(`[${runId}] ✅ Product found: ID ${products[0].id}`);
          return products[0];
          
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
 */
export async function fetchProductById(
  productId: number,
  credentials: WPCredentials,
  options?: { timeout?: number; retries?: number }
): Promise<ProductData | null> {
  const runId = `fetch-id-${Date.now()}`;
  const { timeout = 10000, retries = 2 } = options || {};
 
  try {
    const endpoint = `${credentials.baseUrl}/wp-json/wc/v3/products/${productId}`;
    console.log(`[${runId}] Fetching product ${productId}...`);
 
    const auth = getBasicAuth(credentials.username, credentials.appPassword);
    const response = await fetch(endpoint, {
      method: 'GET',
      headers: {
        'Authorization': `Basic ${auth}`,
        'Content-Type': 'application/json',
        'User-Agent': 'MSO-Autopilot/1.0',
      },
    });
 
    if (!response.ok) {
      console.error(`[${runId}] Product fetch failed: ${response.status}`);
      return null;
    }
 
    const product = await response.json();
    console.log(`[${runId}] ✅ Product fetched: ${product.name}`);
    return product;
 
  } catch (error) {
    console.error(`[${runId}] Error fetching product by ID:`, error);
    return null;
  }
}
 