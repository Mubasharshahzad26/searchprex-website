// File: app/api/test-product-fetch/route.ts
// FIXED VERSION - Correct WooCommerce endpoints + proper debugging
 
import { NextResponse } from 'next/server';
import { db } from '@/lib/db';
 
interface WPCredentials {
  baseUrl: string;
  username: string;
  appPassword: string;
}
 
interface TestResult {
  success: boolean;
  timestamp: string;
  step: string;
  details?: Record<string, any>;
  error?: string;
  debug?: Record<string, any>;
}
 
/**
 * Helper: Encode credentials for Basic auth
 */
function getBasicAuth(username: string, password: string): string {
  return Buffer.from(`${username}:${password}`).toString('base64');
}
 
/**
 * Helper: Make authenticated request to WordPress/WooCommerce
 */
async function wpFetch(
  url: string,
  creds: WPCredentials,
  options: { method?: string; body?: Record<string, any> } = {}
) {
  const auth = getBasicAuth(creds.username, creds.appPassword);
 
  try {
    const response = await fetch(url, {
      method: options.method || 'GET',
      headers: {
        'Authorization': `Basic ${auth}`,
        'Content-Type': 'application/json',
        'User-Agent': 'MSO-Autopilot/1.0',
      },
      body: options.body ? JSON.stringify(options.body) : undefined,
    });
 
    return {
      status: response.status,
      statusText: response.statusText,
      ok: response.ok,
      text: await response.text(),
    };
  } catch (error) {
    return {
      status: 0,
      statusText: 'Network Error',
      ok: false,
      text: error instanceof Error ? error.message : 'Unknown error',
      error,
    };
  }
}
 
/**
 * Helper: Parse JSON response safely
 */
function parseJson(text: string) {
  try {
    return JSON.parse(text);
  } catch (e) {
    return null;
  }
}
 
export async function GET() {
  const runId = `prod-test-${Date.now()}`;
  
  try {
    console.log(`[${runId}] Starting product fetch test...`);
 
    // ========================================
    // STEP 1: Get CMS credentials from DB
    // ========================================
    console.log(`[${runId}] Step 1: Fetching CMS credentials...`);
    
    const cms = await db.cMSConnection.findFirst({
      where: { clientId: 'cmrcl8frg0000p8uruwv7j5qd' }
    });
 
    if (!cms) {
      console.error(`[${runId}] No CMS connection found`);
      return NextResponse.json(
        {
          success: false,
          timestamp: new Date().toISOString(),
          step: 'db_lookup',
          error: 'No CMS connection found',
          debug: {
            clientId: 'cmrcl8frg0000p8uruwv7j5qd'
          }
        } as TestResult,
        { status: 404 }
      );
    }
 
    console.log(`[${runId}] CMS connection found:`, cms.baseUrl);
 
    // ========================================
    // STEP 2: Parse and validate credentials
    // ========================================
    console.log(`[${runId}] Step 2: Parsing credentials...`);
    
    let creds: WPCredentials;
    try {
      const parsed = JSON.parse(cms.credentials as string);
      creds = {
        baseUrl: cms.baseUrl,
        username: parsed.username,
        appPassword: parsed.appPassword,
      };
      
      if (!creds.username || !creds.appPassword) {
        throw new Error('Missing username or appPassword in credentials');
      }
      
      console.log(`[${runId}] Credentials parsed successfully`);
    } catch (e) {
      console.error(`[${runId}] Credential parsing failed:`, e);
      return NextResponse.json(
        {
          success: false,
          timestamp: new Date().toISOString(),
          step: 'credentials_parse',
          error: e instanceof Error ? e.message : 'Failed to parse credentials',
        } as TestResult,
        { status: 400 }
      );
    }
 
    // ========================================
    // STEP 3: Test WooCommerce Products endpoint
    // ========================================
    console.log(`[${runId}] Step 3: Testing WooCommerce products endpoint...`);
    
    const testSlug = 'atwood-rope-mfg-micro-cord-125ft-glow';
    const productsUrl = `${creds.baseUrl}/wp-json/wc/v3/products?slug=${encodeURIComponent(testSlug)}&per_page=1`;
    
    console.log(`[${runId}] Requesting: ${productsUrl}`);
    const productsRes = await wpFetch(productsUrl, creds);
    
    console.log(`[${runId}] Products endpoint status: ${productsRes.status}`);
 
    let productsData = null;
    if (productsRes.ok) {
      productsData = parseJson(productsRes.text);
      if (Array.isArray(productsData) && productsData.length > 0) {
        console.log(`[${runId}] ✅ Product found: ID ${productsData[0].id}`);
      } else {
        console.warn(`[${runId}] No products found with slug: ${testSlug}`);
      }
    } else {
      console.error(`[${runId}] Products endpoint failed: ${productsRes.status}`);
      const errorData = parseJson(productsRes.text);
      console.error(`[${runId}] Error response:`, errorData);
    }
 
    // ========================================
    // STEP 4: Test with POST endpoint
    // ========================================
    console.log(`[${runId}] Step 4: Testing POST endpoint (create draft product)...`);
    
    const postUrl = `${creds.baseUrl}/wp-json/wc/v3/products`;
    const testPostData = {
      name: `[TEST] ${new Date().toISOString()}`,
      type: 'simple',
      description: 'Automated test product',
      status: 'draft',
      regular_price: '0.01',
    };
 
    console.log(`[${runId}] Creating test product...`);
    const postRes = await wpFetch(postUrl, creds, { 
      method: 'POST', 
      body: testPostData 
    });
 
    console.log(`[${runId}] POST endpoint status: ${postRes.status}`);
 
    let postResult = null;
    if (postRes.ok) {
      postResult = parseJson(postRes.text);
      console.log(`[${runId}] ✅ Test product created: ID ${postResult?.id}`);
    } else {
      console.error(`[${runId}] POST endpoint failed: ${postRes.status}`);
      const errorData = parseJson(postRes.text);
      console.error(`[${runId}] Error response:`, errorData);
    }
 
    // ========================================
    // STEP 5: Test direct product fetch by ID
    // ========================================
    console.log(`[${runId}] Step 5: Testing single product fetch...`);
    
    let singleProductRes = null;
    if (productsData && productsData.length > 0) {
      const productId = productsData[0].id;
      const singleUrl = `${creds.baseUrl}/wp-json/wc/v3/products/${productId}`;
      console.log(`[${runId}] Fetching product ${productId}...`);
      
      singleProductRes = await wpFetch(singleUrl, creds);
      console.log(`[${runId}] Single product fetch status: ${singleProductRes.status}`);
    }
 
    // ========================================
    // STEP 6: Return comprehensive results
    // ========================================
    const result: TestResult = {
      success: productsRes.ok && postRes.ok,
      timestamp: new Date().toISOString(),
      step: 'all_tests_completed',
      details: {
        credentialsCheck: {
          baseUrl: creds.baseUrl,
          hasUsername: !!creds.username,
          hasAppPassword: !!creds.appPassword,
          authMethod: 'Basic Auth',
        },
        productsEndpoint: {
          url: productsUrl,
          status: productsRes.status,
          statusText: productsRes.statusText,
          success: productsRes.ok,
          productFound: productsData && productsData.length > 0,
          responseLength: productsRes.text.length,
          error: !productsRes.ok ? parseJson(productsRes.text) : null,
        },
        postEndpoint: {
          url: postUrl,
          method: 'POST',
          status: postRes.status,
          statusText: postRes.statusText,
          success: postRes.ok,
          createdProductId: postResult?.id || null,
          responseLength: postRes.text.length,
          error: !postRes.ok ? parseJson(postRes.text) : null,
        },
        singleProductEndpoint: singleProductRes ? {
          status: singleProductRes.status,
          statusText: singleProductRes.statusText,
          success: singleProductRes.ok,
          error: !singleProductRes.ok ? parseJson(singleProductRes.text) : null,
        } : null,
      },
      debug: {
        runId,
        testSlug,
        message: productsRes.ok && postRes.ok 
          ? '✅ All tests passed - WordPress/WooCommerce is working correctly'
          : '❌ Some tests failed - Check details above',
      }
    };
 
    console.log(`[${runId}] Test completed:`, result.success ? '✅ SUCCESS' : '❌ FAILED');
    
    return NextResponse.json(result, { 
      status: result.success ? 200 : 500 
    });
 
  } catch (err) {
    console.error(`[${runId}] Unhandled exception:`, err);
    
    const errorMessage = err instanceof Error ? err.message : 'Unknown error';
    const errorStack = err instanceof Error ? err.stack : undefined;
 
    return NextResponse.json(
      {
        success: false,
        timestamp: new Date().toISOString(),
        step: 'unhandled_exception',
        error: errorMessage,
        debug: {
          runId,
          stack: errorStack?.substring(0, 500),
        },
      } as TestResult,
      { status: 500 }
    );
  }
}
 