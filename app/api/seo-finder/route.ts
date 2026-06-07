// app/api/seo-finder/route.ts
//
// Secure server-side proxy for the AI SEO Package Finder.
// The Anthropic API key NEVER reaches the browser — it lives only here, on the server.
//
// Setup:
//   1) npm i  (no SDK needed — uses fetch)
//   2) Add to .env.local:   ANTHROPIC_API_KEY=sk-ant-...
//   3) Add the same env var in Vercel → Project → Settings → Environment Variables
//
// The in-memory rate limiter below is basic and resets on serverless cold starts.
// For real production, swap it for Upstash Redis (@upstash/ratelimit) — noted below.
 
import { NextRequest, NextResponse } from "next/server";
 
export const runtime = "nodejs";
 
const SYSTEM_PROMPT = `You are the lead SEO strategist at SearchPrex, a US-focused agency that does local SEO for law firms. You advise law firms in Wichita, Kansas (Sedgwick County, 18th Judicial District). You are sharp, specific, and honest — never generic.
 
A prospective law firm describes their problem. Diagnose their core SEO issue precisely, then recommend ONE package and give concrete, locally-aware next steps. Reference real local factors when relevant (Sedgwick County courts, Wichita Bar Association, practice-area demand like personal injury / family / criminal / workers' comp, suburb-level opportunities like east Wichita, Derby, Andover, map-pack competition). Be concrete enough that a skeptical attorney is impressed by the accuracy. Never guarantee rankings.
 
Packages (pick exactly one, use these exact names + price ranges):
- "Starter — Local Foundations" | "$750–$1,200/mo" | new/small firms with little visibility
- "Growth — Case Generator" | "$1,800–$2,800/mo" | established firms losing to local competitors, wanting more case inquiries
- "Authority — Market Domination" | "$3,500+/mo" | multi-location or ambitious firms wanting to own competitive practice areas
 
Respond with ONLY a valid JSON object, no markdown, no backticks, no preamble:
{
  "headline": "one punchy sentence naming their core problem",
  "diagnosis": "2-3 sentences specific to what they wrote, naming the likely root cause",
  "recommendedPackage": "exact package name",
  "priceRange": "exact price range",
  "whyThisPackage": "1-2 sentences tailored to them",
  "quickWins": ["3 specific actionable items tailored to their situation and Wichita"],
  "timeline": "realistic timeframe, e.g. '3-6 months'"
}`;
 
// --- basic in-memory rate limiter (per IP) ---
const hits = new Map<string, { count: number; ts: number }>();
const WINDOW_MS = 60_000; // 1 minute
const MAX_PER_WINDOW = 5; // 5 requests / minute / IP
 
function isRateLimited(ip: string): boolean {
  const now = Date.now();
  const rec = hits.get(ip);
  if (!rec || now - rec.ts > WINDOW_MS) {
    hits.set(ip, { count: 1, ts: now });
    return false;
  }
  rec.count += 1;
  return rec.count > MAX_PER_WINDOW;
}
 
export async function POST(req: NextRequest) {
  try {
    const ip =
      req.headers.get("x-forwarded-for")?.split(",")[0]?.trim() || "unknown";
 
    if (isRateLimited(ip)) {
      return NextResponse.json(
        { error: "Too many requests. Please wait a minute and try again." },
        { status: 429 }
      );
    }
 
    const body = await req.json().catch(() => ({}));
    const problem: unknown = body?.problem;
 
    if (typeof problem !== "string" || problem.trim().length < 3) {
      return NextResponse.json(
        { error: "Please describe your challenge in a few words." },
        { status: 400 }
      );
    }
    if (problem.length > 1000) {
      return NextResponse.json(
        { error: "That's a bit long — please shorten your message." },
        { status: 400 }
      );
    }
 
    const apiKey = process.env.ANTHROPIC_API_KEY;
    if (!apiKey) {
      return NextResponse.json(
        { error: "Server is not configured. Missing API key." },
        { status: 500 }
      );
    }
 
    const r = await fetch("https://api.anthropic.com/v1/messages", {
      method: "POST",
      headers: {
        "content-type": "application/json",
        "x-api-key": apiKey,
        "anthropic-version": "2023-06-01",
      },
      body: JSON.stringify({
        // claude-sonnet-4-6 = great quality/cost balance.
        // For lower cost, switch to "claude-haiku-4-5-20251001".
        model: "claude-sonnet-4-6",
        max_tokens: 1000,
        system: SYSTEM_PROMPT,
        messages: [{ role: "user", content: problem.trim() }],
      }),
    });
 
    if (!r.ok) {
      return NextResponse.json(
        { error: "Analysis service is busy. Please try again shortly." },
        { status: 502 }
      );
    }
 
    const data = await r.json();
    const raw: string = (data.content || [])
      .map((b: { type: string; text?: string }) =>
        b.type === "text" ? b.text ?? "" : ""
      )
      .join("")
      .trim();
 
    const clean = raw.replace(/```json/gi, "").replace(/```/g, "").trim();
    const start = clean.indexOf("{");
    const end = clean.lastIndexOf("}");
    const parsed = JSON.parse(clean.slice(start, end + 1));
 
    return NextResponse.json(parsed);
  } catch {
    return NextResponse.json(
      { error: "Couldn't analyze that — please try rephrasing your challenge." },
      { status: 500 }
    );
  }
}
 
