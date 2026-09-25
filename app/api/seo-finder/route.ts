// app/api/seo-finder/route.ts
//
// Secure server-side proxy for the AI SEO Package Finder.
//
// Was a direct call to the paid Anthropic API (claude-sonnet-4-6) on a public,
// unauthenticated tool page — every visitor's click billed the account, with no
// cap beyond the per-IP rate limiter below. This is a diagnose-and-recommend
// task against a fixed set of three packages: not the kind of judgment that
// needs Claude specifically, and lib/gemini-pool.ts's 30-key free rotation is
// the same mechanism the SEO news and blog autopilots already run on. Moved
// here for the same reason those did: nothing to fund, nothing to watch for a
// silent quota cutoff.
//
// The in-memory rate limiter below is basic and resets on serverless cold starts.
// For real production, swap it for Upstash Redis (@upstash/ratelimit) — noted below.
 
import { NextRequest, NextResponse } from "next/server";
import { generateContentWithPool } from "@/lib/gemini-pool";
 
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
 
    let result;
    try {
      result = await generateContentWithPool({
        contents: [{ parts: [{ text: problem.trim() }] }],
        systemInstruction: SYSTEM_PROMPT,
        responseMimeType: "application/json",
      });
    } catch {
      return NextResponse.json(
        { error: "Analysis service is busy. Please try again shortly." },
        { status: 502 }
      );
    }
 
    const raw = (result.text || "").trim();
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
 
