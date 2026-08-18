import { NextResponse } from 'next/server';
import { db } from '@/lib/db';

export async function GET() {
  try {
    const cms = await db.cMSConnection.findFirst({
      where: { clientId: 'cmrcl8frg0000p8uruwv7j5qd' }
    });
    
    if (!cms) return NextResponse.json({ error: 'No CMS' });
    
    const creds = cms.credentials as any;
    const auth = Buffer.from(`${creds.username}:${creds.appPassword}`).toString('base64');
    const slug = 'lynn-thompson-collection-counter-point-i-tri-ad-lock';
    const url = `${cms.baseUrl}/wp-json/wp/v2/product?slug=${slug}&_embed=true`;
    
    // Browser-mimicking headers
    const res = await fetch(url, {
      headers: {
        'Authorization': `Basic ${auth}`,
        'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36',
        'Accept': 'application/json, text/plain, */*',
        'Accept-Language': 'en-US,en;q=0.9',
        'Accept-Encoding': 'gzip, deflate, br',
        'Cache-Control': 'no-cache',
        'Sec-Fetch-Dest': 'empty',
        'Sec-Fetch-Mode': 'cors',
        'Sec-Fetch-Site': 'same-origin'
      }
    });
    
    const text = await res.text();
    
    return NextResponse.json({
      test: 'browser-user-agent',
      response: {
        status: res.status,
        contentLength: text.length,
        firstChars: text.substring(0, 300),
        isJSON: text.trim().startsWith('[') || text.trim().startsWith('{'),
        isEmptyArray: text.trim() === '[]'
      }
    });
  } catch (err) {
    return NextResponse.json({
      error: (err as Error).message
    });
  }
}