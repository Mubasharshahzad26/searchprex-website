// File: app/api/test-product-fetch/route.ts
// STEP 2: Add database query with logging
 
import { NextResponse } from 'next/server';
import { db } from '@/lib/db';
 
export async function GET() {
  const runId = `prod-test-${Date.now()}`;
  
  try {
    console.log(`[${runId}] Endpoint called`);
    
    // STEP 1: Test basic response (WORKING ✅)
    console.log(`[${runId}] Step 1: Basic test - OK`);
    
    // STEP 2: Try database query
    console.log(`[${runId}] Step 2: Querying database for CMS connection...`);
    
    const clientId = 'cmrcl8frg0000p8uruwv7j5qd';
    console.log(`[${runId}] Looking for clientId: ${clientId}`);
    
    const cms = await db.cMSConnection.findFirst({
      where: { clientId }
    });
 
    if (!cms) {
      console.warn(`[${runId}] ⚠️  CMS not found for clientId: ${clientId}`);
      return NextResponse.json({
        success: false,
        step: 'db_query_cms_lookup',
        error: 'No CMS connection found',
        details: {
          searchedFor: clientId,
          clientIdExists: false,
        }
      }, { status: 404 });
    }
 
    console.log(`[${runId}] ✅ CMS found: ${cms.baseUrl}`);
 
    // STEP 3: Parse credentials
    console.log(`[${runId}] Step 3: Parsing credentials...`);
    
    let credentials;
    try {
      credentials = JSON.parse(cms.credentials as string);
      console.log(`[${runId}] ✅ Credentials parsed successfully`);
      console.log(`[${runId}] Keys in credentials:`, Object.keys(credentials));
    } catch (parseError) {
      console.error(`[${runId}] ❌ Failed to parse credentials:`, parseError);
      return NextResponse.json({
        success: false,
        step: 'credentials_parse',
        error: parseError instanceof Error ? parseError.message : 'Failed to parse credentials',
      }, { status: 500 });
    }
 
    // STEP 4: Return success
    console.log(`[${runId}] ✅ All database queries successful`);
    
    return NextResponse.json({
      success: true,
      runId,
      step: 'database_ok',
      message: 'Database connection working',
      details: {
        cmsFound: true,
        baseUrl: cms.baseUrl,
        credentialKeys: Object.keys(credentials),
        credentialsHasUsername: 'username' in credentials,
        credentialsHasAppPassword: 'appPassword' in credentials,
      }
    }, { status: 200 });
 
  } catch (error) {
    console.error(`[${runId}] ❌ Unhandled error:`, error);
    
    return NextResponse.json({
      success: false,
      runId,
      step: 'unhandled_exception',
      error: error instanceof Error ? error.message : 'Unknown error',
      errorType: error?.constructor.name,
      stack: error instanceof Error ? error.stack?.substring(0, 300) : undefined,
    }, { status: 500 });
  }
}
 