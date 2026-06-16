import { NextRequest, NextResponse } from 'next/server';
import * as crypto from 'crypto';
 
export async function POST(req: NextRequest) {
  try {
    const { keyword, location = 'US', language = 'en' } = await req.json();
 
    // Validate input
    if (!keyword) {
      return NextResponse.json(
        { error: 'Keyword is required' },
        { status: 400 }
      );
    }
 
    // Get DataForSEO credentials from environment
    const login = process.env.DATAFORSEO_LOGIN;
    const password = process.env.DATAFORSEO_PASSWORD;
 
    if (!login || !password) {
      return NextResponse.json(
        { error: 'DataForSEO credentials not configured' },
        { status: 500 }
      );
    }
 
    // Create authorization header
    const auth = Buffer.from(`${login}:${password}`).toString('base64');
 
    // DataForSEO API call for keyword research
    const response = await fetch(
      'https://api.dataforseo.com/v3/keywords_data/google_ads/search_volume',
      {
        method: 'POST',
        headers: {
          'Authorization': `Basic ${auth}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify([
          {
            keywords: [keyword],
            location_code: 2840, // US
            language_code: 'en',
          },
        ]),
      }
    );
 
    if (!response.ok) {
      const errorData = await response.json();
      return NextResponse.json(
        { error: 'Failed to fetch keyword data', details: errorData },
        { status: response.status }
      );
    }
 
    const data = await response.json();
 
    // Extract keyword data
    const keywordData = data.tasks?.[0]?.result?.[0] || {};
 
    return NextResponse.json({
      success: true,
      keyword,
      data: {
        keyword: keywordData.keyword || keyword,
        searchVolume: keywordData.search_volume || 0,
        cpc: keywordData.cpc || 0,
        competition: keywordData.competition_index || 0,
        trends: keywordData.monthly_searches || [],
      },
      timestamp: new Date().toISOString(),
    });
  } catch (error) {
    console.error('Keyword research error:', error);
    return NextResponse.json(
      {
        error: 'Internal server error',
        message: error instanceof Error ? error.message : 'Unknown error',
      },
      { status: 500 }
    );
  }
}
 
// Get request for API health check
export async function GET() {
  return NextResponse.json(
    {
      message: 'Keyword research API is running',
      endpoint: '/api/keyword-research',
      method: 'POST',
    },
    { status: 200 }
  );
}
 