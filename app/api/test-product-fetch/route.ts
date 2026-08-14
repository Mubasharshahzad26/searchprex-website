// File: app/api/test-product-fetch/route.ts
// FIXED - Handles credentials as object (not string)
 
import { NextResponse } from 'next/server';
import { db } from '@/lib/db';
 
interface WPCredentials {
  baseUrl: string;
  username: string;
  appPassword: string;
}
 
export async function GET() {
  const runId = `prod-test-${Date.now()}`;
  
  try {
    console.log(`[${runId}] Starting product fetch test...`);
 
    // STEP 1: Get CMS credentials from DB
    console.log(`[${runId}] Step 1: Fetching CMS connection...`);
    
    const cms = await db.cMSConnection.findFirst({
      where: { clientId: 'cmrcl8frg0000p8uruwv7j5qd' }
    });
 
    if (!cms) {
      console.error(`[${runId}] CMS not found`);
      return NextResponse.json({ 
        success: false,
        error: 'No CMS connection found',
        step: 'db_lookup'
      }, { status: 404 });
    }
 
    console.log(`[${runId}] ✅ CMS found: ${cms.baseUrl}`);
 
    // STEP 2: Handle credentials (might be object or string)
    console.log(`[${runId}] Step 2: Processing credentials...`);
    
    let credentialsObj: any = cms.credentials;
    
    // If it's a string, parse it
    if (typeof cms.credentials === 'string') {
      try {
        credentialsObj = JSON.parse(cms.credentials);
      } catch (e) {
        console.error(`[${runId}] Failed to parse credentials:`, e);
        return NextResponse.json({
          success: false,
          error: 'Invalid credentials format',
          step: 'credentials_parse'
        }, { status: 500 });
      }
    }
 
    const creds: WPCredentials = {
      baseUrl: cms.baseUrl,
      username: credentialsObj.username,
      appPassword: credentialsObj.appPassword,
    };
 
    if (!creds.username || !creds.appPassword) {
      console.error(`[${runId}] Missing username or appPassword`);
      return NextResponse.json({
        success: false,
        error: 'Missing username or appPassword in credentials',
        step: 'credentials_validation'
      }, { status: 400 });
    }
 
    console.log(`[${runId}] ✅ Credentials loaded: ${creds.username}`);
 
    // STEP 3: Test WooCommerce API connection
    console.log(`[${runId}] Step 3: Testing WooCommerce API...`);
    
    const auth = Buffer.from(`${creds.username}:${creds.appPassword}`).toString('base64');
    const testUrl = `${creds.baseUrl}/wp-json/wc/v3/products?per_page=1`;
    
    console.log(`[${runId}] Requesting: ${testUrl}`);
 
    const response = await fetch(testUrl, {
      method: 'GET',
      headers: {
        'Authorization': `Basic ${auth}`,
        'Content-Type': 'application/json',
      },
    });
 
    console.log(`[${runId}] Response status: ${response.status}`);
 
    if (!response.ok) {
      const errorText = await response.text();
      console.error(`[${runId}] API error: ${response.status} - ${errorText.substring(0, 200)}`);
      
      return NextResponse.json({
        success: false,
        error: `WordPress API returned ${response.status}`,
        step: 'woocommerce_api_test',
        details: {
          status: response.status,
          statusText: response.statusText,
          error: errorText.substring(0, 300)
        }
      }, { status: response.status >= 500 ? 502 : 400 });
    }
 
    const products = await response.json();
    console.log(`[${runId}] ✅ API working, found ${Array.isArray(products) ? products.length : 0} products`);
 
    // STEP 4: Success!
    return NextResponse.json({
      success: true,
      runId,
      message: 'All tests passed!',
      details: {
        cmsFound: true,
        baseUrl: creds.baseUrl,
        username: creds.username,
        apiAccessible: true,
        productsCount: Array.isArray(products) ? products.length : 0,
      }
    }, { status: 200 });
 
  } catch (error) {
    console.error(`[${runId}] ❌ Error:`, error);
    
    return NextResponse.json({
      success: false,
      error: error instanceof Error ? error.message : 'Unknown error',
      step: 'unhandled_exception',
      errorType: error?.constructor.name,
    }, { status: 500 });
  }
}
 