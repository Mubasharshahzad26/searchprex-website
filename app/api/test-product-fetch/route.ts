import { NextResponse } from 'next/server';

export async function GET() {
  try {
    console.log('[API] test-product-fetch called');
    
    return NextResponse.json({
      success: true,
      message: 'Endpoint is working',
      timestamp: new Date().toISOString(),
    }, { status: 200 });

  } catch (error) {
    console.error('[API] Error:', error);
    return NextResponse.json({
      success: false,
      error: error instanceof Error ? error.message : 'Unknown error',
    }, { status: 500 });
  }
}