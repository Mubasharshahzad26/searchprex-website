import { NextRequest, NextResponse } from 'next/server';
 
export async function POST(req: NextRequest) {
  try {
    // Parse request body
    const { prompt, numberOfPieces, contentType } = await req.json();
 
    // Validate input
    if (!prompt) {
      return NextResponse.json(
        { error: 'Prompt is required' },
        { status: 400 }
      );
    }
 
    // Get API keys from environment (server-side - SAFE)
    const geminiKey = process.env.GEMINI_API_KEY;
    
    if (!geminiKey) {
      return NextResponse.json(
        { error: 'API key not configured' },
        { status: 500 }
      );
    }
 
    // Call Gemini API
    const response = await fetch(
      `https://generativelanguage.googleapis.com/v1/models/gemini-pro:generateContent?key=${geminiKey}`,
      {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          contents: [
            {
              parts: [
                {
                  text: `You are an expert SEO content writer. Generate ${numberOfPieces || 1} ${contentType || 'SEO-optimized'} pieces of content based on this prompt: ${prompt}. Make sure each piece is unique, engaging, and optimized for search engines.`,
                },
              ],
            },
          ],
        }),
      }
    );
 
    if (!response.ok) {
      const errorData = await response.json();
      return NextResponse.json(
        { error: 'Failed to generate content', details: errorData },
        { status: response.status }
      );
    }
 
    const data = await response.json();
 
    // Extract generated text from Gemini response
    const generatedContent =
      data.candidates?.[0]?.content?.parts?.[0]?.text || 'No content generated';
 
    return NextResponse.json({
      success: true,
      content: generatedContent,
      timestamp: new Date().toISOString(),
    });
  } catch (error) {
    console.error('Content generation error:', error);
    return NextResponse.json(
      { 
        error: 'Internal server error',
        message: error instanceof Error ? error.message : 'Unknown error'
      },
      { status: 500 }
    );
  }
}
 
// Optional: GET request for health check
export async function GET() {
  return NextResponse.json(
    { 
      message: 'Content generation API is running',
      endpoint: '/api/generate-content',
      method: 'POST'
    },
    { status: 200 }
  );
}
 