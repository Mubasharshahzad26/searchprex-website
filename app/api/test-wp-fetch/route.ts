import { NextResponse } from 'next/server';
import { db } from '@/lib/db';
import { fetchProductData } from '@/lib/autopilot/product-fetcher';

export async function GET() {
  try {
    // 1. Get CMS credentials from DB
    const cms = await db.cMSConnection.findFirst({
      where: { clientId: 'cmrcl8frg0000p8uruwv7j5qd' }
    });
    
    if (!cms) {
      return NextResponse.json({ 
        error: 'No CMS connection found',
        step: 'db_lookup'
      });
    }
    
    // 2. Parse credentials
    const creds = JSON.parse(cms.credentials as string);
    const wpCreds = {
      baseUrl: cms.baseUrl,
      username: creds.username,
      appPassword: creds.appPassword
    };
    
    // 3. Test URL
    const testUrl = 'https://www.michigansportsoutdoor.com/product/atwood-rope-mfg-micro-cord-125ft-glow/';
    
    // 4. Direct fetch test (bypass fetchProductData for now)
    const slug = 'atwood-rope-mfg-micro-cord-125ft-glow';
    const auth = Buffer.from(`${wpCreds.username}:${wpCreds.appPassword}`).toString('base64');
    const endpoint = `${wpCreds.baseUrl}/wp-json/wp/v2/product?slug=${encodeURIComponent(slug)}&_embed=true`;
    
    const directRes = await fetch(endpoint, {
      headers: { 'Authorization': `Basic ${auth}` }
    });
    
    const directStatus = directRes.status;
    const directText = await directRes.text();
    const directLength = directText.length;
    
    // 5. Now test fetchProductData function
    const result = await fetchProductData(testUrl, wpCreds);
    
    return NextResponse.json({
      credentials: {
        baseUrl: wpCreds.baseUrl,
        username: wpCreds.username,
        appPasswordLength: wpCreds.appPassword.length
      },
      directFetch: {
        status: directStatus,
        responseLength: directLength,
        firstChars: directText.substring(0, 200)
      },
      fetchProductDataResult: result ? {
        success: true,
        productId: result.id,
        title: result.title
      } : {
        success: false,
        result: 'null'
      }
    });
  } catch (err) {
    return NextResponse.json({ 
      error: (err as Error).message,
      stack: (err as Error).stack?.substring(0, 500)
    });
  }
}