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
    const response = await fetch('/data/mso-products.csv');
    if (!response.ok) throw new Error(`CSV fetch failed: ${response.status}`);

    const csvText = await response.text();
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

    console.log(`[csv-loader] Loaded ${urlToIdMap.size} products`);
    csvCache = urlToIdMap;
    return urlToIdMap;

  } catch (error) {
    console.error('[csv-loader] Error:', error);
    throw error;
  }
}

export async function getProductIdFromUrl(url: string): Promise<number | null> {
  try {
    const map = await loadCsvProducts();
    const normalized = url.replace(/\/$/, '');
    return map.get(normalized) || null;
  } catch (error) {
    console.error('[csv-loader] Error:', error);
    return null;
  }
}