import fs from 'fs';
import path from 'path';
import Papa from 'papaparse';

export interface CsvProduct {
  post_id: number;
  sku: string;
  slug: string;
  url: string;
}

let csvCache: Map<string, number> | null = null;

export async function loadCsvProducts(): Promise<Map<string, number>> {
  if (csvCache) return csvCache;

  try {
    // Use fs.readFileSync for server-side file reading
    const csvPath = path.join(process.cwd(), 'public/data/mso-products.csv');
    console.log(`[csv-loader] Reading from: ${csvPath}`);
    
    const csvText = fs.readFileSync(csvPath, 'utf-8');
    
    const { data } = Papa.parse<CsvProduct>(csvText, {
      header: true,
      skipEmptyLines: true,
    });

    const urlToIdMap = new Map<string, number>();
    
    for (const row of data) {
      if (row.url && row.post_id) {
        const normalizedUrl = String(row.url).replace(/\/$/, '');
        const postId = typeof row.post_id === 'string' ? parseInt(row.post_id, 10) : row.post_id;
        
        if (!isNaN(postId)) {
          urlToIdMap.set(normalizedUrl, postId);
        }
      }
    }

    console.log(`[csv-loader] Loaded ${urlToIdMap.size} products from CSV`);
    csvCache = urlToIdMap;
    return urlToIdMap;

  } catch (error) {
    console.error('[csv-loader] Error loading CSV:', error);
    throw error;
  }
}

export async function getProductIdFromUrl(url: string): Promise<number | null> {
  try {
    const map = await loadCsvProducts();
    const normalized = url.replace(/\/$/, '');
    const postId = map.get(normalized);
    
    if (postId) {
      console.log(`[csv-loader] Found post_id ${postId} for URL: ${url}`);
      return postId;
    }
    
    console.warn(`[csv-loader] URL not found in CSV:`, normalized);
    return null;

  } catch (error) {
    console.error('[csv-loader] Error:', error);
    return null;
  }
}