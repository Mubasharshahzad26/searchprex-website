// File: app/api/debug-credentials/route.ts
// Better version - handles credentials as both object and string
 
import { NextResponse } from 'next/server';
import { db } from '@/lib/db';
 
export async function GET() {
  try {
    console.log('[DEBUG] Fetching CMS credentials...');
    
    const clientId = 'cmrcl8frg0000p8uruwv7j5qd';
    
    const cms = await db.cMSConnection.findFirst({
      where: { clientId }
    });
 
    if (!cms) {
      return NextResponse.json({
        error: 'CMS not found'
      }, { status: 404 });
    }
 
    console.log('[DEBUG] Raw credentials:', cms.credentials);
    console.log('[DEBUG] Type of credentials:', typeof cms.credentials);
 
    // credentials might be stored as object or string
    let credentialsObj: any = null;
    let credentialsStr: string | null = null;
    let isAlreadyObject = false;
 
    if (typeof cms.credentials === 'string') {
      // It's a string - try to parse
      credentialsStr = cms.credentials;
      try {
        credentialsObj = JSON.parse(credentialsStr);
      } catch (e) {
        credentialsObj = null;
      }
    } else if (typeof cms.credentials === 'object') {
      // It's already an object
      isAlreadyObject = true;
      credentialsObj = cms.credentials;
      credentialsStr = JSON.stringify(credentialsObj);
    }
 
    return NextResponse.json({
      success: true,
      baseUrl: cms.baseUrl,
      clientId: cms.clientId,
      credentialsType: typeof cms.credentials,
      isAlreadyObject,
      credentialsRawValue: credentialsStr ? credentialsStr.substring(0, 200) : 'N/A',
      credentialsObject: credentialsObj,
      analysis: {
        hasUsername: credentialsObj?.username ? true : false,
        hasAppPassword: credentialsObj?.appPassword ? true : false,
        username: credentialsObj?.username || 'MISSING',
        appPasswordLength: credentialsObj?.appPassword ? credentialsObj.appPassword.length : 0,
      },
      status: credentialsObj && credentialsObj.username && credentialsObj.appPassword ? '✅ VALID' : '❌ INVALID'
    }, { status: 200 });
 
  } catch (error) {
    console.error('[DEBUG] Error:', error);
    return NextResponse.json({
      error: error instanceof Error ? error.message : 'Unknown error',
      errorType: error?.constructor.name
    }, { status: 500 });
  }
}
 