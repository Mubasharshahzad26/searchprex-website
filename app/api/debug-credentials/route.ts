// File: app/api/debug-credentials/route.ts
// See what's ACTUALLY stored in database
 
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
 
    console.log('[DEBUG] Raw credentials value:', cms.credentials);
    console.log('[DEBUG] Credentials type:', typeof cms.credentials);
    console.log('[DEBUG] Credentials length:', (cms.credentials as string).length);
 
    // Show first 500 chars
    const credentialsStr = (cms.credentials as string).substring(0, 500);
    
    return NextResponse.json({
      success: true,
      baseUrl: cms.baseUrl,
      clientId: cms.clientId,
      credentialsRawValue: credentialsStr,
      credentialsFullLength: (cms.credentials as string).length,
      credentialsType: typeof cms.credentials,
      isValidJSON: isValidJSON(cms.credentials as string),
      suggestion: generateSuggestion(cms.credentials as string)
    }, { status: 200 });
 
  } catch (error) {
    return NextResponse.json({
      error: error instanceof Error ? error.message : 'Unknown error'
    }, { status: 500 });
  }
}
 
function isValidJSON(str: string): boolean {
  try {
    JSON.parse(str);
    return true;
  } catch {
    return false;
  }
}
 
function generateSuggestion(str: string): string {
  if (str.includes('[object Object]')) {
    return 'Credentials are stored as [object Object] - this is invalid. Need to update database with valid JSON like {"username":"xxx","appPassword":"yyy"}';
  }
  if (str.startsWith('{') && str.endsWith('}')) {
    return 'Looks like JSON but not parseable - check for special characters or quotes';
  }
  if (!str) {
    return 'Credentials column is empty!';
  }
  return 'Unknown format - check the raw value above';
}
 