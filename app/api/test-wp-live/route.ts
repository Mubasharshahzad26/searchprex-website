import { NextResponse } from 'next/server';
import { db } from '@/lib/db';

export async function GET() {
  try {
    // 1. DB se credentials fetch
    const cms = await db.cMSConnection.findFirst({
      where: { clientId: 'cmrcl8frg0000p8uruwv7j5qd' }
    });
    
    if (!cms) return NextResponse.json({ error: 'No CMS' });
    
    const creds = JSON.parse(cms.credentials as string);
    
    // 2. Direct fetch from Vercel production
    const auth = Buffer.from(`${creds.username}:${creds.appPassword}`).toString('base64');
    const slug = 'lynn-thompson-collection-counter-point-i-tri-ad-lock';
    const url = `${cms.baseUrl}/wp-json/wp/v2/product?slug=${slug}&_embed=true`;
    
    const res = await fetch(url, {
      headers: { 'Authorization': `Basic ${auth}` }
    });
    
    const text = await res.text();
    
    return NextResponse.json({
      credentials_used: {
        username: creds.username,
        appPasswordFirst5: creds.appPassword.substring(0, 5),
        appPasswordLength: creds.appPassword.length
      },
      request: {
        url,
        method: 'GET'
      },
      response: {
        status: res.status,
        contentLength: text.length,
        firstChars: text.substring(0, 300),
        isEmptyArray: text.trim() === '[]',
        isJSON: text.trim().startsWith('[') || text.trim().startsWith('{')
      }
    });
  } catch (err) {
    return NextResponse.json({
      error: (err as Error).message,
      stack: (err as Error).stack?.substring(0, 500)
    });
  }
}